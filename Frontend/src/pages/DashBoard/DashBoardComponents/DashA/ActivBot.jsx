// src/components/ActivBot.jsx
import logoia from "../../../Home/img/robotica.png"
import React from "react";

export default function ActivBot({ irAChatai }) {
  return (
    
    <button onClick={irAChatai} className="activbot" >
     <img src={logoia} alt=""  width={90}/>
    </button>
  );
}
