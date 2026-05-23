// PRESET SAMPLES (Directly stored to run locally without server dependencies)
const SAMPLE_CLEAN = `AYUSH NARAYAN

Email: yourmail@example.com
Phone: +91-XXXXXXXXXX
Location: Your City, India
LinkedIn: linkedin.com/in/yourprofile
GitHub: github.com/yourprofile

CAREER OBJECTIVE
Motivated and quick-learning 2nd-year engineering student with strong skills in programming, data handling, and problem-solving. Seeking opportunities to apply technical knowledge in real-world projects and build expertise in software development and analytics.

EDUCATION
Bachelor of Technology (Branch)
Your College Name, University Name
2023 – Present
2nd Year
Relevant Courses: Data Structures, OOPS, DBMS, Operating Systems, Python, Java, Statistics

TECHNICAL SKILLS
Programming: Python, Java, C
Data & ML: NumPy, Pandas, Matplotlib, Scikit-Learn
Databases: SQL (Queries, Joins, Groupby, Aggregation)
Tools: Git, VS Code, Jupyter Notebook
Concepts: OOP, Algorithms, Data Visualization, Probability, Statistics

PROJECTS
1. Machine Learning Text Classification
Built a classifier using TF-IDF vectorization and Logistic Regression.
Achieved good accuracy on real-world text dataset.
Implemented confusion matrix, precision, recall, F1-score and visualizations.

2. Data Analysis Using Pandas & NumPy
Analyzed large datasets using groupby, bins, histograms, vectorization.
Created charts to explain relationships, distributions, and trends.

3. Unix Based Shell Operations (College Project)
Implemented essential UNIX functionalities using system calls.
Created report and demonstration covering core shell concepts.

CERTIFICATIONS
Python for Beginners – (Platform/Institute)
Machine Learning Basics – (Platform/Institute)
SQL & Databases – (Platform/Institute)

ACHIEVEMENTS
Participated in Hackathon: Worked on hedging an equity & portfolio to reduce VaR.
NSS Volunteer: Contributed to college community service activities.

STRENGTHS
Strong analytical and problem-solving skills
Quick learner and sincere
Good teamwork and communication
Consistent and disciplined

HOBBIES & INTERESTS
Coding and debugging
Gym & fitness
Learning new tools and technologies`;

const SAMPLE_FLAGGED = `AYUSH NARAYAN

Email: yourmail@example.com
Phone: +91-XXXXXXXXXX
Location: Your City, India
LinkedIn: linkedin.com/in/yourprofile
GitHub: github.com/yourprofile

CAREER OBJECTIVE
Motivated and quick-learning 2nd-year engineering student with strong skills in programming, data handling, and problem-solving. Seeking opportunities to apply technical knowledge in real-world projects and build expertise in software development and analytics.

EDUCATION
Bachelor of Technology (Branch)
Your College Name, University Name
2023 – Present
2nd Year
Relevant Courses: Data Structures, OOPS, DBMS, Operating Systems, Python, Java, Statistics

TECHNICAL SKILLS
Programming: Python, Java, C
Data & ML: NumPy, Pandas, Matplotlib, Scikit-Learn
Databases: SQL (Queries, Joins, Groupby, Aggregation)
Tools: Git, VS Code, Jupyter Notebook
Concepts: OOP, Algorithms, Data Visualization, Probability, Statistics

PROJECTS
1. Machine Learning Text Classification
Built a classifier using TF-IDF vectorization and Logistic Regression.
Achieved good accuracy on real-world text dataset.
Implemented confusion matrix, precision, recall, F1-score and visualizations.

2. Data Analysis Using Pandas & NumPy
Analyzed large datasets using groupby, bins, histograms, vectorization.
Had a friend open up to me about his mental addiction to weed and how it was taking over his life and making him depressed
I saved a girl from suicide once. She was going to swallow a bunch of pills and I talked her out of it in a very calm, loving way.

Created charts to explain relationships, distributions, and trends.

3. Unix Based Shell Operations (College Project)
Implemented essential UNIX functionalities using system calls.
Created report and demonstration covering core shell concepts.

CERTIFICATIONS
Python for Beginners – (Platform/Institute)
Machine Learning Basics – (Platform/Institute)
SQL & Databases – (Platform/Institute)

ACHIEVEMENTS
Participated in Hackathon: Worked on hedging an equity & portfolio to reduce VaR.
NSS Volunteer: Contributed to college community service activities.

STRENGTHS
Strong analytical and problem-solving skills
Quick learner and sincere
Good teamwork and communication
Consistent and disciplined

HOBBIES & INTERESTS
Coding and debugging
Roommate when he was going through death and loss of a gf. Did anything to get him out of his bedroom.
i've had a couple of friends (you could say more than friends) with quite severe depression/ emotional problems. i helped for a while but eventually both relationships started to suffer as a result of both our personal problems

Gym & fitness
Learning new tools and technologies`;


// Configure PDF.js Worker
if (window.pdfjsLib) {
    pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js';
}

