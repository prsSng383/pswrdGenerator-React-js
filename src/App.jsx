import { useCallback, useEffect, useState , useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [charAllowed, setCharAllowed] = useState(false);
  const [numAllowed, setNumAllowed] = useState(false);
  const [password , setPassword] = useState("");
  const passwordRef = useRef(null);

  const passgenerator = useCallback(()=>{
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numAllowed) {
     str += "0123456789"
    };
    if(charAllowed) { 
     str += "!@#$%^&*()+{}:";
  };
    for (let i = 1; i <= length; i++) {
          let rnnum = Math.floor(Math.random()*str.length+1);
          pass += str.charAt(rnnum);
         
    }
    setPassword(pass);

  },[length,charAllowed,numAllowed])

  const copytoclipboard = useCallback(()=>{
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  },[password])

   useEffect(()=>{
    passgenerator();
   },[length,charAllowed,numAllowed,passgenerator])

  return (
    <div className='app'>
      <h1 style={{color:"white"}}>|| PASSWORD GENERATOR ||</h1>
      <div className="box">
        <div className="box1">
          <input type="text" 
          placeholder='Password'
          value={password}
          ref={passwordRef}
          readOnly
          />
          <button
           onClick={copytoclipboard}
          >copy</button>
        </div>
        <div className="box2">
           <input type="range" 
           min={6} 
           max={100}
           value={length}
           onChange={(e)=>{setLength(e.target.value)}}
           />
           <h3>Lenght {length}</h3>
           <input type="checkbox" 
            defaultChecked = {charAllowed}
            onChange={()=>{
              setCharAllowed((prev)=>!prev)
            }}
           />
           <label> Char </label>
           <input type="checkbox"
            defaultChecked={numAllowed}
            onChange={()=>{setNumAllowed((prev)=>!prev)}}
           />
           <label htmlFor="">Number</label>
        </div>
      </div>
    </div>
  )
}

export default App
