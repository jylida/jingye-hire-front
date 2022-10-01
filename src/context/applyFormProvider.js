import { createContext, useState } from "react";

const ApplyFormContext = createContext();
const pageNames = ["个人信息", "教育背景", "工作经验", "其他"];

export const ApplyFormContextProvider = ({ children }) => {
  const [page, setPage] = useState(0);
  const [personal, setPersonal] = useState({
    name: { content: "", valid: false },
    gender: { content: "" },
    IDCard: { content: "", valid: false },
    ethics: { content: "" },
    politics: { content: "" },
  });
  const [contact, setContact] = useState({
    phone: { content: "", valid: false },
    phoneSecondary: { content: "", valid: false },
    email: { content: "", valid: false },
  });
  const [address, setAddress] = useState({
    district: "",
    street: "",
    specific: "",
  });
  const [eduBgSeq, setEduBgSeq] = useState([]);
  return (
    <ApplyFormContext.Provider
      value={{
        pageNames,
        page,
        setPage,
        personal,
        setPersonal,
        contact,
        setContact,
        address,
        setAddress,
        eduBgSeq,
        setEduBgSeq,
      }}
    >
      {children}
    </ApplyFormContext.Provider>
  );
};

export default ApplyFormContext;
