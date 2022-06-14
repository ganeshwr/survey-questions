import { Box, Typography } from "@mui/material";

const Home = () => {
  return (
    <Box
      width="100%"
      // height="calc(100vh - 68.5px)"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      sx={{
        height: {
          xs: "calc(100vh - 56px)",
          sm: "calc(100vh - 64px)",
          md: "calc(100vh - 68.5px)",
        },
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1.7)), url("./home-bg.jpg")`,
        backgroundSize: "cover",
      }}
    >
      <Typography
        color="white"
        variant="h1"
        fontWeight="700"
        sx={{ fontSize: { xs: 50, md: "6rem" } }}
      >
        PopData
      </Typography>
      <Typography
        color="white"
        variant="h6"
        marginBottom={13}
        marginTop={2}
        sx={{ fontSize: { xs: 15, md: "1.25rem" } }}
      >
        Survey Question
      </Typography>
    </Box>
  );
};

export default Home;
