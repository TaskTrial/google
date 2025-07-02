# Google OAuth Integration

A clean, production-ready Google OAuth implementation for React applications.

## Installation

### 1. Clone the repository

```bash
git clone <repository-url>
cd google
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file in the root directory:

```env
# Required - Your Google OAuth Client ID
VITE_GOOGLE_CLIENT_ID=your_google_client_id_here

# Required - Backend API URL (development)
VITE_API_URL=http://localhost:3000

# Required - Backend API URL (production)
VITE_API_URL=https://tasktrial-prod.vercel.app
```

### 4. Start the development server

```bash
npm run dev
```
