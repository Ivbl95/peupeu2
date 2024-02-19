import { contentNamespace } from './content.interface';

const javascriptLet: contentNamespace.subTheme = {
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

const javascriptVariables: contentNamespace.theme = {
  name: 'Javascript Переменные',
  subThemes: [javascriptLet],
};

const javascript: contentNamespace.technology = {
  name: 'Javascript',
  themes: [javascriptVariables],
};

export const content: contentNamespace.technology[] = [javascript];
