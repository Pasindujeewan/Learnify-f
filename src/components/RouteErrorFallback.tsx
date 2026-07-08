import { AlertTriangle, ArrowLeft, Home, RefreshCw } from "lucide-react";
import { isRouteErrorResponse, Link, useNavigate, useRouteError } from "react-router-dom";

export function RouteErrorFallback() {
  const error = useRouteError();
  const navigate = useNavigate();

  // React Router can provide route responses or normal thrown Errors.
  const message = isRouteErrorResponse(error)
    ? error.statusText || error.data?.message
    : error instanceof Error
      ? error.message
      : "Something went wrong while loading this page.";

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-12 text-slate-900 dark:bg-slate-950 dark:text-white">
      <section className="w-full max-w-lg rounded-lg border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-rose-50 text-rose-600 dark:bg-rose-950/50 dark:text-rose-300">
          <AlertTriangle size={24} />
        </div>

        <h1 className="mt-5 text-2xl font-bold">Something broke on this page</h1>
        <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
          The app caught the error safely. You can refresh the page or go back to
          a stable screen.
        </p>

        <pre className="mt-4 max-h-32 overflow-auto rounded-lg bg-slate-950 p-3 text-xs leading-5 text-slate-100">
          {message}
        </pre>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <button
            onClick={() => window.location.reload()}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            <RefreshCw size={16} />
            Refresh
          </button>
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            <ArrowLeft size={16} />
            Go back
          </button>
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            <Home size={16} />
            Home
          </Link>
        </div>
      </section>
    </main>
  );
}
