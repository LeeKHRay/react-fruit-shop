import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PageLayout } from './layouts';
import { PrivateRoute, BeforeLoginRoute } from './routes';
import { Checkout, ProductList, ProductDetail, Login, Signup, NotFound } from './pages';
import { AuthProvider, CartProvider, ProductListProvider } from './contexts';

function App() {
    return (
        <AuthProvider>
            <ProductListProvider>
                <CartProvider>
                    <BrowserRouter>
                        <Routes>
                            <Route element={<PageLayout />}>
                                <Route path="/" element={<ProductList />} />
                                <Route path="product/:id" element={<ProductDetail />} />
                                <Route element={<PrivateRoute />}>
                                    <Route path="/checkout" element={<Checkout />} />
                                </Route>
                                <Route element={<BeforeLoginRoute />}>
                                    <Route path="/login" element={<Login />} />
                                    <Route path="/signup" element={<Signup />} />
                                </Route>
                            </Route>

                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </BrowserRouter>
                </CartProvider>
            </ProductListProvider>
        </AuthProvider>
    );
}

export default App;
