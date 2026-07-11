<div align="center">

# 🧠 BrainCheck

### AI-Powered Brain Tumor Detection Platform

*Detecting brain tumors from MRI scans using deep learning, with role-based access for Admins, Doctors, and Patients.*

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-View_App-00D4AA?style=for-the-badge)](https://brain-check-brain-tumor.vercel.app)
[![GitHub](https://img.shields.io/badge/📦_GitHub-Repository-181717?style=for-the-badge&logo=github)](https://github.com/sahilsingh78/BrainCheck-Brain-tumor-)

![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react&logoColor=black)
![Flask](https://img.shields.io/badge/Flask-Backend-000000?style=flat-square&logo=flask)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=flat-square&logo=mongodb&logoColor=white)
![TensorFlow](https://img.shields.io/badge/TensorFlow-CNN-FF6F00?style=flat-square&logo=tensorflow&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-blue?style=flat-square)

</div>

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#️-tech-stack)
- [Project Structure](#-project-structure)
- [ML Model](#-ml-model)
- [Local Setup](#️-local-setup)
- [Deployment](#-deployment)
- [API Reference](#-api-reference)
- [Role-Based Access Control](#-role-based-access-control)
- [Author](#-author)

---

## ✨ Features

<table>
<tr>
<td width="50%" valign="top">

### 🔐 Authentication
- JWT-based login and registration
- 3 role types: **Patient**, **Doctor**, **Admin**
- Visual role selector on signup
- Protected routes per role

### 🧠 MRI Upload & AI Analysis
- Drag-and-drop MRI image upload
- Instant AI prediction — Tumor Detected / No Tumor
- Confidence score with visual progress bar
- MRI image stored with result in MongoDB

</td>
<td width="50%" valign="top">

### 👤 Patient
- Upload MRI scans and get instant results
- View full scan history with filters
- Read doctor review notes on each scan

### 👨‍⚕️ Doctor
- View all patient scans across the platform
- Add clinical notes and observations
- Mark scans as reviewed
- Filter by pending / reviewed / tumor

### ⚙️ Admin Panel
- View and manage all registered users
- Change user roles (Patient → Doctor → Admin)
- Delete users and their scans
- System-wide stats: users, scans, tumor cases, pending reviews

</td>
</tr>
</table>

---

## 🛠️ Tech Stack

| Layer | Technology |
|:---|:---|
| **Frontend** | React 18, React Router v6, Axios |
| **Backend** | Python, Flask, Flask-JWT-Extended |
| **Database** | MongoDB Atlas (PyMongo) |
| **ML Model** | TensorFlow/Keras CNN (binary classifier) |
| **Styling** | Custom CSS with CSS Variables |
| **Deployment** | Vercel (frontend) + Railway (backend) |

---

## 📁 Project Structure

```
BrainCheck/
├── backend/
│   ├── config/
│   │   └── config.py
│   ├── middleware/
│   │   ├── auth_middleware.py
│   │   └── role_middleware.py
│   ├── model/
│   │   └── brain_tumor_model.h5    ← trained CNN model
│   ├── models/
│   │   ├── scan_model.py
│   │   └── user_model.py
│   ├── routes/
│   │   ├── admin.py                ← admin endpoints
│   │   ├── auth.py                 ← register, login, me
│   │   ├── scans.py                ← upload, history, review
│   │   └── users.py                ← user search
│   ├── services/
│   │   └── scan_service.py
│   ├── utils/
│   │   ├── db.py                   ← MongoDB connection
│   │   └── predictor.py            ← ML model loader + predict()
│   ├── app.py                      ← Flask entry point
│   ├── Procfile
│   └── requirements.txt
│
├── frontend/
│   ├── public/
│   │   └── index.html
│   └── src/
│       ├── components/
│       │   ├── layout/
│       │   │   └── AppLayout.js    ← sidebar + hamburger menu
│       │   └── UI/
│       │       ├── Button.js
│       │       ├── Loader.js
│       │       └── Modal.js
│       ├── context/
│       │   └── AuthContext.js      ← global auth state
│       ├── pages/
│       │   ├── AdminPage.js        ← admin user + scan management
│       │   ├── DashboardPage.js    ← role-aware dashboard
│       │   ├── DoctorScansPage.js  ← doctor review queue
│       │   ├── LoginPage.js
│       │   ├── MyScansPage.js      ← patient scan history
│       │   ├── RegisterPage.js
│       │   ├── ScanDetailPage.js   ← full scan + doctor notes
│       │   └── UploadPage.js       ← drag-drop MRI upload
│       ├── routes/
│       │   └── AppRoutes.js
│       ├── utils/
│       │   └── api.js              ← axios with JWT interceptor
│       ├── App.js
│       ├── index.css
│       └── index.js
│
├── dataset/
│   ├── yes/                        ← tumor MRI images
│   └── no/                         ← no tumor MRI images
│
└── README.md
```

---

## 🤖 ML Model

| Property | Detail |
|:---|:---|
| **Type** | Convolutional Neural Network (CNN) |
| **Task** | Binary classification — Tumor vs No Tumor |
| **Input** | MRI image resized to 224×224 RGB |
| **Output** | Sigmoid score (≥0.5 = Tumor) |
| **Framework** | TensorFlow / Keras |
| **File** | `backend/model/brain_tumor_model.h5` |

---

## ⚙️ Local Setup

### Prerequisites
> Python 3.9+ · Node.js 18+ · MongoDB Atlas account

### Backend

```bash
cd backend
pip install -r requirements.txt
cp .env.example .env
# Fill in MONGO_URI and JWT_SECRET_KEY
python app.py
```

### Frontend

```bash
cd frontend
npm install
echo "REACT_APP_API_URL=http://localhost:5000/api" > .env
npm start
```

---

## 🌐 Deployment

<table>
<tr>
<td width="50%" valign="top">

### Backend → Railway
- Root directory: `backend`
- Start command:
  ```
  gunicorn --bind 0.0.0.0:$PORT "app:create_app()"
  ```
- Environment variables:
  - `MONGO_URI` — MongoDB Atlas connection string
  - `JWT_SECRET_KEY` — secret key for JWT
  - `DISABLE_MODEL` — `false` to use real model
  - `MODEL_PATH` — `model/brain_tumor_model.h5`

</td>
<td width="50%" valign="top">

### Frontend → Vercel
- Root directory: `frontend`
- Environment variable:
  - `REACT_APP_API_URL` — your backend URL + `/api`

</td>
</tr>
</table>

---

## 🔑 API Reference

| Method | Endpoint | Role | Description |
|:---|:---|:---|:---|
| `POST` | `/api/auth/register` | Public | Register new user |
| `POST` | `/api/auth/login` | Public | Login |
| `GET` | `/api/auth/me` | Any | Get current user |
| `POST` | `/api/scans/upload` | Any | Upload MRI + get prediction |
| `GET` | `/api/scans/my` | Any | My scan history |
| `GET` | `/api/scans/:id` | Owner/Doctor/Admin | Get scan details |
| `PUT` | `/api/scans/:id/review` | Doctor/Admin | Add notes + mark reviewed |
| `DELETE` | `/api/scans/:id` | Owner/Admin | Delete scan |
| `GET` | `/api/admin/users` | Admin | All users |
| `PUT` | `/api/admin/users/:id/role` | Admin | Change user role |
| `DELETE` | `/api/admin/users/:id` | Admin | Delete user |
| `GET` | `/api/admin/scans` | Admin/Doctor | All scans |
| `GET` | `/api/admin/stats` | Admin | System statistics |

---

## 👥 Role-Based Access Control

| Feature | Patient | Doctor | Admin |
|:---|:---:|:---:|:---:|
| Upload MRI scan | ✅ | ✅ | ✅ |
| View own scans | ✅ | ✅ | ✅ |
| View all scans | ❌ | ✅ | ✅ |
| Add doctor notes | ❌ | ✅ | ✅ |
| Mark scan reviewed | ❌ | ✅ | ✅ |
| Access admin panel | ❌ | ❌ | ✅ |
| Change user roles | ❌ | ❌ | ✅ |
| Delete users | ❌ | ❌ | ✅ |

---

## 👨‍💻 Author

<div align="center">

**Sahil**

[![GitHub](https://img.shields.io/badge/GitHub-@sahilsingh78-181717?style=flat-square&logo=github)](https://github.com/sahilsingh78)

Galgotias College of Engineering & Technology

</div>

---

<div align="center">

⭐ If you found this project useful, consider giving it a star!

</div>