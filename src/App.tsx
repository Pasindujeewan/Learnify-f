import { Header } from "./components/layout/Header";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 overflow-x-hidden">
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default App;
