import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";

import Register from "./pages/Register";
import Login from "./pages/Login";
import Tasks from "./pages/Tasks";

function RequireAuth({ children }) {
  const location = useLocation();

  if (!localStorage.getItem("token")) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/tasks"
          element={
            <RequireAuth>
              <Tasks />
            </RequireAuth>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;