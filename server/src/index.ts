import express from 'express';
import cors from 'cors';
import { v4 as uuidv4 } from 'uuid';

const app = express();
const PORT = 5000;

// Mock repository
const sharedBills = new Map<string, {
  totalAmount: number;
  numberOfPeople: number;
  amountPerPerson: number;
}>();

// Middleware
app.use(cors());
app.use(express.json());

// Create a shared bill
app.post('/api/bills/share', (req, res) => {
  const { totalAmount, numberOfPeople, amountPerPerson } = req.body;
  const shareId = uuidv4();
  
  sharedBills.set(shareId, {
    totalAmount,
    numberOfPeople,
    amountPerPerson
  });

  res.json({ shareId });
});

// Get a shared bill
app.get('/api/bills/:shareId', (req, res) => {
  const { shareId } = req.params;
  const bill = sharedBills.get(shareId);
  
  if (!bill) {
    return res.status(404).json({ error: 'Bill not found' });
  }
  
  res.json(bill);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 