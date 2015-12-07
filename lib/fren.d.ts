import StateProvider = require('./StateProvider');
export interface StepConfig {
    name: string;
    method?: string;
}
export declare class Fren {
    state: StateProvider;
    constructor();
    step(options: StepConfig): Fren;
    get(options: StepConfig): Fren;
    delete(options: StepConfig): Fren;
    put(options: StepConfig): Fren;
    post(options: StepConfig): Fren;
    patch(options: StepConfig): Fren;
    start(): void;
}
