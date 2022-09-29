import styled from "@mui/material/styles/styled";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

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

export { StyledAuthContainer, FormContainer, FormItem };
