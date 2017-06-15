// tslint:disable
import { SynchronousCommandDispatcher } from '../dispatchers/SynchronousCommandDispatcher';
import 'rxjs/add/operator/filter';

describe('The Synchronous Command Dispatcher', () => {
    describe('when dispatching a command', () => {
        const command = { type: 'test' };
        const domainEvent = { type: `tested` };
        const handler = { test: (command) => domainEvent };
        const console = {
            log: () => {}
        };
        const dispatcher = new SynchronousCommandDispatcher([handler], console);
        const observable = dispatcher.dispatch(command);

        describe('when subscribing to the dispatched observable', () => {
            it('should return the domain event when subscribing', (done) => {
                observable
                    .filter((e) => e === domainEvent)
                    .subscribe((e) => {
                        expect(e).toEqual(domainEvent);
                        done();
                    });
            });
        });
    });
});
