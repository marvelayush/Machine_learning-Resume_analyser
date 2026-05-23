# 🛡️ Resume Shield AI
### Machine Learning Resume Analyser

<p align="center">
  <img src="https://img.shields.io/badge/HTML5-Frontend-orange?style=for-the-badge&logo=html5">
  <img src="https://img.shields.io/badge/CSS3-Glassmorphism-blue?style=for-the-badge&logo=css3">
  <img src="https://img.shields.io/badge/JavaScript-Interactive-yellow?style=for-the-badge&logo=javascript">
  <img src="https://img.shields.io/badge/Python-CLI_Tool-green?style=for-the-badge&logo=python">
  <img src="https://img.shields.io/badge/PDF.js-Supported-red?style=for-the-badge">
  <img src="https://img.shields.io/badge/Netlify-Deployed-success?style=for-the-badge&logo=netlify">
</p>

<p align="center">
  🚀 AI-powered Resume Safety & ATS Analysis Tool with PDF support, interactive dashboard, and Python CLI scanner.
</p>

---

# 🌐 Live Demo

### 🔗 Netlify Deployment

https://splendid-bublanina-05a513.netlify.app

---

# 📌 GitHub Repository

### 🔗 Repository Link

https://github.com/marvelayush/Machine_learning-Resume_analyser

---

# ✨ Features

## 🛡️ Safety Screening

Detects sensitive or risky resume content related to:

- Substance abuse
- Suicide / self-harm
- Depression / emotional crisis
- Grief & personal loss

---

## 📊 ATS Structural Audit

Checks whether the resume contains important ATS sections:

- Contact Information
- Career Objective
- Education
- Technical Skills
- Projects
- Experience / Training
- Achievements / Certifications

---

## 🖥️ Interactive Resume Inspector

- Highlights flagged lines
- Shows line-by-line analysis
- Displays detailed warning tooltips
- Provides category-wise breakdown

---

## ⚙️ Dynamic Classification Rules

Users can:

- Add custom categories
- Add/remove keywords
- Configure exclusions
- Save rules automatically using localStorage

---

## 📂 File Upload Support

Supports:

- `.txt`
- `.pdf`

PDF parsing handled completely in-browser using **PDF.js**.

---

## 🎯 Vocabulary Strength Analysis

Detects strong professional action verbs such as:

- developed
- implemented
- optimized
- created
- designed
- managed
- engineered
- improved

---

# 🧰 Tech Stack

## 🌐 Frontend

- HTML5
- CSS3
- JavaScript
- PDF.js
- Font Awesome
- Google Fonts

---

## 🐍 Backend / CLI

- Python
- Regex-based text analysis
- pypdf library

---

## 💾 Storage

- Browser localStorage for saving custom rules

---

# 🏗️ Project Structure

```bash
Machine_learning-Resume_analyser/
│
├── index.html
├── style.css
├── app.js
├── resume_analyzer.py
├── sampleresume.txt
├── flagged.txt
├── MLG.ipynb
├── requirements.txt
└── README.md
```

---

# 🚀 How To Run The Project

# 1️⃣ Run The Web Application

You can run the project in two ways.

---

## ✅ Option A — Open Directly

Simply open:

```bash
index.html
```

---

## ✅ Option B — Run Using Local Server

Open terminal in the project folder and run:

```bash
python -m http.server 8000
```

Now open this in browser:

```bash
http://localhost:8000
```

---

# 2️⃣ Run The Python CLI Scanner

## ✅ Scan Clean Resume

```bash
python resume_analyzer.py sampleresume.txt
```

---

## ⚠️ Scan Flagged Resume

```bash
python resume_analyzer.py flagged.txt
```

---

## 📄 Scan Custom Resume

```bash
python resume_analyzer.py your_resume.txt
```

---

# 📦 Install Dependencies

Install required Python package:

```bash
pip install pypdf
```

---

# 📜 requirements.txt

Create a file named:

```bash
requirements.txt
```

Add this inside:

```txt
pypdf
```

Install using:

```bash
pip install -r requirements.txt
```

---

# 🎨 Web Dashboard Includes

✅ Resume Playground  
✅ Classification Rules Tab  
✅ Real-time Analytics Dashboard  
✅ ATS Score Gauge  
✅ Safety Status Card  
✅ Vocabulary Strength Meter  
✅ Interactive Document Inspector  
✅ Line-by-line Resume Highlighting  

---

# 🔍 What The Project Detects

# 🛡️ Safety Categories

- Substance Abuse / Addiction
- Suicide / Self-Harm
- Depression / Emotional Crisis
- Grief & Personal Loss

---

# 📊 ATS Checks

- Contact Information
- Career Objective
- Education
- Technical Skills
- Projects
- Experience / Training
- Certifications

---

# 🎯 Vocabulary Audit

- Counts professional action verbs
- Detects weak resume wording
- Suggests stronger resume writing
- Highlights matched verbs

---

# ⚡ How It Works

1. Upload or paste resume text
2. Click **Analyze Resume**
3. System scans the document
4. Dashboard updates in real-time
5. Flagged lines appear in inspector panel
6. ATS score and vocabulary score are calculated
7. Users can customize rules dynamically

---

# 🧠 Technical Highlights

- Regex-based NLP detection
- Real-time DOM rendering
- Dynamic rule engine
- Client-side PDF extraction
- Interactive dashboard widgets
- Glassmorphism UI design
- Responsive layout
- Local browser persistence
- CLI support for terminal analysis

---

# 📸 Screenshots

## 🖥️ Main Dashboard

_Add screenshot here_

```md
![Dashboard](assets/dashboard.png)
```

---

## 🛡️ Resume Inspector

_Add screenshot here_

```md
![Inspector](assets/inspector.png)
```

---

## 📊 ATS Analysis

_Add screenshot here_

```md
![ATS](assets/ats.png)
```

---

# 🌍 Deployment

## 🚀 Netlify Deployment

This project is fully deployed on Netlify.

### Live URL:

https://splendid-bublanina-05a513.netlify.app

---

# 🚀 How To Deploy

## Using Netlify

### Step 1

Upload project to GitHub.

---

### Step 2

Open:

https://app.netlify.com

---

### Step 3

Click:

```text
Add new site
→ Import existing project
→ GitHub
```

---

### Step 4

Select repository:

```text
Machine_learning-Resume_analyser
```

---

### Step 5

Deploy settings:

#### Build Command

Leave EMPTY

#### Publish Directory

```bash
.
```

---

### Step 6

Click:

```text
Deploy Site
```

Netlify will automatically generate a live website URL.

---

# 💡 Future Improvements

- 🤖 AI Resume Suggestions
- ☁️ Cloud Database Integration
- 📄 DOCX Support
- 🌍 Multi-language Resume Support
- 🔐 Authentication System
- 📈 ML-based Resume Scoring

---

# 📚 Use Cases

✅ Resume review systems  
✅ ATS optimization tools  
✅ Resume safety screening  
✅ Career guidance platforms  
✅ Educational projects  
✅ HR compliance systems  

---

# 👨‍💻 Author

## Ayush Narayan

🎓 BTech ISE Student  
💻 Developer & Tech Enthusiast  
🚀 Passionate about AI, ML & Full Stack Projects

---

# ⭐ Support

If you like this project:

⭐ Star the repository  
🍴 Fork the project  
🛠️ Contribute improvements  

---

# 📄 License

This project is licensed under the MIT License.

---

# 🏷️ GitHub Topics

```text
machine-learning
resume-analyzer
ats-checker
pdf-parser
javascript
python
html
css
ai-project
frontend
netlify
resume-scanner
```
