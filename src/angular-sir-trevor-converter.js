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
//(function (window, angular, undefined) {
'use strict';


angular.module('sir.ui', [])

/**
 * @ngdoc provider
 * @name $ngSirTrevorConverter
 * @description @todo
 */
    .directive('sirContent', function (SirTrevorServ,$compile) {
        return {
            transclude: true,
            //template: '<div></div>',
            restrict: 'E',
            scope: {
                convert: "=convert",
                blocks: "=blocks"
            },
            link: function (scope, element, attrs) {
//                console.debug("defaultOptions", scope);
                scope.$watch('convert', function () {
                    var html='';
//                    console.log(scope,element);
                    var temp = SirTrevorServ.create(scope);
//                    angular.forEach(scope.convert,function(convert){
//                        var temp = SirTrevorServ.create(scope);
//                        console.log('temp',temp);
//                        if(angular.isDefined(temp)){
//                            html += temp;
//                            console.log('html',html);
//                            console.log('$element',element);
//                        }
//                    });
                    element.html('temp',temp);

                });
            }
//            ,
//            controller: function ($scope,$element) {
//                $scope.$watch('convert', function () {
//                    console.log($scope,$element);
////                    if (typeof $scope.convert !== 'object')
////                        return $log.error('convert mus by Json');
//                    angular.forEach(scope.convert,function(convert){
//                        var html = SirTrevorServ.create($scope);
//                            console.log('html',html);
//                            console.log('$element',$element);
//                            $element.append(html);
//                    })
//
////                    $scope.convert;
////                    $log.debug(test);
//                });
//
////                    console.debug(debug("defaultOptions",$scope.defaultOptions));
//            }
        };
    })
    .service('SirTrevorServ', function () {
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
                    'column-1-1': {
                        tag: 'div',
                        'class': 'col-lg-6'
                    },
                    'columns-3-3-3-3': {
                        tag: 'div',
                        'class': 'col-lg-3'
                    }
                }
            },
            'list': {
                tag: 'ul',
                listItem: 'li'
            }
        };
        /**
         *
         * @param scope
         */
        this.create = function (scope) {
            if (angular.isUndefined(scope.convert.data))
                return false;

            self.getOptions(scope);
            console.log(scope.convert);
            var html = self.toHtml(scope.convert);

        };

        /**
         *
         * @param convert
         */
        this.toHtml = function (convert) {
            angular.forEach(convert.data, function (block) {
                var blockOption = self.getType(block);
                switch(block.type) {
                    case 'columns':
                        return self.columns(blockOption,block.data);
                        break;
                    case 'heading':
                        var html = angular.element(_createTag(blockOption.tag));
                        html.text(block.data.text);
                        console.log('heading',html);
                        return html;
                        break;
                    default:
                        return false;
                        break;
                }
//                console.log('block',block);
//                console.log('blockOption',blockOption);
//                if(block.type === 'columns')
//                    ;

            });
        };


        /**
         *
         * @param scope
         * @returns {*}
         */
        this.getOptions = function (scope) {
            if (angular.isDefined(scope.blocks))
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
        function _createTag(tag) {
            return "<" + tag + ">" + "</" + tag + ">"
        }
        /**
         *
         * @param tag
         * @returns {string}
         * @private
         */
        function _createImage(src) {
            return "<img ng-src='"+$filter('checkPath')(src)+"' />";
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
//                    console.log('done blockType', blockType);
//                    console.log('done indexd', index);
//                    console.log('done data.type', data.type);
//                    console.log('done self.options[index]', self.options[index]);
                    temp = self.options[index];
                }
            });
            return temp;
        };


        this.getColumns = function (columns,element) {
            var temp = '';
            angular.forEach(columns,function(column,index){
//                    console.log(column);
            });
//            console.log('columns',columns);
        };

        /**
         *
         * @param option
         * @param data
         */
        this.columns = function (option,data) {
            var container = angular.element(_createTag(option.tag));
            container.addClass(data.preset);

            var columns = self.getColumns(data.columns,container);

//            console.log('option',option);
//            console.log('container',container);
//            console.log('columns',columns);
//            console.log('data',data);
        };

    });

//})(window, window.angular);
