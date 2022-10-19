const emailRegex = new RegExp("[a-zA-Z0-9._-]+@gmail.com");
const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
const phoneNumberRegex = /^[0-9]{10}$/;

export { emailRegex, passwordRegex, phoneNumberRegex };
