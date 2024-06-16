"use client";
import ComponentLevelLoader from "@/components/ComponentLevelLoader";
import InputComponent from "@/components/FormElements/InputComponents";
import SelectComponent from "@/components/FormElements/SelectedComponents";
import TileComponent from "@/components/FormElements/TileComponent";
import LoadingCircle from "@/components/LoadingCircle";
import Notification from "@/components/Notification";
import useMyContext from "@/context/useMyContext";
import { storage } from "@/database/firebase";
import { addNewProduct, updateAProduct } from "@/services/Product";
import { AvailableSizesType, initialAddProductType } from "@/types/type";
import { AvailableSizes, adminAddProductformControls } from "@/utils";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";

const initialFormData: initialAddProductType = {
  name: "",
  price: 0,
  description: "",
  category: "men",
  sizes: [],
  deliveryInfo: "",
  onSale: "no",
  imageUrl: "",
  priceDrop: 0,
};

const AddProductPage = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [formImageUrl, setFormImageUrl] = useState<string>("");
  const [progress, setProgress] = useState<number>(0);

  const {
    componentLevelLoader,
    setComponentLevelLoader,
    currentUpdatedProduct,
    setCurrentUpdatedProduct,
  } = useMyContext();

  console.log(currentUpdatedProduct);

  const router = useRouter();

  const createUniqueFileName = (getFile: File) => {
    console.log(getFile);
    const timeStamp = Date.now();
    const randomStringValue = Math.random().toString(36).substring(2, 12);

    return `${getFile.name}-${timeStamp}-${randomStringValue}`;
  };

  async function helperForUPloadingImageToFirebase(file: File) {
    console.log(file);

    const getFileName = createUniqueFileName(file);
    const storageReference = ref(storage, `ecommerce/${getFileName}`);
    const uploadImage = uploadBytesResumable(storageReference, file);

    return new Promise((resolve, reject) => {
      uploadImage.on(
        "state_changed",
        (snapshot) => {
          const progressPercentage = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(progressPercentage);
        },
        (error) => {
          toast.error(error.message);
          console.log(error);
          reject(error);
        },
        () => {
          getDownloadURL(uploadImage.snapshot.ref)
            .then((downloadUrl) => resolve(downloadUrl))
            .catch((error) => reject(error));
        }
      );
    });
  }

  useEffect(() => {
    if (currentUpdatedProduct !== null) setFormData(currentUpdatedProduct);
  }, [currentUpdatedProduct]);

  async function handleImage(event: React.ChangeEvent<HTMLInputElement>) {
    console.log(event.target.files);
    const files = event.target.files && event.target.files[0];
    console.log(files);
    if (!files) return;
    const extractImageUrl = await helperForUPloadingImageToFirebase(files);

    if (extractImageUrl !== "") {
      setFormData({
        ...formData,
        imageUrl: extractImageUrl as string,
      });
      setFormImageUrl(extractImageUrl as string);
    }
  }

  function handleTileClick(getCurrentItem: any) {
    console.log(getCurrentItem);
    let cpySizes = [...formData.sizes];
    const index = cpySizes.findIndex((item) => item.id === getCurrentItem.id);

    if (index === -1) {
      cpySizes.push(getCurrentItem);
    } else {
      cpySizes = cpySizes.filter((item) => item.id !== getCurrentItem.id);
    }

    setFormData({
      ...formData,
      sizes: cpySizes,
    });
  }

  async function handleAddProduct() {
    setComponentLevelLoader({ loading: true, id: "" });
    setFormData({
      ...formData,
      price: Number(formData.price),
      priceDrop: Number(formData.priceDrop),
    });
    const res =
      currentUpdatedProduct !== null
        ? await updateAProduct(formData)
        : await addNewProduct(formData);

    console.log(res);

    if (res.success) {
      setComponentLevelLoader({ loading: false, id: "" });
      toast.success(res.message, {
        position: "top-center",
      });

      setFormData(initialFormData);
      setCurrentUpdatedProduct(null);
      setTimeout(() => {
        router.push("/admin-view/all-products");
      }, 1000);
    } else {
      toast.error(res.message, {
        position: "top-center",
      });
      setComponentLevelLoader({ loading: false, id: "" });
      setFormData(initialFormData);
    }
  }

  console.log(formData);

  return (
    <div className="w-full mt-5 mr-0 mb-0 ml-0 relative">
      <div className="flex flex-col items-start justify-start p-10 bg-white shadow-2xl rounded-xl relative">
        <div className="w-full mt-6 mr-0 mb-0 ml-0 space-y-8 text-black">
          <input
            accept="image/*"
            max="1000000"
            type="file"
            onChange={handleImage}
          />
          {/* {progress > 0 && <LoadingCircle progress={progress} />} */}
          <div className="progress-circle">
            <div className="progress-value">{Math.round(progress)}%</div>
            <svg className="progress-ring" width="100" height="100">
              <circle
                className="progress-ring__circle"
                stroke="blue"
                strokeWidth="4"
                fill="transparent"
                r="48"
                cx="50"
                cy="50"
              />
            </svg>
          </div>
          {formImageUrl && (
            <div>
              <Image src={formImageUrl} alt="image" width={200} height={200} />
            </div>
          )}

          <div className="flex gap-2 flex-col text-black">
            <label>Available sizes</label>
            <TileComponent
              selected={formData.sizes}
              onClick={handleTileClick}
              data={AvailableSizes}
            />
          </div>
          {adminAddProductformControls.map((controlItem) => {
            const value =
              formData[controlItem.id as keyof initialAddProductType];
            if (typeof value === "number") {
              if (controlItem.componentType === "input") {
                return (
                  controlItem.id !== "priceDrop" && (
                    <InputComponent
                      type={controlItem.type}
                      placeholder={controlItem.placeholder}
                      label={controlItem.label}
                      value={value}
                      onChange={(event) => {
                        setFormData({
                          ...formData,
                          [controlItem.id]: event.target.value,
                        });
                      }}
                    />
                  )
                );
              } else if (controlItem.componentType === "select") {
                return (
                  <SelectComponent
                    label={controlItem.label}
                    options={controlItem.options}
                    value={value}
                    onChange={(event) => {
                      setFormData({
                        ...formData,
                        [controlItem.id]: event.target.value,
                      });
                    }}
                  />
                );
              }
            } else if (typeof value === "string") {
              if (controlItem.componentType === "input") {
                return (
                  controlItem.id !== "priceDrop" && (
                    <InputComponent
                      type={controlItem.type}
                      placeholder={controlItem.placeholder}
                      label={controlItem.label}
                      value={value}
                      onChange={(event) => {
                        setFormData({
                          ...formData,
                          [controlItem.id]: event.target.value,
                        });
                      }}
                    />
                  )
                );
              } else if (controlItem.componentType === "select") {
                return (
                  <SelectComponent
                    label={controlItem.label}
                    options={controlItem.options}
                    value={value}
                    onChange={(event) => {
                      setFormData({
                        ...formData,
                        [controlItem.id]: event.target.value,
                      });
                    }}
                  />
                );
              }
            }
          })}
          {formData?.onSale === "yes" && (
            <InputComponent
              type="number"
              placeholder="Price Drop"
              label="Price Drop"
              value={formData.priceDrop}
              onChange={(event) => {
                setFormData({
                  ...formData,
                  priceDrop: event.target.value as any,
                });
              }}
            />
          )}
          {/* controlItem.componentType === "input" ? (
              <InputComponent
                type={controlItem.type}
                placeholder={controlItem.placeholder}
                label={controlItem.label}
                value={}
                onChange={(event) => {
                  setFormData({
                    ...formData,
                    [controlItem.id]: controlItem.type === "number" ?  : event.target.value,
                  });
                }}
              />
            ) : controlItem.componentType === "select" ? (
              <SelectComponent
                label={controlItem.label}
                options={controlItem.options}
                value={formData[controlItem.id]}
                onChange={(event) => {
                  setFormData({
                    ...formData,
                    [controlItem.id]: event.target.value,
                  });
                }}
              />
            ) : null
          ) */}
          <button
            onClick={handleAddProduct}
            className="inline-flex w-full items-center justify-center bg-black px-6 py-4 text-lg text-white font-medium uppercase tracking-wide"
          >
            {componentLevelLoader && componentLevelLoader.loading ? (
              <ComponentLevelLoader
                text={
                  currentUpdatedProduct !== null
                    ? "Updating Product"
                    : "Adding Product"
                }
                color={"#ffffff"}
                loading={componentLevelLoader && componentLevelLoader.loading}
              />
            ) : currentUpdatedProduct !== null ? (
              "Update Product"
            ) : (
              "Add Product"
            )}
          </button>
        </div>
      </div>
      <Notification />
    </div>
  );
};

export default AddProductPage;
