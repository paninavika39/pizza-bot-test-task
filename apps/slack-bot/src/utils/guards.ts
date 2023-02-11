import type { Action, StaticSelectAction, ButtonAction } from '../types';

export const every = <T, U extends T>( //T-тип данных коллекции(реальный), U - утверждаемый тип коллекции
  collection: T[],
  predicate: (value: T) => value is U //аргумент типа T является аргументом типа U
): collection is U[] => collection.every(predicate); //Вся коллекция из элементов с типом U

export const isString = (value: unknown): value is string =>
  typeof value === 'string';

export const isStaticSelectAction = (
  action: Action
): action is StaticSelectAction => {
  return action.type === 'static_select';
};

export const isButtonAction = (action: Action): action is ButtonAction => {
  return action.type === 'button';
};
