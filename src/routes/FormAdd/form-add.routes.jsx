import { Close, RestartAlt } from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  ButtonGroup,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Snackbar,
  styled,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const resOptionsItemDefault = {
  rule: "may",
  answer: "",
};

const CloseButton = styled(Close)({
  cursor: "pointer",
  padding: 5,
});

function FormAdd() {
  const [question, setQuestion] = useState("");
  const [resOptions, setResOptions] = useState([resOptionsItemDefault]);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [formErrors, setFormErrors] = useState({});

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
    const tempAnswers = { ...formErrors };
    delete tempAnswers[index];

    setFormErrors({ ...tempAnswers });

    const { value } = e.target;
    const updated = resOptions.map((el, innerIndex) => {
      if (innerIndex === index) return { ...el, [field]: value };

      return el;
    });

    setResOptions(updated);
  };

  const questionChangeHandler = (e) => {
    const { question, ...rest } = formErrors;
    setFormErrors(rest);

    const { value } = e.target;
    setQuestion(value);
  };

  const resetHandler = () => {
    setQuestion("");
    setResOptions([resOptionsItemDefault]);
  };

  const submitHandler = () => {
    if (validateForm()) return;

    const currQuestions = JSON.parse(localStorage.getItem("questions") || "[]");

    const body = {
      id: uuidv4(),
      question,
      resOptions,
    };

    currQuestions.push(body);
    localStorage.setItem("questions", JSON.stringify(currQuestions));

    setSubmitSuccess(true);
    resetHandler();
  };

  const validateForm = () => {
    setFormErrors({});

    let haveError = false;
    let tempFormErrors = { ...formErrors };

    if (!question.trim().length) {
      haveError = true;
      tempFormErrors = { ...tempFormErrors, question: "Question is required!" };
    }

    if (resOptions.length) {
      const resOptionsErrors = resOptions.reduce((prev, curr, index) => {
        if (curr.answer.trim().length === 0) {
          prev[index] = "Answer is required!";
          haveError = true;
        }

        return prev;
      }, {});

      tempFormErrors = { ...tempFormErrors, ...resOptionsErrors };
    }

    if (haveError) {
      const err = Object.keys(tempFormErrors).sort((a, b) =>
        a === "question" ? -1 : b === "question" ? 1 : 0
      );
      if (err.length) {
        const input = document.querySelector(`textarea[name="${err[0]}"]`);

        input.scrollIntoView({
          behavior: "smooth",
          block: "center",
          inline: "start",
        });
      }

      setFormErrors(tempFormErrors);
    }

    return haveError;
  };

  return (
    <Container fixed>
      <Snackbar
        open={submitSuccess}
        onClose={() => {
          setSubmitSuccess(false);
        }}
        autoHideDuration={3000}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Alert
          onClose={() => {
            setSubmitSuccess(false);
          }}
          severity="success"
          sx={{ width: "100%" }}
        >
          Question added successfully!
        </Alert>
      </Snackbar>

      <Paper
        elevation={0}
        sx={{ width: "calc(100% - 300px)", mx: "auto", my: 3 }}
      >
        <Typography
          variant="h4"
          fontWeight={300}
          padding={0}
          marginBottom={3}
          textAlign="center"
        >
          Add new question
        </Typography>
        <Paper
          component="form"
          variant="outlined"
          noValidate
          autoComplete="off"
        >
          <Box padding={2}>
            <TextField
              name="question"
              required
              error={!!formErrors.question}
              helperText={!!formErrors.question && formErrors.question}
              label="Question"
              variant="outlined"
              multiline
              minRows={2}
              maxRows={6}
              fullWidth
              value={question}
              onChange={questionChangeHandler}
            />
            <Paper variant="outlined" sx={{ marginTop: 3, px: 2, py: 1 }}>
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
                      name={`${idx}`}
                      required
                      label="Answer"
                      variant="outlined"
                      multiline
                      minRows={2}
                      maxRows={3}
                      fullWidth
                      error={!!formErrors[idx]}
                      helperText={!!formErrors[idx] && formErrors[idx]}
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
          </Box>
          <Box padding={2}>
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
          </Box>
        </Paper>
      </Paper>
    </Container>
  );
}

export default FormAdd;
