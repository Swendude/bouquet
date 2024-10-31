import Header from "./components/Header";
import HexFlower from "./components/HexFlower";
import NavigationHex from "./components/NavigationHex";

function App() {
  return (
    <div className="bg-neutral-900  text-neutral-200 flex flex-col max-w-4xl mx-auto items-center space-y-8 min-h-screen mt-2">
      <Header />
      <div className="flex justify-between w-full border-neutral-200 ">
        <HexFlower />
        <div className="flex justify-between flex-col w-4/12">
          <div>
            <ul className="flex gap-2">
              <li>Play</li>
              <li>Analyze</li>
              <li>Settings</li>
            </ul>
            <p>Click on a hex to edit. </p>
          </div>

          <NavigationHex />
        </div>
      </div>
    </div>
  );
}

export default App;
