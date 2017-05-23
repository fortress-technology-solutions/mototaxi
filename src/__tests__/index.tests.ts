import mototaxi from '../index';
import SynchronousCommandDispatcher from '../dispatchers/SynchronousCommandDispatcher';
//import EventEmitterCommandDispatcher from '../dispatcher/EventEmitterCommandDispatcher';

describe('Getting a Dispatcher', () => {
    describe('without config', () => {
        it('should return the default synchronous dispatcher', () => {
            const dispatcher = mototaxi.getDispatcher();
            expect((dispatcher instanceof SynchronousCommandDispatcher))
                .toBeTruthy();
        });
    });
    describe('with config for synchronous command dispatcher', () => {
        it('should return the default synchronous dispatcher', () => {
            const dispatcher = mototaxi.getDispatcher({ type: 'synchronous' });
            expect((dispatcher instanceof SynchronousCommandDispatcher))
                .toBeTruthy();
        });
    });
    // describe('with config for evented command dispatcher', () => {
    //     it('should return the evented dispatcher', () => {
    //         const dispatcher = mototaxi.getDispatcher({ type: 'event-emitter' });
    //         expect((dispatcher instanceof EventEmitterCommandDispatcher))
    //             .toBeTruthy();
    //     });
    // });
});
