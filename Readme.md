# Meta tag web component

## Basic example

```html
<meta-tag type="description"></meta-tag>
```

## Possible attributes

* **type** - type of meta tag. Also, this will be namespace for value finding in application,
* **application** - application for value finding. 'pages' by default.
* **og** - if true, will make open graph meta tag. For example, if you will pass type="description" and og="true", it will generate a meta tag with name 'og:description'.