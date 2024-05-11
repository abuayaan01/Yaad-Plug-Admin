import React from "react";
import { FaCirclePlus } from "react-icons/fa6";
import Dialog from "@mui/material/Dialog";
import TextField from "@/app/ui/dashboard/input/text-field";
import SelectField from "../../dashboard/input/select-field";
import { addPackage } from "@/service/api";
import { useRouter } from "next/navigation";

function AddPackage() {
  return (
    <div>
      <AddPackageForm />
    </div>
  );
}
function AddPackageForm() {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);

  const [firstName, setfirstName] = React.useState();
  const [lastName, setlastName] = React.useState();
  const [userEmailAddress, setuserEmailAddress] = React.useState();
  const [freightType, setfreightType] = React.useState();
  const [packageStatus, setpackageStatus] = React.useState();
  const [packageDescription, setpackageDescription] = React.useState();
  const [weightLBS, setweightLBS] = React.useState();
  const [invoiceNumber, setinvoiceNumber] = React.useState();
  const [trackingNumber, settrackingNumber] = React.useState();
  const [paymentMethod, setpaymentMethod] = React.useState();
  const [payment, setpayment] = React.useState();
  const [processingFee, setprocessingFee] = React.useState();
  const [chargesAdded, setchargesAdded] = React.useState();
  const [subTotal, setsubTotal] = React.useState();
  const [totalFare, settotalFare] = React.useState();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const addPackageReq = async () => {
    const data = {
      firstName,
      lastName,
      userEmailAddress,
      freightType,
      packageStatus,
      packageDescription,
      weightLBS,
      invoiceNumber,
      trackingNumber,
      paymentMethod,
      payment,
      processingFee,
      chargesAdded,
      subTotal,
      totalFare,
    };
    await addPackage(data)
      .then((res) => {
        // console.log(res);
        if (res) {
          Swal.fire({
            icon: "success",
            title: "Package added successfully.",
            position: "top-right",
            showConfirmButton: false,
            timer: 1500,
            toast: true,
          });
          handleClose();
        }
      })
      .catch((e) => console.log(e));
  };

  return (
    <React.Fragment>
      <div
        onClick={() => router.push('add-freight')}
        className="h-[200px] bg-slate-700 glass-card cursor-pointer flex justify-center items-center gap-6 flex-col rounded-md relative"
      >
        <div>
          <FaCirclePlus size={28} />
        </div>
        <div>Add Package</div>
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: (e) => {
            e.preventDefault();
            addPackageReq();
          },
          style: {
            maxWidth: "800px",
            width: "100%",
            borderRadius: 5,
            backgroundColor: "#000000",
          },
        }}
      >
        <div className="bg-[#1B2537] text-gray-100 text-xs px-2">
          <p className="font-bold text-sm pt-6 pb-4 px-2">Add New Package</p>
          <div className="w-full flex flex-wrap">
            <TextField
              required
              id="firstName"
              name="firstName"
              label="First Name"
              type="text"
              half={false}
              value={firstName}
              onChange={(e) => setfirstName(e.target.value)}
            />
            <TextField
              required
              id="lastName"
              name="lastName"
              label="Last Name"
              type="text"
              half={false}
              value={lastName}
              onChange={(e) => setlastName(e.target.value)}
            />
            <TextField
              required
              id="userEmailAddress"
              name="userEmailAddress"
              label="Email Address"
              type="email"
              half={false}
              value={userEmailAddress}
              onChange={(e) => setuserEmailAddress(e.target.value)}
            />
            <SelectField
              label={"Freight Type"}
              value={freightType}
              onChange={(e) => setfreightType(e.target.value)}
              options={["Air", "Sea"]}
            />
            <SelectField
              label={"Package Status"}
              value={packageStatus}
              onChange={(e) => setpackageStatus(e.target.value)}
              options={["FL Warehouse",
              "Delivered",
              "Ready for Pick up",
              "In Transit",
              "Customs",
              "Invoice Needed",
              "Out for delivery"]}
            />
            <TextField
              required
              id="packageDescription"
              name="packageDescription"
              label="Package Description"
              type="text"
              half={false}
              value={packageDescription}
              onChange={(e) => setpackageDescription(e.target.value)}
            />
            <TextField
              required
              id="weightLBS"
              name="weightLBS"
              label="Weight (LBS)"
              type="number"
              half={false}
              value={weightLBS}
              onChange={(e) => setweightLBS(e.target.value)}
            />
            <TextField
              required
              id="invoiceNumber"
              name="invoiceNumber"
              label="Invoice Number"
              type="text"
              half={false}
              value={invoiceNumber}
              onChange={(e) => setinvoiceNumber(e.target.value)}
            />
            <TextField
              required
              id="trackingNumber"
              name="trackingNumber"
              label="Tracking Number"
              type="text"
              half={false}
              value={trackingNumber}
              onChange={(e) => settrackingNumber(e.target.value)}
            />
            <SelectField
              label={"Payment Method"}
              value={paymentMethod}
              onChange={(e) => setpaymentMethod(e.target.value)}
              options={["E-Transaction", "Pay on delivery"]}
            />
            <SelectField
              label={"Payment Status"}
              value={payment}
              onChange={(e) => setpayment(e.target.value)}
              options={["Paid", "Unpaid"]}
            />
            <TextField
              required
              id="processingFee"
              name="processingFee"
              label="Processing Fee"
              type="number"
              half={false}
              value={processingFee}
              onChange={(e) => setprocessingFee(e.target.value)}
            />
            <TextField
              required
              id="chargesAdded"
              name="chargesAdded"
              label="Charges Added"
              type="number"
              half={false}
              value={chargesAdded}
              onChange={(e) => setchargesAdded(e.target.value)}
            />
            <TextField
              required
              id="subTotal"
              name="subTotal"
              label="Sub Total"
              type="number"
              half={false}
              value={subTotal}
              onChange={(e) => setsubTotal(e.target.value)}
            />
            <TextField
              required
              id="totalFare"
              name="totalFare"
              label="Total Fare"
              type="number"
              half={false}
              value={subTotal}
              onChange={(e) => settotalFare(e.target.value)}
            />
          </div>
          <div className="px-2 py-2 flex justify-end gap-4">
            <button
              className="bg-blue-400 rounded px-8 py-2 mb-4"
              variant="outlined"
            >
              Submit
              {/* {loading ? <CircularProgress size={18} color="inherit" /> : ""} */}
            </button>
            <button
              onClick={handleClose}
              className="bg-gray-600 rounded px-8 py-2 mb-4"
            >
              Cancel
            </button>
          </div>
        </div>
      </Dialog>
    </React.Fragment>
  );
}

export default AddPackage;
