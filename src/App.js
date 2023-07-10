import "./App.css";
import CardList from "./components/CardList";
import Profile from "./components/Profile";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="App">
      <Profile />
      <CardList />
      <Footer />
    </div>
  );
}

export default App;
