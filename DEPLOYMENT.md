# Udaan Deployment Guide

This guide will help you deploy the Udaan application to Vercel (Frontend) and Render (Backend).

## 🚀 Backend: Render.com

1.  **Create a New Web Service**: Link your GitHub repository.
2.  **Runtime**: Python
3.  **Build Command**: `pip install -r backend/requirements.txt` (Note: Run from the root if your structure requires, or adjust the path)
    - *Tip*: If you only deploy the `backend` folder, use `pip install -r requirements.txt`.
4.  **Start Command**: `gunicorn backend.app:app` (You may need to install `gunicorn` in `requirements.txt`)
5.  **Environment Variables**:
    - `AVIATIONSTACK_API_KEY`: Your AviationStack key.
    - `TRAVELPAYOUTS_TOKEN`: Your Travelpayouts token.
    - `PYTHON_VERSION`: `3.10` or higher.

## 🌐 Frontend: Vercel.com

1.  **Create a New Project**: Link your GitHub repository.
2.  **Root Directory**: `project`
3.  **Framework Preset**: Vite
4.  **Build Command**: `npm run build`
5.  **Output Directory**: `dist`
6.  **Environment Variables**:
    - `VITE_API_URL`: The URL of your Render backend (e.g., `https://udaan-api.onrender.com/api`).

---

## 🔐 Environment Variables Summary

### Local Development
You can create a `.env` in the `backend` and `project` folders respectively using the following keys:

**Backend (`backend/.env`):**
```env
AVIATIONSTACK_API_KEY=...
TRAVELPAYOUTS_TOKEN=...
PORT=5000
```

**Frontend (`project/.env`):**
```env
VITE_API_URL=http://localhost:5000/api
```
