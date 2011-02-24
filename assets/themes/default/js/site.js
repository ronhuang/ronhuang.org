---
layout: nil
---
/**
 * Copyright 2010 Michael Monteleone
 */
// run plugins
jQuery(function($){
    // yes I know browser sniffing is the root of all evil.  will refactor soon.
    // at least it's only done once!
    var browser = {
        isIe: $.browser.msie,
        isIe6: $.browser.msie && $.browser.version < 7,
        acceleratesCssAnimations: /webkit(.*?)mobile/gim.test(window.navigator.userAgent),
        isTouchPanel: /webkit(.*?)mobile/gim.test(window.navigator.userAgent)
    };

    if(browser.isIe6) {
        // in ie6, don't show the slidey background ghost title
        $('#inner_wrapper').addClass('no-bg');
        // pass all items that contain transparent pngs to an ie6-fixer-upper
        $('header#title h1 a, div#backpages div, body').iepng();
    }

    $.grid({
        columns: 9,
        columnWidth: 80
    });

    // delicious integration
    $('footer section.delicious nav').delicious({
        user: '{{ site.author.delicious }}',
        count: 6
    });

    // twitter integration
    $("footer section.twitter nav").tweet({
        username: '{{ site.author.twitter }}',
        count: 4,
        loading_text: 'loading twitter stream...'
    });
});


(function($){
    $.fn.delicious = function(options) {
        var settings = $.extend({}, $.fn.delicious.defaults, options || {});
        var selection = this;
        if(selection.length > 0) {
            $.getJSON('http://feeds.delicious.com/v2/json/' + settings.user + '?count=' + settings.count + '&callback=?',
                function(links){
                    var list = $('<ul></ul>');
                    $.each(links, function(i, link) {
                        list.append('<li><a title="view this bookmark" href="'+link.u+'">'+link.d+'</a></li>');
                    });
                    selection.append(list);
                });
        }
        return selection;
    };
    $.extend($.fn.delicious, {
        defaults: {
            user: 'namelessmike',
            count: 5
        }
    });
})(jQuery);


/**
 * Simplstic grid layout helper jquery plugin
 * ctrl+shift+L toggles a grid-overlay guide on top of page
 *
 * usage:  $.grid();
 * usage:  $.grid({columns: 9, columnWidth: 80});
 * usage:  $.grid({columns: 4, columnWidth: 180});
 */
(function($){
    var gridWrapper, grid, inited = false,
        init = function(settings) {
            if(!inited) {
                inited = true;

                gridWrapper = $('<div id="jq_grid_wrapper"></div>').css({
                    zIndex: 5000,
                    position: 'absolute',
                    top: '0px',
                    height: $(document).height(),
                    width: '100%' }).hide();
                grid = $('<div id="jq_grid"></div>').css({
                    height: '100%',
                    width: settings.columns * settings.columnWidth + 'px'
                }).appendTo(gridWrapper);

                if(settings.align === 'left' || settings.align === 'right') {
                    grid.css('position','absolute').css(settings.align,'0px');
                } else {
                    grid.css({ marginLeft: 'auto', marginRight: 'auto' });
                }

                for(var i = 0; i < settings.columns; i++) {
                    grid.append($('<div class="jq_grid_column"></div>').css({
                        backgroundColor: settings.color,
                        opacity: i % 2 === 0 ? 0.2 : 0.1,
                        width: settings.columnWidth + 'px',
                        height: '100%',
                        'float': 'left'}));
                }
            }
        };
    $.grid = function(options) {
        var settings = $.extend({}, $.grid.defaults, options || {});
        $(document).bind('keydown', function(e){
            init(settings);
            if(e.ctrlKey && e.shiftKey && e.keyCode === settings.toggleKeyCode) {
                if(gridWrapper.is(':hidden')) {
                    gridWrapper.prependTo('body').show();
                } else {
                    gridWrapper.hide().remove();
                }
            }
        });
    };
    $.extend($.grid, {
        defaults: {
            columns: 9,
            columnWidth: 80,
            align: 'center', // left|center|right
            toggleKeyCode: 76, // ctrl+G
            color: 'red'
        }
    });
})(jQuery);


/* a naive IE6 transparent png background-url fix */
/* usage: */
/*    $('body').iepng(); */
(function($){
    $.fn.iepng = function() {
        return this.each(function(){
            var elm = $(this);
            if(elm.css('background-image').match(/\.png/i) !== null) {
                var bg = elm.css('background-image');
                var src = bg.substring(5,bg.length-2);
                elm.css({
                    filter: "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + src + "')",
                    backgroundImage: 'url(x.gif)'
                });
            }
        });
    };
})(jQuery);
