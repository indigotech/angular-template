# Angular

* [Angular 2 style guide](https://angular.io/docs/ts/latest/guide/style-guide.html)

# HTML

* Prefer double quotes for attributes.

# Stylus

## Naming conventions
* Every module should begin with the module name as a prefix
* In stylus, always use hyphens for names with multiple words
  E.g.: `<credit-limit>`
* For child classes, just add a hyphen to the parent:
  `<PARENT_NAME>-<CHILD_NAME>`

  E.g.: `<credit-limit>`
* If you want to modify a module, the name of the modifier should be:
  `<OWNER_NAME>--<MODIFIER_NAME>`
* If you want to modify a module in a certain context, the name of the class should be:
  `<OWNER_NAME>__<CONTEXT_NAME>`
* State rules should begin with the prefix "is-" and appended it to the class with an &.

## Best practices
* Avoid changing files inside src/assets/css/components/guide. You can
  refactor it if necessary, but don't add new styles to it
* Avoid nesting. The name itself should give a clue of the structure

  Don't:
  ``` styl
  // the component .lst-item is coupled with the component .lst
  .lst
    padding: 10px

    .lst-item
      margin: 20px
  ```
  Don't:
  ``` styl
  // the component .footer is coupled with the component .prod
  .footer
    padding: 10px

    .prod
      margin: 20px
  ```
  **Do**:
  ``` styl
  // no coupling
  .lst
    padding: 10px

  .lst-item
    margin: 20px
  ```
    Or even:

* "Leave !important off until you actually and truly need it"
* For vendor prefixes, please use the mixins at `vendor-prefixes.styl`
* Pay attention to the difference between **grid** and
  **component**. In general, components don't have margins and goes
inside its component container, which goes inside the grid system
(inside a .col)
* Title should be inside a .row .col
* When a component bleeds over the grid system (i.e. no gutter) we should
  use the class `.no-gutter` with the `.row`
``` jade
.container
  .row.no-gutter
    .col-xs-12
      .hero-img
```

## Formatting

* We're using a lot of concepts from [SMACSS](https://smacss.com/)
* Don't use '{' '}' and ';'.
* When dealing with colors, margins, fonts, spacement use values from `variables.styl`
* Comments should also respect the indentation (otherwise code is generated wrongly)
* Use hyphens when naming mixins, extends, classes, functions & variables: `span-columns` not `span_columns` nor `spanColumns`.
* Use one space between property and value: `width: 20px` not `width:20px`.
* Use a blank line above a selector that has styles.
* Prefer hex color codes `#fff` or `#FFF`.
* Avoid using shorthand properties for only one value: `background-color: #ff0000;`, not `background: #ff0000;`
* Use `//` for comment blocks not `/* */`.
* Use double quotation marks.
* Use only lowercase, except for hex or string values.
* Don't add a unit specification after `0` values, unless required by a mixin.
* Use a leading zero in decimal numbers: `0.5` not `.5`
* Use space around operands: `$variable * 1.5`, not `$variable*1.5`

## Order

Organize css rules in the following order:
1. Positioning: position,
2. Box model: display, margin, float
3. Typographic: font, line-height, text-transform
4. Visual: border, background
5. Misc: transition, opacity

[Codeguide](http://codeguide.co/#css-declaration-order)

## Selectors

* Don't use ID's for style.
* Use meaningful names: `$visual-grid-color` not `$color` or `$vslgrd-clr`.
* Use ID and class names that are as short as possible but as long as necessary.
* Avoid nesting more than 2 selectors deep.
* Don't nest more than 6 selectors deep.
* Use HTML tags on vague classes that need a qualifier like `header.application` not `.main`.
* Avoid using the HTML tag in the class name: `section.news` not `section.news-section`.
* Avoid using HTML tags on classes for generic markup `<div>`, `<span>`: `.widgets` not `div.widgets`.
* Avoid using HTML tags on classes with specific class names like `.featured-articles`.
* Avoid nesting within a media query.

## Organization

* Avoid having files longer than 100 lines.
* Every module should be separated in a file with the same name
* Modifier classes stay in the OWNER_NAME file
* Modifier in a context classes stay in the CONTEXT_NAME file

## References
* [SMACSS](https://smacss.com/)
* [BEM](https://en.bem.info/methodology/)
