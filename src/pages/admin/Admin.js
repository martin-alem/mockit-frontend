import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Typography from "@mui/material/Typography";
import TextEditor from "../../components/text_editor/TextEditor";

function Admin() {
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Container maxWidth="lg">
      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Create Question" value="1" />
              <Tab label="Questions" value="2" />
              <Tab label="Server Logs" value="3" />
              <Tab label="Server Status" value="4" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <TextEditor />
          </TabPanel>
          <TabPanel value="2">
            <Typography variant="h5" sx={{ textAlign: "center" }}>
              Feature coming soon
            </Typography>
          </TabPanel>
          <TabPanel value="3">
            <Typography variant="h5" sx={{ textAlign: "center" }}>
              Feature coming soon
            </Typography>
          </TabPanel>
          <TabPanel value="4">
            <Typography variant="h5" sx={{ textAlign: "center" }}>
              Feature coming soon
            </Typography>
          </TabPanel>
        </TabContext>
      </Box>
    </Container>
  );
}

export default Admin;
