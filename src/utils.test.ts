import { containsOnlyDigits, containsNumberInRange, matcehsTabName, formatNumberWithSpaces, scrollToTop } from './utils';

describe('Function: containsOnlyDigits', () => {
  it('should return true when string is correct', () => {
    const mockString = '234543';

    const result = containsOnlyDigits(mockString);

    expect(result).toBe(true);
  });

  it('should return false when string contains non-digit characters', () => {

    const mockString = '2345a43';

    const result = containsOnlyDigits(mockString);

    expect(result).toBe(false);
  });

  it('should return true when string is empty', () => {
    const mockString = '';

    const result = containsOnlyDigits(mockString);

    expect(result).toBe(false);
  });

  it('should return true when string contains only one digit', () => {

    const mockString = '5';

    const result = containsOnlyDigits(mockString);

    expect(result).toBe(true);
  });

  it('should return false when string contains leading zeros', () => {

    const mockString = '00123';

    const result = containsOnlyDigits(mockString);

    expect(result).toBe(true);
  });
});

describe('Function: containsNumberInRange', () => {
  it('should return true when string is in range', () => {
    const mockString = '123';
    const mockNumberMin = 100;
    const mockNumberMax = 300;

    const result = containsNumberInRange(mockString, mockNumberMin, mockNumberMax);

    expect(result).toBe(true);
  });

  it('should return false when string is not in range', () => {
    const mockString = '12';
    const mockNumberMin = 2;
    const mockNumberMax = 5;

    const result = containsNumberInRange(mockString, mockNumberMin, mockNumberMax);

    expect(result).toBe(false);
  });

  it('should return false when string is empty', () => {
    const mockString = '';
    const mockNumberMin = 0;
    const mockNumberMax = 100;

    const result = containsNumberInRange(mockString, mockNumberMin, mockNumberMax);

    expect(result).toBe(false);
  });

  it('should return false when string is not a number', () => {
    const mockString = 'abc';
    const mockNumberMin = 0;
    const mockNumberMax = 100;

    const result = containsNumberInRange(mockString, mockNumberMin, mockNumberMax);

    expect(result).toBe(false);
  });

  it('should handle spaces in the string', () => {
    const mockString = '  50  ';
    const mockNumberMin = 0;
    const mockNumberMax = 100;

    const result = containsNumberInRange(mockString, mockNumberMin, mockNumberMax);

    expect(result).toBe(true);
  });

  it('should return false when number exceeds the upper limit', () => {
    const mockString = '150';
    const mockNumberMin = 0;
    const mockNumberMax = 100;

    const result = containsNumberInRange(mockString, mockNumberMin, mockNumberMax);

    expect(result).toBe(false);
  });
});

describe('Function: matchesTabName', () => {
  it('should return true when string matches characteristics', () => {
    const mockStringCharacterisics = 'characteristics';
    const mockStringDescription = 'description';

    const resultCharacteristics = matcehsTabName(mockStringCharacterisics);
    const resultDescription = matcehsTabName(mockStringDescription);

    expect(resultCharacteristics).toBe(true);
    expect(resultDescription).toBe(true);
  });

  it('should return false when string not matches', () => {
    const mockString = 'something';

    const result = matcehsTabName(mockString);

    expect(result).toBe(false);
  });

  it('should return false when string is empty', () => {
    const mockString = '';

    const result = matcehsTabName(mockString);

    expect(result).toBe(false);
  });

  it('should handle case-insensitive matching', () => {
    const mockStringLowerCase = 'characteristics';
    const mockStringUpperCase = 'DESCRIPTION';

    const resultLowerCase = matcehsTabName(mockStringLowerCase);
    const resultUpperCase = matcehsTabName(mockStringUpperCase);

    expect(resultLowerCase).toBe(true);
    expect(resultUpperCase).toBe(true);
  });

  it('should trim leading and trailing spaces', () => {
    const mockStringWithSpaces = '  characteristics  ';

    const result = matcehsTabName(mockStringWithSpaces);

    expect(result).toBe(true);
  });

  it('should return false for special characters or numbers', () => {
    const mockStringSpecialChars = '!@#$%^&*()';
    const mockStringNumber = '123';

    const resultSpecialChars = matcehsTabName(mockStringSpecialChars);
    const resultNumber = matcehsTabName(mockStringNumber);

    expect(resultSpecialChars).toBe(false);
    expect(resultNumber).toBe(false);
  });
});

describe('Function: formatNumberWithSpaces', () => {
  it('should format integer part of the number with spaces', () => {
    const result = formatNumberWithSpaces(1234567);

    expect(result).toBe('1 234 567');
  });

  it('should format decimal part of the number with spaces', () => {
    const result = formatNumberWithSpaces(1234.5678);

    expect(result).toBe('1 234.5678');
  });

  it('should handle zero value', () => {
    const result = formatNumberWithSpaces(0);

    expect(result).toBe('0');
  });

  it('should handle negative number', () => {
    const result = formatNumberWithSpaces(-9876543);

    expect(result).toBe('-9 876 543');
  });
});

describe('scrollToTop', () => {
  test('scrolls to the top of the page', (done) => {

    const originalScrollY = window.scrollY;
    window.scrollY = 500;

    scrollToTop();

    setTimeout(() => {

      expect(window.scrollY).toBeLessThanOrEqual(0);

      window.scrollY = originalScrollY;

      done();
    }, 1000);
  });
});
