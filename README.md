# Laundry Management System with WhatsApp Notifications

A simple fullstack application for managing laundry orders with automated WhatsApp notifications using Baileys.

---

## 🚀 Features

- Create and manage laundry orders
- Update order status
- Automatic WhatsApp notifications
- Simple dashboard for admin
- WhatsApp message logs

---

## 🧠 Tech Stack

- Frontend: React (Vite)
- Backend: Express.js
- Database: Firebase Firestore
- WhatsApp Gateway: Baileys (WhatsApp Web API)

---

## 📸 Demo

> Add your demo video or screenshots here

- Video Demo: (link here)
- Screenshot:
  - Dashboard
  - Order List
  - WhatsApp Notification

---

## ⚙️ How It Works

1. Admin creates a new laundry order
2. Order is stored in the database
3. When status is updated:
   - Backend triggers WhatsApp notification

4. Customer receives real-time updates via WhatsApp

---

## 📦 Project Structure

```
frontend/
backend/
```

---

## 🛠 Installation

### 1. Clone repository

```
git clone https://github.com/your-username/laundry-management-whatsapp.git
```

### 2. Install dependencies

```
cd backend
npm install

cd ../frontend
npm install
```

### 3. Run project

```
# backend
npm run dev

# frontend
npm run dev
```

---

## ⚠️ Limitations

- Uses unofficial WhatsApp API (Baileys)
- Requires active session (QR login)
- Not designed for large-scale production

---

## 🚀 Future Improvements

- Multi-user support
- Role-based access (admin/staff)
- Integration with official WhatsApp Business API
- Analytics dashboard

---

## 👨‍💻 Author

Your Name
