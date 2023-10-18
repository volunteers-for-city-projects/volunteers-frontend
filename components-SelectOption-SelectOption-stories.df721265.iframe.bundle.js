"use strict";(self.webpackChunkvolunteers_for_city_frontend=self.webpackChunkvolunteers_for_city_frontend||[]).push([[803],{"./src/components/SelectOption/SelectOption.stories.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{SelectCity:function(){return SelectCity},SelectSkills:function(){return SelectSkills},__namedExportsOrder:function(){return __namedExportsOrder},default:function(){return SelectOption_stories}});var objectSpread2=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/objectSpread2.js"),slicedToArray=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/slicedToArray.js"),react_select_esm=__webpack_require__("./node_modules/react-select/dist/react-select.esm.js"),react=__webpack_require__("./node_modules/react/index.js"),clsx=__webpack_require__("./node_modules/clsx/dist/clsx.mjs"),jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function SelectOption_SelectOption(_ref){var label=_ref.label,width=_ref.width,placeholder=_ref.placeholder,options=_ref.options,handleChange=_ref.handleChange,errorMessage=_ref.errorMessage,isMulti=_ref.isMulti,_useState=(0,react.useState)(null),_useState2=(0,slicedToArray.Z)(_useState,2),selectedOption=_useState2[0],setSelectedOption=_useState2[1],customStyles={control:function control(baseStyles){return(0,objectSpread2.Z)((0,objectSpread2.Z)({},baseStyles),{},{borderRadius:"10px",border:"2px solid black"})},dropdownIndicator:function dropdownIndicator(baseStyles){return(0,objectSpread2.Z)((0,objectSpread2.Z)({},baseStyles),{},{color:"#000"})}},changeOption=(0,react.useCallback)((function(option){setSelectedOption(option),handleChange(selectedOption)}),[handleChange,selectedOption]);return(0,jsx_runtime.jsxs)("div",{className:"select-option__container",style:{maxWidth:width},children:[(0,jsx_runtime.jsx)("label",{className:"select-option__label",htmlFor:"select-option",children:label}),(0,jsx_runtime.jsx)(react_select_esm.ZP,{className:"select-option",placeholder:placeholder,options:options,onChange:changeOption,components:{IndicatorSeparator:function IndicatorSeparator(){return null}},styles:customStyles,theme:function theme(_theme){return(0,objectSpread2.Z)((0,objectSpread2.Z)({},_theme),{},{borderRadius:10,colors:(0,objectSpread2.Z)((0,objectSpread2.Z)({},_theme.colors),{},{primary25:"#d7d7d7",primary:"#000"})})},isMulti:isMulti}),(0,jsx_runtime.jsx)("span",{className:(0,clsx.Z)("select-option__error-message",{"select-option__error-message_show":(null==errorMessage?void 0:errorMessage.length)>0}),children:errorMessage})]})}SelectOption_SelectOption.defaultProps={label:"Город",width:280,placeholder:"Выберите город",options:[{label:"Москва",value:"moscow"},{label:"Воронеж",value:"voronezh"},{label:"Тула",value:"tula"},{label:"Санкт-Петербург",value:"sankt-petersburg"},{label:"Екатеринбург",value:"yekaterinburg"},{label:"Курск",value:"kursk"},{label:"Белгород",value:"belgorod"},{label:"Казань",value:"kazan"}],handleChange:function handleChange(selectedOption){return console.log("Option selected: ",selectedOption)},errorMessage:void 0,isMulti:!1},SelectOption_SelectOption.__docgenInfo={description:"",methods:[],displayName:"SelectOption",props:{label:{defaultValue:{value:"'Город'",computed:!1},description:"",type:{name:"string"},required:!1},width:{defaultValue:{value:"280",computed:!1},description:"",type:{name:"number"},required:!1},placeholder:{defaultValue:{value:"'Выберите город'",computed:!1},description:"",type:{name:"string"},required:!1},options:{defaultValue:{value:"[\n\t{ label: 'Москва', value: 'moscow' },\n\t{ label: 'Воронеж', value: 'voronezh' },\n\t{ label: 'Тула', value: 'tula' },\n\t{ label: 'Санкт-Петербург', value: 'sankt-petersburg' },\n\t{ label: 'Екатеринбург', value: 'yekaterinburg' },\n\t{ label: 'Курск', value: 'kursk' },\n\t{ label: 'Белгород', value: 'belgorod' },\n\t{ label: 'Казань', value: 'kazan' },\n]",computed:!1},description:"",type:{name:"arrayOf",value:{name:"shape",value:{label:{name:"string",required:!1},value:{name:"string",required:!1}}}},required:!1},handleChange:{defaultValue:{value:"(selectedOption) =>\nconsole.log(`Option selected: `, selectedOption)",computed:!1},description:"",type:{name:"func"},required:!1},errorMessage:{defaultValue:{value:"undefined",computed:!0},description:"",type:{name:"string"},required:!1},isMulti:{defaultValue:{value:"false",computed:!1},description:"",type:{name:"bool"},required:!1}}};var _SelectCity$parameter,_SelectCity$parameter2,_SelectCity$parameter3,_SelectSkills$paramet,_SelectSkills$paramet2,_SelectSkills$paramet3,SelectOption_stories={title:"Components/SelectOption",component:SelectOption_SelectOption,tags:["autodocs"]},SelectCity={args:{label:"Город",width:280,placeholder:"Выберите город",options:[{label:"Москва",value:"moscow"},{label:"Воронеж",value:"voronezh"},{label:"Тула",value:"tula"},{label:"Санкт-Петербург",value:"sankt-petersburg"},{label:"Екатеринбург",value:"yekaterinburg"},{label:"Курск",value:"kursk"},{label:"Белгород",value:"belgorod"},{label:"Казань",value:"kazan"}],handleChange:function handleChange(selectedOption){return console.log("Option selected: ",selectedOption)},errorMessage:void 0,isMulti:!1}},SelectSkills={args:{label:"Навыки",width:280,placeholder:"Выберите навыки",options:[{label:"Работа с ПК",value:"skill-001"},{label:"Вождения",value:"skill-002"},{label:"Коммуникативные навыки",value:"skill-003"},{label:"Организационные навыки",value:"skill-004"},{label:"Работа в сфере экологии",value:"skill-005"},{label:"работы с чертежами и схемами",value:"skill-006"},{label:"Знание законодательства в области градостроительства и архитектуры",value:"skill-007"},{label:"Коммуникативные навыки",value:"skill-008"}],handleChange:function handleChange(selectedOption){return console.log("Option selected: ",selectedOption)},errorMessage:void 0,isMulti:!0}};SelectCity.parameters=(0,objectSpread2.Z)((0,objectSpread2.Z)({},SelectCity.parameters),{},{docs:(0,objectSpread2.Z)((0,objectSpread2.Z)({},null===(_SelectCity$parameter=SelectCity.parameters)||void 0===_SelectCity$parameter?void 0:_SelectCity$parameter.docs),{},{source:(0,objectSpread2.Z)({originalSource:"{\n  args: {\n    label: 'Город',\n    width: 280,\n    placeholder: 'Выберите город',\n    options: [{\n      label: 'Москва',\n      value: 'moscow'\n    }, {\n      label: 'Воронеж',\n      value: 'voronezh'\n    }, {\n      label: 'Тула',\n      value: 'tula'\n    }, {\n      label: 'Санкт-Петербург',\n      value: 'sankt-petersburg'\n    }, {\n      label: 'Екатеринбург',\n      value: 'yekaterinburg'\n    }, {\n      label: 'Курск',\n      value: 'kursk'\n    }, {\n      label: 'Белгород',\n      value: 'belgorod'\n    }, {\n      label: 'Казань',\n      value: 'kazan'\n    }],\n    handleChange: selectedOption => console.log(`Option selected: `, selectedOption),\n    errorMessage: undefined,\n    isMulti: false\n  }\n}"},null===(_SelectCity$parameter2=SelectCity.parameters)||void 0===_SelectCity$parameter2||null===(_SelectCity$parameter3=_SelectCity$parameter2.docs)||void 0===_SelectCity$parameter3?void 0:_SelectCity$parameter3.source)})}),SelectSkills.parameters=(0,objectSpread2.Z)((0,objectSpread2.Z)({},SelectSkills.parameters),{},{docs:(0,objectSpread2.Z)((0,objectSpread2.Z)({},null===(_SelectSkills$paramet=SelectSkills.parameters)||void 0===_SelectSkills$paramet?void 0:_SelectSkills$paramet.docs),{},{source:(0,objectSpread2.Z)({originalSource:"{\n  args: {\n    label: 'Навыки',\n    width: 280,\n    placeholder: 'Выберите навыки',\n    options: [{\n      label: 'Работа с ПК',\n      value: 'skill-001'\n    }, {\n      label: 'Вождения',\n      value: 'skill-002'\n    }, {\n      label: 'Коммуникативные навыки',\n      value: 'skill-003'\n    }, {\n      label: 'Организационные навыки',\n      value: 'skill-004'\n    }, {\n      label: 'Работа в сфере экологии',\n      value: 'skill-005'\n    }, {\n      label: 'работы с чертежами и схемами',\n      value: 'skill-006'\n    }, {\n      label: 'Знание законодательства в области градостроительства и архитектуры',\n      value: 'skill-007'\n    }, {\n      label: 'Коммуникативные навыки',\n      value: 'skill-008'\n    }],\n    handleChange: selectedOption => console.log(`Option selected: `, selectedOption),\n    errorMessage: undefined,\n    isMulti: true\n  }\n}"},null===(_SelectSkills$paramet2=SelectSkills.parameters)||void 0===_SelectSkills$paramet2||null===(_SelectSkills$paramet3=_SelectSkills$paramet2.docs)||void 0===_SelectSkills$paramet3?void 0:_SelectSkills$paramet3.source)})});var __namedExportsOrder=["SelectCity","SelectSkills"]}}]);