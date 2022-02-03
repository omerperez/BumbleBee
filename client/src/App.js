import './components/Navigation/Navigation.modules.css' ;
import { BrowserRouter, Route, Routes , Navigate} from "react-router-dom";
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
import PrivateRoute from './components/Layout/PrivateRoute';
import ForgotPassword from './components/authComponents/ForgotPassword';
import UpdateProfile from './components/authComponents/UpdateProfile';
import AuthLayout from './components/Layout/AuthLayout';
import DealerLogin from './components/authComponents/DealerLogin';
import DHL from './components/Pages/DHL';

const maxWidthCard = { maxWidth: 400 };
const minHeightContainer = { minHeight: "100vh" };

function App() {

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
              path="about-us"
              element={
                <PrivateRoute>
                  <AboutUs />{" "}
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
              path="update-profile"
              element={
                <PrivateRoute>
                  <div
                    className="d-flex align-items-center justify-content-center"
                    style={minHeightContainer}
                  >
                    <div className="w-100" style={maxWidthCard}>
                      <UpdateProfile />
                    </div>
                  </div>
                </PrivateRoute>
              }
            />
            <Route
              path="/signup"
              element={
                <AuthLayout>
                  <Signup />
                </AuthLayout>
              }
            />
            <Route
              path="/login"
              element={
                <AuthLayout>
                  <Login />
                </AuthLayout>
              }
            />
            <Route
              path="/dealer-login"
              element={
                <AuthLayout>
                  <DealerLogin />
                </AuthLayout>
              }
            />
            <Route
              path="/forgot-password"
              element={
                <AuthLayout>
                  <ForgotPassword />
                </AuthLayout>
              }
            />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </Container>
  );
}

export default App;
