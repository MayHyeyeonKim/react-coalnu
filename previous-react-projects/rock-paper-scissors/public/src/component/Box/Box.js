// rafce
import React from 'react'
import './Box.css'

const Box = (props) => {
    // console.log(props)
    let result;
    if(
      props.title === "Computer" &&
      props.result !== "tie" &&
      props.result !== "") {
        result = props.result === "win" ? "lose" : "win";
      } else {
        result = props.result;
      }
  return (
    <div className={`box ${result}`}>
        <h1> {props.title} </h1>
        {/* <h2> {props.item && props.item.name}</h2> */}
        <img className='item-img' src={props.item && props.item.img}/>
        {/* {console.log("Loading image:", props.item.img)} */}
        <h2>{result}</h2>
    </div>
  )
}

export default Box