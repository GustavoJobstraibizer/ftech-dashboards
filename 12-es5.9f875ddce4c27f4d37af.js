function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,t){for(var a=0;a<t.length;a++){var o=t[a];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function _createClass(e,t,a){return t&&_defineProperties(e.prototype,t),a&&_defineProperties(e,a),e}(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{hom0:function(e,t,a){"use strict";a.r(t),a.d(t,"MovimentacaoCaixaModule",(function(){return G}));var o,i,n,c,r=a("ofXK"),l=a("tyNb"),s=a("7LiV"),b=a("jIHw"),d=a("rEr+"),u=a("PCNd"),f=a("IzEk"),m=a("nYR2"),p=a("fXoL"),h=a("Wgwc"),v=a("AytR"),g=a("tk/3"),R=((o=function(){function e(t){_classCallCheck(this,e),this.http=t}return _createClass(e,[{key:"getMovimentacoes",value:function(e,t){return this.http.get("".concat(v.a.API.URL).concat(v.a.API.Routes.dashboards.caixas.movimentacoes.replace(":codigoFranqueado",e.toString()).replace(":dataReferencia",t?h(t).format("YYYY-MM-DD"):"")))}}]),e}()).\u0275fac=function(e){return new(e||o)(p.Wb(g.b))},o.\u0275prov=p.Ib({token:o,factory:o.\u0275fac,providedIn:"root"}),o),k=a("K3ix"),S=a("JqCM"),x=((i=function(){function e(t){_classCallCheck(this,e),this.spinner=t}return _createClass(e,[{key:"show",value:function(){this.spinner.show()}},{key:"hide",value:function(){this.spinner.hide()}}]),e}()).\u0275fac=function(e){return new(e||i)(p.Wb(S.c))},i.\u0275prov=p.Ib({token:i,factory:i.\u0275fac,providedIn:"root"}),i),y=a("mIlV"),C=a("NmSL"),M=a("tkl0"),I=["*"],w=((n=function(){function e(){_classCallCheck(this,e)}return _createClass(e,[{key:"ngOnInit",value:function(){}},{key:"ngAfterViewInit",value:function(){this.onOpen(),this.onClose()}},{key:"open",value:function(){$("#".concat(this.modal.id)).modal("show")}},{key:"close",value:function(){$("#".concat(this.modal.id)).modal("hide")}},{key:"onOpen",value:function(){var e=this;this.modal.onOpen&&$("#".concat(this.modal.id)).on("shown.bs.modal",(function(){return e.modal.onOpen()}))}},{key:"onClose",value:function(){var e=this;this.modal.onClose&&$("#".concat(this.modal.id)).on("hidden.bs.modal",(function(){return e.modal.onClose()}))}}]),e}()).\u0275fac=function(e){return new(e||n)},n.\u0275cmp=p.Gb({type:n,selectors:[["ft-modal"]],inputs:{modal:"modal"},ngContentSelectors:I,decls:12,vars:3,consts:[["tabindex","-1","role","dialog","aria-hidden","true",1,"modal","fade",3,"id"],["role","document",1,"modal-dialog","modal-dialog-centered"],[1,"modal-content"],[1,"modal-header"],[1,"modal-title"],[3,"innerHTML"],["type","button","aria-label","Close",1,"close",3,"click"],["aria-hidden","true"],[1,"modal-body"]],template:function(e,t){1&e&&(p.lc(),p.Sb(0,"div",0),p.Sb(1,"div",1),p.Sb(2,"div",2),p.Sb(3,"div",3),p.Sb(4,"h5",4),p.Nb(5,"span",5),p.Ic(6),p.Rb(),p.Sb(7,"button",6),p.ac("click",(function(){return t.close()})),p.Sb(8,"span",7),p.Ic(9,"\xd7"),p.Rb(),p.Rb(),p.Rb(),p.Sb(10,"div",8),p.kc(11),p.Rb(),p.Rb(),p.Rb(),p.Rb()),2&e&&(p.mc("id",null==t.modal?null:t.modal.id),p.Ab(5),p.nc("innerHTML",null==t.modal?null:t.modal.icon,p.Bc),p.Ab(1),p.Kc(" ",null==t.modal?null:t.modal.title," "))},styles:[""]}),n),O=a("7zfz"),A=a("BdmU"),F=((c=function(){function e(){_classCallCheck(this,e)}return _createClass(e,[{key:"transform",value:function(e){return e?h(e).format("DD/MM/YYYY HH:MM"):""}}]),e}()).\u0275fac=function(e){return new(e||c)},c.\u0275pipe=p.Lb({name:"dateFormat",type:c,pure:!0}),c),_=["refModalObs"],N=["filters"];function T(e,t){1&e&&(p.Sb(0,"colgroup"),p.Nb(1,"col",19),p.Nb(2,"col",20),p.Nb(3,"col",20),p.Nb(4,"col",21),p.Nb(5,"col",21),p.Nb(6,"col",21),p.Nb(7,"col",22),p.Nb(8,"col",23),p.Rb())}function P(e,t){1&e&&(p.Sb(0,"tr"),p.Sb(1,"th"),p.Ic(2,"Data"),p.Rb(),p.Sb(3,"th"),p.Ic(4,"Tipo Movimento"),p.Rb(),p.Sb(5,"th"),p.Ic(6,"Tipo Pagamento"),p.Rb(),p.Sb(7,"th",24),p.Ic(8,"Valor Sistema (R$)"),p.Rb(),p.Sb(9,"th",24),p.Ic(10,"Valor usu\xe1rio (R$)"),p.Rb(),p.Sb(11,"th",24),p.Ic(12,"Diferen\xe7a"),p.Rb(),p.Sb(13,"th"),p.Ic(14,"Operador caixa"),p.Rb(),p.Sb(15,"th"),p.Ic(16,"Obs."),p.Rb(),p.Rb())}var D=function(e,t){return{"btn-outline-dark":e,"btn-outline-primary":t}};function J(e,t){if(1&e){var a=p.Tb();p.Sb(0,"tr",25),p.Sb(1,"td"),p.Ic(2),p.fc(3,"dateFormat"),p.Rb(),p.Sb(4,"td"),p.Ic(5),p.Rb(),p.Sb(6,"td"),p.Ic(7),p.Rb(),p.Sb(8,"td",24),p.Ic(9),p.fc(10,"number"),p.Rb(),p.Sb(11,"td",24),p.Ic(12),p.fc(13,"number"),p.Rb(),p.Sb(14,"td",24),p.Ic(15),p.fc(16,"number"),p.Rb(),p.Sb(17,"td"),p.Ic(18),p.Rb(),p.Sb(19,"td"),p.Sb(20,"button",26),p.ac("click",(function(){p.Ac(a);var e=t.$implicit,o=p.ec(2);return e.Observacao&&o.openModalObs(e.Observacao)})),p.Ic(21," Ler texto "),p.Rb(),p.Rb(),p.Rb()}if(2&e){var o=t.$implicit,i=p.ec(2);p.mc("ngClass",i.tipoMovimentoColors(o)),p.Ab(2),p.Jc(p.gc(3,10,o.Data)),p.Ab(3),p.Jc(o.TipoMovimento),p.Ab(2),p.Jc(o.TipoPagamento),p.Ab(2),p.Jc(p.hc(10,12,o.ValorSistema,"1.2-2")),p.Ab(3),p.Jc(p.hc(13,15,o.ValorUsuario,"1.2-2")),p.Ab(3),p.Kc("",p.gc(16,18,o.PercentualDiferenca),"%"),p.Ab(3),p.Jc(o.OperadorCaixa),p.Ab(2),p.mc("ngClass",p.sc(20,D,!o.Observacao,o.Observacao))("disabled",!o.Observacao)}}function V(e,t){if(1&e&&(p.Qb(0),p.Sb(1,"div",11),p.Sb(2,"h5",12),p.dc(),p.Sb(3,"svg",13),p.Nb(4,"use",14),p.Rb(),p.Ic(5),p.Rb(),p.cc(),p.Sb(6,"p-table",15),p.Gc(7,T,9,0,"ng-template",16),p.Gc(8,P,17,0,"ng-template",17),p.Gc(9,J,22,23,"ng-template",18),p.Rb(),p.Rb(),p.Pb()),2&e){var a=t.$implicit;p.Ab(5),p.Kc(" Caixa - ",a.NomeCaixa," "),p.Ab(1),p.mc("value",a.Registros)("scrollable",!0)}}function Y(e,t){1&e&&p.Nb(0,"ft-empty-content",27)}var q,E,L=[{path:"",component:(q=function(){function e(t,a,o){_classCallCheck(this,e),this.caixasService=t,this.modalService=a,this.loadingService=o,this.caixasMovimentacao=[],this.observacao="",this.modalObs={id:"modal-obs-movimentacao",title:"Observa\xe7\xe3o",icon:'<i class="fas fa-info-circle"></i>'},this.caixaFilters={codigoFranqueado:-1,dataReferencia:null}}return _createClass(e,[{key:"ngOnInit",value:function(){}},{key:"ngAfterViewInit",value:function(){var e=this;this.filters.periodoFilterOnInitEmit.pipe(Object(f.a)(1)).subscribe((function(t){var a=t.dataInicio,o=t.codigoFranqueado;e.caixaFilters.dataReferencia=a,e.caixaFilters.codigoFranqueado=o,e.getMovimentacoes()}))}},{key:"filtroPeriodo",value:function(e){this.caixaFilters.codigoFranqueado=e.codigoFranqueado,this.caixaFilters.dataReferencia=e.dataInicio,this.getMovimentacoes()}},{key:"getMovimentacoes",value:function(){var e=this;this.loadingService.show(),this.caixasService.getMovimentacoes(this.caixaFilters.codigoFranqueado,this.caixaFilters.dataReferencia).pipe(Object(f.a)(1),Object(m.a)((function(){e.loadingService.hide()}))).subscribe((function(t){e.caixasMovimentacao=t}))}},{key:"openModalObs",value:function(e){this.observacao=e,this.refModalObs.open()}},{key:"tipoMovimentoColors",value:function(e){return{"text-primary":"Sangria"===e.TipoMovimento,"text-danger":"Retirada"===e.TipoMovimento,"text-success":"Refor\xe7o"===e.TipoMovimento}}}]),e}(),q.\u0275fac=function(e){return new(e||q)(p.Mb(R),p.Mb(k.b),p.Mb(x))},q.\u0275cmp=p.Gb({type:q,selectors:[["ft-movimentacao-caixa"]],viewQuery:function(e,t){var a;1&e&&(p.Nc(_,!0),p.Nc(N,!0)),2&e&&(p.xc(a=p.bc())&&(t.refModalObs=a.first),p.xc(a=p.bc())&&(t.filters=a.first))},decls:13,vars:10,consts:[[3,"title"],[1,"d-none","d-sm-none","d-md-block","d-lg-block","d-xl-block"],[3,"getTodayDate","showDataReferencia","periodoFilterEmit"],["filters",""],[3,"getTodayDate","showDataReferencia","titleModalFilter","filteredValueEmit"],[4,"ngFor","ngForOf"],[1,"p-relative"],["noResultText","N\xe3o h\xe1 dados de movimenta\xe7\xe3o do caixa para serem exibidos.",4,"ngIf"],[3,"modal"],["refModalObs",""],[1,"text-center","py-5"],[1,"my-3"],[1,"f-w-600"],[1,"icon","icon-banknote"],[0,"xlink","href","#icon-banknote"],["scrollHeight","420px",3,"value","scrollable"],["pTemplate","colgroup"],["pTemplate","header"],["pTemplate","body"],[2,"width","185px"],[2,"width","160px"],[2,"width","150px"],[2,"width","250px"],[2,"width","140px"],[1,"text-right"],[3,"ngClass"],[1,"btn","btn-lg",3,"ngClass","disabled","click"],["noResultText","N\xe3o h\xe1 dados de movimenta\xe7\xe3o do caixa para serem exibidos."]],template:function(e,t){1&e&&(p.Nb(0,"ft-page-title",0),p.Sb(1,"div",1),p.Sb(2,"ft-periodo",2,3),p.ac("periodoFilterEmit",(function(e){return t.filtroPeriodo(e)})),p.Rb(),p.Rb(),p.Sb(4,"ft-button-filter",4),p.ac("filteredValueEmit",(function(e){return t.filtroPeriodo(e)})),p.Rb(),p.Gc(5,V,10,3,"ng-container",5),p.Sb(6,"div",6),p.Gc(7,Y,1,0,"ft-empty-content",7),p.Rb(),p.Sb(8,"ft-modal",8,9),p.Sb(10,"div",10),p.Sb(11,"h5"),p.Ic(12),p.Rb(),p.Rb(),p.Rb()),2&e&&(p.mc("title","Movimenta\xe7\xe3o do caixa"),p.Ab(2),p.mc("getTodayDate",!0)("showDataReferencia",!1),p.Ab(2),p.mc("getTodayDate",!0)("showDataReferencia",!1)("titleModalFilter","Selecione uma Data para visualizar a Movimenta\xe7\xe3o do caixa"),p.Ab(1),p.mc("ngForOf",t.caixasMovimentacao),p.Ab(2),p.mc("ngIf",!t.caixasMovimentacao.length),p.Ab(1),p.mc("modal",t.modalObs),p.Ab(4),p.Jc(t.observacao))},directives:[y.a,C.a,M.a,r.l,r.m,w,d.c,O.c,r.k,A.a],pipes:[F,r.f],styles:["[_nghost-%COMP%]     .p-datatable-thead tr th{background:var(--color-blue-dark);color:#fff}[_nghost-%COMP%]     .p-datatable-scrollable-header-box{padding:0!important}[_nghost-%COMP%]     .p-accordion-header-link{background:var(--color-blue-light-2)!important;color:#fff!important;transition:background .25s!important}[_nghost-%COMP%]     .p-accordion-header-link:hover{background:var(--color-blue-dark)!important}.icon[_ngcontent-%COMP%]{width:var(--space-md);height:var(--space-md);fill:#27c24c}"]}),q)}],G=((E=function e(){_classCallCheck(this,e)}).\u0275mod=p.Kb({type:E}),E.\u0275inj=p.Jb({factory:function(e){return new(e||E)},imports:[[r.c,u.a,l.e.forChild(L),b.a,d.d,s.a],l.e]}),E)}}]);