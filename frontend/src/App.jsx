import { useRoutes } from "react-router"
import routes from "./router"
import { AuthProvider } from "./contexts/AuthContext"

function App() {
  const content = useRoutes(routes);
  return (
    <AuthProvider>
      {content}
    </AuthProvider>
  );
}

export default App