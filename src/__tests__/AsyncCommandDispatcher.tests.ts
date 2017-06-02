// tslint:disable
import { AsyncCommandDispatcher } from '../dispatchers/AsyncCommandDispatcher';
import * as Rx from 'rxjs';

describe('The Remote Command Dispatcher', () => {
    describe('when setting up a command dispatcher for the first time', () => {

        const domainEvent = { type: 'puppyFlattened' };
        const command = { type: 'stepOnPuppy' };

        const queuePusher = {
            push: jest.fn().mockReturnValue(Rx.Observable.from([command]))
        };
        const eventListener = {
            listenFor: jest.fn().mockReturnValue(Rx.Observable.from([domainEvent]))
        };

        const dispatcher = new AsyncCommandDispatcher(queuePusher, eventListener);
        const observable = dispatcher.dispatch(command);

        it('should push the command into the queue', () => {
            let commandHandled = {};
            observable
                .filter((e) => e === command)
                .subscribe((e) => {
                    commandHandled = e;
                });
            expect(commandHandled).toEqual(command);
        });

        it('should listen for the event and return it', () => {
            let domainEventFromSubscription = {};
            observable
                .filter((e) => e===domainEvent)
                .subscribe((e) => {
                    domainEventFromSubscription = e;
                });
            expect(domainEventFromSubscription).toEqual(domainEvent);
        });
    });
});
