// tslint:disable
import { AsyncCommandDispatcher } from '../dispatchers/AsyncCommandDispatcher';
import 'rxjs/add/operator/filter';

describe('The Async Command Dispatcher', () => {
    describe('when dispatching a command', () => {
        const command = { type: 'test' };
        const domainEvent = { type: `tested` };
        const handler = { test: (command) => domainEvent };
        const dispatcher = new AsyncCommandDispatcher([handler]);
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
