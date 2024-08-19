import { Route, Routes } from 'react-router-dom'

import Test from '@pages/TestPage.js';

export default function Router() {
  return (
    <Routes>
      <Route path='/' element={<Test />} />
    </Routes>
  );
}