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
const degreeNames = "本科,硕士,博士"
  .split(",")
  .filter((nm) => (nm ? true : false));
const majorGeneralNames =
  "文学、历史学、哲学、法学、经济学、管理学、教育学、理学、工学、农学、医学、艺术学、军事学"
    .split("、")
    .filter((nm) => (nm ? true : false));
const subjectNames =
  "语文 数学 英语 物理 政治 化学 历史  生物 地理 体育 美术 音乐 微机 劳技 其他"
    .split(" ")
    .filter((nm) => (nm ? true : false));
const departmentNames = "初中教学部 高中教学部 总务处 德育处 其他"
  .split(" ")
  .filter((nm) => (nm ? true : false));

export {
  districtsName,
  ethicalGroupNames,
  politicalBackgroundName,
  degreeNames,
  majorGeneralNames,
  subjectNames,
  departmentNames,
};
