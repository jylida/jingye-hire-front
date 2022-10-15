import { useState } from "react";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import useTheme from "@mui/material/styles/useTheme";
import useMediaquery from "@mui/material/useMediaQuery";
import { StepLabel } from "@mui/material";
import { Stack } from "@mui/system";
import { ConfirmDialog } from "../../styledComponents";

const ProgressStepper = ({
  pageNames,
  activeStep,
  setActiveStep,
  handleSubmit,
  valid,
}) => {
  const theme = useTheme();
  const [openDialog, setOpenDialog] = useState(false);
  const isSM = useMediaquery(theme.breakpoints.down("md"));

  const totalStep = pageNames.length;
  const handleNext = () => setActiveStep((prev) => prev + 1);
  const handleBack = () => setActiveStep((prev) => prev - 1);

  return (
    <Stack direction="column" spacing={{ xs: 1, sm: 2 }} sx={{ width: "100%" }}>
      <Stepper activeStep={activeStep} alternativeLabel={isSM}>
        {pageNames.map((page, index) => (
          <Step key={`apply-form-stepper-step-${page.name}`}>
            <StepLabel>
              {page.name}
              {page.required || index === totalStep - 1 ? "" : "(选填)"}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
      <Stack direction="row" justifyContent="space-between">
        <Button
          variant="outlined"
          onClick={handleBack}
          disabled={activeStep === 0}
        >
          上一页
        </Button>
        {activeStep === totalStep - 1 ? (
          <>
            <Button
              variant="outlined"
              onClick={() => setOpenDialog(!openDialog)}
              disabled={!valid}
            >
              提交
            </Button>
            <ConfirmDialog
              title="确认提交？"
              content="请务必确保提交信息真实准确！任何虚报都可能造成申请无效！"
              open={openDialog}
              setOpen={setOpenDialog}
              handleConfirm={handleSubmit}
            />
          </>
        ) : (
          <Button variant="outlined" onClick={handleNext}>
            下一页
          </Button>
        )}
      </Stack>
    </Stack>
  );
};

export default ProgressStepper;
