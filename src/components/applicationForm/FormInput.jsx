import { useContext } from "react";
import ApplyFormContext from "../../context/applyFormProvider";
import Personal from "./FormSections/personal/index";
import Education from "./FormSections/education/index";
import Work from "./FormSections/work/index";
import Summary from "./FormSections/Summary";

const FormInput = () => {
  const { page } = useContext(ApplyFormContext);
  const display = [<Personal />, <Education />, <Work />, <Summary />];
  return display[page];
};

export default FormInput;
