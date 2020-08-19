/*!
jquery.lazyLoadImg - 1.1.3
Copyright © 2016 Kevin Garcia, Stanford University
Released under the The MIT License (MIT)
--------------------------------------------------------------
*/

// Dependent on jquery.waypoints
// Use jscompress.com to minify for production if you modify this script.
// Turn debug to false before minifying.

// -----------------------------------------------------------
// lazyLoadImg Configuration
// -----------------------------------------------------------

// LazyLoadImg Debug Messages
// 'true' displays status messages in console.log. 
// 'fase' just runs through the code and ignores status messages.
// This is primarily useful when debugging or adding functionality.
var lazyLoadImgDebug='false';

// Image Placeholder: 
// the relative or absolute path of whatever placeholder image
// you wish to use.
var $placeholder='data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==';

// Initialize lazyLoadImg Function Calls
$('img.lazyLoadImg').each(function() {
  var img = $(this);
  lazyLoadImg(img);
});

// -----------------------------------------------------------
// lazyLoadImg Functions
// -----------------------------------------------------------

// Check Viewport

function checkViewport() {
  viewportWidth = $(window).width();
  if (viewportWidth > 768) {
    // Desktop fade target
    $fadeTarget = '95%';
  }
  else {
    // Mobile fade target
    $fadeTarget = '200%';
  };
  if (lazyLoadImgDebug == 'true') {
    console.log('fade target is ' + $fadeTarget);
  };
  
}

var resizing = false;
$(window).on('resize', function () {
  if(resizing !== false)
    clearTimeout(resizing);
  resizing = setTimeout(checkViewport, 200);
}).resize();

// lazyLoadImg
function lazyLoadImg(img) {
  var $img=img;
  // replace image source with 1px transparent PNG for positioning
  if($img.attr('src') !== $placeholder) {
    $img.attr('src',$placeholder)
        if (lazyLoadImgDebug == 'true') {
          console.log('%cset img src of ' + $img.attr('data-src') + ' to ' + $img.attr('src'), 'color:orange;')
        };
  };
  // Waypoint lazy loader
  if (lazyLoadImgDebug == 'true') {
   console.log('%clazy loading ' + $img.attr('data-src'), "color:green;")
  };
  // 
  // Check viewport Width
  checkViewport();

  // Reset image source on waypoint
  $($img).waypoint(function() {
    $img.addClass("lazy-loading")
    $img.attr('src',$img.attr('data-src'))
    if($img.hasClass ( "lazy-loading")) {
      this.disable() // disables waypoint once image has started loading
    };

    if (lazyLoadImgDebug == 'true') {
      console.log('%cset src to ' + $img.attr('src') + ' at 200%', "color:green;")
    };

      
    Waypoint.refreshAll()
    if (lazyLoadImgDebug == 'true') {
      console.log('refreshing All waypoints')
    }
  },{
    // Point at which image loads into DOM 
    offset:'350%'
  });

  if($img.hasClass( "lazyLoadImgFade" )) {
    // Waypoint Fade in after load
    $($img).waypoint(function() {
      $img.removeAttr('data-src')
      $img.addClass("lazy-loaded")
      if($img.hasClass ( "lazy-loaded")) {
        $img.removeClass("lazy-loading")
        this.disable() // disables waypoint once image has loaded
      };
      if (lazyLoadImgDebug == 'true') {
        console.log('%c' + $img.attr('src') + ' made visible at ' + $fadeTarget, "color:green;")
      };
    },{ 
      offset:$fadeTarget
      // continuous: true
    });
  } else {
    $img.attr('src', $img.attr('data-src'))
    $img.removeAttr('data-src')
    $img.addClass("lazy-loaded")
    $img.removeClass("lazy-loading")
    if (lazyLoadImgDebug == 'true') {
      console.log('%c' + $img.attr('src') + ' made visible immediately', "color:green;");
    };
  }
};