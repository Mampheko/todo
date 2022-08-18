import './App.css';
import Login from './components/Login';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
/*import { AuthContextProvider } from './context/AuthContext';*/
import Homepage from './components/Homepage';

function App() {
  return (
  <div className="app">
    {/*<AuthContextProvider>*/}
     <Router>
        <Routes>
          <Route path="/" element={<Login />}/>
          <Route path="/homepage" element={<Homepage />}/>
        </Routes>
    </Router>
    {/*</AuthContextProvider>*/}
  </div>
  ); 
  }

export default App;
