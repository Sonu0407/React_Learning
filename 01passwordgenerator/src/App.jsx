import { useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1 className="text-3xl font-bold bg-amber-300 underline">
        Hello World!
      </h1>
    </>
  );
}

export default App;
