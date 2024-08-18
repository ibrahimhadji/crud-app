import { useEffect, useState } from "react";
import { Dashboard } from "./dashboard";
import { Login } from "./login";

function App() {
  const [isLogged, setIsLogged] = useState("false");
  useEffect(() => {
    const logginState = localStorage.getItem("isLoginIn");
    setIsLogged(logginState);
  }, []);
  function handleLogout() {
    setIsLogged(false);
  }
  function handleLogIn() {
    setIsLogged(true);
  }
  return (
    <>
      {isLogged ? (
        <Dashboard onLogout={handleLogout} />
      ) : (
        <Login onLogin={handleLogIn} />
      )}
    </>
  );
}
export default App;
