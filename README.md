# React Native + FastAPI Auth

A starter template for building a full-stack mobile authentication system using **React Native** on the frontend and **FastAPI** with **PostgreSQL** on the backend, containerized using **Docker**.

---

##  Getting Started

### 1. Clone the Repository

Clone this repository to your local machine:

```bash
git clone https://github.com/bibitchhetri/react-native-fastapi-auth.git
cd react-native-fastapi-auth
```

This will create a project directory with the following structure:

```
react-native-fastapi-auth/
├── frontend/    # React Native app
├── backend/     # FastAPI app with Docker and PostgreSQL
```

---

## Backend Setup (FastAPI + Docker)

### Configure Environment Variables

Before running the backend services, you need to provide environment-specific configuration.

1. Navigate to the FastAPI service directory:

```bash
cd backend/auth-service
```

2. Create a `.env` file and add the following environment variables:

```env
# PostgreSQL database connection URL
DATABASE_URL=postgresql://trinetra_user:trinetra_pass@db:5432/trinetra_db

# Email credentials for sending account verification or password reset emails
EMAIL_ADDRESS=<<your-gmail-address>>
EMAIL_PASSWORD=<<your-gmail-app-password>>
```

> 💡 **Note**: You must generate an [App Password](https://support.google.com/accounts/answer/185833?hl=en) from your Google account for this to work (Gmail does not allow basic password login for less secure apps).

---

### Run Backend with Docker

Once the `.env` file is in place, start the backend services using Docker:

```bash
cd ../../backend
docker compose up --build
```

This will spin up:
- A FastAPI app on `http://localhost:8000`
- A PostgreSQL database container

---

## Frontend Setup (React Native)

To run the mobile app:

```bash
cd ../frontend

# Install dependencies
npm install

# For iOS (Mac only)
cd ios && pod install && cd ..

# Run app on iOS simulator
npx react-native run-ios
```

That’s it! You now have a complete authentication system running across mobile and backend.

