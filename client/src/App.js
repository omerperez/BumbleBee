import './components/Navigation/Navigation.modules.css';
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import HomePage from './components/Pages/HomePage';
import AboutUs from './components/Pages/AboutUs';
import MyProfile from './components/Pages/MyProfile';
import MyFavorite from './components/Pages/MyFavorite';
import GovIL from './components/Pages/GovIL';
import Customs from './components/Pages/Customs';
import Signup from './components/authComponents/Signup';
import { Container } from "react-bootstrap";
import AuthProvider from '../src/contexts/AuthContext'
import Login from './components/authComponents/Login';
import PrivateRoute from './Routes/PrivateRoute';
import ForgotPassword from './components/authComponents/ForgotPassword';
import UpdateProfile from './components/authComponents/UpdateProfile';
import PublicRoute from "./Routes/PublicRoute";
import DealerLogin from './components/authComponents/DealerLogin';
import DHL from './components/Pages/DHL';
import CreateCarPage from './components/Pages/CreateCarPage';
import ManageUserPage from './components/Pages/ManageUserPage';
import CarProfilePage from './components/Pages/CarProfilePage';
import CompaniesPage from './components/Pages/CompaniesPage';
import { createTheme } from "@mui/material/styles";
import EditCarForm from './components/CarComponents/EditCarForm';
import { maxWidthCardApp, minHeightContainerApp } from "./styles/UseStylesMui";

function App() {

  const darkTheme = createTheme({
    palette: {
      type: "dark",
      background: {
        default: "#111821",
        paper: "#111821",
      },
      text: {
        primary: "#fff",
        secondary: "#cccccc",
      },
    },
  });
  const whiteTheme = createTheme({
    palette: {
      type: "light",
    },
    text: {
      primary: "black",
      secondary: "black",
    },
  });

  return (
    <Container>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <HomePage />
                </PrivateRoute>
              }
            />
            <Route
              path="homepage"
              element={
                <PrivateRoute>
                  <HomePage />
                </PrivateRoute>
              }
            />
            <Route
              path="/companies/:company"
              element={
                <PrivateRoute>
                  <HomePage />
                </PrivateRoute>
              }
            />
            <Route
              path="about-us"
              element={
                <PrivateRoute>
                  <AboutUs />
                </PrivateRoute>
              }
            />
            <Route
              path="my-profile"
              element={
                <PrivateRoute>
                  <MyProfile />
                </PrivateRoute>
              }
            />
            <Route
              path="my-favorite"
              element={
                <PrivateRoute>
                  <MyFavorite />
                </PrivateRoute>
              }
            />
            <Route
              path="govil"
              element={
                <PrivateRoute>
                  <GovIL />
                </PrivateRoute>
              }
            />
            <Route
              path="dhl-label"
              element={
                <PrivateRoute>
                  <DHL />
                </PrivateRoute>
              }
            />
            <Route
              path="customs-broker"
              element={
                <PrivateRoute>
                  <Customs />
                </PrivateRoute>
              }
            />
            <Route
              path="our-users"
              element={
                <PrivateRoute>
                  <ManageUserPage />
                </PrivateRoute>
              }
            />
            <Route
              path="create-car"
              element={
                <PrivateRoute>
                  <CreateCarPage />
                </PrivateRoute>
              }
            />
            <Route
              path="edit-car/:id"
              element={
                <PrivateRoute>
                  <EditCarForm />
                </PrivateRoute>
              }
            />
            <Route
              path="companies"
              element={
                <PrivateRoute>
                  <CompaniesPage />
                </PrivateRoute>
              }
            />
            <Route
              path="car-profile/:id"
              element={
                <PrivateRoute>
                  <CarProfilePage />
                </PrivateRoute>
              }
            />
            <Route
              path="update-profile"
              element={
                <PrivateRoute>
                  <div
                    className="d-flex align-items-center justify-content-center"
                    style={minHeightContainerApp}
                  >
                    <div className="w-100" style={maxWidthCardApp}>
                      <UpdateProfile />
                    </div>
                  </div>
                </PrivateRoute>
              }
            />
            <Route
              path="/signup"
              element={
                <PublicRoute>
                  <Signup />
                </PublicRoute>
              }
            />
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              }
            />
            <Route
              path="/dealer-login"
              element={
                <PublicRoute>
                  <DealerLogin />
                </PublicRoute>
              }
            />
            <Route
              path="/forgot-password"
              element={
                <PublicRoute>
                  <ForgotPassword />
                </PublicRoute>
              }
            />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </Container>
  );
}

export default App;
