/*!
 * jQuery cblibrary plugin
 * Copyright 2010, CareerBuilder.com
 */
var cbj=jQuery;(function(a){a.ajaxSetup({timeout:10000});a.cb=function(){this._Tallies={};this._sPage=ScriptVariables.Get("sPageNamePath");var b=function(f,e){e.type=f;e.page=this._sPage;e.key=e.type+"_"+e.object+"_"+e.method+"_"+e.task;if(this._Tallies[e.key]){switch(f){case"tally":this._Tallies[e.key].numthings+=e.numthings;break;case"timing":this._Tallies[e.key].duration=e.duration;break;case"exception":this._Tallies[e.key]=e;break}}else{this._Tallies[e.key]=e}};var d=function(e){e=e.replace(",","");return e};var c=function(){var f="";var h=0;var g=null;for(var e in this._Tallies){if(e!=undefined&&this._Tallies[e]!=undefined){g=this._Tallies[e];h+=1;if(f!=""){f+="&"}f+=g.type+h+"=";f+=g.page;f+=","+d(g.object);f+=","+d(g.method);f+=","+d(g.task);switch(g.type){case"tally":f+=","+d(g.numthings.toString());break;case"timing":f+=","+d(g.duration.toString());break;case"exception":f+=","+d(g.exceptionName);f+=","+d(g.exceptionMessage);f+=","+d(g.navigatorUserAgent);break}}}if(f!=""){a.post(ScriptVariables.Get("sAtlasTallyUrl"),f,function(){this._arTallies={}})}};a(window).one("unload",a.proxy(c,this));return{Tally:function(j,g,i,h){try{var f={object:j,method:g,task:i};h?f.numthings=h:f.numthings=1;b("tally",f)}catch(k){a.cb.Exception("cb","addTally","Error creating and storing tally.",k)}},Timing:function(j,f,i,g){try{var h={object:j,method:f,task:i};if(g){h.duration=g}else{h.duration=0}b("timing",h)}catch(k){a.cb.Exception("cb","addTiming","Error creating and storing timing.",k)}},Exception:function(i,f,g,h){try{var k={};k.object=i;k.method=f;k.task=g;k.exceptionName=h.name;k.exceptionMessage=h.message;k.navigatorUserAgent=window.navigator.userAgent.toString();b("exception",k)}catch(j){}},namespace:function(){var e=arguments,l=this,k=0,h=0,f=null,g=null;for(k=0;k<e.length;k=k+1){f=e[k].split(".");for(h=0;h<f.length;h=h+1){g=f[h];l[g]=l[g]||{};l=l[g]}}return l}}}()})(jQuery);