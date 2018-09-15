import randomString from 'randomstring';
import number from './number';

const generateStrings = (numberOfStrings, stringLength, isUpperCase, isCapital) => {
  const s = new Set();

  while (s.size < numberOfStrings) {
    const generatedString = randomString.generate({
      length: stringLength,
      charset: 'alphabetic',
      capitalization: isUpperCase ? 'uppercase' : 'lowercase',
    });
    s.add(
      isCapital
        ? generatedString.charAt(0).toUpperCase() + generatedString.slice(1)
        : generatedString
    );
  }

  return s;
};

const lorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

export default {
  enum: list => list[Math.floor(Math.random() * list.length)],

  id: length => Math.random().toString(36).substr(2, length || 8).toUpperCase(),

  lorem: ({ count = 1, type = 'word', }) => {
    let result;
    switch (type) {
      case 'word':
        result = new Set();
        while (result.size < count) {
          const word = lorem.split(' ')[Math.floor(Math.random() * lorem.split(' ').length)];
          result.add(word.replace(/[.|,]/, ''));
        }
        break;
      case 'paragraph':
        result = [];
        while (result.length < count) {
          result.push(`${lorem}\n`);
        }
        break;
      default: {
        result = new Set();
        const word = lorem.split(' ')[Math.floor(Math.random() * lorem.split(' ').length)];
        result.add(word.replace(/[.|,]/, ''));
      }
    }
    return Array.from(result).join(' ');
  },

  word: ({ count = 1, minLength = 0, maxLength = 8, upperCase = false, capital = false, }) => {
    const result =
      generateStrings(
        count,
        number.int(
          {
            min: minLength,
            max: maxLength,
          }
        ) || 8,
        capital ? false : upperCase,
        capital,
      );
    return Array.from(result).join(' ');
  },
};
