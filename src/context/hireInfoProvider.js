import { createContext, useState } from "react";
const HireInfoContext = createContext();
export const HireInfoProvider = ({ children }) => {
  const [fetched, setFetched] = useState({
    total: 0,
    fetched: [],
  });
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [isPreviousData, setIsPreviousData] = useState(false);
  return (
    <HireInfoContext.Provider
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
    </HireInfoContext.Provider>
  );
};

export default HireInfoContext;
