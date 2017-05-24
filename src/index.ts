import { CommandDispatcher } from './CommandDispatcher';
import { IMotoTaxiConfig } from './IMotoTaxiConfig';
import { DefaultEventEmitter } from './eventEmitters/DefaultEventEmitter';

const getDispatcher = (args?: IMotoTaxiConfig) => {
    args = args || {};
    return new CommandDispatcher(args.commandHandlers || [],
                                 args.commandEmitter || new DefaultEventEmitter(),
                                 args.domainEventEmitter || new DefaultEventEmitter());
};

export default {
    getDispatcher,
};
