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
  History,
  Home,
  Information,
  Invoice,
  Login,
  Menu,
  NotFound,
  Order,
  Register,
  SettingAccount,
  User,
} from "./view";
import { About, Team, Contact, Terms } from "./view/informationPage";

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
          <Route path="history" element={<History />} />
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

        <Route path="/invoice/:id" element={<User />}>
          <Route index element={<Invoice />} />
        </Route>

        <Route path="/information" element={<Information />}>
          <Route index element={<About />} />
          <Route path="about" element={<About />} />
          <Route path="team" element={<Team />} />
          <Route path="contact" element={<Contact />} />
          <Route path="terms" element={<Terms />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
