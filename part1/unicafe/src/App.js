import { useState } from "react"

const Header = (props) => {
  return(
    <div><h1>{props.text}</h1></div>
  )
}

const Header2 = (props) => {
  return (
    <div><h2>{props.text}</h2></div>
  )
}

const Button = (props) => {
  return (
    <button onClick = {props.onClick}>{props.text}</button>
  )
}

const StatisticLine = (props) => {
  if (props.text == 'positive'){
    return(
      <tbody>
        <tr>
          <td>{props.text}</td> 
          <td>{props.value} %</td>
        </tr>
      </tbody>  
    )
  }
  
  return (
    <tbody>
      <tr>
        <td>{props.text}</td> 
        <td>{props.value}</td>
      </tr>
    </tbody>
  )
}

const Statistics = (props) => {
  // console.log("RenderStats props: ", props)
  
  if (props.input.totalVotes < 1){
    return(
      <tbody>
        <tr>
          <td>No feedback given</td>
        </tr>
      </tbody>
    )
  }

  return (
    <>
      <StatisticLine text = 'good' value = {props.input.good}></StatisticLine>
      <StatisticLine text = 'neutral' value = {props.input.neutral}></StatisticLine>
      <StatisticLine text = 'bad' value = {props.input.bad}></StatisticLine>
      <StatisticLine text = 'all' value = {props.input.totalVotes}></StatisticLine>
      <StatisticLine text = 'average' value = {props.input.averageScore}></StatisticLine>
      <StatisticLine text = 'positive' value = {props.input.positiveRate}></StatisticLine>
    </>
  )
}

const App = () => {
  
  const [ratings, setRatings] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
    totalVotes: 0,
    runningScore: 0,
    averageScore: 0,
    positiveRate: 0
  })

  const resetRating = () => {
    const newRatings = {
      good: 0,
      neutral: 0,
      bad: 0,
      totalVotes: 0,
      runningScore: 0,
      averageScore: 0,
      positiveRate: 0
    }
    setRatings(newRatings)
  }

  const handleRating = (vote) => () => {
    const newRatings = {
      good: ratings.good,
      neutral: ratings.neutral,
      bad: ratings.bad,
      totalVotes: ratings.totalVotes,
      runningScore: ratings.runningScore,
      averageScore: ratings.averageScore,
      positiveRate: ratings.positiveRate
    }
    switch (vote) {
      case 'good':
        newRatings.good ++
        newRatings.runningScore += 1
        // console.log('user voted good!')
        break;
      case 'neutral':
        newRatings.neutral ++ 
        // console.log('user voted neutral!')
        break;
      case 'bad':
        newRatings.bad ++ 
        newRatings.runningScore -= 1
        // console.log('user voted bad!')
        break;   
    }

    newRatings.totalVotes += 1
    newRatings.averageScore = newRatings.runningScore/newRatings.totalVotes
    newRatings.positiveRate = newRatings.good/newRatings.totalVotes * 100

    setRatings(newRatings)
  }

  return (
    <>
      <Header text = "give feedback"></Header>
      <Button onClick = {handleRating('good')} text = "good"/>
      <Button onClick = {handleRating('neutral')} text = "neutral"/>
      <Button onClick = {handleRating('bad')} text = "bad"/>
      <Header2 text = "statistics"></Header2>
      <table>
        <Statistics input = {ratings}></Statistics>
      </table>
    </>
  );
}

export default App;
