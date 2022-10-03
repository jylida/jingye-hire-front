import { useContext, useEffect } from "react";
import dayjs from "dayjs";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Add from "@mui/icons-material/Add";
import TextField from "@mui/material/TextField";
import { FormInputs, FormItem, FormDateInput } from "../../../styledComponents";
import ApplyFormContext from "../../../../context/applyFormProvider";
const WorkInputFields = ({ state, dispatch, actionType, init }) => {
  const { setWorkBgSeq } = useContext(ApplyFormContext);
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
  }, [state.date.from, state.date.to]);
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
    <Grid container spacing={2} sx={{ width: "100%", paddingRight: 2 }}>
      <FormDateInput
        label="入职时间"
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
        label="离职时间"
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
            payload: "入职时间不可早于离职时间且不可晚于申请时间",
          })
        }
        views={["year", "month"]}
        value={state.date.to}
      />
      <FormInputs
        variant="outlined"
        required
        label="单位名称"
        value={state.experience.place}
        onChange={(e) =>
          dispatch({
            type: actionType.setExp,
            payload: { key: "place", value: e.target.value },
          })
        }
        sx={{ backgroundColor: "white" }}
      />
      <FormInputs
        label="职位"
        required
        variant="outlined"
        value={state.experience.title}
        onChange={(e) =>
          dispatch({
            type: actionType.setExp,
            payload: { key: "title", value: e.target.value },
          })
        }
        sx={{ backgroundColor: "white" }}
      />
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          required
          error={state?.experience?.specific?.length > 140}
          label={"详情 (少于140字)"}
          multiline
          maxRows={5}
          value={state.experience.specific}
          sx={{ bgcolor: "white" }}
          onChange={(e) => {
            dispatch({
              type: actionType.setExp,
              payload: { key: "specific", value: e.target.value },
            });
          }}
          _
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label={"离职原因 (少于140字)"}
          error={state?.experience?.reasonOnLeave?.length > 140}
          multiline
          maxRows={5}
          sx={{ bgcolor: "white" }}
          onChange={(e) => {
            dispatch({
              type: actionType.setExp,
              payload: { key: "reasonOnLeave", value: e.target.value },
            });
          }}
        />
      </Grid>
      <FormItem>
        <Button
          variant="contained"
          type="submit"
          disableElevation
          disabled={!(state.date.isValid && state.experience.isValid)}
          startIcon={<Add />}
          onClick={(e) => {
            e.preventDefault();
            setWorkBgSeq((prev) => [
              ...prev,
              {
                from: `${state.date.from.year().toString()}-${
                  state.date.from.month() + 1
                }`,
                to: `${state.date.to.year().toString()}-${
                  state.date.to.month() + 1
                }`,
                place: state.experience.place,
                title: state.experience.title,
                specific: state.experience.specific,
                reasonOnLeave: state.experience.reasonOnLeave,
              },
            ]);
            dispatch({ type: actionType.initialize, payload: init });
          }}
          sx={{ height: "100%", minHeight: "3rem", maxWidth: "500px" }}
        >
          添加工作经历
        </Button>
      </FormItem>
    </Grid>
  );
};
export default WorkInputFields;
