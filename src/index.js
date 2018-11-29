 import hljs from 'highlight.js/lib/highlight';
 import javascript from 'highlight.js/lib/languages/javascript';
 import 'highlight.js/styles/github.css';
 hljs.registerLanguage('javascript', javascript);
 hljs.initHighlightingOnLoad();


 const toggleSticky = (elms) => {
     elms.forEach(data => {
         if (window.pageYOffset >= data.top) {
             data.el.classList.add("sticky")
         } else {
             data.el.classList.remove("sticky");
         }
     })
 }

 window.onload = () => {
     const sticked = Array.from(document.getElementsByClassName("sticked")).map(el => {
         return {
             el,
             top: window.pageYOffset + el.parentElement.getBoundingClientRect().top
         }
     });


     toggleSticky(sticked);

     window.onscroll = () => {
         toggleSticky(sticked);
     }

     const openable = document.getElementsByClassName('collapsable');

     Array.from(openable).forEach(el => {
         el.addEventListener('click', () => {
             el.parentElement.classList.toggle('opened');
             el.parentElement.classList.toggle('right');
             el.parentElement.classList.toggle('down');
         })
     })

 }