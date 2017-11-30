// import templateUrl from 'src/tree-menu/tree-menu.html'
import $ from 'jquery';
import templateUrl from './template.html'
import _ from 'lodash'
var treeData = require('../../tree.json')
// import './style.scss'
// import '/src/tree-menu/style.scss'
export default {
    template: templateUrl,
    controller: menuCtrl
}
menuCtrl.$inject = ['$location']

function menuCtrl($location) {
    var $ctrl = this

    $ctrl.$onInit = () => {
        $ctrl.treeData = {
            children: treeData
        }
        $('.burgWrapper').bind('click', function () {
            $('.burg').toggleClass('activeBurg');
            $('.tree').toggleClass('active')
            $('.article-content').toggleClass('inactive')
            $('div.tree').width(200)
        })
        let changeUrl = true;
        //     window.onhashchange = function() { 
        //         var intial_article = window.location.href.split('?')[1]
        //         $('iframe').attr('src',`./data/article_${intial_article}.html`); 
        //    }
        var intial_article = window.location.href.split('?')[1]
        $('iframe').attr('src', `./data/article_${intial_article || 168}.html`);
        $.get(`./data/article_${intial_article || 1}.html`, (data) => {
            $('#art').html(data);
        })
        var count = 0;
        $(function () {
            $('.tree li:has(ul:has(li))').addClass('parent_li').addClass('collapse-l') //.find(' > ul').find(' > li').attr('title', 'Collapse this branch');
            $('.tree li.parent_li > span, li.parent_li:before').on('click', function (e) {
                var children = $(this).parent('li.parent_li').find(' > ul > li');
                if (children.is(':visible')) {
                    children.hide('fast');
                    $(this).closest('.collapse-l').removeClass('collapse-l').addClass('expand-l');
                    // $(this).attr('title', 'Expand this branch').find(' > i').addClass('icon-plus-sign').removeClass('icon-minus-sign');
                } else {
                    children.show('fast');
                    $(this).closest('.expand-l').addClass('collapse-l').removeClass('expand-l');
                    // $(this).attr('title', 'Collapse this branch').find(' > i').addClass('icon-minus-sign').removeClass('icon-plus-sign');
                }
                e.stopPropagation();
            });
            $('.tree li.parent_li > span').trigger('click')
        });
        var windowHeight = $(window).height()
        var headerHeight = $('#header').height()
        $('#art').height(windowHeight - headerHeight - 20)
        $('.tree').height(windowHeight - headerHeight - 20)
        var $window = $(window).on('resize', function () {
            windowHeight = $(window).height()
            headerHeight = $('#header').height()
            $('#art').height(windowHeight - headerHeight - 70)
            $('.tree').height(windowHeight - headerHeight - 20)
        })
        $ctrl.clickArticle = (event, name, km_articleid) => {
            $(window).trigger('resize')
            $ctrl.name = name
            changeUrl = false;
            $.get(`./data/article_${km_articleid}.html`, (data) => {
                $('#art').html(data);
            })
            setTimeout(() => {
                window.history.replaceState({
                    name: 'new'
                }, null, window.location.href.split('?')[0] + '?' + km_articleid);
            }, 0)
            // window.location.href = window.location.href.split('?')[0] +'?'+km_articleid

        }
        // $('.tree').mouseover(function() {
        //     $(this).css('overflow-y','scroll')
        // })
        // $('.tree').mouseout(function() {
        //     $(this).css('overflow-y','hidden')
        // })
    }
}