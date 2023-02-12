import type { Entry } from "./common";

export type Order = {
  user_name: string;
  name: string;
  size: string;
  dough: string;
  side: string;
  additive: string;
  adress: string;
  comment: string | null;
  date: string;
  status?: string;
};

export type SavedOrder = Entry<Order>;
