import { useState } from "react";
import { useToast } from "../hook/toastHook";

type PdfResult = {
  text: string;
  wordCount: number;
  readingMinutes: number;
};

const UploadPDF = () => {
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<PdfResult | null>(null);
  const [error, setError] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const toast = useToast();

  const handleUpload = async () => {
    if (!file) {
      toast.info("Choose a PDF file before analyzing.", "No file selected");
      return;
    }

    const formData = new FormData();
    // The backend multer route expects the PDF under the "pdf" field name.
    formData.append("pdf", file);

    setError("");
    setIsUploading(true);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/upload/pdf`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      // API errors still return JSON, so surface the backend message when present.
      if (!res.ok) {
        throw new Error(data.message || "Upload failed");
      }

      setResult(data.data);
      toast.success("PDF text and reading estimate are ready.", "PDF analyzed");
    } catch {
      setError("Could not read this PDF. Please try another file.");
      toast.error("Could not read this PDF. Please try another file.", "PDF analysis failed");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <div className="mb-6">
        <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
          Instructor Resource
        </p>
        <h1 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
          PDF Lesson Analyzer
        </h1>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          Upload a lesson PDF to estimate reading time and preview extracted text.
        </p>
      </div>

      <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <input
          type="file"
          accept="application/pdf"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            if (e.target.files && e.target.files[0]) {
              setFile(e.target.files[0]);
            }
          }}
          className="block w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-800"
        />

        <button
          onClick={handleUpload}
          disabled={!file || isUploading}
          className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300"
        >
          {isUploading ? "Analyzing..." : "Analyze PDF"}
        </button>

        {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

        {result && (
          <div className="mt-6 space-y-4">
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-lg bg-slate-50 p-4 dark:bg-slate-800">
                <p className="text-xs text-slate-500">Word Count</p>
                <p className="text-2xl font-bold">{result.wordCount}</p>
              </div>
              <div className="rounded-lg bg-slate-50 p-4 dark:bg-slate-800">
                <p className="text-xs text-slate-500">Estimated Reading</p>
                <p className="text-2xl font-bold">{result.readingMinutes} min</p>
              </div>
            </div>
            <pre className="max-h-80 overflow-auto whitespace-pre-wrap rounded-lg bg-slate-950 p-4 text-xs leading-6 text-slate-100">
              {result.text.slice(0, 1500)}
            </pre>
          </div>
        )}
      </section>
    </div>
  );
};

export default UploadPDF;
