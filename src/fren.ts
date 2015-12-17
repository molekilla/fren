const q = require('q');
import request = require('request');
import {StateProvider} from './StateProvider';
import {StateItem, Reduce} from './stateItem';
const _ = require('underscore');



export class Fren {
    stateCache:StateProvider;
    constructor() {
      this.stateCache = new StateProvider();
    }

    step(options:StateItem) {
        console.log('step: ' + options.name);
        let promise = null;
        if (options.method === 'get') {
            promise = q.nbind(request.get, request);
        } else if (options.method === 'post') {
            promise = q.nbind(request.post, request);
        } else if (options.method === 'put') {
            promise = q.nbind(request.put, request);
        } else if (options.method === 'delete') {
            promise = q.nbind(request.del, request);
        } else if (options.method === 'patch') {
            promise = q.nbind(request.patch, request);
        }


        this.stateCache.add(options.name, promise, options);

        return this;
    }

    get(options:StateItem) {
        console.log('step: ' + options.name);
        options.method = 'get';
        let promise = q.nbind(request.get, request);

        this.stateCache.add(options.name, promise, options);

        return this;
    }

    delete(options:StateItem) {
        console.log('step: ' + options.name);
        options.method = 'delete';
        let promise = q.nbind(request.del, request);

        this.stateCache.add(options.name, promise, options);

        return this;
    }

    put(options:StateItem) {
        console.log('step: ' + options.name);
        options.method = 'put';
        let promise = q.nbind(request.put, request);

        this.stateCache.add(options.name, promise, options);

        return this;
    }

    post(options:StateItem) {
        console.log('step: ' + options.name);
        options.method = 'post';
        let promise = q.nbind(request.post, request);

        this.stateCache.add(options.name, promise, options);

        return this;
    }

    patch(options:StateItem) {
        console.log('step: ' + options.name);
        options.method = 'patch';
        let promise = q.nbind(request.patch, request);

        this.stateCache.add(options.name, promise, options);

        return this;
    }

    start() {
        this.stateCache.go('init');
    }

};


//export = Fren;
//module.exports = Fren;
