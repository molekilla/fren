var q = require('q');
var request = require('request');
var StateProvider = require('./StateProvider');
var _ = require('underscore');
var Fren = function (options) {

    this.state = new StateProvider();
};

Fren.prototype.step = function (options) {

    console.log('step: ' + options.name);
    var promise = null;
    if (options.method === 'get') {
        promise = q.nbind(request.get, request);
    } else if (options.method === 'post') {
        promise = q.nbind(request.post, request);
    } else if (options.method === 'put') {
        promise = q.nbind(request.put, request);
    } else if (options.method === 'delete') {
        promise = q.nbind(request.delete, request);
    } else if (options.method === 'patch') {
        promise = q.nbind(request.patch, request);
    }


    this.state.add(options.name, promise, options);
    
    return this;
};

Fren.prototype.start = function () {
    this.state.go('init');
}

module.exports = Fren;