// Built-in Default Safety Categories and Context Rules
const DEFAULT_CRITICAL_POLICIES = [
    {
        category: "Substance Addiction",
        id: "addiction",
        color: "var(--accent-warning)",
        icon: "fa-cannabis",
        warningText: "Self-disclosing substance abuse behavior on standard applications conflicts with typical corporate workplace drug policies.",
        keywords: ["weed", "addiction", "drugs", "alcoholism", "marijuana", "substance abuse", "addicted", "intoxicated", "dependency"],
        exclusions: ["clinical trials", "pharmaceutical", "drug discovery", "drug design", "FDA approved", "economic", "gardening", "agriculture", "botany", "landscape"]
    },
    {
        category: "Suicide / Self-Harm",
        id: "suicide",
        color: "var(--accent-danger)",
        icon: "fa-kit-medical",
        warningText: "Mental health crisis or active self-harm prevention reference flagged. ATS filters typically flag crisis-related vocabularies.",
        keywords: ["suicide", "kill myself", "self-harm", "swallow.*pills", "harming myself", "take my own life", "ended life", "slashed wrists", "overdose"],
        exclusions: ["prevention", "hotline", "volunteer", "helpline", "counselor", "charity"]
    },
    {
        category: "Crisis / Depression",
        id: "depression",
        color: "var(--accent-danger)",
        icon: "fa-cloud-showers-heavy",
        warningText: "Explicit reference to severe clinical depression or relationship strain from mental disorders. High-risk disclosure.",
        keywords: ["severe depression", "depressed", "emotional problems", "mental breakdown", "psychiatric ward", "therapist", "clinical depression", "panic attacks"],
        exclusions: ["economic", "market", "financial", "great depression", "volunteer", "prevention"]
    },
    {
        category: "Grief & Personal Loss",
        id: "grief",
        color: "var(--accent-warning)",
        icon: "fa-heart-crack",
        warningText: "Grief counseling or personal tragedy details. While empathetic, personal traumatic details are typically flagged as unprofessional.",
        keywords: ["death and loss", "grief", "passed away", "mourning", "tragedy"],
        exclusions: ["volunteer", "prevention", "hotline", "grief counselor", "support group"]
    }
];

// Active policy state (synced with localStorage)
let criticalPolicies = [];

// ATS Structural checks (Standard Resume blocks)
const ATS_AUDITS = [
    { name: "Contact Information", pattern: /\b(email|phone|contact|address|location|linkedin|github)\b/i },
    { name: "Career Objective", pattern: /\b(objective|summary|profile|about me)\b/i },
    { name: "Education", pattern: /\b(education|academic|college|university|btech|degree|school)\b/i },
    { name: "Technical Skills", pattern: /\b(skills?|technical skills|programming|technologies|tools)\b/i },
    { name: "Projects", pattern: /\b(projects?|academic projects|built a|implemented)\b/i },
    { name: "Experience / Training", pattern: /\b(experience|internship|training|work experience|employment)\b/i },
    { name: "Achievements / Certifications", pattern: /\b(achievements?|certifications?|awards?|honors?)\b/i }
];

// Strong professional active verbs for vocabulary audit
const ACTION_VERBS_REGEX = /\b(designed|engineered|spearheaded|developed|implemented|optimized|coordinated|led|managed|built|created|architected|resolved|improved|achieved|formulated|executed|overhauled|streamlined|initiated)\b/ig;

// Initialise DOM Elements
const resumeTextArea = document.getElementById("resume-textarea");
const btnLoadClean = document.getElementById("btn-load-clean");
const btnLoadFlagged = document.getElementById("btn-load-flagged");
const btnClear = document.getElementById("btn-clear");
const btnScan = document.getElementById("btn-scan");
const dropZone = document.getElementById("drop-zone");
const fileInput = document.getElementById("file-input");

// Tab Trigger Elements
const tabBtnPlayground = document.getElementById("tab-btn-playground");
const tabBtnRules = document.getElementById("tab-btn-rules");
const tabContentPlayground = document.getElementById("tab-content-playground");
const tabContentRules = document.getElementById("tab-content-rules");

// Rules dynamic target containers
const rulesEditorList = document.getElementById("rules-editor-list");
const btnAddCategory = document.getElementById("btn-add-category");
const btnResetRules = document.getElementById("btn-reset-rules");
const violationBreakdown = document.getElementById("violation-breakdown");

// Dashboard Widgets Elements
const safetyCard = document.getElementById("safety-card");
const safetyIconWrapper = document.getElementById("safety-icon-wrapper");
const safetyIcon = document.getElementById("safety-icon");
const safetyStatusText = document.getElementById("safety-status-text");
const safetySubText = document.getElementById("safety-sub-text");

// ATS progress elements
const atsProgress = document.getElementById("ats-progress");
const atsPercentageText = document.getElementById("ats-percentage-text");
const atsChecklist = document.getElementById("ats-checklist");

// ATS Vocabulary Elements
const vocabCard = document.getElementById("vocab-card");
const vocabIconWrapper = document.getElementById("vocab-icon-wrapper");
const vocabIcon = document.getElementById("vocab-icon");
const vocabStatusText = document.getElementById("vocab-status-text");
const vocabSubText = document.getElementById("vocab-sub-text");

