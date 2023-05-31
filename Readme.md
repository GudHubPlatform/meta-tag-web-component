# Meta tag web component

  

## Basic example

  

```html

<meta-tag  type="description"></meta-tag>

```

  

## Possible attributes

  

*  **type** - type of meta tag. Also, this will be namespace for value finding in application. **type** can be "title" or "description".
---
*  **data-chapter** - application for value finding. 'pages' by default.
---
*  **og** - if true, will make open graph meta tag. For example, if you will pass type="description" and og="true", it will generate a meta tag with name 'og:description'. In case if you will pass type="title" and og="true", will generate meta tag with two attributes
```html
<meta property="og:site_name" content="[title_of_page]">
```
---
*  **twitter** - if true, will make twitter card meta tag. For example, if you will pass type="description" and twitter="true", it will generate a meta tag with name 'twitter:description'. 
---
* **data-twitter-name** - in this attribute you need set @username of website in Twitter. You need to use this attribute with atributes - "twitter" and " type='title' ". Example: 
```html
<meta-tag  twitter  type="title"  data-twitter-name="@username"></meta-tag>
```
It will generate this meta tags:
```html
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:site" content="[data_twitter_name]">
```
---
## Complex usage

```html

<meta-tag  og  type="title"></meta-tag>
<meta-tag  twitter  type="title"  data-twitter-name="@username"></meta-tag>
<meta-tag  type="description"></meta-tag>
<meta-tag  og  type="description"></meta-tag>
<meta-tag  twitter  type="description"></meta-tag>

```