import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material";

import Navbar from "./components/Navbar/navbar.component";
import Home from "./routes/Home/home.routes";
import Questions from "./routes/Questions/questions.routes";
import FormAdd from "./routes/FormAdd/form-add.routes";

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
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
