import { useContext } from "react";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import FormInput from "./FormInput";
import ApplyFormContext from "../../context/applyFormProvider";
import applySubmitHandler from "./applySubmitHandler";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import ApplyStatus from "./ApplyStatus";
import ApplyFeedBack from "./ApplyFeedback";
import LogoutButton from "./FormSections/utils/LogoutButton";
import ProgressStepper from "./FormSections/ProgressStepper";

const FormLayout = () => {
  const {
    page,
    setPage,
    pageNames,
    valid,
    errMsg,
    setErrMsg,
    personal,
    contact,
    address,
    eduBgSeq,
    workBgSeq,
    success,
    setSuccess,
    job,
  } = useContext(ApplyFormContext);
  const axiosPrivate = useAxiosPrivate();
  const { progress } = JSON.parse(localStorage.getItem("auth"));
  const handleSubmit =
    (
      axiosPrivate,
      personal,
      contact,
      address,
      eduBgSeq,
      workBgSeq,
      setErrMsg,
      setSuccess,
      job
    ) =>
    () => {
      applySubmitHandler(
        axiosPrivate,
        personal,
        contact,
        address,
        eduBgSeq,
        workBgSeq,
        setErrMsg,
        setSuccess,
        job
      );
    };
  return (
    <Container maxWidth="lg" sx={{ padding: { xs: "1rem", md: "2rem" } }}>
      <Stack
        component="form"
        direction="column"
        spacing={{ xs: 1, sm: 2, md: 3 }}
        sx={{
          width: "100%",
          height: { xs: "100%", sm: "100vw", lg: "90vh" },
          overflowY: "scroll",
          justifyContent: "flex-start",
          alignItems: "flex-start",
        }}
      >
        <Stack
          direction="row"
          sx={{
            width: "100%",
            marginBottom: { xs: "1rem", sm: "2rem", md: "3rem" },
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: "bold", margin: "0" }}>
            申请表格
          </Typography>
          <LogoutButton />
        </Stack>
        {progress?.length > 0 ? (
          <ApplyStatus progress={progress} />
        ) : success.status ? (
          <ApplyFeedBack applyNum={success.id} phone={contact.phone.content} />
        ) : (
          <Stack spacing={{ xs: 1, sm: 2, md: 3 }} sx={{ width: "100%" }}>
            <ProgressStepper
              pageNames={pageNames}
              activeStep={page}
              setActiveStep={setPage}
              handleSubmit={handleSubmit(
                axiosPrivate,
                personal,
                contact,
                address,
                eduBgSeq,
                workBgSeq,
                setErrMsg,
                setSuccess,
                job
              )}
              valid={valid}
            />
            <Typography variant="subtitle1">
              {pageNames[page].name + " (带*为必填项)"}
            </Typography>
            {errMsg.length > 0 && (
              <Typography variant="subtitle2" color="error">
                {errMsg}
              </Typography>
            )}
            <FormInput />
          </Stack>
        )}
      </Stack>
    </Container>
  );
};

export default FormLayout;
