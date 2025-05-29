// @ts-nocheck
import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [totalAmount, setTotalAmount] = useState<string>("");
  const [numberOfPeople, setNumberOfPeople] = useState<string>("");
  const [amountPerPerson, setAmountPerPerson] = useState<number | null>(null);
  const [shareLink, setShareLink] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Check if we're loading a shared bill
    const shareId = window.location.pathname.split('/').pop();
    if (shareId && shareId !== '') {
      loadSharedBill(shareId);
    }
  }, []);

  const loadSharedBill = async (shareId: string) => {
    try {
      const response = await fetch(`http://localhost:5000/api/bills/${shareId}`);
      if (response.ok) {
        const data = await response.json();
        setTotalAmount(data.totalAmount.toString());
        setNumberOfPeople(data.numberOfPeople.toString());
        setAmountPerPerson(data.amountPerPerson);
      }
    } catch (error) {
      console.error('Error loading shared bill:', error);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const total = parseFloat(totalAmount);
    const people = parseInt(numberOfPeople);

    if (total && people && people > 0) {
      const perPerson = total / people;
      setAmountPerPerson(perPerson);
    }
  };

  const handleShare = async () => {
    if (!amountPerPerson) return;

    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/bills/share', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          totalAmount: parseFloat(totalAmount),
          numberOfPeople: parseInt(numberOfPeople),
          amountPerPerson,
        }),
      });

      const data = await response.json();
      const shareUrl = `${window.location.origin}/${data.shareId}`;
      setShareLink(shareUrl);
    } catch (error) {
      console.error('Error sharing bill:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareLink);
  };

  return (
    <div className="container">
      <h1>Bill Splitter</h1>
      <form onSubmit={handleSubmit} className="bill-form">
        <div className="form-group">
          <label htmlFor="totalAmount">Total Bill Amount ($)</label>
          <input
            type="number"
            id="totalAmount"
            value={totalAmount}
            onChange={(e) => setTotalAmount(e.target.value)}
            placeholder="Enter total amount"
            step="0.01"
            min="0"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="numberOfPeople">Number of People</label>
          <input
            type="number"
            id="numberOfPeople"
            value={numberOfPeople}
            onChange={(e) => setNumberOfPeople(e.target.value)}
            placeholder="Enter number of people"
            min="1"
            required
          />
        </div>

        <button type="submit" className="submit-button">
          Split Bill
        </button>
      </form>

      {amountPerPerson !== null && (
        <div className="result">
          <h2>Amount per person:</h2>
          <p className="amount">${amountPerPerson.toFixed(2)}</p>
          <button 
            onClick={handleShare} 
            className="share-button"
            disabled={isLoading}
          >
            {isLoading ? 'Sharing...' : 'Share Bill'}
          </button>
          
          {shareLink && (
            <div className="share-link">
              <input 
                type="text" 
                value={shareLink} 
                readOnly 
                className="share-input"
              />
              <button onClick={copyToClipboard} className="copy-button">
                Copy
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
