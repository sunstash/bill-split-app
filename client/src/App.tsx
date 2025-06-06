// @ts-nocheck
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import SharedBill from './SharedBill';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/'
          element={<Home />}
        />
        <Route
          path='/shared/:shareId'
          element={<SharedBill />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
