import Button from "@mui/material/Button";
import { useMutation, useQueryClient } from "react-query";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const updateStatus = async (axiosPrivate, username, feedback) => {
  const result = await axiosPrivate.put(`/apply/${username}`, {
    status: feedback,
  });
  return result;
};

const UpdateStatusButton = ({ username, feedback, setUpdated, setErrMsg }) => {
  const axiosPrivate = useAxiosPrivate();
  const queryClient = useQueryClient();
  const { mutateAsync } = useMutation(
    () => updateStatus(axiosPrivate, username, feedback),
    {
      onSuccess: () => setUpdated(true),
      onError: (err) => setErrMsg(err.message),
    }
  );
  return (
    <Button
      variant="contained"
      onClick={async (e) => {
        e.preventDefault();
        await mutateAsync(feedback);
        queryClient.invalidateQueries("apply");
      }}
      sx={{ maxHeight: "2.5rem" }}
    >
      状态更新
    </Button>
  );
};

export default UpdateStatusButton;
