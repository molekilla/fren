const q = require('q');
const request = require('request');
import StateProvider = require('./StateProvider');
const _ = require('underscore');

class Fren {
    state:StateProvider;
    constructor(options) {
      this.state = new StateProvider();
    }

    step(options) {
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
    }

    get(options) {
        console.log('step: ' + options.name);
        options.method = 'get';
        var promise = q.nbind(request.get, request);

        this.state.add(options.name, promise, options);

        return this;
    }

    delete(options) {
        console.log('step: ' + options.name);
        options.method = 'delete';
        var promise = q.nbind(request.delete, request);

        this.state.add(options.name, promise, options);

        return this;
    }

    put(options) {
        console.log('step: ' + options.name);
        options.method = 'put';
        var promise = q.nbind(request.put, request);

        this.state.add(options.name, promise, options);

        return this;
    }

    post(options) {
        console.log('step: ' + options.name);
        options.method = 'post';
        var promise = q.nbind(request.post, request);

        this.state.add(options.name, promise, options);

        return this;
    }

    patch(options) {
        console.log('step: ' + options.name);
        options.method = 'patch';
        var promise = q.nbind(request.patch, request);

        this.state.add(options.name, promise, options);

        return this;
    }

    start() {
        this.state.go('init');
    }

};


export = Fren;
//module.exports = Fren;
