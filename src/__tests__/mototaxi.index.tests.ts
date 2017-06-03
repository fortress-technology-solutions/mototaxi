// tslint:disable
import * as mototaxi from '../index';
import { CommandDispatcher } from '../CommandDispatcher';

describe('Getting a Dispatcher', () => {
    describe('with no config', () => {
        const dispatcher = mototaxi.getDispatcher();
        it('should return the dispatcher', () => {
            expect(dispatcher).toBeInstanceOf(CommandDispatcher);
        });
    });
    describe('with full config', () => {
        const config = {
            commandHandlers: []
        };
        const dispatcher = mototaxi.getDispatcher(config);
        it('should return the dispatcher', () => {
            expect(dispatcher).toBeInstanceOf(CommandDispatcher);
        });
    });
    describe('with no command handlers', () => {
        const config = {
        };
        const dispatcher = mototaxi.getDispatcher(config);
        it('should return the dispatcher', () => {
            expect(dispatcher).toBeInstanceOf(CommandDispatcher);
        });
    });
});
