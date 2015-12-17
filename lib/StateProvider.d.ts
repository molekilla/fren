export declare class StateProvider {
    states: any;
    constructor();
    add(name: string, future: any, opts: any): void;
    go(name: string, nodes?: any): void;
}
