import { Close, RestartAlt } from "@mui/icons-material";
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardActions,
  CardContent,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  styled,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { useState } from "react";

const resOptionsItemDefault = {
  rule: "may",
  answer: "",
};

const CloseButton = styled(Close)({
  cursor: "pointer",
  padding: 5,
});

function App() {
  const [question, setQuestion] = useState("");
  const [resOptions, setResOptions] = useState([resOptionsItemDefault]);

  const addResOptions = () => {
    setResOptions([...resOptions, resOptionsItemDefault]);
  };

  const removeResOptions = (index) => {
    const updated = resOptions.filter((_, innerIndex) => {
      return index !== innerIndex;
    });

    setResOptions(updated);
  };

  const updateResOptions = (e, index, field) => {
    const { value } = e.target;
    const updated = resOptions.map((el, innerIndex) => {
      if (innerIndex === index) return { ...el, [field]: value };

      return el;
    });

    setResOptions(updated);
  };

  const questionChangeHandler = (e) => {
    const { value } = e.target;
    setQuestion(value);
  };

  const resetHandler = () => {
    setQuestion("");
    setResOptions([resOptionsItemDefault]);
  };

  const submitHandler = () => {
    const currQuestions = JSON.parse(localStorage.getItem("questions") || "[]");

    console.log({ question, resOptions });
  };

  return (
    <Container fixed>
      <Paper
        variant="outlined"
        sx={{ width: "calc(100% - 300px)", mx: "auto", my: 3 }}
      >
        <CardContent>
          <TextField
            required
            label="Question"
            variant="outlined"
            multiline
            minRows={2}
            maxRows={6}
            fullWidth
            value={question}
            onChange={questionChangeHandler}
          />
          <Paper variant="outlined" sx={{ marginTop: 3, padding: 1 }}>
            {resOptions.map((el, idx) => {
              return (
                <Box key={idx} marginTop={idx !== 0 ? 3 : 0}>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Typography>Respondent Option #{idx + 1}</Typography>
                    <CloseButton onClick={() => removeResOptions(idx)} />
                  </Box>

                  <FormControl
                    fullWidth
                    margin="normal"
                    sx={{ marginTop: 1, marginBottom: 1.5 }}
                    required
                  >
                    <InputLabel>Rule</InputLabel>
                    <Select
                      label="Rule"
                      value={resOptions[idx].rule}
                      onChange={(e) => updateResOptions(e, idx, "rule")}
                    >
                      <MenuItem value="may">May Select</MenuItem>
                      <MenuItem value="must">Must Select</MenuItem>
                    </Select>
                  </FormControl>
                  <TextField
                    required
                    label="Answer"
                    variant="outlined"
                    multiline
                    minRows={2}
                    maxRows={3}
                    fullWidth
                    value={resOptions[idx].answer}
                    onChange={(e) => updateResOptions(e, idx, "answer")}
                  />
                </Box>
              );
            })}
            <Button
              onClick={addResOptions}
              sx={{ marginTop: resOptions.length > 0 ? 3 : 0 }}
              size="small"
              color="info"
            >
              {resOptions.length > 0 ? "Add more" : "Add respondent option"}
            </Button>
          </Paper>
        </CardContent>
        <CardActions>
          <ButtonGroup disableElevation variant="outlined" fullWidth>
            <Button variant="contained" onClick={submitHandler}>
              Submit Question
            </Button>
            <Tooltip title="Reset Form" placement="right">
              <Button sx={{ width: "auto" }} onClick={resetHandler}>
                <RestartAlt />
              </Button>
            </Tooltip>
          </ButtonGroup>
        </CardActions>
      </Paper>
    </Container>
  );
}

export default App;
