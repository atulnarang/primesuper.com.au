/*
*   Accessibility JS
*   Author Adam Phin
*   Copyright 2012
*   All rights reserved.
*/
accessibility={init:function(){},isCSSDisabled:function(){return console.log(document.styleSheets[0].disabled),document.styleSheets[0].disabled},hasClass:function(e,t){return(new RegExp("(\\s|^)"+t+"(\\s|$)")).test(e.className)},removeClass:function(e,t){accessibility.hasClass(e,t)&&(e.className=e.className.replace(new RegExp("(\\s|^)"+t+"(\\s|$)")," ").replace(/^\s+|\s+$/g,""))},addClass:function(e,t){accessibility.hasClass(e,t)||(e.className+=(e.className?" ":"")+t)}};