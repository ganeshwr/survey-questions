import { AddCircle, Delete, Edit } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Container,
  Divider,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Questions = () => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const localQuestions = JSON.parse(
      localStorage.getItem("questions") || "[]"
    );

    setQuestions(localQuestions);
  }, []);

  return (
    <Container fixed>
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
        <Grid container spacing={2} marginTop={2}>
          {questions.map((el, index) => {
            return (
              <Grid key={index} item xs={3}>
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
                    sx={{ height: "100%", paddingBottom: "16px" }}
                  >
                    <CardContent sx={{ height: "100%" }}>
                      <Typography
                        gutterBottom
                        variant="subtitle1"
                        fontWeight={400}
                      >
                        {el.question}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        marginTop={2}
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
                        color="warning"
                        aria-label="edit question"
                        size="small"
                      >
                        <Edit />
                      </IconButton>
                      <IconButton
                        color="error"
                        aria-label="edit question"
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
      </Box>
    </Container>
  );
};

export default Questions;
