import { CommandDispatcher } from './CommandDispatcher';
import { IMotoTaxiConfig } from './IMotoTaxiConfig';
import * as EventEmitter from 'events';
import 'rxjs/Rx';

const getDispatcher = (args?: IMotoTaxiConfig) => {
    args = args || {};
    return new CommandDispatcher(args.commandHandlers || [], new EventEmitter());
};

export {
    getDispatcher,
};
