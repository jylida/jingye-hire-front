import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import UploadButton from "./UploadButton";
const UploadFile = ({
  name,
  fileName,
  acceptedExtensionArray,
  message,
  isUploaded,
  uploader,
  onDelete,
}) => {
  return (
    <Stack
      direction={{ xs: "column", md: "row" }}
      spacing={{ xs: 1, md: 3 }}
      alignItems="center"
      justifyContent="center"
      height="100%"
      border="3px dashed grey"
      padding={3}
    >
      <Typography variant="caption" color="text.secondary">
        {message}
      </Typography>
      <UploadButton
        name={name}
        multiple={false}
        accept={acceptedExtensionArray}
        isUploaded={isUploaded}
        uploadHandler={uploader}
      />
      {fileName && (
        <Chip
          label={fileName}
          variant="outlined"
          color="primary"
          onDelete={onDelete}
        />
      )}
    </Stack>
  );
};
export default UploadFile;