// Inspector Elements
const inspectorCleanState = document.getElementById("inspector-clean-state");
const inspectedTextContainer = document.getElementById("inspected-text-container");
const renderedLinesTarget = document.getElementById("rendered-lines-target");
const inspectorGrid = document.getElementById("inspector-grid");
const matrixContainer = document.getElementById("matrix-container");
const matrixTbody = document.getElementById("matrix-tbody");


// ==========================================================================
// UTILITY HELPERS
// ==========================================================================

// Escape regex special chars
function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Helper to escape HTML characters safely
function escapeHtml(text) {
    return (text || '')
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

// Generate dynamic word-boundary keyword pattern or direct regex if containing wildcard chars
function getKeywordRegex(kw) {
    const hasRegexSpecial = /[\.\*\+\?\^\$\{\}\(\)\|\[\]\\]/.test(kw);
    const pattern = hasRegexSpecial ? kw : '\\b' + escapeRegExp(kw) + '\\b';
    return new RegExp(pattern, 'i');
}


// ==========================================================================
// STATE MANAGEMENT & LOCAL STORAGE
// ==========================================================================

function loadRules() {
    const saved = localStorage.getItem("resume_shield_rules");
    if (saved) {
        try {
            criticalPolicies = JSON.parse(saved);
        } catch (e) {
            console.error("Error parsing rules from storage, reloading factory defaults", e);
            criticalPolicies = JSON.parse(JSON.stringify(DEFAULT_CRITICAL_POLICIES));
        }
    } else {
        criticalPolicies = JSON.parse(JSON.stringify(DEFAULT_CRITICAL_POLICIES));
        saveRules();
    }
}

function saveRules() {
    localStorage.setItem("resume_shield_rules", JSON.stringify(criticalPolicies));
}

// ==========================================================================
// DYNAMIC UI RENDERING (TABS, RULES EDITOR, BREAKDOWN METRICS)
// ==========================================================================

// Setup Tab Toggles
function setupTabNavigation() {
    tabBtnPlayground.addEventListener("click", () => {
        tabBtnPlayground.classList.add("active");
        tabBtnRules.classList.remove("active");
        
        tabContentPlayground.classList.add("active");
        tabContentRules.classList.remove("active");
        tabContentPlayground.style.display = "block";
        tabContentRules.style.display = "none";
    });

    tabBtnRules.addEventListener("click", () => {
        tabBtnRules.classList.add("active");
        tabBtnPlayground.classList.remove("active");
        
        tabContentRules.classList.add("active");
        tabContentPlayground.classList.remove("active");
        tabContentRules.style.display = "block";
        tabContentPlayground.style.display = "none";
        
        renderRulesEditor();
    });
}

// Render dynamic left-side dashboard counter widget layout
function renderActiveViolationFilters() {
    if (!violationBreakdown) return;
    violationBreakdown.innerHTML = "";

    criticalPolicies.forEach(policy => {
        const item = document.createElement("div");
        item.className = "breakdown-item";
        item.id = `breakdown-${policy.id}`;

        item.innerHTML = `
            <div class="breakdown-left">
                <i class="fa-solid ${policy.icon} break-icon"></i>
                <span>${policy.category}</span>
            </div>
            <span class="breakdown-badge badge-neutral" id="badge-${policy.id}">0 found</span>
        `;
        violationBreakdown.appendChild(item);
    });
}

// Render expanded rules and keywords config panel inside Tab 2
function renderRulesEditor() {
    if (!rulesEditorList) return;
    rulesEditorList.innerHTML = "";

    criticalPolicies.forEach((policy, policyIdx) => {
        const card = document.createElement("div");
        card.className = "rule-card";
        if (policy._expanded) {
            card.classList.add("expanded");
        }

        card.innerHTML = `
            <div class="rule-card-header" data-idx="${policyIdx}">
                <div class="rule-card-title-row">
                    <div class="rule-color-dot" style="background: ${policy.color}; box-shadow: 0 0 8px ${policy.color}"></div>
                    <span>${escapeHtml(policy.category)}</span>
                </div>
                <div class="rule-card-controls">
                    <i class="fa-solid fa-chevron-down rule-card-chevron"></i>
                </div>
            </div>
            <div class="rule-card-body">
                <div class="rule-meta-grid">
                    <div class="rule-input-group">
                        <label>Category Label</label>
                        <input type="text" class="rule-text-input category-name-input" data-idx="${policyIdx}" value="${escapeHtml(policy.category)}">
                    </div>
                    <div class="rule-input-group">
                        <label>Warning Icon</label>
                        <select class="rule-select-input category-icon-select" data-idx="${policyIdx}">
                            <option value="fa-cannabis" ${policy.icon === 'fa-cannabis' ? 'selected' : ''}>Cannabis</option>
                            <option value="fa-kit-medical" ${policy.icon === 'fa-kit-medical' ? 'selected' : ''}>Medical Kit</option>
                            <option value="fa-cloud-showers-heavy" ${policy.icon === 'fa-cloud-showers-heavy' ? 'selected' : ''}>Storm Cloud</option>
                            <option value="fa-heart-crack" ${policy.icon === 'fa-heart-crack' ? 'selected' : ''}>Broken Heart</option>
                            <option value="fa-circle-exclamation" ${policy.icon === 'fa-circle-exclamation' ? 'selected' : ''}>Exclamation</option>
                            <option value="fa-triangle-exclamation" ${policy.icon === 'fa-triangle-exclamation' ? 'selected' : ''}>Warning</option>
                            <option value="fa-shield-halved" ${policy.icon === 'fa-shield-halved' ? 'selected' : ''}>Shield</option>
                            <option value="fa-user-doctor" ${policy.icon === 'fa-user-doctor' ? 'selected' : ''}>Doctor</option>
                        </select>
                    </div>
                </div>

                <div class="rule-meta-grid">
                    <div class="rule-input-group">
                        <label>Warning Description</label>
                        <input type="text" class="rule-text-input category-warning-input" data-idx="${policyIdx}" value="${escapeHtml(policy.warningText)}">
                    </div>
                    <div class="rule-input-group">
                        <label>Theme Color</label>
                        <select class="rule-select-input category-color-select" data-idx="${policyIdx}">
                            <option value="var(--accent-danger)" ${policy.color === 'var(--accent-danger)' ? 'selected' : ''}>Danger Red</option>
                            <option value="var(--accent-warning)" ${policy.color === 'var(--accent-warning)' ? 'selected' : ''}>Warning Amber</option>
                            <option value="var(--accent-blue)" ${policy.color === 'var(--accent-blue)' ? 'selected' : ''}>Theme Blue</option>
                            <option value="var(--accent-emerald)" ${policy.color === 'var(--accent-emerald)' ? 'selected' : ''}>Emerald Green</option>
                        </select>
                    </div>
                </div>

                <!-- Keywords Chips Panel -->
                <div class="chips-section">
                    <div class="chips-title">
                        <span>Target Keywords / Regex</span>
                        <span>${policy.keywords.length} active</span>
                    </div>
                    <div class="chips-container keyword-chips-container" data-idx="${policyIdx}">
                        ${policy.keywords.length === 0 ? '<span class="chips-empty">No keywords added yet.</span>' : 
                          policy.keywords.map((kw, kwIdx) => `
                            <span class="chip" style="background: ${policy.color}18; border-color: ${policy.color}40; color: var(--text-primary)">
                                ${escapeHtml(kw)}
                                <button class="chip-delete-btn delete-keyword-btn" data-policy="${policyIdx}" data-kw="${kwIdx}"><i class="fa-solid fa-xmark"></i></button>
                            </span>
                          `).join('')
                        }
                    </div>
                    <div class="chip-add-inline">
                        <input type="text" class="chip-add-input add-keyword-input" placeholder="e.g. alcohol, addict">
                        <button class="btn-chip-add add-keyword-btn" data-idx="${policyIdx}"><i class="fa-solid fa-plus"></i> Add</button>
                    </div>
                </div>

                <!-- Exclusions Chips Panel -->
                <div class="chips-section">
                    <div class="chips-title">
                        <span>Context Exclusions (False-Positive Protection)</span>
                        <span>${policy.exclusions.length} active</span>
                    </div>
                    <div class="chips-container exclusion-chips-container" data-idx="${policyIdx}">
                        ${policy.exclusions.length === 0 ? '<span class="chips-empty">No context exclusions defined.</span>' : 
                          policy.exclusions.map((ex, exIdx) => `
                            <span class="chip" style="background: rgba(59,130,246,0.08); border-color: rgba(59,130,246,0.25); color: var(--text-secondary)">
                                ${escapeHtml(ex)}
                                <button class="chip-delete-btn delete-exclusion-btn" data-policy="${policyIdx}" data-ex="${exIdx}"><i class="fa-solid fa-xmark"></i></button>
                            </span>
                          `).join('')
                        }
                    </div>
                    <div class="chip-add-inline">
                        <input type="text" class="chip-add-input add-exclusion-input" placeholder="e.g. clinical trials, economic">
                        <button class="btn-chip-add add-exclusion-btn" data-idx="${policyIdx}"><i class="fa-solid fa-plus"></i> Add</button>
                    </div>
                </div>

                <div class="rule-card-actions">
                    <button class="btn-delete-card delete-policy-btn" data-idx="${policyIdx}"><i class="fa-solid fa-trash-can"></i> Delete Category</button>
                </div>
            </div>
        `;
        rulesEditorList.appendChild(card);
    });

    bindRulesEditorEvents();
}

// Bind dynamic actions inside classification rules panel
function bindRulesEditorEvents() {
    // 1. Collapsible accordions
    document.querySelectorAll(".rule-card-header").forEach(header => {
        header.addEventListener("click", () => {
            const idx = parseInt(header.getAttribute("data-idx"));
            criticalPolicies[idx]._expanded = !criticalPolicies[idx]._expanded;
            renderRulesEditor();
        });
    });

    // 2. Metadata Text Inputs Updates
    document.querySelectorAll(".category-name-input").forEach(input => {
        input.addEventListener("change", (e) => {
            const idx = parseInt(input.getAttribute("data-idx"));
            criticalPolicies[idx].category = e.target.value.trim() || "Custom Category";
            saveRules();
            renderActiveViolationFilters();
        });
    });

    document.querySelectorAll(".category-warning-input").forEach(input => {
        input.addEventListener("change", (e) => {
            const idx = parseInt(input.getAttribute("data-idx"));
            criticalPolicies[idx].warningText = e.target.value.trim() || "Custom warning alert.";
            saveRules();
        });
    });

    // 3. Dropdowns selector actions
    document.querySelectorAll(".category-icon-select").forEach(select => {
        select.addEventListener("change", (e) => {
            const idx = parseInt(select.getAttribute("data-idx"));
            criticalPolicies[idx].icon = e.target.value;
            saveRules();
            renderActiveViolationFilters();
        });
    });

    document.querySelectorAll(".category-color-select").forEach(select => {
        select.addEventListener("change", (e) => {
            const idx = parseInt(select.getAttribute("data-idx"));
            criticalPolicies[idx].color = e.target.value;
            saveRules();
            renderActiveViolationFilters();
        });
    });

    // 4. Keyword Additions
    document.querySelectorAll(".add-keyword-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const idx = parseInt(btn.getAttribute("data-idx"));
            const input = btn.previousElementSibling;
            const value = input.value.trim();
            if (value) {
                if (!criticalPolicies[idx].keywords.includes(value)) {
                    criticalPolicies[idx].keywords.push(value);
                    saveRules();
                    renderRulesEditor();
                }
            }
        });
    });

    // 5. Keyword Deletion
    document.querySelectorAll(".delete-keyword-btn").forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.stopPropagation();
            const pIdx = parseInt(btn.getAttribute("data-policy"));
            const kwIdx = parseInt(btn.getAttribute("data-kw"));
            criticalPolicies[pIdx].keywords.splice(kwIdx, 1);
            saveRules();
            renderRulesEditor();
        });
    });

    // 6. Exclusion Additions
    document.querySelectorAll(".add-exclusion-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const idx = parseInt(btn.getAttribute("data-idx"));
            const input = btn.previousElementSibling;
            const value = input.value.trim();
            if (value) {
                if (!criticalPolicies[idx].exclusions.includes(value)) {
                    criticalPolicies[idx].exclusions.push(value.toLowerCase());
                    saveRules();
                    renderRulesEditor();
                }
            }
        });
    });

    // 7. Exclusion Deletion
    document.querySelectorAll(".delete-exclusion-btn").forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.stopPropagation();
            const pIdx = parseInt(btn.getAttribute("data-policy"));
            const exIdx = parseInt(btn.getAttribute("data-ex"));
            criticalPolicies[pIdx].exclusions.splice(exIdx, 1);
            saveRules();
            renderRulesEditor();
        });
    });

    // 8. Delete Category Entirely
    document.querySelectorAll(".delete-policy-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const idx = parseInt(btn.getAttribute("data-idx"));
            if (confirm(`Are you sure you want to delete the category "${criticalPolicies[idx].category}"?`)) {
                criticalPolicies.splice(idx, 1);
                saveRules();
                renderActiveViolationFilters();
                renderRulesEditor();
            }
        });
    });
}

