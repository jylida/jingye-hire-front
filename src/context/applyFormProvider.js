import { createContext, useReducer, useState } from "react";

const ApplyFormContext = createContext();
const pageNames = ["个人信息", "教育背景", "工作经验", "其他"];
const init = {
  page: 0,
  personal: {
    name: { content: "", valid: false },
    gender: "",
    IDCard: { content: "", valid: false },
    phone: { content: "", valid: false },
    phoneEmergency: { content: "", valid: false },
    email: { content: "", valid: false },
    address: {
      district: "",
      street: "",
      specific: "",
    },
  },
};
const actionType = {
  prevPage: "prevPage",
  nextPage: "nextPage",
  setPersonal: "setPersonal",
};
const reducer = (state, action) => {
  switch (action.type) {
    case actionType.prevPage:
      return { ...state, page: state.page - 1 };
    case actionType.nextPage:
      return { ...state, page: state.page + 1 };
    case actionType.setPersonal:
      return { ...state, personal: action.payload };
    default:
      throw new Error("No action type matches");
  }
};

export const ApplyFormContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, init);
  const [page, setPage] = useState(0);
  const [personal, setPersonal] = useState({
    name: { content: "", valid: false },
    IDCard: { content: "", valid: false },
  });
  const [contact, setContact] = useState({
    phone: { content: "", valid: false },
    phoneEmergency: { contact: "", valid: false },
    email: { content: "", valid: false },
  });
  return (
    <ApplyFormContext.Provider
      value={{
        state,
        dispatch,
        actionType,
        pageNames,
        page,
        setPage,
        personal,
        setPersonal,
        contact,
        setContact,
      }}
    >
      {children}
    </ApplyFormContext.Provider>
  );
};

export default ApplyFormContext;
