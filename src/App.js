
import './App.css';
import GinTracker from './components/gintracker';
import { UserProvider } from './context/userContext';

function App() {
  return (
    <UserProvider>
      <GinTracker />
    </UserProvider>
  );
}

export default App;
