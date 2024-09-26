import { useState } from 'react'

const Button = ({handleClick,text}) => {
  return(
    <button onClick={handleClick}>{text}</button>
  )
}


const StatisticLine = ({text,value}) => {
  return(
    <div>
      {text} {value}
    </div>
  )
}

const Statistics = (props) => {
  if (props.total > 0)
    return(
      <div>
        <StatisticLine text="good" value ={props.good} />
        <StatisticLine text="neutral" value ={props.neutral} />
        <StatisticLine text="bad" value ={props.bad} />
        <StatisticLine text="total" value ={props.total} />
        <StatisticLine text="average" value ={props.average} />
        <StatisticLine text="positive" value ={props.percent} />
      </div>
    )
  return(
    <div>
      No feedback given
    </div>
  )
}
const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)



  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={()=>setGood(good + 1)} text = {"good"} />
      <Button handleClick={()=>setNeutral(neutral + 1)} text = {"neutral"} />
      <Button handleClick={()=>setBad(bad + 1)} text = {"bad"} />
      <h1>statistics</h1>
      <Statistics good = {good}neutral = {neutral}bad = {bad}total = {good+neutral+bad}average = {(good-bad) / (good+neutral+bad)}percent={(good) / (good+neutral+bad)*100+"%"}/>
    </div>
  )
}

export default App