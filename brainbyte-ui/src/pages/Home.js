import React,{useEffect,useState} from "react"
import {getQuizzes} from "../services/api"
import QuizCard from "../components/QuizCard"

function Home(){

const [quizzes,setQuizzes] = useState([])

useEffect(()=>{

getQuizzes().then(res=>{
setQuizzes(res.data)
})

},[])

return(

<div className="container mt-5">

<h1 className="glow-text text-center mb-5">
Choose Your Challenge
</h1>

<div className="row">

{quizzes.map(q=>(
<div className="col-md-4 mb-4">

<QuizCard quiz={q}/>

</div>
))}

</div>

</div>

)

}

export default Home