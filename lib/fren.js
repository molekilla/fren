var q = require('q');
var request = require('request');
var StateProvider_1 = require('./StateProvider');
var _ = require('underscore');
var Fren = (function () {
    function Fren() {
        this.stateCache = new StateProvider_1.StateProvider();
    }
    Fren.prototype.step = function (options) {
        var func = this[options.method];
        if (func === null) {
            throw new Error('Unknown method');
        }
        else {
            return func.call(this, options);
        }
    };
    Fren.prototype.get = function (options) {
        console.log('step: ' + options.name);
        options.method = 'get';
        var promise = q.nbind(request.get, request);
        this.stateCache.add(options.name, promise, options);
        return this;
    };
    Fren.prototype.delete = function (options) {
        console.log('step: ' + options.name);
        options.method = 'delete';
        var promise = q.nbind(request.del, request);
        this.stateCache.add(options.name, promise, options);
        return this;
    };
    Fren.prototype.put = function (options) {
        console.log('step: ' + options.name);
        options.method = 'put';
        var promise = q.nbind(request.put, request);
        this.stateCache.add(options.name, promise, options);
        return this;
    };
    Fren.prototype.post = function (options) {
        console.log('step: ' + options.name);
        options.method = 'post';
        var promise = q.nbind(request.post, request);
        this.stateCache.add(options.name, promise, options);
        return this;
    };
    Fren.prototype.patch = function (options) {
        console.log('step: ' + options.name);
        options.method = 'patch';
        var promise = q.nbind(request.patch, request);
        this.stateCache.add(options.name, promise, options);
        return this;
    };
    Fren.prototype.start = function () {
        this.stateCache.go('init');
    };
    return Fren;
})();
exports.Fren = Fren;
;
//# sourceMappingURL=fren.js.map