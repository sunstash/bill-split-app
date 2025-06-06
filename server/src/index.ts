import express from 'express';
import cors from 'cors';
import { v4 as uuidv4 } from 'uuid';

const app = express();
const PORT = 5000;

// Mock repository
const sharedBills: any[] = [];

// Middleware
app.use(cors());
app.use(express.json());
// Delay middleware to simulate network latency
app.use((_, __, next) => {
  setTimeout(next, 2000);
});

// Create a shared bill
app.post('/api/bills/share', (req, res) => {
  try {
    const { totalAmount, numberOfPeople, amountPerPerson } = req.body;

    if (!totalAmount || !numberOfPeople || !amountPerPerson) {
      return res.status(400).json({
        message:
          'totalAmount, numberOfPeople, amountPerPerson cannot be empty!',
      });
    }
    const shareId = uuidv4();

    sharedBills.push({
      shareId,
      totalAmount,
      numberOfPeople,
      amountPerPerson,
    });

    return res.status(200).json({ shareId });
  } catch (error) {
    if (error instanceof Error) {
      console.error('Caught error:', error.message);
    } else {
      console.error('Unknown error occurred:', error);
    }

    res.status(500).json({
      message: 'Internal server error',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
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
  `Server running on port ${PORT}`;
});
