import { useContext } from "react";
import IconButton from "@mui/material/IconButton";
import Check from "@mui/icons-material/Check";
import Clear from "@mui/icons-material/Clear";
import FormTable from "./utils/FormTable";
import ApplyFormContext from "../../../context/applyFormProvider";

class SummaryRow {
  constructor(name, content, status) {
    this.name = name;
    this.content = content;
    this.status = (
      <IconButton color={status ? "success" : "error"}>
        {status ? <Check /> : <Clear />}
      </IconButton>
    );
  }
}

const Summary = () => {
  const { personal, contact, address, job, eduBgSeq, workBgSeq } =
    useContext(ApplyFormContext);
  const tableHead = "名称 内容 是否完成";
  const rows = [
    new SummaryRow("姓名*", personal.name.content, personal.name.valid),
    new SummaryRow(
      "性别*",
      personal.gender.content,
      personal.gender.content.length > 0
    ),
    new SummaryRow("身份证号*", personal.IDCard.content, personal.IDCard.valid),
    new SummaryRow(
      "民族*",
      personal.ethics.content,
      personal.ethics.content.length > 0
    ),
    new SummaryRow(
      "政治面貌*",
      personal.politics.content,
      personal.politics.content.length > 0
    ),
    new SummaryRow("手机号*", contact.phone.content, contact.phone.valid),
    contact.phoneSecondary.content.length > 0 &&
      new SummaryRow(
        "备用手机号",
        contact.phoneSecondary.content,
        contact.phoneSecondary.valid
      ),
    contact.email.content.length > 0 &&
      new SummaryRow("email", contact.email.content, contact.email.valid),
    new SummaryRow(
      "呼市地址所在区*",
      address.district,
      address.district.length > 0
    ),
    new SummaryRow("街道*", address.street, address.street.length > 0),
    new SummaryRow("具体地址*", address.specific, address.specific.length > 0),
    new SummaryRow("是否申请教职*", job.isLecturer, true),
    job.isLecturer &&
      new SummaryRow("学科*", job.subject, job.subject.length > 0),
    job.isLecturer &&
      new SummaryRow(
        "教师资格证编号*",
        job.certificate,
        job.certificate.length > 0
      ),
    new SummaryRow("部门*", job.department, job.department.length > 0),
    new SummaryRow("职位信息*", job.specific, job.specific.length > 0),
    new SummaryRow(
      "教育背景*",
      `共 ${eduBgSeq.length} 条`,
      eduBgSeq.length > 0
    ),
    new SummaryRow(
      "工作经历*",
      `共 ${workBgSeq.length} 条`,
      workBgSeq.length > 0
    ),
  ].filter((row) => row);
  return <FormTable columnName={tableHead} rows={rows} size="small" />;
};

export default Summary;
