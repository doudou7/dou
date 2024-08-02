var t = require("../../@babel/runtime/helpers/typeof");

function e(t) {
    return "function" == typeof t;
}

function n(t) {
    return null !== t && "object" === (void 0 === t ? "undefined" : r(t)) && !Array.isArray(t);
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var r = "function" == typeof Symbol && "symbol" == t(Symbol.iterator) ? function(e) {
    return t(e);
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : t(e);
};

exports.isFunction = e, exports.isPlainObject = n, exports.isPromise = function(t) {
    return n(t) && e(t.then) && e(t.catch);
}, exports.isDef = function(t) {
    return null != t;
}, exports.isObj = function(t) {
    var e = void 0 === t ? "undefined" : r(t);
    return null !== t && ("object" === e || "function" === e);
}, exports.isNumber = function(t) {
    return /^\d+(\.\d+)?$/.test(t);
}, exports.isBoolean = function(t) {
    return "boolean" == typeof t;
}, exports.isImageUrl = function(t) {
    return o.test(t);
}, exports.isVideoUrl = function(t) {
    return i.test(t);
};

var o = /\.(jpeg|jpg|gif|png|svg|webp|jfif|bmp|dpg)/i, i = /\.(mp4|mpg|mpeg|dat|asf|avi|rm|rmvb|mov|wmv|flv|mkv)/i;