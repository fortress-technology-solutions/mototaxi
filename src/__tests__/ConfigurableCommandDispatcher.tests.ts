// tslint:disable
import { ConfigurableCommandDispatcher } from '../dispatchers/ConfigurableCommandDispatcher';
import * as Rx from 'rxjs';

describe('The Configurable Command Dispatcher', () => {
    describe('when setting up a command dispatcher for the first time', () => {
        const domainEvent = { type: 'puppyFlattened' };
        const command = { type: 'stepOnPuppy' };
        const handleCommand = jest.fn();
        const validateCommand = jest.fn();
        const getResponse = jest.fn().mockReturnValue(Rx.Observable.from([domainEvent]));
        const dispatcher = new ConfigurableCommandDispatcher(validateCommand, handleCommand, getResponse);
        const obs = dispatcher.dispatch(command);
        it('should validate the command', () => {
            expect(validateCommand.mock.calls.length).toBe(1);
            expect(validateCommand.mock.calls[0][0]).toBe(command);
        });
        it('should handle the command', () => {
            expect(handleCommand.mock.calls.length).toBe(1);
            expect(handleCommand.mock.calls[0][0]).toBe(command);
        });
        it('should return what came from the get responses function', (done) => {
            expect(getResponse.mock.calls[0][0]).toBe(command);
            obs.subscribe((e) => {
                expect(e).toBe(domainEvent);
                done();
            });
        });
    });
});
