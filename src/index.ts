import { ImmediateCommandDispatcher } from './dispatchers/ImmediateCommandDispatcher';
import { IMotoTaxiConfig } from './IMotoTaxiConfig';
import 'rxjs/Rx';

const getDispatcher = (args?: IMotoTaxiConfig) => {
    args = args || {};
    return new ImmediateCommandDispatcher(args.commandHandlers || []);
};

export {
    getDispatcher,
};
