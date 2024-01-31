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
  UserProcess: 'USER_PROCESS',
} as const;

export enum APIRoute {
  Cards = '/cameras',
  Promo = '/promo',
  Similar = '/similar',
  Reviews = '/reviews'
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
