import mongoose from "mongoose";

const shippingInfoSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    zipCode: { type: String, required: true },
    country: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("ShippingInfo", shippingInfoSchema);
