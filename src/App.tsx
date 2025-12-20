import "./App.css";
import CardList from "./components/CardList";
import { API } from "./configs/index";
import { Connection, CustomerDetails } from "./types";
import { useEffect, useState } from "react";

function App() {
  const [customerId, setCustomerId] = useState("");
  const [connectionList, setConnectionList] = useState<Connection[]>([]);

  const fetchConnections = async (id: string) => {
    fetch(`${API.BE.PROD}${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data: CustomerDetails[]) => {
        setConnectionList(data?.[0]?.connections ?? []);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    const id = window.location.pathname;
    if (id?.length < 2) {
      setCustomerId("/679c9f686c20cfe813435e8b");
    } else {
      setCustomerId(id);
    }
  }, []);

  useEffect(() => {
    if (customerId) {
      fetchConnections(customerId);
    }
  }, [customerId]);

  return (
    <div className="App">
      <CardList list={connectionList} />
    </div>
  );
}

export default App;
