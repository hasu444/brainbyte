import React from "react"
import {Link} from "react-router-dom"

function QuizCard({quiz}){

return(

<div className="glass-card p-4">

<h4 className="text-info">
{quiz.title}
</h4>

<p className="text-light">
{quiz.description}
</p>

<Link to={`/quiz/${quiz.id}`}>

<button className="btn-neon">
🎮 Start Quiz
</button>

</Link>

</div>

)

}

export default QuizCard