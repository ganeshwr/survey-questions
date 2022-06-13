import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar/navbar.component";
import Home from "./routes/Home/home.routes";
import Questions from "./routes/Questions/questions.routes";
import FormAdd from "./routes/FormAdd/form-add.routes";

import RemovableItems from "./demo";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index element={<Home />} />
          <Route path="/questions" element={<Questions />} />
          <Route path="/add" element={<FormAdd />} />
          <Route path="/demo" element={<RemovableItems />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
