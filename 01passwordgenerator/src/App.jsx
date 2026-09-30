import { useCallback, useEffect, useState, useRef } from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const generatePassword = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%&*()_+^";

    //loop to get random char until the size of length
    for (let i = 1; i < length; i++) {
      const index = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(index);
    }

    setPassword(pass);
  }, [length, numberAllowed, charAllowed]);

  const passwordRef = useRef();

  const copyPasswordToClipboard = () => {
    window.navigator.clipboard.writeText(password);
    passwordRef.current.select();
  };

  useEffect(() => {
    generatePassword();
  }, [length, numberAllowed, charAllowed]);

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
        <h1 className="text-white text-center my-3">Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3 bg-white text-gray-800"
            placeholder="Password"
            readOnly
            ref={passwordRef}
          />
          <button
            onClick={copyPasswordToClipboard}
            className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0"
          >
            copy
          </button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className="cursor-pointer"
              onChange={(e) => {
                setLength(e.target.value);
              }}
              name=""
              id=""
            />
            <label htmlFor="length">Length: {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              defaultChecked={numberAllowed}
              onChange={() => {
                setNumberAllowed((prev) => !prev);
              }}
              type="checkbox"
              name=""
              id=""
            />
            <label htmlFor="number">Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              name=""
              id=""
              defaultChecked={charAllowed}
              onChange={() => {
                setCharAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="character">Characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
