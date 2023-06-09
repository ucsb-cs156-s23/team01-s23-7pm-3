import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "main/pages/HomePage";
import AvilaBeachPage from "main/pages/Towns/AvilaBeachPage";
import LosAlamosPage from "main/pages/Towns/LosAlamosPage";
import ArroyoGrandePage from "main/pages/Towns/ArroyoGrandePage";

import "bootstrap/dist/css/bootstrap.css";
import RestaurantCreatePage from "main/pages/Restaurants/RestaurantCreatePage";
import RestaurantEditPage from "main/pages/Restaurants/RestaurantEditPage";
import RestaurantIndexPage from "main/pages/Restaurants/RestaurantIndexPage";
import RestaurantDetailsPage from "main/pages/Restaurants/RestaurantDetailsPage";

import AmusementParksCreatePage from "main/pages/AmusementParks/AmusementParkCreatePage";
import AmusementParksEditPage from "main/pages/AmusementParks/AmusementParkEditPage";
import AmusementParksIndexPage from "main/pages/AmusementParks/AmusementParksIndexPage";
import AmusementParksDetailsPage from "main/pages/AmusementParks/AmusementParksDetailsPage";

import BookCreatePage from "main/pages/Books/BookCreatePage";
import BookEditPage from "main/pages/Books/BookEditPage";
import BookIndexPage from "main/pages/Books/BookIndexPage";
import BookDetailsPage from "main/pages/Books/BookDetailsPage";

import IceCreamShopCreatePage from "main/pages/IceCreamShops/IceCreamShopCreatePage";
import IceCreamShopEditPage from "main/pages/IceCreamShops/IceCreamShopEditPage";
import IceCreamShopIndexPage from "main/pages/IceCreamShops/IceCreamShopIndexPage";
import IceCreamShopDetailsPage from "main/pages/IceCreamShops/IceCreamShopDetailsPage";

function App() {

  const reload = () => window.location.reload();

  return (
    <BrowserRouter basename="/team01-s23-7pm-3">
      <Routes>
        <Route path="/storybook-static" onEnter={reload} />
        <Route exact path="/" element={<HomePage />} />

        <Route exact path="/towns/AvilaBeach" element={<AvilaBeachPage />} />
        <Route exact path="/towns/LosAlamos" element={<LosAlamosPage />} />
        <Route exact path="/towns/ArroyoGrande" element={<ArroyoGrandePage />} />

        <Route exact path="/restaurants/create" element={<RestaurantCreatePage />} />
        <Route exact path="/restaurants/edit/:id" element={<RestaurantEditPage />} />
        <Route exact path="/restaurants/details/:id" element={<RestaurantDetailsPage />} />
        <Route exact path="/restaurants/" element={<RestaurantIndexPage />} />

        <Route exact path="/books/create" element={<BookCreatePage />} />
        <Route exact path="/books/edit/:id" element={<BookEditPage />} />
        <Route exact path="/books" element={<BookIndexPage />} />
        <Route exact path="/books/details/:id" element={<BookDetailsPage />} />

        <Route exact path="/iceCreamShops/create" element={<IceCreamShopCreatePage />} />
        <Route exact path="/iceCreamShops/edit/:id" element={<IceCreamShopEditPage />} />
        <Route exact path="/iceCreamShops" element={<IceCreamShopIndexPage />} />
        <Route exact path="/iceCreamShops/details/:id" element={<IceCreamShopDetailsPage />} />

        <Route exact path="/amusementParks/create" element={<AmusementParksCreatePage />} />
        <Route exact path="/amusementParks/edit/:id" element={<AmusementParksEditPage />} />
        <Route exact path="/amusementParks/details/:id" element={<AmusementParksDetailsPage />} />
        <Route exact path="/amusementParks/" element={<AmusementParksIndexPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
