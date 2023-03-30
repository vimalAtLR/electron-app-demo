import React from 'react'
import { useNavigate } from 'react-router-dom'

function Home() {
  let navigate = useNavigate();

  function handleClick() {
    navigate("/about");
  }
  return (
    <div>
      <h1>Home</h1>
      <a href="/about">About</a>
      <br/>
      <button onClick={() => handleClick()}>Navigate to about</button>
    </div>
  )
}

export default Home
