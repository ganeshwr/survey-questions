import { DataThresholding, Menu as MenuIcon } from "@mui/icons-material";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Container,
  Button,
  MenuItem,
  IconButton,
  Menu,
} from "@mui/material";
import { useState } from "react";
import { Outlet, Link } from "react-router-dom";

const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Box
              component={Link}
              to="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                textDecoration: "none",
                alignItems: "center",
                color: "inherit",
              }}
            >
              <DataThresholding
                sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
              />
              <Typography
                variant="h6"
                noWrap
                component="span"
                sx={{
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                }}
              >
                PopData
              </Typography>
            </Box>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography
                    textAlign="center"
                    component={Link}
                    to="/questions"
                    sx={{ textDecoration: "none", color: "inherit" }}
                  >
                    Questions
                  </Typography>
                </MenuItem>
              </Menu>
            </Box>
            <DataThresholding
              sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
            />
            <Typography
              component={Link}
              to="/"
              variant="h5"
              noWrap
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              PopData
            </Typography>
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                width: "100%",
                justifyContent: "end",
              }}
            >
              <Button
                component={Link}
                to="/questions"
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                Questions
              </Button>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Outlet />
    </>
  );
};
export default Navbar;
