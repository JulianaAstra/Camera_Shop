import ReviewsListComponent from '../reviews-list/reviews-list';

function ReviewsComponent(): JSX.Element {

  return (
    <div className="page-content__section">
      <section className="review-block">
        <div className="container">
          <div className="page-content__headed">
            <h2 className="title title--h3">Отзывы</h2>
            <button className="btn" type="button">
                Оставить свой отзыв
            </button>
          </div>
          <ReviewsListComponent />
          <div className="review-block__buttons">
            <button className="btn btn--purple" type="button">
                Показать больше отзывов
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ReviewsComponent;
