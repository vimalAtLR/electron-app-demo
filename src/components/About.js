import React from 'react'
import { useNavigate } from 'react-router-dom'

function About() {
  let navigate = useNavigate();

  function handleClick() {
    navigate("/");
  }
  return (
    <div>
      <h1>About</h1>
      <a href="/">Home</a>
      <br/>
      <button onClick={() => handleClick()}>Navigate to home</button>
    </div>
  )
}

export default About
