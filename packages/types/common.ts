export type Entry<T> = {
  _id: string;
} & T;

export type Nullable<T> = {
  [K in keyof T]: T[K] | null;
};
