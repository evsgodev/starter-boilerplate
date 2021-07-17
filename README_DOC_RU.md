<p align="right">
    <a href="README.md">На английском</a> <a href="README.md">Назад</a>
</p>

#### Общие правила.
Компонент создается в папке `components` c файлами `.pug`, `.scss`, `.js`. Создавать файлы нужно по необходимости, если они нужны для работы. Например, если стили не нужно писать для компонента, то нет необходимости создавать файл с расширением `.scss`. Наряду с файлами компонента можно создать файл `data.json` для хранения данных, если это требуется. Файлы scss в компонентах конкатенируются с файлом `main.scss` автоматически. Файлы js собирает Webpack.

В папке `assets/img/icons/` предназначена для иконок в формате svg. Здесь иконки обрабатываются и собираются в общий файл `svg-symbols.svg`, который генерируется и пересобирается. Файл `svg-symbols.svg` это файл спрайт из svg иконок.
Для вставки иконки на страницу, нужно воспользоваться миксином `+icon('icon-name')`.
Чтобы управлять цветом svg иконок в css, у тега `path` нужно удалять аттрибуты `fill` и `stroke`.

#### Правила для Pug.
1) Компонент создается миксином с параметром `data`
```commandline
mixin Header(data = {})
    header.page-header
        a.page-header__account(href='#')
            if data.account
                img(src='__static__img/content/avatar.png', alt='#')
            else
                +icon('icon-avatar')
```
Параметр `data` это объект, который передается при вызове миксина. После чего миксин вызывается на странице так `+Header({ account: true })` или так `+Header(header.default)` или без передачи параметра.

2) Все компоненты вызываются на странице на которых они необходимы. Исключением могут стать элементы, которые располагаются на всех страницах. В таком случае компонент можно вызвать в шаблоне т.е глобально `template.pug`.

#### Правила для Scss.
1) Используется вложенность
```commandline
block {
    &--modifier {
        background-color: var(--gray-color);
    }

    &__element: {
        width: min(80%, 700px);

        .block--modifier & {
            color: var(--primary-color);
        }
    }
}
```
2) Медиа запросы пишутся вложенно для каждого блока
```commandline
block {
    width: 50%;

    @media screen and (max-width: 767px) {
        width: 75%;
    }

    @media screen and (max-width: 568px) {
        width: 100%;
    }

    &__element: {
        width: min(80%, 700px);

        @media screen and (max-width: 767px) {
            width: 100%;
        }
    }
}
```
3) Используются преимущественно css переменные, которые хранятся в файле variables. Цвета именуются так
```commandline
--gray-color: #626263;
--gray-color-2: #727273;
--gray-color-3: #525253;
--gray-color-4: #f8f8f8;
```