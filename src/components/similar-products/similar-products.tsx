
import { useAppSelector } from '../../hooks/use-app-selector/use-app-selector';
import { getSimilarCards } from '../../store/app-data/selectors';
import { Card } from '../../types/card';
import CardComponent from '../card/card';

type SimilarProductsProps = {
  handleBuyClick: (cardIdValue: number | null) => void;
}
;
function SimilarProductsComponent({handleBuyClick}: SimilarProductsProps): JSX.Element {
  const similarCards: Card[] | null = useAppSelector(getSimilarCards);

  return (
    <div id="similar-cards-swiper" className="page-content__section">
      <section className="product-similar">
        <div className="container">
          <h2 className="title title--h3">Похожие товары</h2>
          <div className="product-similar__slider">

            <div className="product-similar__slider-list">
              {similarCards !== null ? similarCards.map((card) => (
                <CardComponent activeClass={'is-active'} handleClick={handleBuyClick} key={card.id} card={card}/>

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
