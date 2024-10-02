// src/backendconfig.js
export const baseUrl = process.env.REACT_APP_API_BASE_URL || "https://893c-2620-8d-8000-1074-f879-3a9b-89b6-a6b2.ngrok-free.app" ;
export const loginUrl = `${baseUrl}/auth/login`;
export const signupUrl = `${baseUrl}/auth/signup`;
export const logoutUrl = `${baseUrl}/auth/logout`;