export interface registerInitial {
  name: string;
  email: string;
  password: string;
  role?: "customer" | "admin" | "superadmin";
}

export interface loginInitial {
  email: string;
  password: string;
}

export interface registrationFormControlsType {
  id: string;
  type: string;
  placeholder: string;
  label: string;
  componentType: string;
  options?: { id: string; label: string }[];
}

export interface loginFormControlsType {
  id: string;
  type: string;
  placeholder: string;
  label: string;
  componentType: string;
}

export interface userInfoType {
  email: string;
  name: string;
  role: string;
  _id: string;
}

export interface adminAddProductformControlsType {
  id: string;
  type: string;
  placeholder: string;
  label: string;
  componentType: string;
  options?: { id: string; label: string }[];
}

export interface AvailableSizesType {
  id: string;
  label: string;
}

export interface initialAddProductType {
  name: string;
  price: number;
  description: string;
  category: string;
  sizes: AvailableSizesType[];
  deliveryInfo: string;
  onSale: string;
  imageUrl: string;
  priceDrop: number;
}

export interface productReponseType {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  sizes: AvailableSizesType[];
  deliveryInfo: string;
  onSale: string;
  priceDrop: number;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface productAPIReponseType {
  success: boolean;
  data: productReponseType[];
}

// {
//   "id": "666466f704dbdba366069335",
//   "email": "parth@gmail.com",
//   "role": "admin",
//   "iat": 1717996609,
//   "exp": 1718083009
// }

export interface TokenType {
  id: string;
  email: string;
  role: string;
  iat: number;
  exp: number;
}

export interface cartReponseType {
  _id: string;
  quantity: number;
  productID: productReponseType;
  updatedAt: string;
  userID: string;
  _v: number;
}

export interface initialAddressesType {
  fullName: string;
  city: string;
  country: string;
  postalCode: string;
  address: string;
}

export interface addNewAddressFormControlsType {
  id: string;
  type: string;
  placeholder: string;
  label: string;
  componentType: string;
}

export interface addressAPIReponseType {
  _id: string;
  userID: string;
  fullName: string;
  address: string;
  city: string;
  country: string;
  postalCode: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface addressReponseType extends initialAddressesType {
  userID: string;
}

export interface updateAddressReponseType extends initialAddressesType {
  _id: string;
}

export interface orderItemsType {
  qty: number;
  product: productReponseType;
}

export interface createNewOrderType {
  user: string;
  shippingAddress: initialAddressesType;
  orderItems: orderItemsType[];
  paymentMethod: string;
  totalPrice: number;
  isPaid: boolean;
  isProcessing: boolean;
  paidAt: Date;
}

export interface initialCheckoutFormDataType {
  shippingAddress: initialAddressesType | {};
  paymentMethod: string;
  totalPrice: number;
  isPaid: boolean;
  isProcessing: boolean;
  paidAt: Date;
}

export interface getAllOrdersForUserDataType {
  shippingAddress: initialAddressesType;
  _id: string;
  user: string;
  orderItems: orderItemsType[];
  paymentMethod: string;
  totalPrice: number;
  isPaid: boolean;
  isProcessing: boolean;
  paidAt: Date;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface getAllOrdersForUserType {
  success: boolean;
  data: getAllOrdersForUserDataType[];
}

export interface getOrderDetailsType {
  success: boolean;
  data: getAllOrdersForUserDataType;
}

// shippingAddress: {},
//   paymentMethod: "",
//   totalPrice: 0,
//   isPaid: false,
//   paidAt: new Date(),
//   isProcessing: true,

// {
//   success: true,
//   data: [
//     {
//       shippingAddress: {
//         fullName: 'John Doe',
//         address: '123 Main Street, Apt 4B',
//         city: 'New York',
//         country: 'USA',
//         postalCode: '10001'
//       },
//       _id: '666741fcab04ab963bac9a6f',
//       user: '666466f704dbdba366069335',
//       orderItems: [
//         {
//           qty: 1,
//           product: {
//             _id: '6666ac924fbeb9a43c37154f',
//             name: 'sdsasdaas',
//             description: 'sadadd',
//             price: 68.99,
//             category: 'women',
//             sizes: [
//               { id: 's', label: 'S' },
//               { id: 'l', label: 'L' },
//               { id: 'm', label: 'M' }
//             ],
//             deliveryInfo: 'sadsa',
//             onSale: 'yes',
//             priceDrop: 9.99,
//             imageUrl:
//               'https://firebasestorage.googleapis.com/v0/b/ecommercery-next-app.appspot.com/o/ecommerce%2FWhatsApp%20Image%202024-05-17%20at%2009.16.35.jpeg-1718004853580-gztvfn8smi?alt=media&token=408f8b33-14c2-47b2-83c7-9e8ea7e7e141',
//             createdAt: '2024-06-10T07:34:42.233Z',
//             updatedAt: '2024-06-10T09:38:21.645Z',
//             __v: 0
//           },
//           _id: '666741fcab04ab963bac9a70'
//         }
//       ],
//       paymentMethod: 'Stripe',
//       totalPrice: 62,
//       isPaid: true,
//       paidAt: '2024-06-10T18:12:09.621Z',
//       isProcessing: true,
//       createdAt: '2024-06-10T18:12:12.590Z',
//       updatedAt: '2024-06-10T18:12:12.590Z',
//       __v: 0
//     },
//     {
//       shippingAddress: {
//         fullName: 'Jane Smith',
//         address: '456 Elm Street, Suite 300',
//         city: 'Los Angeles',
//         country: 'USA',
//         postalCode: '90001'
//       },
//       _id: '66674920ab04ab963bac9a95',
//       user: '666466f704dbdba366069335',
//       orderItems: [
//         {
//           qty: 1,
//           product: {
//             _id: '6666b0bc4fbeb9a43c371551',
//             name: 'Classic Polo Shirt',
//             description:
//               'A timeless polo shirt made from premium cotton, available in various colors. Perfect for both casual and semi-formal occasions.',
//             price: 25.99,
//             category: 'men',
//             sizes: [
//               { id: 's', label: 'S' },
//               { id: 'm', label: 'M' },
//               { id: 'l', label: 'L' }
//             ],
//             deliveryInfo:
//               'Free shipping on orders over $50. Delivery within 5-7 business days.',
//             onSale: 'no',
//             priceDrop: 5,
//             imageUrl:
//               'https://firebasestorage.googleapis.com/v0/b/ecommercery-next-app.appspot.com/o/ecommerce%2Fflower%20(2).jpg-1718005826781-uedcvf52xw?alt=media&token=d9200305-7ce9-4b6e-9492-6cbcc530627b',
//             createdAt: '2024-06-10T07:52:28.129Z',
//             updatedAt: '2024-06-10T13:42:08.213Z',
//             __v: 0
//           },
//           _id: '66674920ab04ab963bac9a96'
//         },
//         {
//           qty: 1,
//           product: {
//             _id: '6666b55c4fbeb9a43c371553',
//             name: 'Slim Fit Jeans',
//             description:
//               'Stylish and comfortable slim fit jeans that offer a modern look. Made from high-quality denim, perfect for any occasion.',
//             price: 49.99,
//             category: 'men',
//             sizes: [
//               { id: 's', label: 'S' },
//               { id: 'm', label: 'M' },
//               { id: 'l', label: 'L' }
//             ],
//             deliveryInfo:
//               'Standard shipping: $4.99. Delivery within 3-5 business days.',
//             onSale: 'no',
//             priceDrop: 0,
//             imageUrl:
//               'https://firebasestorage.googleapis.com/v0/b/ecommercery-next-app.appspot.com/o/ecommerce%2F23be1e44-fea2-4dbe-8aac-a6b890bac41a.jpg-1718007072852-zuc9rnrnxu?alt=media&token=dceffc2c-a5a9-4593-855b-e4aa629727b8',
//             createdAt: '2024-06-10T08:12:12.537Z',
//             updatedAt: '2024-06-10T13:42:24.988Z',
//             __v: 0
//           },
//           _id: '66674920ab04ab963bac9a97'
//         }
//       ],
//       paymentMethod: 'Stripe',
//       totalPrice: 75.98,
//       isPaid: true,
//       paidAt: '2024-06-10T18:42:37.570Z',
//       isProcessing: true,
//       createdAt: '2024-06-10T18:42:40.382Z',
//       updatedAt: '2024-06-10T18:42:40.382Z',
//       __v: 0
//     }
//   ]
// }
