import { createContext, useEffect, useState } from "react";

const ApplyFormContext = createContext();
const pageNames = ["个人信息", "教育背景", "工作经验", "预览"];

export const ApplyFormContextProvider = ({ children }) => {
  const [page, setPage] = useState(0);
  const [personal, setPersonal] = useState({
    name: { content: "", valid: false, compulsory: true },
    gender: { content: "", compulsory: true },
    IDCard: { content: "", valid: false, compulsory: true },
    ethics: { content: "", compulsory: true },
    politics: { content: "", compulsory: true },
    valid: false,
  });
  const [contact, setContact] = useState({
    phone: { content: "", valid: false, compulsory: true },
    phoneSecondary: { content: "", valid: false, compulsory: false },
    email: { content: "", valid: false, compulsory: false },
    valid: false,
  });
  const [address, setAddress] = useState({
    district: "",
    street: "",
    specific: "",
    valid: false,
  });
  const [job, setJob] = useState({
    isLecturer: false,
    department: "",
    subject: "",
    certificate: "",
    specific: "",
    valid: false,
  });
  const [eduBgSeq, setEduBgSeq] = useState([]);
  const [workBgSeq, setWorkBgSeq] = useState([]);
  const [errMsg, setErrMsg] = useState("");
  const [valid, setValid] = useState(false);
  const [success, setSuccess] = useState({
    status: false,
    id: "",
  });
  const [lodged, setLodged] = useState({});
  useEffect(() => {
    setPersonal((prev) => ({
      ...prev,
      valid:
        prev.name.valid &&
        prev.gender.content.length > 0 &&
        prev.IDCard.valid &&
        prev.ethics.content.length > 0 &&
        prev.politics.content.length > 0,
    }));
  }, [...Object.values(personal).slice(0, -1)]);
  useEffect(() => {
    setContact((prev) => ({
      ...prev,
      valid:
        prev.phone.valid &&
        (prev.phoneSecondary.valid
          ? true
          : prev.phoneSecondary.content.length > 0
          ? false
          : true) &&
        (prev.email.valid
          ? true
          : prev.email.content.length > 0
          ? false
          : true),
    }));
  }, [...Object.values(contact).slice(0, -1)]);
  useEffect(() => {
    setAddress((prev) => ({
      ...prev,
      valid:
        prev.district.length > 0 &&
        prev.street.length > 0 &&
        prev.specific.length > 0,
    }));
  }, [...Object.values(address).slice(0, -1)]);
  useEffect(() => {
    setValid(
      personal.valid &&
        contact.valid &&
        address.valid &&
        job.valid &&
        eduBgSeq.length > 0 &&
        workBgSeq.length > 0
    );
  }, [
    personal.valid,
    contact.valid,
    address.valid,
    job.valid,
    eduBgSeq.length,
    workBgSeq.length,
  ]);
  useEffect(() => {
    setErrMsg("");
  }, [eduBgSeq.length, workBgSeq.length]);
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
        workBgSeq,
        setWorkBgSeq,
        job,
        setJob,
        valid,
        errMsg,
        setErrMsg,
        success,
        setSuccess,
        lodged,
        setLodged,
      }}
    >
      {children}
    </ApplyFormContext.Provider>
  );
};

export default ApplyFormContext;
