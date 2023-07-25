import './App.css';
import Main from "./Main/Main"
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Main loggedIn={true} />} />
      </Routes>
    </div >
  );
}

export default App;
