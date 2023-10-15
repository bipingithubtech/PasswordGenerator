import { useCallback, useEffect, useRef, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [numberallowed, setNumberallowed] = useState(true);
  const [charalloowed, setCharallowed] = useState(true);
  const [password, setPassword] = useState("");
  const copyPassword = useRef();

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

  const passwordCOPY = useCallback(() => {
    copyPassword.current?.select();
    copyPassword.current?.setSelectionRange(0, 90);
    window.navigator.clipboard.writeText(password);
  }, [password]);
  return (
    <>
      <div className="main">
        <h2 style={{ color: "#fa4605", textTransform: "capitalize" }}>
          Password generator
        </h2>
        <div>
          <input
            style={{ backgroundColor: "#fffdfc", padding: "7px 7px" }}
            type="text"
            placeholder="Enter Password"
            value={password}
            readOnly
            ref={copyPassword}
          />
          <span style={{ marginLeft: "5px" }}>
            <button onClick={passwordCOPY}>Copy</button>
          </span>
        </div>
        <div style={{ marginTop: "20px" }}>
          <input
            style={{ marginRight: "10px" }}
            type="range"
            min={6}
            max={100}
            value={length}
            onChange={(e) => setLength(e.target.value)}
          />
          <label style={{ color: "#ffffff" }}>length:{length}</label>
          <input
            style={{ marginLeft: "10px" }}
            type="checkbox"
            defaultChecked={numberallowed}
            onChange={() => {
              setNumberallowed((prev) => !prev);
            }}
          />
          <input
            style={{ marginLeft: "10px" }}
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
