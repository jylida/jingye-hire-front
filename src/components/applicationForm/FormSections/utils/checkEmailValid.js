const Email_REG = /^[A-z0-9.-]+@[A-z0-9.-]+\.[A-z]{2,4}$/;

const checkEmailValid = (input) => Email_REG.test(input);

export default checkEmailValid;