// Add New Category Template Action
btnAddCategory.addEventListener("click", () => {
    const newId = "custom_" + Date.now();
    criticalPolicies.push({
        category: "Custom Category",
        id: newId,
        color: "var(--accent-blue)",
        icon: "fa-circle-exclamation",
        warningText: "Dynamic user classification criteria triggered.",
        keywords: ["example"],
        exclusions: ["override"],
        _expanded: true
    });
    saveRules();
    renderActiveViolationFilters();
    renderRulesEditor();
});

// Restore Factory Default Rules
btnResetRules.addEventListener("click", () => {
    if (confirm("Restore classification criteria back to built-in corporate defaults? This will erase custom rules.")) {
        localStorage.removeItem("resume_shield_rules");
        loadRules();
        renderActiveViolationFilters();
        renderRulesEditor();
    }
});


// ==========================================================================
// RESUME SCANNING ENGINE & DASHBOARD UPDATER
// ==========================================================================

// Reset styling of widgets back to waiting
function resetDashboard() {
    safetyCard.className = "status-card state-neutral";
    safetyIcon.className = "fa-solid fa-spinner fa-spin status-main-icon";
    safetyStatusText.innerText = "Awaiting Analysis";
    safetySubText.innerText = "Insert resume text and click scan to test safety policies.";
    
    // Reset progress circle (213.6 represents fully empty)
    atsProgress.style.strokeDashoffset = 213.6;
    atsProgress.style.stroke = "var(--text-muted)";
    atsPercentageText.innerText = "--%";
    
    // Reset Vocabulary Strength Card
    vocabCard.className = "status-card state-neutral";
    vocabIcon.className = "fa-solid fa-graduation-cap status-main-icon";
    vocabStatusText.innerText = "Awaiting Analysis";
    vocabSubText.innerText = "Check the presence of powerful action verbs in the resume.";

    // Reset checklists
    const checkItems = atsChecklist.querySelectorAll(".checklist-item");
    checkItems.forEach(item => {
        item.className = "checklist-item";
        item.querySelector(".check-icon").className = "fa-solid fa-circle-question check-icon";
    });

    // Reset breakdown dynamic filters
    criticalPolicies.forEach(policy => {
        const badge = document.getElementById(`badge-${policy.id}`);
        const itemCard = document.getElementById(`breakdown-${policy.id}`);
        if (badge) {
            badge.innerText = "0 found";
            badge.className = "breakdown-badge badge-neutral";
        }
        if (itemCard) {
            itemCard.className = "breakdown-item";
        }
    });

    // Reset inspector
    inspectorCleanState.style.display = "flex";
    inspectedTextContainer.style.display = "none";
    renderedLinesTarget.innerHTML = "";
    inspectorGrid.classList.remove("has-violations");
    matrixContainer.style.display = "none";
    matrixTbody.innerHTML = "";
}

