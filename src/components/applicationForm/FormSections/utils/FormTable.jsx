import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";
const FormTable = ({ columnName, rows, rowsDeleteHandler }) => {
  const columnNameArray = columnName
    .split(" ")
    .filter((nm) => (nm ? true : false));
  columnNameArray.unshift(" ");
  return (
    <TableContainer component={Paper} sx={{ width: "100%" }}>
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
            const backgroundArray = Object.values(background);
            const numOfColToDisplay = columnNameArray.length;
            return (
              <TableRow
                key={`Table-EducationExperience-Row-${index}`}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center">
                  <IconButton color="error" onClick={rowsDeleteHandler}>
                    <Delete />
                  </IconButton>
                </TableCell>
                {backgroundArray.slice(0, numOfColToDisplay).map((bg, i) => (
                  <TableCell
                    align="center"
                    key={`Table-EducationExperience-Row-${index}-cell-${i}`}
                  >
                    {bg.toString()}
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
