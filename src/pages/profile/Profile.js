import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Avatar from "@mui/material/Avatar";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Container from "@mui/material/Container";
import Greeter from "./../../components/greeter/Greeter";
import ProfileForm from "./../../components/profile_form/ProfileForm";

export default function MenuAppBar() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="sticky">
        <Toolbar sx={{ justifyContent: "flex-end" }}>
          <div>
            <Avatar onClick={handleMenu} alt="Martin Alemajoh" src="/static/images/avatar/1.jpg" sx={{ cursor: "pointer" }} />
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>Settings</MenuItem>
              <MenuItem onClick={handleClose}>Logout</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md">
        <Greeter />
        <Box sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList onChange={handleChange} aria-label="lab API tabs example">
                <Tab label="Records" value="1" />
                <Tab label="Profile" value="2" />
                <Tab label="Schedular" value="3" />
                <Tab label="Interviews" value="4" />
              </TabList>
            </Box>
            <TabPanel value="1">Item One</TabPanel>
            <TabPanel value="2"><ProfileForm/></TabPanel>
            <TabPanel value="3">Item Three</TabPanel>
            <TabPanel value="4">Item Four</TabPanel>
          </TabContext>
        </Box>
      </Container>
    </Box>
  );
}
