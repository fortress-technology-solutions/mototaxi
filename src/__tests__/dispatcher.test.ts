import { SynchronousCommandDispatcher } from '../SynchronousCommandDispatcher';

describe('Synchronous Command Dispatcher', () => {
    describe('when dispatching a single command', () => {

        const matchingHandler = {
            type: 'killMickey',
            handle: jest.fn(),
        };

        const command = { type: 'killMickey', weapon: 'jackhammer'};

        describe('and only one handler which is a match', () => {
            const dispatcher = new SynchronousCommandDispatcher([ matchingHandler ]);
            it('should dispatch the command using the matching handler', async () => {
                jest.clearAllMocks();
                await dispatcher.dispatch(command);
                expect(matchingHandler.handle.mock.calls.length).toEqual(1);
            });
        });

        describe('and all handlers are matches', () => {

            const dispatcher = new SynchronousCommandDispatcher([ matchingHandler, matchingHandler ]);

            it('should dispatch the command using all matching handlers', async () => {
                jest.resetAllMocks();
                await dispatcher.dispatch(command);
                expect(matchingHandler.handle.mock.calls.length).toEqual(2);
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
                jest.resetAllMocks();
                await dispatcher.dispatch(command);
                expect(matchingHandler.handle.mock.calls.length).toEqual(2);
                expect(nonMatchingHandler.handle.mock.calls.length).toEqual(0);
            });
        });
    });
});
