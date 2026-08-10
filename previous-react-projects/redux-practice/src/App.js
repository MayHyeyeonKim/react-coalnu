import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import {useDispatch, useSelector} from "react-redux"
import Box from './component/Box';
function App() {
  // const [count,setCount] = useState(0);
  const dispatch = useDispatch();
  const count = useSelector(state=>state.count)
  const id = useSelector(state=>state.id)
  const password = useSelector(state=>state.password)

  const increment = () => {
    dispatch({type:"INCREMENT", payload:{num:5}})
    // const addcount = count+1
    // setCount(addcount)
  }
  const decrement = () =>{
    dispatch({type:"DECREMENT", payload:{num:3}})
  }
  const login=()=>{
    dispatch({type:"LOGIN", payload:{id:"def_id", password:"1234"}})
  }
  return (
    <div>
      <div>{count}</div>
      <button onClick={increment}>증가</button>
      <button onClick={decrement}>감소</button>

      <button onClick={login}>Login</button>
      <div>id: {id}, password: {password}</div>

      <Box />
    </div>
  );
}

export default App;
