import { Route, Routes } from 'react-router-dom'

import Demo from '@pages/DemoPage.js';
import Test from '@pages/TestPage.js';

export default function Router() {
  return (
    <Routes>
      <Route path='/' element={<Demo />} />
      <Route path='/test' element={<Test />} />
    </Routes>
  );
}
