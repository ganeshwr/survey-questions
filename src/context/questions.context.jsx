import { createContext, useEffect, useState } from "react";

const localKey = "questions";

export const QuestionsContext = createContext({
  questions: null,
  setQuestions: () => null,
});

export const getLocalQuestions = () => {
  return JSON.parse(localStorage.getItem(localKey) || "[]");
};

export const setLocalQuestions = (data) => {
  localStorage.setItem(localKey, JSON.stringify(data));
};

export const QuestionsProvider = ({ children }) => {
  const [questions, setQuestions] = useState([]);
  const value = { questions, setQuestions };

  useEffect(() => {
    setQuestions(getLocalQuestions());
  }, []);

  return (
    <QuestionsContext.Provider value={value}>
      {children}
    </QuestionsContext.Provider>
  );
};
