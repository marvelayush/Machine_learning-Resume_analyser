# 🛡️ Resume Safety & ATS Analysis Suite

A dual-interface workspace designed to audit resumes for **workplace safety compliance** (detecting sensitive personal disclosures regarding crisis, addiction, self-harm, and grief) and **ATS structural compatibility** (ensuring all standard resume modules are present).

The project contains a **futuristic single-page web dashboard** and a **fully cross-platform Python CLI utility**.

---

## 🚀 Features

1. **🛡️ Advanced Safety screening**:
   Scans text line-by-line for sensitive keywords matching:
   - **Substance Addiction** (drug use, weed, alcoholism).
   - **Suicide & Self-Harm** (crisis prevention, pills overdose references).
   - **Depression / Personal Crisis** (severe clinical depression, mental breakdown).
   - **Grief & Grief Support** (bereavement, traumatic family loss details).
2. **📊 ATS Structural Audit**:
   Ensures standard resume layout parsing blocks are included:
   - Contact Info, objective, Education History, Technical Skills, Projects, Experience, and Certifications.
3. **🖥️ Interactive Inspector**:
   Highlights exactly where safety flags occurred in the document and overlays detailed warning tooltips explaining the compliance issues.

---

## 🌐 1. Running the Web Application (Interactive Dashboard)

The web dashboard is fully client-side and runs locally on any web browser **without server dependencies** (pre-loaded presets for clean and flagged resumes are embedded).

### Option A: Double-Click
Simply navigate to your project directory and double-click:
📂 **`index.html`**

### Option B: Local HTTP Server (Python)
To run a local server in the project directory, execute:
```bash
python -m http.server 8000
```
Then open your browser and navigate to:
🌐 **`http://localhost:8000`**

---

## 🐍 2. Running the Python CLI Tool

The suite includes a fully Windows-compatible and CP1252-safe CLI script that parses text files:

### Scan the Clean Resume:
```bash
python resume_analyzer.py sampleresume.txt
```

### Scan the Flagged Resume:
```bash
python resume_analyzer.py flagged.txt
```

### Scan a Custom Resume:
```bash
python resume_analyzer.py <path_to_your_file.txt>
```

---

## 📂 Project Structure

```plaintext
resume_flag/
├── index.html           # Premium glassmorphic SPA dashboard
├── style.css            # Dark mode, animated glow blobs, progress gauges
├── app.js               # Parsing engine, preset datasets, line highlights
├── resume_analyzer.py   # Windows-safe console safety screening tool
├── MLG.ipynb            # Original Machine Learning Lab reference notebook
├── sampleresume.txt     # Standard baseline clean engineering resume
└── flagged.txt          # baseline resume with sensitive warning statements
```
