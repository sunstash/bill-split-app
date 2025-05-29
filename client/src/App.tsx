// @ts-nocheck
import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [totalAmount, setTotalAmount] = useState<string>("");
  const [numberOfPeople, setNumberOfPeople] = useState<string>("");
  const [amountPerPerson, setAmountPerPerson] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const total = parseFloat(totalAmount);
    const people = parseInt(numberOfPeople);

    const perPerson = total / people;
    setAmountPerPerson(perPerson);
  };

  const handleShare = async () => {
    // TODO: Implement share functionality
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText("https://www.google.com");
  };

  return (
    <div className="container">
      <h1>Bill Splitter</h1>
      <form onSubmit={handleSubmit} className="bill-form">
        <div className="form-group">
          <label htmlFor="totalAmount">Total Bill Amount ($)</label>
          <input
            id="totalAmount"
            value={totalAmount}
            onChange={(e) => setTotalAmount(e.target.value)}
            placeholder="Enter total amount"
          />
        </div>

        <div className="form-group">
          <label htmlFor="numberOfPeople">Number of People</label>
          <input
            id="numberOfPeople"
            value={numberOfPeople}
            onChange={(e) => setNumberOfPeople(e.target.value)}
            placeholder="Enter number of people"
          />
        </div>

        <button type="submit" className="submit-button">
          Split Bill
        </button>
      </form>
      <div className="result">
        <h2>Amount per person:</h2>
        <p className="amount">${amountPerPerson.toFixed(2)}</p>
        <button
          onClick={handleShare}
          className="share-button"
        >
          Share Bill
        </button>
  
          <div className="share-link">
            <input
              type="text"
              value={"https://www.google.com"}
              readOnly
              className="share-input"
            />
            <button onClick={copyToClipboard} className="copy-button">
              Copy
            </button>
          </div>
      </div>

    </div>
  );
}

export default App;
