import { Box, Typography } from "@mui/material";

const Home = () => {
  return (
    <Box
      width="100%"
      height="calc(100vh - 68.5px)"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      sx={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1.7)), url("./home-bg.jpg")`,
        backgroundSize: "cover",
      }}
    >
      <Typography color="white" variant="h1" fontWeight="700">
        PopData
      </Typography>
      <Typography color="white" variant="h6" marginBottom={15} marginTop={2}>
        Survey Question
      </Typography>
    </Box>
  );
};

export default Home;
