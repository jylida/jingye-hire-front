import { useContext, useEffect } from "react";
import Stack from "@mui/material/Stack";
import { FormContainer, FormInputs } from "../../styledComponents";
import ApplyFormContext from "../../../context/applyFormProvider";

const NumOnly_REG = /^\d+$/;
const Email_REG = /^[A-z0-9.-]+@[A-z0-9.-]+\.[A-z]{2,4}$/;

const Personal = () => {
  const { personal, setPersonal, contact, setContact, address, setAddress } =
    useContext(ApplyFormContext);
  const districtsName =
    "新城区 赛罕区 回民区 玉泉区 土默特左旗 托克托县 和林格尔县 清水河县 武川县 如意开发区 金川开发区"
      .split(" ")
      .filter((nm) => (nm ? true : false));
  const ethicalGroupNames =
    "汉族、蒙古族、回族、藏族、维吾尔族、苗族、彝族、壮族、布依族、朝鲜族、满族、侗族、瑶族、白族、土家族、哈尼族、哈萨克族、傣族、黎族、僳僳族、佤族、畲族、高山族、拉祜族、水族、东乡族、纳西族、景颇族、柯尔克孜族、土族、达斡尔族、仫佬族、羌族、布朗族、撒拉族、毛南族、仡佬族、锡伯族、阿昌族、普米族、塔吉克族、怒族、乌孜别克族、俄罗斯族、鄂温克族、德昂族、保安族、裕固族、京族、塔塔尔族、独龙族、鄂伦春族、赫哲族、门巴族、珞巴族、基诺族"
      .split("、")
      .filter((nm) => (nm ? true : false));
  const politicalBackgroundName =
    "中共党员,中共预备党员,共青团员,民革党员,民盟盟员,民建会员,民进会员,农工党党员,致公党党员,九三学社社员,台盟盟员,无党派人士,群众"
      .split(",")
      .filter((nm) => (nm ? true : false));
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
    const checkIDValid = (input) => {
      const isNumber =
        NumOnly_REG.test(input) ||
        (NumOnly_REG.test(input.slice(0, -1)) && input.slice(-1) === "x");
      const isLengthRight = input.length === 18 || input.length === 15;
      const inputToNum = input
        .split("")
        .map((c) => (c === "x" ? "10" : c))
        .map((c) => parseInt(c));
      const weightSum = inputToNum.reduce(
        (previousValue, currentValue, currentIndex) =>
          previousValue + currentValue * (2 ** (18 - currentIndex - 1) % 11),
        0
      );
      const isValid = input.length === 18 && weightSum % 11 === 1;
      return isNumber && isLengthRight && isValid;
    };
    setPersonal((prev) => ({
      ...prev,
      IDCard: {
        ...prev.IDCard,
        valid: checkIDValid(prev.IDCard.content),
      },
    }));
  }, [personal.IDCard.content, setPersonal]);
  const isPhoneValid = (phone) =>
    phone && phone.length === 11 && NumOnly_REG.test(phone);
  useEffect(() => {
    setContact((prev) => ({
      ...prev,
      phone: {
        ...prev.phone,
        valid: isPhoneValid(prev.phone.content),
      },
    }));
  }, [contact.phone.content, setContact]);
  useEffect(() => {
    setContact((prev) => ({
      ...prev,
      phoneSecondary: {
        ...prev.phoneSecondary,
        valid:
          isPhoneValid(prev.phoneSecondary.content) &&
          prev.phone.content !== prev.phoneSecondary.content,
      },
    }));
  }, [contact.phoneSecondary.content, setContact]);
  useEffect(() => {
    setContact((prev) => ({
      ...prev,
      email: {
        ...prev.email,
        valid: Email_REG.test(prev.email.content),
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
