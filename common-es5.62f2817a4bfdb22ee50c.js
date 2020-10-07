function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&_setPrototypeOf(e,t)}function _setPrototypeOf(e,t){return(_setPrototypeOf=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function _createSuper(e){var t=_isNativeReflectConstruct();return function(){var n,a=_getPrototypeOf(e);if(t){var o=_getPrototypeOf(this).constructor;n=Reflect.construct(a,arguments,o)}else n=a.apply(this,arguments);return _possibleConstructorReturn(this,n)}}function _possibleConstructorReturn(e,t){return!t||"object"!=typeof t&&"function"!=typeof t?_assertThisInitialized(e):t}function _assertThisInitialized(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function _isNativeReflectConstruct(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}function _getPrototypeOf(e){return(_getPrototypeOf=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}function _createClass(e,t,n){return t&&_defineProperties(e.prototype,t),n&&_defineProperties(e,n),e}(window.webpackJsonp=window.webpackJsonp||[]).push([[1],{CUGa:function(e,t,n){"use strict";n.d(t,"a",(function(){return f}));var a,o,r=n("fXoL"),i=n("3Pt+"),c=n("AytR"),s=n("tk/3"),u=((a=function(){function e(t){_classCallCheck(this,e),this.http=t}return _createClass(e,[{key:"getListaFranqueado",value:function(){return this.http.get("".concat(c.a.API.URL).concat(c.a.API.Routes.adm.listaPessoaFranqueado))}}]),e}()).\u0275fac=function(e){return new(e||a)(r.Wb(s.b))},a.\u0275prov=r.Ib({token:a,factory:a.\u0275fac,providedIn:"root"}),a),l=n("/SA8"),d=n("ZOsW"),f=((o=function(e){_inherits(n,e);var t=_createSuper(n);function n(e,a,o,i){var c;return _classCallCheck(this,n),(c=t.call(this,e,a)).admService=o,c._helperService=i,c.handleChangeEmit=new r.n,c}return _createClass(n,[{key:"ngOnInit",value:function(){}},{key:"ngAfterViewInit",value:function(){var e=this;this.admService.getListaFranqueado().subscribe((function(t){var n;e.items=t.Data;var a=e._helperService.getUserInfo();if(1===e.items.length)e.value=t.Data[0].codigo,e.handleChangeEmit.emit(t.Data[0]),a&&localStorage.setItem("unity",JSON.stringify({usuario:a.CodigoUsuario,franqueado:t.Data[0]}));else{e.items.unshift({auxiliar:null,codigo:-1,descricao:"TODOS",valor:0});var o=localStorage.getItem("unity")?JSON.parse(localStorage.getItem("unity")):null;e.checkUnityOfSelectedUser(o,a)?e.items.find((function(e){var t;return e.codigo==(null===(t=null==o?void 0:o.franqueado)||void 0===t?void 0:t.codigo)}))&&(e.value=null===(n=null==o?void 0:o.franqueado)||void 0===n?void 0:n.codigo,e.handleChangeEmit.emit(null==o?void 0:o.franqueado)):(localStorage.removeItem("unity"),e.value=-1,e.handleChangeEmit.emit({auxiliar:null,codigo:-1,descricao:"TODOS",valor:0}))}}))}},{key:"checkUnityOfSelectedUser",value:function(e,t){return e&&e.usuario==t.CodigoUsuario}},{key:"clearItemSelected",value:function(){localStorage.removeItem("unity")}},{key:"handleChangeValue",value:function(e){var t=this._helperService.getUserInfo();localStorage.setItem("unity",JSON.stringify({usuario:t.CodigoUsuario,franqueado:e})),this.handleChangeEmit.emit(e)}},{key:"compareFn",value:function(e,t){return e&&t?e.id===t.id:e===t}},{key:"writeValue",value:function(e){this.value=e}},{key:"registerOnChange",value:function(e){this.onChange=e}},{key:"registerOnTouched",value:function(e){this.onTouched=e}},{key:"value",set:function(e){e!==this.innerValue&&(this.innerValue=e,this.onChange(e))},get:function(){return this.innerValue}}]),n}(i.s)).\u0275fac=function(e){return new(e||o)(r.Mb(r.D),r.Mb(r.l),r.Mb(u),r.Mb(l.b))},o.\u0275cmp=r.Gb({type:o,selectors:[["ft-combo-franquias"]],outputs:{handleChangeEmit:"handleChangeEmit"},features:[r.zb([{provide:i.j,useExisting:o,multi:!0}]),r.xb],decls:4,vars:4,consts:[[1,"form-group"],[3,"items","bindLabel","bindValue","ngModel","ngModelChange","change","clear"]],template:function(e,t){1&e&&(r.Sb(0,"div",0),r.Sb(1,"label"),r.Ic(2,"Unidade *"),r.Rb(),r.Sb(3,"ng-select",1),r.ac("ngModelChange",(function(e){return t.value=e}))("change",(function(e){return t.handleChangeValue(e)}))("clear",(function(){return t.clearItemSelected()})),r.Rb(),r.Rb()),2&e&&(r.Ab(3),r.mc("items",t.items)("bindLabel","descricao")("bindValue","codigo")("ngModel",t.value))},directives:[d.a,i.l,i.n],styles:[""]}),o)},EE6X:function(e,t,n){"use strict";n.d(t,"a",(function(){return u}));var a=n("fXoL"),o=n("ofXK");function r(e,t){if(1&e&&a.Nb(0,"div",5),2&e){var n=a.ec(2);a.mc("ngStyle",n.theme)}}function i(e,t){if(1&e&&(a.Qb(0,3),a.Gc(1,r,1,1,"div",4),a.Pb()),2&e){var n=a.ec();a.Ab(1),a.mc("ngForOf",n.objectsToIterate)}}function c(e,t){if(1&e&&a.Nb(0,"div",7),2&e){var n=a.ec(2);a.mc("ngStyle",n.theme)}}function s(e,t){if(1&e&&(a.Qb(0,3),a.Gc(1,c,1,1,"div",6),a.Pb()),2&e){var n=a.ec();a.Ab(1),a.mc("ngForOf",n.objectsToIterate)}}var u=function(){var e=function(){function e(){_classCallCheck(this,e),this.count=1,this.appearance="line"}return _createClass(e,[{key:"ngOnInit",value:function(){this.objectsToIterate=Array(this.count).fill(1).map((function(e,t){return t+1}))}}]),e}();return e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=a.Gb({type:e,selectors:[["ft-skeleton-loader"]],inputs:{count:"count",appearance:"appearance",theme:"theme"},decls:4,vars:2,consts:[[1,"skeleton-container"],[1,"skeleton"],["class","w-100",4,"ngIf"],[1,"w-100"],["class","skeleton__circle",3,"ngStyle",4,"ngFor","ngForOf"],[1,"skeleton__circle",3,"ngStyle"],["class","skeleton__line",3,"ngStyle",4,"ngFor","ngForOf"],[1,"skeleton__line",3,"ngStyle"]],template:function(e,t){1&e&&(a.Sb(0,"div",0),a.Sb(1,"div",1),a.Gc(2,i,2,1,"ng-container",2),a.Gc(3,s,2,1,"ng-container",2),a.Rb(),a.Rb()),2&e&&(a.Ab(2),a.mc("ngIf","circle"==t.appearance),a.Ab(1),a.mc("ngIf","line"==t.appearance))},directives:[o.m,o.l,o.n],styles:["@-webkit-keyframes ghost-lines{0%{background-position:-100px}40%{background-position:40vw}to{background-position:60vw}}@keyframes ghost-lines{0%{background-position:-100px}40%{background-position:40vw}to{background-position:60vw}}.skeleton-container[_ngcontent-%COMP%]{padding:0 12px;width:100%}.skeleton-container[_ngcontent-%COMP%]   .skeleton[_ngcontent-%COMP%]{width:100%}.skeleton-container[_ngcontent-%COMP%]   .skeleton__line[_ngcontent-%COMP%]{width:100%;height:24px;border-radius:4px}.skeleton-container[_ngcontent-%COMP%]   .skeleton__circle[_ngcontent-%COMP%], .skeleton-container[_ngcontent-%COMP%]   .skeleton__line[_ngcontent-%COMP%]{background-color:grey;margin-bottom:6px;background-image:linear-gradient(90deg,hsla(0,0%,86.7%,.863),rgba(236,235,235,.95) 40px,hsla(0,0%,86.7%,.863) 80px);background-size:80vw;-webkit-animation:ghost-lines 1s linear infinite;animation:ghost-lines 1s linear infinite}.skeleton-container[_ngcontent-%COMP%]   .skeleton__circle[_ngcontent-%COMP%]{width:50px;height:50px;border-radius:50%}"]}),e}()},PHdk:function(e,t,n){"use strict";n.d(t,"a",(function(){return s}));var a=n("fXoL"),o=n("ofXK");function r(e,t){if(1&e&&a.Nb(0,"i"),2&e){var n=a.ec(2);a.Cb("mr-2 fw-600 "+n.icon)}}function i(e,t){if(1&e&&(a.Sb(0,"span",3),a.Gc(1,r,1,2,"i",4),a.Ic(2),a.Rb()),2&e){var n=a.ec();a.Ab(1),a.mc("ngIf",n.icon),a.Ab(1),a.Kc("",n.title," ")}}var c=["*"],s=function(){var e=function(){function e(){_classCallCheck(this,e),this.title="",this.icon=""}return _createClass(e,[{key:"ngOnInit",value:function(){}}]),e}();return e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=a.Gb({type:e,selectors:[["ft-card"]],inputs:{title:"title",icon:"icon"},ngContentSelectors:c,decls:4,vars:1,consts:[[1,"card"],["class","card-title",4,"ngIf"],[1,"card-body"],[1,"card-title"],[3,"class",4,"ngIf"]],template:function(e,t){1&e&&(a.lc(),a.Sb(0,"div",0),a.Gc(1,i,3,2,"span",1),a.Sb(2,"div",2),a.kc(3),a.Rb(),a.Rb()),2&e&&(a.Ab(1),a.mc("ngIf",t.title))},directives:[o.m],styles:[".card[_ngcontent-%COMP%]{margin:0;box-shadow:0 4px 6px 0 rgba(31,70,88,.04);border-radius:10px;width:auto;border:1px solid #dbe9f5}.card[_ngcontent-%COMP%]   .card-title[_ngcontent-%COMP%]{display:flex;align-items:baseline;padding:14px 16px;border-bottom:1px solid rgba(219,233,245,.6);font-size:18px;font-family:Circular std,sans-serif;color:#172b3e;font-weight:700;margin-bottom:0}.card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%]{text-align:center}"]}),e}()},iCHY:function(e,t,n){"use strict";n.d(t,"a",(function(){return c}));var a=n("lJxs"),o=n("AytR"),r=n("fXoL"),i=n("tk/3"),c=function(){var e=function(){function e(t){_classCallCheck(this,e),this.http=t,this.escala=1e3}return _createClass(e,[{key:"getFaturamento",value:function(e){return this.http.get("".concat(o.a.API.URL).concat(o.a.API.Routes.dashboards.franqueados.faturamento,"?ano=").concat(e.ano,"&mes=").concat(e.mes,"&codigoFranqueado=").concat(e.codigoFranqueado)).pipe(Object(a.a)((function(e){return e.Data||{}})))}},{key:"getVendasTipoPagamento",value:function(e){return this.http.get("".concat(o.a.API.URL).concat(o.a.API.Routes.dashboards.franqueados.vendasTipoPagamento,"?ano=").concat(e.ano,"&mes=").concat(e.mes,"&codigoFranqueado=").concat(e.codigoFranqueado)).pipe(Object(a.a)((function(e){return e.Data||[]})))}},{key:"getVendasMensal",value:function(e){var t=this;return this.http.get("".concat(o.a.API.URL).concat(o.a.API.Routes.dashboards.franqueados.vendasMensal,"?ano=").concat(e.ano,"&mes=").concat(e.mes,"&codigoFranqueado=").concat(e.codigoFranqueado,"&escala=").concat(this.escala)).pipe(Object(a.a)((function(e){return e.Data.Vendas.reduce((function(n,a){return n.push({Mes:"".concat(2==a.Mes.toString().length?a.Mes.toString():"0".concat(a.Mes.toString()),"/").concat(a.Ano.toString().substring(2,4)),Valor:a.Venda,Media:t.dividirPelaEscala(e.Data.Media)}),n}),[])})))}},{key:"getVendasAcumuladas",value:function(e){return this.http.get("".concat(o.a.API.URL).concat(o.a.API.Routes.dashboards.franqueados.vendasAcumuladas,"?ano=").concat(e.ano,"&mes=").concat(e.mes,"&codigoFranqueado=").concat(e.codigoFranqueado,"&escala=").concat(this.escala)).pipe(Object(a.a)((function(e){return e.Data||[]})))}},{key:"getVendasTopProdutos",value:function(e){return this.http.get("".concat(o.a.API.URL).concat(o.a.API.Routes.dashboards.franqueados.vendasTopProdutos,"?ano=").concat(e.ano,"&mes=").concat(e.mes,"&codigoFranqueado=").concat(e.codigoFranqueado)).pipe(Object(a.a)((function(e){return e.Data||[]})))}},{key:"getVendasHistorico",value:function(e){var t=this;return this.http.get("".concat(o.a.API.URL).concat(o.a.API.Routes.dashboards.franqueados.vendasHistorico,"?ano=").concat(e.ano,"&mes=").concat(e.mes,"&codigoFranqueado=").concat(e.codigoFranqueado,"&escala=").concat(this.escala)).pipe(Object(a.a)((function(e){var n=e.Data.Vendas.reduce((function(n,a){return n.push({Mes:a.Mes,VendaAnoAnterior:a.VendaAnoAnterior,VendaAnoAtual:a.VendaAnoAtual,MediaAnoAnterior:t.dividirPelaEscala(e.Data.MediaAnoAnterior)}),n}),[]);return{AnoAnterior:e.Data.AnoAnterior,AnoAtual:e.Data.AnoAtual,Vendas:n}})))}},{key:"getVendasPorCategoriaProduto",value:function(e,t,n){var r=new URLSearchParams({dataInicio:e,dataFim:t,codigoFranqueado:n.toString()}).toString();return this.http.get("".concat(o.a.API.URL).concat(o.a.API.Routes.dashboards.franqueados.vendasPorCategoriaProduto,"?").concat(r)).pipe(Object(a.a)((function(e){return e.Data.map((function(e){return e.Categoria?e.Expanded=!0:e.Visible=!0,e})),e.Data})))}},{key:"getVendasFranqueado",value:function(e,t,n){var r=new URLSearchParams({dataInicio:e,dataFim:t,codigoFranqueado:n.toString()}).toString();return this.http.get("".concat(o.a.API.URL).concat(o.a.API.Routes.dashboards.franqueados.vendasFranqueado,"?").concat(r)).pipe(Object(a.a)((function(e){return e.Data?e.Data.reduce((function(e,t){return e.push({Cliente:{CPFCliente:t.CPFCliente,NomeCliente:t.NomeCliente,NumeroNF:t.NumeroNF,Vendedor:t.Vendedor,Expanded:!1},CodigoDocumento:t.CodigoDocumento,Data:t.Data,ValorBruto:t.ValorBruto,ValorDesconto:t.ValorDesconto,ValorLiquido:t.ValorLiquido,ResultadoHorizontal:t.ResultadoHorizontal,Total:t.Total}),e}),[]):[]})))}},{key:"getVendasFranqueadoDetalhado",value:function(e){return this.http.get("".concat(o.a.API.URL).concat(o.a.API.Routes.dashboards.franqueados.vendasFranqueadoDetalhado,"?codigoDocumento=").concat(e))}},{key:"getVendasConsumoInterno",value:function(e,t,n){var r=new URLSearchParams({dataInicio:e,dataFim:t,codigoFranqueado:n.toString()}).toString();return this.http.get("".concat(o.a.API.URL).concat(o.a.API.Routes.dashboards.franqueados.vendasConsumoInterno,"?").concat(r)).pipe(Object(a.a)((function(e){return e.Data||[]})))}},{key:"getVendasConsumoInternoDetalhado",value:function(e,t,n,r){var i=new URLSearchParams({dataInicio:e,dataFim:t,codigoFranqueado:n.toString(),codigoRecebedor:r.toString()}).toString();return this.http.get("".concat(o.a.API.URL).concat(o.a.API.Routes.dashboards.franqueados.vendasConsumoInternoDetalhado,"?").concat(i)).pipe(Object(a.a)((function(e){return e.Data||[]})))}},{key:"getVendasPorHora",value:function(e,t,n){var r=new URLSearchParams({dataInicio:e,dataFim:t,codigoFranqueado:n.toString()}).toString();return this.http.get("".concat(o.a.API.URL).concat(o.a.API.Routes.dashboards.franqueados.vendasPorHora,"?").concat(r)).pipe(Object(a.a)((function(e){return e.Data||[]})))}},{key:"dividirPelaEscala",value:function(e){return this.escala?e/this.escala:e}}]),e}();return e.\u0275fac=function(t){return new(t||e)(r.Wb(i.b))},e.\u0275prov=r.Ib({token:e,factory:e.\u0275fac,providedIn:"root"}),e}()}}]);