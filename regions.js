window.CSSRegions = (function( window, document, undefined ) {
  
  /**
   * Version
   */
  
  var version = "0.1",
  
  /**
   * The main object, automation and public manipulation API
   */
  
  CSSRegions = {
    
    /**
     * Stores the flows to be analyzed
     */
    
    sets: [],
    
    /**
     * Automated CSS analyse and modifications listening
     */
    
    automation: function() {
      
    },
    
    /**
     * CSS Analyse to catch sets
     */
    
    cssAnalyse: function(dom) {
      
    },
    
    /**
     * Build and rebuild when window sizing changes
     */
    
    autobuild: function (flowContainer, regionsArray) {
      // First display
      CSSRegions.build(flowContainer, regionsArray);
      // When Resize
      $.each(regionsArray, function (index, region) {
        $(window).resize(function () {
          CSSRegions.build(flowContainer, regionsArray);
        });
      });
    },
    
    /**
     * Introduce a flow into several regions (once)
     * Returns the overflow in a DOM element
     */
    
    build: function (flowContainer, regionsArray) {
      regionsArray = regionsArray.slice(0); // Copy of the Array
      flowContainer.css("display", "none");
      var overflow = RegionBuilder.integrate(flowContainer, regionsArray[0]);
      regionsArray.shift();
      if (regionsArray.length > 0) {
        return CSSRegions.build(overflow, regionsArray);
      } else {
        return overflow;
      }
    }
    
  },
  
  /**
   * The display and calculation core (private)
   */
  
  RegionBuilder = {
    
    /**
     * Just put enough elements (that fits) into the region
     * Returns the overflow in a container
     */
    
    integrate: function (elementsContainer, region) {
      // This avoids the original copy's alteration 
      elementsContainer = elementsContainer.clone();
      
      // This redefines the offsetParent for children
      if (region.css("position") == "static")
        region.css("position", "relative");
      
      // This introduces the elements
      region.empty();
      region.append(elementsContainer.children());
      
      // Clears the top margin
      region.children().first().css("margin-top", "0");
      
      // This removes the overflow and return it
      var ret = RegionBuilder.overflowRemover(region);
      
      // Clears the bottom margin
      region.children().last().css("margin-bottom", "0");
      
      return ret;
    },
    
    /**
     * Removes and return the overflow in a region
     * for each container you want to analyze.
     */
      
    overflowRemover: function (elementsContainer, region, letteringForbidden) {
      if (region === undefined) region = elementsContainer;
      
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
            return this.nodeType == 3; // Select text nodes
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
          var removed = RegionBuilder.overflowRemover(firstRejected, region, letteringForbidden),
          // His overflow will be moved into his parent's overflow
              reintroduce = firstRejected.clone();
          reintroduce.empty();
          reintroduce.append(removed.children());
          overflowContainer.prepend(reintroduce);
        } else {
          overflowContainer.prepend(firstRejected);
        }
      }
      
      return overflowContainer;
    }
  };
  
  $(function(){
    // Let's start the automation
    CSSRegions.automation();
  });
  
  return CSSRegions;
})(this, this.document);