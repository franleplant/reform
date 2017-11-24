export type TypeNode = {
  type: string;
  types?: Array<TypeNode>;
  name?: string;
  id?: number;
  declaration?: Node;
  typeArguments?: Array<TypeNode>;
  typeParameters?: Array<TypeNode>;
  elements?: Array<TypeNode>;
  elementType?: TypeNode;
};

export type Node = {
  id: number;
  name: string;
  kind: number;
  kindString: string;
  children?: Array<Node>;
  parameters?: Array<Node>;
  signatures?: Array<Node>;
  indexSignature?: Array<Node>;
  type?: TypeNode;
  comment?: {
    shortText: string;
    text: string;
    tags: Array<CommentTag>;
  };
  sources: Array<{
    fileName: string;
    line: number;
    character: number;
  }>;
};

export interface CommentTag {
  tag: string;
  text: string;
}
