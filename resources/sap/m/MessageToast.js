/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2014 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
jQuery.sap.declare("sap.m.MessageToast");jQuery.sap.require("sap.ui.core.Popup");jQuery.sap.require("sap.m.InstanceManager");sap.m.MessageToast={};sap.m.MessageToast._OFFSET="0 -64";sap.m.MessageToast._CSSCLASS="sapMMessageToast";sap.m.MessageToast._mSettings={duration:3000,width:"15em",my:"center bottom",at:"center bottom",of:document.defaultView,offset:"0 0",collision:"fit fit",onClose:null,animationTimingFunction:"ease",animationDuration:1000,autoClose:true,closeOnBrowserNavigation:true};sap.m.MessageToast._aPopups=[];sap.m.MessageToast._iOpenedPopups=0;sap.m.MessageToast._bBoundedEvents=false;
sap.m.MessageToast._validateSettings=function(s){this._isFiniteInteger(s.duration);this._validateWidth(s.width);this._validateDockPosition(s.my);this._validateDockPosition(s.at);this._validateOf(s.of);this._validateOffset(s.offset);this._validateCollision(s.collision);this._validateOnClose(s.onClose);this._validateAutoClose(s.autoClose);this._validateAnimationTimingFunction(s.animationTimingFunction);this._isFiniteInteger(s.animationDuration)};
sap.m.MessageToast._isFiniteInteger=function(n){if(typeof n!=="number"||!isFinite(n)||!(Math.floor(n)===n)||n<=0){jQuery.sap.log.error('"iNumber" needs to be a finite positive nonzero integer on '+this+"._isFiniteInteger")}};
sap.m.MessageToast._validateWidth=function(w){if(!sap.ui.core.CSSSize.isValid(w)){jQuery.sap.log.error(w+' is not of type '+'"sap.ui.core.CSSSize" for property "width" on '+this+"._validateWidth")}};
sap.m.MessageToast._validateDockPosition=function(d){if(!sap.ui.core.Dock.isValid(d)){jQuery.sap.log.error('"'+d+'"'+' is not of type '+'"sap.ui.core.Popup.Dock" on '+this+"._validateDockPosition")}};
sap.m.MessageToast._validateOf=function(e){if(!(e instanceof jQuery)&&!jQuery.isWindow(e)&&!(e&&e.nodeType===1)&&!(e instanceof sap.ui.core.Control)){jQuery.sap.log.error('"of" needs to be an instance of sap.ui.core.Control or an Element or a jQuery object or the window on '+this+"._validateOf")}};
sap.m.MessageToast._validateOffset=function(o){if(typeof o!=="string"){jQuery.sap.log.error(o+' is of type '+typeof o+', expected "string" for property "offset" on '+this+"._validateOffset")}};
sap.m.MessageToast._validateCollision=function(c){var r=/^(fit|flip|none|flipfit|flipflip|flip flip|flip fit|fitflip|fitfit|fit fit|fit flip)$/i;if(!r.test(c)){jQuery.sap.log.error('"collision" needs to be a single value “fit”, “flip”, or “none”, or a pair for horizontal and vertical e.g. "fit flip”, "fit none", "flipfit" on '+this+"._validateOffset")}};
sap.m.MessageToast._validateOnClose=function(f){if(typeof f!=="function"&&f!==null){jQuery.sap.log.error('"onClose" should be a function or null on '+this+"._validateOnClose")}};
sap.m.MessageToast._validateAutoClose=function(b){if(typeof b!=="boolean"){jQuery.sap.log.error('"autoClose" should be a boolean on '+this+"._validateAutoClose")}};
sap.m.MessageToast._validateAnimationTimingFunction=function(t){var r=/^(ease|linear|ease-in|ease-out|ease-in-out)$/i;if(!r.test(t)){jQuery.sap.log.error('"animationTimingFunction" should be a string, expected values: '+"ease, linear, ease-in, ease-out, ease-in-out on "+this+"._validateAnimationTimingFunction")}};
sap.m.MessageToast._hasDefaulPosition=function(o){for(var p=["my","at","of","offset"],i=0;i<p.length;i++){if(o[p[i]]!==undefined){return false}}return true};
sap.m.MessageToast._createHTMLMarkup=function(s){var m=document.createElement("div");m.style.width=s.width;m.className=sap.m.MessageToast._CSSCLASS;m.appendChild(document.createTextNode(s.message));return m};
sap.m.MessageToast._normalizeOptions=function(o){if(o){if(this._hasDefaulPosition(o)){o.offset=this._OFFSET}if(o.of&&o.of.nodeType===9){o.of=document.defaultView}}else{o={offset:this._OFFSET}}return o};
sap.m.MessageToast._handleResizeEvent=function(){if(sap.ui.Device.system.phone||sap.ui.Device.system.tablet){this._resetPosition(this._aPopups)}jQuery.sap.delayedCall(0,this,"_applyPositions",[this._aPopups])};
sap.m.MessageToast._handleMouseDownEvent=function(e){if(e.isMarked("delayedMouseEvent")){return}this._aPopups.forEach(function(p){p&&p.getAutoClose()&&p.close()})};
sap.m.MessageToast._resetPosition=function(p){for(var i=0,m;i<p.length;i++){m=p[i]&&p[i].getContent();if(m){m.style.visibility="hidden";m.style.left=0}}};
sap.m.MessageToast._applyPositions=function(p){for(var i=0,P,m;i<p.length;i++){P=p[i];if(P){m=P._oPosition;if(sap.ui.Device.system.phone||sap.ui.Device.system.tablet){jQuery.sap.delayedCall(0,this,"_applyPosition",[P,m])}else{P.setPosition(m.my,m.at,m.of,m.offset)}}}};
sap.m.MessageToast._applyPosition=function(p,P){var P=P||p._oPosition,m=p.getContent();p.setPosition(P.my,P.at,P.of,P.offset);m.style.visibility="visible"};
sap.m.MessageToast._setCloseAnimation=function(m,d,c,s){var C="opacity "+s.animationTimingFunction+" "+s.animationDuration+"ms",t="webkitTransitionEnd."+sap.m.MessageToast._CSSCLASS+" transitionend."+sap.m.MessageToast._CSSCLASS;if(s.animationDuration>0){m[0].style.webkitTransition=C;m[0].style.transition=C;m[0].style.opacity=0;m.on(t,function handleMTTransitionEnd(){m.off(t);c()})}else{c()}};
sap.m.MessageToast.show=function(m,o){var s=this,S=jQuery.extend({},this._mSettings,{message:m}),p=new sap.ui.core.Popup(),h,P,M;o=this._normalizeOptions(o);jQuery.extend(S,o);this._validateSettings(S);M=this._createHTMLMarkup(S);P=this._aPopups.push(p)-1;p.setContent(M);p.setPosition(S.my,S.at,S.of,S.offset,S.collision);if(jQuery.support.cssTransitions){p.setAnimations(function fnMessageToastOpen($,d,O){O()},function fnMessageToastClose($,d,c){s._setCloseAnimation($,d,c,S)})}p.setShadow(false);p.setAutoClose(S.autoClose);if(S.closeOnBrowserNavigation){sap.m.InstanceManager.addPopoverInstance(p)}if(!this._bBoundedEvents){jQuery(window).on("resize."+sap.m.MessageToast._CSSCLASS,jQuery.proxy(this._handleResizeEvent,this));jQuery(document).on("mousedown."+sap.m.MessageToast._CSSCLASS,jQuery.proxy(this._handleMouseDownEvent,this));this._bBoundedEvents=true}p.open();this._iOpenedPopups++;p.attachClosed(function h(){sap.m.InstanceManager.removePopoverInstance(s._aPopups[P]);jQuery(s._aPopups[P].getContent()).remove();s._aPopups[P].detachClosed(h);s._aPopups[P].destroy();s._aPopups[P]=null;s._iOpenedPopups--;if(s._iOpenedPopups===0){s._aPopups=[];jQuery(window).off("resize."+sap.m.MessageToast._CSSCLASS);jQuery(document).off("mousedown."+sap.m.MessageToast._CSSCLASS);s._bBoundedEvents=false}if(typeof S.onClose==="function"){S.onClose.call(s)}});jQuery.sap.delayedCall(S.duration,p,"close")};
sap.m.MessageToast.toString=function(){return"sap.m.MessageToast"};
