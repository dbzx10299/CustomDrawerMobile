function CustomDrawerMobile() {
    const selector = {
      drawer: '.pw-sheet',
      content: '.pw-sheet .pw-sheet__content',
      close: '.pw-sheet .pw-close-button'
    }
    let template = '';
  
	// pw--slide-right must be passed in due to css selector
    function render(drawerType, contentModifier) {
      if (drawerType) {
        return `
			<div class="pw-sheet ${drawerType}">
                <div class="pw-sheet__mask"></div>
                <div class="pw-sheet__wrapper ${contentModifier}">
					<div class="pw-sheet__inner">
                      <div class="pw-sheet__content">
                          	
                      </div>
                    </div>
                </div>
            </div>`; 
      }     
          return `
  			<div class="pw-sheet pw--slide-bottom">
  				<div class="pw-sheet__mask"></div>
  				<div class="pw-sheet__wrapper ${contentModifier}">
  					<div class="pw-sheet__inner">
  						<div class="pw-sheet__content">

  						</div>
  					</div>
  				</div>
  			</div>`;
    }
  
  
    // pw--slide-right should be only option to use
	function open(drawerType, contentModifier) {
       template = render(drawerType, contentModifier);
       $('#main').append(template);
      
      if (drawerType) {
          setTimeout(function() {
          $('.pw-sheet__mask').css("opacity", "0.5");
          $('.pw-sheet__wrapper').css("transform", "translateX(0%)");
        }); 
      } else {
          setTimeout(function() {
          $('.pw-sheet__mask').css("opacity", "0.5");
          $('.pw-sheet__wrapper').css("transform", "translateY(0%)");
        });
      }
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
// .open('pw--slide-right') to slide right

// close button is always in the content which gets injected
// add the class 'pw--close-immediate' to 'pw-button pw-close-button'
// drawer will close immediately with this class and will close with transition without

// contentModifier - we pass in 'shrink-to-content' class
// this is a flex: 0 0 auto property that causes the drawer to shrink down to content
	