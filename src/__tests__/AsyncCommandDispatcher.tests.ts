// tslint:disable
import { AsynchronousCommandDispatcher } from '../dispatchers/AsynchronousCommandDispatcher';
import * as EventEmitter from 'events';
import 'rxjs/add/operator/filter';

describe('The Asynchronous Command Dispatcher', () => {
    describe('when dispatching a command', () => {
        const command = { type: ' async test' };
        const eventEmitter = new EventEmitter();
        const dispatcher = new AsynchronousCommandDispatcher(eventEmitter, console);

        describe('when subscribing to the dispatched observable', () => {
            const observable = dispatcher.dispatch(command);
            it('should return the domain event when subscribing', (done) => {
                observable
                    .filter((e) => e === command)
                    .subscribe((e) => {
                        expect(e).toEqual(command);
                        done();
                    });
            });
        });
    });
});
