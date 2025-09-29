import Order from "../models/order.js";
import Product from "../models/product.js";

export const placeOrder = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const body = req.body;

    // build base order
    const orderData = {
      orderId: "",
      email: req.user.email,
      name: body.name,
      address: body.address,
      phoneNo: body.phoneNo,
      billItems: [],
      total: 0,
    };

    // generate orderId
    const lastOrder = await Order.find().sort({ date: -1 }).limit(1);
    if (lastOrder.length === 0) {
      orderData.orderId = "OD00001";
    } else {
      const lastOrderId = lastOrder[0].orderId;
      const lastOrderNo = parseInt(lastOrderId.replace("OD", "")) + 1;
      orderData.orderId = "OD" + lastOrderNo.toString().padStart(5, "0");
    }

    // process bill items
    for (const item of body.billItems) {
      const product = await Product.findOne({ productId: item.productId });

      if (!product) {
        return res
          .status(404)
          .json({ message: `Product ${item.productId} not found` });
      }

      const itemTotal = product.price * item.quantity;

      orderData.billItems.push({
        productId: product.productId,
        name: product.name,
        price: product.price,
        quantity: item.quantity,
        total: itemTotal,
      });

      orderData.total += itemTotal;
    }

    // save order
    const order = new Order(orderData);
    await order.save();

    res.status(200).json({
      message: "Order placed successfully",
      orderId: order.orderId,
      total: orderData.total,
    });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Order was not placed", error: err.message });
  }
};
