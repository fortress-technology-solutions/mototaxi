import SynchronousCommandDispatcher from '../dispatchers/SynchronousCommandDispatcher';

describe('Synchronous Command Dispatcher', () => {
    describe('when dispatching a single command', () => {

        const matchingHandler = {
            type: 'killMickey',
            handle: () => {
                return { type: 'mickeyKilled' };
            },
        };

        const command = { type: 'killMickey', weapon: 'jackhammer'};

        describe('and only one handler which is a match', () => {
            const dispatcher = new SynchronousCommandDispatcher([ matchingHandler ]);
            it('should dispatch the command using the matching handler', async () => {
                const event = await dispatcher.dispatch(command);
                expect(event.length).toEqual(1);
                expect(event[0]).toEqual({ type: 'mickeyKilled' });
            });
        });

        describe('and all handlers are matches', () => {

            const dispatcher = new SynchronousCommandDispatcher([ matchingHandler, matchingHandler ]);

            it('should dispatch the command using all matching handlers', async () => {
                const event = await dispatcher.dispatch(command);
                expect(event.length).toEqual(2);
                expect(event[0]).toEqual({ type: 'mickeyKilled' });
                expect(event[1]).toEqual({ type: 'mickeyKilled' });
            });
        });

        describe('and some handlers are matches', () => {

            const nonMatchingHandler = {
                type: 'somethingElse',
                handle: jest.fn(),
            };

            const dispatcher = new SynchronousCommandDispatcher(
                [ matchingHandler, nonMatchingHandler, matchingHandler ]);

            it('should dispatch the command using all matching handlers', async () => {
                const event = await dispatcher.dispatch(command);
                expect(event.length).toEqual(2);
                expect(event[0]).toEqual({ type: 'mickeyKilled' });
                expect(event[1]).toEqual({ type: 'mickeyKilled' });
            });
        });
    });
});
