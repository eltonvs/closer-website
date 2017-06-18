# Projeto Web

## Getting Started

### Installation

First of all, install the dependencies.

- [NodeJS](http://nodejs.org/)
- [GulpJS](http://gulpjs.com/)


```sh
# Clone this repository
$ git clone git@github.com:eltonvs/projeto_web.git
$ cd projeto_web

# install gulp globally (may require sudo)
$ npm install -g gulp

# install dependencies
$ npm run setup

# start watches and BrowserSync
$ npm start
```

### Folders and Files

```sh
├── build
│   ├── css
│   │   └── style.css
│   ├── img/
│   ├── js
│   │   └──  main.js
│   ├── styleguide/
│   ├── index.html
├── src
│   ├── css/
│   ├── data/
│   ├── helpers/
│   ├── img/
│   ├── js/
│   ├── pug
│   │   ├── templates/*.pug
│   │   └── index.pug
│   └── styl
│       ├── _core/*.styl
│       ├── pages/*.styl
│       └── style.styl
├── README.md
├── gulpfile.js
├── package.json
```


### Tasks

- `npm start`: run all tasks and initialize watch for changes and a server
- `npm test`: lint javascript and css
- `npm run setup`: install all dependencies
- `npm run fix`: command to fix all eslint errors
- `npm run reporter`: test css complexity
- `npm run build`: run all tasks to build
- `npm run deploy`: deploy application to gh-pages branch
- `npm run html`: compile html files
- `npm run js`: compile js files
- `npm run css`: compile css files
- `npm run images`: compress images files
- `npm run svg`: compress svg files
- `npm run icons`: generate sprite of icons
