import { useContext, useEffect } from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Add from "@mui/icons-material/Add";
import CheckBox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { FormInputs, FormItem, FormDateInput } from "../../../styledComponents";
import ApplyFormContext from "../../../../context/applyFormProvider";

import { degreeNames, majorGeneralNames } from "../utils/options";

const EducationInputsFields = ({ state, dispatch, actionType, init }) => {
  const { setEduBgSeq, setErrMsg } = useContext(ApplyFormContext);
  const today = new Date();
  useEffect(() => {
    dispatch({
      type: actionType.setDate,
      payload: {
        key: "isValid",
        value: state.date.from < state.date.to,
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
  }, [...Object.values(state.date), ...Object.values(state.experience)]);
  return (
    <Grid container spacing={2} sx={{ width: "100%", paddingRight: 2 }}>
      <FormDateInput
        label="入学时间"
        onChange={(newValue) =>
          dispatch({
            type: actionType.setDate,
            payload: { key: "from", value: newValue },
          })
        }
        onError={() => setErrMsg("入学时间不应晚于申请日")}
        views={["year", "month"]}
        value={state.date.from}
      />
      <FormDateInput
        label="毕业时间"
        minDate={state.date.from}
        maxDate={`${today.getFullYear()}-08-01`}
        onChange={(newValue) =>
          dispatch({
            type: actionType.setDate,
            payload: { key: "to", value: newValue },
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
          label="已毕业"
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
                isGraduated: state.experience.isGraduated,
              },
            ]);
            dispatch({ type: actionType.initialize, payload: init });
          }}
          sx={{ height: "100%", minHeight: "3rem", maxWidth: "500px" }}
        >
          添加学位信息
        </Button>
      </FormItem>
    </Grid>
  );
};

export default EducationInputsFields;
