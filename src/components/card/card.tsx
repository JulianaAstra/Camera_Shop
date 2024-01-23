import { Card } from '../../types/card';
import RateStarsComponent from '../../rate-stars/rate-stars';

type CardProps = {
  card: Card;
}

function CardComponent({card}: CardProps): JSX.Element {
  const {name, previewImg, price, previewImg2x, previewImgWebp, previewImgWebp2x, rating, reviewCount} = card;

  return (
    <div className="product-card">
      <div className="product-card__img">
        <picture>
          <source
            type="image/webp"
            srcSet={`${previewImgWebp}, ${previewImgWebp2x}`}
          />
          <img
            src={previewImg}
            srcSet={`${previewImg2x} 2x`}
            width={280}
            height={240}
            alt={name}
          />
        </picture>
      </div>
      <div className="product-card__info">
        <RateStarsComponent rating={rating} reviewCount={reviewCount} />
        <p className="product-card__title">
          {name}
        </p>
        <p className="product-card__price">
          <span className="visually-hidden">Цена:</span>{price}
        </p>
      </div>
      <div className="product-card__buttons">
        <button
          className="btn btn--purple product-card__btn"
          type="button"
        >
                      Купить
        </button>
        <a className="btn btn--transparent" href="#">
                      Подробнее
        </a>
      </div>
    </div>
  );
}

export default CardComponent;
