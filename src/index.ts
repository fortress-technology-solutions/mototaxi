import { CommandDispatcher } from './CommandDispatcher';
import { IMotoTaxiConfig } from './IMotoTaxiConfig';

const getDispatcher = (args?: IMotoTaxiConfig) => {
    args = args || {};
    return new CommandDispatcher(args.commandHandlers || []);
};

export {
    getDispatcher,
};
