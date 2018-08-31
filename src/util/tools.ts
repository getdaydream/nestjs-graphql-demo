import _ from 'lodash';

export const formatData = (keys: string[]) => {
};

export const keysSnakeCase = (obj: object) => {
  return _.mapKeys(obj, (v, k) => _.snakeCase(k));
};

/**
 * 将对象中的key都转成驼峰式写法
 * @param obj
 */
export const keysCamelCase = (obj: object) => {
  return _.mapKeys(obj, (v, k) => _.camelCase(k));
};
