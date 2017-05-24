import { CommandDispatcher } from './CommandDispatcher';
import { DefaultEventEmitter } from './eventEmitters/DefaultEventEmitter';

const getDispatcher = () => {
    const dispatcher = new CommandDispatcher([], new DefaultEventEmitter(), new DefaultEventEmitter());
    return dispatcher;
};

export default {
    getDispatcher,
};
