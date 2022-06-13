import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import { useEffect, useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material";

import Navbar from "./components/Navbar/navbar.component";
import Home from "./routes/Home/home.routes";
import Questions from "./routes/Questions/questions.routes";
import FormAdd from "./routes/FormAdd/form-add.routes";

import dummyData from "./dummy.json";
import { setLocalQuestions } from "./utils/questions.utils";

const Seeder = () => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.clear();
    setLocalQuestions(dummyData);

    navigate("/questions");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div>This is only for data seeding</div>;
};

function App() {
  const [mode, setMode] = useState("light");
  const darkTheme = createTheme({
    palette: {
      mode: mode,
      primary: {
        main: "#00417d",
      },
      secondary: {
        main: "#ee7824",
      },
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <Router>
        <Routes>
          <Route path="/" element={<Navbar mode={mode} setMode={setMode} />}>
            <Route index element={<Home />} />
            <Route path="/questions" element={<Questions />} />
            <Route path="/add" element={<FormAdd />} />
            <Route path="/seeder" element={<Seeder />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
