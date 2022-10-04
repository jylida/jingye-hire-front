import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import FormInput from "./FormInput";
import ApplyFormContext from "../../context/applyFormProvider";
import applySubmitHandler from "./applySubmitHandler";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

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
  } = useContext(ApplyFormContext);
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  return (
    <Container maxWidth="lg" sx={{ padding: { xs: "1rem", md: "2rem" } }}>
      {success.status ? (
        <Typography variant="h6" fontWeight="bold" color="success.light">
          {`提交成功! 申请号: ${success.id}.`} <br />
          {`我们将会在10个工作日内联系您. 请确保手机号 ${contact.phone.content} 畅通.`}
          <br />
          {"感谢您对本校的青睐!"}
        </Typography>
      ) : (
        <Stack
          component="form"
          direction="column"
          spacing={{ xs: 1, sm: 3 }}
          sx={{
            width: "100%",
            height: { xs: "100%", sm: "100vw", lg: "90vh" },
            overflowY: "scroll",
            justifyContent: "flex-start",
            alignItems: "flex-start",
          }}
        >
          <Typography
            variant="h4"
            sx={{ fontWeight: "bold", margin: "1rem 0" }}
          >
            申请表格
          </Typography>
          <Box
            component="nav"
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <ButtonGroup variant="outlined" color="secondary">
              <Button
                disabled={page === 0}
                onClick={() => {
                  setPage((prev) => prev - 1);
                }}
              >
                前页
              </Button>
              <Button
                disabled={page === pageNames.length - 1}
                onClick={() => {
                  setPage((prev) => prev + 1);
                }}
              >
                后页
              </Button>
            </ButtonGroup>
            <Button
              variant="contained"
              color="error"
              disabled={!valid}
              onClick={() =>
                applySubmitHandler(
                  axiosPrivate,
                  personal,
                  contact,
                  address,
                  eduBgSeq,
                  workBgSeq,
                  setErrMsg,
                  setSuccess
                )
              }
            >
              提交入职申请
            </Button>
          </Box>
          <Typography variant="subtitle1">{pageNames[page]}</Typography>
          {errMsg.length > 0 && (
            <Typography variant="subtitle2" color="error">
              {errMsg}
            </Typography>
          )}
          <FormInput />
        </Stack>
      )}
    </Container>
  );
};

export default FormLayout;
