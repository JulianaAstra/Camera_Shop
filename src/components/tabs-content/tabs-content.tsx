import { AppRoute } from '../../const';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

type TabsContentProps = {
  vendorCode: string;
  category: string;
  type: string;
  description: string;
  level: string;
  id: number;
}

enum TabName {
  Description = 'description',
  Characteristics = 'characteristics'
}

function TabsContentComponent({vendorCode, category, type, level, description, id}: TabsContentProps): JSX.Element {
  const [activeTab, setActiveTab] = useState<string | undefined>(TabName.Description);
  const [locationUrl, setLocationUrl] = useState('');

  useEffect(() => {
    setLocationUrl(`${AppRoute.Product}/${id}`);
  }, [id]);

  const handleClick = (tabName: string | undefined) => {
    setActiveTab(tabName);
  };

  return (


    <div className="tabs product__tabs">

      <div className="tabs__controls product__tabs-controls">

        <Link to={`${locationUrl}${AppRoute.Characteristics}`}>
          <button type="button"
            onClick={(evt) => handleClick(evt.currentTarget.dataset.link)}
            className={`tabs__control ${activeTab === TabName.Characteristics ? 'is-active' : ''}`}
            data-link={TabName.Characteristics}
          >
                    Характеристики
          </button>
        </Link>

        <Link to={`${locationUrl}${AppRoute.Description}`}>
          <button type="button"
            data-link={TabName.Description}
            onClick={(evt) => handleClick(evt.currentTarget.dataset.link)}
            className={`tabs__control ${activeTab === TabName.Description ? 'is-active' : ''}`}
          >
                    Описание
          </button>
        </Link>

      </div>


      <div className="tabs__content">
        <div
          data-tab={TabName.Characteristics}
          className={`tabs__element ${activeTab === TabName.Characteristics ? 'is-active' : ''}`}
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
          className={`tabs__element ${activeTab === TabName.Description ? 'is-active' : ''}`}
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

