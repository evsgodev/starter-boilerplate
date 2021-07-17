<p align="right">
<a href="ru.md">Russian version</a> / <a href="../README.md">Back to Readme</a>
</p>

#### General rules.
The component is created in the `components` folder with the files` .pug`, `.scss`,` .js`. You need to create files as needed, if they are needed for work. For example, if you do not need to write styles for a component, then there is no need to create a file with the `.scss` extension. Along with the component files, you can create a `data.json` file to store the data, if required. The scss files in the components are concatenated to the `main.scss` file automatically. Js files are collected by Webpack.

In the `assets/img/icons/` folder it is intended for icons in svg format. Here icons are processed and collected into a common file `svg-symbols.svg`, which is generated and rebuilt. The `svg-symbols.svg` file is a sprite file of svg icons.
To insert an icon into a page, use the `+icon('icon-name')` mixin.
To control the color of svg icons in css, you need to remove the `fill` and` stroke` attributes from the `path` tag.

#### Rules for Pug.
1) The component is created by a mixin with the `data` parameter
```commandline
mixin Header(data = {})
    header.page-header
        a.page-header__account(href='#')
            if data.account
                img(src='__static__img/content/avatar.png', alt='#')
            else
                +icon('icon-avatar')
```
The `data` parameter is an object that is passed when the mixin is called. After that the mixin is called on the page like this `+Header({account: true})` or so `+Header(header.default)` or without passing the parameter.

2) All components are called on the page where they are needed. An exception may be elements that are located on all pages. In this case, the component can be called in the template, i.e. globally `template.pug`.

#### Rules for Scss.
1) Nesting is used
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
2) Media queries are written nested for each block
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
3) Mainly css variables are used, which are stored in the file `variables.scss`. Colors are named like this
```commandline
--gray-color: #626263;
--gray-color-2: #727273;
--gray-color-3: #525253;
--gray-color-4: #f8f8f8;
```