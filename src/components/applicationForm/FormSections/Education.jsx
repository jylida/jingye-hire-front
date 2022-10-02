import { useContext } from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Add from "@mui/icons-material/Add";
import {
  FormInputs,
  FormItem,
  FormDateInput,
  FormTable,
} from "../../styledComponents";
import ApplyFormContext from "../../../context/applyFormProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useState } from "react";
import dayjs from "dayjs";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const Education = () => {
  const [startDate, setStartDate] = useState(dayjs("2022-04-07"));
  const [endDate, setEndDate] = useState(dayjs("2022-04-08"));
  const [school, setSchool] = useState("");
  const [degree, setDegree] = useState("");
  const [majorType, setMajorType] = useState("");
  const [majorName, setMajorName] = useState("");
  const { eduBgSeq, setEduBgSeq } = useContext(ApplyFormContext);
  const degreeNames = "本科,硕士,博士"
    .split(",")
    .filter((nm) => (nm ? true : false));
  const majorGeneralNames =
    "文学、历史学、哲学、法学、经济学、管理学、教育学、理学、工学、农学、医学、艺术学、军事学"
      .split("、")
      .filter((nm) => (nm ? true : false));
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack spacing={{ xs: 2, md: 3 }}>
        <Grid container spacing={2}>
          <FormDateInput
            label="入学时间"
            onChange={(newValue) => setStartDate(newValue)}
            views={["year", "month"]}
            value={startDate}
          />
          <FormDateInput
            label="毕业时间"
            onChange={(newValue) => setEndDate(newValue)}
            views={["year", "month"]}
            value={endDate}
          />
          <FormInputs
            variant="outlined"
            required
            label="学校名称"
            value={school}
            onChange={(e) => setSchool(e.target.value)}
            sx={{ backgroundColor: "white" }}
          />
          <FormInputs
            optionNames={degreeNames}
            label="学位"
            required
            select
            variant="outlined"
            value={degree}
            onChange={(e) => setDegree(e.target.value)}
            sx={{ backgroundColor: "white" }}
          />
          <FormInputs
            optionNames={majorGeneralNames}
            label="专业类别"
            required
            select
            variant="outlined"
            value={majorType}
            onChange={(e) => setMajorType(e.target.value)}
            sx={{ backgroundColor: "white" }}
          />
          <FormInputs
            label="专业名称"
            required
            variant="outlined"
            value={majorName}
            onChange={(e) => setMajorName(e.target.value)}
            sx={{ backgroundColor: "white" }}
          />
          <FormItem>
            <Button
              variant="contained"
              type="submit"
              disableElevation
              startIcon={<Add />}
              onClick={(e) => {
                e.preventDefault();
                setEduBgSeq((prev) => [
                  ...prev,
                  {
                    from: `${startDate.year().toString()}-${
                      startDate.month() + 1
                    }`,
                    to: `${endDate.year().toString()}-${endDate.month() + 1}`,
                    school,
                    degree,
                    majorType,
                    majorName,
                  },
                ]);
                setSchool("");
                setDegree("");
                setMajorType("");
                setMajorName("");
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
