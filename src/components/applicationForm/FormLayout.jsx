import { useContext } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import FormInput from "./FormInput";
import ApplyFormContext from "../../context/applyFormProvider";

const FormLayout = () => {
  const { page, setPage, pageNames, valid, errMsg } =
    useContext(ApplyFormContext);
  return (
    <Container maxWidth="lg" sx={{ padding: { xs: "1rem", md: "2rem" } }}>
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
        <Typography variant="h4" sx={{ fontWeight: "bold", margin: "1rem 0" }}>
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
          <Button variant="contained" color="error" disabled={!valid}>
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
    </Container>
  );
};

export default FormLayout;
