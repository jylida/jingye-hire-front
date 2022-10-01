import styled from "@mui/material/styles/styled";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";

const StyledAuthContainer = styled("main")({
  overflow: "scroll",
  width: "100vw",
  height: "100vh",
  display: "flex",
  flexDirection: "Column",
  justifyContent: "center",
  alignItems: "center",
});

const FormContainer = ({ name, children }) => (
  <fieldset
    style={{
      backgroundColor: "white",
      border: "1px solid lightgrey",
      borderRadius: "10px",
      padding: "0 2rem 2rem 2rem",
    }}
  >
    <legend
      style={{
        color: "grey",
      }}
    >
      <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
        {name}
      </Typography>
    </legend>
    <Grid
      container
      spacing={{ xs: 1, md: 2 }}
      sx={{
        width: "100%",
      }}
    >
      {children}
    </Grid>
  </fieldset>
);
const FormItem = ({ children }) => (
  <Grid item xs={12} sm={6} md={4} lg={3}>
    {children}
  </Grid>
);
const FormInputs = (props) => {
  const { optionNames, ...others } = props;
  return (
    <FormItem>
      <TextField
        {...others}
        required
        variant={others.variant || "standard"}
        fullWidth
      >
        {others.select &&
          optionNames
            .map((nm) => ({ label: nm, value: nm }))
            .map((option) => (
              <MenuItem
                key={`multiPageForm-${others.label}-"${option.label}`}
                value={option.value}
              >
                {option.label}
              </MenuItem>
            ))}
      </TextField>
    </FormItem>
  );
};
const FormDateInput = (props) => {
  return (
    <FormItem>
      <DesktopDatePicker
        {...props}
        renderInput={(params) => (
          <TextField {...params} sx={{ backgroundColor: "white" }} required />
        )}
        openTo="year"
      />
    </FormItem>
  );
};
const FormTable = ({ columnName, rows }) => (
  <TableContainer component={Paper}>
    <Table sx={{ minWidth: 700 }}>
      <TableHead>
        {columnName
          .split(" ")
          .filter((nm) => (nm ? true : false))
          .map((clnNm) => (
            <TableCell
              align="center"
              key={`Table-EducationExperience-columnName-${clnNm}`}
              sx={{ backgroundColor: "black", color: "whitesmoke" }}
            >
              {clnNm}
            </TableCell>
          ))}
      </TableHead>
      <TableBody>
        {rows.map((background, index) => (
          <TableRow
            key={`Table-EducationExperience-Row-${index}`}
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
          >
            {Object.values(background).map((bg) => (
              <TableCell align="center">{bg}</TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

export {
  StyledAuthContainer,
  FormContainer,
  FormItem,
  FormInputs,
  FormDateInput,
  FormTable,
};
