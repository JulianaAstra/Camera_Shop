export enum AppRoute {
  Root = '/',
  Product = '/camera',
  Basket = '/basket',
  Error = '/404',
  Description = '/description',
  Characteristics = '/characteristics'
}

export const NameSpace = {
  AppData: 'APP_DATA',
  UserData: 'USER_DATA',
} as const;

export enum APIRoute {
  Cards = '/cameras',
  Promo = '/promo',
  Similar = '/similar',
  Reviews = '/reviews',
}

export const totalStars = 5;

export enum TabName {
  Description = 'description',
  Characteristics = 'characteristics'
}

export const DateFormat = {
  DAY_MONTH : 'DD MMMM',
  YEAR_MONTH_DAY: 'YYYY-MM-DD',
};

export enum ReviewFormData {
  UserName = 'userName',
  Advantage = 'advantage',
  Disadvantage = 'disadvantage',
  Review = 'review',
}

export const ratingStars = [
  {
    id: 'star-5',
    title: 'Отлично',
    value: 5
  },
  {
    id: 'star-4',
    title: 'Хорошо',
    value: 4
  },
  {
    id: 'star-3',
    title: 'Нормально',
    value: 3
  },
  {
    id: 'star-2',
    title: 'Плохо',
    value: 2
  },
  {
    id: 'star-1',
    title: 'Ужасно',
    value: 1
  },
];

