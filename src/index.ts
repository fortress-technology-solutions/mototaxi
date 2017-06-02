import { ImmediateCommandDispatcher } from './dispatchers/ImmediateCommandDispatcher';
import { AsyncCommandDispatcher } from './dispatchers/AsyncCommandDispatcher';
import { SqsQueuePusher } from './aws/SqsQueuePusher';
import { SnsEventListener } from './aws/SnsEventListener';
import { IMotoTaxiConfig } from './IMotoTaxiConfig';
import 'rxjs/Rx';

const getDispatcher = (args?: IMotoTaxiConfig) => {
    args = args || {};
    if (args.sqs && args.sns) {
        return new AsyncCommandDispatcher(new SqsQueuePusher(args.sqs), new SnsEventListener(args.sns));
    }
    return new ImmediateCommandDispatcher(args.commandHandlers || []);
};

export {
    getDispatcher,
};
