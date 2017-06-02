// tslint:disable
import { ConfigurableCommandDispatcher } from '../dispatchers/ConfigurableCommandDispatcher';
import * as Rx from 'rxjs';

describe('The Configurable Command Dispatcher', () => {
    describe('when setting up a command dispatcher for the first time', () => {
        const domainEvent = { type: 'puppyFlattened' };
        const command = { type: 'stepOnPuppy' };
        const handleCommand = jest.fn().mockReturnValue(Rx.Observable.from([command]));
        const getResponse = jest.fn().mockReturnValue(Rx.Observable.from([domainEvent]));
        const dispatcher = new ConfigurableCommandDispatcher(handleCommand, getResponse);
        const obs = dispatcher.dispatch(command);
        it('should handle the command', () => {
            expect(handleCommand.mock.calls.length).toBe(1);
            expect(handleCommand.mock.calls[0][0]).toBe(command);
        });
        it('should return what came from the get responses function', () => {
            expect(getResponse.mock.calls[0][0]).toBe(command);
            let domainEventReturned = null;
            obs.subscribe((e) => {
                domainEventReturned = e;
            });
            expect(domainEventReturned).toBe(domainEvent);
        });
        it('should allow you to subscribe to the command handler stream', () => {
            let commandEvent = null;
            obs.filter((e)=> e === command )
               .subscribe((e) => {
                    commandEvent = e;
               });
            expect(commandEvent).toEqual(command);
        });
    });
});
