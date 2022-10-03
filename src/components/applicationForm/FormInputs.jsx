import { useContext } from "react";
import ApplyFormContext from "../../context/applyFormProvider";
import Personal from "./FormSections/Personal";
import Education from "./FormSections/Education";
import Work from "./FormSections/Work";

const FormInput = () => {
  const { page } = useContext(ApplyFormContext);
  const display = [<Personal />, <Education />, <Work />];
  return display[page];
};

export default FormInput;
