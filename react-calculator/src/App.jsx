
import { useState } from "react";
import "./App.css";

function App() {
  const [display, setDisplay] = useState("");
  const [firstNumber, setFirstNumber] = useState(null);
  const [operator, setOperator] = useState(null);
  const [newNumber, setNewNumber] = useState(false);

  function handleClick(value) {
    if ("0123456789.".includes(value) && value !== "") {
      if (newNumber) {
        setDisplay(value === "." ? "0." : value);
        setNewNumber(false);
      } else {
        setDisplay((prev) =>
          value === "." && prev.includes(".") ? prev : prev + value
        );
      }
      return;
    }

    if (value === "AC") {
      setDisplay("");
      setFirstNumber(null);
      setOperator(null);
      setNewNumber(false);
      return;
    }

    if (value === "+" || value === "-" || value === "*" || value === "/") {
      if (display === "" && firstNumber === null) return;
      setFirstNumber(display === "" ? firstNumber : Number(display));
      setOperator(value);
      setNewNumber(true);
      return;
    }

    if (value === "=" && operator && firstNumber !== null) {
      const secondNumber = Number(display);
      let result;

      switch (operator) {
        case "+":
          result = firstNumber + secondNumber;
          break;
        case "-":
          result = firstNumber - secondNumber;
          break;
        case "*":
          result = firstNumber * secondNumber;
          break;
        case "/":
          result =
            secondNumber === 0
              ? "Cannot divide by zero"
              : firstNumber / secondNumber;
          break;
        default:
          return;
      }

      setDisplay(String(result));
      setFirstNumber(null);
      setOperator(null);
      setNewNumber(true);
    }
  }

  const buttons = [
    "AC", "/", "*", "-",
    "7", "8", "9", "+",
    "4", "5", "6", "=",
    "1", "2", "3", "0",
    "."
  ];

  return (
    <div className="page">
      <div className="calculator">
        <h1>React Calculator</h1>

        <div className="display">
          {display || "0"}
        </div>

        <div className="buttons">
          {buttons.map((btn) => (
            <button
              key={btn}
              className={
                ["+", "-", "*", "/", "="].includes(btn)
                  ? "operator"
                  : btn === "AC"
                  ? "clear"
                  : ""
              }
              onClick={() => handleClick(btn)}
            >
              {btn}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;