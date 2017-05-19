import { SynchronousCommandDispatcher } from '../dispatcher';

describe('Synchronous Command Dispatcher', () => {
    describe('when dispatching a single command', () => {

        const matchingHandler = {
            type: 'killMickey',
            handle: (command) => {
                return 'dead';
            }
        };

        const command = { type: 'killMickey', weapon: 'jackhammer'};

        describe('and only one handler which is a match', () => {
            var dispatcher = new SynchronousCommandDispatcher([ matchingHandler ]);
            it('should dispatch the command using the matching handler', async () => {
                const result = await dispatcher.dispatch(command);
                expect(result).toEqual(['dead']);
            });
        });

        describe('and all handlers are matches', () => {

            var dispatcher = new SynchronousCommandDispatcher([ matchingHandler, matchingHandler ]);

            it('should dispatch the command using all matching handlers', async () => {
                const result = await dispatcher.dispatch(command);
                expect(result).toEqual(['dead', 'dead']);
            });
        });

        describe('and some handlers are matches', () => {

            const nonMatchingHandler = {
                type: 'somethingElse'
            };

            const dispatcher = new SynchronousCommandDispatcher([ matchingHandler, nonMatchingHandler, matchingHandler ]);

            it('should dispatch the command using all matching handlers', async () => {
                const result = await dispatcher.dispatch(command);
                expect(result).toEqual(['dead', 'dead']);
            });
        });
    });
});