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

const pages = {
  'login': [ Pages.LoginPage ],
  'registrate': [ Pages.RegistratePage ],
  'nav': [ Pages.NavigatePage ]
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

document.addEventListener('DOMContentLoaded', () => navigate('login'));

document.addEventListener('click', e => {
  //@ts-ignore
  const page = e.target.getAttribute('page');
  if (page) {
    navigate(page);

    e.preventDefault();
    e.stopImmediatePropagation();
  }
});