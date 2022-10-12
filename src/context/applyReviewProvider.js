import { useState, createContext } from "react";
const ApplyReviewContext = createContext();
export const ApplyReviewProvider = ({ children }) => {
  const [fetched, setFetched] = useState({});
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [isPreviousData, setIsPreviousData] = useState(false);
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
      }}
    >
      {children}
    </ApplyReviewContext.Provider>
  );
};

export default ApplyReviewContext;
