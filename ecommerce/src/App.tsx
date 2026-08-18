import "./App.css";
import { Routes, Route } from "react-router-dom";
import ProductAll from "./page/ProductAll";
import Login from "./page/Login";
import ProductDetail from "./page/ProductDetail";
import Navbar from "./component/Navbar";

/**
 * 1. 전체 상품 페이지, 로그인, 상품detail page
 * 1-1. navBar
 * 2. 전체 상품페이지에서는 전체 상품 볼 수 있다
 * 3. login -> login page
 * 4. detail page withoit login -> login
 * 5. login되어야 디테일페이지
 * 6. 로그아웃 버튼 -> 로그아웃되기
 * 7. 로그아웃 되면 상품 디테일페이지 볼 수 없음, 다시 로그인페이지 보여주기
 * 8. 로그인 -> 로그아웃 버튼보이기 로그아웃 -> 로그인 버튼보이기
 * 9. 상품 검색 가능
 */

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="" element={<ProductAll />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/product/:id" element={<ProductDetail />}></Route>
      </Routes>
    </>
  );
}

export default App;
