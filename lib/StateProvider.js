'use strict';

var _toConsumableArray = function (arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } };

Object.defineProperty(exports, '__esModule', {
    value: true
});
var _ = require('underscore');
//import * as _ from 'underscore';
var q = require('q');

function StateProvider() {
    this.states = {};
}

StateProvider.prototype.add = function (name, future, opts) {
    this.states[name] = _.extend({
        future: future
    }, opts);
};

StateProvider.prototype.go = function (name, nodes) {
    var step = this.states[name];
    var $state = this;

    if (nodes) {
        if (!_.isArray(nodes)) {
            nodes = [nodes];
        }

        var futures = _.map(nodes, function (node) {

            _.extend(step, node);
            console.log('requesting: ' + step.url);

            return step.future(step.url, step.options).then(function (args) {
                console.log(args.length);
                step.reduce.apply(step, [$state].concat(_toConsumableArray(args)));
            });
        });

        console.log('children: ' + futures.length);
        futures.reduce(q.when, q(0));
    } else {
        console.log('requesting: ' + step.url);
        step.future(step.url, step.options).done(function (resp) {
            step.reduce.apply(step, [$state].concat(_toConsumableArray(resp)));
        });
    }
};

exports['default'] = StateProvider;
module.exports = exports['default'];