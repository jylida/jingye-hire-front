import { useEffect, useContext } from "react";
import { FormContainer, FormInputs } from "../../../styledComponents";
import { ethicalGroupNames, politicalBackgroundName } from "../utils/options";
import checkIDValid from "../utils/checkIDValid";
import ApplyFormContext from "../../../../context/applyFormProvider";
const PersonalBasic = () => {
  const { personal, setPersonal, setErrMsg } = useContext(ApplyFormContext);
  useEffect(
    () =>
      setPersonal((prev) => ({
        ...prev,
        name: {
          ...prev.name,
          valid: prev.name.content.length > 0 && prev.name.content.length < 15,
        },
      })),
    [personal.name.content, setPersonal]
  );
  useEffect(() => {
    setPersonal((prev) => ({
      ...prev,
      IDCard: {
        ...prev.IDCard,
        valid: checkIDValid(prev.IDCard.content),
      },
    }));
  }, [personal.IDCard.content, setPersonal]);
  return (
    <FormContainer name="基本信息">
      <FormInputs
        id="name"
        label="姓名"
        helperText="需与身份证一致"
        required
        error={personal?.name?.content?.length > 0 && !personal?.name?.valid}
        value={personal.name.content}
        onChange={(e) =>
          setPersonal((prev) => ({
            ...prev,
            name: { ...prev.name, content: e.target.value },
          }))
        }
      />
      <FormInputs
        select
        required
        id="gender"
        label="性别"
        value={personal.gender.content}
        onChange={(e) =>
          setPersonal((prev) => ({
            ...prev,
            gender: { ...prev.gender, content: e.target.value },
          }))
        }
        optionNames={["男", "女"]}
      />
      <FormInputs
        error={
          personal?.IDCard?.content?.length > 0 && !personal?.IDCard?.valid
        }
        required={true}
        id="id-number"
        label="身份证号"
        value={personal.IDCard.content}
        onChange={(e) =>
          setPersonal((prev) => ({
            ...prev,
            IDCard: { ...prev.IDCard, content: e.target.value },
          }))
        }
        onBlur={(e) => {
          const msg =
            personal.IDCard.content.length > 0 && !personal?.IDCard?.valid
              ? "请输入正确的身份证号码"
              : "";
          setErrMsg(msg);
        }}
      />
      <FormInputs
        required
        select
        optionNames={ethicalGroupNames}
        id="ethics"
        label="民族"
        onChange={(e) =>
          setPersonal((prev) => ({
            ...prev,
            ethics: { ...prev.ethics, content: e.target.value },
          }))
        }
        value={personal.ethics.content}
      />
      <FormInputs
        required
        select
        optionNames={politicalBackgroundName}
        id="politics"
        label="政治面貌"
        onChange={(e) =>
          setPersonal((prev) => ({
            ...prev,
            politics: { ...prev.politics, content: e.target.value },
          }))
        }
        value={personal.politics.content}
      />
    </FormContainer>
  );
};
export default PersonalBasic;
