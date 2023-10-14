import { useCallback, useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [numberallowed, setNumberallowed] = useState(true);
  const [charalloowed, setCharallowed] = useState(true);
  const [password, setPassword] = useState("");

  const passwordgenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnoprstuvwxyz";
    if (numberallowed) str += "0123456789";
    if (charalloowed) str += "!@#$%^&*~/?<>:;'.*+-";
    for (let i = 1; i <= length; i++) {
      const res = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(res);
    }
    setPassword(pass);
  }, [length, numberallowed, charalloowed]);

  useEffect(() => {
    passwordgenerator();
  }, [length, numberallowed, charalloowed, passwordgenerator]);

  return (
    <>
      <div>
        <h2>Password generator</h2>
        <div>
          <input
            type="text"
            placeholder="Enter Password"
            value={password}
            readOnly
          />
          <span>copy</span>
        </div>
        <div>
          <input
            type="range"
            min={6}
            max={100}
            value={length}
            onChange={(e) => setLength(e.target.value)}
          />
          <label>length:{length}</label>
          <input
            type="checkbox"
            defaultChecked={numberallowed}
            onChange={() => {
              setNumberallowed((prev) => !prev);
            }}
          />
          <input
            type="checkbox"
            defaultChecked={charalloowed}
            onChange={() => {
              setCharallowed((prev) => !prev);
            }}
          />
        </div>
      </div>
    </>
  );
}

export default App;
