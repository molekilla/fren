import StateProvider = require('./StateProvider');
declare class Fren {
    state: StateProvider;
    constructor(options: any);
    step(options: any): Fren;
    get(options: any): Fren;
    delete(options: any): Fren;
    put(options: any): Fren;
    post(options: any): Fren;
    patch(options: any): Fren;
    start(): void;
}
export = Fren;
