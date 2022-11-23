import "./App.css";
import { RouterProvider } from "react-router-dom";
import { appRouter } from "./navigation/router";
import { useContext } from "react";
import { UserContext } from "./contexts/userContext";

function App() {
  const { authUser } = useContext(UserContext);
  return (
    <div className="App">
      <RouterProvider router={appRouter(Boolean(authUser))} />
    </div>
  );
}

export default App;
