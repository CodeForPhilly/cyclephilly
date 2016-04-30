/*
 ADOBE CONFIDENTIAL
 ___________________

 Copyright 2011 Adobe Systems Incorporated
 All Rights Reserved.

 NOTICE:  All information contained herein is, and remains
 the property of Adobe Systems Incorporated and its suppliers,
 if any.  The intellectual and technical concepts contained
 herein are proprietary to Adobe Systems Incorporated and its
 suppliers and may be covered by U.S. and Foreign Patents,
 patents in process, and are protected by trade secret or copyright law.
 Dissemination of this information or reproduction of this material
 is strictly forbidden unless prior written permission is obtained
 from Adobe Systems Incorporated.
*/
if($.browser.SafariMobile&&parseFloat((/CPU.+OS ([0-9_]{3}).*AppleWebkit.*Mobile/i.exec(navigator.userAgent)||[0,"4_2"])[1].replace("_","."))<4.1)$.fn.Oldoffset=$.fn.offset,$.fn.offset=function(){var a=$(this).Oldoffset();a.top-=window.scrollY;a.left-=window.scrollX;return a};
(function(a){var b=0,c=0,d=a.browser.msie&&a.browser.version<"9.0"?16:0,f;a.fn.toBrowserWidth=function(){var g=a(this),h=function(){c!=a(window).width()&&(c=a(window).width(),g.css({height:function(){return a(this).height()},width:1,marginLeft:0,left:0,overflow:"hidden",marginRight:0,padding:0}),a("html, script, br, meta, link").each(function(){this.style.display="block";this.style.display=""}),f||(f=function(){b=a(document).width();var c=document.documentElement||document.body;c.clientWidth!=c.offsetWidth&&
(b=c.scrollWidth-1);if(document.documentElement&&c.scrollWidth!=document.body.scrollWidth&&window.screen.width<document.body.scrollWidth)b=document.body.scrollWidth;var d=Math.max(0,b-a(window).width());g.each(function(){var c=a(this),f=-1*c.offset().left+(parseInt(c.css("left"))||0);c.css("padding","");var g=parseInt(c.css("padding-right"));c.css({marginLeft:f,marginRight:-b+(Muse.Browser.Bugs.ClearNeedsOuterWidth&&!c.hasClass("grpelem")?Math.abs(f)+1:-Math.abs(f)),width:b-(c.outerWidth()-c.width())-
d,overflow:"",height:"",paddingRight:d+g});c.parent().width()});f=!1},d?setTimeout(f,d):f()))};a(window).resize(h);a(document).ready(h);return this}})(jQuery);
