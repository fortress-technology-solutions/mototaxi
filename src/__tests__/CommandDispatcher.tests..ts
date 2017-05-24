import { CommandDispatcher } from '../CommandDispatcher';
import { Subject } from '../Subject';

describe('The Command Dispatcher', () => {
    const matchingHandler = {
        type: 'killMickey',
        handle: jest.fn(),
    };
    const command = { type: 'killMickey' };
    const commandEmitter = {
            on: jest.fn(),
            emit: jest.fn(),
        };
    const domainEventEmitter = {
            on: jest.fn(),
            emit: jest.fn(),
        };
    describe('when setting up a command dispatcher for the first time', () => {
        jest.resetAllMocks();
        const dispatcher = new CommandDispatcher([ matchingHandler ], commandEmitter, domainEventEmitter);
        dispatcher.dispatch(command);
        it('should register domain events that come from command handlers', () => {
            const domainEvent = { type: 'mickeyKilled' };
            matchingHandler.handle.mockReturnValue(domainEvent);
            const registrationFunction = commandEmitter.on.mock.calls[0][1];
            registrationFunction(command);
            expect(domainEventEmitter.emit.mock.calls[0][0]).toBe(domainEvent.type);
            expect(domainEventEmitter.emit.mock.calls[0][1]).toBe(domainEvent);
        });
    });
    describe('when dispatching a single command', () => {
        describe('and wanting to subscribe to domain events', () => {
            jest.resetAllMocks();
            const dispatcher = new CommandDispatcher([ matchingHandler ], commandEmitter, domainEventEmitter);
            const result = dispatcher.dispatch(command);
            it('should return a subject', () => {
                expect(result).toBeInstanceOf(Subject);
            });
        });
        describe('and only one handler which is a match', () => {
            jest.resetAllMocks();
            const dispatcher = new CommandDispatcher([ matchingHandler ], commandEmitter, domainEventEmitter);
            it('should register the command handler with the command emitter', () => {
                expect(commandEmitter.on.mock.calls[0][0]).toBe(command.type);
            });
            describe('when dispatching the command', () => {
                dispatcher.dispatch(command);
                it('should dispatch the command using the matching handler', () => {
                    expect(commandEmitter.emit.mock.calls[0][0]).toBe(command.type);
                    expect(commandEmitter.emit.mock.calls[0][1]).toBe(command);
                });
            });
        });
        describe('and all handlers are matches', () => {
            jest.resetAllMocks();
            const dispatcher = new CommandDispatcher([ matchingHandler, matchingHandler ],
                                                     commandEmitter, domainEventEmitter);
            it('should register all command handlers with the command emitter', () => {
                expect(commandEmitter.on.mock.calls[0][0]).toBe(command.type);
            });
            describe('when dispatching the command', () => {
                dispatcher.dispatch(command);
                it('should dispatch the command using the matching handler', () => {
                    expect(commandEmitter.emit.mock.calls.length).toEqual(1);
                    expect(commandEmitter.emit.mock.calls[0][0]).toEqual(command.type);
                    expect(commandEmitter.emit.mock.calls[0][1]).toEqual(command);
                });
            });
        });
        describe('and some handlers are matches', () => {
            jest.resetAllMocks();
            const nonMatchingHandler = {
                type: 'somethingElse',
                handle: jest.fn(),
            };
            const dispatcher = new CommandDispatcher([ matchingHandler, nonMatchingHandler, matchingHandler ],
                                                     commandEmitter, domainEventEmitter);
            it('should register all command handlers with the command emitter', () => {
                expect(commandEmitter.on.mock.calls.length).toEqual(3);
                expect(commandEmitter.on.mock.calls[0][0]).toBe(command.type);
                expect(commandEmitter.on.mock.calls[1][0]).toBe(nonMatchingHandler.type);
                expect(commandEmitter.on.mock.calls[2][0]).toBe(command.type);
            });
            describe('when dispatching the command', () => {
                dispatcher.dispatch(command);
                it('should dispatch the command using the matching handler', () => {
                    expect(commandEmitter.emit.mock.calls.length).toEqual(1);
                    expect(commandEmitter.emit.mock.calls[0][0]).toEqual(command.type);
                    expect(commandEmitter.emit.mock.calls[0][1]).toEqual(command);
                    expect(nonMatchingHandler.handle.mock.calls.length).toEqual(0);
                });
            });
        });
    });
});
