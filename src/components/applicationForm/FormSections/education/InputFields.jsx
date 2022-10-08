import { useContext, useEffect } from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Add from "@mui/icons-material/Add";
import CheckBox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { FormInputs, FormItem, FormDateInput } from "../../../styledComponents";
import ApplyFormContext from "../../../../context/applyFormProvider";
import { degreeNames, majorGeneralNames } from "../utils/options";
import UploadFile from "../utils/UploadFile";

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
  }, [state.date.from, state.date.to, actionType.setDate, dispatch]);

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
    state.date.from,
    state.date.to,
    state.experience.school,
    state.experience.degree,
    state.experience.majorType,
    state.experience.majorName,
    dispatch,
    actionType.setValid,
  ]);
  return (
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
              checked={state.experience.isGraduated}
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
      {state.experience.isGraduated && (
        <Grid item xs={12}>
          <UploadFile
            name="毕业证"
            fileName={state.experience?.certificateGraduation?.name}
            message="请上传您的毕业证扫描件. 文件的大小请勿大于2MB, 且文件只接受 jpeg、jpg、以及 png 格式."
            isUploaded={state.experience.certificateGraduation ? true : false}
            acceptedExtensionArray=".jpeg,.jpg,.png"
            uploader={(e) => {
              dispatch({
                type: actionType.setExp,
                payload: {
                  key: "certificateGraduation",
                  value: e.target.files[0],
                },
              });
            }}
            onDelete={() =>
              dispatch({
                type: actionType.setExp,
                payload: {
                  key: "certificateGraduation",
                  value: null,
                },
              })
            }
          />
        </Grid>
      )}
      {state.experience.isGraduated && (
        <Grid item xs={12}>
          <UploadFile
            name="学位证"
            fileName={state.experience?.certificateDegree?.name}
            message="请上传您的学位证扫描件. 文件的大小请勿大于2MB, 且文件只接受 jpeg、jpg、以及 png 格式."
            isUploaded={state.experience.certificateDegree ? true : false}
            acceptedExtensionArray=".jpeg,.jpg,.png"
            uploader={(e) => {
              dispatch({
                type: actionType.setExp,
                payload: {
                  key: "certificateDegree",
                  value: e.target.files[0],
                },
              });
            }}
            onDelete={() =>
              dispatch({
                type: actionType.setExp,
                payload: {
                  key: "certificateDegree",
                  value: null,
                },
              })
            }
          />
        </Grid>
      )}
      <FormItem>
        <Button
          variant="contained"
          type="submit"
          disableElevation
          disabled={!state.valid}
          startIcon={<Add />}
          onClick={(e) => {
            e.preventDefault();
            const exts = [
              state.experience.certificateDegree.name,
              state.experience.certificateGraduation.name,
            ].map((name) => name.split(".").pop());
            if (
              exts.reduce(
                (prev, current) => prev && "jpg,jpeg,png".includes(current),
                true
              )
            ) {
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
                  certificateGraduation: state.experience.certificateGraduation,
                  certificateDegree: state.experience.certificateDegree,
                },
              ]);
              dispatch({ type: actionType.initialize, payload: init });
            } else {
              setErrMsg("请上传格式正确的文件！");
              dispatch({
                type: actionType.setExp,
                payload: { key: "certificateGraduation", value: null },
              });
              dispatch({
                type: actionType.setExp,
                payload: { key: "certificateDegree", value: null },
              });
            }
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
