import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { updatePackageStatusByOrderId } from "@/service/api";
import Swal from "sweetalert2/dist/sweetalert2.js";

const steps = [
  {
    label: "Recieved at Yaad Plug - Miami, Florida",
    description: `Please update your invoice , your order is ready to be shipped from Miami - Florida Warehouse`,
  },
  {
    label: "In transit",
    description: "Package expected to reach your nearest warehouse in 2 days",
  },
  {
    label: "Your order is shipped",
    description: `Your order has arrived in Jamaica`,
  },
  {
    label: "Delivered",
  },
];

export default function PackageStatusStepper({ orderId, currentStatus }) {
  const [status, setStatus] = React.useState({});

  const statusList = [
    "Invoice Needed",
    "In Transit",
    "FL Warehouse",
    "Delivered",
  ];
// console.log(currentStatus)
  React.useEffect(() => {
    switch (currentStatus) {
      case "Invoice Needed":
        setStatus((prev) => {
          return {
            activeStep: 0,
            nextStep: statusList[1],
          };
        });
        break;
      case "Invoice received":
        setStatus((prev) => {
          return {
            activeStep: 0,
            nextStep: statusList[1],
          };
        });
        break;
      case "In Transit":
        setStatus((prev) => {
          return {
            activeStep: 1,
            nextStep: statusList[2],
          };
        });
        break;
      case "FL Warehouse":
        setStatus((prev) => {
          return {
            activeStep: 2,
            nextStep: statusList[3],
          };
        });
        break;
      case "Delivered":
        setStatus((prev) => {
          return {
            activeStep: 3,
            nextStep: statusList[4],
          };
        });
        break;
      default:
        setStatus((prev) => {
          return {
            activeStep: 0,
            nextStep: statusList[1],
          };
        });
        break;
    }
  }, [currentStatus]);

  const handleStatusUpdate = async () => {
    const data = {
      packageStatus: status.nextStep,
    };
    await updatePackageStatusByOrderId(orderId, data)
      .then((res) => {
        if (res.success) {
          Swal.fire({
            icon: "success",
            title: "Package status updated.",
            position: "top-right",
            showConfirmButton: false,
            toast: true,
            timer: 1500,
          });
          setStatus((prev) => {
            return {
              activeStep: prev.activeStep + 1,
              nextStep: statusList[prev.activeStep + 2],
            };
          });
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <Box sx={{ maxWidth: 400 }}>
      <Stepper activeStep={status.activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step
            key={step.label}
            sx={{
              "& .MuiStepLabel-root .Mui-completed": {
                color: "#306130", // circle color (COMPLETED)
              },
              "& .MuiStepLabel-root .Mui-active": {
                color: "#5bb85b", // circle color (ACTIVE)
              },
              "& .MuiStepLabel-root .Mui-disabled": {
                color: "#aaaaaa",
              },
            }}
          >
            <StepLabel>{step.label}</StepLabel>
            <StepContent>
              <Typography fontSize={""}>{step.description}</Typography>
              <Box sx={{ mb: 2 }}>
                <div>
                  <Button
                    variant="contained"
                    onClick={handleStatusUpdate}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    {index === steps.length - 1 ? "Delivered" : status.nextStep}
                  </Button>
                </div>
              </Box>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {/* {activeStep === steps.length && (
        <Paper square elevation={0} sx={{ p: 3 }}>
          <Typography>All steps completed - you&apos;re finished</Typography>
          <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
            Reset
          </Button>
        </Paper>
      )} */}
    </Box>
  );
}
