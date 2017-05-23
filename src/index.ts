import SynchronousCommandDispatcher from './dispatchers/SynchronousCommandDispatcher';

const getDispatcher = () => {
    const dispatcher = new SynchronousCommandDispatcher([]);
    return dispatcher;
};

export default {
    getDispatcher,
};
