describe('Command Dispatcher', () => {
    describe('when dispatching a single command', () => {

        const matchingHandler = {
            type: 'killMickey',
            handle: (command) => {
                return 'dead';
            }
        };

        const command = { type: 'killMickey', weapon: 'jackhammer'};

        describe('with one matching handler', () => {
            jest.mock('../command-handlers', () => ({
                getCommandHandlers: () => [ matchingHandler ]
            }));

            jest.resetModules();
            const dispatch = require('../index').dispatch;

            it('should dispatch the command using the matching handler', async () => {
                const result = await dispatch(command);
                expect(result).toEqual(['dead']);
            });
        });

        describe('with multiple matching handlers', () => {

            const anotherMatchingHandler = {
                type: 'killMickey',
                handle: (command) => {
                    return 'all the way';
                }
            };

            jest.setMock('../command-handlers', {
                getCommandHandlers: () => [ matchingHandler, anotherMatchingHandler ]
            });

            jest.resetModules();
            const dispatch = require('../index').dispatch;

            it('should dispatch the command using all matching handlers', async () => {
                const result = await dispatch(command);
                expect(result).toEqual(['dead', 'all the way']);
            });
        });
    });
});