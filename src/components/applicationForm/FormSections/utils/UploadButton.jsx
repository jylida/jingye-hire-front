import Button from "@mui/material/Button";
import Upload from "@mui/icons-material/Upload";
import CheckIcon from "@mui/icons-material/Check";

const UploadButton = ({
  uploadHandler,
  name,
  accept,
  multiple,
  isUploaded,
}) => {
  return (
    <Button
      variant="contained"
      component="label"
      disableElevation
      endIcon={isUploaded ? <CheckIcon /> : <Upload />}
    >
      {name}
      <input
        type="file"
        multiple={multiple}
        hidden
        accept={accept}
        onChange={uploadHandler}
      />
    </Button>
  );
};

export default UploadButton;
