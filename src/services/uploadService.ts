const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export type ImageUploadType = "avatar" | "course";

export type PdfAnalysisResult = {
  text: string;
  wordCount: number;
  readingMinutes: number;
};

export async function uploadImage(
  file: File,
  type: ImageUploadType = "avatar",
): Promise<string> {
  const res = await fetch(`${API_BASE_URL}/upload/signature`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ type }),
  });

  const responseData = await res.json();
  if (!res.ok) {
    throw new Error(responseData?.message || "Failed to get upload signature");
  }

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
  if (!uploadRes.ok) {
    throw new Error(data?.error?.message || "Image upload failed");
  }

  return data.secure_url;
}

export async function uploadPdf(file: File): Promise<PdfAnalysisResult> {
  const formData = new FormData();
  formData.append("pdf", file);

  const res = await fetch(`${API_BASE_URL}/upload/pdf`, {
    method: "POST",
    body: formData,
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data?.message || "PDF upload failed");
  }

  return data.data;
}
