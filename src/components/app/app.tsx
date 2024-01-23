import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPageComponent from '../../pages/main-page/main-page';
import { AppRoute } from '../../const';

function App(): JSX.Element {
  return (
    <HelmetProvider>
      <Router>
        <Routes>
          <Route
            path={AppRoute.Root}
            element={<MainPageComponent />}
          />
          {/* <Route
          path={`${AppRoute.Product}/:id`}
          element={<ProductPageComponent />}
        />
        <Route
          path={AppRoute.Basket}
          element={<BasketPageComponent />}
        />
        <Route
          path='*'
          element={<Page404 />}
        /> */}
        </Routes>
      </Router>
    </HelmetProvider>
  );
}

export default App;
