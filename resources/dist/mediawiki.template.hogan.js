this[void 0]=(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{18:function(n,t,r){var e=r(26);e.Template=r(27).Template,n.exports=e},26:function(n,t,r){!function(n){var t=/\S/,r=/\"/g,e=/\n/g,i=/\r/g,o=/\\/g,u={"#":1,"^":2,"/":3,"!":4,">":5,"<":6,"=":7,_v:8,"{":9,"&":10};function c(n){"}"===n.n.substr(n.n.length-1)&&(n.n=n.n.substring(0,n.n.length-1))}function f(n){return n.trim?n.trim():n.replace(/^\s*|\s*$/g,"")}function s(n,t,r){if(t.charAt(r)!=n.charAt(0))return!1;for(var e=1,i=n.length;e<i;e++)if(t.charAt(r+e)!=n.charAt(e))return!1;return!0}function h(n,t){for(var r=0,e=t.length;r<e;r++)if(t[r].o==n.n)return n.tag="#",!0}function l(n,t,r){for(var e=0,i=r.length;e<i;e++)if(r[e].c==n&&r[e].o==t)return!0}function a(n){return n.replace(o,"\\\\").replace(r,'\\"').replace(e,"\\n").replace(i,"\\r")}function p(n){return~n.indexOf(".")?"d":"f"}function g(n){for(var t="",r=0,e=n.length;r<e;r++){var i=n[r].tag;"#"==i?t+=v(n[r].nodes,n[r].n,p(n[r].n),n[r].i,n[r].end,n[r].otag+" "+n[r].ctag):"^"==i?t+=b(n[r].nodes,n[r].n,p(n[r].n)):"<"==i||">"==i?t+=d(n[r]):"{"==i||"&"==i?t+=_(n[r].n,p(n[r].n)):"\n"==i?t+=w('"\\n"'+(n.length-1==r?"":" + i")):"_v"==i?t+=m(n[r].n,p(n[r].n)):void 0===i&&(t+=w('"'+a(n[r])+'"'))}return t}function v(n,t,r,e,i,o){return"if(_.s(_."+r+'("'+a(t)+'",c,p,1),c,p,0,'+e+","+i+',"'+o+'")){_.rs(c,p,function(c,p,_){'+g(n)+"});c.pop();}"}function b(n,t,r){return"if(!_.s(_."+r+'("'+a(t)+'",c,p,1),c,p,1,0,0,"")){'+g(n)+"};"}function d(n){return'_.b(_.rp("'+a(n.n)+'",c,p,"'+(n.indent||"")+'"));'}function _(n,t){return"_.b(_.t(_."+t+'("'+a(n)+'",c,p,0)));'}function m(n,t){return"_.b(_.v(_."+t+'("'+a(n)+'",c,p,0)));'}function w(n){return"_.b("+n+");"}n.scan=function(n,r){var e=n.length,i=0,o=null,h=null,l="",a=[],p=!1,g=0,v=0,b="{{",d="}}";function _(){l.length>0&&(a.push(new String(l)),l="")}function m(n,r){if(_(),n&&function(){for(var n=!0,r=v;r<a.length;r++)if(!(n=a[r].tag&&u[a[r].tag]<u._v||!a[r].tag&&null===a[r].match(t)))return!1;return n}())for(var e,i=v;i<a.length;i++)a[i].tag||((e=a[i+1])&&">"==e.tag&&(e.indent=a[i].toString()),a.splice(i,1));else r||a.push({tag:"\n"});p=!1,v=a.length}function w(n,t){var r="="+d,e=n.indexOf(r,t),i=f(n.substring(n.indexOf("=",t)+1,e)).split(" ");return b=i[0],d=i[1],e+r.length-1}for(r&&(r=r.split(" "),b=r[0],d=r[1]),g=0;g<e;g++)0==i?s(b,n,g)?(--g,_(),i=1):"\n"==n.charAt(g)?m(p):l+=n.charAt(g):1==i?(g+=b.length-1,"="==(o=(h=u[n.charAt(g+1)])?n.charAt(g+1):"_v")?(g=w(n,g),i=0):(h&&g++,i=2),p=g):s(d,n,g)?(a.push({tag:o,n:f(l),otag:b,ctag:d,i:"/"==o?p-d.length:g+b.length}),l="",g+=d.length-1,i=0,"{"==o&&("}}"==d?g++:c(a[a.length-1]))):l+=n.charAt(g);return m(p,!0),a},n.generate=function(t,r,e){var i='var _=this;_.b(i=i||"");'+g(t)+"return _.fl();";return e.asString?"function(c,p,i){"+i+";}":new n.Template(new Function("c","p","i",i),r,n,e)},n.parse=function(n,t,r){return function n(t,r,e,i){for(var o=[],u=null,c=null;t.length>0;)if("#"==(c=t.shift()).tag||"^"==c.tag||h(c,i))e.push(c),c.nodes=n(t,c.tag,e,i),o.push(c);else{if("/"==c.tag){if(0===e.length)throw new Error("Closing tag without opener: /"+c.n);if(u=e.pop(),c.n!=u.n&&!l(c.n,u.n,i))throw new Error("Nesting error: "+u.n+" vs. "+c.n);return u.end=c.i,o}o.push(c)}if(e.length>0)throw new Error("missing closing tag: "+e.pop().n);return o}(n,0,[],(r=r||{}).sectionTags||[])},n.cache={},n.compile=function(n,t){var r=n+"||"+!!(t=t||{}).asString,e=this.cache[r];return e||(e=this.generate(this.parse(this.scan(n,t.delimiters),n,t),n,t),this.cache[r]=e)}}(t)},27:function(n,t,r){!function(n,t){n.Template=function(n,t,r,e){this.r=n||this.r,this.c=r,this.options=e,this.text=t||"",this.buf=""},n.Template.prototype={r:function(n,t,r){return""},v:function(n){return n=f(n),c.test(n)?n.replace(r,"&amp;").replace(e,"&lt;").replace(i,"&gt;").replace(o,"&#39;").replace(u,"&quot;"):n},t:f,render:function(n,t,r){return this.ri([n],t||{},r)},ri:function(n,t,r){return this.r(n,t,r)},rp:function(n,t,r,e){var i=r[n];return i?(this.c&&"string"==typeof i&&(i=this.c.compile(i,this.options)),i.ri(t,r,e)):""},rs:function(n,t,r){var e=n[n.length-1];if(s(e))for(var i=0;i<e.length;i++)n.push(e[i]),r(n,t,this),n.pop();else r(n,t,this)},s:function(n,t,r,e,i,o,u){var c;return(!s(n)||0!==n.length)&&("function"==typeof n&&(n=this.ls(n,t,r,e,i,o,u)),c=""===n||!!n,!e&&c&&t&&t.push("object"==typeof n?n:t[t.length-1]),c)},d:function(n,t,r,e){var i=n.split("."),o=this.f(i[0],t,r,e),u=null;if("."===n&&s(t[t.length-2]))return t[t.length-1];for(var c=1;c<i.length;c++)o&&"object"==typeof o&&i[c]in o?(u=o,o=o[i[c]]):o="";return!(e&&!o)&&(e||"function"!=typeof o||(t.push(u),o=this.lv(o,t,r),t.pop()),o)},f:function(n,t,r,e){for(var i=!1,o=null,u=!1,c=t.length-1;c>=0;c--)if((o=t[c])&&"object"==typeof o&&n in o){i=o[n],u=!0;break}return u?(e||"function"!=typeof i||(i=this.lv(i,t,r)),i):!e&&""},ho:function(n,t,r,e,i){var o=this.c,u=this.options;return u.delimiters=i,e=null==(e=n.call(t,e))?String(e):e.toString(),this.b(o.compile(e,u).render(t,r)),!1},b:function(n){this.buf+=n},fl:function(){var n=this.buf;return this.buf="",n},ls:function(n,t,r,e,i,o,u){var c,f=t[t.length-1];if(!e&&this.c&&n.length>0)return this.ho(n,f,r,this.text.substring(i,o),u);if("function"==typeof(c=n.call(f))){if(e)return!0;if(this.c)return this.ho(c,f,r,this.text.substring(i,o),u)}return c},lv:function(n,t,r){var e=t[t.length-1],i=n.call(e);return"function"==typeof i&&(i=f(i.call(e)),this.c&&~i.indexOf("{{"))?this.c.compile(i,this.options).render(e,r):f(i)}};var r=/&/g,e=/</g,i=/>/g,o=/\'/g,u=/\"/g,c=/[&<>\"\']/;function f(n){return String(null===n||void 0===n?"":n)}var s=Array.isArray||function(n){return"[object Array]"===Object.prototype.toString.call(n)}}(t)},57:function(n,t,r){var e=r(18);mw.template.registerCompiler("hogan",{compile:e.compile.bind(e)})}},[[57,0]]]);
//# sourceMappingURL=mediawiki.template.hogan.js.map.json