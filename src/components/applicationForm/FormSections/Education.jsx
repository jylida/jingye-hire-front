import { useContext, useEffect } from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { FormContainer, FormInputs, FormItem } from "../../styledComponents";
import ApplyFormContext from "../../../context/applyFormProvider";
import { OutlinedInput, Input } from "@mui/material";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { useState } from "react";
import dayjs from "dayjs";

const Education = () => {
  const [value, setValue] = useState(dayjs("2022-04-07"));
  const { eduBg, setEduBg, eduBgSeq, setEduBgSeq } =
    useContext(ApplyFormContext);
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack direction="column" spacing={1}>
        <Grid container spacing={2}>
          <FormItem>
            <DesktopDatePicker
              label="开始于"
              renderInput={(params) => <TextField {...params} />}
              onChange={(newValue) => setValue(newValue)}
              views={["year", "month"]}
              openTo="year"
              value={value}
            />
          </FormItem>
          <FormInputs />
          <FormInputs />
          <FormInputs />
        </Grid>
        {/* <Button variant="outlined">添加教育背景</Button> */}
      </Stack>
    </LocalizationProvider>
  );
};

export default Education;
