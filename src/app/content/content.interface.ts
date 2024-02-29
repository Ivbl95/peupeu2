export namespace ContentNamespace {
  export interface Technology {
    name: string;
    themes: Theme[];
  }

  export interface Theme {
    name: string;
    subThemes: SubTheme[];
  }

  export interface SubTheme {
    description: string;
    type: 'text' | 'code';
    content: string;
  }
}
