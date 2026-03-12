<div align="center">

# 📧 AI Email Management Automation

**An intelligent, fully automated email processing pipeline — powered by AI classification, structured database storage, and category-driven responses. Built with n8n.**

[![n8n](https://img.shields.io/badge/Built%20with-n8n-FF6D5A?style=flat-square&logo=n8n&logoColor=white)](https://n8n.io)
[![OpenAI](https://img.shields.io/badge/OpenAI-LLM%20Classification-412991?style=flat-square&logo=openai&logoColor=white)](https://openai.com)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-4169E1?style=flat-square&logo=postgresql&logoColor=white)](https://www.postgresql.org)
[![IMAP](https://img.shields.io/badge/IMAP-Email%20Trigger-EA4335?style=flat-square&logo=gmail&logoColor=white)](https://en.wikipedia.org/wiki/Internet_Message_Access_Protocol)

</div>

---

## 📖 Overview

The **AI Email Management Automation** system eliminates manual email triage by building a fully autonomous inbox processing pipeline. Incoming emails are retrieved, parsed, classified by an AI model, stored in a structured database, routed to the appropriate handler, and replied to — all without human intervention.

Designed for teams and individuals who need scalable, intelligent email handling with full auditability via database logging.

---

## ✨ Features

| Feature | Description |
|---|---|
| 📥 Automatic Email Retrieval | Pulls incoming emails in real-time via **IMAP trigger** |
| 🧠 AI Classification | Categorizes emails using an **LLM (OpenAI)** |
| 🗂️ Intelligent Routing | Directs each email to the appropriate response handler based on category |
| 💾 Structured Storage | Persists all email data and metadata to **PostgreSQL** |
| 📊 Response Tracking | Logs response status and timestamps for every email processed |
| 🤖 Automated Responses | Sends context-appropriate replies via **SMTP / Gmail** |
| 🔄 Status Sync | Updates the database after each response is delivered |

---

## 🏗️ Architecture & Workflow
```
Incoming Email (IMAP Trigger)
        │
        ▼
  [1] Email Extraction ───────────────────────► Sender, Subject, Body, Timestamp
        │
        ▼
  [2] Data Structuring ───────────────────────► Normalized payload for processing
        │
        ▼
  [3] AI Classification (OpenAI) ─────────────► Email Category Assignment
        │
        ▼
  [4] Database Storage (PostgreSQL) ──────────► Email + metadata persisted
        │
        ▼
  [5] Category Router ────────────────────────► Branch by email type
        │
   ┌────┴──────────────────────────────────┐
   ▼                                       ▼
Support / Sales / Application         Spam / Irrelevant
Complaint / General Question          └──► Silently discarded
   │
   ▼
  [6] Automated Response (SMTP / Gmail) ──────► Category-specific reply sent
        │
        ▼
  [7] Database Update ────────────────────────► Mark response as sent
```

---

## 🗂️ Email Categories

The AI classifier assigns each email to one of the following categories, each triggering a distinct automated response:

| Category | Description |
|---|---|
| 🛠️ Support Request | Technical issues, help requests, troubleshooting |
| 💼 Sales Inquiry | Product questions, pricing, demos, partnership interest |
| 📄 Job Application | CVs, hiring inquiries, recruitment outreach |
| ⚠️ Complaint | Negative feedback, disputes, escalations |
| ❓ General Question | Miscellaneous queries that don't fit other categories |
| 🚫 Spam / Irrelevant | Promotional noise, unsolicited email — no response sent |

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Workflow Automation | [n8n](https://n8n.io) |
| Email Retrieval | IMAP Email Trigger |
| AI Classification | [OpenAI API](https://openai.com) (or compatible LLM) |
| Database | [PostgreSQL](https://www.postgresql.org) |
| Email Delivery | SMTP / Gmail Node |

---

## 🚀 Getting Started

### Prerequisites

- [n8n](https://docs.n8n.io/hosting/) (self-hosted or cloud)
- PostgreSQL database instance
- OpenAI API key (or compatible LLM provider)
- IMAP-enabled email account
- SMTP or Gmail account for outbound responses

### Setup

1. **Clone the repository**
```bash
   git clone https://github.com/VijayPant375/AI-Email-Management-Automation.git
   cd AI-Email-Management-Automation
```

2. **Import the workflow**
   - Open your n8n instance
   - Go to **Workflows → Import from file**
   - Select `workflow.json`

3. **Configure credentials** in n8n:
   - `IMAP` — Incoming email account credentials
   - `SMTP / Gmail` — Outbound email credentials
   - `OpenAI API Key` — [Get one here](https://platform.openai.com/api-keys)
   - `PostgreSQL` — Host, port, database name, username, and password

4. **Set up the database**
   - Ensure your PostgreSQL instance is running
   - Create the required table(s) to match the workflow's insert/update nodes

5. **Activate the workflow**
   - Toggle the workflow to **Active** in n8n
   - The IMAP trigger will begin polling for new emails automatically

---

## 📁 Repository Structure
```
.
└── workflow.json       # n8n workflow export (import directly into n8n)
```

---

## 🔐 Security Note

This repository contains **no credentials or API keys**. All sensitive configuration is managed through n8n's built-in credential manager.

To run this workflow, configure your own:
- IMAP email credentials
- SMTP / Gmail credentials
- OpenAI API Key
- PostgreSQL connection details

---

## 📬 Contributing

Contributions, bug reports, and feature requests are welcome. Please open an issue or submit a pull request.

---

<div align="center">

Built by [VijayPant375](https://github.com/VijayPant375)

</div>
