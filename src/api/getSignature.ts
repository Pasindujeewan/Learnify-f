export const uploadImage = async (file: File, type: "avatar" | "course" = "avatar") => {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/upload/signature`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type }),
      },
    );

    const responseData = await res.json();
    const { timestamp, signature, apiKey, cloudName, folder } = responseData.data;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("api_key", apiKey);
    formData.append("timestamp", timestamp);
    formData.append("signature", signature);
    formData.append("folder", folder);
    formData.append("resource_type", "image");

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
    throw error;
  }
};
