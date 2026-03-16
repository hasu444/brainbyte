import axios from "axios"

const API = axios.create({
 baseURL:"http://127.0.0.1:8000/api/"
})

export const getQuizzes = () => API.get("quizzes/")
export const getQuestions = () => API.get("questions/")
export const submitScore = (data) => API.post("results/",data)

export default API