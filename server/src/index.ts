import express from 'express';
import cors from 'cors';
import { v4 as uuidv4 } from 'uuid';

const app = express();
const PORT = 5000;

// Mock repository
const sharedBills:any[] = [];

// Middleware
app.use(cors());
app.use(express.json());
// Delay middleware to simulate network latency
app.use((_, __, next) => {
  setTimeout(next, 2000);
});

// Create a shared bill
app.post('/api/bills/share', (req, res) => {
  const { totalAmount, numberOfPeople, amountPerPerson } = req.body;
  const shareId = uuidv4();
  
  sharedBills.push({
    shareId,
    totalAmount,
    numberOfPeople,
    amountPerPerson
  });

  res.json({ shareId });
});

// Get a shared bill
app.get('/api/bills/:shareId', (req, res) => {
  const { shareId } = req.params;
  
  let bill = null;
  for (let i = 0; i < sharedBills.length; i++) {
    if (sharedBills[i].shareId === shareId) {
      bill = sharedBills[i];
      break;
    }
  }
  
  res.json(bill);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 