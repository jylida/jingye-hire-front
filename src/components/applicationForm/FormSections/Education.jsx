import { useContext, useReducer, useEffect } from "react";
import dayjs from "dayjs";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Add from "@mui/icons-material/Add";
import Typography from "@mui/material/Typography";
import CheckBox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import {
  FormInputs,
  FormItem,
  FormDateInput,
  FormTable,
} from "../../styledComponents";
import ApplyFormContext from "../../../context/applyFormProvider";

const init = {
  date: { from: dayjs(new Date()), to: dayjs(new Date()), isValid: false },
  experience: {
    school: "",
    degree: "",
    majorType: "",
    majorName: "",
    isGraduated: false,
  },
  valid: false,
  errorMessage: "",
};

const actionType = {
  setDate: "setDate",
  setExp: "setExperience",
  initialize: "initialize",
  setValid: "setValid",
  setError: "setError",
};

const reducer = (state, action) => {
  switch (action.type) {
    case actionType.setDate:
      return {
        ...state,
        date: { ...state.date, [action.payload.key]: action.payload.value },
      };
    case actionType.setExp:
      return {
        ...state,
        experience: {
          ...state.experience,
          [action.payload.key]: action.payload.value,
        },
      };
    case actionType.setValid:
      return {
        ...state,
        valid: action.payload,
      };
    case actionType.initialize:
      return init;
    case actionType.setError:
      return { ...state, errorMessage: action.payload };
    default:
      throw new Error(`No action matches required ${action.type}`);
  }
};

const Education = () => {
  const [state, dispatch] = useReducer(reducer, init);
  const { eduBgSeq, setEduBgSeq } = useContext(ApplyFormContext);
  const degreeNames = "本科,硕士,博士"
    .split(",")
    .filter((nm) => (nm ? true : false));
  const majorGeneralNames =
    "文学、历史学、哲学、法学、经济学、管理学、教育学、理学、工学、农学、医学、艺术学、军事学"
      .split("、")
      .filter((nm) => (nm ? true : false));
  useEffect(() => {
    dispatch({
      type: actionType.setDate,
      payload: {
        key: "isValid",
        value:
          state.date.from < state.date.to && state.date.to < dayjs(new Date()),
      },
    });
  }, [state.date.from, state.date.to]);
  useEffect(() => {
    const isValid =
      state.date.from <= state.date.to &&
      state.experience.school.length > 0 &&
      state.experience.degree?.length > 0 &&
      state.experience.majorType?.length > 0 &&
      state.experience.majorName?.length > 0;
    dispatch({
      type: actionType.setValid,
      payload: isValid,
    });
  }, [
    state.date?.from.year(),
    state.date?.to.year(),
    state.experience?.school,
    state.experience?.degree,
    state.experience?.majorType,
    state.experience?.majorName,
  ]);
  useEffect(() => {
    if (state.date?.isValid) {
      dispatch({ type: actionType.setError, payload: "" });
    }
  }, [state.date.to]);
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack spacing={{ xs: 2, md: 3 }} sx={{ width: "100%" }}>
        {!state.date.isValid && (
          <Typography
            color="error"
            variant="caption"
            component="h6"
            fontWeight="bold"
          >
            {state.errorMessage}
          </Typography>
        )}
        <Grid container spacing={2} sx={{ width: "100%" }}>
          <FormDateInput
            label="入学时间"
            onChange={(newValue) =>
              dispatch({
                type: actionType.setDate,
                payload: { key: "from", value: newValue },
              })
            }
            views={["year", "month"]}
            value={state.date.from}
          />
          <FormDateInput
            label="毕业时间"
            minDate={state.date.from}
            maxDate={new Date()}
            onChange={(newValue) =>
              dispatch({
                type: actionType.setDate,
                payload: { key: "to", value: newValue },
              })
            }
            onError={() =>
              dispatch({
                type: actionType.setError,
                payload: "毕业时间不可早于入学时间且不可晚于申请时间",
              })
            }
            views={["year", "month"]}
            value={state.date.to}
          />
          <FormInputs
            variant="outlined"
            required
            label="学校名称"
            value={state.experience.school}
            onChange={(e) =>
              dispatch({
                type: actionType.setExp,
                payload: { key: "school", value: e.target.value },
              })
            }
            sx={{ backgroundColor: "white" }}
          />
          <FormInputs
            optionNames={degreeNames}
            label="学位"
            required
            select
            variant="outlined"
            value={state.experience.degree}
            onChange={(e) =>
              dispatch({
                type: actionType.setExp,
                payload: { key: "degree", value: e.target.value },
              })
            }
            sx={{ backgroundColor: "white" }}
          />
          <FormInputs
            optionNames={majorGeneralNames}
            label="专业类别"
            required
            select
            variant="outlined"
            value={state.experience.majorType}
            onChange={(e) =>
              dispatch({
                type: actionType.setExp,
                payload: { key: "majorType", value: e.target.value },
              })
            }
            sx={{ backgroundColor: "white" }}
          />
          <FormInputs
            label="专业名称"
            required
            variant="outlined"
            value={state.experience.majorName}
            onChange={(e) =>
              dispatch({
                type: actionType.setExp,
                payload: { key: "majorName", value: e.target.value },
              })
            }
            sx={{ backgroundColor: "white" }}
          />
          <FormItem sx={{ display: "flex", placeContent: "center" }}>
            <FormControlLabel
              control={
                <CheckBox
                  value={state.experience.isGraduated}
                  onClick={() => {
                    dispatch({
                      type: actionType.setExp,
                      payload: {
                        key: "isGraduated",
                        value: !state.experience.isGraduated,
                      },
                    });
                  }}
                />
              }
              label="是否已毕业"
            />
          </FormItem>
          <FormItem>
            <Button
              variant="contained"
              type="submit"
              disableElevation
              disabled={!state.valid}
              startIcon={<Add />}
              onClick={(e) => {
                e.preventDefault();
                setEduBgSeq((prev) => [
                  ...prev,
                  {
                    from: `${state.date.from.year().toString()}-${
                      state.date.from.month() + 1
                    }`,
                    to: `${state.date.to.year().toString()}-${
                      state.date.to.month() + 1
                    }`,
                    school: state.experience.school,
                    degree: state.experience.degree,
                    majorType: state.experience.majorType,
                    majorName: state.experience.majorName,
                  },
                ]);
                dispatch({ type: actionType.initialize });
              }}
              sx={{ height: "100%", minHeight: "3rem", maxWidth: "500px" }}
            >
              添加学位信息
            </Button>
          </FormItem>
        </Grid>
      </Stack>
      {eduBgSeq.length > 0 && (
        <FormTable
          columnName="入学时间 毕业时间 学校名称 学位 专业类别 专业名称"
          rows={eduBgSeq}
          rowsDeleteHandler={(index) => {
            const eduBgSeqToRefresh = [...eduBgSeq];
            eduBgSeqToRefresh.splice(index, 1);
            setEduBgSeq(eduBgSeqToRefresh);
          }}
        />
      )}
    </LocalizationProvider>
  );
};

export default Education;
