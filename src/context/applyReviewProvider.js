import { useState, createContext, useReducer } from "react";
const ApplyReviewContext = createContext();

// const init = { handled: null, isLecturer: null, subject: "", department: "" };
// const actionType = {
//   handleFilter: "handleFilter",
// };
// const reducer = (state, action) => {
//   switch (action.type) {
//     case actionType.handleFilter:
//       return { ...state, [action.payload.key]: action.payload.value };
//   }
// };

export const ApplyReviewProvider = ({ children }) => {
  const [fetched, setFetched] = useState({});
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [isPreviousData, setIsPreviousData] = useState(false);
  const [handled, setHandled] = useState(null);
  const [isLecturer, setIsLecturer] = useState(null);
  const [subject, setSubject] = useState("");
  const [department, setDepartment] = useState("");
  // const [state, dispatch] = useReducer(reducer, init);
  return (
    <ApplyReviewContext.Provider
      value={{
        fetched,
        setFetched,
        page,
        setPage,
        limit,
        setLimit,
        isPreviousData,
        setIsPreviousData,
        handled,
        setHandled,
        isLecturer,
        setIsLecturer,
        subject,
        setSubject,
        department,
        setDepartment,
        // state,
        // dispatch,
        // actionType,
      }}
    >
      {children}
    </ApplyReviewContext.Provider>
  );
};

export default ApplyReviewContext;
