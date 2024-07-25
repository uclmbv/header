export interface Config {
  placeholder?: string;
  levels?: number[];
  defaultLevel?: number;
}

export interface Data {
  text: string;
  level: number;
}

export interface Constructor {
  api: API;
  readOnly: boolean;
  config: Config;
  data: Data;
}

export interface CSS {
  block: string;
  container: string;
}

export type UI = HTMLHeadingElement;

export interface Level {
  number: number;
  tag: string;
  icon: string;
}
