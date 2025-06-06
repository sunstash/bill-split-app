import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

interface DataFromDB {
  amountPerPerson: number;
  numberOfPeople: number;
  totalAmount: number;
  shareId: string;
}

const SharedBill = () => {
  const fullUrl = window.location.href;
  const { shareId } = useParams();
  const [data, setData] = useState<DataFromDB | null>(null);
  const [loading, setLoading] = useState(true);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(fullUrl);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/bills/${shareId}`
        );
        setData(res.data);
      } catch (error) {
        console.error('Failed to fetch shared bill:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [shareId]);

  if (loading) return <p>Loading shared bill...</p>;
  if (!data) return <p>Shared bill not found.</p>;

  return (
    <div className='result'>
      <h2>Amount per person:</h2>
      <p className='amount'>${data.amountPerPerson.toFixed(2)}</p>
      <button className='share-button'>Share Bill</button>

      <div className='share-link'>
        <input
          type='text'
          value={fullUrl}
          readOnly
          className='share-input'
        />
        <button
          onClick={copyToClipboard}
          className='copy-button'>
          Copy
        </button>
      </div>
    </div>
  );
};

export default SharedBill;
