				$(document).ready(function() {
					if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
						$("#header").css("background-attachment", "scroll");
						$(".tocBanner").css("background-attachment", "scroll");	
					}
					
					
					$(".resizedForToc").css("padding-right", "10%");
					
					$("#search").click(function(evt) {
						evt.preventDefault();
						$("#searchBar").fadeToggle();
					});
					
					window.onresize = function() {
						$("#copyrightFooter").css("font-size", "1.0em")
						$("#header").css("font-size", "1.0em");
						
						while ($(".headerFix1").height() != $(".headerFix2").height())  {
							var fontSize = parseFloat($("#header").css("font-size")) - 2;
							$("#header").css("font-size", fontSize);
						}
						
						
						while ($(".firstWord1").offset().top != $(".secondWord1").offset().top || 
							$(".firstWord2").offset().top != $(".secondWord2").offset().top) {
							
				
							var fontSize = parseFloat($("#copyrightFooter").css("font-size")) - 2;
							$("#copyrightFooter").css("font-size", fontSize);
						}
						
						
					};		
					
					
					if (window.screen.availWidth < 1000) {
						$("#container").css("font-size", ".8em");
					}
					
					while ($(".firstWord1").offset().top != $(".secondWord1").offset().top || 
							$(".firstWord2").offset().top != $(".secondWord2").offset().top) {
							var fontSize = parseFloat($("#copyrightFooter").css("font-size")) - 2;
							$("#copyrightFooter").css("font-size", fontSize);
					}
					while ($(".headerFix1").height() != $(".headerFix2").height())  {
							var fontSize = parseFloat($("#header").css("font-size")) - 2;
							$("#header").css("font-size", fontSize);
					}
					
				});//end function