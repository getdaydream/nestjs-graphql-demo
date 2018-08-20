import _ from 'lodash';

export const formatData = (keys: string[]) => {
};

export const keysSnakeCase = (obj: object) => {
  return _.mapKeys(obj, (v, k) => _.snakeCase(k));
};
