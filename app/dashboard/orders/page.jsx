"use client";

import React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Box } from "@mui/material";
import PendingOrders from "@/app/ui/orders/pending-orders/pending-orders";
import ActiveOrders from "@/app/ui/orders/active-orders/active-orders";
import DeliveredOrders from "@/app/ui/orders/delivered-orders/delivered-orders";
import RejectedOrders from "@/app/ui/orders/rejected-orders/rejected-orders";
import OrderDetailsPage from "@/app/ui/orders/order-details/order-details";

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
function Page() {
  const [value, setValue] = React.useState(0);
  const [orderId, setOrderId] = React.useState(0);
  const [orderDetailsPage, setorderDetailsPage] = React.useState(false);

  const handleOrderDetails = (orderId) => {
    setorderDetailsPage(!orderDetailsPage);
    setOrderId(orderId);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      {orderDetailsPage ? (
        <div>
          <OrderDetailsPage handleOrderDetails={handleOrderDetails} orderid={orderId} />
        </div>
      ) : (
        <div>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
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
            <PendingOrders handleOrderDetails={handleOrderDetails} />
          </CustomTabPanel>
          <CustomTabPanel
            value={value}
            sx={{
              fontFamily: "Inter",
              fontWeight: "700",
            }}
            index={1}
          >
            <ActiveOrders handleOrderDetails={handleOrderDetails} />
          </CustomTabPanel>
          <CustomTabPanel
            value={value}
            sx={{
              fontFamily: "Inter",
              fontWeight: "700",
            }}
            index={2}
          >
            <DeliveredOrders handleOrderDetails={handleOrderDetails} />
          </CustomTabPanel>
          <CustomTabPanel
            value={value}
            sx={{
              fontFamily: "Inter",
              fontWeight: "700",
            }}
            index={3}
          >
            <RejectedOrders handleOrderDetails={handleOrderDetails} />
          </CustomTabPanel>{" "}
        </div>
      )}
    </div>
  );
}

export default Page;
