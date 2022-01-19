(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("vue"));
	else if(typeof define === 'function' && define.amd)
		define(["vue"], factory);
	else if(typeof exports === 'object')
		exports["KendoEditorVueWrapper"] = factory(require("vue"));
	else
		root["KendoEditorVueWrapper"] = factory(root["Vue"]);
})(typeof self !== 'undefined' ? self : this, function(__WEBPACK_EXTERNAL_MODULE_0__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Tools = __webpack_require__(11);

var _Tools2 = _interopRequireDefault(_Tools);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var KendoEditorTool = {
    name: 'kendo-editor-tool',
    render: function render() {
        return null;
    },

    mixins: [_Tools2.default]
};

exports.default = KendoEditorTool;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _vue = __webpack_require__(0);

var Vue = _interopRequireWildcard(_vue);

var _KendoEditorMixin = __webpack_require__(4);

var _KendoEditorMixin2 = _interopRequireDefault(_KendoEditorMixin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var allVue = Vue;
var gh = allVue.h;
exports.default = {
    name: 'kendo-editor',
    mixins: [_KendoEditorMixin2.default],
    setup: function setup() {
        var v3 = !!gh;
        return {
            v3: v3
        };
    },
    render: function render(createElement) {
        var h = gh || createElement;
        var tagName = this.tag || 'textarea';
        var defaultSlot = this.v3 && this.$slots.default && typeof this.$slots.default === 'function' ? this.$slots.default() : this.$slots.default;
        return h(tagName, defaultSlot);
    }
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.EditorInstaller = exports.KendoEditorInstaller = exports.EditorTool = exports.KendoEditorTool = exports.Editor = exports.KendoEditor = undefined;

var _KendoEditor = __webpack_require__(2);

var _KendoEditor2 = _interopRequireDefault(_KendoEditor);

var _KendoEditorTool = __webpack_require__(1);

var _KendoEditorTool2 = _interopRequireDefault(_KendoEditorTool);

var _kendoEditorInstaller = __webpack_require__(21);

var _kendoEditorInstaller2 = _interopRequireDefault(_kendoEditorInstaller);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.KendoEditor = _KendoEditor2.default;
exports.Editor = _KendoEditor2.default;
exports.KendoEditorTool = _KendoEditorTool2.default;
exports.EditorTool = _KendoEditorTool2.default;
exports.KendoEditorInstaller = _kendoEditorInstaller2.default;
exports.EditorInstaller = _kendoEditorInstaller2.default;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _kendoBaseComponentsVueWrapper = __webpack_require__(5);

var _EditorProps = __webpack_require__(10);

var _EditorProps2 = _interopRequireDefault(_EditorProps);

var _KendoEditorTool = __webpack_require__(1);

var _KendoEditorTool2 = _interopRequireDefault(_KendoEditorTool);

var _Deserialization = __webpack_require__(12);

var _Deserialization2 = _interopRequireDefault(_Deserialization);

var _FileBrowser = __webpack_require__(13);

var _FileBrowser2 = _interopRequireDefault(_FileBrowser);

var _ImageBrowser = __webpack_require__(14);

var _ImageBrowser2 = _interopRequireDefault(_ImageBrowser);

var _Immutables = __webpack_require__(15);

var _Immutables2 = _interopRequireDefault(_Immutables);

var _Messages = __webpack_require__(16);

var _Messages2 = _interopRequireDefault(_Messages);

var _PasteCleanup = __webpack_require__(17);

var _PasteCleanup2 = _interopRequireDefault(_PasteCleanup);

var _Pdf = __webpack_require__(18);

var _Pdf2 = _interopRequireDefault(_Pdf);

var _Resizable = __webpack_require__(19);

var _Resizable2 = _interopRequireDefault(_Resizable);

var _Serialization = __webpack_require__(20);

var _Serialization2 = _interopRequireDefault(_Serialization);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    emits: {
        'update:modelValue': null,
        'kendowidgetready': null
    },
    props: _EditorProps2.default,
    mixins: [_kendoBaseComponentsVueWrapper.KendoBaseComponent, _Deserialization2.default, _FileBrowser2.default, _ImageBrowser2.default, _Immutables2.default, _Messages2.default, _PasteCleanup2.default, _Pdf2.default, _Resizable2.default, _Serialization2.default],
    mounted: function mounted() {
        var that = this;

        that._resolveChildren();

        kendo.jQuery(that.$el).kendoEditor(that.widgetOptions);

        if (this.v3) {
            this.ready();
            this.$emit('kendowidgetready', this.kendoWidget());
        } else {
            this.$emit('kendowidgetready', this.kendoWidget());
        }

        that.kendoWidget().bind('change', function () {
            if (that.v3) {
                that.$emit('update:modelValue', that.kendoWidget().value());
            } else {
                that.$emit('changemodel', that.kendoWidget().value());
            }
        });
    },

    methods: {
        kendoWidget: function kendoWidget() {
            return kendo.jQuery(this.$el).getKendoEditor();
        },
        _resolveChildren: function _resolveChildren() {
            this.resolveChildren('tools', _KendoEditorTool2.default.name);
        }
    },
    model: {
        event: 'changemodel'
    }
};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KendoSharedMethods = exports.KendoBaseInputComponent = exports.KendoBaseDatasourceComponent = exports.KendoBaseComponent = undefined;

var _kendoBaseComponent = __webpack_require__(6);

var _kendoBaseComponent2 = _interopRequireDefault(_kendoBaseComponent);

var _kendoBaseDatasourceComponent = __webpack_require__(7);

var _kendoBaseDatasourceComponent2 = _interopRequireDefault(_kendoBaseDatasourceComponent);

var _kendoBaseInputComponent = __webpack_require__(8);

var _kendoBaseInputComponent2 = _interopRequireDefault(_kendoBaseInputComponent);

var _kendoSharedMethods = __webpack_require__(9);

var _kendoSharedMethods2 = _interopRequireDefault(_kendoSharedMethods);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.KendoBaseComponent = _kendoBaseComponent2.default;
exports.KendoBaseDatasourceComponent = _kendoBaseDatasourceComponent2.default;
exports.KendoBaseInputComponent = _kendoBaseInputComponent2.default;
exports.KendoSharedMethods = _kendoSharedMethods2.default;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _vue = __webpack_require__(0);

var aVue = _interopRequireWildcard(_vue);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var allVue = aVue;
var gh = allVue.h;
var createApp = allVue.createApp;
exports.default = {
    name: 'baseComponent',
    props: {
        disabled: {
            type: Boolean,
            default: undefined
        },
        readonly: {
            type: Boolean,
            default: undefined
        }
    },
    render: function render(createElement) {
        var h = gh || createElement;
        return h('div');
    },
    created: function created() {
        this.createdMethod();
    },

    beforeDestroy: gh ? undefined : function () {
        this.destroyKendoWidget();
    },
    beforeUnmount: function beforeUnmount() {
        this.destroyKendoWidget();
    },
    setup: function setup() {
        var v3 = !!gh;
        return {
            v3: v3
        };
    },

    beforeMount: function beforeMount() {
        if (this.v3) {
            this.createdMethod();
            var defaultSlot = this.v3 && this.$slots.default && typeof this.$slots.default === 'function' ? this.$slots.default() : this.$slots.default;
            var hasDataSource = !this.$props.dataSource;
            if (hasDataSource && defaultSlot) {
                var innerDatasource = defaultSlot.find(function (slot) {
                    return slot.type && slot.type.name && slot.type.name.indexOf('datasource') !== -1;
                });
                if (innerDatasource) {
                    var dataSourceOptions = this.parseOptions(innerDatasource, innerDatasource.type.mixins[0].mixins);
                    this.widgetOptions.dataSource = dataSourceOptions;
                }
            }
        }
    },
    updated: function updated() {
        if (this.modelValue) {
            this.changeValue(this.modelValue);
        }
    },
    mounted: function mounted() {
        if (this.$el.classList && this.$el.classList.length > 0) {
            this.nativeClasses = [].concat(_toConsumableArray(this.$el.classList));
        } else {
            this.nativeClasses = [];
        }
        var props = this.v3 ? this.$props : this.$options.propsData;
        for (var key in props) {
            var that = this;

            if (key.toLowerCase().indexOf('template') !== -1) {
                var isFunction = this.widgetOptions[key] instanceof Function;

                if (isFunction) {
                    this.widgetOptions[key] = this.transformTemplate(key);
                }
            }

            if (key === 'value') {
                that.$watch(key, function (newValue) {
                    that.changeValue(newValue);
                });
            } else if (key === 'disabled') {
                that.$watch(key, function (newValue) {
                    that.makeDisabled(newValue);
                });
            } else if (key === 'readonly') {
                that.$watch(key, function (newValue) {
                    that.makeReadonly(newValue);
                });
            } else {
                that.$watch(key, function (newValue, oldValue) {
                    // Vue always dispatches a change when inline complex objects are bound
                    // https://github.com/telerik/kendo-ui-core/issues/3952
                    if (JSON.stringify(oldValue) !== JSON.stringify(newValue)) {
                        that.updateWidget();
                    }
                });
            }
        }
    },

    watch: {
        $attrs: function $attrs() {
            this.toggleClasses();
        }
    },
    methods: {
        createdMethod: function createdMethod() {
            this.resolveWidgetOptions();
            this.$_nativeTemplates = [];
            if (!this.v3) {
                this.$on('kendowidgetready', this.ready);
            }
        },
        destroyKendoWidget: function destroyKendoWidget() {
            if (this.kendoWidget() && this.kendoWidget().destroy) {
                this.kendoWidget().destroy();
                if (this.$_nativeTemplates.length) {
                    for (var i = 0; i < this.$_nativeTemplates.length; i++) {
                        var currentTemplate = this.$_nativeTemplates[i];
                        if (currentTemplate.unmount) {
                            currentTemplate.unmount();
                        } else {
                            currentTemplate.$destroy();
                        }
                    }
                }
            }
        },
        toggleClasses: function toggleClasses() {
            var that = this;
            var $element = kendo.jQuery(that.$el);
            var $wrapper = that.kendoWidget().wrapper;

            if ($wrapper && $wrapper[0] !== $element[0]) {
                that.nativeClasses.forEach(function (item) {
                    $wrapper.removeClass(item);
                });

                // Add to wrapper only the custom classes without the default Kendo ones
                if (that.kendoClasses) {
                    that.nativeClasses = [].concat(_toConsumableArray(that.$el.classList)).filter(function (item) {
                        return that.kendoClasses.indexOf(item) < 0;
                    });
                } else {
                    that.nativeClasses = [].concat(_toConsumableArray(that.$el.classList));
                }

                that.nativeClasses.forEach(function (item) {
                    $wrapper.addClass(item);
                });
            }

            if (that.kendoClasses) {
                that.kendoClasses.forEach(function (item) {
                    $element.addClass(item);
                });
            }
        },
        updateWidget: function updateWidget() {
            var that = this;

            that.resolveWidgetOptions();

            if (that._resolveChildren) {
                that._resolveChildren();
            }

            var currentWidget = that.kendoWidget();

            if (currentWidget && currentWidget.setOptions) {
                currentWidget.setOptions(that.widgetOptions);
            }
        },

        transformTemplate: function transformTemplate(key, val) {
            var that = this;
            var object;
            var props = that.v3 ? that.$props : that.$options.propsData;
            var templateDefinition = val || props[key];
            try {
                object = templateDefinition.call(that, {});
            } catch (e) {
                return templateDefinition;
            }

            if (!object.template) {
                return templateDefinition;
            }

            return function () {
                object = templateDefinition.apply(this, arguments);
                var kendoguid;
                if (that.v3) {
                    var newTemplateArgs = typeof object.templateArgs === 'string' ? object.templateArgs : Object.assign({}, object.templateArgs);
                    var tempComponent = (0, createApp)(Object.assign({}, object.template, {
                        data: function data() {
                            return Object.assign({}, object.template.data ? object.template.data() : {}, {
                                templateArgs: newTemplateArgs
                            });
                        }
                    }));
                    kendoguid = 'kendo' + kendo.guid();

                    that.$nextTick(function () {
                        if (document.getElementById(kendoguid)) {
                            tempComponent.mount('#' + kendoguid);
                            that.$_nativeTemplates.push(tempComponent);
                        }
                    });
                } else {
                    var newVue = allVue.default.extend(object);
                    var vueObject = new newVue(object.template);
                    vueObject.$data.templateArgs = object.templateArgs;
                    kendoguid = 'kendo' + kendo.guid();
                    that.$nextTick(function () {
                        if (document.getElementById(kendoguid)) {
                            vueObject.$mount('#' + kendoguid);
                            that.$_nativeTemplates.push(vueObject);
                        }
                    });
                }

                return '<div id="' + kendoguid + '"></div>';
            };
        },
        resolveChildren: function resolveChildren(prop, name) {
            var defaultSlot = this.v3 && this.$slots.default && typeof this.$slots.default === 'function' ? this.$slots.default() : this.$slots.default;
            if (!this.widgetOptions[prop] && defaultSlot) {
                var items = [];
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = defaultSlot[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var childSlot = _step.value;

                        if (childSlot.tag && childSlot.tag.indexOf(name) !== -1 || childSlot.type && childSlot.type.name && childSlot.type.name.toLowerCase().indexOf(name) !== -1) {
                            var childInstance = this.v3 ? childSlot : childSlot.componentInstance;
                            var itemOptions = this.parseOptions(childInstance);

                            if (itemOptions.dataSourceRef) {
                                this.setInnerDataSource('dataSourceRef', 'dataSource', itemOptions);
                            }

                            items.push(itemOptions);
                            this.handleWatcher(childInstance);
                        }
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                        }
                    } finally {
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }

                if (items.length) {
                    this.widgetOptions[prop] = items;
                }
            }
        },
        handleWatcher: function handleWatcher(childInstance) {
            var that = this;
            childInstance.stashedPropsData = JSON.stringify(that.v3 ? childInstance.$props : childInstance.$options.propsData);

            if (!that.v3 && !childInstance._isWatchAttached) {
                childInstance.$watch('$props', function () {
                    var props = that.v3 ? childInstance.$props : childInstance.$options.propsData;
                    var propsAsJson = JSON.stringify(props);
                    var needsUpdate = childInstance.stashedPropsData !== propsAsJson;

                    if (that.updateWidget && needsUpdate) {
                        that.updateWidget();
                    } else if (that._resolveInnerChildren) {
                        that._resolveInnerChildren();
                    }

                    childInstance.stashedPropsData = propsAsJson;
                }, { deep: true });

                childInstance._isWatchAttached = true;
            }
        },
        makeDisabled: function makeDisabled(toDisable) {
            if (this.kendoWidget().enable) {
                this.kendoWidget().enable(!toDisable);
            }
        },
        makeReadonly: function makeReadonly(value) {
            if (this.kendoWidget().readonly) {
                this.kendoWidget().readonly(value);
            }
        },
        changeValue: function changeValue(newValue) {
            if (this.kendoWidget().value) {
                this.kendoWidget().value(newValue);
            }
        },
        resolveWidgetOptions: function resolveWidgetOptions() {
            this.widgetOptions = this.parseOptions();
        },
        getListeners: function getListeners() {
            if (this.v3) {
                var listeners = {};
                for (var key in this.$attrs) {
                    if (key.startsWith('on')) {
                        listeners[key] = this.$attrs[key];
                    }
                }

                return listeners;
            } else {
                return this.$listeners;
            }
        },
        parseOptions: function parseOptions(component, defaultMixins) {
            var _this = this;

            var that = component || this;
            var options = {};
            var props = this.v3 ? component ? that.props : that.$props : that.$options.propsData;

            var _loop = function _loop(_key) {
                propOptions = _this.v3 ? component ? undefined : that.$options.__props[0][_key] || that.$options.__props[0][0][_key] : that.$options.props[_key];
                val = props[_key];

                if (_this.v3 && _key.indexOf('-') !== -1) {
                    _key = _this.camelize(_key);
                }

                compositeProps = propOptions ? propOptions.kComposite : undefined;


                if (that.v3 || _this.v3) {
                    var mixins = component ? defaultMixins || component.type.mixins : that.$options.mixins;
                    if (mixins) {
                        mixins.forEach(function (mixin) {
                            if (mixin.props && mixin.name !== 'baseComponent' && mixin.name !== 'baseDataSourceComponent' && mixin.props[_key] !== undefined && (that.$props ? that.$props[_key] !== undefined : true)) {
                                compositeProps = mixin.props[_key].kComposite;
                            }
                        });
                    }
                }

                if (!compositeProps) {
                    if (_key.toLowerCase().indexOf('template') !== -1 && val instanceof Function) {
                        options[_key] = _this.transformTemplate(_key, val);
                    } else {
                        if (val !== undefined) {
                            options[_key] = val;
                        }
                    }
                } else {
                    if (val !== undefined) {
                        _this.addCompositeProperty(options, compositeProps.split('.'), val);
                    }
                }
                key = _key;
            };

            for (var key in props) {
                var propOptions;
                var val;
                var compositeProps;

                _loop(key);
            }

            if (that.getListeners) {
                if (this.v3) {
                    Object.keys(that.$attrs).forEach(function (event) {
                        var listeners = that.getListeners();
                        var eventName = _this.v3 ? event : event.toLowerCase();
                        if (listeners && listeners[eventName]) {
                            var kendoIndex = event.lastIndexOf('kendo');
                            var kendoEvent;
                            if (kendoIndex !== -1) {
                                kendoEvent = event.replace('kendo', '').toLowerCase();
                            }

                            if (_this.v3 && event.indexOf('onKendo') !== -1) {
                                kendoEvent = event.replace('onKendo', '').toLowerCase();
                            }
                            var kendoEventProp = Object.keys(that.$props).find(function (e) {
                                return e.toLowerCase() === _this.removeOn(event);
                            });
                            options[kendoEvent || kendoEventProp || _this.removeOn(event)] = listeners[eventName];
                        }
                    });
                } else {
                    Object.keys(that.$props).forEach(function (event) {
                        var listeners = that.getListeners();
                        if (listeners && listeners[event.toLowerCase()]) {
                            var kendoIndex = event.lastIndexOf('kendo');
                            var kendoEvent;
                            if (kendoIndex !== -1) {
                                kendoEvent = event.replace('kendo', '').toLowerCase();
                            }

                            options[kendoEvent || event] = listeners[event.toLowerCase()];
                        }
                    });
                }
            }

            if (this.v3 && this.$props.modelValue) {
                options.value = this.$props.modelValue;
            }

            return options;
        },
        addCompositeProperty: function addCompositeProperty(obj, keys, val) {
            var lastKey = keys.pop();
            var lastObj = keys.reduce(function (obj, key) {
                obj[key] = _typeof(obj[key]) === 'object' ? obj[key] || {} : {};
                return obj[key];
            }, obj);

            if (lastKey.toLowerCase().indexOf('template') !== -1 && val instanceof Function) {
                lastObj[lastKey] = this.transformTemplate(lastKey, val);
            } else {
                lastObj[lastKey] = val;
            }
        },
        resolveInnerTags: function resolveInnerTags(tagName) {
            var items = [];
            var defaultSlot = this.v3 && this.$slots.default && typeof this.$slots.default === 'function' ? this.$slots.default() : this.$slots.default;
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = defaultSlot[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var childSlot = _step2.value;

                    if (childSlot.tag && childSlot.tag.indexOf(tagName) !== -1 || childSlot.type && childSlot.type.name && childSlot.type.name.toLowerCase().indexOf(tagName) !== -1) {
                        var childOptions = childSlot.componentOptions;
                        var childInstance = this.v3 ? childSlot : childSlot.componentInstance;
                        var item = this.v3 ? childInstance.$props || childInstance.props : childOptions.propsData;

                        if (this.v3) {
                            var itemKeys = Object.keys(item);
                            var _iteratorNormalCompletion3 = true;
                            var _didIteratorError3 = false;
                            var _iteratorError3 = undefined;

                            try {
                                for (var _iterator3 = itemKeys[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                                    var propKey = _step3.value;

                                    if (propKey.indexOf('-') !== -1) {
                                        item[this.camelize(propKey)] = item[propKey];
                                    }
                                }
                            } catch (err) {
                                _didIteratorError3 = true;
                                _iteratorError3 = err;
                            } finally {
                                try {
                                    if (!_iteratorNormalCompletion3 && _iterator3.return) {
                                        _iterator3.return();
                                    }
                                } finally {
                                    if (_didIteratorError3) {
                                        throw _iteratorError3;
                                    }
                                }
                            }
                        }

                        if (!item.items) {
                            item.items = childInstance.subitems;
                        }

                        items.push(item);
                        this.handleWatcher(childInstance);
                    }
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                        _iterator2.return();
                    }
                } finally {
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }

            return items;
        },
        ready: function ready() {
            var that = this;

            if (this.$el.classList.length > 0) {
                that.kendoClasses = [].concat(_toConsumableArray(that.$el.classList)).filter(function (item) {
                    return that.nativeClasses.indexOf(item) < 0;
                });
            }
            var props = that.v3 ? that.$props : that.$options.propsData;
            if (props && props.disabled) {
                that.makeDisabled(true);
            }

            if (props && props.readonly) {
                that.makeReadonly(true);
            }
        },
        camelize: function camelize(str) {
            var arr = str.split('-');
            var capital = arr.map(function (item, index) {
                return index ? item.charAt(0).toUpperCase() + item.slice(1).toLowerCase() : item;
            });
            var capitalString = capital.join('');

            return capitalString;
        },
        removeOn: function removeOn(str) {

            if (str.indexOf('onKendo') !== -1) {
                return str.replace('onKendo', '').toLowerCase();
            }

            return str.replace('on', '').toLowerCase();
        }
    }
};

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    name: 'baseDataSourceComponent',
    props: {
        dataSourceRef: {
            type: String,
            default: undefined
        }
    },
    render: function render(h) {
        return h('div');
    },

    methods: {
        findDataSource: function findDataSource() {
            var dataSource;
            if (this.$children) {
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = this.$children[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var a = _step.value;

                        if (this.$children.length && a.kendoDataSource) {
                            dataSource = a.kendoDataSource;
                            break;
                        }
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                        }
                    } finally {
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
            }
            return dataSource;
        },
        setInnerDataSource: function setInnerDataSource() {
            var dataSourceRefProp = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'dataSourceRef';
            var rootProp = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'dataSource';
            var subProp = arguments[2];

            var innerDataSource = this.findDataSource();

            if (innerDataSource) {
                if (!subProp) {
                    this.widgetOptions[rootProp] = innerDataSource;
                } else {
                    subProp[rootProp] = innerDataSource;
                }
            } else {
                var refString = subProp ? subProp[dataSourceRefProp] : this[dataSourceRefProp];
                var referredDataSource = this.getParentsRef(refString);

                if (referredDataSource) {
                    this.attachEvents(referredDataSource);
                    if (!subProp) {
                        this.widgetOptions[rootProp] = referredDataSource.kendoDataSource;
                    } else {
                        subProp[rootProp] = referredDataSource.kendoDataSource;
                    }
                }
            }
        },
        getParentsRef: function getParentsRef(anchor) {
            var parent = this.$parent;

            while (parent && !parent.$refs[anchor]) {
                parent = parent.$parent;
            }

            return parent ? parent.$refs[anchor] : undefined;
        },
        setDataSource: function setDataSource(newValue) {
            var newDataSourceRef = this.getParentsRef(newValue);
            var kendoWidget = this.kendoWidget();

            if (kendoWidget.setDataSource && newDataSourceRef) {
                kendoWidget.setDataSource(newDataSourceRef.kendoDataSource);
            } else if (kendoWidget.setDataSource) {
                kendoWidget.setDataSource(newValue);
            }
        },
        attachEvents: function attachEvents(referredDataSource) {
            if (referredDataSource.kendoDataSource) {
                referredDataSource.kendoDataSource.bind('change', function (ev) {
                    if (referredDataSource.getListeners()['change']) {
                        referredDataSource.$emit('change', ev);
                    }
                });

                referredDataSource.kendoDataSource.bind('error', function (ev) {
                    if (referredDataSource.getListeners()['error']) {
                        referredDataSource.$emit('error', ev);
                    }
                });

                referredDataSource.kendoDataSource.bind('push', function (ev) {
                    if (referredDataSource.getListeners()['push']) {
                        referredDataSource.$emit('push', ev);
                    }
                });

                referredDataSource.kendoDataSource.bind('requestEnd', function (ev) {
                    if (referredDataSource.getListeners()['requestend']) {
                        referredDataSource.$emit('requestend', ev);
                    }
                });

                referredDataSource.kendoDataSource.bind('requestStart', function (ev) {
                    if (referredDataSource.getListeners()['requeststart']) {
                        referredDataSource.$emit('requeststart', ev);
                    }
                });

                referredDataSource.kendoDataSource.bind('sync', function (ev) {
                    if (referredDataSource.getListeners()['sync']) {
                        referredDataSource.$emit('sync', ev);
                    }
                });
            }
        }
    },
    mounted: function mounted() {
        var that = this;

        that.$watch('dataSourceRef', function (newValue) {
            that.setDataSource(newValue);
        });
        that.$watch('dataSource', function (newValue) {
            that.setDataSource(newValue);
        });

        that.setInnerDataSource();
    }
};

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _vue = __webpack_require__(0);

var Vue = _interopRequireWildcard(_vue);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var allVue = Vue; // @ts-ignore

var gh = allVue.h;
exports.default = {
    render: function render(createElement) {
        var h = gh || createElement;
        return h('input', {
            ref: 'valueInput',
            props: {
                value: this.value
            }
        });
    },

    model: {
        event: 'changemodel'
    }
};

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    methods: {
        resolveInnerTags: function resolveInnerTags(tagName) {
            var items = [];
            var defaultSlot = this.v3 && this.$slots.default && typeof this.$slots.default === 'function' ? this.$slots.default() : this.$slots.default;
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = defaultSlot[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var childSlot = _step.value;

                    if (childSlot.tag && childSlot.tag.indexOf(tagName) !== -1 || childSlot.type && childSlot.type.name && childSlot.type.name.toLowerCase().indexOf(tagName) !== -1) {
                        var childOptions = childSlot.componentOptions;
                        var childInstance = this.v3 ? childSlot : childSlot.componentInstance;
                        var item = this.v3 ? childInstance.$props || childInstance.props : childOptions.propsData;

                        if (this.v3) {
                            var itemKeys = Object.keys(item);
                            var _iteratorNormalCompletion2 = true;
                            var _didIteratorError2 = false;
                            var _iteratorError2 = undefined;

                            try {
                                for (var _iterator2 = itemKeys[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                                    var propKey = _step2.value;

                                    if (propKey.indexOf('-') !== -1) {
                                        item[this.camelize(propKey)] = item[propKey];
                                    }
                                }
                            } catch (err) {
                                _didIteratorError2 = true;
                                _iteratorError2 = err;
                            } finally {
                                try {
                                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                                        _iterator2.return();
                                    }
                                } finally {
                                    if (_didIteratorError2) {
                                        throw _iteratorError2;
                                    }
                                }
                            }
                        }

                        if (!item.items) {
                            item.items = childInstance.subitems;
                        }

                        items.push(item);
                        this.handleWatcher(childInstance);
                    }
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            return items;
        },
        handleWatcher: function handleWatcher(childInstance) {
            var that = this;

            if (!childInstance._isWatchAttached && childInstance.$watch) {
                childInstance.$watch('$props', function () {
                    if (that.updateWidget) {
                        that.updateWidget();
                    } else if (that._resolveInnerChildren) {
                        that._resolveInnerChildren();
                    }
                }, { deep: true });

                childInstance._isWatchAttached = true;
            }
        },
        camelize: function camelize(str) {
            var arr = str.split('-');
            var capital = arr.map(function (item, index) {
                return index ? item.charAt(0).toUpperCase() + item.slice(1).toLowerCase() : item;
            });
            var capitalString = capital.join('');

            return capitalString;
        }
    }
};

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    modelValue: {
        type: String,
        default: undefined
    },
    deserialization: {
        type: Object,
        default: undefined
    },
    domain: {
        type: String,
        default: undefined
    },
    encoded: {
        type: Boolean,
        default: undefined
    },
    immutables: {
        type: [Boolean, Object],
        default: undefined
    },
    messages: {
        type: Object,
        default: undefined
    },
    pasteCleanup: {
        type: Object,
        default: undefined
    },
    pdf: {
        type: Object,
        default: undefined
    },
    resizable: {
        type: [Boolean, Object],
        default: undefined
    },
    serialization: {
        type: Object,
        default: undefined
    },
    stylesheets: {
        type: Array,
        default: undefined
    },
    tools: {
        type: Array,
        default: undefined
    },
    imageBrowser: {
        type: Object,
        default: undefined
    },
    fileBrowser: {
        type: Object,
        default: undefined
    },
    tag: {
        type: String,
        default: undefined
    },
    value: {
        type: String,
        default: undefined
    },
    placeholder: {
        type: String,
        default: undefined
    },

    // Events
    change: Function,
    execute: Function,
    keydown: Function,
    keyup: Function,
    paste: Function,
    pdfExport: Function,
    select: Function
};

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    props: {
        name: {
            type: String,
            default: undefined,
            kComposite: 'name'
        },
        tooltip: {
            type: String,
            default: undefined,
            kComposite: 'tooltip'
        },
        exec: {
            type: Function,
            default: undefined,
            kComposite: 'exec'
        },
        items: {
            type: Array,
            default: undefined,
            kComposite: 'items'
        },
        palette: {
            type: [String, Array],
            default: undefined,
            kComposite: 'palette'
        },
        columns: {
            type: Number,
            default: undefined,
            kComposite: 'columns'
        },
        template: {
            type: [String, Function],
            default: undefined,
            kComposite: 'template'
        }
    }
};

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    props: {
        deserializationCustom: {
            type: Function,
            default: undefined,
            kComposite: 'deserialization.custom'
        }
    }
};

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    props: {
        fileBrowserFileTypes: {
            type: String,
            default: undefined,
            kComposite: 'fileBrowser.fileTypes'
        },
        fileBrowserPath: {
            type: String,
            default: undefined,
            kComposite: 'fileBrowser.path'
        },
        fileBrowserTransportRead: {
            type: [String, Function],
            default: undefined,
            kComposite: 'fileBrowser.transport.read'
        },
        fileBrowserTransportReadContentType: {
            type: String,
            default: undefined,
            kComposite: 'fileBrowser.transport.read.contentType'
        },
        fileBrowserTransportReadData: {
            type: [Object, String, Function],
            default: undefined,
            kComposite: 'fileBrowser.transport.read.data'
        },
        fileBrowserTransportReadDataType: {
            type: String,
            default: undefined,
            kComposite: 'fileBrowser.transport.read.dataType'
        },
        fileBrowserTransportReadType: {
            type: String,
            default: undefined,
            kComposite: 'fileBrowser.transport.read.type'
        },
        fileBrowserTransportReadUrl: {
            type: [String, Function],
            default: undefined,
            kComposite: 'fileBrowser.transport.read.url'
        },
        fileBrowserTransportUploadUrl: {
            type: String,
            default: undefined,
            kComposite: 'fileBrowser.transport.uploadUrl'
        },
        fileBrowserTransportFileUrl: {
            type: [String, Function],
            default: undefined,
            kComposite: 'fileBrowser.transport.fileUrl'
        },
        fileBrowserTransportDestroy: {
            type: String,
            default: undefined,
            kComposite: 'fileBrowser.transport.destroy'
        },
        fileBrowserTransportDestroyContentType: {
            type: String,
            default: undefined,
            kComposite: 'fileBrowser.transport.destroy.contentType'
        },
        fileBrowserTransportDestroyData: {
            type: [Object, String, Function],
            default: undefined,
            kComposite: 'fileBrowser.transport.destroy.data'
        },
        fileBrowserTransportDestroyDataType: {
            type: String,
            default: undefined,
            kComposite: 'fileBrowser.transport.destroy.dataType'
        },
        fileBrowserTransportDestroyType: {
            type: String,
            default: undefined,
            kComposite: 'fileBrowser.transport.destroy.type'
        },
        fileBrowserTransportDestroyUrl: {
            type: [String, Function],
            default: undefined,
            kComposite: 'fileBrowser.transport.destroy.url'
        },
        fileBrowserTransportCreate: {
            type: String,
            default: undefined,
            kComposite: 'fileBrowser.transport.create'
        },
        fileBrowserTransportCreateContentType: {
            type: String,
            default: undefined,
            kComposite: 'fileBrowser.transport.create.contentType'
        },
        fileBrowserTransportCreateData: {
            type: [Object, String, Function],
            default: undefined,
            kComposite: 'fileBrowser.transport.create.data'
        },
        fileBrowserTransportCreateDataType: {
            type: String,
            default: undefined,
            kComposite: 'fileBrowser.transport.create.dataType'
        },
        fileBrowserTransportCreateType: {
            type: String,
            default: undefined,
            kComposite: 'fileBrowser.transport.create.type'
        },
        fileBrowserTransportCreateUrl: {
            type: [String, Function],
            default: undefined,
            kComposite: 'fileBrowser.transport.create.url'
        },
        fileBrowserSchemaModelId: {
            type: String,
            default: undefined,
            kComposite: 'fileBrowser.schema.model.id'
        },
        fileBrowserSchemaModelFieldsName: {
            type: String,
            default: undefined,
            kComposite: 'fileBrowser.schema.model.fields.name'
        },
        fileBrowserSchemaModelFieldsNameField: {
            type: String,
            default: undefined,
            kComposite: 'fileBrowser.schema.model.fields.name.field'
        },
        fileBrowserSchemaModelFieldsNameParse: {
            type: Function,
            default: undefined,
            kComposite: 'fileBrowser.schema.model.fields.name.parse'
        },
        fileBrowserSchemaModelFieldsType: {
            type: String,
            default: undefined,
            kComposite: 'fileBrowser.schema.model.fields.type'
        },
        fileBrowserSchemaModelFieldsTypeParse: {
            type: Function,
            default: undefined,
            kComposite: 'fileBrowser.schema.model.fields.type.parse'
        },
        fileBrowserSchemaModelFieldsTypeField: {
            type: String,
            default: undefined,
            kComposite: 'fileBrowser.schema.model.fields.type.field'
        },
        fileBrowserSchemaModelFieldsSize: {
            type: String,
            default: undefined,
            kComposite: 'fileBrowser.schema.model.fields.size'
        },
        fileBrowserSchemaModelFieldsSizeField: {
            type: String,
            default: undefined,
            kComposite: 'fileBrowser.schema.model.fields.size.field'
        },
        fileBrowserSchemaModelFieldsSizeParse: {
            type: Function,
            default: undefined,
            kComposite: 'fileBrowser.schema.model.fields.size.parse'
        },
        fileBrowserMessagesUploadFile: {
            type: String,
            default: undefined,
            kComposite: 'fileBrowser.messages.uploadFile'
        },
        fileBrowserMessagesOrderBy: {
            type: String,
            default: undefined,
            kComposite: 'fileBrowser.messages.orderBy'
        },
        fileBrowserMessagesOrderByName: {
            type: String,
            default: undefined,
            kComposite: 'fileBrowser.messages.orderByName'
        },
        fileBrowserMessagesOrderBySize: {
            type: String,
            default: undefined,
            kComposite: 'fileBrowser.messages.orderBySize'
        },
        fileBrowserMessagesDirectoryNotFound: {
            type: String,
            default: undefined,
            kComposite: 'fileBrowser.messages.directoryNotFound'
        },
        fileBrowserMessagesEmptyFolder: {
            type: String,
            default: undefined,
            kComposite: 'fileBrowser.messages.emptyFolder'
        },
        fileBrowserMessagesDeleteFile: {
            type: String,
            default: undefined,
            kComposite: 'fileBrowser.messages.deleteFile'
        },
        fileBrowserMessagesInvalidFileType: {
            type: String,
            default: undefined,
            kComposite: 'fileBrowser.messages.invalidFileType'
        },
        fileBrowserMessagesOverwriteFile: {
            type: String,
            default: undefined,
            kComposite: 'fileBrowser.messages.overwriteFile'
        },
        fileBrowserMessagesSearch: {
            type: String,
            default: undefined,
            kComposite: 'fileBrowser.messages.search'
        }
    }
};

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    props: {
        imageBrowserFileTypes: {
            type: String,
            default: undefined,
            kComposite: 'imageBrowser.fileTypes'
        },
        imageBrowserPath: {
            type: String,
            default: undefined,
            kComposite: 'imageBrowser.path'
        },
        imageBrowserTransportRead: {
            type: [String, Function],
            default: undefined,
            kComposite: 'imageBrowser.transport.read'
        },
        imageBrowserTransportReadContentType: {
            type: String,
            default: undefined,
            kComposite: 'imageBrowser.transport.read.contentType'
        },
        imageBrowserTransportReadData: {
            type: [Object, String, Function],
            default: undefined,
            kComposite: 'imageBrowser.transport.read.data'
        },
        imageBrowserTransportReadDataType: {
            type: String,
            default: undefined,
            kComposite: 'imageBrowser.transport.read.dataType'
        },
        imageBrowserTransportReadType: {
            type: String,
            default: undefined,
            kComposite: 'imageBrowser.transport.read.type'
        },
        imageBrowserTransportReadUrl: {
            type: [String, Function],
            default: undefined,
            kComposite: 'imageBrowser.transport.read.url'
        },
        imageBrowserTransportThumbnailUrl: {
            type: [String, Function],
            default: undefined,
            kComposite: 'imageBrowser.transport.thumbnailUrl'
        },
        imageBrowserTransportUploadUrl: {
            type: String,
            default: undefined,
            kComposite: 'imageBrowser.transport.uploadUrl'
        },
        imageBrowserTransportImageUrl: {
            type: [String, Function],
            default: undefined,
            kComposite: 'imageBrowser.transport.imageUrl'
        },
        imageBrowserTransportDestroy: {
            type: String,
            default: undefined,
            kComposite: 'imageBrowser.transport.destroy'
        },
        imageBrowserTransportDestroyContentType: {
            type: String,
            default: undefined,
            kComposite: 'imageBrowser.transport.destroy.contentType'
        },
        imageBrowserTransportDestroyData: {
            type: [Object, String, Function],
            default: undefined,
            kComposite: 'imageBrowser.transport.destroy.data'
        },
        imageBrowserTransportDestroyDataType: {
            type: String,
            default: undefined,
            kComposite: 'imageBrowser.transport.destroy.dataType'
        },
        imageBrowserTransportDestroyType: {
            type: String,
            default: undefined,
            kComposite: 'imageBrowser.transport.destroy.type'
        },
        imageBrowserTransportDestroyUrl: {
            type: [String, Function],
            default: undefined,
            kComposite: 'imageBrowser.transport.destroy.url'
        },
        imageBrowserTransportCreate: {
            type: String,
            default: undefined,
            kComposite: 'imageBrowser.transport.create'
        },
        imageBrowserTransportCreateContentType: {
            type: String,
            default: undefined,
            kComposite: 'imageBrowser.transport.create.contentType'
        },
        imageBrowserTransportCreateData: {
            type: [Object, String, Function],
            default: undefined,
            kComposite: 'imageBrowser.transport.create.data'
        },
        imageBrowserTransportCreateDataType: {
            type: String,
            default: undefined,
            kComposite: 'imageBrowser.transport.create.dataType'
        },
        imageBrowserTransportCreateType: {
            type: String,
            default: undefined,
            kComposite: 'imageBrowser.transport.create.type'
        },
        imageBrowserTransportCreateUrl: {
            type: [String, Function],
            default: undefined,
            kComposite: 'imageBrowser.transport.create.url'
        },
        imageBrowserSchemaModelId: {
            type: String,
            default: undefined,
            kComposite: 'imageBrowser.schema.model.id'
        },
        imageBrowserSchemaModelFieldsName: {
            type: String,
            default: undefined,
            kComposite: 'imageBrowser.schema.model.fields.name'
        },
        imageBrowserSchemaModelFieldsNameField: {
            type: String,
            default: undefined,
            kComposite: 'imageBrowser.schema.model.fields.name.field'
        },
        imageBrowserSchemaModelFieldsNameParse: {
            type: Function,
            default: undefined,
            kComposite: 'imageBrowser.schema.model.fields.name.parse'
        },
        imageBrowserSchemaModelFieldsType: {
            type: String,
            default: undefined,
            kComposite: 'imageBrowser.schema.model.fields.type'
        },
        imageBrowserSchemaModelFieldsTypeParse: {
            type: Function,
            default: undefined,
            kComposite: 'imageBrowser.schema.model.fields.type.parse'
        },
        imageBrowserSchemaModelFieldsTypeField: {
            type: String,
            default: undefined,
            kComposite: 'imageBrowser.schema.model.fields.type.field'
        },
        imageBrowserSchemaModelFieldsSize: {
            type: String,
            default: undefined,
            kComposite: 'imageBrowser.schema.model.fields.size'
        },
        imageBrowserSchemaModelFieldsSizeField: {
            type: String,
            default: undefined,
            kComposite: 'imageBrowser.schema.model.fields.size.field'
        },
        imageBrowserSchemaModelFieldsSizeParse: {
            type: Function,
            default: undefined,
            kComposite: 'imageBrowser.schema.model.fields.size.parse'
        },
        imageBrowserMessagesUploadFile: {
            type: String,
            default: undefined,
            kComposite: 'imageBrowser.messages.uploadFile'
        },
        imageBrowserMessagesOrderBy: {
            type: String,
            default: undefined,
            kComposite: 'imageBrowser.messages.orderBy'
        },
        imageBrowserMessagesOrderByName: {
            type: String,
            default: undefined,
            kComposite: 'imageBrowser.messages.orderByName'
        },
        imageBrowserMessagesOrderBySize: {
            type: String,
            default: undefined,
            kComposite: 'imageBrowser.messages.orderBySize'
        },
        imageBrowserMessagesDirectoryNotFound: {
            type: String,
            default: undefined,
            kComposite: 'imageBrowser.messages.directoryNotFound'
        },
        imageBrowserMessagesEmptyFolder: {
            type: String,
            default: undefined,
            kComposite: 'imageBrowser.messages.emptyFolder'
        },
        imageBrowserMessagesDeleteFile: {
            type: String,
            default: undefined,
            kComposite: 'imageBrowser.messages.deleteFile'
        },
        imageBrowserMessagesInvalidFileType: {
            type: String,
            default: undefined,
            kComposite: 'imageBrowser.messages.invalidFileType'
        },
        imageBrowserMessagesOverwriteFile: {
            type: String,
            default: undefined,
            kComposite: 'imageBrowser.messages.overwriteFile'
        },
        imageBrowserMessagesSearch: {
            type: String,
            default: undefined,
            kComposite: 'imageBrowser.messages.search'
        }
    }
};

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    props: {
        immutablesDeserialization: {
            type: Function,
            default: undefined,
            kComposite: 'immutables.deserialization'
        },
        immutablesSerialization: {
            type: [String, Function],
            default: undefined,
            kComposite: 'immutables.serialization'
        }
    }
};

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    props: {
        messagesAccessibilityTab: {
            type: String,
            default: undefined,
            kComposite: 'messages.accessibilityTab'
        },
        messagesAddColumnLeft: {
            type: String,
            default: undefined,
            kComposite: 'messages.addColumnLeft'
        },
        messagesAddColumnRight: {
            type: String,
            default: undefined,
            kComposite: 'messages.addColumnRight'
        },
        messagesAddRowAbove: {
            type: String,
            default: undefined,
            kComposite: 'messages.addRowAbove'
        },
        messagesAddRowBelow: {
            type: String,
            default: undefined,
            kComposite: 'messages.addRowBelow'
        },
        messagesAlignCenter: {
            type: String,
            default: undefined,
            kComposite: 'messages.alignCenter'
        },
        messagesAlignCenterBottom: {
            type: String,
            default: undefined,
            kComposite: 'messages.alignCenterBottom'
        },
        messagesAlignCenterMiddle: {
            type: String,
            default: undefined,
            kComposite: 'messages.alignCenterMiddle'
        },
        messagesAlignCenterTop: {
            type: String,
            default: undefined,
            kComposite: 'messages.alignCenterTop'
        },
        messagesAlignLeft: {
            type: String,
            default: undefined,
            kComposite: 'messages.alignLeft'
        },
        messagesAlignLeftBottom: {
            type: String,
            default: undefined,
            kComposite: 'messages.alignLeftBottom'
        },
        messagesAlignLeftMiddle: {
            type: String,
            default: undefined,
            kComposite: 'messages.alignLeftMiddle'
        },
        messagesAlignLeftTop: {
            type: String,
            default: undefined,
            kComposite: 'messages.alignLeftTop'
        },
        messagesAlignRemove: {
            type: String,
            default: undefined,
            kComposite: 'messages.alignRemove'
        },
        messagesAlignRight: {
            type: String,
            default: undefined,
            kComposite: 'messages.alignRight'
        },
        messagesAlignRightBottom: {
            type: String,
            default: undefined,
            kComposite: 'messages.alignRightBottom'
        },
        messagesAlignRightMiddle: {
            type: String,
            default: undefined,
            kComposite: 'messages.alignRightMiddle'
        },
        messagesAlignRightTop: {
            type: String,
            default: undefined,
            kComposite: 'messages.alignRightTop'
        },
        messagesAlignment: {
            type: String,
            default: undefined,
            kComposite: 'messages.alignment'
        },
        messagesAssociateCellsWithHeaders: {
            type: String,
            default: undefined,
            kComposite: 'messages.associateCellsWithHeaders'
        },
        messagesBackColor: {
            type: String,
            default: undefined,
            kComposite: 'messages.backColor'
        },
        messagesBackground: {
            type: String,
            default: undefined,
            kComposite: 'messages.background'
        },
        messagesBold: {
            type: String,
            default: undefined,
            kComposite: 'messages.bold'
        },
        messagesBorder: {
            type: String,
            default: undefined,
            kComposite: 'messages.border'
        },
        messagesStyle: {
            type: String,
            default: undefined,
            kComposite: 'messages.style'
        },
        messagesCaption: {
            type: String,
            default: undefined,
            kComposite: 'messages.caption'
        },
        messagesCellMargin: {
            type: String,
            default: undefined,
            kComposite: 'messages.cellMargin'
        },
        messagesCellPadding: {
            type: String,
            default: undefined,
            kComposite: 'messages.cellPadding'
        },
        messagesCellSpacing: {
            type: String,
            default: undefined,
            kComposite: 'messages.cellSpacing'
        },
        messagesCellTab: {
            type: String,
            default: undefined,
            kComposite: 'messages.cellTab'
        },
        messagesCleanFormatting: {
            type: String,
            default: undefined,
            kComposite: 'messages.cleanFormatting'
        },
        messagesCollapseBorders: {
            type: String,
            default: undefined,
            kComposite: 'messages.collapseBorders'
        },
        messagesColumns: {
            type: String,
            default: undefined,
            kComposite: 'messages.columns'
        },
        messagesCreateLink: {
            type: String,
            default: undefined,
            kComposite: 'messages.createLink'
        },
        messagesCreateTable: {
            type: String,
            default: undefined,
            kComposite: 'messages.createTable'
        },
        messagesCreateTableHint: {
            type: String,
            default: undefined,
            kComposite: 'messages.createTableHint'
        },
        messagesCssClass: {
            type: String,
            default: undefined,
            kComposite: 'messages.cssClass'
        },
        messagesDeleteColumn: {
            type: String,
            default: undefined,
            kComposite: 'messages.deleteColumn'
        },
        messagesDeleteRow: {
            type: String,
            default: undefined,
            kComposite: 'messages.deleteRow'
        },
        messagesDialogCancel: {
            type: String,
            default: undefined,
            kComposite: 'messages.dialogCancel'
        },
        messagesDialogInsert: {
            type: String,
            default: undefined,
            kComposite: 'messages.dialogInsert'
        },
        messagesDialogOk: {
            type: String,
            default: undefined,
            kComposite: 'messages.dialogOk'
        },
        messagesDialogUpdate: {
            type: String,
            default: undefined,
            kComposite: 'messages.dialogUpdate'
        },
        messagesEditAreaTitle: {
            type: String,
            default: undefined,
            kComposite: 'messages.editAreaTitle'
        },
        messagesFileTitle: {
            type: String,
            default: undefined,
            kComposite: 'messages.fileTitle'
        },
        messagesFileWebAddress: {
            type: String,
            default: undefined,
            kComposite: 'messages.fileWebAddress'
        },
        messagesFontName: {
            type: String,
            default: undefined,
            kComposite: 'messages.fontName'
        },
        messagesFontNameInherit: {
            type: String,
            default: undefined,
            kComposite: 'messages.fontNameInherit'
        },
        messagesFontSize: {
            type: String,
            default: undefined,
            kComposite: 'messages.fontSize'
        },
        messagesFontSizeInherit: {
            type: String,
            default: undefined,
            kComposite: 'messages.fontSizeInherit'
        },
        messagesForeColor: {
            type: String,
            default: undefined,
            kComposite: 'messages.foreColor'
        },
        messagesFormatBlock: {
            type: String,
            default: undefined,
            kComposite: 'messages.formatBlock'
        },
        messagesFormatting: {
            type: String,
            default: undefined,
            kComposite: 'messages.formatting'
        },
        messagesHeight: {
            type: String,
            default: undefined,
            kComposite: 'messages.height'
        },
        messagesId: {
            type: String,
            default: undefined,
            kComposite: 'messages.id'
        },
        messagesImageAltText: {
            type: String,
            default: undefined,
            kComposite: 'messages.imageAltText'
        },
        messagesImageHeight: {
            type: String,
            default: undefined,
            kComposite: 'messages.imageHeight'
        },
        messagesImageWebAddress: {
            type: String,
            default: undefined,
            kComposite: 'messages.imageWebAddress'
        },
        messagesImageWidth: {
            type: String,
            default: undefined,
            kComposite: 'messages.imageWidth'
        },
        messagesIndent: {
            type: String,
            default: undefined,
            kComposite: 'messages.indent'
        },
        messagesInsertFile: {
            type: String,
            default: undefined,
            kComposite: 'messages.insertFile'
        },
        messagesInsertHtml: {
            type: String,
            default: undefined,
            kComposite: 'messages.insertHtml'
        },
        messagesInsertImage: {
            type: String,
            default: undefined,
            kComposite: 'messages.insertImage'
        },
        messagesInsertOrderedList: {
            type: String,
            default: undefined,
            kComposite: 'messages.insertOrderedList'
        },
        messagesInsertUnorderedList: {
            type: String,
            default: undefined,
            kComposite: 'messages.insertUnorderedList'
        },
        messagesItalic: {
            type: String,
            default: undefined,
            kComposite: 'messages.italic'
        },
        messagesOverflowAnchor: {
            type: String,
            default: undefined,
            kComposite: 'messages.overflowAnchor'
        },
        messagesJustifyCenter: {
            type: String,
            default: undefined,
            kComposite: 'messages.justifyCenter'
        },
        messagesJustifyFull: {
            type: String,
            default: undefined,
            kComposite: 'messages.justifyFull'
        },
        messagesJustifyLeft: {
            type: String,
            default: undefined,
            kComposite: 'messages.justifyLeft'
        },
        messagesJustifyRight: {
            type: String,
            default: undefined,
            kComposite: 'messages.justifyRight'
        },
        messagesLinkOpenInNewWindow: {
            type: String,
            default: undefined,
            kComposite: 'messages.linkOpenInNewWindow'
        },
        messagesLinkText: {
            type: String,
            default: undefined,
            kComposite: 'messages.linkText'
        },
        messagesLinkToolTip: {
            type: String,
            default: undefined,
            kComposite: 'messages.linkToolTip'
        },
        messagesLinkWebAddress: {
            type: String,
            default: undefined,
            kComposite: 'messages.linkWebAddress'
        },
        messagesOutdent: {
            type: String,
            default: undefined,
            kComposite: 'messages.outdent'
        },
        messagesPrint: {
            type: String,
            default: undefined,
            kComposite: 'messages.print'
        },
        messagesRows: {
            type: String,
            default: undefined,
            kComposite: 'messages.rows'
        },
        messagesSelectAllCells: {
            type: String,
            default: undefined,
            kComposite: 'messages.selectAllCells'
        },
        messagesStrikethrough: {
            type: String,
            default: undefined,
            kComposite: 'messages.strikethrough'
        },
        messagesSubscript: {
            type: String,
            default: undefined,
            kComposite: 'messages.subscript'
        },
        messagesSummary: {
            type: String,
            default: undefined,
            kComposite: 'messages.summary'
        },
        messagesSuperscript: {
            type: String,
            default: undefined,
            kComposite: 'messages.superscript'
        },
        messagesTableTab: {
            type: String,
            default: undefined,
            kComposite: 'messages.tableTab'
        },
        messagesTableWizard: {
            type: String,
            default: undefined,
            kComposite: 'messages.tableWizard'
        },
        messagesUnderline: {
            type: String,
            default: undefined,
            kComposite: 'messages.underline'
        },
        messagesUnits: {
            type: String,
            default: undefined,
            kComposite: 'messages.units'
        },
        messagesUnlink: {
            type: String,
            default: undefined,
            kComposite: 'messages.unlink'
        },
        messagesViewHtml: {
            type: String,
            default: undefined,
            kComposite: 'messages.viewHtml'
        },
        messagesWidth: {
            type: String,
            default: undefined,
            kComposite: 'messages.width'
        },
        messagesWrapText: {
            type: String,
            default: undefined,
            kComposite: 'messages.wrapText'
        }
    }
};

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    props: {
        pasteCleanupAll: {
            type: Boolean,
            default: undefined,
            kComposite: 'pasteCleanup.all'
        },
        pasteCleanupCss: {
            type: Boolean,
            default: undefined,
            kComposite: 'pasteCleanup.css'
        },
        pasteCleanupCustom: {
            type: Function,
            default: undefined,
            kComposite: 'pasteCleanup.custom'
        },
        pasteCleanupKeepNewLines: {
            type: Boolean,
            default: undefined,
            kComposite: 'pasteCleanup.keepNewLines'
        },
        pasteCleanupMsAllFormatting: {
            type: Boolean,
            default: undefined,
            kComposite: 'pasteCleanup.msAllFormatting'
        },
        pasteCleanupMsConvertLists: {
            type: Boolean,
            default: undefined,
            kComposite: 'pasteCleanup.msConvertLists'
        },
        pasteCleanupMsTags: {
            type: Boolean,
            default: undefined,
            kComposite: 'pasteCleanup.msTags'
        },
        pasteCleanupNone: {
            type: Boolean,
            default: undefined,
            kComposite: 'pasteCleanup.none'
        },
        pasteCleanupSpan: {
            type: Boolean,
            default: undefined,
            kComposite: 'pasteCleanup.span'
        }
    }
};

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    props: {
        pdfAuthor: {
            type: String,
            default: undefined,
            kComposite: 'pdf.author'
        },
        pdfAvoidLinks: {
            type: [Boolean, String],
            default: undefined,
            kComposite: 'pdf.avoidLinks'
        },
        pdfCreator: {
            type: String,
            default: undefined,
            kComposite: 'pdf.creator'
        },
        pdfDate: {
            type: Date,
            default: undefined,
            kComposite: 'pdf.date'
        },
        pdfFileName: {
            type: String,
            default: undefined,
            kComposite: 'pdf.fileName'
        },
        pdfForceProxy: {
            type: Boolean,
            default: undefined,
            kComposite: 'pdf.forceProxy'
        },
        pdfKeywords: {
            type: String,
            default: undefined,
            kComposite: 'pdf.keywords'
        },
        pdfLandscape: {
            type: Boolean,
            default: undefined,
            kComposite: 'pdf.landscape'
        },
        pdfMarginBottom: {
            type: [Number, String],
            default: undefined,
            kComposite: 'pdf.margin.bottom'
        },
        pdfMarginLeft: {
            type: [Number, String],
            default: undefined,
            kComposite: 'pdf.margin.left'
        },
        pdfMarginRight: {
            type: [Number, String],
            default: undefined,
            kComposite: 'pdf.margin.right'
        },
        pdfMarginTop: {
            type: [Number, String],
            default: undefined,
            kComposite: 'pdf.margin.top'
        },
        pdfPaperSize: {
            type: [String, Array],
            default: undefined,
            kComposite: 'pdf.paperSize'
        },
        pdfProxyURL: {
            type: String,
            default: undefined,
            kComposite: 'pdf.proxyURL'
        },
        pdfProxyTarget: {
            type: String,
            default: undefined,
            kComposite: 'pdf.proxyTarget'
        },
        pdfSubject: {
            type: String,
            default: undefined,
            kComposite: 'pdf.subject'
        },
        pdfTitle: {
            type: String,
            default: undefined,
            kComposite: 'pdf.title'
        }
    }
};

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    props: {
        resizableContent: {
            type: Boolean,
            default: undefined,
            kComposite: 'resizable.content'
        },
        resizableMin: {
            type: Number,
            default: undefined,
            kComposite: 'resizable.min'
        },
        resizableMax: {
            type: Number,
            default: undefined,
            kComposite: 'resizable.max'
        },
        resizableToolbar: {
            type: Boolean,
            default: undefined,
            kComposite: 'resizable.toolbar'
        }
    }
};

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    props: {
        serializationCustom: {
            type: Function,
            default: undefined,
            kComposite: 'serialization.custom'
        },
        serializationEntities: {
            type: Boolean,
            default: undefined,
            kComposite: 'serialization.entities'
        },
        serializationScripts: {
            type: Boolean,
            default: undefined,
            kComposite: 'serialization.scripts'
        },
        serializationSemantic: {
            type: Boolean,
            default: undefined,
            kComposite: 'serialization.semantic'
        }
    }
};

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _KendoEditor = __webpack_require__(2);

var _KendoEditor2 = _interopRequireDefault(_KendoEditor);

var _KendoEditorTool = __webpack_require__(1);

var _KendoEditorTool2 = _interopRequireDefault(_KendoEditorTool);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var KendoEditorInstaller = function () {
    function KendoEditorInstaller() {
        _classCallCheck(this, KendoEditorInstaller);
    }

    _createClass(KendoEditorInstaller, null, [{
        key: 'install',
        value: function install(Vue) {
            Vue.component(_KendoEditor2.default.name, _KendoEditor2.default);
            Vue.component(_KendoEditorTool2.default.name, _KendoEditorTool2.default);
        }
    }]);

    return KendoEditorInstaller;
}();

exports.default = KendoEditorInstaller;

// Automatic installation if Vue has been added to the global scope.

if (typeof window !== 'undefined' && window.Vue && window.Vue.use) {
    window.Vue.use(KendoEditorInstaller);
}

/***/ })
/******/ ]);
});
//# sourceMappingURL=kendo-editor-vue-wrapper.js.map