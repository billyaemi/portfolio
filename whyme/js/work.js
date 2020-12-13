(function($) {
 
  var SliceSlider = {
    
    settings: {
      delta:              0,
      currentSlideIndex:  0,
      scrollThreshold:    40,
      slides:             $('.slide'),
      numSlides:          $('.slide').length,
      navPrev:            $('.js-prev'),
      navNext:            $('.js-next'),
    },
  
    init: function() {
      s = this.settings;
      this.bindEvents();
    },
    
    bindEvents: function(){
      
      s.slides.on({
        'DOMMouseScroll mousewheel' : SliceSlider.handleScroll
      });
      // Prev
      s.navPrev.on({
        'click' : SliceSlider.prevSlide
      });
      // Next
      s.navNext.on({
        'click' : SliceSlider.nextSlide
      });
      $(document).keyup(function(e) {
        // Arrows
        if ((e.which === 37) ||  (e.which === 38)){
          SliceSlider.prevSlide();
        }
        // Down / Right
        if ((e.which === 39) ||  (e.which === 40)) {
          SliceSlider.nextSlide();
        }
      });
    },
    
    handleScroll: function(e){

      // Up
      if (e.originalEvent.detail < 0 || e.originalEvent.wheelDelta > 0) { 

        s.delta--;
     
        if ( Math.abs(s.delta) >= s.scrollThreshold) {
          SliceSlider.prevSlide();
        }
      }
 
      // Down
      else {
 
        s.delta++;
 
        if (s.delta >= s.scrollThreshold) {
          SliceSlider.nextSlide();
        }
      }
 
      // Scrolling
      return false;
    },

    showSlide: function(){ 
      // reset
      s.delta = 0;
      if ($('body').hasClass('is-sliding')){
        return;
      }
      // Loop
      s.slides.each(function(i, slide) {

        // Toggle
        $(slide).toggleClass('is-active', (i === s.currentSlideIndex)); 
        $(slide).toggleClass('is-prev', (i === s.currentSlideIndex - 1)); 
        $(slide).toggleClass('is-next', (i === s.currentSlideIndex + 1)); 
        
        // Add / Remove
        $('body').addClass('is-sliding');

        setTimeout(function(){
            $('body').removeClass('is-sliding');
        }, 1000);
      });
    },

    prevSlide: function(){
      
      if (s.currentSlideIndex <= 0) {
        s.currentSlideIndex = s.numSlides;
      }
      s.currentSlideIndex--;
      
      SliceSlider.showSlide();
    },

    nextSlide: function(){
      
      s.currentSlideIndex++;
   
      if (s.currentSlideIndex >= s.numSlides) { 
        s.currentSlideIndex = 0;
      }
 
      SliceSlider.showSlide();
    },
  };
  SliceSlider.init();
})(jQuery);