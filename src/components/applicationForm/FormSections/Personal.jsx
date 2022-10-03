import { useContext, useEffect } from "react";
import Stack from "@mui/material/Stack";
import { FormContainer, FormInputs } from "../../styledComponents";
import ApplyFormContext from "../../../context/applyFormProvider";
import checkIDValid from "./utils/checkIDValid";
import checkPhoneValid from "./utils/checkPhoneNumValid";
import checkEmailValid from "./utils/checkEmailValid";
import {
  districtsName,
  ethicalGroupNames,
  politicalBackgroundName,
} from "./utils/options";

const Personal = () => {
  const {
    personal,
    setPersonal,
    contact,
    setContact,
    address,
    setAddress,
    setErrMsg,
  } = useContext(ApplyFormContext);
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
    <Stack direction="column" spacing={1}>
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
    </Stack>
  );
};

export default Personal;
