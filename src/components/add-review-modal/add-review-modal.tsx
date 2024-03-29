import { useState, useRef, useEffect } from 'react';
import { isUserNameValid, isRatingNumberValid, isReviewTextValid } from './utils';
import { ReviewFormData } from '../../const';
import { ratingStars } from '../../const';
import { Fragment } from 'react';
import { fetchAddReviewAction } from '../../store/api-actions';
import { useAppDispatch } from '../../hooks/use-app-dispatch/use-app-dispatch';
import { RefObject } from 'react';
import { SyntheticEvent } from 'react';
import { UserReview } from '../../types/review';

import { getCardReviewsDataLoadingStatus } from '../../store/app-data/selectors';
import { useAppSelector } from '../../hooks/use-app-selector/use-app-selector';

import { handleOverlayClick } from '../../utils';
import useEscapeBtnClick from '../../hooks/use-escape-btn-click/use-escape-btn-click';
import useTabSwitch from '../../hooks/useTabSwitch/useTabSwitch';

type AddReviewModalProps<T> = {
  handleCloseClick: (value?: T) => void;
  cameraId: number;
  isOpen: boolean;
  setReviewSuccess: (arg0: boolean) => void;
}
interface ReviewRefObject<T> {
  name: T | null;
}

function AddReviewModalComponent({handleCloseClick, cameraId, isOpen, setReviewSuccess}: AddReviewModalProps<boolean>): JSX.Element {

  const dispatch = useAppDispatch();
  const isReviewLoading = useAppSelector(getCardReviewsDataLoadingStatus);

  const [isNameValid, setIsNameValid] = useState(true);
  const [isAdvantageValid, setIsAdvantageValid] = useState(true);
  const [isDisadvantageValid, setIsDisadvantageValid] = useState(true);
  const [isReviewValid, setIsReviewValid] = useState(true);
  const [isRatingValid, setIsRatingValid] = useState(true);
  const [userRate, setUserRate] = useState(0);

  const [formData, setFormData] = useState<UserReview | null>(null);

  const userNameRef = useRef<HTMLInputElement | null>(null);
  const advantageRef = useRef<HTMLInputElement | null>(null);
  const disadvantageRef = useRef<HTMLInputElement | null>(null);
  const reviewRef = useRef<HTMLTextAreaElement | null>(null);
  const modalRef = useRef<HTMLInputElement | null>(null);

  const validateFormData = (ref: RefObject<ReviewRefObject<string>>): void => {
    if(ref.current) {
      switch (ref.current.name) {
        case ReviewFormData.UserName:
          if (userNameRef.current) {
            setIsNameValid(isUserNameValid(userNameRef.current.value));
          }
          break;
        case ReviewFormData.Advantage:
          if (advantageRef.current) {
            setIsAdvantageValid(isReviewTextValid(advantageRef.current.value));
          }
          break;
        case ReviewFormData.Disadvantage:
          if (disadvantageRef.current) {
            setIsDisadvantageValid(isReviewTextValid(disadvantageRef.current.value));
          }
          break;
        case ReviewFormData.Review:
          if (reviewRef.current) {
            setIsReviewValid(isReviewTextValid(reviewRef.current.value));
          }
          break;
        default:
          break;
      }
    }

  };

  useEffect(() => {
    if(formData !== null && Object.entries(formData).length !== 0) {
      dispatch(fetchAddReviewAction(formData));
      if(!isReviewLoading) {
        handleCloseClick();
        setReviewSuccess(true);
      }
    }
  }, [dispatch, formData, handleCloseClick, isReviewLoading, setReviewSuccess]);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    setIsRatingValid(isRatingNumberValid(userRate));
    if (userRate !== 0) {
      setFormData((prevData) => ({
        ...prevData,
        cameraId,
        userName: userNameRef.current?.value ?? '',
        advantage: advantageRef.current?.value ?? '',
        disadvantage: disadvantageRef.current?.value ?? '',
        review: reviewRef.current?.value ?? '',
        rating: userRate,
      }));
    }
  };

  useEscapeBtnClick(handleCloseClick);
  useTabSwitch(isOpen, modalRef, userNameRef);

  const isUserRateValid = (rate: number) => {
    setUserRate(rate);
    setIsRatingValid(isRatingNumberValid(rate));
  };

  const onCrossBtnClick = () => handleCloseClick();

  return (
    <div
      ref={modalRef}
      className="modal is-active"
    >
      <div className="modal__wrapper">
        <div className="modal__overlay" onClick={(evt) => handleOverlayClick(evt, handleCloseClick)}/>
        <div className="modal__content">
          <p className="title title--h4">Оставить отзыв</p>
          <div className="form-review">

            <form method="post"
              onSubmit={handleSubmit}
            >
              <div className="form-review__rate">
                <fieldset className={`rate form-review__item ${isRatingValid ? '' : 'is-invalid'}`}>
                  <legend className="rate__caption">
                Рейтинг
                    <svg width={9} height={9} aria-hidden="true">
                      <use xlinkHref="#icon-snowflake" />
                    </svg>
                  </legend>
                  <div className="rate__bar">
                    <div className="rate__group">
                      {ratingStars.map(({id, title, value}) => (
                        <Fragment key={id}>
                          <input
                            className="visually-hidden"
                            id={id}
                            name="rating"
                            type="radio"
                            onChange={() => isUserRateValid(value)}
                            value={value}
                          />
                          <label
                            className="rate__label"
                            htmlFor={id}
                            title={title}
                          />
                        </Fragment>
                      ))}
                    </div>
                    <div className="rate__progress">
                      <span className="rate__stars">0</span> <span>/</span>{' '}
                      <span className="rate__all-stars">5</span>
                    </div>
                  </div>
                  <p className="rate__message">Нужно оценить товар</p>
                </fieldset>


                <div className={`custom-input form-review__item ${isNameValid ? '' : 'is-invalid'}`}>
                  <label>
                    <span className="custom-input__label">
                  Ваше имя
                      <svg width={9} height={9} aria-hidden="true">
                        <use xlinkHref="#icon-snowflake" />
                      </svg>
                    </span>
                    <input
                      ref={userNameRef}
                      onBlur={() => validateFormData(userNameRef)}
                      defaultValue=''
                      type="text"
                      name="userName"
                      placeholder="Введите ваше имя"
                    />
                  </label>
                  <p className="custom-input__error">Нужно указать имя от 2 до 15 символов</p>
                </div>

                <div className={`custom-input form-review__item ${isAdvantageValid ? '' : 'is-invalid'}`}>
                  <label>
                    <span className="custom-input__label">
                  Достоинства
                      <svg width={9} height={9} aria-hidden="true">
                        <use xlinkHref="#icon-snowflake" />
                      </svg>
                    </span>
                    <input
                      onBlur={() => validateFormData(advantageRef)}
                      type="text"
                      name="advantage"
                      placeholder="Основные преимущества товара"
                      ref={advantageRef}
                      defaultValue=''
                    />
                  </label>
                  <p className="custom-input__error">Нужно указать достоинства</p>
                </div>
                <div className={`custom-input form-review__item ${isDisadvantageValid ? '' : 'is-invalid'}`}>
                  <label>
                    <span className="custom-input__label">
                  Недостатки
                      <svg width={9} height={9} aria-hidden="true">
                        <use xlinkHref="#icon-snowflake" />
                      </svg>
                    </span>
                    <input
                      onBlur={() => validateFormData(disadvantageRef)}
                      type="text"
                      name="disadvantage"
                      placeholder="Главные недостатки товара"
                      ref={disadvantageRef}
                      defaultValue=''
                    />
                  </label>
                  <p className="custom-input__error">Нужно указать недостатки</p>
                </div>
                <div className={`custom-textarea form-review__item ${isReviewValid ? '' : 'is-invalid'}`}>
                  <label>
                    <span className="custom-textarea__label">
                  Комментарий
                      <svg width={9} height={9} aria-hidden="true">
                        <use xlinkHref="#icon-snowflake" />
                      </svg>
                    </span>
                    <textarea
                      name="review"
                      onBlur={() => validateFormData(reviewRef)}
                      minLength={5}
                      placeholder="Поделитесь своим опытом покупки"
                      ref={reviewRef}
                      defaultValue=''
                    />
                  </label>
                  <div className="custom-textarea__error">
                Нужно добавить комментарий
                  </div>
                </div>
              </div>
              <button
                className="btn btn--purple form-review__btn"
                type="submit"
                disabled={!isNameValid || !isAdvantageValid || !isDisadvantageValid || !isReviewValid || !isRatingValid}
              >
            Отправить отзыв
              </button>
            </form>


          </div>
          <button
            onClick={onCrossBtnClick}
            className="cross-btn"
            type="button"
            aria-label="Закрыть попап"
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

export default AddReviewModalComponent;
