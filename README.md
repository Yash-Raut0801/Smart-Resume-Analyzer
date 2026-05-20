# 📄 Smart Resume Analyzer

> An employer-facing recruitment tool that automatically evaluates candidate resumes, assigns skill-based scores, suggests job roles, and ranks applicants — built with the MERN stack.

![Node.js](https://img.shields.io/badge/Node.js-18.x-339933?style=flat&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-4.x-000000?style=flat&logo=express&logoColor=white)
![React](https://img.shields.io/badge/React-19.x-61DAFB?style=flat&logo=react&logoColor=black)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=flat&logo=mongodb&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-yellow?style=flat)

---

## 📌 Table of Contents

- [About](#-about)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [API Reference](#-api-reference)
- [Scoring Logic](#-scoring-logic)
- [OOP Concepts](#-oop-concepts-java-origin)
- [Author](#-author)

---

## 🧠 About

Smart Resume Analyzer is my OOP Mini Project originally implemented in Java and ported to a full MERN stack web application. It is designed for **employers and HR teams** to efficiently manage, evaluate, and rank candidates based on their technical skills and experience — eliminating manual resume screening.

---

## ✨ Features

| Feature                | Description                                                                |
| ---------------------- | -------------------------------------------------------------------------- |
| 📊 **Dashboard**       | Live stats — total candidates, average score, top score, role distribution |
| ➕ **Add Candidate**   | Register applicants with skills, email, and experience                     |
| 🔍 **Search by Skill** | Instantly filter candidates by any technical skill                         |
| 📋 **All Candidates**  | View all registered applicants with score badges and role tags             |
| 🏆 **Rankings**        | Leaderboard with podium view for top 3 performers                          |
| 🗑️ **Delete**          | Remove candidates from the system                                          |
| 🤖 **Auto Scoring**    | Score calculated automatically on submission                               |
| 💼 **Role Suggestion** | AI-style role recommendation based on skill set                            |

---

## 🛠 Tech Stack

**Frontend**

- React 19
- Axios
- CSS3 (custom dark theme, Google Fonts)

**Backend**

- Node.js + Express 4
- Mongoose (MongoDB ODM)
- dotenv, cors, nodemon

**Database**

- MongoDB Atlas (Non-SRV connection)

---

## 📁 Project Structure

```
smart-resume-analyzer/
│
├── backend/
│   ├── config/
│   │   └── db.js                 # MongoDB connection
│   ├── controllers/
│   │   └── candidateController.js # Business logic (scoring, roles)
│   ├── models/
│   │   └── Candidate.js          # Mongoose schema
│   ├── routes/
│   │   └── candidateRoutes.js    # API route definitions
│   ├── .env                      # Environment variables (not committed)
│   ├── .env.example              # Template for environment setup
│   ├── server.js                 # Express app entry point
│   └── package.json
│
├── frontend/
│   ├── public/
│   └── src/
│       ├── components/
│       │   ├── AddCandidate.js   # Add candidate form
│       │   ├── CandidateList.js  # All candidates view
│       │   ├── Dashboard.js      # Stats & charts
│       │   ├── Ranking.js        # Leaderboard
│       │   └── SearchBySkill.js  # Skill search
│       ├── api.js                # Axios base config
│       ├── App.js                # Root component + sidebar nav
│       ├── App.css               # Global styles
│       └── index.js
│
├── .gitignore
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have these installed:

- [Node.js](https://nodejs.org/) v18 or above
- [Git](https://git-scm.com/)
- A [MongoDB Atlas](https://cloud.mongodb.com/) account (free tier works)

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/smart-resume-analyzer.git
cd smart-resume-analyzer
```

### 2. Setup Backend

```bash
cd backend
npm install
```

Create your `.env` file (see [Environment Variables](#-environment-variables) below), then:

```bash
npm run dev
```

You should see:

```
Server running on port 8000
MongoDB Connected
```

### 3. Setup Frontend

Open a **new terminal**:

```bash
cd frontend
npm install
npm start
```

App opens at `http://localhost:3000` ✅

---

## 🔐 Environment Variables

Create a file called `.env` inside the `backend/` folder:

```env
MONGO_URI=mongodb://username:password@host1:27017,host2:27017/resumedb?ssl=true&replicaSet=atlas-xxxxx&authSource=admin
PORT=yourportnumber
```

> ⚠️ **Never commit your `.env` file.** It is already listed in `.gitignore`.

> 💡 **Tip for Indian networks:** If `mongodb+srv://` gives `querySrv ECONNREFUSED`, use the **Non-SRV** connection string from Atlas → Connect → Drivers → toggle _"I can't use a DNS SRV connection"_.

Copy `.env.example` as a template:

```bash
cp .env.example .env
```

---

## 🎓 OOP Concepts (Java Origin)

This project was originally built in Java demonstrating core OOP principles, then ported to MERN:

| Concept           | Java Implementation             | MERN Equivalent                        |
| ----------------- | ------------------------------- | -------------------------------------- |
| **Encapsulation** | `private` fields in `Candidate` | Mongoose schema with controlled access |
| **Inheritance**   | `Candidate extends Person`      | Shared fields across models            |
| **Polymorphism**  | Overridden `display()` method   | Component-level rendering              |
| **Abstraction**   | `abstract class ResumeAnalyzer` | Controller functions hiding DB logic   |
| **Interface**     | `SkillEvaluator` interface      | `evaluateSkills()` in controller       |
| **Generics**      | `ResumeDatabase<T>`             | Mongoose generic model pattern         |
| **Collections**   | `ArrayList`, `HashMap`          | MongoDB documents + Atlas              |

---

## 👨‍💻 Author

**Yash Rajendra Raut**

---

## 📜 License

This project is licensed under the [MIT License](LICENSE).

---

> ⭐ If this project helped you, consider giving it a star on GitHub!
