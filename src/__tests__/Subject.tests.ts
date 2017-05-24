// tslint:disable
import { Subject } from '../Subject';

describe('The Evented Subject', () => {
    describe('when subscribing to an event', () => {
        let subscriptionType;
        let eventHandled;
        const eventHandler = jest.fn();
        const domainEventToHandle = { type: 'someEvent' };
        const fakeEmitter = {
            on: (type, cb) => {
                subscriptionType = type;
                eventHandled = cb;
            },
            emit: (event: string, args: any[]) => {}
        };
        const subject = new Subject(fakeEmitter);
        describe('and only one event which is a match', () => {
            subject.subscribe(domainEventToHandle.type, eventHandler);
            it('should act on the event', () => {
                expect(subscriptionType).toBe(domainEventToHandle.type);
                expect(eventHandled).toEqual(eventHandler);
            });
        });
    });
    describe('when subscribing to multiple events', () => {
        const eventsHandled: any = [];
        const fakeEmitter = {
            on: (type, cb) => {
                eventsHandled.push({type, cb});
            },
            emit: (event: string, args: any[]) => {}
        };
        const event1 = { type: 'someEvent' };
        const event2 = { type: 'anotherEvent' };
        const subject = new Subject(fakeEmitter);

        subject
            .subscribe(event1.type, jest.fn())
            .subscribe(event2.type, jest.fn());

        it('should act on all events', () => {
            expect(eventsHandled.length).toBe(2);
            expect(eventsHandled[0].type).toBe(event1.type);
            expect(eventsHandled[1].type).toBe(event2.type);
        });
    });
});
