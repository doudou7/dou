Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.VantComponent = void 0;

var e = require("../mixins/basic");

exports.VantComponent = function(s) {
    var a = {};
    (function(e, s, a) {
        Object.keys(a).forEach(function(t) {
            e[t] && (s[a[t]] = e[t]);
        });
    })(s, a, {
        data: "data",
        props: "properties",
        mixins: "behaviors",
        methods: "methods",
        beforeCreate: "created",
        created: "attached",
        mounted: "ready",
        destroyed: "detached",
        classes: "externalClasses"
    }), a.externalClasses = a.externalClasses || [], a.externalClasses.push("custom-class"), 
    a.behaviors = a.behaviors || [], a.behaviors.push(e.basic);
    var t = s.relation;
    t && (a.relations = t.relations, a.behaviors.push(t.mixin)), s.field && a.behaviors.push("wx://form-field"), 
    a.options = {
        multipleSlots: !0,
        addGlobalClass: !0
    }, Component(a);
};