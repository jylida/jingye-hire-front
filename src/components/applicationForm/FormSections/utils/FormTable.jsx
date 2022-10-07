import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";
const FormTable = ({
  columnName,
  rows,
  rowsDeleteHandler,
  deletable,
  size,
}) => {
  const columnNameArray = columnName
    .split(" ")
    .filter((nm) => (nm ? true : false));
  if (deletable) {
    columnNameArray.unshift(" ");
  }
  return (
    <TableContainer component={Paper} elevation={0} sx={{ width: "100%" }}>
      <Table size={size} sx={{ minWidth: 500 }}>
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
            const backgroundWithoutFiles = {
              ...background,
              certificateGraduate: background.certificateGraduation
                ? true
                : false,
              certificateDegree: background.certificateDegree ? true : false,
            };
            const backgroundArray = Object.values(backgroundWithoutFiles);
            const numOfColToDisplay = columnNameArray.length;
            return (
              <TableRow
                key={`Table-EducationExperience-Row-${index}`}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                {deletable && (
                  <TableCell align="center">
                    <IconButton color="error" onClick={rowsDeleteHandler}>
                      <Delete />
                    </IconButton>
                  </TableCell>
                )}
                {backgroundArray
                  .slice(
                    0,
                    deletable ? numOfColToDisplay - 1 : numOfColToDisplay
                  )
                  .map((bg, i) => (
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

export default FormTable;