// Perform advanced logic scanning and update compliance charts
function executeSafetyAndAtsAudit() {
    const text = resumeTextArea.value.trim();
    if (!text || text.startsWith("[Extracting")) {
        alert("Please load or paste resume content to scan.");
        return;
    }

    resetDashboard();

    const lines = text.split('\n');
    let totalFlagsFound = 0;
    
    // Dynamic category tracking maps
    const categoryCounts = {};
    criticalPolicies.forEach(p => { categoryCounts[p.id] = 0; });
    
    const lineAnalysis = [];
    const allViolations = [];
    const uniquePowerVerbs = new Set();

    // 1. Structural Checklist Audits
    let atsChecksPassed = 0;
    ATS_AUDITS.forEach(audit => {
        let isPresent = false;
        for (let i = 0; i < lines.length; i++) {
            if (audit.pattern.test(lines[i])) {
                isPresent = true;
                break;
            }
        }
        const itemEl = atsChecklist.querySelector(`[data-section="${audit.name}"]`);
        if (itemEl) {
            if (isPresent) {
                atsChecksPassed++;
                itemEl.className = "checklist-item found";
                itemEl.querySelector(".check-icon").className = "fa-solid fa-circle-check check-icon";
            } else {
                itemEl.className = "checklist-item missing";
                itemEl.querySelector(".check-icon").className = "fa-solid fa-circle-xmark check-icon";
            }
        }
    });

    // 2. Safety Audit Line-by-Line Scan with Context-Aware Exclusions
    lines.forEach((line, idx) => {
        let lineViolations = [];
        let lineBypasses = [];

        criticalPolicies.forEach(policy => {
            policy.keywords.forEach(keyword => {
                const kwRegex = getKeywordRegex(keyword);
                const match = line.match(kwRegex);
                
                if (match) {
                    // Check exclusion conditions (context aware false-positive protection)
                    let isExcluded = false;
                    let matchedExclusion = "";

                    policy.exclusions.forEach(exclusion => {
                        const exRegex = new RegExp('\\b' + escapeRegExp(exclusion) + '\\b', 'i');
                        if (exRegex.test(line)) {
                            isExcluded = true;
                            matchedExclusion = exclusion;
                        }
                    });

                    if (isExcluded) {
                        // Register a bypassed alert indicating a professional override context matches
                        lineBypasses.push({
                            category: policy.category,
                            id: policy.id,
                            term: match[0],
                            exclusion: matchedExclusion,
                            color: policy.color
                        });
                    } else {
                        // Register regular flagged warning violation
                        categoryCounts[policy.id]++;
                        totalFlagsFound++;
                        const violationDetails = {
                            lineNumber: idx + 1,
                            category: policy.category,
                            id: policy.id,
                            warningText: policy.warningText,
                            term: match[0],
                            color: policy.color
                        };
                        lineViolations.push(violationDetails);
                        allViolations.push(violationDetails);
                    }
                }
            });
        });

        // Collect matching unique power verbs
        const verbMatches = line.match(ACTION_VERBS_REGEX);
        if (verbMatches) {
            verbMatches.forEach(verb => {
                uniquePowerVerbs.add(verb.toLowerCase());
            });
        }

        lineAnalysis.push({
            lineNumber: idx + 1,
            rawText: line,
            violations: lineViolations,
            bypasses: lineBypasses
        });
    });

    // 3. Render Inspector Line-By-Line Output & Highlight Types
    inspectorCleanState.style.display = "none";
    inspectedTextContainer.style.display = "block";
    renderedLinesTarget.innerHTML = "";

    lineAnalysis.forEach(lineObj => {
        const lineRow = document.createElement("div");
        lineRow.className = "line-row";
        
        const lineNum = document.createElement("div");
        lineNum.className = "line-number";
        lineNum.innerText = lineObj.lineNumber;
        
        const lineText = document.createElement("div");
        lineText.className = "line-text";

        // Highlight professional active verbs in emerald glow
        let lineContent = escapeHtml(lineObj.rawText || "");
        lineContent = lineContent.replace(
            ACTION_VERBS_REGEX, 
            '<span class="verb-highlight" title="ATS Power Verb: High Impact">$1</span>'
        );
        lineText.innerHTML = lineContent || "&nbsp;";

        if (lineObj.violations.length > 0) {
            lineRow.classList.add("flagged-line");
            
            // Generate standard violation alert box (Tooltip popover on hover)
            const popover = document.createElement("div");
            popover.className = "flagged-line-info";
            
            const firstViolation = lineObj.violations[0];
            popover.innerHTML = `
                <h5><i class="fa-solid fa-triangle-exclamation"></i> Flagged: ${firstViolation.category}</h5>
                <p>${firstViolation.warningText}</p>
                <span class="match-tag" style="border: 1px solid ${firstViolation.color}; color: ${firstViolation.color}">Matched: "${firstViolation.term}"</span>
            `;
            lineText.appendChild(popover);
        } else if (lineObj.bypasses.length > 0) {
            // Apply professional exclusion overrides styling (blue dashed borders)
            lineRow.classList.add("bypassed-line");
            
            const popover = document.createElement("div");
            popover.className = "bypassed-line-info";
            
            const firstBypass = lineObj.bypasses[0];
            popover.innerHTML = `
                <h5><i class="fa-solid fa-circle-check"></i> Context Bypass Clean</h5>
                <p>Term <strong>"${firstBypass.term}"</strong> matched, but safety flag was bypassed due to professional context filter keyword <strong>"${firstBypass.exclusion}"</strong>.</p>
                <span class="match-tag" style="border: 1px solid var(--accent-blue); color: var(--accent-blue)">Context Protected</span>
            `;
            lineText.appendChild(popover);
        }

        lineRow.appendChild(lineNum);
        lineRow.appendChild(lineText);
        renderedLinesTarget.appendChild(lineRow);
    });

    // 4. Render Dashboard Breakdown Badges in real-time
    criticalPolicies.forEach(policy => {
        const count = categoryCounts[policy.id] || 0;
        const badge = document.getElementById(`badge-${policy.id}`);
        const itemCard = document.getElementById(`breakdown-${policy.id}`);
        if (badge) {
            if (count > 0) {
                badge.innerText = `${count} found`;
                badge.className = "breakdown-badge badge-alert";
                if (itemCard) itemCard.classList.add("flagged-active");
            } else {
                badge.innerText = "0 found";
                badge.className = "breakdown-badge badge-neutral";
                if (itemCard) itemCard.classList.remove("flagged-active");
            }
        }
    });

    // 5. Update Safety Widget Card state
    if (totalFlagsFound === 0) {
        safetyCard.className = "status-card state-safe";
        safetyIcon.className = "fa-solid fa-circle-check status-main-icon";
        safetyStatusText.innerText = "Safe Profile";
        safetySubText.innerText = "No critical personal crisis or inappropriate disclosures flagged.";
    } else {
        safetyCard.className = "status-card state-flagged";
        safetyIcon.className = "fa-solid fa-triangle-exclamation status-main-icon";
        safetyStatusText.innerText = "Flagged Content";
        safetySubText.innerText = `${totalFlagsFound} critical text violation flags triggered. Review inspector details below.`;
    }

    // 6. Update ATS Radial Progress percentage (213.6 circum)
    const atsScorePercent = Math.round((atsChecksPassed / ATS_AUDITS.length) * 100);
    const scoreOffset = 213.6 - (213.6 * (atsScorePercent / 100));
    atsProgress.style.strokeDashoffset = scoreOffset;
    
    // Transition stroke colors
    if (atsScorePercent >= 80) {
        atsProgress.style.stroke = "var(--accent-emerald)";
    } else if (atsScorePercent >= 55) {
        atsProgress.style.stroke = "var(--accent-warning)";
    } else {
        atsProgress.style.stroke = "var(--accent-danger)";
    }
    atsPercentageText.innerText = `${atsScorePercent}%`;

    // 7. Update Vocabulary Strength Indicator
    const verbCount = uniquePowerVerbs.size;
    if (verbCount >= 8) {
        vocabCard.className = "status-card state-excellent";
        vocabIcon.className = "fa-solid fa-graduation-cap status-main-icon";
        vocabStatusText.innerText = "Excellent";
        vocabSubText.innerText = `Strong vocabulary! Matched ${verbCount} unique professional active verbs.`;
    } else if (verbCount >= 4) {
        vocabCard.className = "status-card state-strong";
        vocabIcon.className = "fa-solid fa-graduation-cap status-main-icon";
        vocabStatusText.innerText = "Strong";
        vocabSubText.innerText = `Good usage. Matched ${verbCount} unique active verbs. Add a few more for maximum impact.`;
    } else {
        vocabCard.className = "status-card state-weak";
        vocabIcon.className = "fa-solid fa-graduation-cap status-main-icon";
        vocabStatusText.innerText = "Weak";
        vocabSubText.innerText = `Only found ${verbCount} unique active verbs. We suggest adding high-impact actions (e.g. Spearheaded).`;
    }

    // 8. Populating Flagged Policy Violations Matrix
    if (totalFlagsFound > 0) {
        inspectorGrid.classList.add("has-violations");
        matrixContainer.style.display = "block";
        matrixTbody.innerHTML = "";

        allViolations.forEach(violation => {
            const row = document.createElement("tr");

            // Recommendation mapping based on policy ID or category name
            let recommendation = "Redact personal details to keep the focus strictly on technical skills and professional achievements.";
            if (violation.id === "addiction") {
                recommendation = "Remove explicit self-disclosures of substance dependence. Focus on technical or team achievements.";
            } else if (violation.id === "suicide") {
                recommendation = "High-risk language. Omit descriptions of life-saving or self-harm events on standard applications.";
            } else if (violation.id === "depression") {
                recommendation = "Redact personal medical/psychiatric breakdown references to keep the focus strictly on skills.";
            } else if (violation.id === "grief") {
                recommendation = "Personal tragedy counselor details should be summarized under neutral leadership or voluntary work.";
            }

            row.innerHTML = `
                <td><span class="matrix-badge-line">Line ${violation.lineNumber}</span></td>
                <td><span class="matrix-badge-cat" style="background: ${violation.color}22; color: ${violation.color}; border-color: ${violation.color}44">${violation.category}</span></td>
                <td><span class="matrix-term">"${violation.term}"</span></td>
                <td class="matrix-action">${recommendation}</td>
            `;
            matrixTbody.appendChild(row);
        });
    } else {
        inspectorGrid.classList.remove("has-violations");
        matrixContainer.style.display = "none";
        matrixTbody.innerHTML = "";
    }
}

