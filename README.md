# MediNova V3

A comprehensive medical training and patient care platform built with React, TypeScript, Firebase, and Tailwind CSS.

## Features

- **Multi-role Access**: Admin, Supervisor, Care Staff, and Learner dashboards
- **Patient Registration**: Step-by-step guided registration with encouragement messages
- **Training Modules**: Interactive case-based learning with AI-powered tips
- **Notification System**: Modular SMS/Email reminders (SMS currently disabled for testing)
- **Dark/Light Mode**: Full theme support with system preference detection
- **Mobile Responsive**: Optimized for all devices
- **PWA Ready**: Can be converted to Android app using Bubblewrap

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, Lucide Icons
- **Backend**: Firebase (Auth, Firestore, Storage)
- **AI**: Google Gemini API
- **Notifications**: Twilio (SMS), EmailJS (Email)
- **PDF**: jsPDF

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the root directory with your API keys:

```env
# Firebase
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id

# Gemini (from https://aistudio.google.com/app/apikey)
VITE_GEMINI_API_KEY=your_gemini_key

# EmailJS (from https://dashboard.emailjs.com/admin)
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key

# Admin
VITE_ADMIN_EMAIL=your_admin_email

# Twilio (Account SID and Auth Token)
VITE_TWILIO_ACCOUNT_SID=your_account_sid
VITE_TWILIO_AUTH_TOKEN=your_auth_token
VITE_TWILIO_PHONE_NUMBER=your_phone_number
```

### 3. Run Development Server

```bash
npm run dev
```

### 4. Build for Production

```bash
npm run build
```

### 5. Deploy to Firebase Hosting

```bash
npm install -g firebase-tools
firebase login
firebase init hosting
firebase deploy
```

## Converting to Android App (TWA)

Follow these steps to convert your PWA to an Android app using Bubblewrap:

### Prerequisites
- Node.js installed
- JDK 17 installed
- Android SDK installed

### Steps

1. **Build your PWA**
   ```bash
   npm run build
   ```

2. **Create Android project folder**
   ```bash
   mkdir android
   cd android
   ```

3. **Install Bubblewrap CLI**
   ```bash
   npm install -g @bubblewrap/cli
   ```

4. **Initialize the project**
   ```bash
   bubblewrap init --manifest=https://your-domain.com/manifest.webmanifest
   ```

5. **Build the APK**
   ```bash
   bubblewrap build --universalApk
   ```

6. **Set up Digital Asset Links**
   - Get your SHA256 fingerprint:
     ```bash
     keytool -list -v -keystore android.keystore -alias android
     ```
   - Update `public/.well-known/assetlinks.json` with your fingerprint
   - Deploy to your domain

7. **Verify**
   - Use Google's [Digital Asset Links Verifier](https://developers.google.com/digital-asset-links/tools/generator)

## Project Structure

```
medinova-v3/
├── public/
│   ├── .well-known/
│   │   └── assetlinks.json
│   └── icons/
├── src/
│   ├── components/
│   │   ├── ui/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── LoadingSpinner.tsx
│   ├── pages/
│   │   ├── LandingPage.tsx
│   │   ├── TokenPage.tsx
│   │   ├── EmailPage.tsx
│   │   ├── ProfileSetupPage.tsx
│   │   ├── LearnerDashboard.tsx
│   │   ├── SupervisorDashboard.tsx
│   │   ├── CareDashboard.tsx
│   │   ├── AdminDashboard.tsx
│   │   ├── AboutPage.tsx
│   │   └── ContactPage.tsx
│   ├── services/
│   │   ├── firebase.ts
│   │   ├── auth.ts
│   │   ├── hospital.ts
│   │   ├── patient.ts
│   │   ├── gemini.ts
│   │   └── notifications.ts
│   ├── hooks/
│   │   ├── useAuth.ts
│   │   └── useTheme.ts
│   ├── utils/
│   │   └── helpers.ts
│   ├── types/
│   │   └── index.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── .env
├── package.json
├── vite.config.ts
├── tailwind.config.js
└── tsconfig.json
```

## SMS Configuration

The SMS notification system is currently disabled by default (`isSmsEnabled = false`).

To enable SMS:

1. Set `isSmsEnabled = true` in `src/services/notifications.ts`
2. Ensure Twilio credentials are valid
3. The system will automatically send real SMS messages

For testing, all SMS content is logged to the console.

## Admin Access

Use the admin token: `ADMIN-MEDINOVA-2026`

## Support

For bugs or feature requests, contact: semiloreawoniyi@gmail.com

## License

MIT License - 2024 MediNova
