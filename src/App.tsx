import Footer from "./components/Footer";
import Header from "./components/Header";
import HexEditor from "./components/HexEditor";
import HexFlower from "./components/HexFlower";

function App() {
  return (
    <div className="App">
      <Header />
      <HexFlower />

      <HexEditor />
      <Footer />
    </div>
  );
}

export default App;
