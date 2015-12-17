import {StateProvider} from './StateProvider';

export interface Reduce {
    (stateProvider:StateProvider, response:any, body:string): void;   
}

export interface StateItem {
    name: string;
    method?: string;
    url?: string;
    options?: any;
    reduce: Reduce;
}