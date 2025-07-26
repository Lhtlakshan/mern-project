import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
  orderId: {
    type: String,
    required: true,
    unique: true,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  email: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    default: "Pending",
  },
  phoneNo: {
    type: String,
    required :true
  },

  billItems :{
    type : [
        {
            productId :String,
            productName : String,
            image : String,
            quantity  :Number,
            price : Number
        }
    ],
    required : true
  }
});

const Order = mongoose.model("order" , orderSchema);

export default Order;