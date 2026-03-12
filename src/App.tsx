import { HeaderDesktop, HeaderMobile } from "./components/Header";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <div className="min-h-screen bg-gray-100 overflow-x-hidden">
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
    </>
  );
}

export default App;
