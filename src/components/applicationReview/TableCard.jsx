import Grid from "@mui/material/Grid";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import FordableCard from "./FoldableCard";

const InfoTable = ({ columnName, rows }) => {
  const columnNameArray = columnName
    .split(" ")
    .filter((nm) => (nm ? true : false));
  return (
    <TableContainer component={Paper} elevation={0} sx={{ width: "100%" }}>
      <Table sx={{ minWidth: 500 }}>
        <TableHead>
          <TableRow>
            {columnNameArray.map((clnNm) => (
              <TableCell
                align="center"
                key={`Table-EducationExperience-columnName-${clnNm}`}
                sx={{ backgroundColor: "black", color: "whitesmoke" }}
              >
                {clnNm}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((background, index) => {
            delete background._id;
            const backgroundArray = Object.values(background);
            return (
              <TableRow
                key={`Table-EducationExperience-Row-${index}`}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                {backgroundArray.map((bg, i) => (
                  <TableCell
                    align="center"
                    key={`Table-EducationExperience-Row-${index}-cell-${i}`}
                  >
                    {typeof bg === "object" ? bg : bg.toString()}
                  </TableCell>
                ))}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const TableCard = ({ title, colNames, bgSeq }) => {
  return (
    <Grid item xs={12} sx={{ paddingRight: 2 }}>
      <FordableCard title={title}>
        <InfoTable
          columnName={
            colNames || "from to school degree majorType majorName isGraduated"
          }
          rows={bgSeq}
        />
      </FordableCard>
    </Grid>
  );
};

export default TableCard;
