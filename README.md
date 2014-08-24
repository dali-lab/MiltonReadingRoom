Written by Graeson McMahon - 8/23/14

The John Milton Reading Room (JMRR) is written entirely in HTML, CSS, and javascript/jQuery.
It can therefore be easily modified and updated via a text editor.

A page of the website typically consists of two parts: 

-text.shtml (All text/images/tags that appear when the page is first loaded)
-annotation.js (A javascript file with key-value pairs representing all the annotations
                for text.shtml)
				
The main components of a typical text.shtml page are three div tags: an outer div (id: #container)
and two inner divs (id: #content) and (id: #annotation). (#content) is initially filled with the page's
text; when an annotation is clicked, (#content) contracts to make room for the annotation, which appears
in (#annotation).   

(#container) is preceded by a header and footer, which vary minimally from page to page; the most drastic
change being the addition of a sidebar for works with multiple parts. 
				
A given text.shtml file accesses annotation.js through the following mechanism:

	-Any selection of text that is annotated is placed within an <a> tag with class "annotBtn"
	 (for example <a href="" class="annotBtn" id="intro">Introduction</a>). The id for this tag
	 corresponds to a key in annotation.js; in this case, a key-value pair with the key "intro."
	 Clicking on an "annotBtn" indexes into the array in annotation.js using its id, displaying the
	 result to the right of the selected text.

Most (but not all) text.shtml files have an associated annotation.js file; some also have introductory pages
(intro.shtml) or title pages (title.shtml). 

If a page has annotations, it always draws from the annotation.js file in its own folder; as a result, occasionally
multiple files reference a single annotation.js file. 
	 
In addition to annotation.js files and jQuery files, there are four main .js files that pages of the JMRR reference;
these files drive the above-described annotation mechanism, account for browser discrepancies, etc:

-miltonContents.js: Referenced only by the home page
-miltonNoNav.js: Referenced by internal pages without sidebar navigation
-miltonNav.js: Referenced by internal pages with sidebar navigation
-miltonNavWithLatin.js: Referenced by internal pages with multiple languages and sidebar navigation*
 
milton.js is vestigial. miltonNavWithLatinCOMMMENTED.js is included for the sake of anyone following up on my work;
the other .js files are essentially subsets of miltonNavWithLatin.js, so I feel this is sufficient for understanding
the site's javascript component.  

All pages reference a single .css file: style.css**

 
KNOWN ISSUES:
-On mobile devices, the sidebar lags slightly in following the user's scrolling. To my knowledge,
 this is a consequence of slower javascript processing on mobile devices. 
 
 
 *This is one organizational mistake I made when converting the site to my new design; I assumed
  that the only multiple-language works were English/Latin. To the contrary, some of Milton's sonnets are
  English/Italian. These works nevertheless reference miltonNavWithLatin.js.
 **It might be more efficient to have multiple .css files so that each content page references only those
   rules that it requires, but I found it easier to code the site in this manner. 