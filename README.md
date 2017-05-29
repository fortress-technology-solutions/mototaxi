# Mototaxi

Installation:
`npm install --save mototaxi`

Usage:
```

//We should have some command handlers...
const sopranoHandler = {
    harmony: (command) => {
        console.log(`Singing the soprano part of ${command.song}. La la la LA!`);
        return { type: 'songFinished', name: command.song };
    }
}

const altoHandler = {
    harmony: (command) => {
        console.log(`Singing the alto part of ${command.song}. La la LA la!`);
        return { type: 'songFinished', name: command.song };
    }
}

const tenorHandler = {
    harmony: (command) => {
        console.log(`Singing the tenor part of ${command.song}. La LA la la!`);
        return { type: 'songFinished', name: command.song };
    }
}

const bassHandler = {
    harmony: (command) => {
        console.log(`Singing the bass part of ${command.song}. LA la la la!`);
        return { type: 'songFinished', name: command.song };
    }
}

const soloHandler = {
    solo: (command) => {
        console.log(`Singing the big solo. Laaaaaa laaaa la la!`);
        return { name: command.song };
    }
}

//Need to get a dispatcher, preloaded with all the command handlers...
const motoTaxi = require('mototaxi');
const commandHandlers = [ sopranoHandler, altoHandler, tenorHandler, bassHandler, soloHandler ];
const dispatcher = mototaxi.getDispatcher(commandHandlers);

//Now, we can dispatch commands without caring what handlers might or might not handle them!
dispatcher
    .dispatch({ type: 'solo' })
    .subscribe((s) => { console.log(s.name); });

dispatcher
    .dispatch({ type: 'harmony', song: 'Free Bird' })
    .filter((e) => e.type==='songFinished')
    .subscribe((s) => { console.log(s.name); });

dispatcher
    .dispatch({ type: 'solo' })
    .subscribe((s) => { console.log(s.name); });

```