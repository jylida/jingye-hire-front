const NumOnly_REG = /^\d+$/;
const checkPhoneValid = (phone) =>
  phone && phone.length === 11 && NumOnly_REG.test(phone);
export default checkPhoneValid;
