import { useContext, useReducer } from "react";
import WorkInputFields from "./InputFields";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import Stack from "@mui/material/Stack";
import { actionType, reducer } from "../utils/reducer";
import FormTable from "../utils/FormTable";
import ApplyFormContext from "../../../../context/applyFormProvider";

const init = {
  date: { from: dayjs(new Date()), to: dayjs(new Date()), isValid: false },
  experience: {
    place: "",
    title: "",
    specific: "",
    reasonOnLeave: "",
    isValid: false,
  },
  valid: false,
  errorMessage: "",
};

const Work = () => {
  const [state, dispatch] = useReducer(reducer, init);
  const { workBgSeq, setWorkBgSeq } = useContext(ApplyFormContext);
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack spacing={{ xs: 2, sm: 3, md: 4 }} width="100%">
        <WorkInputFields
          state={state}
          dispatch={dispatch}
          actionType={actionType}
          init={init}
        />
        {workBgSeq.length > 0 && (
          <FormTable
            columnName="入学时间 毕业时间 学校名称 学位 专业类别 专业名称"
            rows={workBgSeq}
            rowsDeleteHandler={(index) => {
              const workBgSeqToRefresh = [...workBgSeq];
              workBgSeqToRefresh.splice(index, 1);
              setWorkBgSeq(workBgSeqToRefresh);
            }}
          />
        )}
      </Stack>
    </LocalizationProvider>
  );
};

export default Work;
