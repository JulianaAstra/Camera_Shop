import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

import './style.css';

function Banner(): JSX.Element {

  const pagination = {
    clickable: true,
    renderBullet: function (index, className) {
      return `<span class="${ className }"></span>`;
    },
  };

  return (
    <Swiper
      pagination={pagination}
      modules={[Pagination]}
      className='swiper'
    >

      <SwiperSlide>
        <div className="banner">
          <picture>
            <source
              type="image/webp"
              srcSet="img/content/banner-bg.webp, img/content/banner-bg@2x.webp 2x"
            />
            <img
              src="img/content/banner-bg.jpg"
              srcSet="img/content/banner-bg@2x.jpg 2x"
              width={1280}
              height={280}
              alt="баннер"
            />
          </picture>
          <p className="banner__info">
            <span className="banner__message">Новинка!</span>
            <span className="title title--h1">
        Cannonball&nbsp;Pro&nbsp;MX&nbsp;8i
            </span>
            <span className="banner__text">
        Профессиональная камера от&nbsp;известного производителя
            </span>
            <a className="btn" href="#">
        Подробнее
            </a>
          </p>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="banner">
          <picture>
            <source
              type="image/webp"
              srcSet="img/content/banner-bg.webp, img/content/banner-bg@2x.webp 2x"
            />
            <img
              src="img/content/banner-bg.jpg"
              srcSet="img/content/banner-bg@2x.jpg 2x"
              width={1280}
              height={280}
              alt="баннер"
            />
          </picture>
          <p className="banner__info">
            <span className="banner__message">Новинка!</span>
            <span className="title title--h1">
        Cannonball&nbsp;Pro&nbsp;MX&nbsp;8i
            </span>
            <span className="banner__text">
        Профессиональная камера от&nbsp;известного производителя
            </span>
            <a className="btn" href="#">
        Подробнее
            </a>
          </p>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="banner">
          <picture>
            <source
              type="image/webp"
              srcSet="img/content/banner-bg.webp, img/content/banner-bg@2x.webp 2x"
            />
            <img
              src="img/content/banner-bg.jpg"
              srcSet="img/content/banner-bg@2x.jpg 2x"
              width={1280}
              height={280}
              alt="баннер"
            />
          </picture>
          <p className="banner__info">
            <span className="banner__message">Новинка!</span>
            <span className="title title--h1">
        Cannonball&nbsp;Pro&nbsp;MX&nbsp;8i
            </span>
            <span className="banner__text">
        Профессиональная камера от&nbsp;известного производителя
            </span>
            <a className="btn" href="#">
        Подробнее
            </a>
          </p>
        </div>
      </SwiperSlide>
    </Swiper>
  );
}

export default Banner;

