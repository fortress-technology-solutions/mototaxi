const Dispatcher = require('../lib').SynchronousCommandDispatcher;

//We should have some command handlers...
const sopranoHandler = {
    type: 'harmony',
    handle: (command) => {
        console.log(`Singing the soprano part of ${command.song}. La la la LA!`);
    }
}

const altoHandler = {
    type: 'harmony',
    handle: (command) => {
        console.log(`Singing the alto part of ${command.song}. La la LA la!`);
    }
}

const tenorHandler = {
    type: 'harmony',
    handle: (command) => {
        console.log(`Singing the tenor part of ${command.song}. La LA la la!`);
    }
}

const bassHandler = {
    type: 'harmony',
    handle: (command) => {
        console.log(`Singing the bass part of ${command.song}. LA la la la!`);
    }
}

const soloHandler = {
    type: 'solo',
    handle: (command) => {
        console.log(`Singing the big solo. Laaaaaa laaaa la la!`);
    }
}

//Need to get a dispatcher, preloaded with all the command handlers...
const commandHandlers = [ sopranoHandler, altoHandler, tenorHandler, bassHandler, soloHandler ];
const dispatcher = new Dispatcher(commandHandlers);

//Now, we can dispatch commands without caring what handlers might or might not handle them!
dispatcher.dispatch({ type: 'harmony', song: 'Free Bird' });
dispatcher.dispatch({ type: 'solo' });

//We can also subscribe to domainn events that are thrown as a result
const observable = dispatcher.dispatch({ type: 'solo' });
observable.subscribe('songFinished', (event) => {
    console.log('songFinished', event);
});
observable.subscribe('pageTurned', (event) => {
    console.log('pageTurned', event);
});

//and we can chain all that to make it prettier
dispatcher.dispatch({ type: 'solo' })
    .subscribe('songFinished', (event) => {
        console.log('songFinished', event);
    })
    .subscribe('pageTurned', (event) => {
        console.log('pageTurned', event);
    });
