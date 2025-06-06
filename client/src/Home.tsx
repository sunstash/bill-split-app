import { useState } from 'react';
import './App.css';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
const Home = () => {
  const [totalAmount, setTotalAmount] = useState<string>('');
  const [numberOfPeople, setNumberOfPeople] = useState<string>('');
  const [amountPerPerson, setAmountPerPerson] = useState<number>(0);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [shareId, setShareId] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [isShareBillClicked, setIsShareBillClicked] = useState<boolean>(false);
  const [shareUrl, setShareUrl] = useState<string>('');
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
      console.log(res.data.shareId);
      setShareId(res?.data?.shareId);
      toast.success('You have successfully splitted the bill!');
      setAmountPerPerson(perPerson);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleShare = async () => {
    setIsShareBillClicked(true);
    setShareUrl(`${window.location.origin}/shared/${shareId}`);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl);
  };

  return (
    <div className='container'>
      <h1>Bill Splitter</h1>
      <Toaster />

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
      <div className='result'>
        <h2>Amount per person:</h2>
        <p className='amount'>${amountPerPerson.toFixed(2)}</p>
        <button
          onClick={handleShare}
          className='share-button'>
          Share Bill
        </button>

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
      </div>
    </div>
  );
};
export default Home;
