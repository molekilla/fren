//import request = require('request');
const _ = require('underscore');
//import * as _ from 'underscore';
const q = require('q');
const debug = require('debug')('fren:state');
import {StateItem} from './stateItem';

export class StateProvider {
    states: any;
    constructor() {
        this.states = {};
    }


    add(name: string, future: any, opts) {
        this.states[name] = _.extend({
            future: future
        }, opts);

    }


    go(name: string, nodes?: any) {
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

                    return step
                        .future(step.url, step.options)
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
    }

}

// export = StateProvider;
