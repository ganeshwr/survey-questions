import { Close, RestartAlt } from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  ButtonGroup,
  Container,
  Grid,
  Paper,
  Snackbar,
  styled,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import RespondentOptions from "../../components/RespondentOptions/respondent-options.component";

import {
  getLocalQuestions,
  setLocalQuestions,
} from "../../utils/questions.utils";

const resOptionsItemDefault = {
  rule: "may",
  answer: "",
};

const CloseButton = styled(Close)({
  cursor: "pointer",
  padding: 5,
});

function FormAdd() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { id } = state || {};

  const [question, setQuestion] = useState("");
  const [resOptions, setResOptions] = useState([]);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    const data = getLocalQuestions();

    if (data.length && id) {
      const questionData = data.find((el) => el.id === id);

      setQuestion(questionData.question);
      setResOptions(questionData.resOptions);
    }
  }, [id]);

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
    setResOptions([]);
  };

  const submitHandler = () => {
    if (validateForm()) return;

    const currQuestions = getLocalQuestions();

    if (id) {
      // Update
      const findId = currQuestions.findIndex((el) => el.id === id);
      currQuestions[findId] = {
        ...currQuestions[findId],
        question,
        resOptions,
      };
    } else {
      // Create
      const body = {
        id: uuidv4(),
        question,
        resOptions,
      };

      currQuestions.push(body);
    }
    setLocalQuestions(currQuestions);

    setSubmitSuccess(true);
    resetHandler();

    if (id) {
      navigate("/questions", { state: "Question updated successfully!" });
    }
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

      <Grid container justifyContent="center">
        <Grid item xs={12} md={7}>
          <Paper elevation={0} sx={{ width: "100%", mx: "auto", my: 3 }}>
            <Typography
              variant="h4"
              fontWeight={300}
              padding={0}
              marginBottom={3}
              textAlign="center"
            >
              {id ? "Edit" : "Add"} new question
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
                  <RespondentOptions
                    resOptions={resOptions}
                    removeResOptions={removeResOptions}
                    updateResOptions={updateResOptions}
                    formErrors={formErrors}
                  />
                  <Button
                    onClick={addResOptions}
                    sx={{ marginTop: resOptions.length > 0 ? 3 : 0 }}
                    size="small"
                    color="info"
                  >
                    {resOptions.length > 0
                      ? "Add more"
                      : "Add respondent option"}
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
        </Grid>
      </Grid>
    </Container>
  );
}

export default FormAdd;
