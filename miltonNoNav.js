				// Written by Graeson McMahon - 8/23/14
				
				$(document).ready(function() {
					if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
						$("#header").css("background-attachment", "scroll");
						
					}
					
					$("#search").click(function(evt) {
						evt.preventDefault();
						$("#searchBar").fadeToggle();
					});
					
					var lastTarget = null;
					var slidOver = false;
					
					//$("#annotation").css("height", $("#content").css("height"));
				
					$(".annotBtn").click(function(evt) { 
						var id = $(evt.target).closest("a").attr("id");
						var annot;
						
						if (lastTarget != null) {
							$(lastTarget).closest(".annotBtn").css("background-color", "white");
						}
						
						$(evt.target).closest(".annotBtn").css("background-color", "#DDDDDD");
						
						if ($(lastTarget).closest(".annotBtn")[0] != $(evt.target).closest(".annotBtn")[0]) {
							var location = $(evt.target).offset().top - $(window).scrollTop();
							
							$("#content").css("width", "65%");
							$("#container").css("margin-right", "5%");
							
							if ($("#content").attr("class") == "lengthyWork") {
								
								if (!slidOver) {
									$(window).scrollTop($(evt.target).offset().top - location);
								}
							}
							
							annot = $("#annotation").empty().append(annotList[id]);
							slidOver = true;
							lastTarget = evt.target;
						}
						else {
							var location = $(evt.target).offset().top - $(window).scrollTop();
							
							$("#content").css("width", "100%");
							$("#container").css("margin-right", "14%");
							
							annot = $("#annotation").empty();
							
							if ($("#content").attr("class") == "lengthyWork") {							
								$(window).scrollTop($(evt.target).offset().top - location);
							}
													
							
							//$(evt.target).closest(".annotBtn").css("background-color", "white");
							lastTarget = null;
							slidOver = false;
						}
						
						
						
						if ($("#content").css("display") == "none") {
							if ($(evt.target).closest("#alternateContent").length != 0) {
								$(".annotation").offset({top:$(this).offset().top}); 
							}
							else {
								$(".annotation").offset({top:$("#alternateContent").offset().top});
							}
						
						}
						else {
							if ($(evt.target).closest("#content").length != 0) {
								$(".annotation").offset({top:$(this).offset().top}); 
							}
							else {
								$(".annotation").offset({top:$("#content").offset().top});
							}
						
						}
								
						evt.preventDefault();
					});//end click
					
					
					
					
					
					
					window.onresize = function() {
						$("#copyrightFooter").css("font-size", "1.0em")
						$("#header").css("font-size", "1.0em");
						
						while ($(".firstWord1").offset().top != $(".secondWord1").offset().top || 
							$(".firstWord2").offset().top != $(".secondWord2").offset().top) {
							
				
							var fontSize = parseFloat($("#copyrightFooter").css("font-size")) - 2;
							$("#copyrightFooter").css("font-size", fontSize);
						}
						
						while ($(".headerFix1").height() != $(".headerFix2").height())  {
							var fontSize = parseFloat($("#header").css("font-size")) - 2;
							$("#header").css("font-size", fontSize);
						}
						
						
						if (lastTarget == null) {
							$("#container").css("margin-left", "14%");
							$("#content").css("width", "100%");
							$("#container").css("margin-right", "14%");
							
						}
						else {
							$("#container").css("margin-left", "14%");
							$("#content").css("width", "65%");
							$("#container").css("margin-right", "5%");
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