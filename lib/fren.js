var q = require('q');
var request = require('request');
var StateProvider_1 = require('./StateProvider');
var _ = require('underscore');
var Fren = (function () {
    function Fren() {
        this.stateCache = new StateProvider_1.StateProvider();
    }
    Fren.prototype.step = function (options) {
        console.log('step: ' + options.name);
        var promise = null;
        if (options.method === 'get') {
            promise = q.nbind(request.get, request);
        }
        else if (options.method === 'post') {
            promise = q.nbind(request.post, request);
        }
        else if (options.method === 'put') {
            promise = q.nbind(request.put, request);
        }
        else if (options.method === 'delete') {
            promise = q.nbind(request.del, request);
        }
        else if (options.method === 'patch') {
            promise = q.nbind(request.patch, request);
        }
        this.stateCache.add(options.name, promise, options);
        return this;
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