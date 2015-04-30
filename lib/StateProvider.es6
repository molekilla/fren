let _ = require('underscore');
//import * as _ from 'underscore';
let q = require('q');
let debug = require('debug')('fren:state');

function StateProvider() {
    this.states = {};
}

StateProvider.prototype.add = function (name, future, opts) {
    this.states[name] = _.extend({
        future: future
    }, opts);

};


StateProvider.prototype.go = function (name, nodes) {
    let step = this.states[name];
    let $state = this;

    if (nodes) {
        if (!_.isArray(nodes)) {
            nodes = [nodes];
        }

        let futures = _.map(nodes,

            node => {

                _.extend(step, node);
                console.log('requesting: ' + step.url);

                return step.future(step.url, step.options)
                    .then((args) => {
                        console.log(args.length);
                        step.reduce($state, ...args);
                    }, (err) => {
                        if (step.onError) {
                            step.onError(err);
                        }
                        debug(err);
                    });

            });

        console.log('children: ' + futures.length);
        futures.reduce(q.when, q(0));
    } else {
        // console.log('requesting: ' + step.url);
        step.future(step.url, step.options)
            .done((resp) => {
                step.reduce($state, ...resp);
            }, (err) => {
                if (step.onError) {
                    step.onError(err);
                }
                debug(err);
            });
    }
};


export default StateProvider;