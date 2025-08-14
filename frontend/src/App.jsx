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
import ReturnPage from "./Pages/ReturnPage";
import AboutPage from "./Pages/AboutPage";
import PortfolioPage from "./Pages/PortfolioPage";
import ViewPaintingPage from "./Pages/ViewPaintingPage";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
    // this is the test publishable key
    "pk_live_51QWWzXP3msuX5JsQSplZGGjyhrOS45hW5DMNnmIlHfUri1nzUA4Jgx9a0SxMVtXRIHJT8ofwwjeyDuvjgaCMRPEk00oYLG2N4U"
);

const App = () => {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <>
                <Route path="/" element={<MainLayout />}>
                    <Route path="return" element={<ReturnPage />} />
                    <Route index element={<GalleryPage />} />
                    <Route path="cart" element={<CartPage />} />
                    <Route path="painting/:id" element={<PaintingPage />} />
                    <Route path="*" element={<NotFoundPage />} />
                    <Route path="/gallery" element={<Navigate to="/" />} />
                </Route>
                <Route path="/" element={<FooterlessLayout />}>
                    {/* <Route path="/register" element={<RegisterPage />} /> */}
                    <Route path="/about" element={<AboutPage />} />
                    <Route
                        path="checkout"
                        element={<CheckoutPage stripePromise={stripePromise} />}
                    />
                    <Route path="login" element={<LoginPage />} />
                    <Route path="/portfolio" element={<PortfolioPage />} />
                    <Route path="/view/:id" element={<ViewPaintingPage />} />
                    <Route element={<AdminRoutes />}>
                        <Route path="/administration" element={<AdminPage />} />
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
