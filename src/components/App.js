import { Login } from ".";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route 
            path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
