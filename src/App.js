import { Route, Routes } from "react-router-dom";
import AuthProvider from "./service/auth";
import GuestNoAuth from "./service/GuestNoAuth";
import GuestAdmin from "./service/GuestAdmin";
import GuestAuth from "./service/GuestAuth";
import {
  Accounts,
  Admin,
  Checkout,
  Dashboard,
  Home,
  Invoice,
  Login,
  Menu,
  NotFound,
  Order,
  Register,
  SettingAccount,
  User,
} from "./view/App";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/"
          element={
            <GuestAuth>
              <User />
            </GuestAuth>
          }
        >
          <Route path="settings" element={<SettingAccount />} />
          <Route path="checkout" element={<Checkout />} />
        </Route>

        <Route
          path="/dashboard"
          element={
            <GuestAdmin>
              <Admin />
            </GuestAdmin>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="menu" element={<Menu />} />
          <Route path="order" element={<Order />} />
          <Route path="Accounts" element={<Accounts />} />
        </Route>

        <Route
          path="/login"
          element={
            <GuestNoAuth>
              <Login />
            </GuestNoAuth>
          }
        />
        <Route
          path="/register"
          element={
            <GuestNoAuth>
              <Register />
            </GuestNoAuth>
          }
        />

        <Route path="Invoice/:id" element={<User />}>
          <Route index element={<Invoice />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
