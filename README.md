ng-sir-trevor-converter
=======================

Version 0.0.2
--------------

convert sir trevor json to html

### Installation

[![Bower version](https://badge.fury.io/bo/angular-sir-trevor-converter.svg)](http://badge.fury.io/bo/angular-sir-trevor-converter)

````
    bower install --save angular-sir-trevor-converter
````

### Usage
content must be an type of Object

````
    <sir-content  convert="content"></sir-content>
````

### Configuration at the moment
    ````
    var blocks = {
        'text': {
            tag: 'p'
        },
        'heading': {
            tag: 'h2'
        },
        'columns': {
            tag: 'div',
            presets: {
                'columns-6-6': {
                    tag: 'div',
                    options:{
                        'class': 'column-6-6'
                    },
                    columnOptions:{
                        'class': ['medium','small']
                    }
                },
                'columns-4-4-4': {
                    tag: 'div',
                    options:{
                        class:'columns-4-4-4'
                    },
                    columnOptions:{
                        'class': ['medium','small']
                    }

                },
                'columns-3-3-3-3': {
                    tag: 'div',
                    options:{
                        class:'columns-3-3-3-3'
                    },
                    columnOptions:{
                        'class': ['medium','small']
                    }
                },
                'columns-3-6-3': {
                    tag: 'div',
                    options:{
                        class:'columns-3-6-3'
                    },
                    columnOptions:{
                        'class': ['medium','small']
                    }
                },
                'columns-9-3': {
                    tag: 'div',
                    options:{
                        class:'columns-9-3'
                    },
                    columnOptions:{
                        'class': ['medium','small']
                    }
                },
                'columns-3-9': {
                    tag: 'div',
                    options:{
                        class:'columns-3-9'
                    },
                    columnOptions:{
                        'class': ['medium','small']
                    }
                },
                'columns-8-4': {
                    tag: 'div',
                    options:{
                        class:'columns-8-4'
                    },
                    columnOptions:{
                        'class': ['medium','small']
                    }
                },
                'columns-4-8': {
                    tag: 'div',
                    options:{
                        class:'columns-4-8'
                    },
                    columnOptions:{
                        'class': ['medium','small']
                    }
                }
            }
        },
        'list': {
            tag: 'ul',
            listItem: 'li'
        }
    };
````

### Todos

add list,video,blockquote,image-caption