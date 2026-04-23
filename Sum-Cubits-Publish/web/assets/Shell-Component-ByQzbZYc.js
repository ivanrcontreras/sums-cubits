import{s as F,f as Q,R as X,u as A,a as Z,b as ee,c as ne}from"./useHttp-TUKcuGk1.js";import{B,c as d,o as u,a as f,m as l,r as L,b as D,t as C,d as w,s as k,z as E,M as T,Y as te,l as K,e as y,J as ie,x as V,f as N,g as z,h as re,F as O,i as se,j as v,w as ae,n as R,k as M,p as oe,q as P,u as ue,v as me,y as le,A as de,C as ce,D as be,E as fe,G as pe,H as j,I as h,R as he,K as Ie,L as ge}from"./index-DOvgOjVG.js";import{s as ve,a as ye,b as ke}from"./index-jXAHnjpm.js";import{s as Pe}from"./index-DtKip1HJ.js";import"./index-C9vwxe7B.js";var we=`
    .p-progressbar {
        display: block;
        position: relative;
        overflow: hidden;
        height: dt('progressbar.height');
        background: dt('progressbar.background');
        border-radius: dt('progressbar.border.radius');
    }

    .p-progressbar-value {
        margin: 0;
        background: dt('progressbar.value.background');
    }

    .p-progressbar-label {
        color: dt('progressbar.label.color');
        font-size: dt('progressbar.label.font.size');
        font-weight: dt('progressbar.label.font.weight');
    }

    .p-progressbar-determinate .p-progressbar-value {
        height: 100%;
        width: 0%;
        position: absolute;
        display: none;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        transition: width 1s ease-in-out;
    }

    .p-progressbar-determinate .p-progressbar-label {
        display: inline-flex;
    }

    .p-progressbar-indeterminate .p-progressbar-value::before {
        content: '';
        position: absolute;
        background: inherit;
        inset-block-start: 0;
        inset-inline-start: 0;
        inset-block-end: 0;
        will-change: inset-inline-start, inset-inline-end;
        animation: p-progressbar-indeterminate-anim 2.1s cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite;
    }

    .p-progressbar-indeterminate .p-progressbar-value::after {
        content: '';
        position: absolute;
        background: inherit;
        inset-block-start: 0;
        inset-inline-start: 0;
        inset-block-end: 0;
        will-change: inset-inline-start, inset-inline-end;
        animation: p-progressbar-indeterminate-anim-short 2.1s cubic-bezier(0.165, 0.84, 0.44, 1) infinite;
        animation-delay: 1.15s;
    }

    @keyframes p-progressbar-indeterminate-anim {
        0% {
            inset-inline-start: -35%;
            inset-inline-end: 100%;
        }
        60% {
            inset-inline-start: 100%;
            inset-inline-end: -90%;
        }
        100% {
            inset-inline-start: 100%;
            inset-inline-end: -90%;
        }
    }
    @-webkit-keyframes p-progressbar-indeterminate-anim {
        0% {
            inset-inline-start: -35%;
            inset-inline-end: 100%;
        }
        60% {
            inset-inline-start: 100%;
            inset-inline-end: -90%;
        }
        100% {
            inset-inline-start: 100%;
            inset-inline-end: -90%;
        }
    }

    @keyframes p-progressbar-indeterminate-anim-short {
        0% {
            inset-inline-start: -200%;
            inset-inline-end: 100%;
        }
        60% {
            inset-inline-start: 107%;
            inset-inline-end: -8%;
        }
        100% {
            inset-inline-start: 107%;
            inset-inline-end: -8%;
        }
    }
    @-webkit-keyframes p-progressbar-indeterminate-anim-short {
        0% {
            inset-inline-start: -200%;
            inset-inline-end: 100%;
        }
        60% {
            inset-inline-start: 107%;
            inset-inline-end: -8%;
        }
        100% {
            inset-inline-start: 107%;
            inset-inline-end: -8%;
        }
    }
`,Le={root:function(e){var t=e.instance;return["p-progressbar p-component",{"p-progressbar-determinate":t.determinate,"p-progressbar-indeterminate":t.indeterminate}]},value:"p-progressbar-value",label:"p-progressbar-label"},xe=B.extend({name:"progressbar",style:we,classes:Le}),Se={name:"BaseProgressBar",extends:F,props:{value:{type:Number,default:null},mode:{type:String,default:"determinate"},showValue:{type:Boolean,default:!0}},style:xe,provide:function(){return{$pcProgressBar:this,$parentInstance:this}}},U={name:"ProgressBar",extends:Se,inheritAttrs:!1,computed:{progressStyle:function(){return{width:this.value+"%",display:"flex"}},indeterminate:function(){return this.mode==="indeterminate"},determinate:function(){return this.mode==="determinate"},dataP:function(){return Q({determinate:this.determinate,indeterminate:this.indeterminate})}}},Ke=["aria-valuenow","data-p"],Me=["data-p"],Ae=["data-p"],Ce=["data-p"];function Fe(n,e,t,r,a,i){return u(),d("div",l({role:"progressbar",class:n.cx("root"),"aria-valuemin":"0","aria-valuenow":n.value,"aria-valuemax":"100","data-p":i.dataP},n.ptmi("root")),[i.determinate?(u(),d("div",l({key:0,class:n.cx("value"),style:i.progressStyle,"data-p":i.dataP},n.ptm("value")),[n.value!=null&&n.value!==0&&n.showValue?(u(),d("div",l({key:0,class:n.cx("label"),"data-p":i.dataP},n.ptm("label")),[L(n.$slots,"default",{},function(){return[D(C(n.value+"%"),1)]})],16,Ae)):f("",!0)],16,Me)):i.indeterminate?(u(),d("div",l({key:1,class:n.cx("value"),"data-p":i.dataP},n.ptm("value")),null,16,Ce)):f("",!0)],16,Ke)}U.render=Fe;var Ee=`
    .p-progressspinner {
        position: relative;
        margin: 0 auto;
        width: 100px;
        height: 100px;
        display: inline-block;
    }

    .p-progressspinner::before {
        content: '';
        display: block;
        padding-top: 100%;
    }

    .p-progressspinner-spin {
        height: 100%;
        transform-origin: center center;
        width: 100%;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
        animation: p-progressspinner-rotate 2s linear infinite;
    }

    .p-progressspinner-circle {
        stroke-dasharray: 89, 200;
        stroke-dashoffset: 0;
        stroke: dt('progressspinner.colorOne');
        animation:
            p-progressspinner-dash 1.5s ease-in-out infinite,
            p-progressspinner-color 6s ease-in-out infinite;
        stroke-linecap: round;
    }

    @keyframes p-progressspinner-rotate {
        100% {
            transform: rotate(360deg);
        }
    }
    @keyframes p-progressspinner-dash {
        0% {
            stroke-dasharray: 1, 200;
            stroke-dashoffset: 0;
        }
        50% {
            stroke-dasharray: 89, 200;
            stroke-dashoffset: -35px;
        }
        100% {
            stroke-dasharray: 89, 200;
            stroke-dashoffset: -124px;
        }
    }
    @keyframes p-progressspinner-color {
        100%,
        0% {
            stroke: dt('progressspinner.color.one');
        }
        40% {
            stroke: dt('progressspinner.color.two');
        }
        66% {
            stroke: dt('progressspinner.color.three');
        }
        80%,
        90% {
            stroke: dt('progressspinner.color.four');
        }
    }
`,Ve={root:"p-progressspinner",spin:"p-progressspinner-spin",circle:"p-progressspinner-circle"},Oe=B.extend({name:"progressspinner",style:Ee,classes:Ve}),De={name:"BaseProgressSpinner",extends:F,props:{strokeWidth:{type:String,default:"2"},fill:{type:String,default:"none"},animationDuration:{type:String,default:"2s"}},style:Oe,provide:function(){return{$pcProgressSpinner:this,$parentInstance:this}}},q={name:"ProgressSpinner",extends:De,inheritAttrs:!1,computed:{svgStyle:function(){return{"animation-duration":this.animationDuration}}}},ze=["fill","stroke-width"];function Re(n,e,t,r,a,i){return u(),d("div",l({class:n.cx("root"),role:"progressbar"},n.ptmi("root")),[(u(),d("svg",l({class:n.cx("spin"),viewBox:"25 25 50 50",style:i.svgStyle},n.ptm("spin")),[w("circle",l({class:n.cx("circle"),cx:"50",cy:"50",r:"20",fill:n.fill,"stroke-width":n.strokeWidth,strokeMiterlimit:"10"},n.ptm("circle")),null,16,ze)],16))],16)}q.render=Re;var Be=`
    .p-menubar {
        display: flex;
        align-items: center;
        background: dt('menubar.background');
        border: 1px solid dt('menubar.border.color');
        border-radius: dt('menubar.border.radius');
        color: dt('menubar.color');
        padding: dt('menubar.padding');
        gap: dt('menubar.gap');
    }

    .p-menubar-start,
    .p-megamenu-end {
        display: flex;
        align-items: center;
    }

    .p-menubar-root-list,
    .p-menubar-submenu {
        display: flex;
        margin: 0;
        padding: 0;
        list-style: none;
        outline: 0 none;
    }

    .p-menubar-root-list {
        align-items: center;
        flex-wrap: wrap;
        gap: dt('menubar.gap');
    }

    .p-menubar-root-list > .p-menubar-item > .p-menubar-item-content {
        border-radius: dt('menubar.base.item.border.radius');
    }

    .p-menubar-root-list > .p-menubar-item > .p-menubar-item-content > .p-menubar-item-link {
        padding: dt('menubar.base.item.padding');
    }

    .p-menubar-item-content {
        transition:
            background dt('menubar.transition.duration'),
            color dt('menubar.transition.duration');
        border-radius: dt('menubar.item.border.radius');
        color: dt('menubar.item.color');
    }

    .p-menubar-item-link {
        cursor: pointer;
        display: flex;
        align-items: center;
        text-decoration: none;
        overflow: hidden;
        position: relative;
        color: inherit;
        padding: dt('menubar.item.padding');
        gap: dt('menubar.item.gap');
        user-select: none;
        outline: 0 none;
    }

    .p-menubar-item-label {
        line-height: 1;
    }

    .p-menubar-item-icon {
        color: dt('menubar.item.icon.color');
    }

    .p-menubar-submenu-icon {
        color: dt('menubar.submenu.icon.color');
        margin-left: auto;
        font-size: dt('menubar.submenu.icon.size');
        width: dt('menubar.submenu.icon.size');
        height: dt('menubar.submenu.icon.size');
    }

    .p-menubar-submenu .p-menubar-submenu-icon:dir(rtl) {
        margin-left: 0;
        margin-right: auto;
    }

    .p-menubar-item.p-focus > .p-menubar-item-content {
        color: dt('menubar.item.focus.color');
        background: dt('menubar.item.focus.background');
    }

    .p-menubar-item.p-focus > .p-menubar-item-content .p-menubar-item-icon {
        color: dt('menubar.item.icon.focus.color');
    }

    .p-menubar-item.p-focus > .p-menubar-item-content .p-menubar-submenu-icon {
        color: dt('menubar.submenu.icon.focus.color');
    }

    .p-menubar-item:not(.p-disabled) > .p-menubar-item-content:hover {
        color: dt('menubar.item.focus.color');
        background: dt('menubar.item.focus.background');
    }

    .p-menubar-item:not(.p-disabled) > .p-menubar-item-content:hover .p-menubar-item-icon {
        color: dt('menubar.item.icon.focus.color');
    }

    .p-menubar-item:not(.p-disabled) > .p-menubar-item-content:hover .p-menubar-submenu-icon {
        color: dt('menubar.submenu.icon.focus.color');
    }

    .p-menubar-item-active > .p-menubar-item-content {
        color: dt('menubar.item.active.color');
        background: dt('menubar.item.active.background');
    }

    .p-menubar-item-active > .p-menubar-item-content .p-menubar-item-icon {
        color: dt('menubar.item.icon.active.color');
    }

    .p-menubar-item-active > .p-menubar-item-content .p-menubar-submenu-icon {
        color: dt('menubar.submenu.icon.active.color');
    }

    .p-menubar-submenu {
        display: none;
        position: absolute;
        min-width: 12.5rem;
        z-index: 1;
        background: dt('menubar.submenu.background');
        border: 1px solid dt('menubar.submenu.border.color');
        border-radius: dt('menubar.submenu.border.radius');
        box-shadow: dt('menubar.submenu.shadow');
        color: dt('menubar.submenu.color');
        flex-direction: column;
        padding: dt('menubar.submenu.padding');
        gap: dt('menubar.submenu.gap');
    }

    .p-menubar-submenu .p-menubar-separator {
        border-block-start: 1px solid dt('menubar.separator.border.color');
    }

    .p-menubar-submenu .p-menubar-item {
        position: relative;
    }

    .p-menubar-submenu > .p-menubar-item-active > .p-menubar-submenu {
        display: block;
        left: 100%;
        top: 0;
    }

    .p-menubar-end {
        margin-left: auto;
        align-self: center;
    }

    .p-menubar-end:dir(rtl) {
        margin-left: 0;
        margin-right: auto;
    }

    .p-menubar-button {
        display: none;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        width: dt('menubar.mobile.button.size');
        height: dt('menubar.mobile.button.size');
        position: relative;
        color: dt('menubar.mobile.button.color');
        border: 0 none;
        background: transparent;
        border-radius: dt('menubar.mobile.button.border.radius');
        transition:
            background dt('menubar.transition.duration'),
            color dt('menubar.transition.duration'),
            outline-color dt('menubar.transition.duration');
        outline-color: transparent;
    }

    .p-menubar-button:hover {
        color: dt('menubar.mobile.button.hover.color');
        background: dt('menubar.mobile.button.hover.background');
    }

    .p-menubar-button:focus-visible {
        box-shadow: dt('menubar.mobile.button.focus.ring.shadow');
        outline: dt('menubar.mobile.button.focus.ring.width') dt('menubar.mobile.button.focus.ring.style') dt('menubar.mobile.button.focus.ring.color');
        outline-offset: dt('menubar.mobile.button.focus.ring.offset');
    }

    .p-menubar-mobile {
        position: relative;
    }

    .p-menubar-mobile .p-menubar-button {
        display: flex;
    }

    .p-menubar-mobile .p-menubar-root-list {
        position: absolute;
        display: none;
        width: 100%;
        flex-direction: column;
        top: 100%;
        left: 0;
        z-index: 1;
        padding: dt('menubar.submenu.padding');
        background: dt('menubar.submenu.background');
        border: 1px solid dt('menubar.submenu.border.color');
        box-shadow: dt('menubar.submenu.shadow');
        border-radius: dt('menubar.submenu.border.radius');
        gap: dt('menubar.submenu.gap');
    }

    .p-menubar-mobile .p-menubar-root-list:dir(rtl) {
        left: auto;
        right: 0;
    }

    .p-menubar-mobile .p-menubar-root-list > .p-menubar-item > .p-menubar-item-content > .p-menubar-item-link {
        padding: dt('menubar.item.padding');
    }

    .p-menubar-mobile-active .p-menubar-root-list {
        display: flex;
    }

    .p-menubar-mobile .p-menubar-root-list .p-menubar-item {
        width: 100%;
        position: static;
    }

    .p-menubar-mobile .p-menubar-root-list .p-menubar-separator {
        border-block-start: 1px solid dt('menubar.separator.border.color');
    }

    .p-menubar-mobile .p-menubar-root-list > .p-menubar-item > .p-menubar-item-content .p-menubar-submenu-icon {
        margin-left: auto;
        transition: transform 0.2s;
    }

    .p-menubar-mobile .p-menubar-root-list > .p-menubar-item > .p-menubar-item-content .p-menubar-submenu-icon:dir(rtl),
    .p-menubar-mobile .p-menubar-submenu-icon:dir(rtl) {
        margin-left: 0;
        margin-right: auto;
    }

    .p-menubar-mobile .p-menubar-root-list > .p-menubar-item-active > .p-menubar-item-content .p-menubar-submenu-icon {
        transform: rotate(-180deg);
    }

    .p-menubar-mobile .p-menubar-submenu .p-menubar-submenu-icon {
        transition: transform 0.2s;
        transform: rotate(90deg);
    }

    .p-menubar-mobile .p-menubar-item-active > .p-menubar-item-content .p-menubar-submenu-icon {
        transform: rotate(-90deg);
    }

    .p-menubar-mobile .p-menubar-submenu {
        width: 100%;
        position: static;
        box-shadow: none;
        border: 0 none;
        padding-inline-start: dt('menubar.submenu.mobile.indent');
        padding-inline-end: 0;
    }
`,Te={submenu:function(e){var t=e.instance,r=e.processedItem;return{display:t.isItemActive(r)?"flex":"none"}}},je={root:function(e){var t=e.instance;return["p-menubar p-component",{"p-menubar-mobile":t.queryMatches,"p-menubar-mobile-active":t.mobileActive}]},start:"p-menubar-start",button:"p-menubar-button",rootList:"p-menubar-root-list",item:function(e){var t=e.instance,r=e.processedItem;return["p-menubar-item",{"p-menubar-item-active":t.isItemActive(r),"p-focus":t.isItemFocused(r),"p-disabled":t.isItemDisabled(r)}]},itemContent:"p-menubar-item-content",itemLink:"p-menubar-item-link",itemIcon:"p-menubar-item-icon",itemLabel:"p-menubar-item-label",submenuIcon:"p-menubar-submenu-icon",submenu:"p-menubar-submenu",separator:"p-menubar-separator",end:"p-menubar-end"},_e=B.extend({name:"menubar",style:Be,classes:je,inlineStyles:Te}),Ge={name:"BaseMenubar",extends:F,props:{model:{type:Array,default:null},buttonProps:{type:null,default:null},breakpoint:{type:String,default:"960px"},ariaLabelledby:{type:String,default:null},ariaLabel:{type:String,default:null}},style:_e,provide:function(){return{$pcMenubar:this,$parentInstance:this}}},H={name:"MenubarSub",hostName:"Menubar",extends:F,emits:["item-mouseenter","item-click","item-mousemove"],props:{items:{type:Array,default:null},root:{type:Boolean,default:!1},popup:{type:Boolean,default:!1},mobileActive:{type:Boolean,default:!1},templates:{type:Object,default:null},level:{type:Number,default:0},menuId:{type:String,default:null},focusedItemId:{type:String,default:null},activeItemPath:{type:Object,default:null}},list:null,methods:{getItemId:function(e){return"".concat(this.menuId,"_").concat(e.key)},getItemKey:function(e){return this.getItemId(e)},getItemProp:function(e,t,r){return e&&e.item?N(e.item[t],r):void 0},getItemLabel:function(e){return this.getItemProp(e,"label")},getItemLabelId:function(e){return"".concat(this.menuId,"_").concat(e.key,"_label")},getPTOptions:function(e,t,r){return this.ptm(r,{context:{item:e.item,index:t,active:this.isItemActive(e),focused:this.isItemFocused(e),disabled:this.isItemDisabled(e),level:this.level}})},isItemActive:function(e){return this.activeItemPath.some(function(t){return t.key===e.key})},isItemVisible:function(e){return this.getItemProp(e,"visible")!==!1},isItemDisabled:function(e){return this.getItemProp(e,"disabled")},isItemFocused:function(e){return this.focusedItemId===this.getItemId(e)},isItemGroup:function(e){return k(e.items)},onItemClick:function(e,t){this.getItemProp(t,"command",{originalEvent:e,item:t.item}),this.$emit("item-click",{originalEvent:e,processedItem:t,isFocus:!0})},onItemMouseEnter:function(e,t){this.$emit("item-mouseenter",{originalEvent:e,processedItem:t})},onItemMouseMove:function(e,t){this.$emit("item-mousemove",{originalEvent:e,processedItem:t})},getAriaPosInset:function(e){return e-this.calculateAriaSetSize.slice(0,e).length+1},getMenuItemProps:function(e,t){return{action:l({class:this.cx("itemLink"),tabindex:-1},this.getPTOptions(e,t,"itemLink")),icon:l({class:[this.cx("itemIcon"),this.getItemProp(e,"icon")]},this.getPTOptions(e,t,"itemIcon")),label:l({class:this.cx("itemLabel")},this.getPTOptions(e,t,"itemLabel")),submenuicon:l({class:this.cx("submenuIcon")},this.getPTOptions(e,t,"submenuIcon"))}}},computed:{calculateAriaSetSize:function(){var e=this;return this.items.filter(function(t){return e.isItemVisible(t)&&e.getItemProp(t,"separator")})},getAriaSetSize:function(){var e=this;return this.items.filter(function(t){return e.isItemVisible(t)&&!e.getItemProp(t,"separator")}).length}},components:{AngleRightIcon:ke,AngleDownIcon:ye},directives:{ripple:X}},Ne=["id","aria-label","aria-disabled","aria-expanded","aria-haspopup","aria-setsize","aria-posinset","data-p-active","data-p-focused","data-p-disabled"],Ue=["onClick","onMouseenter","onMousemove"],qe=["href","target"],He=["id"],We=["id"];function $e(n,e,t,r,a,i){var m=z("MenubarSub",!0),b=re("ripple");return u(),d("ul",l({class:t.level===0?n.cx("rootList"):n.cx("submenu")},t.level===0?n.ptm("rootList"):n.ptm("submenu")),[(u(!0),d(O,null,se(t.items,function(s,o){return u(),d(O,{key:i.getItemKey(s)},[i.isItemVisible(s)&&!i.getItemProp(s,"separator")?(u(),d("li",l({key:0,id:i.getItemId(s),style:i.getItemProp(s,"style"),class:[n.cx("item",{processedItem:s}),i.getItemProp(s,"class")],role:"menuitem","aria-label":i.getItemLabel(s),"aria-disabled":i.isItemDisabled(s)||void 0,"aria-expanded":i.isItemGroup(s)?i.isItemActive(s):void 0,"aria-haspopup":i.isItemGroup(s)&&!i.getItemProp(s,"to")?"menu":void 0,"aria-setsize":i.getAriaSetSize,"aria-posinset":i.getAriaPosInset(o)},{ref_for:!0},i.getPTOptions(s,o,"item"),{"data-p-active":i.isItemActive(s),"data-p-focused":i.isItemFocused(s),"data-p-disabled":i.isItemDisabled(s)}),[w("div",l({class:n.cx("itemContent"),onClick:function(p){return i.onItemClick(p,s)},onMouseenter:function(p){return i.onItemMouseEnter(p,s)},onMousemove:function(p){return i.onItemMouseMove(p,s)}},{ref_for:!0},i.getPTOptions(s,o,"itemContent")),[t.templates.item?(u(),v(M(t.templates.item),{key:1,item:s.item,root:t.root,hasSubmenu:i.getItemProp(s,"items"),label:i.getItemLabel(s),props:i.getMenuItemProps(s,o)},null,8,["item","root","hasSubmenu","label","props"])):ae((u(),d("a",l({key:0,href:i.getItemProp(s,"url"),class:n.cx("itemLink"),target:i.getItemProp(s,"target"),tabindex:"-1"},{ref_for:!0},i.getPTOptions(s,o,"itemLink")),[t.templates.itemicon?(u(),v(M(t.templates.itemicon),{key:0,item:s.item,class:R(n.cx("itemIcon"))},null,8,["item","class"])):i.getItemProp(s,"icon")?(u(),d("span",l({key:1,class:[n.cx("itemIcon"),i.getItemProp(s,"icon")]},{ref_for:!0},i.getPTOptions(s,o,"itemIcon")),null,16)):f("",!0),w("span",l({id:i.getItemLabelId(s),class:n.cx("itemLabel")},{ref_for:!0},i.getPTOptions(s,o,"itemLabel")),C(i.getItemLabel(s)),17,He),i.getItemProp(s,"items")?(u(),d(O,{key:2},[t.templates.submenuicon?(u(),v(M(t.templates.submenuicon),{key:0,root:t.root,active:i.isItemActive(s),class:R(n.cx("submenuIcon"))},null,8,["root","active","class"])):(u(),v(M(t.root?"AngleDownIcon":"AngleRightIcon"),l({key:1,class:n.cx("submenuIcon")},{ref_for:!0},i.getPTOptions(s,o,"submenuIcon")),null,16,["class"]))],64)):f("",!0)],16,qe)),[[b]])],16,Ue),i.isItemVisible(s)&&i.isItemGroup(s)?(u(),v(m,{key:0,id:i.getItemId(s)+"_list",menuId:t.menuId,role:"menu",style:oe(n.sx("submenu",!0,{processedItem:s})),focusedItemId:t.focusedItemId,items:s.items,mobileActive:t.mobileActive,activeItemPath:t.activeItemPath,templates:t.templates,level:t.level+1,"aria-labelledby":i.getItemLabelId(s),pt:n.pt,unstyled:n.unstyled,onItemClick:e[0]||(e[0]=function(c){return n.$emit("item-click",c)}),onItemMouseenter:e[1]||(e[1]=function(c){return n.$emit("item-mouseenter",c)}),onItemMousemove:e[2]||(e[2]=function(c){return n.$emit("item-mousemove",c)})},null,8,["id","menuId","style","focusedItemId","items","mobileActive","activeItemPath","templates","level","aria-labelledby","pt","unstyled"])):f("",!0)],16,Ne)):f("",!0),i.isItemVisible(s)&&i.getItemProp(s,"separator")?(u(),d("li",l({key:1,id:i.getItemId(s),class:[n.cx("separator"),i.getItemProp(s,"class")],style:i.getItemProp(s,"style"),role:"separator"},{ref_for:!0},n.ptm("separator")),null,16,We)):f("",!0)],64)}),128))],16)}H.render=$e;var W={name:"Menubar",extends:Ge,inheritAttrs:!1,emits:["focus","blur"],matchMediaListener:null,data:function(){return{mobileActive:!1,focused:!1,focusedItemInfo:{index:-1,level:0,parentKey:""},activeItemPath:[],dirty:!1,query:null,queryMatches:!1}},watch:{activeItemPath:function(e){k(e)?(this.bindOutsideClickListener(),this.bindResizeListener()):(this.unbindOutsideClickListener(),this.unbindResizeListener())}},outsideClickListener:null,container:null,menubar:null,mounted:function(){this.bindMatchMediaListener()},beforeUnmount:function(){this.mobileActive=!1,this.unbindOutsideClickListener(),this.unbindResizeListener(),this.unbindMatchMediaListener(),this.container&&V.clear(this.container),this.container=null},methods:{getItemProp:function(e,t){return e?N(e[t]):void 0},getItemLabel:function(e){return this.getItemProp(e,"label")},isItemDisabled:function(e){return this.getItemProp(e,"disabled")},isItemVisible:function(e){return this.getItemProp(e,"visible")!==!1},isItemGroup:function(e){return k(this.getItemProp(e,"items"))},isItemSeparator:function(e){return this.getItemProp(e,"separator")},getProccessedItemLabel:function(e){return e?this.getItemLabel(e.item):void 0},isProccessedItemGroup:function(e){return e&&k(e.items)},toggle:function(e){var t=this;this.mobileActive?(this.mobileActive=!1,V.clear(this.menubar),this.hide()):(this.mobileActive=!0,V.set("menu",this.menubar,this.$primevue.config.zIndex.menu),setTimeout(function(){t.show()},1)),this.bindOutsideClickListener(),e.preventDefault()},show:function(){y(this.menubar)},hide:function(e,t){var r=this;this.mobileActive&&(this.mobileActive=!1,setTimeout(function(){y(r.$refs.menubutton)},0)),this.activeItemPath=[],this.focusedItemInfo={index:-1,level:0,parentKey:""},t&&y(this.menubar),this.dirty=!1},onFocus:function(e){this.focused=!0,this.focusedItemInfo=this.focusedItemInfo.index!==-1?this.focusedItemInfo:{index:this.findFirstFocusedItemIndex(),level:0,parentKey:""},this.$emit("focus",e)},onBlur:function(e){this.focused=!1,this.focusedItemInfo={index:-1,level:0,parentKey:""},this.searchValue="",this.dirty=!1,this.$emit("blur",e)},onKeyDown:function(e){var t=e.metaKey||e.ctrlKey;switch(e.code){case"ArrowDown":this.onArrowDownKey(e);break;case"ArrowUp":this.onArrowUpKey(e);break;case"ArrowLeft":this.onArrowLeftKey(e);break;case"ArrowRight":this.onArrowRightKey(e);break;case"Home":this.onHomeKey(e);break;case"End":this.onEndKey(e);break;case"Space":this.onSpaceKey(e);break;case"Enter":case"NumpadEnter":this.onEnterKey(e);break;case"Escape":this.onEscapeKey(e);break;case"Tab":this.onTabKey(e);break;case"PageDown":case"PageUp":case"Backspace":case"ShiftLeft":case"ShiftRight":break;default:!t&&ie(e.key)&&this.searchItems(e,e.key);break}},onItemChange:function(e,t){var r=e.processedItem,a=e.isFocus;if(!K(r)){var i=r.index,m=r.key,b=r.level,s=r.parentKey,o=r.items,c=k(o),p=this.activeItemPath.filter(function(I){return I.parentKey!==s&&I.parentKey!==m});c&&p.push(r),this.focusedItemInfo={index:i,level:b,parentKey:s},c&&(this.dirty=!0),a&&y(this.menubar),!(t==="hover"&&this.queryMatches)&&(this.activeItemPath=p)}},onItemClick:function(e){var t=e.originalEvent,r=e.processedItem,a=this.isProccessedItemGroup(r),i=K(r.parent),m=this.isSelected(r);if(m){var b=r.index,s=r.key,o=r.level,c=r.parentKey;this.activeItemPath=this.activeItemPath.filter(function(I){return s!==I.key&&s.startsWith(I.key)}),this.focusedItemInfo={index:b,level:o,parentKey:c},this.dirty=!i,y(this.menubar)}else if(a)this.onItemChange(e);else{var p=i?r:this.activeItemPath.find(function(I){return I.parentKey===""});this.hide(t),this.changeFocusedItemIndex(t,p?p.index:-1),this.mobileActive=!1,y(this.menubar)}},onItemMouseEnter:function(e){this.dirty&&this.onItemChange(e,"hover")},onItemMouseMove:function(e){this.focused&&this.changeFocusedItemIndex(e,e.processedItem.index)},menuButtonClick:function(e){this.toggle(e)},menuButtonKeydown:function(e){(e.code==="Enter"||e.code==="NumpadEnter"||e.code==="Space")&&this.menuButtonClick(e)},onArrowDownKey:function(e){var t=this.visibleItems[this.focusedItemInfo.index],r=t?K(t.parent):null;if(r){var a=this.isProccessedItemGroup(t);a&&(this.onItemChange({originalEvent:e,processedItem:t}),this.focusedItemInfo={index:-1,parentKey:t.key},this.onArrowRightKey(e))}else{var i=this.focusedItemInfo.index!==-1?this.findNextItemIndex(this.focusedItemInfo.index):this.findFirstFocusedItemIndex();this.changeFocusedItemIndex(e,i)}e.preventDefault()},onArrowUpKey:function(e){var t=this,r=this.visibleItems[this.focusedItemInfo.index],a=K(r.parent);if(a){var i=this.isProccessedItemGroup(r);if(i){this.onItemChange({originalEvent:e,processedItem:r}),this.focusedItemInfo={index:-1,parentKey:r.key};var m=this.findLastItemIndex();this.changeFocusedItemIndex(e,m)}}else{var b=this.activeItemPath.find(function(o){return o.key===r.parentKey});if(this.focusedItemInfo.index===0)this.focusedItemInfo={index:-1,parentKey:b?b.parentKey:""},this.searchValue="",this.onArrowLeftKey(e),this.activeItemPath=this.activeItemPath.filter(function(o){return o.parentKey!==t.focusedItemInfo.parentKey});else{var s=this.focusedItemInfo.index!==-1?this.findPrevItemIndex(this.focusedItemInfo.index):this.findLastFocusedItemIndex();this.changeFocusedItemIndex(e,s)}}e.preventDefault()},onArrowLeftKey:function(e){var t=this,r=this.visibleItems[this.focusedItemInfo.index],a=r?this.activeItemPath.find(function(m){return m.key===r.parentKey}):null;if(a)this.onItemChange({originalEvent:e,processedItem:a}),this.activeItemPath=this.activeItemPath.filter(function(m){return m.parentKey!==t.focusedItemInfo.parentKey}),e.preventDefault();else{var i=this.focusedItemInfo.index!==-1?this.findPrevItemIndex(this.focusedItemInfo.index):this.findLastFocusedItemIndex();this.changeFocusedItemIndex(e,i),e.preventDefault()}},onArrowRightKey:function(e){var t=this.visibleItems[this.focusedItemInfo.index],r=t?this.activeItemPath.find(function(m){return m.key===t.parentKey}):null;if(r){var a=this.isProccessedItemGroup(t);a&&(this.onItemChange({originalEvent:e,processedItem:t}),this.focusedItemInfo={index:-1,parentKey:t.key},this.onArrowDownKey(e))}else{var i=this.focusedItemInfo.index!==-1?this.findNextItemIndex(this.focusedItemInfo.index):this.findFirstFocusedItemIndex();this.changeFocusedItemIndex(e,i),e.preventDefault()}},onHomeKey:function(e){this.changeFocusedItemIndex(e,this.findFirstItemIndex()),e.preventDefault()},onEndKey:function(e){this.changeFocusedItemIndex(e,this.findLastItemIndex()),e.preventDefault()},onEnterKey:function(e){if(this.focusedItemInfo.index!==-1){var t=E(this.menubar,'li[id="'.concat("".concat(this.focusedItemId),'"]')),r=t&&E(t,'a[data-pc-section="itemlink"]');r?r.click():t&&t.click();var a=this.visibleItems[this.focusedItemInfo.index],i=this.isProccessedItemGroup(a);!i&&(this.focusedItemInfo.index=this.findFirstFocusedItemIndex())}e.preventDefault()},onSpaceKey:function(e){this.onEnterKey(e)},onEscapeKey:function(e){if(this.focusedItemInfo.level!==0){var t=this.focusedItemInfo;this.hide(e,!1),this.focusedItemInfo={index:Number(t.parentKey.split("_")[0]),level:0,parentKey:""}}e.preventDefault()},onTabKey:function(e){if(this.focusedItemInfo.index!==-1){var t=this.visibleItems[this.focusedItemInfo.index],r=this.isProccessedItemGroup(t);!r&&this.onItemChange({originalEvent:e,processedItem:t})}this.hide()},bindOutsideClickListener:function(){var e=this;this.outsideClickListener||(this.outsideClickListener=function(t){var r=e.container&&!e.container.contains(t.target),a=!(e.target&&(e.target===t.target||e.target.contains(t.target)));r&&a&&e.hide()},document.addEventListener("click",this.outsideClickListener,!0))},unbindOutsideClickListener:function(){this.outsideClickListener&&(document.removeEventListener("click",this.outsideClickListener,!0),this.outsideClickListener=null)},bindResizeListener:function(){var e=this;this.resizeListener||(this.resizeListener=function(t){te()||e.hide(t,!0),e.mobileActive=!1},window.addEventListener("resize",this.resizeListener))},unbindResizeListener:function(){this.resizeListener&&(window.removeEventListener("resize",this.resizeListener),this.resizeListener=null)},bindMatchMediaListener:function(){var e=this;if(!this.matchMediaListener){var t=matchMedia("(max-width: ".concat(this.breakpoint,")"));this.query=t,this.queryMatches=t.matches,this.matchMediaListener=function(){e.queryMatches=t.matches,e.mobileActive=!1},this.query.addEventListener("change",this.matchMediaListener)}},unbindMatchMediaListener:function(){this.matchMediaListener&&(this.query.removeEventListener("change",this.matchMediaListener),this.matchMediaListener=null)},isItemMatched:function(e){var t;return this.isValidItem(e)&&((t=this.getProccessedItemLabel(e))===null||t===void 0?void 0:t.toLocaleLowerCase().startsWith(this.searchValue.toLocaleLowerCase()))},isValidItem:function(e){return!!e&&!this.isItemDisabled(e.item)&&!this.isItemSeparator(e.item)&&this.isItemVisible(e.item)},isValidSelectedItem:function(e){return this.isValidItem(e)&&this.isSelected(e)},isSelected:function(e){return this.activeItemPath.some(function(t){return t.key===e.key})},findFirstItemIndex:function(){var e=this;return this.visibleItems.findIndex(function(t){return e.isValidItem(t)})},findLastItemIndex:function(){var e=this;return T(this.visibleItems,function(t){return e.isValidItem(t)})},findNextItemIndex:function(e){var t=this,r=e<this.visibleItems.length-1?this.visibleItems.slice(e+1).findIndex(function(a){return t.isValidItem(a)}):-1;return r>-1?r+e+1:e},findPrevItemIndex:function(e){var t=this,r=e>0?T(this.visibleItems.slice(0,e),function(a){return t.isValidItem(a)}):-1;return r>-1?r:e},findSelectedItemIndex:function(){var e=this;return this.visibleItems.findIndex(function(t){return e.isValidSelectedItem(t)})},findFirstFocusedItemIndex:function(){var e=this.findSelectedItemIndex();return e<0?this.findFirstItemIndex():e},findLastFocusedItemIndex:function(){var e=this.findSelectedItemIndex();return e<0?this.findLastItemIndex():e},searchItems:function(e,t){var r=this;this.searchValue=(this.searchValue||"")+t;var a=-1,i=!1;return this.focusedItemInfo.index!==-1?(a=this.visibleItems.slice(this.focusedItemInfo.index).findIndex(function(m){return r.isItemMatched(m)}),a=a===-1?this.visibleItems.slice(0,this.focusedItemInfo.index).findIndex(function(m){return r.isItemMatched(m)}):a+this.focusedItemInfo.index):a=this.visibleItems.findIndex(function(m){return r.isItemMatched(m)}),a!==-1&&(i=!0),a===-1&&this.focusedItemInfo.index===-1&&(a=this.findFirstFocusedItemIndex()),a!==-1&&this.changeFocusedItemIndex(e,a),this.searchTimeout&&clearTimeout(this.searchTimeout),this.searchTimeout=setTimeout(function(){r.searchValue="",r.searchTimeout=null},500),i},changeFocusedItemIndex:function(e,t){this.focusedItemInfo.index!==t&&(this.focusedItemInfo.index=t,this.scrollInView())},scrollInView:function(){var e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:-1,t=e!==-1?"".concat(this.$id,"_").concat(e):this.focusedItemId,r=E(this.menubar,'li[id="'.concat(t,'"]'));r&&r.scrollIntoView&&r.scrollIntoView({block:"nearest",inline:"start"})},createProcessedItems:function(e){var t=this,r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:0,a=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{},i=arguments.length>3&&arguments[3]!==void 0?arguments[3]:"",m=[];return e&&e.forEach(function(b,s){var o=(i!==""?i+"_":"")+s,c={item:b,index:s,level:r,key:o,parent:a,parentKey:i};c.items=t.createProcessedItems(b.items,r+1,c,o),m.push(c)}),m},containerRef:function(e){this.container=e},menubarRef:function(e){this.menubar=e?e.$el:void 0}},computed:{processedItems:function(){return this.createProcessedItems(this.model||[])},visibleItems:function(){var e=this,t=this.activeItemPath.find(function(r){return r.key===e.focusedItemInfo.parentKey});return t?t.items:this.processedItems},focusedItemId:function(){return this.focusedItemInfo.index!==-1?"".concat(this.$id).concat(k(this.focusedItemInfo.parentKey)?"_"+this.focusedItemInfo.parentKey:"","_").concat(this.focusedItemInfo.index):null}},components:{MenubarSub:H,BarsIcon:ve}};function x(n){"@babel/helpers - typeof";return x=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(e){return typeof e}:function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},x(n)}function _(n,e){var t=Object.keys(n);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(n);e&&(r=r.filter(function(a){return Object.getOwnPropertyDescriptor(n,a).enumerable})),t.push.apply(t,r)}return t}function G(n){for(var e=1;e<arguments.length;e++){var t=arguments[e]!=null?arguments[e]:{};e%2?_(Object(t),!0).forEach(function(r){Ye(n,r,t[r])}):Object.getOwnPropertyDescriptors?Object.defineProperties(n,Object.getOwnPropertyDescriptors(t)):_(Object(t)).forEach(function(r){Object.defineProperty(n,r,Object.getOwnPropertyDescriptor(t,r))})}return n}function Ye(n,e,t){return(e=Je(e))in n?Object.defineProperty(n,e,{value:t,enumerable:!0,configurable:!0,writable:!0}):n[e]=t,n}function Je(n){var e=Qe(n,"string");return x(e)=="symbol"?e:e+""}function Qe(n,e){if(x(n)!="object"||!n)return n;var t=n[Symbol.toPrimitive];if(t!==void 0){var r=t.call(n,e);if(x(r)!="object")return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return(e==="string"?String:Number)(n)}var Xe=["aria-haspopup","aria-expanded","aria-controls","aria-label"];function Ze(n,e,t,r,a,i){var m=z("BarsIcon"),b=z("MenubarSub");return u(),d("div",l({ref:i.containerRef,class:n.cx("root")},n.ptmi("root")),[n.$slots.start?(u(),d("div",l({key:0,class:n.cx("start")},n.ptm("start")),[L(n.$slots,"start")],16)):f("",!0),L(n.$slots,n.$slots.button?"button":"menubutton",{id:n.$id,class:R(n.cx("button")),toggleCallback:function(o){return i.menuButtonClick(o)}},function(){var s;return[n.model&&n.model.length>0?(u(),d("a",l({key:0,ref:"menubutton",role:"button",tabindex:"0",class:n.cx("button"),"aria-haspopup":!!(n.model.length&&n.model.length>0),"aria-expanded":a.mobileActive,"aria-controls":n.$id,"aria-label":(s=n.$primevue.config.locale.aria)===null||s===void 0?void 0:s.navigation,onClick:e[0]||(e[0]=function(o){return i.menuButtonClick(o)}),onKeydown:e[1]||(e[1]=function(o){return i.menuButtonKeydown(o)})},G(G({},n.buttonProps),n.ptm("button"))),[L(n.$slots,n.$slots.buttonicon?"buttonicon":"menubuttonicon",{},function(){return[P(m,ue(me(n.ptm("buttonicon"))),null,16)]})],16,Xe)):f("",!0)]}),P(b,{ref:i.menubarRef,id:n.$id+"_list",role:"menubar",items:i.processedItems,templates:n.$slots,root:!0,mobileActive:a.mobileActive,tabindex:"0","aria-activedescendant":a.focused?i.focusedItemId:void 0,menuId:n.$id,focusedItemId:a.focused?i.focusedItemId:void 0,activeItemPath:a.activeItemPath,level:0,"aria-labelledby":n.ariaLabelledby,"aria-label":n.ariaLabel,pt:n.pt,unstyled:n.unstyled,onFocus:i.onFocus,onBlur:i.onBlur,onKeydown:i.onKeyDown,onItemClick:i.onItemClick,onItemMouseenter:i.onItemMouseEnter,onItemMousemove:i.onItemMouseMove},null,8,["id","items","templates","mobileActive","aria-activedescendant","menuId","focusedItemId","activeItemPath","aria-labelledby","aria-label","pt","unstyled","onFocus","onBlur","onKeydown","onItemClick","onItemMouseenter","onItemMousemove"]),n.$slots.end?(u(),d("div",l({key:1,class:n.cx("end")},n.ptm("end")),[L(n.$slots,"end")],16)):f("",!0)],16)}W.render=Ze;class en{API_URL="users";async getRoleId(){const e=`${this.API_URL}/rol`,{data:t}=await A(e).get().json();return t.value?.roleId??0}}class nn{API_URL="roles";async get(e){const t=`${this.API_URL}/${e}`,{data:r}=await A(t).get().json();return r.value?.role}async getViewList(e){const t=`${this.API_URL}/${e}/views`,{data:r}=await A(t).get().json();return r.value?.vistaDtos}async getPermissionList(e){const t=`${this.API_URL}/${e}/permissions`,{data:r}=await A(t).get().json();return r.value?.permissionsList}}const tn={key:0},rn={class:"flex items-center gap-2"},sn={class:"p-mr-2"},an={class:"p-1 md:p-6"},on={key:0,class:"mb-4 p-4 text-center"},bn=le({__name:"Shell-Component",setup(n){const e=new nn,t=new en,r=Z(),a=de(),i=ee(),m=Ie(),b=ge(),{t:s}=ce(),o=be([]),c=fe(()=>o.value.length>0),p=async()=>{const g=await t.getRoleId(),S=await e.getViewList(g);S&&(o.value=S.map(I),a.setUserPermissions(S.map(J=>J.nombreVista)))},I=g=>({label:s(`shell.titles.${g.nombreVista}`),command:()=>$(g.ruta)}),$=g=>{m.push({name:g})},Y=()=>{b.logout({logoutParams:{returnTo:window.location.origin}})};return pe(async()=>{await p()}),(g,S)=>(u(),d("div",null,[c.value?(u(),d("div",tn,[P(h(W),{model:o.value},{end:j(()=>[w("div",rn,[w("span",sn,[D(C(h(b).user?.value?.name)+" ",1),P(h(ne),{icon:"pi pi-fw pi-power-off",class:"p-button-danger m-2",onClick:Y})])])]),_:1},8,["model"])])):f("",!0),w("div",an,[c.value?f("",!0):(u(),d("div",on,[P(h(q))])),h(r).isLoading?(u(),v(h(U),{key:1,class:"mb-3",style:{height:"6px"},mode:"indeterminate"})):f("",!0),h(i).isAnyError?(u(),v(h(Pe),{key:2,class:"mb-3",closable:!1,severity:h(i).errorSeverity},{default:j(()=>[D(C(h(i).errorMessage),1)]),_:1},8,["severity"])):f("",!0),P(h(he))])]))}});export{bn as default};
