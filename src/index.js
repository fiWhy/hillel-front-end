 import hljs from 'highlight.js/lib/highlight';
 import javascript from 'highlight.js/lib/languages/javascript';
//  import html from 'highlight.js/lib/languages/html';
 import 'highlight.js/styles/github.css';
 hljs.registerLanguage('javascript', javascript);
//  hljs.registerLanguage('html', html);
 hljs.initHighlightingOnLoad();
 console.log('Ready');