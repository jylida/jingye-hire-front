import { createContext, useReducer } from "react";

const FormContext = createContext();
const pageName = ["personal", "education", "workingExperience", "misc"];
const init = {
  page: 0,
  personal: {
    name: "",
    gender: "",
    dateOfBirth: null,
    IdentityCardNO: null,
    phoneNO: null,
    phoneNOEmergency: null,
    address: {
      district: "",
      street: "",
      specific: "",
    },
  },
};
const actionType = {
  setPersonal: "setPersonal",
};
const reducer = (state, action) => {
  switch (action.type) {
    case actionType.setPersonal:
      return { ...state, personal: action.payload };
    default:
      throw new Error("No action type matches");
  }
};

export const FormContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, init);
  return <FormContext.Provider value={{state, dispatch}}>{children}</FormContext.Provider>;
};

export default FormContext;