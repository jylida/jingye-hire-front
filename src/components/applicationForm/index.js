import FormLayout from "./FormLayout";
import { ApplyFormContextProvider } from "../../context/applyFormProvider";

const ApplyForm = () => {
  return (
    <ApplyFormContextProvider>
      <FormLayout />
    </ApplyFormContextProvider>
  );
};

export default ApplyForm;
