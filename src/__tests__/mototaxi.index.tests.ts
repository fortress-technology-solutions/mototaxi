// tslint:disable
import * as mototaxi from '../index';
import { ImmediateCommandDispatcher } from '../dispatchers/ImmediateCommandDispatcher';

describe('Getting a Dispatcher', () => {
    describe('with no config', () => {
        const dispatcher = mototaxi.getDispatcher();
        it('should return the dispatcher', () => {
            expect((dispatcher instanceof ImmediateCommandDispatcher)).toBeTruthy();
        });
    });
    describe('with full config', () => {
        const config = {
            commandHandlers: []
        };
        const dispatcher = mototaxi.getDispatcher(config);
        it('should return the dispatcher', () => {
            expect((dispatcher instanceof ImmediateCommandDispatcher)).toBeTruthy();
        });
    });
    describe('with no command handlers', () => {
        const config = {
        };
        const dispatcher = mototaxi.getDispatcher(config);
        it('should return the dispatcher', () => {
            expect((dispatcher instanceof ImmediateCommandDispatcher)).toBeTruthy();
        });
    });
});
