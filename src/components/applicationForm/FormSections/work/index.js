import { useContext, useReducer, useEffect } from "react";
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
  const { workBgSeq, setWorkBgSeq, setErrMsg } = useContext(ApplyFormContext);
  useEffect(() => {
    dispatch({
      type: actionType.setDate,
      payload: {
        key: "isValid",
        value:
          state?.date?.from < state?.date?.to &&
          state?.date?.to < dayjs(new Date()),
      },
    });
    const errorMessage =
      state?.date?.from <= state?.date?.to
        ? ""
        : "工作结束时间不应早于开始时间";
    setErrMsg(errorMessage);
  }, [state.date.from, state.date.to, setErrMsg]);
  useEffect(() => {
    dispatch({
      type: actionType.setExp,
      payload: {
        key: "isValid",
        value:
          state?.experience?.place?.length > 0 &&
          state?.experience?.title?.length > 0 &&
          state?.experience?.specific?.length > 0,
      },
    });
  }, [
    state.experience.place,
    state.experience.title,
    state.experience.specific,
  ]);
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack
        spacing={{ xs: 2, sm: 3, md: 4 }}
        sx={{ width: "100%", alignItems: "center" }}
      >
        <WorkInputFields
          state={state}
          dispatch={dispatch}
          actionType={actionType}
          init={init}
        />
        {workBgSeq.length > 0 && (
          <FormTable
            columnName="入职时间 离职时间 单位 职位 具体内容 离职原因"
            rows={workBgSeq}
            rowsDeleteHandler={(index) => {
              const workBgSeqToRefresh = [...workBgSeq];
              workBgSeqToRefresh.splice(index, 1);
              setWorkBgSeq(workBgSeqToRefresh);
            }}
            deletable
          />
        )}
      </Stack>
    </LocalizationProvider>
  );
};

export default Work;
