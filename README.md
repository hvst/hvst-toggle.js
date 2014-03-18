hvst-toggle.js
==============


## Description

jQuery plugin that allows to use neat CSS3 animated tabs


## Installation

    $ bower install hvst.toggle
    
## Requirements

jQuery

## Browser Support 

* Chrome
* Firefox 
* Safari 
* IE8+
    
##Usage

1. Include hvst.toggle.js and hvst.toggle.css in your page:

    ```html
    <html>
        <head>
            <link rel="stylesheet" src="bower_components/hvst.toggle/dist/hvst.toggle.css" />
        </head>
        <body>
            <!-- page's content -->
            <div class="tabs">
                <a class="hvst-toggle-active">Active Item</a>
                <a>Other Item</a>
            </div>
            <script src="bower_components/hvst.toggle/dist/hvst.toggle.js"></script>
        </body>
    </html>
    ```

2. Initialize hvst.toggle 

    ```js
    $('div.tabs').hvstToggle();
    ```

###API

1. `$.hvstToggle('destroy')`

    Removes all bindings and generated DOM
    
2. `$.hvstToggle('refresh')`

    Re-run the active item animation
