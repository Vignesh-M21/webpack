## Create react application without using the npx-create-react

```
npm init
npm install react react-dom
create Application from the scratch using react
```

## Create webpack config from scratch to build a development bundle

```

```

## Entry, Output for bundle

## Resolve jsx - Done

==========

## Loaders

## Style Loader & Css Loader

```
For load a css into a bundler
1) css loader used to conver css to js
2) style loader used to inject the js css into dom
```

===========

## Webpack dev server

```
Use html pugin and the Webpack dev server packages to create a dev server easy
```

## Load image | below webpack config will load images

```
{
    test: /\.(png|svg|jpg|jpeg|gif)$/i,
    type: 'asset/resource',
},
```

## Terser webpack plugin

```
Do more efficient bundle
npm install terser-webpack-plugin --save-dev
```

## MiniCssExtractPlugin

```
npm install --save-dev mini-css-extract-plugin
```

## splitChunks using webpack

## Shared common function for seprate chunks

Roll up
