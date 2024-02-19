export namespace contentNamespace {
  export interface technology {
    name: string;
    themes: theme[];
  }

  export interface theme {
    name: string;
    subThemes: subTheme[];
  }

  export interface subTheme {
    description: string;
    type: 'text' | 'code';
    content: string;
  }
}
