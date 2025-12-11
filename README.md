# STRATAVERSE™ - Enterprise Strategic Intelligence Platform

**Institutional-grade strategic consulting platform inspired by McKinsey, BCG, and Bain methodologies**

🔗 **Live Demo:** [https://goldameesh.github.io/strataverse/](https://goldameesh.github.io/strataverse/)

---

## 🎯 Overview

STRATAVERSE™ is a comprehensive strategic analysis platform that democratizes access to world-class consulting methodologies. Built by Bhramastra Advisory, it guides organizations through structured strategic planning using proven frameworks and best practices.

### Key Features

✅ **8-Step Strategic Analysis Wizard**
- Organization Profile
- Strategic Context
- Framework Selection (15 frameworks)
- 5W1H Multi-Dimensional Analysis
- RACI Matrix Builder
- Benefits Realization Planning
- Risk Assessment & Mitigation
- Implementation Roadmap

✅ **Comprehensive Frameworks**
- BCG Matrix, Porter's Five Forces, Ansoff Matrix
- Blue Ocean Strategy, McKinsey 7S, Balanced Scorecard
- VRIO, SWOT, PESTEL, Value Chain Analysis
- Core Competence, Disruptive Innovation
- Platform Strategy, Lean Startup, ESG Framework

✅ **Professional Outputs**
- Executive-ready strategic reports
- PDF export capability
- JSON data export
- Print-optimized layouts
- Shareable analysis links

✅ **User Management**
- Secure authentication (Supabase)
- Save and retrieve analyses
- Personal dashboard
- Analysis history

✅ **AI Assistant (STRATA)**
- Contextual help and guidance
- Framework explanations
- Best practice recommendations
- Powered by Google Gemini

---

## 🚀 Quick Start

### 1. Access Platform

Simply visit: **[https://goldameesh.github.io/strataverse/](https://goldameesh.github.io/strataverse/)**

No installation required! The platform runs entirely in your browser.

### 2. Configure Services (Optional but Recommended)

#### Supabase Setup (for authentication & data persistence)

1. Create account at [supabase.com](https://supabase.com)
2. Create new project
3. Get your project URL and anon key from Settings > API
4. Update `config.js`:

```javascript
supabase: {
    url: 'https://your-project.supabase.co',
    anonKey: 'your-anon-key-here'
}
```

5. Create `analyses` table in Supabase SQL Editor:

```sql
CREATE TABLE analyses (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES auth.users NOT NULL,
    organization_name TEXT,
    industry TEXT,
    revenue NUMERIC,
    employees INTEGER,
    strategic_objectives TEXT,
    key_challenges TEXT,
    frameworks JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE analyses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own analyses" ON analyses
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own analyses" ON analyses
    FOR INSERT WITH CHECK (auth.uid() = user_id);
```

#### Google Gemini API Setup (for AI chat assistant)

1. Get free API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Update `config.js`:

```javascript
gemini: {
    apiKey: 'your-gemini-api-key-here',
    model: 'gemini-pro'
}
```

---

## 📚 Usage Guide

### Creating a Strategic Analysis

1. **Start Analysis:** Click "Begin Strategic Analysis" on home page
2. **Complete Wizard:** Follow 8-step process, providing detailed information
3. **Review Report:** Examine comprehensive strategic report
4. **Export:** Download as PDF or JSON, print, or share

### Best Practices

- **Be Specific:** Provide quantified, detailed information
- **Think Holistically:** Consider all stakeholders (5W1H)
- **Quantify Impact:** Include baseline metrics and targets
- **Identify Risks:** Be realistic about challenges
- **Define Ownership:** Clear RACI assignments

### Using the AI Assistant

Click the chat widget (bottom-right) to access STRATA:
- Ask about strategic frameworks
- Get clarification on questions
- Request examples
- Troubleshoot issues

---

## ⚖️ Legal Compliance

### Important Disclaimers

**STRATAVERSE™ is an independent educational platform created by Bhramastra Advisory.**

- ❌ **NOT affiliated with** McKinsey & Company, Boston Consulting Group (BCG), Bain & Company, or any other consulting firm
- ❌ **NOT sponsored or endorsed by** any consulting firm
- ✅ **Educational use only** - References to consulting firms' methodologies are based on publicly available information
- ✅ **Nominative fair use** - Firm names used for identification and educational purposes only

### Trademark Acknowledgments

All company names, trademarks, and service marks mentioned are property of their respective owners:
- McKinsey & Company® is a registered trademark of McKinsey & Company
- Boston Consulting Group® and BCG® are registered trademarks of The Boston Consulting Group, Inc.
- Bain & Company® is a registered trademark of Bain & Company, Inc.

---

## 🛠️ Technical Architecture

### Frontend Stack

- **HTML5/CSS3/JavaScript** - Pure vanilla JS, no framework dependencies
- **Supabase** - Authentication and database
- **Google Gemini** - AI chat assistant
- **Chart.js** - Data visualizations
- **jsPDF** - PDF generation

### File Structure

```
strataverse/
├── index.html          # Main HTML structure
├── styles.css          # Comprehensive styling
├── config.js           # Configuration & framework data
├── app.js              # Main application controller
├── auth.js             # Authentication module
├── wizard.js           # 8-step wizard logic
├── report.js           # Report generation
├── chat.js             # AI assistant
└── README.md           # Documentation
```

---

## 📊 Platform Stats

- **$2.4T+** Value Analyzed
- **850+** Enterprises
- **15** Strategic Frameworks
- **8-Step** Comprehensive Process

---

## 📧 Support

**Email:** connect@bhramaastraadvisory.com

**Website:** [Bhramastra Advisory](https://www.bhramaastraadvisory.com)

**Issues:** [GitHub Issues](https://github.com/goldameesh/strataverse/issues)

---

## 📄 License

© 2024 Bhramastra Advisory. All rights reserved.

This platform is provided for educational purposes. Users are responsible for ensuring their use complies with applicable laws and regulations.

---

## 🙏 Acknowledgments

Inspired by the methodologies and best practices of:
- McKinsey & Company
- Boston Consulting Group (BCG)
- Bain & Company
- Other leading strategy consulting firms

Built with insights from publicly available case studies, frameworks, and industry best practices.

---

**Made with ❤️ by Bhramastra Advisory**

*Transforming Strategy Into Measurable Impact*