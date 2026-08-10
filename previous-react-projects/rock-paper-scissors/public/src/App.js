import { useState } from 'react';
import './App.css';
import Box from "./component/Box/Box"

const choice = {
  rock: {
    name: "rock",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkBQaCl9jOVTU9904_ebcPgxLBBhoPGyuLFw&s"
  },
  scissors: {
    name: "scissors",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8stDZ0SArawe5RI4rFlPFFmfVPwt3UL1ueg&s"
  },
  paper: {
    name: "paper",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVafgv2Y832tDGqIpYmZkkznAXqODsTQavtpThElPtjUHlfGc8HpBPpjouonKXnMoYFyY&usqp=CAU"
  }
}

function App() {
  const [userSelect, setUserSelect] = useState(null)
  const [computerSelect, setComputerSelect] = useState(null)
  const [result, setResult] = useState("")

  const play = (userChoice) => {
    console.log("User choice: ", userChoice)
    setUserSelect(choice[userChoice])
    let computerChoice = randomChoice()
    setComputerSelect(computerChoice);
    setResult(judgement(choice[userChoice], computerChoice))
  }

  const judgement = (user, computer) => {
    console.log("유저가선택한 값: ", user, "컴이 선택한 값: ", computer)

    //user == computer tie

    //user == rock, comp == scissors : user win

    //user == rock, comp == paper : user lose

    //user == scissors, comp == paper : user win

    //user == scissors, comp == rock : user lose

    //user == paper, comp == rock : user win

    //user paper comp scissors user lose

    if (user.name === computer.name) {
      return "tie";
    } else if (user.name === "rock") {
      return computer.name === "scissors" ? "win" : "lose";
    } else if (user.name === "scissors") {
      return computer.name === "paper" ? "win" : "lose";
    } else if (user.name === "paper") {
      return computer.name === "rock" ? "win" : "lose";
    }
  };

  const randomChoice = () => {
    let itemArray = Object.keys(choice);
    console.log(itemArray)
    let randomItem = Math.floor(Math.random()*itemArray.length);
    console.log(randomItem)
    let final = itemArray[randomItem]
    console.log("final", final)
    return choice[final]
  }

  return (
<div>
  <div className="box-main">
        <Box title="You" item={userSelect} result={result}/>
        <Box title="Computer" item={computerSelect} result={result}/>
      </div>
      <div className='button-main'>
        <button onClick={()=>play("rock")}>rock</button>
        <button onClick={()=>play("scissors")}>scissors</button>
        <button onClick={()=>play("paper")}>paper</button>
  </div>
</div>
  );
}

export default App;
