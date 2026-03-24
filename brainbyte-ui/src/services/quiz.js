import axios from "axios";

export const submitQuiz = async (quizId, answers) => {
  const token = localStorage.getItem("token");

  const res = await axios.post(
    "http://127.0.0.1:8000/api/submit-quiz/",
    { quiz_id: quizId, answers },
    { headers: { Authorization: `Token ${token}` } }
  );

  return res.data;
};