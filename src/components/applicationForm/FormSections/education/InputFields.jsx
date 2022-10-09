import { useContext } from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Add from "@mui/icons-material/Add";
import CheckBox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { FormInputs, FormItem, FormDateInput } from "../../../styledComponents";
import ApplyFormContext from "../../../../context/applyFormProvider";
import { degreeNames, majorGeneralNames } from "../utils/options";
import UploadFile from "../utils/UploadFile";
import handleAddEdBg from "./handleAddEduBg";

const EducationInputsFields = ({ state, dispatch, actionType, init }) => {
  const { setEduBgSeq, setErrMsg } = useContext(ApplyFormContext);
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
          onClick={handleAddEdBg(
            state,
            dispatch,
            actionType,
            setEduBgSeq,
            setErrMsg,
            init
          )}
          sx={{ height: "100%", minHeight: "3rem", maxWidth: "500px" }}
        >
          添加学位信息
        </Button>
      </FormItem>
    </Grid>
  );
};

export default EducationInputsFields;
