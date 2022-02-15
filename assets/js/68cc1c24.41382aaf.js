"use strict";(self.webpackChunksite=self.webpackChunksite||[]).push([[8027],{3905:function(e,t,n){n.d(t,{Zo:function(){return s},kt:function(){return m}});var a=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},l=Object.keys(e);for(a=0;a<l.length;a++)n=l[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(a=0;a<l.length;a++)n=l[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var u=a.createContext({}),c=function(e){var t=a.useContext(u),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},s=function(e){var t=c(e.components);return a.createElement(u.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},p=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,l=e.originalType,u=e.parentName,s=i(e,["components","mdxType","originalType","parentName"]),p=c(n),m=r,g=p["".concat(u,".").concat(m)]||p[m]||d[m]||l;return n?a.createElement(g,o(o({ref:t},s),{},{components:n})):a.createElement(g,o({ref:t},s))}));function m(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var l=n.length,o=new Array(l);o[0]=p;var i={};for(var u in t)hasOwnProperty.call(t,u)&&(i[u]=t[u]);i.originalType=e,i.mdxType="string"==typeof e?e:r,o[1]=i;for(var c=2;c<l;c++)o[c]=n[c];return a.createElement.apply(null,o)}return a.createElement.apply(null,n)}p.displayName="MDXCreateElement"},9197:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return i},contentTitle:function(){return u},metadata:function(){return c},toc:function(){return s},default:function(){return p}});var a=n(7462),r=n(3366),l=(n(7294),n(3905)),o=["components"],i={},u=void 0,c={unversionedId:"reference/Connectors/materialization-connectors/BigQuery",id:"reference/Connectors/materialization-connectors/BigQuery",title:"BigQuery",description:"This Flow connector materializes Flow collections into tables within a Google BigQuery dataset.",source:"@site/docs/reference/Connectors/materialization-connectors/BigQuery.md",sourceDirName:"reference/Connectors/materialization-connectors",slug:"/reference/Connectors/materialization-connectors/BigQuery",permalink:"/reference/Connectors/materialization-connectors/BigQuery",editUrl:"https://github.com/estuary/flow/edit/master/site/docs/reference/Connectors/materialization-connectors/BigQuery.md",tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"Materialization connectors",permalink:"/reference/Connectors/materialization-connectors/"},next:{title:"Rockset",permalink:"/reference/Connectors/materialization-connectors/Rockset"}},s=[{value:"Prerequisites",id:"prerequisites",children:[],level:2},{value:"Configuration",id:"configuration",children:[{value:"Values",id:"values",children:[],level:3},{value:"Sample",id:"sample",children:[],level:3}],level:2},{value:"Delta updates",id:"delta-updates",children:[],level:2}],d={toc:s};function p(e){var t=e.components,n=(0,r.Z)(e,o);return(0,l.kt)("wrapper",(0,a.Z)({},d,n,{components:t,mdxType:"MDXLayout"}),(0,l.kt)("p",null,"This Flow connector materializes Flow collections into tables within a Google BigQuery dataset.\nIt allows both standard and ",(0,l.kt)("a",{parentName:"p",href:"#delta-updates"},"delta updates"),"."),(0,l.kt)("p",null,"The connector uses your Google Cloud service account to materialize to BigQuery tables by way of files in a Google Cloud Storage (GCS) bucket.\nThe tables in the bucket act as a temporary staging area for data storage and retrieval."),(0,l.kt)("p",null,(0,l.kt)("inlineCode",{parentName:"p"},"ghcr.io/estuary/materialize-bigquery:dev")," provides the latest connector image when using the Flow GitOps environment. You can also follow the link in your browser to see past image versions."),(0,l.kt)("h2",{id:"prerequisites"},"Prerequisites"),(0,l.kt)("p",null,"To use this connector, you'll need:"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},"An existing catalog spec that includes at least one collection"),(0,l.kt)("li",{parentName:"ul"},"A ",(0,l.kt)("a",{parentName:"li",href:"https://cloud.google.com/storage/docs/creating-buckets"},"new Google Cloud Storage bucket")," in the same region as the BigQuery destination dataset."),(0,l.kt)("li",{parentName:"ul"},"A Google Cloud ",(0,l.kt)("a",{parentName:"li",href:"https://cloud.google.com/docs/authentication/getting-started"},"service account")," with a key file generated and the following roles:",(0,l.kt)("ul",{parentName:"li"},(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("a",{parentName:"li",href:"https://cloud.google.com/bigquery/docs/access-control#bigquery.dataEditor"},(0,l.kt)("inlineCode",{parentName:"a"},"roles/bigquery.dataEditor"))," on the destination dataset"),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("a",{parentName:"li",href:"https://cloud.google.com/bigquery/docs/access-control#bigquery.jobUser"},(0,l.kt)("inlineCode",{parentName:"a"},"roles/bigquery.jobUser"))," on the\nproject with which the BigQuery destination dataset is associated"),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("a",{parentName:"li",href:"https://cloud.google.com/storage/docs/access-control/iam-roles#standard-roles"},(0,l.kt)("inlineCode",{parentName:"a"},"roles/storage.objectAdmin")),"\non the GCS bucket created above")))),(0,l.kt)("h2",{id:"configuration"},"Configuration"),(0,l.kt)("p",null,"To use this connector, begin with a Flow catalog that has at least one collection.\nYou'll add a BigQuery materialization, which will direct one or more of your Flow collections to your desired tables within a BigQuery dataset.\nFollow the basic ",(0,l.kt)("a",{parentName:"p",href:"/concepts/materialization#specification"},"materialization setup")," and add the required BigQuery configuration values per the table below."),(0,l.kt)("p",null,"This configuration assumes a working knowledge of resource organization in BigQuery.\nYou can find introductory documentation in the ",(0,l.kt)("a",{parentName:"p",href:"https://cloud.google.com/bigquery/docs/resource-hierarchy"},"BigQuery docs"),"."),(0,l.kt)("h3",{id:"values"},"Values"),(0,l.kt)("table",null,(0,l.kt)("thead",{parentName:"table"},(0,l.kt)("tr",{parentName:"thead"},(0,l.kt)("th",{parentName:"tr",align:null},"Value"),(0,l.kt)("th",{parentName:"tr",align:null},"Name"),(0,l.kt)("th",{parentName:"tr",align:null},"Type"),(0,l.kt)("th",{parentName:"tr",align:null},"Required/Default"),(0,l.kt)("th",{parentName:"tr",align:null},"Details"))),(0,l.kt)("tbody",{parentName:"table"},(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("inlineCode",{parentName:"td"},"project_id")),(0,l.kt)("td",{parentName:"tr",align:null},"Project ID"),(0,l.kt)("td",{parentName:"tr",align:null},"String"),(0,l.kt)("td",{parentName:"tr",align:null},"Required"),(0,l.kt)("td",{parentName:"tr",align:null},"The project ID for the Google Cloud Storage bucket and BigQuery dataset")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("inlineCode",{parentName:"td"},"billing_project_id")),(0,l.kt)("td",{parentName:"tr",align:null},"Billing project ID"),(0,l.kt)("td",{parentName:"tr",align:null},"String"),(0,l.kt)("td",{parentName:"tr",align:null},"Same as ",(0,l.kt)("inlineCode",{parentName:"td"},"project_id")),(0,l.kt)("td",{parentName:"tr",align:null},"The project ID to which these operations are billed in BigQuery*")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("inlineCode",{parentName:"td"},"dataset")),(0,l.kt)("td",{parentName:"tr",align:null},"Dataset"),(0,l.kt)("td",{parentName:"tr",align:null},"String"),(0,l.kt)("td",{parentName:"tr",align:null},"Required"),(0,l.kt)("td",{parentName:"tr",align:null},"Name of the target BigQuery dataset")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("inlineCode",{parentName:"td"},"region")),(0,l.kt)("td",{parentName:"tr",align:null},"Region"),(0,l.kt)("td",{parentName:"tr",align:null},"String"),(0,l.kt)("td",{parentName:"tr",align:null},"Required"),(0,l.kt)("td",{parentName:"tr",align:null},"The GCS region")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("inlineCode",{parentName:"td"},"bucket")),(0,l.kt)("td",{parentName:"tr",align:null},"Bucket"),(0,l.kt)("td",{parentName:"tr",align:null},"string"),(0,l.kt)("td",{parentName:"tr",align:null},"Required"),(0,l.kt)("td",{parentName:"tr",align:null},"Name of the GCS bucket")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("inlineCode",{parentName:"td"},"bucket_path")),(0,l.kt)("td",{parentName:"tr",align:null},"Bucket Path"),(0,l.kt)("td",{parentName:"tr",align:null},"String"),(0,l.kt)("td",{parentName:"tr",align:null},"Required"),(0,l.kt)("td",{parentName:"tr",align:null},"Base path within the GCS bucket")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("inlineCode",{parentName:"td"},"credentials_json")),(0,l.kt)("td",{parentName:"tr",align:null},"Credentials JSON"),(0,l.kt)("td",{parentName:"tr",align:null},"Byte"),(0,l.kt)("td",{parentName:"tr",align:null},"Required"),(0,l.kt)("td",{parentName:"tr",align:null},"Base64-encoded string of the full service account file")))),(0,l.kt)("p",null,"*Typically, you want this to be the same as ",(0,l.kt)("inlineCode",{parentName:"p"},"project_id")," (the default).\nTo learn more about project billing, ",(0,l.kt)("a",{parentName:"p",href:"https://cloud.google.com/billing/docs/how-to/verify-billing-enabled"},"see the BigQuery docs"),"."),(0,l.kt)("h3",{id:"sample"},"Sample"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-yaml"},"# If this is the first materialization, add the section to your catalog spec\nmaterializations:\n  ${tenant}/${mat_name}:\n      endpoint:\n        connector:\n            config:\n              project_ID: our-bigquery-project\n              dataset: materialized-data\n              region: US\n              bucket: our-gcs-bucket\n              bucket_path: bucket-path/\n              credentials_json: SSBqdXN0IHdhbm5hIHRlbGwgeW91IGhvdyBJJ20gZmVlbGluZwpHb3R0YSBtYWtlIHlvdSB1bmRlcnN0YW5kCk5ldmVyIGdvbm5hIGdpdmUgeW91IHVwCk5ldmVyIGdvbm5hIGxldCB5b3UgZG93bgpOZXZlciBnb25uYSBydW4gYXJvdW5kIGFuZCBkZXNlcnQgeW91Ck5ldmVyIGdvbm5hIG1ha2UgeW91IGNyeQpOZXZlciBnb25uYSBzYXkgZ29vZGJ5ZQpOZXZlciBnb25uYSB0ZWxsIGEgbGllIGFuZCBodXJ0IHlvdQ==\n            image: ghcr.io/estuary/materialize-bigquery:dev\n    # If you have multiple collections you need to materialize, add a binding for each one\n    # to ensure complete data flow-through\n    bindings:\n    - resource:\n        table: ${table_name}\n    source: ${tenant}/${source_collection}\n")),(0,l.kt)("h2",{id:"delta-updates"},"Delta updates"),(0,l.kt)("p",null,"This connector supports both standard (merge) and ",(0,l.kt)("a",{parentName:"p",href:"/concepts/materialization#delta-updates"},"delta updates"),".\nThe default is to use standard updates."),(0,l.kt)("p",null,"Enabling delta updates will prevent Flow from querying for documents in your BigQuery table, which can reduce latency and costs for large datasets.\nIf you're certain that all events will have unique keys, enabling delta updates is a simple way to improve\nperformance with no effect on the output.\nHowever, enabling delta updates is not suitable for all workflows, as the resulting table in BigQuery won't be fully reduced."),(0,l.kt)("p",null,"You can enable delta updates on a per-binding basis:"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-yaml"},"    bindings:\n    - resource:\n        table: ${table_name}\n        delta_updates: true\n    source: ${tenant}/${source_collection}\n")))}p.isMDXComponent=!0}}]);