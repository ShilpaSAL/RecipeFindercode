  import React, { useState } from "react";

function Add() {
  const [a, setA] = useState(0);
  const [b, setB] = useState(0);
  const [sum, setSum] = useState(0);

  function Addnumber() {
    setSum(Number(a) + Number(b));
  }

  return (
    <div>
      <h2>Add two numbers</h2>
      <input onChange={(e) => setA(e.target.value)} placeholder="Enter 1st number" />
      <input onChange={(e) => setB(e.target.value)} placeholder="Enter 2nd number" />
      <button onClick={Addnumber}>Add number</button>
      <p>Result: {sum}</p>
    </div>
  );
}

export default Add;

