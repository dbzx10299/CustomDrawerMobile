function CustomDrawerMobile() {
    const selector = {
      drawer: '.pw-sheet',
      content: '.pw-sheet .pw-sheet__content',
      overlay: '.pw-sheet__wrapper',
      close: '.pw-sheet .pw-close-button'
    }
    
    let template = '';
  
    function render(config) {
      if (!config) {
        config = {};
      }
            
      const { drawerTransition='pw--slide-right', drawerType='', shrinkToContent='' } = config;
      
      return `
         <div class="pw-sheet ${drawerTransition} ${drawerType}">
	    <div class="pw-sheet__mask"></div>
	       <div class="pw-sheet__wrapper">
	          <div class="pw-sheet__inner ${shrinkToContent}">
	             <div class="pw-sheet__content">

		     </div>
		  </div>
	       </div>
	    </div>`; 
    }
  
	
    function open(config) {
        if (!config) {
          config = {};
        }
      
        const { drawerType, onRender } = config;
      
        template = render(config);
        $('#main').append(template);
      
      	if (onRender) {
          onRender()
        }
      
        if (drawerType) {
            setTimeout(function() {
              $('.pw-sheet__mask').css("opacity", "0.5");
              $('.pw-sheet__wrapper').css("transform", "translateX(0%)");
            }); 
        }
          
        setTimeout(function() {
          $('.pw-sheet__mask').css("opacity", "0.5");
          $('.pw-sheet__wrapper').css("transform", "translateY(0%)");
        });
    }
	
  
    function close() {
        $('.pw-sheet__mask').css("opacity", "0");
        $('.pw-sheet__wrapper').css("transform", "");
      
        setTimeout(() => {
	   $(selector.drawer).remove();
	}, 400);
    }

    function closeImmediate() {
        $(selector.drawer).remove();
    }


    $(document).on('click', selector.overlay, function(e) {
      close();
    });

    $(document).on('click', selector.close, function() {
        if ($(selector.close).hasClass('pw--close-immediate')) {
           closeImmediate();
        }
        close();
    })
  	
    return {
        selector,
        open,
      	close
    }
}

const customDrawerMobile = CustomDrawerMobile();


// There are two css selectors set up 
// 1.) .pw--slide-bottom .pw-sheet__wrapper 
// 2.) .pw--slide-right .pw-sheet__wrapper

// .open() to slide up
// .open('string') to slide right

// close button is always in the content which gets injected
// add the class 'pw--close-immediate' to 'pw-button pw-close-button'
// drawer will close immediately with this class and will close with transition without

// contentModifier - we pass in 'shrink-to-content' class
// this is a flex: 0 0 auto property that causes the drawer to shrink down to content
	
