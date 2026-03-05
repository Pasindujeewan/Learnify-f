import { Home } from "./pages/Home";
import { HeaderDesktop, HeaderMobile } from "./components/Header";

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

        <Home />
      </div>
    </>
  );
}

export default App;
