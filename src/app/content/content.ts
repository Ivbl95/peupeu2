import { ContentNamespace } from './content.interface';

const javascriptLet: ContentNamespace.SubTheme = {
  description: 'Переменная объявляется так',
  type: 'code',
  content: `
<pre><code>
@Component({ … })
class MyComponent {
  private myService = inject(MyService);
}
</code></pre>
`,
};

const javascriptVariables: ContentNamespace.Theme = {
  name: 'Javascript Переменные',
  subThemes: [javascriptLet],
};

const javascript: ContentNamespace.Technology = {
  name: 'Javascript',
  themes: [javascriptVariables],
};

export const content: ContentNamespace.Technology[] = [javascript];
