import React from "react";

const OrderTable = ({ order, isAdmin }) => {
  return (
    <div className="p-4 w-[50%]">
      <h2 className="text-xl font-bold mb-4">Order Details</h2>

      <table className="min-w-full border border-gray-300 mb-6">
        <tbody>
          {isAdmin && (
            <>
              <tr>
                <td className="border px-4 py-2 font-medium">Order ID</td>
                <td className="border px-4 py-2">{order.orderId}</td>
              </tr>
              <tr>
                <td className="border px-4 py-2 font-medium">Name</td>
                <td className="border px-4 py-2">{order.name}</td>
              </tr>
              <tr>
                <td className="border px-4 py-2 font-medium">Email</td>
                <td className="border px-4 py-2">{order.email}</td>
              </tr>
              <tr>
                <td className="border px-4 py-2 font-medium">Phone</td>
                <td className="border px-4 py-2">{order.phoneNo}</td>
              </tr>
              <tr>
                <td className="border px-4 py-2 font-medium">Address</td>
                <td className="border px-4 py-2">{order.address}</td>
              </tr>
            </>
          )}

          {/* Shown for both admin & user */}
          <tr>
            <td className="border px-4 py-2 font-medium">Date</td>
            <td className="border px-4 py-2">
              {new Date(order.date).toLocaleString()}
            </td>
          </tr>
          <tr>
            <td className="border px-4 py-2 font-medium">Status</td>
            <td className="border px-4 py-2">{order.status}</td>
          </tr>
          <tr>
            <td className="border px-4 py-2 font-medium">Total</td>
            <td className="border px-4 py-2">Rs. {order.total}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default OrderTable;
