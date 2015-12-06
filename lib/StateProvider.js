var _ = require('underscore');
var q = require('q');
var debug = require('debug')('fren:state');
var StateProvider = (function () {
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
                return step.future(step.url, step.options)
                    .then(function (args) {
                    console.log(args.length);
                    step.reduce.apply(step, [$state].concat(args));
                }, function (err) {
                    if (step.onError) {
                        step.onError(err);
                    }
                    debug(err);
                });
            });
            console.log('children: ' + futures.length);
            futures.reduce(q.when, q(0));
        }
        else {
            step.future(step.url, step.options)
                .done(function (resp) {
                step.reduce.apply(step, [$state].concat(resp));
            }, function (err) {
                if (step.onError) {
                    step.onError(err);
                }
                debug(err);
            });
        }
    };
    return StateProvider;
})();
module.exports = StateProvider;
//# sourceMappingURL=StateProvider.js.map
