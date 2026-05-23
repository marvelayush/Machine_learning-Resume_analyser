#!/usr/bin/env python3
import sys
import re
import os

try:
    import pypdf
except ImportError:
    pypdf = None

# ANSI Terminal Colors
COLOR_RESET = "\033[0m"
COLOR_BOLD = "\033[1m"
COLOR_GREEN = "\033[92m"
COLOR_RED = "\033[91m"
COLOR_YELLOW = "\033[93m"
COLOR_BLUE = "\033[94m"
COLOR_CYAN = "\033[96m"

# Expanded safety classification dictionaries
FLAG_CATEGORIES = {
    "Substance Abuse / Addiction": [
        r"\bweed\b", r"\baddiction\b", r"\bdrugs?\b", r"\balcoholism\b", r"\bmarijuana\b",
        r"\bsubstance abuse\b", r"\baddicted\b", r"\bintoxicated\b", r"\bdependency\b"
    ],
    "Suicide / Self-Harm": [
        r"\bsuicide\b", r"\bkill myself\b", r"\bself-harm\b", r"\bswallow.*pills\b", r"\bharming myself\b",
        r"\btake my own life\b", r"\bended life\b", r"\bslashed wrists\b", r"\boverdose\b"
    ],
    "Severe Depression / Emotional Crisis": [
        r"\bsevere depression\b", r"\bdepressed\b", r"\bemotional problems?\b", r"\bmental breakdown\b",
        r"\bpsychiatric ward\b", r"\btherapist\b", r"\bclinical depression\b", r"\bpanic attacks?\b"
    ],
    "Grief & Personal Loss": [
        r"\bdeath and loss\b", r"\bgrief\b", r"\bloss of a (gf|girlfriend|bf|boyfriend|spouse|friend|parent|father|mother)\b",
        r"\bpassed away\b", r"\bmourning\b", r"\btragedy\b"
    ]
}

# Resume sections for ATS scoring
ATS_SECTIONS = {
    "Contact Information": r"\b(email|phone|contact|address|location|linkedin|github)\b",
    "Career Objective": r"\b(objective|summary|profile|about me)\b",
    "Education": r"\b(education|academic|college|university|btech|degree|school)\b",
    "Technical Skills": r"\b(skills?|technical skills|programming|technologies|tools)\b",
    "Projects": r"\b(projects?|academic projects|built a|implemented)\b",
    "Experience / Training": r"\b(experience|internship|training|work experience|employment)\b",
    "Achievements / Certifications": r"\b(achievements?|certifications?|awards?|honors?)\b"
}

# Strong professional active verbs for vocabulary audit
ACTION_VERBS = [
    r"\b(designed|engineered|spearheaded|developed|implemented|optimized|coordinated|led|managed|built|created|architected|resolved|improved|achieved|formulated|executed|overhauled|streamlined|initiated)\b"
]

