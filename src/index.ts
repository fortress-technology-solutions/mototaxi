import { ImmediateCommandDispatcher } from './dispatchers/ImmediateCommandDispatcher';
import { IMotoTaxiConfig } from './IMotoTaxiConfig';

const getDispatcher = (args?: IMotoTaxiConfig) => {
    args = args || {};
    return new ImmediateCommandDispatcher(args.commandHandlers || []);
};

export {
    getDispatcher,
};
