# Project name

## installation

1. You’ll need to have **Ruby** and **Bundler** installed(https://jekyllrb.com/docs/installation/)
2. Install Ruby dependences `bundle install`
3. Install JS dependences `yarn install`

## Run

Run local server `npm run dev`
Build your app `npm run build`
Dev Build your app `npm run build_dev`

## Gulp tasks

`gulp fontGen`  - generating fonts to web types.

`gulp iconFontGen`  - generating font from icons.

## Structure scss

All scss files importing into `app.scss`

## Generating icon fonts

Put your svg icons into folder `/src/assets/img/svg-font`, and run `gulp iconFontGen`.

For output in html enter next code:

```html
 <span class="if if-name-icon"></span>
```

Name of icon equal name of icon svg file

## Generating web fonts

Put `.ttf, .otf` files into `/font-convert/src` and run `gulp fontGen`. In `/font-convert/build` folder get out web
fonts.

Next step you must put generated fonts into `/src/fonts/NameFont`, folder `NameFont` can't content spaces. Font should
have a name type of `FontName-DrawingType`, example - `/Roboto/Roboto-Regular.webm`.

In scss file `/src/_app/scss/_variables.scss`
you find this code:

 ```scss
 $fontName01: "FontName" !default;
 $fontVersion01: "1" !default;
 $fontFamilies01: Light, Regular;
 $fontWeights01: 300, 400;
 $fontStyles01: normal, normal;
 ```

Change this for you family font

 ```scss
  $fontName01: "Roboto" !default;
  $fontVersion01: "1" !default;
  $fontFamilies01: Light, Regular, Italic;
  $fontWeights01: 300, 400, 400;
  $fontStyles01: normal, normal, italic;
  ```

If you have some fonts, duplicate this variables and change them numbers.

Below add variable your font, example - `$Roboto: "Roboto", sans-serif;`. In `/src/scss/_app.scss` in body change
variable in font-family.

In scss file `/src/_app/scss/base/_typography.scss` initialize your font, example:

 ```scss
 @include font($fontName01, $fontFamilies01, $fontVersion01, $fontWeights01, $fontStyles01);
 ```

If you have some fonts, duplicate this code and change variables.

```
docker build . -t mno
docker run -t -i -p 8080:8080 -p 35729:35729 --volume ${PWD}:/myapp/ mno yarn install
docker run -t -i -p 8080:8080 -p 35729:35729 --volume ${PWD}:/myapp/ mno
```
