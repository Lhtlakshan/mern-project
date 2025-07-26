import Order from "../models/order.js";

export const createOrder = (req, res) => {
  if (req.user == null) {
    res.status(401).json({
      message: "Unauthorized",
    });

    return;
  }

  const body = req.body;

  const orderData = {
    orderId: "",
    email: req.user.email,
    name: body.name,
    address: body.address,
    phoneNo: body.phoneNo,
    billItems: [],
    total: 0,
  };

  Order.find()
    .sort({
      date: -1,
    })
    .limit(1)
    .then((lastOrder) => {

      if (lastOrder.length === 0) {
        orderData.orderId = "OD00001";
      } else {
        const lastOrderId = lastOrder[0].orderId;
        const lastOrderNo = lastOrderId.replace("OD", "");
        const newOrderNo = parseInt(lastOrderNo) + 1;
        const newOrderId = "OD" + newOrderNo.toString().padStart(4, "0");
        orderData.orderId = newOrderId;
      }

      const order = new Order(orderData);
      order
        .save()
        .then(() => {
          res.status(200).json({
            message: "Order placed successfully",
          });
        })
        .catch((err) => {
          res.status(500).json({
            message: "Order was not placed",
          });
        });
    });
};
