import { create } from 'express-handlebars';
import __dirname from '../utils/jwt.util.js'
import helpers from './hbs.helpers.js';

// const { __dirname } = fileDirName(import.meta);
export default function configureHandlebars(app) {
  const hbs = create({
    partialsDir: [`${__dirname}/views/partials`],
    helpers,
  });
  app.engine('handlebars', hbs.engine);
  app.set('views', `${__dirname}/views`);
  app.set('views engine', 'handlebars');
}