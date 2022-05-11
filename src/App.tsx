import Footer from "./components/Footer";
import Header from "./components/Header";
import HexEditor from "./components/HexEditor";
import HexFlower from "./components/HexFlower";
import NavigationHex from "./components/NavigationHex";
function App() {
  return (
    <div className="App">
      <Header />
      <HexFlower />
      <NavigationHex />
      <HexEditor />
      <Footer />
    </div>
  );
}

export default App;
