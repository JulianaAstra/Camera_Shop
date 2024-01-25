import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import { PromoCards } from '../../mocks/promo';

import 'swiper/css';
import 'swiper/css/pagination';

import './style.css';

function Banner(): JSX.Element {

  const pagination = {
    clickable: true,
    dynamicBullets: true,
    dynamicMainBullets: 3,
    renderBullet: function (index, className) {
      return `<span class="${ className }">${ index + 1 }</span>`;
    },
  };

  const autoplay = {
    delay: 3000,
    disableOnInteraction: false,
    pauseOnMouseEnter: true,
  };

  return (
    <Swiper
      modules={[Pagination, Autoplay]}
      pagination={pagination}
      autoplay={autoplay}
      className='bannerSwiper'
    >

      {PromoCards.map(({id, name, previewImg, previewImg2x, previewImgWebp, previewImgWebp2x}) => (
        <SwiperSlide key={id}>
          <div className="banner">
            <picture>
              <source
                type="image/webp"
                srcSet={`${previewImgWebp}, ${previewImgWebp2x} 2x"`}
              />
              <img
                src={previewImg}
                srcSet={`${previewImg2x} 2x`}
                width={1280}
                height={280}
                alt="баннер"
              />
            </picture>
            <p className="banner__info">
              <span className="banner__message">Новинка!</span>
              <span className="title title--h1">
                {name}
              </span>
              <span className="banner__text">
        Профессиональная камера от&nbsp;известного производителя
              </span>
              <a className="btn" href="#">
        Подробнее
              </a>
            </p>
          </div>
        </SwiperSlide>))}
    </Swiper>
  );
}

export default Banner;

