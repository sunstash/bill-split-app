// @ts-nocheck
import react, { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import './App.css';
import axios from 'axios';

interface BackendResponse {
  shareId: string;
  totalAmount: number;
  numberOfPeople: number;
  amountPerPerson: number;
}

function App() {
  const [shareId, setShareId] = useState<string>(
    window.location.pathname.replace('/', '') || ''
  );
  const [isSplitBillClicked, setIsSplitBillClicked] = useState<boolean>(false);
  const [isShareBillClicked, setIsShareBillClicked] = useState<boolean>(false);
  const [isInitialDataLoaded, setIsInitialDataLoaded] =
    useState<boolean>(false);

  useEffect(() => {
    const fetchBill = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/bills/${shareId}`
        );
        res;
        setBillFromBE(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    if (shareId) {
      fetchBill();
    } else setIsInitialDataLoaded(true);
  }, [shareId]);

  useEffect(() => {
    if (shareId.length > 0) {
      setIsShareBillClicked(true);
      setIsSplitBillClicked(true);
    }
  }, [shareId]);
  const [billFromBE, setBillFromBE] = useState<BackendResponse>({
    shareId: '',
    totalAmount: 0,
    numberOfPeople: 0,
    amountPerPerson: 0,
  });
  const [totalAmount, setTotalAmount] = useState<string>('');

  const [numberOfPeople, setNumberOfPeople] = useState<string>('');
  const [amountPerPerson, setAmountPerPerson] = useState<number | null>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [shareUrl, setShareUrl] = useState<string>('');
  useEffect(() => {
    if (billFromBE.shareId) {
      setTotalAmount(billFromBE.totalAmount);
      setNumberOfPeople(billFromBE.numberOfPeople);
      setAmountPerPerson(billFromBE.amountPerPerson);
      setShareUrl(`http://localhost:5173/${shareId}`);
      setIsInitialDataLoaded(true);
    }
  }, [billFromBE]);

  const numericRegex = /^\d+$/;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const total = parseFloat(totalAmount);
    const people = parseInt(numberOfPeople);
    if (
      !numericRegex.test(total.toString()) ||
      !numericRegex.test(people.toString())
    ) {
      toast.error('Total or People must only be non-negative numbers!');
      setTotalAmount('');
      setNumberOfPeople('');
      return;
    }
    try {
      const perPerson = total / people;
      setLoading(true);
      const res = await axios.post('http://localhost:5000/api/bills/share', {
        totalAmount: total,
        numberOfPeople: people,
        amountPerPerson: perPerson,
      });
      res.data.shareId;
      setShareId(res?.data?.shareId);
      toast.success('You have successfully splitted the bill!');
      setIsSplitBillClicked(true);
      setAmountPerPerson(perPerson);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleShare = async () => {
    setIsShareBillClicked(true);
    setShareUrl(`${window.location.origin}/${shareId}`);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl);
  };

  return (
    <div className='container'>
      <h1>Bill Splitter</h1>
      <Toaster />
      {!isInitialDataLoaded ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <form
            onSubmit={handleSubmit}
            className='bill-form'>
            <div className='form-group'>
              <label htmlFor='totalAmount'>Total Bill Amount ($)</label>
              <input
                id='totalAmount'
                value={totalAmount}
                onChange={(e) => setTotalAmount(e.target.value)}
                placeholder='Enter total amount'
              />
            </div>

            <div className='form-group'>
              <label htmlFor='numberOfPeople'>Number of People</label>
              <input
                id='numberOfPeople'
                value={numberOfPeople}
                onChange={(e) => setNumberOfPeople(e.target.value)}
                placeholder='Enter number of people'
              />
            </div>

            <button
              type='submit'
              disabled={loading}
              className='submit-button'>
              {loading ? 'Splitting Bill...' : 'Split Bill'}
            </button>
          </form>
          {isSplitBillClicked && (
            <div className='result'>
              <h2>Amount per person:</h2>
              <p className='amount'>${amountPerPerson.toFixed(2)}</p>
              <button
                onClick={handleShare}
                className='share-button'>
                Share Bill
              </button>
            </div>
          )}

          {isShareBillClicked && (
            <div className='share-link'>
              <input
                type='text'
                value={shareUrl}
                readOnly
                className='share-input'
              />
              <button
                onClick={copyToClipboard}
                className='copy-button'>
                Copy
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default App;
