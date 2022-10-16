import { useContext } from "react";
import Button from "@mui/material/Button";
import useAuth from "../../hooks/useAuth";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import ApplyFormContext from "../../context/applyFormProvider";
import applySubmitHandler from "./applySubmitHandler";
import { Typography } from "@mui/material";

const ApplySubmitButton = () => {
  const {
    personal,
    contact,
    address,
    eduBgSeq,
    workBgSeq,
    setErrMsg,
    setSuccess,
    job,
  } = useContext(ApplyFormContext);
  const { auth } = useAuth();
  const { username, roles } = auth;
  const axiosPrivate = useAxiosPrivate();

  const handleSubmit = () =>
    applySubmitHandler(
      axiosPrivate,
      personal,
      contact,
      address,
      eduBgSeq,
      workBgSeq,
      setErrMsg,
      setSuccess,
      job,
      username,
      roles
    );
  return (
    <Button variant="text" onClick={handleSubmit} color="error">
      <Typography variant="button">提交申请</Typography>
    </Button>
  );
};

export default ApplySubmitButton;
