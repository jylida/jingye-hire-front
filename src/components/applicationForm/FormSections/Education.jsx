import { useContext, useEffect } from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import {
  FormContainer,
  FormInputs,
  FormItem,
  FormDateInput,
} from "../../styledComponents";
import ApplyFormContext from "../../../context/applyFormProvider";
import { OutlinedInput, Input } from "@mui/material";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { useState } from "react";
import dayjs from "dayjs";

const Education = () => {
  const [startDate, setStartDate] = useState(dayjs("2022-04-07"));
  const [endDate, setEndDate] = useState(dayjs("2022-04-08"));
  const { eduBg, setEduBg, eduBgSeq, setEduBgSeq } =
    useContext(ApplyFormContext);
  const degreeNames = "本科,硕士,博士"
    .split(",")
    .filter((nm) => (nm ? true : false));
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack direction="column" spacing={1}>
        <Grid container spacing={2}>
          <FormDateInput
            label="开始于"
            onChange={(newValue) => setStartDate(newValue)}
            views={["year", "month"]}
            value={startDate}
          />
          <FormDateInput
            label="结束于"
            onChange={(newValue) => setEndDate(newValue)}
            views={["year", "month"]}
            value={endDate}
          />
          <FormItem>
            <TextField fullWidth required variant="outlined" label="学校名称" />
          </FormItem>
          <FormInputs
            optionNames={degreeNames}
            label="学位"
            required
            select
            variant="outlined"
          />
          <FormInputs />
        </Grid>
        {/* <Button variant="outlined">添加教育背景</Button> */}
      </Stack>
    </LocalizationProvider>
  );
};

export default Education;
