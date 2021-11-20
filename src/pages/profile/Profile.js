import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Greeter from "./../../components/greeter/Greeter";
import ProfileForm from "./../../components/profile_form/ProfileForm";
import Schedular from "./../../components/schedular/Schedular";
import { UserContext } from "./../../context/userContext";
import { httpAgent } from "./../../util/util";

export default function MenuAppBar() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleLogout = () => {
    const url = `${process.env.REACT_APP_DOMAIN_AUTH}/api/v1/logout`;
    const method = "GET";

    httpAgent(url, method, {}).then(response => {
      if (response.ok) {
        localStorage.removeItem("logged_in_user");
        setAnchorEl(null);
        window.location.replace("/");
      } else {
        console.error("hello");
      }
    });
  };

  const userContext = React.useContext(UserContext);
  const { imageUrl, firstName, lastName } = userContext.loggedInUser.user;

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="sticky">
        <Toolbar sx={{ justifyContent: "flex-end" }}>
          <div>
            <Avatar onClick={handleMenu} alt={`${firstName} ${lastName}`} src={imageUrl} sx={{ cursor: "pointer" }} />
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
              onClose={handleLogout}
            >
              <Button onClick={handleLogout}>Logout</Button>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md">
        <Greeter firstName={firstName} />
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
            <TabPanel value="1">
              <Typography variant="h5" sx={{ textAlign: "center" }}>
                Feature coming soon
              </Typography>
            </TabPanel>
            <TabPanel value="2">
              <ProfileForm />
            </TabPanel>
            <TabPanel value="3">
              <Schedular />
            </TabPanel>
            <TabPanel value="4"></TabPanel>
          </TabContext>
        </Box>
      </Container>
    </Box>
  );
}
