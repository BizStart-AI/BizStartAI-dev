import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom' // Import this
import App from './App.jsx'
import './index.css'
import { GoogleOAuthProvider } from '@react-oauth/google';

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <GoogleOAuthProvider clientId="389454222548-bjvskk4kanlq7oie6ne90nvdbqsi3e98.apps.googleusercontent.com">
        <BrowserRouter> 
          <App />
        </BrowserRouter>
      </GoogleOAuthProvider>
    </React.StrictMode>
  );
}