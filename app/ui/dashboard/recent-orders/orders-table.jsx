import React from "react";

function OrdersTable() {
  const tableHead = ["Order ID", "User Id" , "Product", "Price", "Payment Method", "Time" , "Order Status"];
  const orders = [
    {
      orderId: "23AKN4RGF",
      userId: "2473",
      product: "French Fries",
      price: "200",
      paymentMethod : "Pay On Delivery",
      time: "10:15 AM",
      status: "Pending",
    },
    {
      orderId: "JSBF75BS77",
      userId: "2473",
      product: "Coke 100mL",
      price: "200",
      paymentMethod : "Credit Card",
      time: "2:14 PM",
      status: "Accepted",
    },
    {
      orderId: "K2GJH68789",
      userId: "2473",
      product: "Apple",
      price: "200",
      paymentMethod : "UPI",
      time: "2:14 PM",
      status: "Cancelled",
    },
    {
      orderId: "GG3FJH687T9",
      userId: "2473",
      product: "Peanut Butter",
      price : "150",
      time: "8:24 PM",
      paymentMethod : "UPI",
      status: "Processing",
    },
  ];
  return (
    <div className="py-4">
      <table className="w-full">
        <thead>
        <tr className="rounded">
          {tableHead.map((title) => {
            return <td key={title} className="text-slate-100 text-left py-2">{title}</td>;
          })}
        </tr>
        </thead>
        <tbody>
        {orders && orders.map((order) => {
          return (
              <tr key={order.orderId} className="border-b-[1px] border-slate-900 text-slate-300">
                <td className="py-4">{order.orderId}</td>
                <td className="py-4">{order.userId}</td>
                <td className="py-4">{order.product}</td>
                <td className="py-4">$ {order.price}</td>
                <td className="py-4">{order.paymentMethod}</td>
                <td className="py-4">{order.time}</td>
                <td className={`py-4`}>
                    <span className={`${order.status == 'Pending' ? 'text-orange-400' : order.status == 'Accepted' ? 'text-green-500' : order.status == 'Processing' ? 'text-blue-300' : 'text-red-500'}`}>{order.status}</span>
                </td>
              </tr>
          );
        })}
        </tbody>
      </table>
    </div>
  );
}

export default OrdersTable;
