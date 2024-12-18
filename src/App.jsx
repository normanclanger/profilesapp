import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  var count;


  return (
    <>
      <div>
	<h1>Tim's Train Departure Board</h1>
	<p></p>
      </div>

      <div>
	Enter 3 letter station code&nbsp;&nbsp;   
	<input type="text" id="myInput" />
	<p></p>
	<a href="https://www.nationalrail.co.uk/stations/">Look up station codes</a>
	<p></p>Error checking of station codes not implemented - an incorrect station code will result in the unit rebooting until a recognised code is sent
      </div>

      <div className="card">
        <button onClick={() => process((document.getElementById("myInput")).value)}>
          Change Station
        </button>
      </div>

      <div className="status">
	<label id="statusmessage"></label>
      </div>

      <div className="check">
	<label id="question"></label> <p></p>
	<input type="text" id="coursing"/>
      </div>

      <div className="course">
        <button name="coursesubmit" onClick={() => checkcourse((document.getElementById("coursing")).value)}>
          Submit
        </button>
      </div>

      <div className="result">
	<label id="final"></label>
      </div>


    </>
  )
}

function process(v)
{
	console.log(v)
	if (v.length!=3)
	  document.getElementById("statusmessage").innerText="Not 3 letters";
	else
	{
          document.getElementById("statusmessage").innerText="Captcha for bellringers";
	  document.getElementById("question").innerText="Coursing order 53246.  Bob at home.  What's the new coursing order?";	
	}
	
}

function checkcourse(v)
{

	p="Bearer "
	p+="JZvFs0Q4Pc6TFxn"
	p+="y8MP6l7RpW13YBbCd"

	if ((document.getElementById("myInput")).value.length!=3)
	{
		document.getElementById("statusmessage").innerText=document.getElementById("myInput").value+" is not 3 letters";
		document.getElementById("question").innerText="";
		document.getElementById("final").innerText="";
	}

	if (document.getElementById("myInput").value.length==3)
	{

	  if (v=="52436")
	  {
		document.getElementById("final").innerText="Updating to station code "+document.getElementById("myInput").value;

fetch("https://api.balena-cloud.com/v7/device_environment_variable(62657750)", {  method: "PATCH",  headers: {    "Content-type": "application/json" , "Authorization": p  },  body: JSON.stringify({    value: document.getElementById("myInput").value  })}) .then(response => {    console.log(response.status); })


	  }
	  else
		document.getElementById("final").innerText="Oops miscall - Early beer";
	}
}


export default App

