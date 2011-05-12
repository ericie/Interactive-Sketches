/**
 * A JavaScript tokenizer / parser / generator.
 *
 * Distributed under the BSD license.
 *
 * Copyright (c) 2010, Mihai Bazon <mihai.bazon@gmail.com>
 * http://mihai.bazon.net/blog/
 *
 * Modifications and adaption to browser (c) 2011, Juerg Lehni
 * http://lehni.org/
 *
 * Based on parse-js, (c) Marijn Haverbeke
 * http://marijn.haverbeke.nl/parse-js/
 */var parse_js=new function(){function S(a,b,c){var d=[];for(var e=0;e<a.length;++e)d.push(b.call(c,a[e],e));return d}function R(a,b){return Object.prototype.hasOwnProperty.call(a,b)}function Q(c){return/^[a-z_$][a-z0-9_$]*$/i.test(c)&&c!="this"&&!R(d,c)&&!R(b,c)&&!R(a,c)}function P(a,b){var c={};a===!0&&(a={});for(var d in b)R(b,d)&&(c[d]=a&&R(a,d)?a[d]:b[d]);return c}function O(a,b){for(var c=b.length;--c>=0;)if(b[c]===a)return!0;return!1}function N(a){return a.split("")}function M(a,b){return Array.prototype.slice.call(a,b==null?0:b)}function L(a){var b={};for(var c=0;c<a.length;++c)b[a[c]]=!0;return b}function K(a){a instanceof Function&&(a=a());for(var b=1,c=arguments.length;--c>0;++b)arguments[b]();return a}function J(a){var b=M(arguments,1);return function(){return a.apply(this,b.concat(M(arguments)))}}function I(a,b){function y(a){var b=a[0],c=p[b];if(!c)throw new Error("Can't find generator for \""+b+'"');x.push(a);var d=c.apply(b,a.slice(1));x.pop();return d}function w(a){var b=a[0],c=a[1];c!=null&&(b=h([b,"=",y(c)]));return b}function v(a){if(!a)return";";if(a.length==0)return"{}";return"{"+d+g(function(){return t(a).join(d)})+d+f("}")}function u(a){var c=a.length;if(c==0)return"{}";return"{"+d+S(a,function(a,e){var i=a[1].length>0,j=g(function(){return f(a[0]?h(["case",y(a[0])+":"]):"default:")},.5)+(i?d+g(function(){return t(a[1]).join(d)}):"");!b&&i&&e<c-1&&(j+=";");return j}).join(d)+d+f("}")}function t(a){for(var c=[],d=a.length-1,e=0;e<=d;++e){var g=a[e],h=y(g);h!=";"&&(!b&&e==d&&(g[0]=="while"&&F(g[2])||O(g[0],["for","for-in"])&&F(g[4])||g[0]=="if"&&F(g[2])&&!g[3]||g[0]=="if"&&g[3]&&F(g[3])?h=h.replace(/;*\s*$/,";"):h=h.replace(/;+\s*$/,"")),c.push(h))}return S(c,f)}function s(a){return a.toString()}function r(a,b,c,d){var e=d||"function";a&&(e+=" "+s(a)),e+="("+j(S(b,s))+")";return h([e,v(c)])}function q(a){if(a[0]=="do")return y(["block",[a]]);var b=a;for(;;){var c=b[0];if(c=="if"){if(!b[3])return y(["block",[a]]);b=b[3]}else if(c=="while"||c=="do")b=b[2];else if(c=="for"||c=="for-in")b=b[4];else break}return y(a)}function o(a){var b=a.toString(10),c=[b.replace(/^0\./,".")],d;Math.floor(a)===a?(c.push("0x"+a.toString(16).toLowerCase(),"0"+a.toString(8)),(d=/^(.*?)(0+)$/.exec(a))&&c.push(d[1]+"e"+d[2].length)):(d=/^0?\.(0+)(.*)$/.exec(a))&&c.push(d[2]+"e-"+(d[1].length+d[2].length),b.substr(b.indexOf(".")));return l(c)}function m(a){if(a[0]=="function"){var b=M(x),c=b.pop(),d=b.pop();while(d){if(d[0]=="stat")return!0;if(d[0]=="seq"&&d[1]===c||d[0]=="call"&&d[1]===c||d[0]=="binary"&&d[2]===c)c=d,d=b.pop();else return!1}}return!R(G,a[0])}function l(a){if(a.length==1)return a[0];if(a.length==2){var b=a[1];a=a[0];return a.length<=b.length?a:b}return l([a[0],l(a.slice(1))])}function k(a){var b=y(a);for(var c=1;c<arguments.length;++c){var d=arguments[c];if(d instanceof Function&&d(a)||a[0]==d)return"("+b+")"}return b}function j(a){return a.join(","+e)}function h(a){if(b)return a.join(" ");var c=[];for(var d=0;d<a.length;++d){var e=a[d+1];c.push(a[d]),e&&(/[a-z0-9_\x24]$/i.test(a[d].toString())&&/^[a-z0-9_\x24]/i.test(e.toString())||/[\+\-]$/.test(a[d].toString())&&/^[\+\-]/.test(e.toString()))&&c.push(" ")}return c.join("")}function g(a,b){b==null&&(b=1),c+=b;try{return a.apply(null,M(arguments,1))}finally{c-=b}}function f(a){a==null&&(a=""),b&&(a=Array(b.indent_start+c*b.indent_level).join(" ")+a);return a}b&&(b=P(b,{indent_start:0,indent_level:4,quote_keys:!1,space_colon:!1}));var c=0,d=b?"\n":"",e=b?" ":"",p={string:H,num:o,name:s,toplevel:function(a){return t(a).join(d+d)},block:v,"var":function(a){return"var "+j(S(a,w))+";"},"const":function(a){return"const "+j(S(a,w))+";"},"try":function(a,b,c){var d=["try",v(a)];b&&d.push("catch","("+b[0]+")",v(b[1])),c&&d.push("finally",v(c));return h(d)},"throw":function(a){return h(["throw",y(a)])+";"},"new":function(a,b){b=b.length>0?"("+j(S(b,y))+")":"";return h(["new",k(a,"seq","binary","conditional","assign",function(a){var b=E(),c={};try{b.with_walkers({call:function(){throw c},"function":function(){return this}},function(){b.walk(a)})}catch(d){if(d===c)return!0;throw d}})+b])},"switch":function(a,b){return h(["switch","("+y(a)+")",u(b)])},"break":function(a){var b="break";a!=null&&(b+=" "+s(a));return b+";"},"continue":function(a){var b="continue";a!=null&&(b+=" "+s(a));return b+";"},conditional:function(a,b,c){return h([k(a,"assign","seq","conditional"),"?",k(b,"seq"),":",k(c,"seq")])},assign:function(a,b,c){a&&a!==!0?a+="=":a="=";return h([y(b),a,k(c,"seq")])},dot:function(a){var b=y(a),c=1;a[0]=="num"?b+=".":m(a)&&(b="("+b+")");while(c<arguments.length)b+="."+s(arguments[c++]);return b},call:function(a,b){var c=y(a);m(a)&&(c="("+c+")");return c+"("+j(S(b,function(a){return k(a,"seq")}))+")"},"function":r,defun:r,"if":function(a,b,c){var d=["if","("+y(a)+")",c?q(b):y(b)];c&&d.push("else",y(c));return h(d)},"for":function(a,b,c,d){var f=["for"];a=(a!=null?y(a):"").replace(/;*\s*$/,";"+e),b=(b!=null?y(b):"").replace(/;*\s*$/,";"+e),c=(c!=null?y(c):"").replace(/;*\s*$/,"");var g=a+b+c;g=="; ; "&&(g=";;"),f.push("("+g+")",y(d));return h(f)},"for-in":function(a,b,c,d){var e=h(["for","("]);a&&(e+="var "),e+=h([s(b)+" in "+y(c)+")",y(d)]);return e},"while":function(a,b){return h(["while","("+y(a)+")",y(b)])},"do":function(a,b){return h(["do",y(b),"while","("+y(a)+")"])+";"},"return":function(a){var b=["return"];a!=null&&b.push(y(a));return h(b)+";"},binary:function(a,b,c){var d=y(b),e=y(c);if(O(b[0],["assign","conditional","seq"])||b[0]=="binary"&&z[a]>z[b[1]])d="("+d+")";if(O(c[0],["assign","conditional","seq"])||c[0]=="binary"&&z[a]>=z[c[1]]&&(c[1]!=a||!O(a,["&&","||","*"])))e="("+e+")";return h([d,a,e])},"unary-prefix":function(a,b){var c=y(b);b[0]=="num"||b[0]=="unary-prefix"&&!R(i,a+b[1])||!m(b)||(c="("+c+")");return a+(n(a.charAt(0))?" ":"")+c},"unary-postfix":function(a,b){var c=y(b);b[0]=="num"||b[0]=="unary-postfix"&&!R(i,a+b[1])||!m(b)||(c="("+c+")");return c+a},sub:function(a,b){var c=y(a);m(a)&&(c="("+c+")");return c+"["+y(b)+"]"},object:function(a){if(a.length==0)return"{}";return"{"+d+g(function(){return S(a,function(a){if(a.length==3)return f(r(a[0],a[1][2],a[1][3],a[2]));var c=a[0],d=y(a[1]);b&&b.quote_keys?c=H(c):(typeof c=="number"||!b&&+c+""==c)&&parseFloat(c)>=0?c=o(+c):Q(c)||(c=H(c));return f(h(b&&b.space_colon?[c,":",d]:[c+":",d]))}).join(","+d)})+d+f("}")},regexp:function(a,b){return"/"+a+"/"+b},array:function(a){if(a.length==0)return"[]";return h(["[",j(S(a,function(a){if(!b&&a[0]=="atom"&&a[1]=="undefined")return"";return k(a,"seq")})),"]"])},stat:function(a){return y(a).replace(/;*\s*$/,";")},seq:function(){return j(S(M(arguments),y))},label:function(a,b){return h([s(a),":",y(b)])},"with":function(a,b){return h(["with","("+y(a)+")",y(b)])},atom:function(a){return s(a)}},x=[];return y(a)}function H(a){var b=0,c=0;a=a.replace(/[\\\b\f\n\r\t\x22\x27]/g,function(a){switch(a){case"\\":return"\\\\";case"\b":return"\\b";case"\f":return"\\f";case"\n":return"\\n";case"\r":return"\\r";case"\t":return"\\t";case'"':++b;return'"';case"'":++c;return"'"}return a});return b>c?"'"+a.replace(/\x27/g,"\\'")+"'":'"'+a.replace(/\x22/g,'\\"')+'"'}function F(a){return!a||a[0]=="block"&&(!a[1]||a[1].length==0)}function E(){function f(a,b){var d={},e;for(e in a)R(a,e)&&(d[e]=c[e],c[e]=a[e]);var f=b();for(e in d)R(d,e)&&(d[e]?c[e]=d[e]:delete c[e]);return f}function e(a){if(a==null)return null;try{d.push(a);var e=a[0],f=c[e];if(f){var g=f.apply(a,a.slice(1));if(g!=null)return g}f=b[e];return f.apply(a,a.slice(1))}finally{d.pop()}}function a(a){return[this[0],S(a,function(a){var b=[a[0]];a.length>1&&(b[1]=e(a[1]));return b})]}var b={string:function(a){return[this[0],a]},num:function(a){return[this[0],a]},name:function(a){return[this[0],a]},toplevel:function(a){return[this[0],S(a,e)]},block:function(a){var b=[this[0]];a!=null&&b.push(S(a,e));return b},"var":a,"const":a,"try":function(a,b,c){return[this[0],S(a,e),b!=null?[b[0],S(b[1],e)]:null,c!=null?S(c,e):null]},"throw":function(a){return[this[0],e(a)]},"new":function(a,b){return[this[0],e(a),S(b,e)]},"switch":function(a,b){return[this[0],e(a),S(b,function(a){return[a[0]?e(a[0]):null,S(a[1],e)]})]},"break":function(a){return[this[0],a]},"continue":function(a){return[this[0],a]},conditional:function(a,b,c){return[this[0],e(a),e(b),e(c)]},assign:function(a,b,c){return[this[0],a,e(b),e(c)]},dot:function(a){return[this[0],e(a)].concat(M(arguments,1))},call:function(a,b){return[this[0],e(a),S(b,e)]},"function":function(a,b,c){return[this[0],a,b.slice(),S(c,e)]},defun:function(a,b,c){return[this[0],a,b.slice(),S(c,e)]},"if":function(a,b,c){return[this[0],e(a),e(b),e(c)]},"for":function(a,b,c,d){return[this[0],e(a),e(b),e(c),e(d)]},"for-in":function(a,b,c,d){return[this[0],a,b,e(c),e(d)]},"while":function(a,b){return[this[0],e(a),e(b)]},"do":function(a,b){return[this[0],e(a),e(b)]},"return":function(a){return[this[0],e(a)]},binary:function(a,b,c){return[this[0],a,e(b),e(c)]},"unary-prefix":function(a,b){return[this[0],a,e(b)]},"unary-postfix":function(a,b){return[this[0],a,e(b)]},sub:function(a,b){return[this[0],e(a),e(b)]},object:function(a){return[this[0],S(a,function(a){return a.length==2?[a[0],e(a[1])]:[a[0],e(a[1]),a[2]]})]},regexp:function(a,b){return[this[0],a,b]},array:function(a){return[this[0],S(a,e)]},stat:function(a){return[this[0],e(a)]},seq:function(){return[this[0]].concat(S(M(arguments),e))},label:function(a,b){return[this[0],a,e(b)]},"with":function(a,b){return[this[0],e(a),e(b)]},atom:function(a){return[this[0],a]}},c={},d=[];return{walk:e,with_walkers:f,parent:function(){return d[d.length-2]},stack:function(){return d}}}function D(a,b,c){function bj(a){try{++d.in_loop;return a()}finally{--d.in_loop}}function bi(a){arguments.length==0&&(a=!0);var b=bh();if(a&&e("punc",",")){g();return p("seq",b,bi())}return b}function bh(){var a=bf(),b=d.token.value;if(e("operator")&&R(y,b)){if(bg(a)){g();return p("assign",y[b],a,bh())}i("Invalid assignment")}return a}function bg(a){switch(a[0]){case"dot":case"sub":return!0;case"name":return a[1]!="this"}}function bf(){var a=be();if(e("operator","?")){g();var b=bi(!1);m(":");return p("conditional",a,b,bi(!1))}return a}function be(){return bd(X(!0),0)}function bd(a,b){var c=e("operator")?d.token.value:null,f=c!=null?z[c]:null;if(f!=null&&f>b){g();var h=bd(X(!0),f);return bd(p("binary",c,a,h),b)}return a}function bc(a,b,c){(b=="++"||b=="--")&&!bg(c)&&i("Invalid use of "+b+" operator");return p(a,b,c)}function bb(a,b){if(e("punc",".")){g();return bb(p("dot",a,ba()),b)}if(e("punc","[")){g();return bb(p("sub",a,K(bi,J(m,"]"))),b)}if(b&&e("punc","(")){g();return bb(p("call",a,Y(")")),!0)}if(b&&e("operator")&&R(x,d.token.value))return K(J(bc,"unary-postfix",d.token.value,a),g);return a}function ba(){switch(d.token.type){case"name":case"operator":case"keyword":case"atom":return K(d.token.value,g);default:k()}}function _(){switch(d.token.type){case"num":case"string":return K(d.token.value,g)}return ba()}function $(){var a=!0,c=[];while(!e("punc","}")){a?a=!1:m(",");if(!b&&e("punc","}"))break;var f=d.token.type,h=_();f!="name"||h!="get"&&h!="set"||!!e("punc",":")?(m(":"),c.push([h,bi(!1)])):c.push([ba(),I(!1),h])}g();return p("object",c)}function Z(){return p("array",Y("]",!b,!0))}function Y(a,b,c){var d=!0,f=[];while(!e("punc",a)){d?d=!1:m(",");if(b&&e("punc",a))break;e("punc",",")&&c?f.push(["atom","undefined"]):f.push(bi(!1))}g();return f}function X(a){if(e("operator","new")){g();return W()}if(e("operator")&&R(w,d.token.value))return bc("unary-prefix",K(d.token.value,g),X(a));if(e("punc")){switch(d.token.value){case"(":g();return bb(K(bi,J(m,")")),a);case"[":g();return bb(Z(),a);case"{":g();return bb($(),a)}k()}if(e("keyword","function")){g();return bb(I(!1),a)}if(R(B,d.token.type)){var b=d.token.type=="regexp"?p("regexp",d.token.value[0],d.token.value[1]):p(d.token.type,d.token.value);return bb(K(b,g),a)}k()}function W(){var a=X(!1),b;e("punc","(")?(g(),b=Y(")")):b=[];return bb(p("new",a,b),!0)}function V(){return p("const",T())}function U(){return p("var",T())}function T(){var a=[];for(;;){e("name")||k();var b=d.token.value;g(),e("operator","=")?(g(),a.push([b,bi(!1)])):a.push([b]);if(!e("punc",","))break;g()}return a}function S(){var a=P(),b,c;if(e("keyword","catch")){g(),m("("),e("name")||i("Name expected");var f=d.token.value;g(),m(")"),b=[f,P()]}e("keyword","finally")&&(g(),c=P()),!b&&!c&&i("Missing catch/finally blocks");return p("try",a,b,c)}function P(){m("{");var a=[];while(!e("punc","}"))e("eof")&&k(),a.push(u());g();return a}function N(){var a=q(),b=u(),c;e("keyword","else")&&(g(),c=u());return p("if",a,b,c)}function L(a){var b=e("name")?K(d.token.value,g):null;a&&!b&&k(),m("(");return p(a?"defun":"function",b,function(a,b){while(!e("punc",")"))a?a=!1:m(","),e("name")||k(),b.push(d.token.value),g();g();return b}(!0,[]),function(){++d.in_function;var a=d.in_loop;d.in_loop=0;var b=P();--d.in_function,d.in_loop=a;return b}())}function H(){m("(");var a=e("keyword","var");a&&g();if(e("name")&&t(f(),"operator","in")){var b=d.token.value;g(),g();var c=bi();m(")");return p("for-in",a,b,c,bj(u))}var h=e("punc",";")?null:a?U():bi();m(";");var i=e("punc",";")?null:bi();m(";");var j=e("punc",")")?null:bi();m(")");return p("for",h,i,j,bj(u))}function G(a){var b=e("name")?d.token.value:null;b!=null?(g(),O(b,d.labels)||i("Label "+b+" without matching loop or statement")):d.in_loop==0&&i(a+" not inside a loop or switch"),o();return p(a,b)}function F(){return p("stat",K(bi,o))}function E(a){d.labels.push(a);var c=d.token,e=u();b&&!R(A,e[0])&&k(c),d.labels.pop();return p("label",a,e)}function D(){e("operator","/")&&(d.peeked=null,d.token=d.input(!0));switch(d.token.type){case"num":case"string":case"regexp":case"operator":case"atom":return F();case"name":return t(f(),"punc",":")?E(K(d.token.value,g,g)):F();case"punc":switch(d.token.value){case"{":return p("block",P());case"[":case"(":return F();case";":g();return p("block");default:k()};case"keyword":switch(K(d.token.value,g)){case"break":return G("break");case"continue":return G("continue");case"debugger":o();return p("debugger");case"do":return function(a){l("keyword","while");return p("do",K(q,o),a)}(bj(u));case"for":return H();case"function":return I(!0);case"if":return N();case"return":d.in_function==0&&i("'return' outside of function");return p("return",e("punc",";")?(g(),null):n()?null:K(bi,o));case"switch":return p("switch",q(),Q());case"throw":return p("throw",K(bi,o));case"try":return S();case"var":return K(U,o);case"const":return K(V,o);case"while":return p("while",q(),bj(u));case"with":return p("with",q(),u());default:k()}}}function r(a,b,c){return a instanceof C?a:new C(a,b,c)}function q(){m("(");var a=bi();m(")");return a}function p(){return M(arguments)}function o(){e("punc",";")?g():n()||k()}function n(){return!b&&(d.token.nlb||e("eof")||e("punc","}"))}function m(a){return l("punc",a)}function l(a,b){if(e(a,b))return g();j(d.token,"Unexpected token "+d.token.type+", expected "+a)}function k(a){a==null&&(a=d.token),j(a,"Unexpected token: "+a.type+" ("+a.value+")")}function j(a,b){i(b,a.line,a.col)}function i(a,b,c,e){var f=d.input.context();s(a,b!=null?b:f.tokline,c!=null?c:f.tokcol,e!=null?e:f.tokpos)}function h(){return d.prev}function g(){d.prev=d.token,d.peeked?(d.token=d.peeked,d.peeked=null):d.token=d.input();return d.token}function f(){return d.peeked||(d.peeked=d.input())}function e(a,b){return t(d.token,a,b)}var d={input:typeof a=="string"?v(a,!0):a,token:null,prev:null,peeked:null,in_function:0,in_loop:0,labels:[]};d.token=g();var u=c?function(){var a=d.token,b=D.apply(this,arguments);b[0]=r(b[0],a,h());return b}:D,I=c?function(){var a=h(),b=L.apply(this,arguments);b[0]=r(b[0],a,h());return b}:L,Q=J(bj,function(){m("{");var a=[],b=null;while(!e("punc","}"))e("eof")&&k(),e("keyword","case")?(g(),b=[],a.push([bi(),b]),m(":")):e("keyword","default")?(g(),m(":"),b=[],a.push([null,b])):(b||k(),b.push(u()));g();return a});return p("toplevel",function(a){while(!e("eof"))a.push(u());return a}([]))}function C(a,b,c){this.name=a,this.start=b,this.end=c}function v(b){function N(a){if(a)return H();y(),v();var b=g();if(!b)return w("eof");if(p(b))return B();if(b=='"'||b=="'")return E();if(R(l,b))return w("punc",h());if(b==".")return K();if(b=="/")return J();if(R(e,b))return I();if(o(b))return L();A("Unexpected character '"+b+"'")}function M(a,b){try{return b()}catch(c){if(c===u)A(a);else throw c}}function L(){var b=z(o);return R(a,b)?R(i,b)?w("operator",b):R(d,b)?w("atom",b):w("keyword",b):w("name",b)}function K(){h();return p(g())?B("."):w("punc",".")}function J(){h();var a=f.regex_allowed;switch(g()){case"/":f.comments_before.push(F()),f.regex_allowed=a;return N();case"*":f.comments_before.push(G()),f.regex_allowed=a;return N()}return f.regex_allowed?H():I("/")}function I(a){function b(a){if(!g())return a;var c=a+g();if(R(i,c)){h();return b(c)}return a}return w("operator",b(a||h()))}function H(){return M("Unterminated regular expression",function(){var a=!1,b="",c,d=!1;while(c=h(!0))if(a)b+="\\"+c,a=!1;else if(c=="[")d=!0,b+=c;else if(c=="]"&&d)d=!1,b+=c;else{if(c=="/"&&!d)break;c=="\\"?a=!0:b+=c}var e=z(function(a){return R(m,a)});return w("regexp",[b,e])})}function G(){h();return M("Unterminated multiline comment",function(){var a=t("*/",!0),b=f.text.substring(f.pos,a),c=w("comment2",b,!0);f.pos=a+2,f.line+=b.split("\n").length-1,f.newline_before=b.indexOf("\n")>=0;return c})}function F(){h();var a=t("\n"),b;a==-1?(b=f.text.substr(f.pos),f.pos=f.text.length):(b=f.text.substring(f.pos,a),f.pos=a);return w("comment1",b,!0)}function E(){return M("Unterminated string constant",function(){var a=h(),b="";for(;;){var c=h(!0);if(c=="\\")c=C();else if(c==a)break;b+=c}return w("string",b)})}function D(a){var b=0;for(;a>0;--a){var c=parseInt(h(!0),16);isNaN(c)&&A("Invalid hex-character pattern in string"),b=b<<4|c}return b}function C(){var a=h(!0);switch(a){case"n":return"\n";case"r":return"\r";case"t":return"\t";case"b":return"\b";case"v":return"";case"f":return"\f";case"0":return" ";case"x":return String.fromCharCode(D(2));case"u":return String.fromCharCode(D(4));default:return a}}function B(a){var b=!1,c=!1,d=!1,e=a==".",f=z(function(f,g){if(f=="x"||f=="X"){if(d)return!1;return d=!0}if(!d&&(f=="E"||f=="e")){if(b)return!1;return b=c=!0}if(f=="-"){if(c||g==0&&!a)return!0;return!1}if(f=="+")return c;c=!1;if(f=="."){if(!e)return e=!0;return!1}return n(f)});a&&(f=a+f);var g=q(f);if(!isNaN(g))return w("num",g);A("Invalid syntax: "+f)}function A(a){s(a,f.tokline,f.tokcol,f.tokpos)}function z(a){var b="",c=g(),d=0;while(c&&a(c,d++))b+=h(),c=g();return b}function y(){while(R(j,g()))h()}function w(a,b,d){f.regex_allowed=a=="operator"&&!R(x,b)||a=="keyword"&&R(c,b)||a=="punc"&&R(k,b);var e={type:a,value:b,line:f.tokline,col:f.tokcol,pos:f.tokpos,nlb:f.newline_before};d||(e.comments_before=f.comments_before,f.comments_before=[]),f.newline_before=!1;return e}function v(){f.tokline=f.line,f.tokcol=f.col,f.tokpos=f.pos}function t(a,b){var c=f.text.indexOf(a,f.pos);if(b&&c==-1)throw u;return c}function r(){return!f.peek()}function h(a){var b=f.text.charAt(f.pos++);if(a&&!b)throw u;b=="\n"?(f.newline_before=!0,++f.line,f.col=0):++f.col;return b}function g(){return f.text.charAt(f.pos)}var f={text:b.replace(/\r\n?|[\n\u2028\u2029]/g,"\n").replace(/^\uFEFF/,""),pos:0,tokpos:0,line:0,tokline:0,col:0,tokcol:0,newline_before:!1,regex_allowed:!1,comments_before:[]};N.context=function(a){a&&(f=a);return f};return N}function t(a,b,c){return a.type==b&&(c==null||a.value==c)}function s(a,b,c,d){throw new r(a,b,c,d)}function r(a,b,c,d){this.message=a,this.line=b,this.col=c,this.pos=d;try{({})()}catch(e){this.stack=e.stack}}function q(a){if(f.test(a))return parseInt(a.substr(2),16);if(g.test(a))return parseInt(a.substr(1),8);if(h.test(a))return parseFloat(a)}function p(a){a=a.charCodeAt(0);return a>=48&&a<=57}function o(a){return n(a)||a=="$"||a=="_"}function n(a){a=a.charCodeAt(0);return a>=48&&a<=57||a>=65&&a<=90||a>=97&&a<=122}var a=L(["break","case","catch","const","continue","default","delete","do","else","finally","for","function","if","in","instanceof","new","return","switch","throw","try","typeof","var","void","while","with"]),b=L(["abstract","boolean","byte","char","class","debugger","double","enum","export","extends","final","float","goto","implements","import","int","interface","long","native","package","private","protected","public","short","static","super","synchronized","throws","transient","volatile"]),c=L(["return","new","delete","throw","else","case"]),d=L(["false","null","true","undefined"]),e=L(N("+-*&%=<>!?|~^")),f=/^0x[0-9a-f]+$/i,g=/^0[0-7]+$/,h=/^\d*\.?\d*(?:e[+-]?\d*(?:\d\.?|\.?\d)\d*)?$/i,i=L(["in","instanceof","typeof","new","void","delete","++","--","+","-","!","~","&","|","^","*","/","%",">>","<<",">>>","<",">","<=",">=","==","===","!=","!==","?","=","+=","-=","/=","*=","%=",">>=","<<=",">>>=","%=","|=","^=","&=","&&","||"]),j=L(N(" \n\r\t")),k=L(N("[{}(,.;:")),l=L(N("[]{}(),;:")),m=L(N("gmsiy"));r.prototype.toString=function(){return this.message+" (line: "+this.line+", col: "+this.col+", pos: "+this.pos+")"+"\n\n"+this.stack};var u={},w=L(["typeof","void","delete","--","++","!","~","-","+"]),x=L(["--","++"]),y=function(a,b,c){while(c<a.length)b[a[c]]=a[c].substr(0,a[c].length-1),c++;return b}(["+=","-=","/=","*=","%=",">>=","<<=",">>>=","|=","^=","&="],{"=":!0},0),z=function(a,b){for(var c=0,d=1;c<a.length;++c,++d){var e=a[c];for(var f=0;f<e.length;++f)b[e[f]]=d}return b}([["||"],["&&"],["|"],["^"],["&"],["==","===","!=","!=="],["<",">","<=",">=","in","instanceof"],[">>","<<",">>>"],["+","-"],["*","/","%"]],{}),A=L(["for","do","while","switch"]),B=L(["atom","num","string","regexp","name"]);C.prototype.toString=function(){return this.name};var G=L(["name","array","string","dot","sub","call","regexp"]);return{parse:D,stringify:I,tokenizer:v,walker:E}}