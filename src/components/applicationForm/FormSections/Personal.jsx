import { useContext, useEffect } from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import { FormContainer, FormItem } from "../../styledComponents";
import ApplyFormContext from "../../../context/applyFormProvider";

const NumOnly_REG = /^\d+$/;
const Email_REG = /^[A-z0-9+_.-]+@[A-z0-9.-]+$/;

const Personal = () => {
  const { personal, setPersonal, contact, setContact } =
    useContext(ApplyFormContext);
  const districtsName =
    "新城区 赛罕区 回民区 玉泉区 土默特左旗 托克托县 和林格尔县 清水河县 武川县 如意开发区 金川开发区"
      .split(" ")
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
    [personal.name.content]
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
  }, [personal.IDCard.content]);
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
  }, [contact.phone.content]);
  useEffect(() => {
    setContact((prev) => ({
      ...prev,
      phoneEmergency: {
        ...prev.phoneEmergency,
        valid: isPhoneValid(prev.phoneEmergency.content),
      },
    }));
  }, [contact.phoneEmergency.content]);
  useEffect(() => {
    setContact((prev) => ({
      ...prev,
      email: {
        ...prev.email,
        valid: Email_REG.test(prev.email.content),
      },
    }));
  }, [contact.email.content]);
  return (
    <Stack direction="column" spacing={1}>
      <FormContainer name="基本信息">
        <FormItem>
          <TextField
            fullWidth
            variant="standard"
            id="name"
            label="姓名"
            helperText="需与身份证一致"
            required
            error={
              personal?.name?.content?.length > 0 && !personal?.name?.valid
            }
            onChange={(e) =>
              setPersonal((prev) => ({
                ...prev,
                name: { ...prev.name, content: e.target.value },
              }))
            }
          />
        </FormItem>
        <FormItem>
          <TextField
            fullWidth
            variant="standard"
            select
            required
            id="gender"
            label="性别"
            onChange={(e) =>
              setPersonal((prev) => ({
                ...prev,
                gender: { ...prev.gender, content: e.target.value },
              }))
            }
          >
            {[
              { value: "男", label: "男" },
              { value: "女", label: "女" },
            ].map((option) => (
              <MenuItem
                key={"multiPageForm-personal-gender-" + option.label}
                value={option.value}
              >
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </FormItem>
        <FormItem>
          <TextField
            error={
              personal?.IDCard?.content?.length > 0 && !personal?.IDCard?.valid
            }
            fullWidth
            variant="standard"
            required
            id="id-number"
            label="身份证号"
            onChange={(e) =>
              setPersonal((prev) => ({
                ...prev,
                IDCard: { ...prev.IDCard, content: e.target.value },
              }))
            }
          />
        </FormItem>
      </FormContainer>
      <FormContainer name="联系方式">
        <FormItem>
          <TextField
            fullWidth
            error={
              contact?.phone?.content?.length > 0 && !contact?.phone?.valid
            }
            variant="standard"
            required
            id="id-number"
            label="手机号"
            onChange={(e) =>
              setContact((prev) => ({
                ...prev,
                phone: { ...prev.phone, content: e.target.value },
              }))
            }
          />
        </FormItem>
        <FormItem>
          <TextField
            fullWidth
            error={
              contact?.phoneEmergency?.content?.length > 0 &&
              !contact?.phoneEmergency.valid
            }
            variant="standard"
            id="id-number-backup"
            label="备用手机号"
            onChange={(e) =>
              setContact((prev) => ({
                ...prev,
                phoneEmergency: {
                  ...prev.phoneEmergency,
                  content: e.target.value,
                },
              }))
            }
          />
        </FormItem>
        <FormItem>
          <TextField
            fullWidth
            variant="standard"
            id="id-number-backup"
            label="email"
            onChange={(e) => {
              setContact((prev) => ({
                ...prev,
                email: {
                  ...prev.email,
                  content: e.target.value,
                },
              }));
            }}
          />
        </FormItem>
      </FormContainer>
      <FormContainer name="呼市居住住址">
        <FormItem>
          <TextField
            fullWidth
            required
            select
            variant="standard"
            id="address-district"
            label="区/县"
          >
            {districtsName
              .map((distNm) => ({ value: distNm, label: distNm }))
              .map((obj) => (
                <MenuItem
                  key={"MultiPageForm-Personal-districtName-" + obj.label}
                  value={obj.value}
                >
                  {obj.label}
                </MenuItem>
              ))}
          </TextField>
        </FormItem>
        <FormItem>
          <TextField
            fullWidth
            required
            variant="standard"
            id="address-street"
            label="街道"
          />
        </FormItem>
        <FormItem>
          <TextField
            fullWidth
            required
            variant="standard"
            id="address-specific"
            label="详细信息"
          />
        </FormItem>
      </FormContainer>
    </Stack>
  );
};

export default Personal;
