// tslint:disable
import mototaxi from '../index';
import { CommandDispatcher } from '../CommandDispatcher';
import { DefaultEventEmitter } from '../eventEmitters/DefaultEventEmitter';

describe('Getting a Dispatcher', () => {
    describe('with no config', () => {
        const dispatcher = mototaxi.getDispatcher();
        it('should return the dispatcher', () => {
            expect((dispatcher instanceof CommandDispatcher)).toBeTruthy();
        });
    });
    describe('with full config', () => {
        const config = {
            commandEmitter: new DefaultEventEmitter(),
            domainEventEmitter: new DefaultEventEmitter(),
            commandHandlers: []
        };
        const dispatcher = mototaxi.getDispatcher(config);
        it('should return the dispatcher', () => {
            expect((dispatcher instanceof CommandDispatcher)).toBeTruthy();
        });
    });
    describe('with no command emitter', () => {
        const config = {
            domainEventEmitter: new DefaultEventEmitter(),
            commandHandlers: []
        };
        const dispatcher = mototaxi.getDispatcher(config);
        it('should return the dispatcher', () => {
            expect((dispatcher instanceof CommandDispatcher)).toBeTruthy();
        });
    });
    describe('with no domain event emitter', () => {
        const config = {
            commandEmitter: new DefaultEventEmitter(),
            commandHandlers: []
        };
        const dispatcher = mototaxi.getDispatcher(config);
        it('should return the dispatcher', () => {
            expect((dispatcher instanceof CommandDispatcher)).toBeTruthy();
        });
    });
    describe('with no command handlers', () => {
        const config = {
            commandEmitter: new DefaultEventEmitter(),
            domainEventEmitter: new DefaultEventEmitter(),
        };
        const dispatcher = mototaxi.getDispatcher(config);
        it('should return the dispatcher', () => {
            expect((dispatcher instanceof CommandDispatcher)).toBeTruthy();
        });
    });
});
