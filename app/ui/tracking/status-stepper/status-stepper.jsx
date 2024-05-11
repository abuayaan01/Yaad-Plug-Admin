import React from "react";
import { Stepper, Step, StepLabel, Box } from "@mui/material";

const steps = [
  "Confirmed",
  "Preparing",
  "Ready for Pickup",
  "Order Picked Up",
  "Out for Delivery",
  "At Doorstep",
  "Delivered",
];
export default function StatusStepper({activeStep}) {
  return (
    <Box>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label, index) => (
          <Step key={index} sx={{
            '& .MuiStepLabel-root .Mui-completed': {
              color: '#306130', // circle color (COMPLETED)
            },
            '& .MuiStepLabel-root .Mui-active': {
              color: '#5bb85b', // circle color (ACTIVE)
            },
          }}>
            <StepLabel><p className="text-slate-300">{label}</p></StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}
