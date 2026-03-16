import React,{useEffect,useState} from "react"
import {getQuestions} from "../services/api"

function QuizGame(){

const [questions,setQuestions] = useState([])
const [score,setScore] = useState(0)

useEffect(()=>{

getQuestions().then(res=>{
setQuestions(res.data)
})

},[])

const checkAnswer=(q,opt)=>{

if(opt===q.correct_option){
setScore(score+1)
}

}

return(

<div className="container mt-4">

<h2 className="glow-text text-center mb-4">
Quiz Battle
</h2>

<h4 className="text-info mb-4">
Score : {score}
</h4>

{questions.map(q=>(

<div className="glass-card p-4 mb-4">

<h5>{q.question}</h5>

<button
className="quiz-option"
onClick={()=>checkAnswer(q,1)}
>
{q.option1}
</button>

<button
className="quiz-option"
onClick={()=>checkAnswer(q,2)}
>
{q.option2}
</button>

<button
className="quiz-option"
onClick={()=>checkAnswer(q,3)}
>
{q.option3}
</button>

<button
className="quiz-option"
onClick={()=>checkAnswer(q,4)}
>
{q.option4}
</button>

</div>

))}

</div>

)

}

export default QuizGame