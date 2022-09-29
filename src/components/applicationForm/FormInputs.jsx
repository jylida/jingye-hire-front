import { useContext } from "react";
import ApplyFormContext from "../../context/applyFormProvider";
import Personal from "./FormSections/Personal";
import Education from "./FormSections/Education";
import Work from "./FormSections/Work";
import Misc from "./FormSections/Misc";

const FormInput = () => {
  const { state } = useContext(ApplyFormContext);
  const display = [<Personal />, <Education />, <Work />, <Misc />];
  return display[state.page];
};

export default FormInput;
