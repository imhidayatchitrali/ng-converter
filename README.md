# Currency Converter Application

A full-stack currency converter application built with Angular frontend and Node.js backend.

## Features

- **Real-time Currency Conversion**: Convert between multiple currencies using live exchange rates
- **Responsive Design**: Mobile-first approach with Bootstrap and Angular Material
- **Conversion History**: Track all conversions with timestamps, persisted in localStorage
- **Secure API**: Backend handles API keys securely
- **TypeScript**: Full TypeScript implementation for both frontend and backend
- **Modern UI**: Clean, intuitive interface with loading states

## Tech Stack

### Frontend
- Angular 20
- Angular Material
- Bootstrap 5
- TypeScript
- RxJS

### Backend
- Node.js
- Express.js
- TypeScript
- FreeCurrencyAPI
- CORS enabled

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd currency-converter
```

2. Install frontend dependencies
```bash
npm install
```

3. Install backend dependencies
```bash
cd backend
npm install
```

4. Set up environment variables
```bash
# backend/.env
CURRENCY_API_KEY=4E0VK7BnkdeUuh1vegAt808v2IUjzUR6lxcvBMT2
CURRENCY_API_BASE_URL=https://api.freecurrencyapi.com/v1
PORT=3000
```

### Running the Application

1. Start the backend server
```bash
npm run backend:dev
```

2. Start the frontend development server
```bash
npm start
```

3. Open your browser to `http://localhost:4200`

## API Endpoints

### Backend Routes
- `GET /api/currency/currencies` - Get all available currencies
- `POST /api/currency/convert` - Convert currency amounts
- `GET /api/health` - Health check endpoint

## Building for Production

### Frontend
```bash
npm run build
```

### Backend
```bash
npm run backend:build
npm run backend:start
```

## Deployment

The application is configured for Vercel deployment:

1. Frontend: Deploy the `dist/demo` folder
2. Backend: Deploy as a Vercel function

## Project Structure

```
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── currency-converter/
│   │   │   └── conversion-history/
│   │   ├── services/
│   │   ├── models/
│   │   └── directives/
│   └── global_styles.css
├── backend/
│   ├── src/
│   │   ├── routes/
│   │   └── server.ts
│   └── package.json
└── README.md
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License.