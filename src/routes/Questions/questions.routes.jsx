import { AddCircle, Delete, Edit } from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  Snackbar,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Questions = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedQuestionId, setSelectedQuestionId] = useState(null);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [flashMessage, setFlashMessage] = useState(null);

  const deleteConfirmationHandler = (id) => {
    setDeleteModal(true);

    setSelectedQuestionId(id);
  };

  const deleteHandler = (decision) => {
    setDeleteModal(false);

    if (selectedQuestionId !== null && decision === "yes") {
      let localQuestions = JSON.parse(
        localStorage.getItem("questions") || "[]"
      );

      localQuestions = localQuestions.filter((el) => {
        return el.id !== selectedQuestionId;
      });

      setQuestions(localQuestions);
      setDeleteSuccess(true);
      setSelectedQuestionId(null);

      localStorage.setItem("questions", JSON.stringify(localQuestions));
    }
  };

  const editHandler = (id) => {
    navigate("/add", { state: { id } });
  };

  useEffect(() => {
    const localQuestions = JSON.parse(
      localStorage.getItem("questions") || "[]"
    );

    setQuestions(localQuestions);
  }, []);

  useEffect(() => {
    setFlashMessage(state);
    window.history.replaceState({}, document.title);
  }, []);

  return (
    <Container fixed>
      <Snackbar
        open={deleteSuccess}
        onClose={() => {
          setDeleteSuccess(false);
        }}
        autoHideDuration={3000}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Alert
          onClose={() => {
            setDeleteSuccess(false);
          }}
          severity="success"
          sx={{ width: "100%" }}
        >
          Question deleted
        </Alert>
      </Snackbar>
      <Snackbar
        open={!!flashMessage}
        onClose={() => {
          setFlashMessage(null);
        }}
        autoHideDuration={3000}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Alert
          onClose={() => {
            setFlashMessage(null);
          }}
          severity="success"
          sx={{ width: "100%" }}
        >
          {flashMessage}
        </Alert>
      </Snackbar>

      <Box marginY={3} display="flex" flexDirection="column">
        <Button
          component={Link}
          to="/add"
          sx={{ alignSelf: "end" }}
          variant="contained"
          startIcon={<AddCircle />}
        >
          Add Question
        </Button>
        {questions.length ? (
          <Grid container spacing={2} marginTop={2}>
            {questions.map((el, index) => {
              return (
                <Grid key={index} item xs={4}>
                  <Card
                    variant="outlined"
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}
                  >
                    <CardActionArea
                      sx={{
                        height: "calc(100% - 50px)",
                        display: "flex",
                        alignItems: "flex-start",
                      }}
                    >
                      <CardContent
                        sx={{
                          width: "100%",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-between",
                          height: "100%",
                          boxSizing: "border-box",
                        }}
                      >
                        <Typography
                          gutterBottom
                          variant="subtitle1"
                          fontWeight={400}
                        >
                          {el.question.length > 150
                            ? el.question.substring(0, el.question.length - 3) +
                              "..."
                            : el.question}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          marginTop={3}
                        >
                          Respondent Option:{" "}
                          <strong>{el.resOptions.length}</strong>
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                    <CardActions>
                      <Stack
                        direction="row"
                        spacing={1}
                        width="100%"
                        justifyContent="flex-end"
                        divider={<Divider orientation="vertical" flexItem />}
                      >
                        <IconButton
                          onClick={() => editHandler(el.id)}
                          color="secondary"
                          aria-label="edit question"
                          size="small"
                        >
                          <Edit />
                        </IconButton>
                        <IconButton
                          onClick={() => deleteConfirmationHandler(el.id)}
                          color="error"
                          aria-label="remove question"
                          size="small"
                        >
                          <Delete />
                        </IconButton>
                      </Stack>
                    </CardActions>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        ) : (
          <Typography marginTop={20} variant="h4" textAlign="center">
            No questions data
          </Typography>
        )}
      </Box>

      <Dialog open={deleteModal} onClose={() => deleteHandler("cancel")}>
        <DialogTitle>Delete question?</DialogTitle>
        <DialogContent>
          <DialogContentText>You cannot undo this!</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="info" onClick={() => deleteHandler("cancel")}>
            Cancel
          </Button>
          <Button color="error" onClick={() => deleteHandler("yes")} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Questions;
