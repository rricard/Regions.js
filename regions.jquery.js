/*global jQuery, window, document */
/*!	
* Regions.js v0.1
*
* Copyright 2011, Robin Ricard
* Released under the MIT license
*/

(function($, window, document, undefined ) {
  
  /**
   * Defines the standard settings
  */
  
  var settings = defaults = {
    resizing: true,
    lazyTime: 150,
    resizeOversizedElements : true // set to false, if you handle the overflow of oversized elems by yourself
  },
  
  /**
   * Build and rebuild when window sizing changes
  */
    
  autoBuildRegions = function (flowContainer, regions, settings) {
    // First display
    buildRegions(flowContainer, regions, settings);
    // is the lazy timeout engaged ?
    var lazyEngaged = false;
    // When Resize
    $(window).resize(function () {
      if(!lazyEngaged) { // if no event was fired in the few seconds before
        lazyEngaged = true; // it tells that an event was fired
        setTimeout(function () { // and it waits before rebuild that things happens
          buildRegions(flowContainer, regions, settings);
          lazyEngaged = false;
        }, settings.lazyTime);
      }
    });
  },
    
  /**
   * Introduce a flow into several regions (once)
   * Returns the overflow in a DOM element
   */
  
  buildRegions = function (flowContainer, regions, settings) {
    regions = regions.slice(0); // Copy of the Array
    flowContainer.css("display", "none");
    var overflow = integrate(flowContainer, regions[0]);
    regions.shift();
    if (regions.length > 0) {
      return buildRegions(overflow, regions);
    } else {
      return overflow;
    }
  },
  
  /**
   * Just put enough elements (that fits) into the region
   * Returns the overflow in a container
   */
  
  integrate = function (elementsContainer, region) {
    // This avoids the original copy's alteration 
    elementsContainer = elementsContainer.clone();
    
    // This redefines the offsetParent for children
    if (region.css("position") === "static") {
      region.css("position", "relative");
    }
    
    // This introduces the elements
    region.empty();
    region.append(elementsContainer.children());
    
    // Clears the top margin
    region.children().first().css("margin-top", "0");
    
    // This removes the overflow and return it
    var ret = overflowRemover(region);
    
    // Clears the bottom margin
    region.children().last().css("margin-bottom", "0");
    
    return ret;
  },
  
  /**
   * Removes and return the overflow in a region
   * for each container you want to analyze.
   */
    
  overflowRemover = function (elementsContainer, region, letteringForbidden) {
    if (region === undefined) {
      region = elementsContainer;
    }
    
    // This create an empty and hidden DOM node
    var overflowContainer = $("<div></div>"),
        elements = elementsContainer.children(),
    // This stores the first element that had to be rejected
        firstRejected = false;
    
    elements.each(function (index, element) {
      element = $(element); // jQuery manipulable
      if (firstRejected) { // If a rejected element have been keeped.
          // It's added directly into the overflow node
          element.detach();
          overflowContainer.append($("<span> </span>")); // Fix whitespace issues
          overflowContainer.append(element);
      } else if ( // If it does not fit in the region
        element.position().top + element.outerHeight(true) >= region.height()
      ) { 
        element.detach();
        firstRejected = element;
      }
    });
    
    if (firstRejected) { // The first rejected is taken
      // If some children are text nodes, treat it with Lettering.js
      if (!letteringForbidden) {
        firstRejected.contents().filter(function() {
          return this.nodeType === 3; // Select text nodes
        })
          .wrap("<span></span")
          .parent()
          .lettering("words");
        letteringForbidden = true;
      }
      // If he is not empty
      if (firstRejected.children().length) {
        // He is reintroduced into the DOM
        elementsContainer.append(firstRejected);
        // The same treatment will be performed on him (recursion)
        var removed = overflowRemover(firstRejected, region, letteringForbidden),
        // His overflow will be moved into his parent's overflow
            reintroduce = firstRejected.clone();
        reintroduce.empty();
        reintroduce.append(removed.children());
        overflowContainer.prepend(reintroduce);
      } else {
        overflowContainer.prepend(firstRejected);
      }
    }

    // if the first element is immediately rejected, its probably too big for the region
    // so append it anyways. by default, the max-width and max-height are set to the regions dimension.
    if (firstRejected && elementsContainer.children().length === 0) {
      if (settings.resizeOversizedElements) {
        firstRejected.css({
          'max-width' : region.innerWidth(),
          'max-height' : region.innerHeight()
        });
      };
      elementsContainer.append(firstRejected);
    }

    return overflowContainer;
  };
  
  /**
   * The JS API is a jQuery plugin
   * Target your flow node with jQuery
   * The first parameter is an array or jQuery Object/String of the regions you want to target
   * The second parameter are the options
   */
   
  $.fn.regions = function (regions, settings) {
    // Merge settings with defaults
    settings = $.extend(defaults, settings);

    // add possibility to define target regions via jquery object or query string
    if (typeof regions === "string" || regions instanceof jQuery) {
      if (!(regions instanceof jQuery)) {
        regions = $(regions);
      }
      regionsArray = $.makeArray(regions);
      regions = $.map(regionsArray, function(region) {
          return $(region);
      });
    } else {
      // Ensure that we're passing DOM elements not just strings !
      regions = $.map(regions, function (region) {
        if(typeof region === "string") {
          return $(region);
        } else {
          return region;
        }
      });
    }

    // Then call the right function
    if(settings.resizing) {
      autoBuildRegions($(this), regions, settings);
    } else {
      buildRegions($(this), regions, settings);
    }

    // maintain chainability
    return this;
  };
  
})(jQuery, window, document);