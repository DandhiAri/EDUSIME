import UserForm from "#components/ui/UserForm";
import UserFormEdit from "#components/ui/UserFormEdit";
import { Toaster } from "@/components/ui/sonner";
import { BrowserRouter, Route, Routes } from "react-router";
import "./App.css";
import UserListPage from "#components/ui/UserListPage";
import LoginPage from "#components/ui/LoginPage";
import { AuthProvider } from "./context/AuthContext";
import { GuestOnly, RequireAuth, RequireRole } from "./routes/guards";

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Toaster position="top-center" richColors />
          <Routes>
            <Route element={<GuestOnly/>}>
              <Route path="/login" element={<LoginPage/>}/>
            </Route>
            <Route element={<RequireAuth/>}>
              <Route element={<RequireRole allow={["admin"]}/>}>
              <Route path="/" element={<UserListPage />} />
                <Route path="create" element={<UserForm />} />
                <Route path=":id/edit" element={<UserFormEdit />} />
              </Route>
            </Route>
            <Route path="*" element={<p>Halaman tidak ditemukan</p>} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
