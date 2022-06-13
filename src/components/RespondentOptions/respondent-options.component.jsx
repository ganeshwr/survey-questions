import { Close } from "@mui/icons-material";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  styled,
  TextField,
  Typography,
} from "@mui/material";

const CloseButton = styled(Close)({
  cursor: "pointer",
  padding: 5,
});

const RespondentOptions = ({
  resOptions,
  removeResOptions,
  updateResOptions,
  formErrors,
  isDetail = false,
}) => {
  return (
    <>
      {resOptions.map((el, idx) => {
        return (
          <Box key={idx} marginTop={idx !== 0 ? 3 : 0}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography>Respondent Option #{idx + 1}</Typography>
              {!isDetail && (
                <CloseButton onClick={() => removeResOptions(idx)} />
              )}
            </Box>

            <FormControl
              fullWidth
              margin="normal"
              sx={{ marginTop: 1, marginBottom: 1.5 }}
              required
              disabled={isDetail}
            >
              <InputLabel>Rule</InputLabel>
              <Select
                label="Rule"
                value={!isDetail ? resOptions[idx].rule : el.rule}
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
              disabled={isDetail}
              error={!isDetail ? !!formErrors[idx] : false}
              helperText={!isDetail ? !!formErrors[idx] && formErrors[idx] : ""}
              value={!isDetail ? resOptions[idx].answer : el.answer}
              onChange={(e) => updateResOptions(e, idx, "answer")}
            />
          </Box>
        );
      })}
    </>
  );
};

export default RespondentOptions;
