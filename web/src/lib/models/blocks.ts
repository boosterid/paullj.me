export interface Mark {
  type: string;
  options?: Record<string, unknown>;
}

export interface TextSpan {
  key: string;
  type: string; // can this be 'span' | 'link' ?
  marks: Mark[];
  text: string;
}

export interface TextBlock {
  kind: 'text';
  key: string;
  style: string;
  spans: TextSpan[];
}

export interface CustomBlock {
  kind: 'custom';
  type: string;
  key: string;
  fields: Record<string, unknown>;
}

export interface ListBlock {
  kind: 'list';
  type: string;
  level: number;
  children: (TextBlock | ListBlock)[];
}

export type Block =
  | TextBlock
  | ListBlock
  | CustomBlock;
