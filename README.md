# 📧 AI Email Management Automation

An automated email processing system built using n8n that retrieves incoming emails, classifies them using AI, stores them in a database, and sends automated responses based on email category.

---

## 🔍 Features

* 📥 Automatic email retrieval using IMAP
* 🧠 AI-powered email categorization
* 🗂 Intelligent routing based on email type
* 💾 Email storage in a structured database
* 📊 Email tracking and response status logging
* 🤖 Automated responses based on email category
* 🔄 Database updates after response delivery

---

## ⚙️ Tech Stack

* n8n (workflow automation)
* IMAP Email Trigger (incoming email retrieval)
* OpenAI API / LLM (email classification)
* PostgreSQL (database storage)
* SMTP / Gmail Node (automated email responses)

---

## 🚀 Workflow Overview

1. Retrieve incoming emails using an Email Trigger
2. Extract sender email, subject, body, and timestamp
3. Structure the email data for processing
4. Classify the email using AI
5. Store the processed email in the database
6. Route the email based on category
7. Send automated response according to the category
8. Update the database to mark response as sent

---

## 🧠 Email Categories

The system classifies emails into the following categories:

* Support Request
* Sales Inquiry
* Job Application
* Complaint
* General Question
* Spam / Irrelevant

Each category triggers a different automated response.

---

## 📁 Project Structure

* `workflow.json` → n8n workflow export

---

## 🔐 Security Note

This repository does NOT include any credentials.

To run the workflow, configure your own:

* IMAP Email credentials
* SMTP / Gmail credentials
* OpenAI API Key
* PostgreSQL database connection
