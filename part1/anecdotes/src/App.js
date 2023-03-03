import { useState } from 'react'


const Button = (props) => {
  // Button component to display buttons
  
  return (
    <button onClick = {props.onClick}>{props.text}</button>
  )
}

const Header = (props) => {
  // Header component to display header texts
  
  return (
    <h1>{props.text}</h1>
  )
}

const DisplayVotes = (props) => {
  // Base component to render votes of invidual anecdotes
  if (props.value < 2) {
    return (
      <div>has {props.value} vote</div>
    )
  }
  return (
    <div>has {props.value} votes</div>
  )
}

const DisplayCurrentAnecdoteWithVotes = (props) => {
  // Component to render anecdotes together with its votes
  
  return (
    <>
      {props.anecdote}
      <DisplayVotes value = {props.value}></DisplayVotes>
    </>
  )
}

const DisplayHighestVotedAnecdoteAfterVotingBegan = (props) => {
  // Component to render highest-voted anecdotes, set to render after voting has begun.
  
  if (props.totalVotes > 0){
    return(
      <>
      {props.anecdote}
      <DisplayVotes value = {props.value}></DisplayVotes>
      </>
    )
  } else {
    return (
      <>
      Highest-voted anecdote will only be displayed after votes have been casted.
      </>
    )
  }
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.',
  ]
   
  const getRandom = (range) => {  // Generate integers for indexing
    const randNum = Math.floor((Math.random()) * range)
    return (
      randNum
      )
  }

  const [selected, setSelected] = useState(getRandom(anecdotes.length))  // To handle state of selecting of anecdotes to display.

  const createInitialVotesState = () => { // helper function to create initial votes state dynamically
    const initialVotesState = {}

    for (const value in anecdotes) {
      initialVotesState[value] = 0
    }
  
    initialVotesState["total votes"] = 0

    return (
      initialVotesState
    )
  }

  const [votes, setVotes] = useState(createInitialVotesState()) // handle state change of voting tabulation

  const handleRandom = () => {  // To handle the actual selection of random anecdotes to display
    const previousRandom = selected // Replicating existing value for comparison in case of same anecdote index being generated consecutively.
    
    let newRandom = getRandom(anecdotes.length)  // Generating random number

    let same = previousRandom == newRandom ? true:false // Helper variable to ensure each anecdote displayed is not showed consecutively (from the user's perspective, a repeating anecdote will act as if the button press is not working)

    while (same == true){ // while loop to keep generating random anecdote index until it is different from the previous value, where {same} will be changed to _false_ and the while-loop ends.
      newRandom = getRandom(anecdotes.length)
      if (previousRandom != newRandom){
        same = false
      }
    }
    setSelected(newRandom)  // state change function
  }
  
  const handleVote = () => {  // To handle voting
    let newVotes = {  // Replicating current state of voting for manipulation/mutation instead as "it is forbidden in React to mutate state directly"
      ...votes  // dynamically replicate curent state of votes
    }

    newVotes[selected] += 1
    newVotes["total votes"] += 1
    setVotes(newVotes)  // state change function

    handleHighestVote(newVotes) // helper funciton processes new voting tabulation to determine highest-voted anecdote. New tabulation to be force-fed into helper function because only previous state is accessble if accessed via state array.
  }

  const [highestVote, setHighestVote] = useState(0) // In the absence of understanding of how to set initial state to be "none", index 0 is set as the "initially highest voted anecdote"

  const handleHighestVote = (newVotes) => { // helper function to handle detection of highest-voted anecdote
    let highestVoted = highestVote  // Current highest-voted anecdote's index is replicated 
    
    for (const key in newVotes){  // cycling through the voting tabulation
      if ((newVotes[key] > newVotes[highestVoted]) && key != "total votes"){  // Compares each anecdote's votes to the vote count of the current highest voted anecdote's. Loop set to ignore the "total votes" entry otherwise it will be the highest-voted anecdote, which does not exist.
        highestVoted = key  // if higher, then the key is saved
      }
    }
    setHighestVote(highestVoted)  // new highest-voted anecdote's index is passed as new state.
  }

  return (
    <>
      <div>
        <Header text = "Anecdote of the day"></Header>
        <DisplayCurrentAnecdoteWithVotes anecdote = {anecdotes[selected]} value = {votes[selected]}></DisplayCurrentAnecdoteWithVotes>
      </div>
      <div>
        <Button text = "vote" onClick = {handleVote}></Button>
        <Button text = "next anecdote" onClick = {handleRandom}></Button>
    </div>
    <div>
      <Header text = "Anecdote with most votes"></Header>
      <DisplayHighestVotedAnecdoteAfterVotingBegan value = {votes[highestVote]} anecdote = {anecdotes[highestVote]} totalVotes = {votes["total votes"]}></DisplayHighestVotedAnecdoteAfterVotingBegan>
    </div>
    </>
  )
}

export default App