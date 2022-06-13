import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Typography,
} from "@mui/material";
import RespondentOptions from "../RespondentOptions/respondent-options.component";

const ItemDetail = ({ openDetail, closeDetailHandler, data }) => {
  return (
    <Dialog fullWidth open={openDetail} onClose={closeDetailHandler}>
      <DialogContent>
        <Typography variant="h5" component="p" marginBottom={2}>
          {data && data.question}
        </Typography>
        {data && (
          <RespondentOptions resOptions={data.resOptions} isDetail={true} />
        )}
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
