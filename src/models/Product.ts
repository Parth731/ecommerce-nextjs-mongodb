import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    name: String,
    description: String,
    price: Number,
    category: String,
    sizes: Array,
    deliveryInfo: String,
    onSale: String,
    priceDrop: Number,
    imageUrl: String,
  },
  { timestamps: true }
);

const Product =
  mongoose.models.Products || mongoose.model("Products", ProductSchema);

export default Product;

// {
//   name: 'dsdsa',
//   price: '10',
//   description: 'dsa',
//   category: 'women',
//   sizes: [ { id: 's', label: 'S' }, { id: 'm', label: 'M' } ],
//   deliveryInfo: 'dadsa',
//   onSale: 'no',
//   imageUrl:
//     'https://firebasestorage.googleapis.com/v0/b/ecommercery-next-app.appspot.com/o/ecommerce%2FScreenshot%202024-06-03%20193329.png-1718000991856-hmunyvd879?alt=media&token=8d2bcc93-3813-42d7-94a3-247a38221807',
//   priceDrop: 0
// }
