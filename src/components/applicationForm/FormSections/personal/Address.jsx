import { useContext } from "react";
import { FormContainer, FormInputs } from "../../../styledComponents";
import ApplyFormContext from "../../../../context/applyFormProvider";
import { districtsName } from "../utils/options";

const PersonalAddress = () => {
  const { address, setAddress } = useContext(ApplyFormContext);

  return (
    <FormContainer name="呼市居住住址">
      <FormInputs
        required
        select
        id="address-district"
        label="区/县"
        value={address.district}
        onChange={(e) => {
          setAddress({ ...address, district: e.target.value });
        }}
        optionNames={districtsName}
      />
      <FormInputs
        required
        id="address-street"
        label="街道"
        value={address.street}
        onChange={(e) => {
          setAddress({ ...address, street: e.target.value });
        }}
      />
      <FormInputs
        required
        id="address-specific"
        label="详细信息"
        value={address.specific}
        onChange={(e) => {
          setAddress({ ...address, specific: e.target.value });
        }}
      />
    </FormContainer>
  );
};
export default PersonalAddress;
