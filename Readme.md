# Сборка Webpack, SASS, Pug

## Установка
Требуется __Node.JS__ версии `>=16.14.2`

Запустить команду `yarn install`

## Команды

Запустить локальный сервер `yarn run dev`

Сделать билд для production версии `yarn run build`

Сделать билд для development версии `yarn run build_dev`

## Gulp команды

  Сгенерировать web шрифты `yarn run gulp fontGen`

  Сгенерировать шрифта из иконок `yarn run gulp iconFontGen`

## Структура scss

Импорт всех основных файлов должен быть в `app.scss`

## Генерация шрифта из иконок
__Не работает на Windows__

Нужно разместить иконки в формате svg в этой директории `/src/assets/img/svg-font`, после запустить команду `yarn run gulp iconFontGen`.

>Нужно учесть что бы в файле svg иконка была сделана с помощью fill а не stroke, т.к. все stroke будут проигнорированы

Для использования иконок в шаблонах можно использовать такой синтаксис:
```jade
span.if.if-name-icon
```

Название иконки будет такое же, как и название файла с префиксом `if-`

## Генерация web шрифтов
__Не работает на Windows__

Нужно положить `.ttf, .otf` файлы в директорию `/font-convert/src` и запустить команду `yarn run gulp fontGen`. В директории `/font-convert/build` будут сконвертированные шрифты. Шрифты будут только в форматах `.woff,.woff2`

>Так же может не со всеми шрифтами работать. Если будет выдавать ошибку, то вариант только конвертировать с помощью различных сервисов

Дальше нужно создать директорию `/src/fonts/NameFont`, где `NameFont` не будет содержать пробелов и будет как название шрифта. Начертания шрифта и стиль должен быть через тире и в camelCase `FontName-DrawingType`.

Примеры: 

`/OpenSans/OpenSans-Regular.woff`
`/OpenSans/OpenSans-RegularItalic.woff`

В этом файле `/src/_app/scss/_variables.scss` Есть следующий код:

 ```scss
 $fontName01: "FontName" !default;
 $fontFamilies01: Light, Regular;
 $fontWeights01: 300, 400;
 $fontStyles01: normal, normal;
 ```

__Нужно его изменить на тот шрифт, что используется__

В названии шрифта `$fontName01` указывается название папки, что делали ранее. Так же это название будет использоваться при объявлении `font-family`

В `$fontFamilies01` пишутся названия начертаний, что идут после тире в названии файла шрифта

В `$fontWeights01` указывается начертания для css которые будут использоваться в `font-wight`. Они должны соответствовать названиям в `$fontFamilies01`. И их количество должно быть таким же как в `$fontFamilies01`.

В `$fontStyles01` указывается стиль шрифта для css которые будут использоваться в `font-style`. И их количество должно быть таким же как в `$fontFamilies01`.

Пример:

 ```scss
  $fontName01: "OpenSans" !default;
  $fontFamilies01: Light, Regular, RegularItalic;
  $fontWeights01: 300, 400, 400;
  $fontStyles01: normal, normal, italic;
  ```

Если нужно подключить больше шрифтов, то можно продублировать все эти переменные и поменять им индекс. 

Пример:

 ```scss
  $fontName02: "Roboto" !default;
  $fontFamilies02: Regular, RegularItalic;
  $fontWeights02: 400, 400;
  $fontStyles02: normal, italic;
  ```

Под этими переменными есть еще одна `$FontName: 'FontName', sans-serif;`, ее можно переименовать в названия шрифта, продублировать если несколько шрифтов и использовать в `font-family`

Пример:

```scss
$OpenSans: 'OpenSans', sans-serif;
$Roboto: 'Roboto', sans-serif;

.someClass {
  font-family: $OpenSans;
}
```

После всего в файле `/src/_app/scss/base/_typography.scss` Нужно инициировать шрифт, пример:

 ```scss
 @include font($fontName01, $fontFamilies01, $fontWeights01, $fontStyles01);
 ```

Если есть несколько шрифтов, то продублировать и заменить переменные на те что у второго шрифта.
