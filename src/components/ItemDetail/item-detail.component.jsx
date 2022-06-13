import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Typography,
} from "@mui/material";

const ItemDetail = ({ openDetail, closeDetailHandler, data }) => {
  return (
    <Dialog fullWidth open={openDetail} onClose={closeDetailHandler}>
      <DialogContent>
        <Typography variant="h5" component="span">
          {data && data.question}
        </Typography>
        <Typography>Respondent Options: </Typography>
        {data &&
          data.resOptions.map((el, index) => {
            return (
              <Box key={index} marginBottom={2}>
                <Typography>
                  {el.rule === "must" ? "Must Select" : "May Select"}
                </Typography>
                <Typography>{el.answer}</Typography>
              </Box>
            );
          })}
      </DialogContent>
      <DialogActions>
        <Button color="info" onClick={closeDetailHandler}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ItemDetail;