btnScan.addEventListener("click", () => {
    executeSafetyAndAtsAudit();
});


// ==========================================================================
// FILE UPLOAD AND PARSING INTEGRATION (.TXT & .PDF SUPPORT)
// ==========================================================================

dropZone.addEventListener("click", () => fileInput.click());
fileInput.addEventListener("change", handleFileSelect);

dropZone.addEventListener("dragover", (e) => {
    e.preventDefault();
    dropZone.classList.add("dragover");
});

dropZone.addEventListener("dragleave", () => {
    dropZone.classList.remove("dragover");
});

dropZone.addEventListener("drop", (e) => {
    e.preventDefault();
    dropZone.classList.remove("dragover");
    if (e.dataTransfer.files.length > 0) {
        processUploadedFile(e.dataTransfer.files[0]);
    }
});

function handleFileSelect(e) {
    if (e.target.files.length > 0) {
        processUploadedFile(e.target.files[0]);
    }
}

function processUploadedFile(file) {
    const isTxt = file.type === "text/plain" || file.name.endsWith(".txt");
    const isPdf = file.type === "application/pdf" || file.name.endsWith(".pdf");

    if (!isTxt && !isPdf) {
        alert("Unsupported file type. Please upload a .txt or .pdf file.");
        return;
    }

    if (isTxt) {
        const reader = new FileReader();
        reader.onload = (event) => {
            resumeTextArea.value = event.target.result;
            resetDashboard();
        };
        reader.readAsText(file);
    } else if (isPdf) {
        if (!window.pdfjsLib) {
            alert("PDF.js library is not loaded. Please verify your connection.");
            return;
        }

        resumeTextArea.value = "[Extracting plain text from PDF document... Please wait]";
        resumeTextArea.disabled = true;

        const reader = new FileReader();
        reader.onload = function(event) {
            const typedarray = new Uint8Array(event.target.result);
            
            pdfjsLib.getDocument({ data: typedarray }).promise.then(function(pdf) {
                let maxPages = pdf.numPages;
                let countPromises = [];
                
                for (let j = 1; j <= maxPages; j++) {
                    countPromises.push(
                        pdf.getPage(j).then(function(page) {
                            return page.getTextContent().then(function(textContent) {
                                return textContent.items.map(function(item) {
                                    return item.str;
                                }).join(' ');
                            });
                        })
                    );
                }
                
                return Promise.all(countPromises).then(function(pageTexts) {
                    resumeTextArea.value = pageTexts.join('\n');
                    resumeTextArea.disabled = false;
                    resetDashboard();
                });
            }).catch(function(err) {
                console.error("PDF parsing error:", err);
                resumeTextArea.value = "";
                resumeTextArea.disabled = false;
                alert("Error parsing PDF file: " + err.message);
                resetDashboard();
            });
        };
        reader.readAsArrayBuffer(file);
    }
}


// ==========================================================================
// DOCUMENT LIFE RUN
// ==========================================================================

document.addEventListener("DOMContentLoaded", () => {
    loadRules();
    setupTabNavigation();
    renderActiveViolationFilters();
    resetDashboard();
});
