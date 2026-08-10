import React, { Component } from 'react'
import BoxClass from './component/Box/BoxClass'

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

export default class AppClass extends Component {
    constructor(){
        super();
        this.state = {
            userSelect: null,
            computerSelect: null,
            result: "",
            userScore: 0,
            computerScore: 0,
        };
        console.log("constructor")
    }

    play = (userChoice) => {
        let computerChoice = this.randomeChoice();
        this.setState({
            userSelect: choice[userChoice],
            computerSelect: computerChoice,
            result: this.judgement(choice[userChoice], computerChoice),
        });
        console.log("play", this.state);
    };

    randomeChoice = () => {
        let itemArray = Object.keys(choice);
        let randomItem = Math.floor(Math.random() * itemArray.length);
        let final = itemArray[randomItem];
        return choice[final];
    };

    judgement = (user, computer) => {
        if (user.name === computer.name) {
            return "tie";
        } else if (
            (user.name === "Rock" && computer.name === "Scissors") ||
            (user.name === "Scissors" && computer.name === "Paper") ||
            (user.name === "Paper" && computer.name === "Rock")
        ) {
            this.setState({userScore: this.state.userScore + 1});
            return "win";
        } else {
            this.setState({computerScore: this.state.computerScore + 1});
            return "lose";
        }
    };

    componentDidMount(){
      console.log("componentDidMount")
    }

    componentDidUpdate(){
      console.log("componentDidUpdate", this.state);
    }

    render() {
      console.log("render")
      return (
        <div className="app-main">
          <div className="box-main">
            <BoxClass title="You" item={this.state.userSelect} result={this.state.result} />
            <BoxClass title="Computer" item={this.state.computerSelect} result={this.state.result} />
          </div>
          <div className="button-main">
            <button onClick={() => this.play('rock')}>Rock</button>
            <button onClick={() => this.play('paper')}>Paper</button>
            <button onClick={() => this.play('scissors')}>Scissors</button>
          </div>
        </div>
      )
    }
}
