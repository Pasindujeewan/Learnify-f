export const uploadImage = async (file: File) => {
  // get signature
  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/upload/signature`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "avatar" }),
      },
    );

    const responceData = await res.json();
    const { timestamp, signature, apiKey, cloudName } = responceData.data;
    console.log("Signature response:", {
      timestamp,
      signature,
      apiKey,
      cloudName,
    });
    // upload to cloudinary
    const formData = new FormData();
    formData.append("file", file);
    formData.append("api_key", apiKey);
    formData.append("timestamp", timestamp);
    formData.append("signature", signature);
    formData.append("folder", "avatars");

    const uploadRes = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: "POST",
        body: formData,
      },
    );

    const data = await uploadRes.json();
    return data.secure_url;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};
