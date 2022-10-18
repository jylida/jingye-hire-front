import { useState, useContext } from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { ConfirmDialog } from "../../styledComponents";
import ApplyFormContext from "../../../context/applyFormProvider";
import ApplySubmitButton from "../ApplySubmitButton";
const ProgressNavigator = () => {
  const { page, setPage, pageNames, valid } = useContext(ApplyFormContext);
  const [openDialog, setOpenDialog] = useState(false);
  const handleNext = () => setPage((prev) => prev + 1);
  const handleBack = () => setPage((prev) => prev - 1);
  return (
    <Stack direction="row" justifyContent="space-between">
      <Button variant="outlined" onClick={handleBack} disabled={page === 0}>
        上一页
      </Button>
      {page === pageNames.length - 1 ? (
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
            confirmButton={<ApplySubmitButton />}
          />
        </>
      ) : (
        <Button
          variant="outlined"
          disabled={!pageNames[page].valid}
          onClick={handleNext}
        >
          下一页
        </Button>
      )}
    </Stack>
  );
};

export default ProgressNavigator;
