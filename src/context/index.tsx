"use client";
import React, { ReactNode, createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import {
  cartReponseType,
  getAllOrdersForUserDataType,
  getOrderDetailsType,
  initialAddressesType,
  initialCheckoutFormDataType,
  productReponseType,
  userInfoType,
} from "@/types/type";
import { usePathname, useRouter } from "next/navigation";

const initialUserType = {
  email: "",
  name: "",
  role: "customer",
  _id: "",
};

export const initialAddressesForm = {
  fullName: "",
  city: "",
  country: "",
  postalCode: "",
  address: "",
};

export const initialCheckoutFormData: initialCheckoutFormDataType = {
  shippingAddress: {},
  paymentMethod: "",
  totalPrice: 0,
  isPaid: false,
  paidAt: new Date(),
  isProcessing: true,
};

const protectedRoutes = ["cart", "checkout", "account", "orders", "admin-view"];

const protectedAdminRoutes = [
  "/admin-view",
  "/admin-view/add-product",
  "/admin-view/all-products",
];

export interface MyContextType {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  showNavModal: boolean;
  setShowNavModal: React.Dispatch<React.SetStateAction<boolean>>;
  user: any;
  setUser: React.Dispatch<React.SetStateAction<any>>;
  componentLevelLoader: {
    loading: boolean;
    id: string;
  };
  setComponentLevelLoader: React.Dispatch<
    React.SetStateAction<{ loading: boolean; id: string }>
  >;
  pageLevelLoader: boolean;
  setPageLevelLoader: React.Dispatch<React.SetStateAction<boolean>>;
  isAuthUser: boolean;
  setIsAuthUser: React.Dispatch<React.SetStateAction<boolean>>;
  currentUpdatedProduct: productReponseType | null;
  setCurrentUpdatedProduct: React.Dispatch<
    React.SetStateAction<productReponseType | null>
  >;
  showCartModal: boolean;
  setShowCartModal: React.Dispatch<React.SetStateAction<boolean>>;
  cartItems: any;
  setCartItems: React.Dispatch<React.SetStateAction<any>>;
  addresses: any;
  setAddresses: React.Dispatch<React.SetStateAction<any>>;
  addressFormData: initialAddressesType;
  setAddressFormData: React.Dispatch<
    React.SetStateAction<initialAddressesType>
  >;
  checkoutFormData: initialCheckoutFormDataType;
  setCheckoutFormData: React.Dispatch<
    React.SetStateAction<initialCheckoutFormDataType>
  >;
  allOrdersForUser: getAllOrdersForUserDataType[];
  setAllOrdersForUser: React.Dispatch<
    React.SetStateAction<getAllOrdersForUserDataType[]>
  >;
  orderDetails: getAllOrdersForUserDataType | null;
  setOrderDetails: React.Dispatch<
    React.SetStateAction<getAllOrdersForUserDataType | null>
  >;
  allOrdersForAllUsers: any;
  setAllOrdersForAllUsers: React.Dispatch<React.SetStateAction<any>>;
}

export const GlobalContext = createContext<MyContextType | null>(null);

const GlobalState: React.FC<{ children: ReactNode }> = ({ children }) => {
  const router = useRouter();
  const pathName = usePathname();
  const [showNavModal, setShowNavModal] = useState<boolean>(false);
  const [componentLevelLoader, setComponentLevelLoader] = useState<{
    loading: boolean;
    id: string;
  }>({
    loading: false,
    id: "",
  });
  const [user, setUser] = useState<userInfoType>(initialUserType);
  const [pageLevelLoader, setPageLevelLoader] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");
  const [isAuthUser, setIsAuthUser] = useState<boolean>(false);
  const [currentUpdatedProduct, setCurrentUpdatedProduct] =
    useState<productReponseType | null>(null);
  const [showCartModal, setShowCartModal] = useState<boolean>(false);
  const [cartItems, setCartItems] = useState<cartReponseType[]>([]);
  const [addresses, setAddresses] = useState<any>([]);
  const [addressFormData, setAddressFormData] =
    useState<initialAddressesType>(initialAddressesForm);
  const [checkoutFormData, setCheckoutFormData] =
    useState<initialCheckoutFormDataType>(initialCheckoutFormData);

  const [allOrdersForUser, setAllOrdersForUser] = useState<
    getAllOrdersForUserDataType[]
  >([]);
  const [orderDetails, setOrderDetails] =
    useState<getAllOrdersForUserDataType | null>(null);
  const [allOrdersForAllUsers, setAllOrdersForAllUsers] = useState<any>([]);

  useEffect(() => {
    if (Cookies.get("token") !== undefined) {
      setIsAuthUser(true);
      const userData: userInfoType =
        JSON.parse(localStorage.getItem("user") as string) || {};
      console.log(userData);
      const getCartItems =
        JSON.parse(localStorage.getItem("cartItems") as string) || [];
      setUser(userData);
      setCartItems(getCartItems);
    } else {
      setIsAuthUser(false);
      setUser(initialUserType); //unauthenticated user
    }
  }, [Cookies]);

  useEffect(() => {
    if (
      pathName !== "/register" &&
      !pathName.includes("product") &&
      pathName !== "/" &&
      user &&
      Object.keys(user).length === 0 &&
      protectedRoutes.includes(pathName)
    )
      router.push("/login");
  }, [user, pathName]);

  useEffect(() => {
    if (
      user !== null &&
      user &&
      Object.keys(user).length > 0 &&
      user?.role !== "admin" &&
      protectedAdminRoutes.indexOf(pathName) > -1
    )
      router.push("/unauthorized-page");
  }, [user, pathName]);

  const contextValue: MyContextType = {
    value,
    setValue,
    showNavModal,
    setShowNavModal,
    user,
    setUser,
    componentLevelLoader,
    setComponentLevelLoader,
    pageLevelLoader,
    setPageLevelLoader,
    isAuthUser,
    setIsAuthUser,
    currentUpdatedProduct,
    setCurrentUpdatedProduct,
    showCartModal,
    setShowCartModal,
    cartItems,
    setCartItems,
    addresses,
    addressFormData,
    setAddresses,
    setAddressFormData,
    checkoutFormData,
    setCheckoutFormData,
    allOrdersForUser,
    setAllOrdersForUser,
    orderDetails,
    setOrderDetails,
    allOrdersForAllUsers,
    setAllOrdersForAllUsers,
  };

  return (
    <GlobalContext.Provider value={contextValue}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalState;
