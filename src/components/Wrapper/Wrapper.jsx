import React from "react";

import { AddCircle } from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Snackbar,
} from "@mui/material";
import { Link } from "react-router-dom";

export function Wrapper({
  children,
  deleteHandler,
  deleteSuccess,
  setDeleteSuccess,
  flashMessage,
  setFlashMessage,
  deleteModal,
}) {
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
        {children}
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
}
