const passwordRegex = /^[a-zA-Z0-9]{8,}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const usernameRegex = /^[a-zA-Z0-9_]{3,15}$/;

export { emailRegex, usernameRegex, passwordRegex };
