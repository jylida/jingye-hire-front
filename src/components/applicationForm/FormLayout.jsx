import { useContext } from "react";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import FormInput from "./FormInput";
import ApplyFormContext from "../../context/applyFormProvider";
import AuthContext from "../../context/authProvider";
import applySubmitHandler from "./applySubmitHandler";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import ApplyStatus from "./ApplyStatus";
import ApplyFeedBack from "./ApplyFeedback";
import LogoutButton from "./FormSections/utils/LogoutButton";

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
  const { auth, setAuth } = useContext(AuthContext);
  const axiosPrivate = useAxiosPrivate();
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
          sx={{ width: "100%", justifyContent: "space-between" }}
        >
          <Typography
            variant="h4"
            sx={{ fontWeight: "bold", margin: "1rem 0" }}
          >
            申请表格
          </Typography>
          <LogoutButton setAuth={setAuth} />
        </Stack>
        {auth?.progress?.length > 0 ? (
          <ApplyStatus progress={auth.progress} />
        ) : success.status ? (
          <ApplyFeedBack applyNum={success.id} phone={contact.phone.content} />
        ) : (
          <Stack spacing={{ xs: 1, sm: 2, md: 3 }}>
            <Stack
              spacing={{ xs: 2, sm: 0 }}
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <ButtonGroup variant="outlined" color="primary">
                {pageNames.map((nm, i) => (
                  <Button
                    key={`page-selection-button-group-page-${i}`}
                    disableElevation
                    variant={page === i ? "contained" : "outlined"}
                    onClick={() => {
                      setPage(i);
                    }}
                  >
                    {nm}
                  </Button>
                ))}
              </ButtonGroup>
              <Button
                variant="contained"
                color="error"
                disabled={!valid}
                sx={{ margin: 0 }}
                onClick={() =>
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
                  )
                }
              >
                提交入职申请
              </Button>
            </Stack>
            <Typography variant="subtitle1">
              {pageNames[page] + " (带*为必填项)"}
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
