import { HeaderDesktop, HeaderMobile } from "./components/Header";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 overflow-x-hidden">
      {/* Desktop and mobile headers have different navigation layouts. */}
      <div className="hidden md:block">
        <HeaderDesktop />
      </div>

      <div className="block md:hidden">
        <HeaderMobile />
      </div>

      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default App;
