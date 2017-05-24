import { DefaultEventEmitter } from '../../eventEmitters/DefaultEventEmitter';
import * as events from 'events';

describe('The Default Event Emitter', () => {
    describe('when setting up the default event emitter for the first time', () => {
        const eventEmitter = new DefaultEventEmitter();
        it('should be an instance of nodes EventEmitter', () => {
            expect(eventEmitter).toBeInstanceOf(events.EventEmitter);
        });
    });
});
