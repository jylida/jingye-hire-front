import { useContext, useReducer } from "react";
import EducationInputsFields from "./InputFields";
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
    school: "",
    degree: "",
    majorType: "",
    majorName: "",
    isGraduated: false,
    certificateGraduation: null,
    certificateDegree: null,
  },
  valid: false,
  errorMessage: "",
};

const Education = () => {
  const [state, dispatch] = useReducer(reducer, init);
  const { eduBgSeq, setEduBgSeq } = useContext(ApplyFormContext);
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack
        spacing={{ xs: 2, sm: 3, md: 4 }}
        sx={{ width: "100%", alignItems: "center" }}
      >
        <EducationInputsFields
          state={state}
          dispatch={dispatch}
          actionType={actionType}
          init={init}
        />
        {eduBgSeq.length > 0 && (
          <FormTable
            columnName="入学时间 毕业时间 学校名称 学位 专业类别 专业名称 是否毕业"
            rows={eduBgSeq}
            rowsDeleteHandler={(index) => {
              const eduBgSeqToRefresh = [...eduBgSeq];
              eduBgSeqToRefresh.splice(index, 1);
              setEduBgSeq(eduBgSeqToRefresh);
            }}
            deletable
          />
        )}
      </Stack>
    </LocalizationProvider>
  );
};

export default Education;
