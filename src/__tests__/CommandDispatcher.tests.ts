// tslint:disable
import { CommandDispatcher } from '../CommandDispatcher';
import 'rxjs/add/operator/filter';
import * as EventEmitter from 'events';

describe('The Command Dispatcher', () => {
    describe('when dispatching a command', () => {
        const command = { type: 'test' };
        const domainEvent = { type: `tested` };
        const handler = { test: (command) => domainEvent };
        const eventEmitter = new EventEmitter();
        const dispatcher = new CommandDispatcher([handler], eventEmitter);
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
