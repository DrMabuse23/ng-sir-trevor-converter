/**
 * Copyright (c) 2014, DrMabuse
 All rights reserved.

 Redistribution and use in source and binary forms, with or without
 modification, are permitted provided that the following conditions are met:

 * Redistributions of source code must retain the above copyright notice, this
 list of conditions and the following disclaimer.

 * Redistributions in binary form must reproduce the above copyright notice,
 this list of conditions and the following disclaimer in the documentation
 and/or other materials provided with the distribution.

 * Neither the name of the {organization} nor the names of its
 contributors may be used to endorse or promote products derived from
 this software without specific prior written permission.

 THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
 FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.


 */
(function (window, angular, undefined) {
    'use strict';


    angular.module('sir.ui', [])

    /**
     * @ngdoc provider
     * @name $ngSirTrevorConverter
     * @description @todo
     */
        .directive('sirContent', function (SirTrevorServ, $compile, $log, $timeout) {
            return {
                transclude: true,
                restrict: 'E',
                scope: {
                    convert: "=convert",
                    blocks: "=blocks"
                },
                controller: function ($scope, $element) {

                    $scope.$watch('convert', function () {
                        console.log($scope);

                        if (typeof $scope.convert !== 'object')
                            return $log.error('convert must be typeof object');

                        var contentArray = SirTrevorServ.create($scope, $element);
                        angular.forEach(contentArray, function (html) {
                            $element.append(html);
                        });
                    }, true);
                }
            };
        })
        .service('SirTrevorServ', function ($log, $filter) {
            var self = this;
            this.options = [];
            /**
             *
             * @type {{blocks: {text: {tag: string}, heading: {tag: string}, columns: {tag: string}, list: {tag: string, listItem: string}}}}
             */
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
                            options: {
                                'class': 'column-6-6'
                            },
                            columnOptions: {
                                'class': ['medium', 'small']
                            }
                        },
                        'columns-4-4-4': {
                            tag: 'div',
                            options: {
                                'class': 'columns-4-4-4'
                            },
                            columnOptions: {
                                'class': ['medium', 'small']
                            }

                        },
                        'columns-3-3-3-3': {
                            tag: 'div',
                            options: {
                                'class': 'columns-3-3-3-3'
                            },
                            columnOptions: {
                                'class': ['medium', 'small']
                            }
                        },
                        'columns-3-6-3': {
                            tag: 'div',
                            options: {
                                'class': 'columns-3-6-3'
                            },
                            columnOptions: {
                                'class': ['medium', 'small']
                            }
                        },
                        'columns-9-3': {
                            tag: 'div',
                            options: {
                                'class': 'columns-9-3'
                            },
                            columnOptions: {
                                'class': ['medium', 'small']
                            }
                        },
                        'columns-3-9': {
                            tag: 'div',
                            options: {
                                'class': 'columns-3-9'
                            },
                            columnOptions: {
                                'class': ['medium', 'small']
                            }
                        },
                        'columns-8-4': {
                            tag: 'div',
                            options: {
                                'class': 'columns-8-4'
                            },
                            columnOptions: {
                                'class': ['medium', 'small']
                            }
                        },
                        'columns-4-8': {
                            tag: 'div',
                            options: {
                                'class': 'columns-4-8'
                            },
                            columnOptions: {
                                'class': ['medium', 'small']
                            }
                        }
                    }
                },
                'list': {
                    tag: 'ul',
                    options: {
                        'class': 'inline-list'
                    },
                    listItem: 'li'
                }
            };
            /**
             *
             * @param scope
             */
            this.create = function (scope, element) {
                if (angular.isUndefined(scope.convert.data))
                    return false;

                self.getOptions(scope);
                var html = self.toHtml(scope.convert.data);
                return html;
            };

            /**
             *
             * @param convert
             */
            this.toHtml = function (blocks) {
                var html = [];
                angular.forEach(blocks, function (block) {
                    var blockOption = self.getType(block);
                    switch (block.type) {
                        case 'columns':
                            html.push(self.columns(blockOption, block.data));
//                            $log.log('columns',html);
                            break;
                        case 'heading':
                            var head = self.heading(blockOption.tag, block.data.text, blockOption.options);
                            html.push(head)
//                            $log.log('heading',html);
                            break;
                        case 'image':
                            html.push(_createImage(block.data.file.url));
//                            $log.log('image',html);
                            break;
                        case 'text':
                            var textT = self.heading(blockOption.tag, block.data.text, blockOption.options);
                            html.push(textT)
//                            $log.log('text',textT);
                            break;
                        case 'list':
//                            $log.log(blockOption);
                            var list = self.list(blockOption.tag, blockOption.listItem, block.data.text, blockOption.options);

                            html.push(list);
//                            $log.log('list');
                            break;
                        default:
                            return 'nichts';
                            break;
                    }
                });
//                $log.log(html);
                return html;
            };


            /**
             *
             * @param scope
             * @returns {*}
             */
            this.getOptions = function (scope) {
                console.log('scope.blocks', scope.blocks);
                if (angular.isDefined(scope.blocks) && angular.isObject(scope, blocks))
                    return self.setOptions(scope.blocks);

                return self.setOptions(blocks);
            };

            /**
             *
             * @param blocks
             * @returns {} Object
             */
            this.setOptions = function (blocks) {
                return self.options = blocks;
            };

            /**
             *
             * @param tag
             * @returns {string}
             * @private
             */
            this.createTag = function (tag, attrs) {
                var el = document.createElement(tag);
                if (angular.isArray(attrs)) {
                    angular.forEach(attrs, function (attr, key) {
                        angular.forEach(attr, function (value, key) {
                            angular.element(el).attr(key, value);
                        });
                    });
                }
                return el;
            };

            /**
             *
             * @param src
             * @returns {*}
             * @private
             */
            function _createImage(src) {
                var el = self.createTag('img');
                angular.element(el).attr('src', 'http://localhost/pascal_brewing.de/yii/backend/web/' + src);
//                console.log('208 img',el);
                return el;
            }

            /**
             *
             * @param data
             * @returns {*}
             */
            this.getType = function (data) {
                var temp = null;
                angular.forEach(self.options, function (blockType, index) {
                    if (index === data.type) {
                        //$log.log('done blockType', blockType);
                        //$log.log('done indexd', index);
                        //$log.log('done data.type', data.type);
                        //$log.log('done self.options[index]', self.options[index]);
                        temp = self.options[index];
                    }
                });
                return temp;
            };

            /**
             * append to the container the columns
             * @param columns
             * @param options
             * @param container
             * @returns {*}
             */
            this.getColumns = function (columns, options, container, columnSizes) {

                if (columns.length <= 0) {
                    return '';
                }

                var itemClasses = options['class'];

                angular.forEach(columns, function (column, index) {
                    var classes = getColumnClasses(itemClasses, columnSizes[index + 1]) + ' ' + columnSizes[0];
                    var el = self.createTag('div', options);
                    angular.element(el).attr('class', classes);

                    if (angular.isDefined(column.blocks) && column.blocks.length > 0) {
                        var columnHtml = self.toHtml(column.blocks);
                        angular.element(el).append(columnHtml);
                    }

                    angular.element(container).append(el);
                });
                return container;
            };

            function getColumnClasses(sizes, size) {
                var classes = '';
                angular.forEach(sizes, function (mySize) {
                    classes += mySize + '-' + size + ' ';
                });

                return classes;
            }

            /**
             *
             * @param option
             * @param data
             */
            this.columns = function (option, data) {

                var container = self.createTag(option.tag, false);
                angular.element(container).addClass(data.preset + ' row');
                var preset = data.preset;
                var columnClasses = preset.split('-');
//                $log.log('columnClasses',columnClasses);

                if (angular.isUndefined(option['presets'][data.preset])) {
//                    $log.debug(option);
                    return $log.error(data.preset + ' not defined');

                }

                var html = self.getColumns(data.columns, option['presets'][data.preset].columnOptions, container, columnClasses);
                return html;
            };

            /**
             *
             * @param tag
             * @param text
             * @param options
             * @returns <h2 options>Lorem Ipsum</h2>
             */
            this.heading = function (tag, text, options) {
                var head = self.createTag(tag);
                if (angular.isDefined(options)) {
                    head = self.createTag(tag, options);
                }
                angular.element(head).text(text);
                return head;
            };

            /**
             * @return <ul><li>duo</li></ul>
             */
            this.list = function (tag, listTag, list, options) {

                var ul = self.createTag(tag, [options]);
                var lists = list.replace(/^ - (.+)$/mg, "<" + listTag + ">$1</" + listTag + ">")
                    .replace(/\n/mg, "");
                angular.element(ul).html(lists);

                $log.log('item', lists);
                $log.log('ul', ul);
                return ul;
            }


        });

})(window, window.angular);