const applySubmitHandler = async (
  axiosPrivate,
  personal,
  contact,
  address,
  eduBgSeq,
  workBgSeq,
  setErrMsg,
  setSuccess,
  job
) => {
  const { username, roles } = JSON.parse(localStorage.getItem("auth"));
  const submitted = {
    roles: roles,
    basic: {
      name: personal.name.content,
      username: username,
      gender: personal.gender.content,
      ethics: personal.ethics.content,
      IDCard: personal.IDCard.content,
      politics: personal.politics.content,
      phone: contact.phone.content,
      phoneSecondary: contact.phoneSecondary.content,
      email: contact.email.content,
      addressDistrict: address.district,
      addressStreet: address.street,
      addressSpecific: address.specific,
      isLecturer: job.isLecturer,
      subject: job.subject,
      tqc: job.certificate,
      department: job.department,
      jobSpecific: job.specific,
    },
    education: [...eduBgSeq],
    work: [...workBgSeq],
  };
  try {
    const response = await axiosPrivate.post(
      "/apply",
      JSON.stringify(submitted),
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    console.log(response.status, response.data);
    if (response.status === 201) {
      setErrMsg("");
      setSuccess({ status: true, id: response.data.id });
    }
  } catch (err) {
    if (!err?.message) {
      setErrMsg("no internet response");
    } else if (err?.response.status === 409) {
      setErrMsg("you have already lodged a application!");
    } else {
      setErrMsg("application submission fails!");
    }
  }
};
export default applySubmitHandler;
