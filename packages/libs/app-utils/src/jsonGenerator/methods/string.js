// @flow
import randomString from 'randomstring';
import number from './number';

type GenerateStringsType = (
  numberOfStrings: number,
  stringLength: number,
  isUpperCase: boolean,
  isCapital: boolean,
) => Set<string>;

type EnumType = Array<string> => string;

type IdType = ?number => string;

type LoremType = ({
  count?: number,
  type?: 'word' | 'paragraph',
}) => string;

type WordType = ({
  count?: number,
  minLength?: number,
  maxLength?: number,
  upperCase?: boolean,
  capital?: boolean,
}) => string;

const generateStrings: GenerateStringsType = (numberOfStrings, stringLength, isUpperCase, isCapital) => {
  const s: Set<string> = new Set();

  while (s.size < numberOfStrings) {
    const generatedString: string = randomString.generate({
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

const loremString: string = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

const enumString: EnumType = list => list[Math.floor(Math.random() * list.length)];

const id: IdType = length => Math.random().toString(36).substr(2, length || 8).toUpperCase();

const lorem: LoremType = ({ count = 1, type = 'word', }) => {
  let result: Set<string> | Array<string>;
  switch (type) {
    case 'word':
      result = new Set();
      while (result.size < count) {
        const word: string = loremString.split(' ')[Math.floor(Math.random() * loremString.split(' ').length)];
        result.add(word.replace(/[.|,]/, ''));
      }
      break;
    case 'paragraph':
      result = [];
      while (result.length < count) {
        result.push(`${loremString}\n`);
      }
      break;
    default: {
      result = new Set();
      const word: string = loremString.split(' ')[Math.floor(Math.random() * loremString.split(' ').length)];
      result.add(word.replace(/[.|,]/, ''));
    }
  }
  return Array.from(result).join(' ');
};

const word: WordType = ({ count = 1, minLength = 0, maxLength = 8, upperCase = false, capital = false, }) => {
  const result: Set<string> = generateStrings(
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
};

export default {
  enum: enumString,
  id,
  lorem,
  word,
};
