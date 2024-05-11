"use client";
import React from "react";
import RequestedFreight from "@/app/ui/freight/requested-freight/requested-freight";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Box } from "@mui/material";
import AddPackage from "@/app/ui/freight/add-package/add-package";
import FreigthDetails from "./freight-details/page";

function Page() {
  const [showFreightDetails, setShowFreightDetails] = React.useState(false);
  const [freightNumber, setFreightNumber] = React.useState();
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  function displayFreightDetails(id) {
    setFreightNumber(id);
    setShowFreightDetails(true);
  }
  function showPackages() {
    setShowFreightDetails(false);
  }
  return (
    <div>
      {showFreightDetails ? (
        <div>
          <FreigthDetails showPackages={showPackages} orderId={freightNumber} />
        </div>
      ) : (
        <>
          <div>
            <AddPackage />
          </div>
          <div>
            <RequestedFreight showFreightDetails={displayFreightDetails} />
          </div>
        </>
      )}
    </div>
  );
}

export default Page;

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ pt: 3 }}>
          <Box>{children}</Box>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

{
  /* <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab
                disableRipple
                label="Pending"
                {...a11yProps(0)}
                className="!text-slate-200 !text-xs"
                sx={{
                  textTransform: "none",
                  fontFamily: "Inter",
                  fontWeight: "700",
                }}
              />
              <Tab
                className="!text-slate-200 !text-xs"
                sx={{
                  textTransform: "none",
                  fontFamily: "Inter",
                  fontWeight: "700",
                }}
                disableRipple
                label="Active"
                {...a11yProps(1)}
              />
              <Tab
                className="!text-slate-200 !text-xs"
                sx={{
                  textTransform: "none",
                  fontFamily: "Inter",
                  fontWeight: "700",
                }}
                disableRipple
                label="Delivered"
                {...a11yProps(3)}
              />
              <Tab
                className="!text-slate-200 !text-xs"
                sx={{
                  textTransform: "none",
                  fontFamily: "Inter",
                  fontWeight: "700",
                }}
                disableRipple
                label="Rejected"
                {...a11yProps(2)}
              />
            </Tabs>
          </Box>
          <CustomTabPanel
            value={value}
            sx={{
              fontFamily: "Inter",
              fontWeight: "700",
            }}
            index={0}
          >
            <RequestedFreight />
          </CustomTabPanel>
          <CustomTabPanel
            value={value}
            sx={{
              fontFamily: "Inter",
              fontWeight: "700",
            }}
            index={1}
          >
            
          </CustomTabPanel>
          <CustomTabPanel
            value={value}
            sx={{
              fontFamily: "Inter",
              fontWeight: "700",
            }}
            index={2}
          >
            
          </CustomTabPanel>
          <CustomTabPanel
            value={value}
            sx={{
              fontFamily: "Inter",
              fontWeight: "700",
            }}
            index={3}
          >
            
          </CustomTabPanel> */
}
{
  /* <div>
        <RequestedFreight />
      </div> */
}
