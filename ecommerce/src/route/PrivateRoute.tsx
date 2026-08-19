import ProductDetail from "../page/ProductDetail";
import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
  authenticate: boolean;
}

function PrivateRoute({ authenticate }: PrivateRouteProps) {
  return authenticate ? <ProductDetail /> : <Navigate to="/login" />;
}

export default PrivateRoute;
