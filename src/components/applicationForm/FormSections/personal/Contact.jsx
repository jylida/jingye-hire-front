import { useEffect, useContext } from "react";
import { FormContainer, FormInputs } from "../../../styledComponents";
import checkPhoneValid from "../utils/checkPhoneNumValid";
import checkEmailValid from "../utils/checkEmailValid";
import ApplyFormContext from "../../../../context/applyFormProvider";

const PersonalContact = () => {
  const { contact, setContact } = useContext(ApplyFormContext);
  useEffect(() => {
    setContact((prev) => ({
      ...prev,
      phone: {
        ...prev.phone,
        valid: checkPhoneValid(prev.phone.content),
      },
    }));
  }, [contact.phone.content, setContact]);
  useEffect(() => {
    setContact((prev) => ({
      ...prev,
      phoneSecondary: {
        ...prev.phoneSecondary,
        valid:
          checkPhoneValid(prev.phoneSecondary.content) &&
          prev.phone.content !== prev.phoneSecondary.content,
      },
    }));
  }, [contact.phoneSecondary.content, setContact]);
  useEffect(() => {
    setContact((prev) => ({
      ...prev,
      email: {
        ...prev.email,
        valid: checkEmailValid(prev.email.content),
      },
    }));
  }, [contact.email.content, setContact]);
  return (
    <FormContainer name="联系方式">
      <FormInputs
        error={contact?.phone?.content?.length > 0 && !contact?.phone?.valid}
        required
        id="id-number"
        label="手机号"
        value={contact.phone.content}
        onChange={(e) =>
          setContact((prev) => ({
            ...prev,
            phone: { ...prev.phone, content: e.target.value },
          }))
        }
      />
      <FormInputs
        error={
          contact?.phoneSecondary?.content?.length > 0 &&
          (!contact?.phoneSecondary.valid ||
            contact?.phoneSecondary?.content === contact?.phone?.content)
        }
        id="id-number-backup"
        label="备用手机号"
        helperText="请确保不同于之前输入的手机号"
        value={contact.phoneSecondary.content}
        required={false}
        onChange={(e) =>
          setContact((prev) => ({
            ...prev,
            phoneSecondary: {
              ...prev.phoneSecondary,
              content: e.target.value,
            },
          }))
        }
        onBlur={() => {
          !contact.phoneSecondary.valid &&
            setContact((prev) => ({
              ...prev,
              phoneSecondary: { ...prev.phoneSecondary, content: "" },
            }));
        }}
      />
      <FormInputs
        error={contact.email.content.length > 0 && !contact.email.valid}
        id="id-number-backup"
        label="email"
        required={false}
        value={contact.email.content}
        onChange={(e) => {
          setContact((prev) => ({
            ...prev,
            email: {
              ...prev.email,
              content: e.target.value,
            },
          }));
        }}
        onBlur={() => {
          !contact.email.valid &&
            setContact((prev) => ({
              ...prev,
              email: { ...prev.email, content: "" },
            }));
        }}
      />
    </FormContainer>
  );
};

export default PersonalContact;
