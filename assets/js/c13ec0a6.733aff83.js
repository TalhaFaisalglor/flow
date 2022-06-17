"use strict";(self.webpackChunksite=self.webpackChunksite||[]).push([[7856],{3905:function(e,t,r){r.d(t,{Zo:function(){return u},kt:function(){return f}});var n=r(7294);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function c(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var l=n.createContext({}),s=function(e){var t=n.useContext(l),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},u=function(e){var t=s(e.components);return n.createElement(l.Provider,{value:t},e.children)},m={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},p=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,o=e.originalType,l=e.parentName,u=c(e,["components","mdxType","originalType","parentName"]),p=s(r),f=a,k=p["".concat(l,".").concat(f)]||p[f]||m[f]||o;return r?n.createElement(k,i(i({ref:t},u),{},{components:r})):n.createElement(k,i({ref:t},u))}));function f(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=r.length,i=new Array(o);i[0]=p;var c={};for(var l in t)hasOwnProperty.call(t,l)&&(c[l]=t[l]);c.originalType=e,c.mdxType="string"==typeof e?e:a,i[1]=c;for(var s=2;s<o;s++)i[s]=r[s];return n.createElement.apply(null,i)}return n.createElement.apply(null,r)}p.displayName="MDXCreateElement"},2473:function(e,t,r){r.r(t),r.d(t,{assets:function(){return u},contentTitle:function(){return l},default:function(){return f},frontMatter:function(){return c},metadata:function(){return s},toc:function(){return m}});var n=r(7462),a=r(3366),o=(r(7294),r(3905)),i=["components"],c={},l="Materialization connectors",s={unversionedId:"reference/Connectors/materialization-connectors/README",id:"reference/Connectors/materialization-connectors/README",title:"Materialization connectors",description:"Estuary's available materialization connectors are listed in this section. Each connector has a unique configuration you must follow as you create your Flow catalog.",source:"@site/docs/reference/Connectors/materialization-connectors/README.md",sourceDirName:"reference/Connectors/materialization-connectors",slug:"/reference/Connectors/materialization-connectors/",permalink:"/reference/Connectors/materialization-connectors/",draft:!1,editUrl:"https://github.com/estuary/flow/edit/master/site/docs/reference/Connectors/materialization-connectors/README.md",tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"PostgreSQL",permalink:"/reference/Connectors/capture-connectors/PostgreSQL"},next:{title:"Apache Parquet in S3",permalink:"/reference/Connectors/materialization-connectors/Parquet"}},u={},m=[{value:"Available materialization connectors",id:"available-materialization-connectors",level:2}],p={toc:m};function f(e){var t=e.components,r=(0,a.Z)(e,i);return(0,o.kt)("wrapper",(0,n.Z)({},p,r,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"materialization-connectors"},"Materialization connectors"),(0,o.kt)("p",null,"Estuary's available materialization connectors are listed in this section. Each connector has a unique configuration you must follow as you create your Flow catalog."),(0,o.kt)("p",null,"Also listed are links to the most recent Docker image, which you'll need for certain configuration methods."),(0,o.kt)("p",null,"Estuary is actively developing new connectors, so check back regularly for the latest additions. We\u2019re prioritizing the development of high-scale technological systems, as well as client needs."),(0,o.kt)("h2",{id:"available-materialization-connectors"},"Available materialization connectors"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"Apache Parquet in S3",(0,o.kt)("ul",{parentName:"li"},(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"/reference/Connectors/materialization-connectors/Parquet"},"Configuration")),(0,o.kt)("li",{parentName:"ul"},"Package \u2014 ghcr.io/estuary/materialize-s3-parquet:dev"))),(0,o.kt)("li",{parentName:"ul"},"Elasticsearch",(0,o.kt)("ul",{parentName:"li"},(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"/reference/Connectors/materialization-connectors/Elasticsearch"},"Configuration")),(0,o.kt)("li",{parentName:"ul"},"Package \u2014 ghcr.io/estuary/materialize-elasticsearch:dev"))),(0,o.kt)("li",{parentName:"ul"},"Firebolt",(0,o.kt)("ul",{parentName:"li"},(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"/reference/Connectors/materialization-connectors/Firebolt"},"Configuration")),(0,o.kt)("li",{parentName:"ul"},"Package - ghcr.io/estuary/materialize-firebolt:dev"))),(0,o.kt)("li",{parentName:"ul"},"Google BigQuery",(0,o.kt)("ul",{parentName:"li"},(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"/reference/Connectors/materialization-connectors/BigQuery"},"Configuration")),(0,o.kt)("li",{parentName:"ul"},"Package \u2014 ghcr.io/estuary/materialize-bigquery:dev"))),(0,o.kt)("li",{parentName:"ul"},"PostgreSQL",(0,o.kt)("ul",{parentName:"li"},(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"/reference/Connectors/materialization-connectors/PostgreSQL"},"Configuration")),(0,o.kt)("li",{parentName:"ul"},"Package \u2014 ghcr.io/estuary/materialize-postgres:dev"))),(0,o.kt)("li",{parentName:"ul"},"Rockset",(0,o.kt)("ul",{parentName:"li"},(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"/reference/Connectors/materialization-connectors/Rockset"},"Configuration")),(0,o.kt)("li",{parentName:"ul"},"Package \u2014 ghcr.io/estuary/materialize-rockset:dev"))),(0,o.kt)("li",{parentName:"ul"},"Snowflake",(0,o.kt)("ul",{parentName:"li"},(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"/reference/Connectors/materialization-connectors/Snowflake"},"Configuration")),(0,o.kt)("li",{parentName:"ul"},"Package \u2014 ghcr.io/estuary/materialize-snowflake:dev")))))}f.isMDXComponent=!0}}]);