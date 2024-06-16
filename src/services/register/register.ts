import { registerInitial } from "@/types/type";

export const registerNewUser = async (formData: any) => {
  try {
    const response = await fetch("/api/registers", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const finalData = await response.json();
    console.log("finalData", finalData);

    return finalData;
  } catch (e) {
    console.log("error", e);
  }
};
