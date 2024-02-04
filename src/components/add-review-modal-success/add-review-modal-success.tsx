import { handleOverlayClick } from '../../utils';
import useEscapeBtnClick from '../../hooks/use-escape-btn-click/use-escape-btn-click';

type AddReviewModalSuccessProps = {
  handleCloseClick: () => void;
}

function AddReviewModalSuccessComponent({handleCloseClick}: AddReviewModalSuccessProps): JSX.Element {

  useEscapeBtnClick(handleCloseClick);

  return (
    <div className="modal is-active modal--narrow">
      <div className="modal__wrapper">
        <div className="modal__overlay" onClick={(evt) => handleOverlayClick(evt, handleCloseClick)}/>
        <div className="modal__content">
          <p className="title title--h4">Спасибо за отзыв</p>
          <svg className="modal__icon" width={80} height={78} aria-hidden="true">
            <use xlinkHref="#icon-review-success" />
          </svg>
          <div className="modal__buttons">
            <button
              onClick={() => handleCloseClick()}
              className="btn btn--purple modal__btn modal__btn--fit-width"
              type="button"
            >
          Вернуться к покупкам
            </button>
          </div>
          <button
            className="cross-btn"
            type="button"
            aria-label="Закрыть попап"
            onClick={() => handleCloseClick()}
          >
            <svg width={10} height={10} aria-hidden="true">
              <use xlinkHref="#icon-close" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddReviewModalSuccessComponent;
