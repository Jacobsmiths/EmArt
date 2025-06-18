import {
    Route,
    createBrowserRouter,
    createRoutesFromElements,
    RouterProvider,
    Navigate,
} from "react-router-dom";
import MainLayout from "./Layouts/MainLayout";
import HomePage from "./Pages/HomePage";
import NotFoundPage from "./Pages/NotFoundPage";
import LoginPage from "./Pages/LoginPage";
import { AuthProvider } from "./Contexts/AuthContext";
import AdminRoutes from "./Routes/AdminRoutes";
import AdminPage from "./Pages/AdminPage";
import GalleryPage from "./Pages/GalleryPage";
import PaintingPage from "./Pages/PaintingPage";
import { CartProvider } from "./Contexts/CartContext";
import CheckoutPage from "./Pages/CheckoutPage";
import CartPage from "./Pages/CartPage";
import FooterlessLayout from "./Layouts/FooterlessLayout";
import RegisterPage from "./Pages/RegisterPage";
import AboutPage from "./Pages/AboutPage";
// import { loadStripe } from "@stripe/stripe-js";
// const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const App = () => {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <>
                <Route path="/" element={<MainLayout />}>
                    <Route index element={<GalleryPage />} />
                    <Route path="cart" element={<CartPage />} />
                    <Route path="painting/:id" element={<PaintingPage />} />
                    <Route path="*" element={<NotFoundPage />} />
                    <Route path="/home" element={<Navigate to="/" />} />
                </Route>
                <Route path="/" element={<FooterlessLayout />}>
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="checkout" element={<CheckoutPage />} />
                    <Route path="login" element={<LoginPage />} />
                    <Route element={<AdminRoutes />}>
                        <Route path="/admin" element={<AdminPage />} />
                    </Route>
                </Route>
            </>
        )
    );

    return (
        <AuthProvider>
            <CartProvider>
                <RouterProvider router={router} />
            </CartProvider>
        </AuthProvider>
    );
};

export default App;
