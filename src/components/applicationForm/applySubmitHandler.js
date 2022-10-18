const applySubmitHandler = async (
  axiosPrivate,
  personal,
  contact,
  address,
  eduBgSeq,
  workBgSeq,
  setErrMsg,
  setSuccess,
  job,
  username,
  roles
) => {
  const formData = new FormData();
  if (eduBgSeq.length > 0) {
    eduBgSeq.forEach((bg, index) => {
      if (bg.certificateDegree && bg.certificateGraduation) {
        const certDegExt = bg.certificateDegree.name.split(".").pop();
        const certGradExt = bg.certificateGraduation.name.split(".").pop();
        const certificateGraduationNewName = `${username}_cert_graduate_${index}_${new Date()
          .toDateString()
          .replaceAll(" ", "_")}.${certGradExt}`;
        const certificateDegreeNewName = `${username}_cert_degree_${index}_${new Date()
          .toDateString()
          .replaceAll(" ", "_")}.${certDegExt}`;
        if (bg.certificateGraduation) {
          formData.append(
            bg.certificateGraduation.name,
            bg.certificateGraduation,
            certificateGraduationNewName
          );
        }
        if (bg.certificateDegree) {
          formData.append(
            bg.certificateDegree.name,
            bg.certificateDegree,
            certificateDegreeNewName
          );
        }
      }
    });
  }

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

    if (eduBgSeq.reduce((prev, curr) => prev || curr.isGraduated, false)) {
      await axiosPrivate.post(`/upload/${username}`, formData, {
        withCredentials: true,
      });
    }
    setErrMsg("");
    setSuccess({ status: true, id: response.data.id });
  } catch (err) {
    if (!err?.message) {
      setErrMsg("no internet response");
    } else if (err?.response.status === 409) {
      setErrMsg(err?.response.data.message);
    } else {
      setErrMsg("application submission fails!");
    }
  }
};
export default applySubmitHandler;
