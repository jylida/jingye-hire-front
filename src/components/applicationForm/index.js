import FormLayout from "./FormLayout";
import {FormContextProvider} from "../../context/formcontext";

const ApplyForm = () => {
    return (
        <FormContextProvider>
            <FormLayout />
        </FormContextProvider>
    );
};

export default ApplyForm;