def analyze_resume(filepath):
    if not os.path.exists(filepath):
        print(f"{COLOR_RED}Error: File '{filepath}' does not exist.{COLOR_RESET}")
        sys.exit(1)
        
    is_pdf = filepath.lower().endswith(".pdf")
    
    if is_pdf:
        if pypdf is None:
            print(f"{COLOR_RED}Error: 'pypdf' library is missing but is required to read PDF files.{COLOR_RESET}")
            print(f"Please install it using: {COLOR_YELLOW}pip install pypdf{COLOR_RESET}\n")
            sys.exit(1)
        try:
            reader = pypdf.PdfReader(filepath)
            content_parts = []
            for page in reader.pages:
                text = page.extract_text()
                if text:
                    content_parts.append(text)
            content = "\n".join(content_parts)
        except Exception as e:
            print(f"{COLOR_RED}Error reading PDF file '{filepath}': {e}{COLOR_RESET}")
            sys.exit(1)
    else:
        with open(filepath, "r", encoding="utf-8") as f:
            content = f.read()

    lines = content.splitlines()
    print(f"\n{COLOR_BOLD}{COLOR_BLUE}=================================================={COLOR_RESET}")
    print(f"{COLOR_BOLD}{COLOR_BLUE}>> RESUME SAFETY & ATS SCANNER CLI (PDF ACTIVE){COLOR_RESET}")
    print(f"{COLOR_BOLD}{COLOR_BLUE}=================================================={COLOR_RESET}")
    print(f"{COLOR_BOLD}Target File:{COLOR_RESET} {filepath} ({'PDF Document' if is_pdf else 'Plain Text File'})")
    print(f"{COLOR_BOLD}Total Length:{COLOR_RESET} {len(lines)} lines ({len(content)} characters)\n")

    # 1. SCAN FOR SAFETY FLAGS
    found_flags = []
    for line_idx, line in enumerate(lines, 1):
        for category, patterns in FLAG_CATEGORIES.items():
            for pattern in patterns:
                match = re.search(pattern, line, re.IGNORECASE)
                if match:
                    found_flags.append({
                        "line_number": line_idx,
                        "text": line.strip(),
                        "category": category,
                        "match": match.group()
                    })

    # 2. SCAN FOR ATS SECTIONS
    found_sections = {}
    for section_name, pattern in ATS_SECTIONS.items():
        match_count = 0
        for line in lines:
            if re.search(pattern, line, re.IGNORECASE):
                match_count += 1
        found_sections[section_name] = match_count > 0

    # 3. SCAN FOR RESUME ACTION VERBS
    found_verbs = []
    for line in lines:
        for pattern in ACTION_VERBS:
            matches = re.findall(pattern, line, re.IGNORECASE)
            for m in matches:
                if m.lower() not in [v.lower() for v in found_verbs]:
                    found_verbs.append(m)

    # 4. COMPUTE METRICS
    ats_score = int((sum(found_sections.values()) / len(ATS_SECTIONS)) * 100)
    is_safe = len(found_flags) == 0

    # 5. REPORT SAFETY STATUS
    print(f"{COLOR_BOLD}[*] SAFETY SCAN RESULTS:{COLOR_RESET}")
    if is_safe:
        print(f"  {COLOR_BOLD}{COLOR_GREEN}[SAFE] PASSED: No sensitive safety concerns flagged.{COLOR_RESET}")
    else:
        print(f"  {COLOR_BOLD}{COLOR_RED}[WARNING] FAILED: {len(found_flags)} safety flags detected!{COLOR_RESET}")
        for flag in found_flags:
            print(f"    {COLOR_BOLD}{COLOR_YELLOW}[Line {flag['line_number']}]{COLOR_RESET} ({COLOR_CYAN}{flag['category']}{COLOR_RESET})")
            print(f"      - Text: \"{flag['text']}\"")
            print(f"      - Flagged Term: {COLOR_RED}'{flag['match']}'{COLOR_RESET}\n")

    # 6. REPORT ATS SCORE
    print(f"\n{COLOR_BOLD}[*] ATS STRUCTURAL SCORE:{COLOR_RESET}")
    color_score = COLOR_GREEN if ats_score >= 80 else (COLOR_YELLOW if ats_score >= 50 else COLOR_RED)
    print(f"  {COLOR_BOLD}Score:{COLOR_RESET} {color_score}{ats_score}%{COLOR_RESET}")
    
    print(f"  {COLOR_BOLD}Section Checklist:{COLOR_RESET}")
    for section_name, found in found_sections.items():
        status_icon = f"{COLOR_GREEN}[X]{COLOR_RESET}" if found else f"{COLOR_RED}[ ]{COLOR_RESET}"
        print(f"    {status_icon} {section_name}")

    # 7. REPORT VOCABULARY STRENGTH
    print(f"\n{COLOR_BOLD}[*] PROFESSIONAL VOCABULARY AUDIT:{COLOR_RESET}")
    verb_count = len(found_verbs)
    if verb_count >= 8:
        strength = f"{COLOR_GREEN}EXCELLENT ({verb_count} action verbs){COLOR_RESET}"
    elif verb_count >= 4:
        strength = f"{COLOR_YELLOW}STRONG ({verb_count} action verbs){COLOR_RESET}"
    else:
        strength = f"{COLOR_RED}WEAK ({verb_count} action verbs found - suggest adding more active verbs){COLOR_RESET}"
    print(f"  {COLOR_BOLD}Vocabulary Strength:{COLOR_RESET} {strength}")
    if found_verbs:
        print(f"  {COLOR_BOLD}Matched Power Verbs:{COLOR_RESET} {', '.join(found_verbs)}")

    print(f"\n{COLOR_BOLD}{COLOR_BLUE}=================================================={COLOR_RESET}\n")

def main():
    if len(sys.argv) < 2:
        print(f"{COLOR_RED}Usage: python resume_analyzer.py <path_to_resume_file>{COLOR_RESET}")
        sys.exit(1)
        
    filepath = sys.argv[1]
    analyze_resume(filepath)

if __name__ == "__main__":
    main()
