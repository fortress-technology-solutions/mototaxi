import { dispatch } from '..';

test('Command Dispatcher', async () => {
    const matchingHandler = {
        type: 'killMickey',
        handle: (command) => {
            return 'dead';
        }
    };

    const command = { type: 'killMickey', weapon: 'jackhammer'};

    const module = require('../command-handlers');
    module.getCommandHandlers = jest.fn(() => [ matchingHandler ]);

    const result = await dispatch(command);
    expect(result).toEqual(['dead']);
});