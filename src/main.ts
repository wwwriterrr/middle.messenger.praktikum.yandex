//@ts-nocheck

import Handlebars from 'handlebars';
import * as Components from './components';
import * as Pages from './pages';


Handlebars.registerHelper('if_eq', function(a, b, opts) {
  const t: any = this
  if (a == b) {
    return opts.fn(t)
  } else {
    return opts.inverse(t)
  }
});

const display_pages = ['login', 'registrate', 'chat', 'profile', 'Error 404', 'Error 50*'];
const pages = {
  'login': [ Pages.LoginPage ],
  'registrate': [ Pages.RegistratePage ],
  'profile': [ Pages.ProfilePage ],
  'nav': [ Pages.NavigatePage, { pages: display_pages } ],
  'chat': [ Pages.ChatPage, {} ],

  'Remember password': [ Pages.RememberPassword ],
  'Remember password (authenticated)': [ Pages.RememberPassword, {is_authenticated: true} ],

  'Error 404': [Pages.ErrorPage, {code: 404}],
  'Error 50*': [Pages.ErrorPage, {code: 500}],
};

Object.entries(Components).forEach(([ name, component ]) => {
  Handlebars.registerPartial(name, component);
});

function navigate(page: string) {
  //@ts-ignore
  const [ source, context ] = pages[page];
  const container = document.getElementById('app')!;

  if(source instanceof Object) {
    const page = new source(context);
    container.innerHTML = '';
    container.append(page.getContent());
    // page.dispatchComponentDidMount();
    return;
  }

  container.innerHTML = Handlebars.compile(source)(context);
}

//document.addEventListener('DOMContentLoaded', () => navigate('login'));
//document.addEventListener('DOMContentLoaded', () => navigate('profile'));
document.addEventListener('DOMContentLoaded', () => navigate('nav'));

document.addEventListener('click', e => {
  //@ts-ignore
  const page = e.target.getAttribute('page');
  if (page) {
    navigate(page);

    e.preventDefault();
    e.stopImmediatePropagation();
  }
});
