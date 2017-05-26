// tslint:disable
import { CommandDispatcher } from '../CommandDispatcher';

describe('The Command Dispatcher', () => {
    describe('when setting up a command dispatcher for the first time', () => {
        const domainEvent = { type: 'puppyFlattened' };
        const command = { type: 'stepOnPuppy' };
        const fakeHandler = {
            type: command.type,
            handle: (command) => { return domainEvent },
        };
        const dispatcher = new CommandDispatcher([ fakeHandler ]);
        const obs = dispatcher.dispatch(command);
        it('should allow me to subscribe to domain events that come from command handlers', () => {
            obs
                .filter((x) => x.type===domainEvent.type)
                .subscribe((e) => {
                    expect(e).toEqual(domainEvent);
                });
        });
    });
    describe('when dispatching a single command with one handler', () => {
        const command = { type: 'killMickey' };
        const domainEvent = { type: 'mickeyDead' };

        describe('without subscribing', () => {
            const matchingHandler = {
                type: command.type,
                handle: jest.fn().mockReturnValue(domainEvent),
            };
            const dispatcher = new CommandDispatcher([ matchingHandler ]);
            dispatcher.dispatch(command);
            it('should handle the command', () => {
                expect(matchingHandler.handle.mock.calls.length).toEqual(1);
            });
        });
        describe('and subscribing to the domain event', () => {
            const matchingHandler = {
                type: command.type,
                handle: jest.fn().mockReturnValue(domainEvent),
            };
            const dispatcher = new CommandDispatcher([ matchingHandler ]);
            const observable = dispatcher.dispatch(command);
            it('should handle the command', () => {
                expect(matchingHandler.handle.mock.calls.length).toEqual(1);
            });
            it('should subscribe to the domain event', () => {
                observable.subscribe((e) => {
                    expect(e).toEqual(domainEvent);
                });
            });
        });
    });
    describe('when dispatching a single command with multiple handlers', () => {
        const command = { type: 'killMickey' };
        const domainEvent = { type: 'mickeyDead' };

        describe('without subscribing', () => {
            const handler1 = {
                type: command.type,
                handle: jest.fn().mockReturnValue(domainEvent),
            };
            const handler2 = {
                type: command.type,
                handle: jest.fn().mockReturnValue(domainEvent),
            };
            const dispatcher = new CommandDispatcher([ handler1, handler2 ]);
            dispatcher.dispatch(command);
            it('should handle the command using all handlers', () => {
                expect(handler1.handle.mock.calls.length).toEqual(1);
                expect(handler2.handle.mock.calls.length).toEqual(1);
            });
        });
        describe('and subscribing to the domain event', () => {
            const handler1 = {
                type: command.type,
                handle: jest.fn().mockReturnValue(domainEvent),
            };
            const handler2 = {
                type: command.type,
                handle: jest.fn().mockReturnValue(domainEvent),
            };
            const dispatcher = new CommandDispatcher([ handler1, handler2 ]);
            const observable = dispatcher.dispatch(command);
            it('should handle the command', () => {
                expect(handler1.handle.mock.calls.length).toEqual(1);
                expect(handler2.handle.mock.calls.length).toEqual(1);
            });
            it('should subscribe to the domain event', () => {
                observable.subscribe((e) => {
                    expect(e).toEqual(domainEvent);
                });
            });
        });
    });
});
