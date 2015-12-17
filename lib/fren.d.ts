import { StateProvider } from './StateProvider';
import { StateItem } from './stateItem';
export declare class Fren {
    stateCache: StateProvider;
    constructor();
    step(options: StateItem): Fren;
    get(options: StateItem): Fren;
    delete(options: StateItem): Fren;
    put(options: StateItem): Fren;
    post(options: StateItem): Fren;
    patch(options: StateItem): Fren;
    start(): void;
}
