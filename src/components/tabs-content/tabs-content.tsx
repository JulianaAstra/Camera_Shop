import { AppRoute } from '../../const';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { TabName } from '../../const';
import { useAppDispatch } from '../../hooks/use-app-dispatch/use-app-dispatch';
// import { useAppSelector } from '../../hooks/use-app-selector/use-app-selector';
// import { getActiveTab } from '../../store/app-data/selectors';
// import { setActiveTab } from '../../store/app-data/app-data';
import { useParams } from 'react-router-dom';

type TabsContentProps = {
  vendorCode: string;
  category: string;
  type: string;
  description: string;
  level: string;
  id: number;
}

function TabsContentComponent({vendorCode, category, type, level, description, id}: TabsContentProps): JSX.Element {
  const {tab} = useParams();

  // const dispatch = useAppDispatch();

  // const activeTabFromLocalStorage = localStorage.getItem('activeTab');
  // const activeTab = useAppSelector(getActiveTab);

  // useEffect(() => {
  //   if (activeTabFromLocalStorage !== null) {
  //     dispatch(setActiveTab(localStorage.getItem('activeTab')));
  //   }
  // }, [activeTabFromLocalStorage, dispatch]);


  // useEffect(() => {
  //   if (activeTab) {
  //     localStorage.setItem('activeTab', activeTab);
  //   }
  // }, [activeTab, dispatch]);

  useEffect(() => {
    console.log(tab);
  }, [tab]);

  // const handleClick = (tabName: string | undefined) => {
  //   if (tabName) {
  //     dispatch(setActiveTab(tabName));
  //     localStorage.setItem('activeTab', tabName);
  //   }
  // };

  return (


    <div className="tabs product__tabs">

      <div className="tabs__controls product__tabs-controls">

        <Link to={`${AppRoute.Product}/${id}${AppRoute.Characteristics}`}>
          <button type="button"
            // onClick={(evt) => handleClick(evt.currentTarget.dataset.link)}
            className={`tabs__control ${tab === TabName.Characteristics ? 'is-active' : ''}`}
            data-link={TabName.Characteristics}
          >
                    Характеристики
          </button>
        </Link>

        <Link to={`${AppRoute.Product}/${id}${AppRoute.Description}`}>
          <button type="button"
            data-link={TabName.Description}
            // onClick={(evt) => handleClick(evt.currentTarget.dataset.link)}
            className={`tabs__control ${tab === TabName.Description ? 'is-active' : ''}`}
          >
                    Описание
          </button>
        </Link>

      </div>


      <div className="tabs__content">
        <div
          data-tab={TabName.Characteristics}
          className={`tabs__element ${tab === TabName.Characteristics ? 'is-active' : ''}`}
        >
          <ul className="product__tabs-list">
            <li className="item-list">
              <span className="item-list__title">Артикул:</span>
              <p className="item-list__text"> {vendorCode}</p>
            </li>
            <li className="item-list">
              <span className="item-list__title">Категория:</span>
              <p className="item-list__text">{category}</p>
            </li>
            <li className="item-list">
              <span className="item-list__title">Тип камеры:</span>
              <p className="item-list__text">{type}</p>
            </li>
            <li className="item-list">
              <span className="item-list__title">Уровень:</span>
              <p className="item-list__text">{level}</p>
            </li>
          </ul>
        </div>
        <div
          data-tab={TabName.Description}
          className={`tabs__element ${tab === TabName.Description ? 'is-active' : ''}`}
        >
          <div className="product__tabs-text">
            <p>
              {description}
            </p>
            {/* <p>
                        Вы&nbsp;тоже можете прикоснуться к&nbsp;волшебству
                        аналоговой съёмки, заказав этот чудо-аппарат. Кто знает,
                        может с&nbsp;Das Auge IV&nbsp;начнётся ваш путь
                        к&nbsp;наградам всех престижных кинофестивалей.
                          </p> */}
          </div>
        </div>
      </div>


    </div>


  );
}

export default TabsContentComponent;

