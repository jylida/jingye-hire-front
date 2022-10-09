const handleAddEdBg =
  (state, dispatch, actionType, setEduBgSeq, setErrMsg, init) => (e) => {
    e.preventDefault();

    const exts =
      state.experience.certificateDegree?.name &&
      state.experience.certificateGraduation?.name
        ? [
            state.experience.certificateDegree.name,
            state.experience.certificateGraduation.name,
          ].map((name) => name.split(".").pop())
        : null;
    if (
      !state.experience.isGraduated ||
      (state.experience.isGraduated &&
        exts &&
        exts.reduce(
          (prev, current) => prev && "jpg,jpeg,png".includes(current),
          true
        ))
    ) {
      setEduBgSeq((prev) => [
        ...prev,
        {
          from: `${state.date.from.year().toString()}-${
            state.date.from.month() + 1
          }`,
          to: `${state.date.to.year().toString()}-${state.date.to.month() + 1}`,
          school: state.experience.school,
          degree: state.experience.degree,
          majorType: state.experience.majorType,
          majorName: state.experience.majorName,
          isGraduated: state.experience.isGraduated,
          certificateGraduation: state.experience.certificateGraduation,
          certificateDegree: state.experience.certificateDegree,
        },
      ]);
      dispatch({ type: actionType.initialize, payload: init });
    } else {
      setErrMsg("请上传格式正确的文件！");
      dispatch({
        type: actionType.setExp,
        payload: { key: "certificateGraduation", value: null },
      });
      dispatch({
        type: actionType.setExp,
        payload: { key: "certificateDegree", value: null },
      });
    }
  };

export default handleAddEdBg;
