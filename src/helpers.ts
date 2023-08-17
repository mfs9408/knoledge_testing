import { ISides } from './store/slice';

export const getArrayFromTo = (from: number, to: number) =>
  Array.from({ length: to - from + 1 }, (value, index) => from + index);

export const diceResult = (sides: number) =>
  Math.floor(Math.random() * Math.floor(sides) + 1);

export const rolls = [
  { id: 4, value: 'd4' },
  { id: 6, value: 'd6' },
  { id: 8, value: 'd8' },
  { id: 10, value: 'd10' },
  { id: 12, value: 'd12' },
];

export const getLocaleDate = (date: string) =>
  new Date(date).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: true,
  });

export const sum = (nTimes: number, mod: number, sides: ISides) => {
  const throwingQuantity = getArrayFromTo(1, nTimes);

  const throwingSum = throwingQuantity.reduce((acc) => {
    const result = diceResult(sides.id);

    return acc + result;
  }, 0);

  return throwingSum + mod;
};

export const getCorrectMod = (mod: number) =>
  mod !== 0 && (mod > 0 ? `+${mod}` : mod);
