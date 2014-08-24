				// Written by Graeson McMahon - 8/23/14
				
				$(document).ready(function() {
					
					// The parallax effect on the banners is achieved by setting background-attachment to
					// 'fixed'; this effect does not function as expected on mobile devices, so we return
					// the banners to background-attachment: scroll if we detect a mobile browser.
					if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
						$("#header").css("background-attachment", "scroll");
						$("#headerCommon").css("background-attachment","scroll");
					}
					
					// Reduce the font-size on screens with less width to accommodate the three-column
					// design
					if (window.screen.availWidth < 1000) {
						$("#container").css("font-size", ".8em");
					}
					
					
					var sidebarStopped = false;
					var minHeightSet = false;
					
					// If the size of the container div is less than the height of the
					// sidebar, expand the container so that it can comfortably hold
					// the sidebar. Disables code which allows the sidebar to scroll
					// with the window, as the sidebar has nowhere to go.
					if ($("#container").height() < $("#sidebar").height()) {
						minHeightSet = true;
						$("#container").css("min-height", $("#sidebar").height());
						$("#home").css("top", "2%");
						$("#home").css("position", "absolute");
					}
					
					
					// Code which runs every time the user scrolls:
					$(window).scroll(function(evt){
					
						// If the minimum height of the container hasn't been set, the following code block,
						// does the following:
						// 1. Allows the sidebar to remain fixed to the left side of the screen if the window
						//    is scrolled below the header or above the footer
						// 2. Stops the sidebar before it collides with the header or footed
						if (!minHeightSet) {
							// Fixes the sidebar to the left side of the screen upon detecting the scrollTop to be below the header
							if ($(window).scrollTop() > $("#sidebar").offset().top && $("#sidebar").height() < $(window).height() - 50) {
								$("#sidebar").css("position", "fixed");
								$("#sidebar").css("top", "0%");
						
							}
							// Stops the sidebar from moving upon detecting it has collided with the header, and moves it down
							// to its original location.
							else if ($(window).scrollTop() < $("#container").offset().top) {
								$("#sidebar").css("position", "absolute");
								$("#sidebar").css("top", $("#container").offset().top);
							}
							
							// Determines the height of #content (or #alternateContent, if #content is hidden),
							// and stores it in relevantHeight
							var relevantHeight;
							if ($("#content").css("display") != "none") {
								 relevantHeight = $("#content").offset().top + $("#content").height();
							}
							else {
								relevantHeight = $("#alternateContent").offset().top + $("#alternateContent").height()
							}
							
							// Fixes the sidebar to the left side of the window if the user has scrolled above the footer.
							if (sidebarStopped && $(window).scrollTop() < relevantHeight - $("#sidebar").height()) {
								$("#home").css("position", "fixed");
								$("#home").css("top", "3%");
								$("#sidebar").css("position", "fixed");
								$("#sidebar").css("top", "0%");
								sidebarStopped = false;
								
								if ($("#sidebar").offset().top < $("#container").offset().top) {
									$("#sidebar").css("position", "absolute");
									$("#sidebar").css("top", $("#container").offset().top);
								}
							}						
							// Stops the footer so it does not overlap the footer.
							else if ($("#sidebar").offset().top + $("#sidebar").height() > relevantHeight) {
								
									$("#sidebar").css("top", relevantHeight - $("#sidebar").height());
									$("#sidebar").css("position", "absolute");
									sidebarStopped = true;
							
									$("#home").css("top", $("#sidebar").offset().top + 20);
									$("#home").css("position", "absolute");
							}
						
						}
						
					});
				
					// Latin works always start on the Latin setting;
					// bold 'Latin' in the sidebar to indicate this
					$("#Latin").css("font-weight", "bold");
					
					
					// Switches language to English by hiding #content
					// and showing #alternateContent
					$("#English").click(function(event) {
							$("#English").css("font-weight", "bold");
							$("#Latin").css("font-weight", "normal");
							$("#content").css("display", "none");
							$("#alternateContent").css("display", "block");
							event.preventDefault();
							$("#annotation").empty();
							
							// Check if the language-switch has made the sidebar shorter than
							// the text
							if ($("#container").height() < $("#sidebar").height()) {
								minHeightSet = true;
								$("#container").css("min-height", $("#sidebar").height());
								$("#home").css("top", "2%");
								$("#home").css("position", "absolute");
							}
						});//end click
					
					// Switches language to Latin (or the appropriate non-English 
					// language) by hiding #content and showing #alternateContent
					$("#Latin").click(function(event) {
						$("#English").css("font-weight", "normal");
						$("#Latin").css("font-weight", "bold");
						$("#content").css("display", "block");
						$("#alternateContent").css("display", "none");
						event.preventDefault();
						$("#annotation").empty();
						
						// Check if the language-switch has made the sidebar shorter than
						// the text
						if ($("#container").height() < $("#sidebar").height()) {
								minHeightSet = true;
								$("#container").css("min-height", $("#sidebar").height());
								$("#home").css("top", "2%");
								$("#home").css("position", "absolute");
						}
					});//end click
					
					// Toggles the search bar if the user clicks on the search icon
					$("#search").click(function(evt) {
						evt.preventDefault();
						$("#searchBar").fadeToggle();
					});
					
					var lastTarget = null;
					var slidOver = false;
					
					//$("#annotation").css("height", $("#content").css("height"));
				
					// Displays annotation when an annotBtn is clicked:
					$(".annotBtn").click(function(evt) { 
						
						// Grabs the annotBtn's unique id and stores it in 'id'
						var id = $(evt.target).closest("a").attr("id");
						var annot;
						
						// Un-highlights the previously selected annotBtn
						if (lastTarget != null) {
							$(lastTarget).closest(".annotBtn").css("background-color", "white");
						}
						
						// Highlights the selected annotBtn
						$(evt.target).closest(".annotBtn").css("background-color", "#DDDDDD");
						
						// If the annotBtn clicked is different from the previous one, the user is requesting
						// a new annotation; clear #annotation and display the new text
						if ($(lastTarget).closest(".annotBtn")[0] != $(evt.target).closest(".annotBtn")[0]) {
							var location = $(evt.target).offset().top - $(window).scrollTop();
							
							// Reduce the width of #content (#alternateContent) to allow for the annotation to be
							// displayed
							$("#content").css("width", "65%");
							$("#alternateContent").css("width", "65%");
							$("#container").css("margin-right", "5%");
							
							// Ensure the window is scrolled to the same location after the text
							// is resized
							if ($("#content").attr("class") == "lengthyWork" || $("#alternateContent").attr("class") == "lengthyWork") {
								
								if (!slidOver) {
									$(window).scrollTop($(evt.target).offset().top - location);
								}
							}
							
							// Show the annotation
							annot = $("#annotation").empty().append(annotList[id]);
							slidOver = true;
							lastTarget = evt.target;
						}
						// Otherwise, the user has re-clicked an annotation, clear #annotation
						// and restore #content (#alternateContent) to its original size
						else {
							var location = $(evt.target).offset().top - $(window).scrollTop();
							
							$("#content").css("width", "100%");
							$("#alternateContent").css("width", "100%");
							$("#container").css("margin-right", "14%");
							annot = $("#annotation").empty();
							
							if ($("#content").attr("class") == "lengthyWork" || $("#alternateContent").attr("class") == "lengthyWork") {							
								$(window).scrollTop($(evt.target).offset().top - location);
							}
													
							
							//$(evt.target).closest(".annotBtn").css("background-color", "white");
							lastTarget = null;
							slidOver = false;
						}
						
						
						// Make the annotation appear alongside the clicked annotBtn
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
					
					
					
					
					
					// Ensures smooth transitions when the window is resized:
					window.onresize = function() {
						// Reset header and footer to default font-size when the window is resized
						$("#copyrightFooter").css("font-size", "1.0em")
						$("#header").css("font-size", "1.0em");
						$("#headerCommon").css("font-size", "1.0em");
						$("#sidebar").css("font-size", "1.0em");
						
						// Resize the footer's font until each row of text fits on one line
						while ($(".firstWord1").offset().top != $(".secondWord1").offset().top || 
							$(".firstWord2").offset().top != $(".secondWord2").offset().top) {
							
							var fontSize = parseFloat($("#copyrightFooter").css("font-size")) - 2;
							$("#copyrightFooter").css("font-size", fontSize);
						}
						
						// Resize the header's font until the title fits on one line
						var fontSize = parseFloat($("#header").css("font-size")) - 2;
						while (fontSize && $(".headerFix1").outerHeight() != $(".headerFix2").height())  {
							$("#header").css("font-size", fontSize);
							fontSize = parseFloat($("#header").css("font-size")) - 2;
						}
						fontSize = parseFloat($("#headerCommon").css("font-size")) - 2;
						while (fontSize && $(".headerFix1").outerHeight() != $(".headerFix2").height())  {
							$("#headerCommon").css("font-size", fontSize);
							fontSize = parseFloat($("#headerCommon").css("font-size")) - 2;
						}
						
						
						if (lastTarget == null) {
							$("#container").css("margin-left", "14%");
							$("#container").css("margin-right", "14%");
							$("#content").css("width", "100%");
							$("#alternateContent").css("width", "100%");
							
						}
						else {
							$("#container").css("margin-left", "14%");
							$("#container").css("margin-right", "5%");
							$("#alternateContent").css("width", "65%");
							$("#content").css("width", "65%");
						}
						
						$("#sidebar").css("position", "absolute");
						$("#sidebar").css("top", $("#container").offset().top);
						
						// Ensures the sidebar remains in the appropriate location and state
						// after the resize.
						if (!minHeightSet) {
							if ($(window).scrollTop() > $("#sidebar").offset().top) {
								$("#sidebar").css("position", "fixed");
								$("#sidebar").css("top", "0%");
								
							}
							
							else if ($(window).scrollTop() < $("#container").offset().top) {
							
								$("#sidebar").css("position", "absolute");
								$("#sidebar").css("top", $("#container").offset().top);
							}
							
							var relevantHeight;
							if ($("#content").css("display") != "none") {
								 relevantHeight = $("#content").offset().top + $("#content").height();
							}
							else {
								relevantHeight = $("#alternateContent").offset().top + $("#alternateContent").height()
							}
							
							
							if (sidebarStopped && $(window).scrollTop() < relevantHeight - $("#sidebar").height()) {
									$("#home").css("position", "fixed");
									$("#home").css("top", "3%");
									$("#sidebar").css("position", "fixed");
									$("#sidebar").css("top", "0%");
									sidebarStopped = false;
									
									if ($("#sidebar").offset().top < $("#container").offset().top) {
										$("#sidebar").css("position", "absolute");
										$("#sidebar").css("top", $("#container").offset().top);
									}
									
								}						
							else if ($("#sidebar").offset().top + $("#sidebar").height() > relevantHeight) {
										$("#home").css("top", $("#home").offset().top);
										$("#home").css("position", "absolute");
									
										
											$("#sidebar").css("top", relevantHeight - $("#sidebar").height());
										$("#sidebar").css("position", "absolute");
										sidebarStopped = true;
							}
						}
					};		
					
		
					// Upon loading the page, resize the header and footer text to ensure
					// everything fits on a single line
					while ($(".firstWord1").offset().top != $(".secondWord1").offset().top || 
							$(".firstWord2").offset().top != $(".secondWord2").offset().top) {
							var fontSize = parseFloat($("#copyrightFooter").css("font-size")) - 2;
							$("#copyrightFooter").css("font-size", fontSize);
					}
					var fontSize = parseFloat($("#header").css("font-size")) - 2;
					while (fontSize && $(".headerFix1").outerHeight() != $(".headerFix2").height())  {
							$("#header").css("font-size", fontSize);
							var fontSize = parseFloat($("#header").css("font-size")) - 2;
					}
					fontSize = parseFloat($("#headerCommon").css("font-size")) - 2;
					while (fontSize && $(".headerFix1").outerHeight() != $(".headerFix2").height())  {
							$("#headerCommon").css("font-size", fontSize);
							var fontSize = parseFloat($("#headerCommon").css("font-size")) - 2;
					}
						
					
					while($("#sidebar").height() > $(window).height()) {
						var fontSize = parseFloat($("#sidebar").css("font-size")) - 2;
						$("#sidebar").css("font-size", fontSize);
					}
					
					
				});//end function