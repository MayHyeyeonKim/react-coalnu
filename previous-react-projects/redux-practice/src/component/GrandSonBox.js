import React from 'react'
import { useSelector } from 'react-redux'

function GrandSonBox() {
    const count = useSelector(state=>state.count)
  return (
    <div>GrandSonBox에서 count: {count}</div>
  )
}

export default GrandSonBox