$(document).ready(function() {
    


  var lastKey = 0;
    
  
  var myFunction = function() {
      x=$("#circle").offset();
  $p.text("Div position: " + x.top + " Left position: " + x.left);
  };
  
  
//   var swapImages = function(divName){
//       var $active = $('#'+divName+ ' .active');
//       var $next = ($('#'+divName+ ' .active').next().length > 0) ? $('#'+divName+ ' .active').next() : $('#'+divName+ ' img:first');
//       $active.delay("slow").fadeOut(4, function(){
//       $active.removeClass('active');
//       $next.fadeIn(4).addClass('active');
//       });
//     }

  var swapImagesLeft = function(){
      var $active = $('#goLeft .active');
      var $next = ($('#goLeft .active').next().length > 0) ? $('#goLeft .active').next() : $('#goLeft img:first');
      $active.fadeOut(1, function(){
      $active.removeClass('active');
      $next.fadeIn(1).addClass('active');
      });
    }

  var swapImagesRight = function(){
      var $active = $('#goRight .active');
      var $next = ($('#goRight .active').next().length > 0) ? $('#goRight .active').next() : $('#goLeft img:first');
      $active.fadeOut(1, function(){
      $active.removeClass('active');
      $next.fadeIn(1).addClass('active');
      });
    }


  
  
  var mySecondFunction = function() {
      g=$('img').offset(); 
 $h1.text("Img position: "+ g.top + " Left position: " + g.left); 
  };
  
  
  //var checkIfEat = function() {
	//     i=$('img').offset();
	  //   k=$('#circle').offset();
	  //if ((calcDif(i.left, k.left)<30)&&(calcDif(i.top, k.top)<30)) {
	 //     swapImages();
	      
	      
	     
	   
	    //  $('#circle').hide();
	     
//} else { 
    
//} 
//	};
	
	var calcDif = function (num1, num2) {
	return Math.abs(num1 - num2);
	
	};
	

	    

   setInterval(myFunction, 200); 
 //  setInterval(checkIfEat, 200)

    
    $('#circle').animate({top: "+=250px"}, 8000);
    
    
    $(document).keydown(function(key) {
        mySecondFunction();
                         
        switch(parseInt(key.which,10)) {
			// Left arrow key pressed
			case 37:
			     if (lastKey == 39) {
			         		         			         
			         $('#goRight .active').removeClass('active');
			         $('#leftRightDown').addClass('active');
			     } 
			    
 	            
 				$('#goLeft .active').animate({left: "-=5px"}, 'fast');
 				 
 				swapImagesLeft();
 				lastKey = 37;				
			
			    
				break;
						// Right Arrow Pessed
			case 39:
			 
			 $('#goLeft .active').removeClass('active');
						   
			   $('#rightRightDown').addClass('active');
				$('#goRight .active').animate({left: "+=5px"}, 'fast');
				lastKey = 39;
				break;
			
		}
	});
	
		
	

	
	
});
