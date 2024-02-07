import { Card } from '../types/card';
import { PromoCard } from '../types/promo-card';
import { Review, UserReview } from '../types/review';

export const makeFakeCard = (): Card => ({
  id: 34,
  name: 'loremlorem',
  vendorCode: 'EF5GH6',
  type: 'LOREMLOREM',
  category: 'LOREMLOREM',
  description: 'LoremIpsumLoremIpsumLoremIpsumLoremIpsumLoremIpsumLoremIpsumLoremIpsumLoremIpsumLoremIpsumLoremIpsumLoremIpsumLoremIpsumLoremIpsum',
  previewImg: 'images/url.jpg',
  level: 'kdjfgh',
  price: 45677,
  previewImg2x: 'images/url.jpg',
  previewImgWebp: 'images/url.jpg',
  previewImgWebp2x: 'images/url.jpg',
  rating: 4,
  reviewCount: 345,
} as Card);

export const makeFakePromoCard = (): PromoCard => ({
  id: 14,
  name: 'loremlorem',
  previewImg: 'images/url.jpg',
  previewImg2x: 'images/url.jpg',
  previewImgWebp: 'images/url.jpg',
  previewImgWebp2x: 'images/url.jpg',
} as PromoCard);


export const makeFakeUserReview = (): UserReview => ({
  cameraId: 34,
  userName: 'Кирилл',
  advantage: 'Легкая в плане веса, удобная в интерфейсе',
  disadvantage: 'Быстро садится зарядка',
  review: 'Это моя первая камера. Я в восторге, нареканий нет',
  rating: 5

} as UserReview);

export const makeFakeReviews = (): Review[] => ([
  {
    id: 434345345,
    userName: 'loremlorem',
    advantage: 'loremloremloremloremloremloremloremloremloremloremloremlorem',
    disadvantage: 'loremloremloremloremloremloremloremloremlor',
    review: 'loremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremlorem',
    rating: 2,
    createAt: '2023-10-31T09:38:11.174Z',
    cameraId: 45,
  },
  {
    id: 434345345,
    userName: 'loremlorem',
    advantage: 'loremloremloremloremloremloremloremloremloremloremloremlorem',
    disadvantage: 'loremloremloremloremloremloremloremloremlor',
    review: 'loremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremlorem',
    rating: 2,
    createAt: '2023-07-24T09:38:11.177Z',
    cameraId: 45,
  },
  {
    id: 434345345,
    userName: 'loremlorem',
    advantage: 'loremloremloremloremloremloremloremloremloremloremloremlorem',
    disadvantage: 'loremloremloremloremloremloremloremloremlor',
    review: 'loremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremlorem',
    rating: 2,
    createAt: '2023-08-22T09:38:11.177Z',
    cameraId: 45,
  }] as Review[]);

export const makeFakeSortedReviews = (): Review[] => ([
  {
    id: 434345345,
    userName: 'loremlorem',
    advantage: 'loremloremloremloremloremloremloremloremloremloremloremlorem',
    disadvantage: 'loremloremloremloremloremloremloremloremlor',
    review: 'loremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremlorem',
    rating: 2,
    createAt: '2023-10-31T09:38:11.174Z',
    cameraId: 45,
  },
  {
    id: 434345345,
    userName: 'loremlorem',
    advantage: 'loremloremloremloremloremloremloremloremloremloremloremlorem',
    disadvantage: 'loremloremloremloremloremloremloremloremlor',
    review: 'loremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremlorem',
    rating: 2,
    createAt: '2023-08-22T09:38:11.177Z',
    cameraId: 45,
  },
  {
    id: 434345345,
    userName: 'loremlorem',
    advantage: 'loremloremloremloremloremloremloremloremloremloremloremlorem',
    disadvantage: 'loremloremloremloremloremloremloremloremlor',
    review: 'loremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremlorem',
    rating: 2,
    createAt: '2023-07-24T09:38:11.177Z',
    cameraId: 45,
  }] as Review[]);
