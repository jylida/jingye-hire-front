import { useEffect, useContext } from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import CheckBox from "@mui/material/Checkbox";
import { FormContainer, FormInputs, FormItem } from "../../../styledComponents";
import ApplyFormContext from "../../../../context/applyFormProvider";
import { subjectNames, departmentNames } from "../utils/options";

const PersonalJob = () => {
  const { job, setJob } = useContext(ApplyFormContext);
  useEffect(() => {
    let status = job.department.length > 0 && job.specific.length > 0;
    if (job.isLecturer) {
      status = status && job.certificate.length > 0 && job.subject.length > 0;
    }
    setJob((prev) => ({
      ...prev,
      valid: status,
    }));
  }, [
    job.department,
    job.specific,
    job.certificate,
    job.subject,
    job.isLecturer,
    setJob,
  ]);
  return (
    <FormContainer name="申请工作信息">
      <FormItem>
        <FormControlLabel
          labelPlacement="start"
          control={
            <CheckBox
              checked={job.isLecturer}
              onClick={() => {
                setJob((prev) => ({
                  ...prev,
                  isLecturer: !prev.isLecturer,
                  subject: "",
                  certificate: "",
                }));
              }}
              sx={{ padding: "0 0 0 1rem" }}
            />
          }
          label="是否申请教职"
          sx={{ paddingTop: "1.5rem", marginLeft: 0 }}
        />
      </FormItem>
      {job.isLecturer && (
        <FormInputs
          required={job.isLecturer}
          id="subjects"
          label="学科"
          select
          optionNames={subjectNames}
          onChange={(e) =>
            setJob((prev) => ({ ...prev, subject: e.target.value }))
          }
        />
      )}
      {job.isLecturer && (
        <FormInputs
          required={job.isLecturer}
          id="TQC"
          label="教师资格证编号"
          onChange={(e) => {
            setJob((prev) => ({ ...prev, certificate: e.target.value }));
          }}
        />
      )}
      <FormInputs
        required
        id="department"
        label="部门"
        select
        optionNames={departmentNames}
        onChange={(e) =>
          setJob((prev) => ({ ...prev, department: e.target.value }))
        }
      />
      <FormInputs
        required
        id="job-specific"
        label="职位名称"
        onChange={(e) =>
          setJob((prev) => ({ ...prev, specific: e.target.value }))
        }
      />
    </FormContainer>
  );
};

export default PersonalJob;
