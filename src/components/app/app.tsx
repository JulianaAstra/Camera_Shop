import { HelmetProvider } from 'react-helmet-async';
import { Routes, Route } from 'react-router-dom';
import MainPageComponent from '../../pages/main-page/main-page';
import { AppRoute } from '../../const';
import { useAppSelector } from '../../hooks/use-app-selector/use-app-selector';
import HistoryRouter from '../history-route/history-route';
import browserHistory from '../../browser-history';
import { getCardsDataLoadingStatus } from '../../store/app-data/selectors';
import { fetchCardsAction } from '../../store/api-actions';
import { useAppDispatch } from '../../hooks/use-app-dispatch/use-app-dispatch';
import { useEffect } from 'react';
import LoadingScreen from '../../pages/loading-screen/loading-screen';
import { PaginationProvider } from '../pagination/pagination-context';

function App(): JSX.Element {
  const dispatch = useAppDispatch();

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      dispatch(fetchCardsAction());
    }
    return () => {
      isMounted = false;
    };
  }, [dispatch]);

  const isCardsDataLoading = useAppSelector(getCardsDataLoadingStatus);

  if (isCardsDataLoading) {
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
        </PaginationProvider>
      </HistoryRouter>
    </HelmetProvider>
  );
}

export default App;
