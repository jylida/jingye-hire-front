import FormLayout from "./FormLayout";
import { FormContextProvider } from "../../context/ApplicationFormProvider";

const ApplyForm = () => {
  return (
    <FormContextProvider>
      <FormLayout />
    </FormContextProvider>
  );
};

export default ApplyForm;
