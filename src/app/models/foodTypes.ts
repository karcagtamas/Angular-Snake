import Food from './food';

export const FOODS = {
  normal: new Food('#00ff00', 1, false, null),
  higher: new Food('#FFFF00', 2, false, null),
  killer: new Food('#00FFFF', 0, true, null)
};
