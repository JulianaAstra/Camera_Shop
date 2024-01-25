export enum AppRoute {
  Root = '/',
  Product = '/camera',
  Basket = '/basket',
  Error = '/404'
}

export const NameSpace = {
  AppData: 'APP_DATA',
  UserData: 'USER_DATA',
  UserProcess: 'USER_PROCESS',
} as const;

export enum APIRoute {
  Cards = '/cameras',
  Promo = '/promo'
}

export const totalStars = 5;
