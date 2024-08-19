import RootContainer from './components/RootContainer/RootContainer.js';
import Router from './router/Router.js';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <RootContainer>
      <Router />
      <ToastContainer />
    </RootContainer>
  )
}

export default App;