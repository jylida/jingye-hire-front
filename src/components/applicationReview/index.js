import { useContext } from "react";
import { useQuery } from "react-query";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import ApplyReviewContext from "../../context/applyReviewProvider";
import { Outlet } from "react-router-dom";
import DrawerLayout from "./DrawerLayout";
const getApplicationForm = async (
  pageParam = 1,
  limitParam = 10,
  axiosPrivate,
  isLecturer = null,
  handled = null,
  subject,
  department
) => {
  let queryUrl = `/apply?page=${pageParam}&limit=${limitParam}`;
  if (isLecturer && isLecturer !== "all") {
    queryUrl += `&isLecturer=${isLecturer}`;
  }
  if (handled && handled !== "all") {
    queryUrl += `&handled=${handled}`;
  }
  if (subject && subject !== "all") {
    queryUrl += `&subject=${subject}`;
  }
  if (department && department !== "all") {
    queryUrl += `&department=${department}`;
  }
  const response = await axiosPrivate.get(queryUrl);
  return response.data;
};
const ApplicationReview = () => {
  const { page, limit, setFetched, isLecturer, handled, subject, department } =
    useContext(ApplyReviewContext);
  const axiosPrivate = useAxiosPrivate();
  const {
    isLoading,
    isError,
    error,
    data: fetchedData,
  } = useQuery(
    ["apply", page, isLecturer, handled, subject],
    () =>
      getApplicationForm(
        page,
        limit,
        axiosPrivate,
        isLecturer,
        handled,
        subject,
        department
      ),
    {
      keepPreviousData: true,
    }
  );
  if (isLoading) return <h2>Is loading</h2>;
  if (isError) return <h2>{error.message}</h2>;
  setFetched(fetchedData);

  return (
    <DrawerLayout title="申请审理">
      <Outlet />
    </DrawerLayout>
  );
};
export default ApplicationReview;
