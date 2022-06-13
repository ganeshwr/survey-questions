const localKey = "questions";

export const getLocalQuestions = () => {
  return JSON.parse(localStorage.getItem(localKey) || "[]");
};

export const setLocalQuestions = (data) => {
  localStorage.setItem(localKey, JSON.stringify(data));
};
