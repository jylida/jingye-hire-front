const personalPropertyNamesEn = "name,gender,IDCard,ethics,politics"
  .split(",")
  .filter((nm) => nm);
const personalPropertyNamesCn = "姓名 性别 身份证号 民族 政治面貌"
  .split(" ")
  .filter((nm) => nm);
const contactPropertyNamesEn =
  "phone phoneSecondary email addressDistrict addressStreet addressSpecific"
    .split(" ")
    .filter((nm) => nm);
const contactPropertyNamesCn =
  "手机 备用手机 邮箱 呼市居住地址-区 呼市居住地址-街道 呼市居住地址-详细"
    .split(" ")
    .filter((nm) => nm);
const jobPropertyNamesEn = "isLecturer subject tqc department jobSpecific"
  .split(" ")
  .filter((nm) => nm);
const jobPropertyNamesCn =
  "是否寻求教职 求职学科 教师资格证编号 求职部门 具体岗位"
    .split(" ")
    .filter((nm) => nm);
class InfoObj {
  constructor(enNm, cnNm, value) {
    this.enNm = enNm;
    this.cnNm = cnNm;
    this.value = value;
  }
}
const infoObjPersonalArray = (application) =>
  personalPropertyNamesEn.map(
    (nm, i) => new InfoObj(nm, personalPropertyNamesCn[i], application[nm])
  );
const infoObjContactArray = (application) =>
  contactPropertyNamesEn.map(
    (nm, i) => new InfoObj(nm, contactPropertyNamesCn[i], application[nm])
  );
const infoObjJobArray = (application) =>
  jobPropertyNamesEn.map(
    (nm, i) =>
      new InfoObj(nm, jobPropertyNamesCn[i], application[nm].toString())
  );
export {
  personalPropertyNamesCn,
  personalPropertyNamesEn,
  contactPropertyNamesCn,
  contactPropertyNamesEn,
  jobPropertyNamesCn,
  jobPropertyNamesEn,
  infoObjPersonalArray,
  infoObjContactArray,
  infoObjJobArray,
};
