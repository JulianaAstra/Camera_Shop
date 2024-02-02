export function isUserNameValid(username: string): boolean {
  const usernameLength: number = username.trim().length;
  return usernameLength > 1 && usernameLength <= 15;
}

export function isReviewTextValid(reviewText: string): boolean {
  const reviewTextLength: number = reviewText.trim().length;
  return reviewTextLength >= 10 && reviewTextLength <= 160;
}

export function isRatingNumberValid(rating: number): boolean {
  return Number.isInteger(rating) && rating > 0 && rating <= 5;
}
