export type Payload<
  Type extends string = string,
  MessageType extends string = string
> = {
  type: Type;
  user: User;
  api_app_id: string;
  token: string;
  container: Container;
  trigger_id: string;
  team: Team;
  enterprise: unknown | null;
  is_enterprise_install: boolean;
  channel: Channel;
  message: Message<MessageType>;
  state: State;
  response_url: string;
  actions: Action[];
};

export type User = {
  id: string;
  username: string;
  name: string;
  team_id: string;
};

export type Container = {
  type: string;
  message_ts: string;
  channel_id: string;
  is_ephemeral: boolean;
};

export type Team = {
  id: string;
  domain: string;
};

export type Channel = {
  id: string;
  name: string;
};

export type Message<T extends string = string> = {
  type: 'message';
  subtype: T;
  text: string;
  ts: string;
  username: string;
  bot_id: string;
  app_id: string;
  blocks: unknown[];
};

export type State = {
  values: Record<string, Record<string, ValueField>>;
};

export type Action = StaticSelectAction | PlainTextInputAcion | ButtonAction;

export type BaseAction = {
  action_id: string;
  block_id: string;
  action_ts: string;
};

export type StaticSelectAction = BaseAction & {
  type: 'static_select';
  selected_option: {
    text: Text;
    value: string;
  } | null;
  placeholder: Text;
};

export type PlainTextInputAcion = BaseAction & {
  type: 'plain_text_input';
  value: string | null;
};

export type ButtonAction = BaseAction & {
  type: 'button';
  style: string;
  text: Text;
  value: string;
};

export type ValueField = StaticSelectField | PlainTextInputField;

export type StaticSelectField = {
  type: 'static_select';
  selected_option: {
    text: Text;
    value: string;
  } | null;
};

export type PlainTextInputField = {
  type: 'plain_text_input';
  value: string | null;
};

export type Text = {
  type: string;
  text: string;
  emoji: boolean;
};

export type Change = {
  _id: string;
  operationType: string;
  clusterTime: string;
  ns: string;
  documentKey: string;
  updateDescription: string;
  removedFields: string;
  truncatedArrays: string;
};
