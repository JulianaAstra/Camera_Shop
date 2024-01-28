import { HelmetProvider } from 'react-helmet-async';
import { Routes, Route } from 'react-router-dom';
import MainPageComponent from '../../pages/main-page/main-page.tsx';
import ProductPageComponent from '../../pages/product/product.tsx';
import { AppRoute } from '../../const.ts';
import { useAppSelector } from '../../hooks/use-app-selector/use-app-selector.ts';
import HistoryRouter from '../history-route/history-route.tsx';
import browserHistory from '../../browser-history.ts';
import { getCardsDataLoadingStatus, getPromoCardsDataLoadingStatus } from '../../store/app-data/selectors.ts';
import { fetchCardsAction, fetchPromoCardsAction } from '../../store/api-actions.ts';
import { useAppDispatch } from '../../hooks/use-app-dispatch/use-app-dispatch.ts';
import { useEffect } from 'react';
import LoadingScreen from '../../pages/loading-screen/loading-screen.tsx';
import { PaginationProvider } from '../pagination/pagination-context.tsx';

function App(): JSX.Element {
  const dispatch = useAppDispatch();

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      dispatch(fetchCardsAction());
      dispatch(fetchPromoCardsAction());
    }
    return () => {
      isMounted = false;
    };
  }, [dispatch]);

  const isCardsDataLoading = useAppSelector(getCardsDataLoadingStatus);
  const isPromoCardsLoading = useAppSelector(getPromoCardsDataLoadingStatus);

  if (isCardsDataLoading || isPromoCardsLoading) {
    return (
      <LoadingScreen />
    );
  }

  return (
    <HelmetProvider>
      <HistoryRouter history={browserHistory}>
        <PaginationProvider>
          <Routes>
            <Route
              path={`${AppRoute.Root}`}
              element={<MainPageComponent />}
            />
            <Route
              path={`${AppRoute.Root}/:pageNumber`}
              element={<MainPageComponent />}
            />
            <Route
              path={`${AppRoute.Product}/:id`}
              element={<ProductPageComponent />}
            />
            <Route
              path={`${AppRoute.Product}/:id${AppRoute.Description}`}
              element={<ProductPageComponent />}
            />
            <Route
              path={`${AppRoute.Product}/:id${AppRoute.Characteristics}`}
              element={<ProductPageComponent />}
            />
            {/*<Route
          path={AppRoute.Basket}
          element={<BasketPageComponent />}
        />
        <Route
          path='*'
          element={<Page404 />}
        /> */}
          </Routes>
        </PaginationProvider>
      </HistoryRouter>
    </HelmetProvider>
  );
}

export default App;
