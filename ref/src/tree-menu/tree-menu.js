// import templateUrl from 'src/tree-menu/tree-menu.html'
import $ from 'jquery';
import  templateUrl from './template.html'
import _ from 'lodash'
var treeData = require('../../tree.json')
// import './style.scss'
// import '/src/tree-menu/style.scss'
export default {
    template: templateUrl,
    controller: menuCtrl
}
function menuCtrl () {
    var $ctrl = this

    $ctrl.$onInit = () => {
        $ctrl.treeData = {
            children:treeData
        }
        var count = 0;
        $(function () {
            $('.tree li:has(ul)').addClass('parent_li').find(' > span').attr('title', 'Collapse this branch');
            $('.tree li.parent_li > span').on('click', function (e) {
                var children = $(this).parent('li.parent_li').find(' > ul > li');
                if (children.is(':visible')) {
                    children.hide('fast');
                    $(this).attr('title', 'Expand this branch').find(' > i').addClass('icon-plus-sign').removeClass('icon-minus-sign');
                } else {
                    children.show('fast');
                    $(this).attr('title', 'Collapse this branch').find(' > i').addClass('icon-minus-sign').removeClass('icon-plus-sign');
                }
                e.stopPropagation();
            });
            $('.tree li.parent_li > span').trigger('click')
        });
        var windowHeight = $(window).height()
        var headerHeight = $('#header').height()
        $('iframe').height(windowHeight - headerHeight-20)
        $('.tree').height(windowHeight -  headerHeight-20)
        var $window = $(window).on('resize', function(){
            windowHeight = $(window).height()
            headerHeight = $('#header').height()
            $('iframe').height(windowHeight -  headerHeight-20)
            $('.tree').height(windowHeight -  headerHeight-20)
        })
        $ctrl.clickArticle= (name)=> {
            $ctrl.name = name
        }
        $('.tree').mouseover(function() {
            $(this).css('overflow-y','scroll')
        })
        $('.tree').mouseout(function() {
            $(this).css('overflow-y','hidden')
        })
    }
}