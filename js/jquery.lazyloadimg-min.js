/*!
jquery.lazyLoadImg-min - 1.1.3
Copyright © 2016 Kevin Garcia, Stanford University
Released under the The MIT License (MIT)
Requires jquery.waypoints
Minified with jscompress.com
*/

function checkViewport(){viewportWidth=$(window).width(),viewportWidth>768?$fadeTarget="95%":$fadeTarget="200%","true"==lazyLoadImgDebug&&console.log("fade target is "+$fadeTarget)}function lazyLoadImg(a){var e=a;e.attr("src")!==$placeholder&&(e.attr("src",$placeholder),"true"==lazyLoadImgDebug&&console.log("%cset img src of "+e.attr("data-src")+" to "+e.attr("src"),"color:orange;")),"true"==lazyLoadImgDebug&&console.log("%clazy loading "+e.attr("data-src"),"color:green;"),checkViewport(),$(e).waypoint(function(){e.addClass("lazy-loading"),e.attr("src",e.attr("data-src")),e.hasClass("lazy-loading")&&this.disable(),"true"==lazyLoadImgDebug&&console.log("%cset src to "+e.attr("src")+" at 200%","color:green;"),Waypoint.refreshAll(),"true"==lazyLoadImgDebug&&console.log("refreshing All waypoints")},{offset:"350%"}),e.hasClass("lazyLoadImgFade")?$(e).waypoint(function(){e.removeAttr("data-src"),e.addClass("lazy-loaded"),e.hasClass("lazy-loaded")&&(e.removeClass("lazy-loading"),this.disable()),"true"==lazyLoadImgDebug&&console.log("%c"+e.attr("src")+" made visible at "+$fadeTarget,"color:green;")},{offset:$fadeTarget}):(e.attr("src",e.attr("data-src")),e.removeAttr("data-src"),e.addClass("lazy-loaded"),e.removeClass("lazy-loading"),"true"==lazyLoadImgDebug&&console.log("%c"+e.attr("src")+" made visible immediately","color:green;"))}var lazyLoadImgDebug="false",$placeholder="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==";$("img.lazyLoadImg").each(function(){var a=$(this);lazyLoadImg(a)});var resizing=!1;$(window).on("resize",function(){resizing!==!1&&clearTimeout(resizing),resizing=setTimeout(checkViewport,200)}).resize();