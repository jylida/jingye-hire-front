import dayjs from "dayjs";
const init = {
  date: { from: dayjs(new Date()), to: dayjs(new Date()), isValid: false },
  experience: {
    school: "",
    degree: "",
    majorType: "",
    majorName: "",
    isGraduated: false,
  },
  valid: false,
  errorMessage: "",
};

const actionType = {
  setDate: "setDate",
  setExp: "setExperience",
  initialize: "initialize",
  setValid: "setValid",
  setError: "setError",
};

const reducer = (state, action) => {
  switch (action.type) {
    case actionType.setDate:
      return {
        ...state,
        date: { ...state.date, [action.payload.key]: action.payload.value },
      };
    case actionType.setExp:
      return {
        ...state,
        experience: {
          ...state.experience,
          [action.payload.key]: action.payload.value,
        },
      };
    case actionType.setValid:
      return {
        ...state,
        valid: action.payload,
      };
    case actionType.initialize:
      return init;
    case actionType.setError:
      return { ...state, errorMessage: action.payload };
    default:
      throw new Error(`No action matches required ${action.type}`);
  }
};

export { init, reducer, actionType };
