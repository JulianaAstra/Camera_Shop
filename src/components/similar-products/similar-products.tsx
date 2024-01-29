
import { useAppSelector } from '../../hooks/use-app-selector/use-app-selector';
import { getSimilarCards } from '../../store/app-data/selectors';
import { Card } from '../../types/card';
import CardComponent from '../card/card';


function SimilarProductsComponent(clickHandler): JSX.Element {
  const similarCards: Card[] | null = useAppSelector(getSimilarCards);

  return (
    <div id="similar-cards-swiper" className="page-content__section">
      <section className="product-similar">
        <div className="container">
          <h2 className="title title--h3">Похожие товары</h2>
          <div className="product-similar__slider">

            <div className="product-similar__slider-list">
              {similarCards !== null ? similarCards.map((card) => (
                <CardComponent activeClass={'is-active'} handleClick={clickHandler} key={card.id} card={card}/>
                // <div key={id} className="product-card is-active">
                //   <div className="product-card__img">
                //     <picture>
                //       <source
                //         type={`../${previewImg}`}
                //         srcSet={`../${previewImgWebp}, ../${previewImgWebp2x} 2x`}
                //       />
                //       <img
                //         src={`..${previewImg}`}
                //         srcSet="../img/content/fast-shot@2x.jpg 2x"
                //         width={280}
                //         height={240}
                //         alt="Фотоаппарат FastShot MR-5"
                //       />
                //     </picture>
                //   </div>
                //   <div className="product-card__info">
                //     <div className="rate product-card__rate">
                //       <svg width={17} height={16} aria-hidden="true">
                //         <use xlinkHref="#icon-full-star" />
                //       </svg>
                //       <svg width={17} height={16} aria-hidden="true">
                //         <use xlinkHref="#icon-full-star" />
                //       </svg>
                //       <svg width={17} height={16} aria-hidden="true">
                //         <use xlinkHref="#icon-full-star" />
                //       </svg>
                //       <svg width={17} height={16} aria-hidden="true">
                //         <use xlinkHref="#icon-full-star" />
                //       </svg>
                //       <svg width={17} height={16} aria-hidden="true">
                //         <use xlinkHref="#icon-star" />
                //       </svg>
                //       <p className="visually-hidden">Рейтинг: 4</p>
                //       <p className="rate__count">
                //         <span className="visually-hidden">Всего оценок:</span>12
                //       </p>
                //     </div>
                //     <p className="product-card__title">FastShot MR-5</p>
                //     <p className="product-card__price">
                //       <span className="visually-hidden">Цена:</span>18 970 ₽
                //     </p>
                //   </div>
                //   <div className="product-card__buttons">
                //     <button
                //       className="btn btn--purple product-card__btn"
                //       type="button"
                //     >
                //       Купить
                //     </button>
                //     <a className="btn btn--transparent" href="#">
                //       Подробнее
                //     </a>
                //   </div>
                // </div>
              )) : ''}
            </div>
            <button
              className="slider-controls slider-controls--prev"
              type="button"
              aria-label="Предыдущий слайд"

            >
              <svg width={7} height={12} aria-hidden="true">
                <use xlinkHref="#icon-arrow" />
              </svg>
            </button>
            <button
              className="slider-controls slider-controls--next"
              type="button"
              aria-label="Следующий слайд"
            >
              <svg width={7} height={12} aria-hidden="true">
                <use xlinkHref="#icon-arrow" />
              </svg>
            </button>

          </div>
        </div>
      </section>
    </div>
  );
}

export default SimilarProductsComponent;
