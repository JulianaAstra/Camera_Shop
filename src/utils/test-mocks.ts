import { Card } from '../types/card';
import { PromoCard } from '../types/promo-card';
import { Review } from '../types/review';

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

export const makeFakeReview = (): Review => ({
  id: 434345345,
  userName: 'loremlorem',
  advantage: 'loremloremloremloremloremloremloremloremloremloremloremlorem',
  disadvantage: 'loremloremloremloremloremloremloremloremlor',
  review: 'loremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremlorem',
  rating: 2,
  createAt: '12-14-2009',
  cameraId: 45,
} as Review);
