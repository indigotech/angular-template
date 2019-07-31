# Iconfont
Iconfont generates icon fonts and css from svg icons.

### Generating new icons
- [ ] Export svg icons from the sketch file and add them to the folder *assets/icons*. The svg file name will be the icon name.
- [ ] Run `gulp iconfont`
- [ ] **Fonts** are generated in the *assets/fonts* folder and the **css code** in the *assets/css/components/guide/icons.styl*
- [ ] If you have problems with the generated fonts, try to play with "Reverse order" on the layers (https://github.com/cognitom/symbols-for-sketch#case-1-icons-with-circle-filled-with-black) or change the operations (Union,
Intersect, Subtraction etc.)

### Iconfont gulp task
We use [iconfont-css](https://github.com/backflip/gulp-iconfont-css) and [iconfont](https://github.com/nfroidure/gulp-iconfont)

- The iconfont gulp task is in the *styles.js* file
- The app-icons `@font-face` is in the *assets/css/core/fonts.styl* and the `font-family` is called *AppIcons*.
- You can change the fontName and other parameters there.
- The template to generate the css code is in the folder *assets/css/templates/_icons.styl*.

#### Setting up
- Run `npm install --save-dev gulp-iconfont gulp-iconfont-css`
- Add the iconfont gulp task, changing the fontName and parameters as necessary.
  ```
  var iconfont = require('gulp-iconfont');
  var iconfontCss = require('gulp-iconfont-css');

  var fontName = 'app-icons';

  gulp.task('iconfont', function(){
    gulp.src(path.join(conf.paths.src, '/assets/icons/*.svg'))
      .pipe(iconfontCss({
        fontName   : fontName,
        path       : path.join(conf.paths.src, '/assets/css/templates/_icons.styl'),
        targetPath : '../css/components/guide/icons.styl',
        fontPath   : '../fonts/',
        cssClass   : 'ic'
      }))
      .pipe(iconfont({
        fontName : fontName,
        formats: ['ttf', 'eot', 'woff', 'svg']
       }))
      .pipe(gulp.dest(path.join(conf.paths.src, '/assets/fonts/')));
  });
  ```
- Add a css template to generate the icons code. It could be:
  ```
  // The font-family should be changed to CamelCase after generation and added to fonts.styl
  @font-face {
    font-family: "<%= fontName %>";
    src: url('<%= fontPath %><%= fontName %>.eot');
    src: url('<%= fontPath %><%= fontName %>.eot?#iefix') format('eot'),
      url('<%= fontPath %><%= fontName %>.woff') format('woff'),
      url('<%= fontPath %><%= fontName %>.ttf') format('truetype'),
      url('<%= fontPath %><%= fontName %>.svg#<%= fontName %>') format('svg');
    font-weight: normal;
    font-style: normal;
  }

  // Variables
  <% _.each(glyphs, function(glyph) { %>$<%= _.kebabCase(fontName)%>-<%= cssClass %>-<%= glyph.fileName %> = "\<%= glyph.codePoint.toString(16).toUpperCase() %>"
  <% }); %>

  // Icons
  <% _.each(glyphs, function(glyph) { %>.<%= cssClass %>-<%= glyph.fileName %>:before { content: $<%= _.kebabCase(fontName)%>-<%= cssClass %>-<%= glyph.fileName %> }
  <% }); %>

  <% var index = 0, comma = ',' %>
  <% _.each(glyphs, function(glyph) { index++; if (index == glyphs.length) comma = '';  %>.<%= cssClass %>-<%= glyph.fileName %>:before<%=comma%>
  <% });%>
    font-family: $icon-font-family
    vertical-align: middle
  ```
