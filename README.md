# QuickChat 🚀  
A full-stack **real-time chat application** built with React, Node.js, Express, MongoDB, Socket.io, Cloudinary, and Tailwind CSS.  
Frontend deployed on **Vercel**, backend deployed on **Render**.

🎯 **Live Demo:** https://chat-app-tau-three-78.vercel.app  
🎯 **Backend API:** https://chat-app-izz8.onrender.com

---

## ⭐ Features  
- 🔐 **Secure Authentication** using JWT + HTTP-Only Cookies  
- 💬 **Real-time messaging** with Socket.io  
- 👀 **Seen/Delivered message status**  
- 🟢 **Online/Offline indicator**  
- ⌨️ **Typing indicator**  
- 📸 **Image upload** using Cloudinary  
- 📱 **Fully responsive UI** (mobile-friendly)  
- ⚡ **Fast & modern** with Vite + Tailwind  
- 🧱 Clean folder structure & scalable backend

---

## 🛠 Tech Stack  

### **Frontend**
- React.js  
- Vite  
- Tailwind CSS  
- Axios

### **Backend**
- Node.js  
- Express  
- MongoDB + Mongoose  
- Socket.io  
- JWT Authentication  
- Cloudinary

### **Deployment**
- **Vercel** (Frontend)  
- **Render** (Backend)

---

## 📸 Screenshots  

### **Login Page**
![Login Screenshot](image.png)

### **Chat Interface**
![Chat Screenshot](image-1.png)


## 📂 Project Structure

```
chat-app/
│
├── client/ # Frontend (React, Vite)
├── server/ # Backend (Node, Express, MongoDB)
│
├── image.png # Login screenshot
├── image-1.png # Chat UI screenshot
├── README.md # Project documentation
└── .env.example # Example environment file
```


## 🧪 Running the Project Locally

### 1️⃣ Clone the repo

```bash
git clone https://github.com/Sagardeep20/chat-app.git
cd chat-app

```

### 2️⃣ Setup Backend

```bash
cd server
npm install
npm run dev

Backend runs at:
👉 http://localhost:5000

```

3️⃣ Setup Frontend

```bash

cd ../client
npm install
npm run dev
Frontend runs at:
👉 http://localhost:5173

```

## 🔑 Environment Variables

```text
# Backend
MONGO_URI=
JWT_SECRET=
PORT=5000
NODE_ENV=development

# Cloudinary
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

# Frontend
VITE_BACKEND_URL=
```

## 🚀 Deployment

### **Frontend (Vercel)**
- Build command: `npm run build`
- Output directory: `dist/`

### **Backend (Render)**
- Start command: `node server.js`
- Add environment variables in Render dashboard

## 🔐 Security Notes
JWT stored in HTTP-only cookies for security

CORS configured with credentials support

.env is ignored to keep secrets safe

## 📝 License
This project is licensed under the MIT License.

## 👤 Author
Sagardeep Choudhury
GitHub: https://github.com/Sagardeep20