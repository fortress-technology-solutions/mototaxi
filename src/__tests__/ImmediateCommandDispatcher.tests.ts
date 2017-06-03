// tslint:disable
import { ImmediateCommandDispatcher } from '../dispatchers/ImmediateCommandDispatcher';
import 'rxjs/add/operator/filter';

describe('The Immediate Command Dispatcher', () => {
    describe('when dispatching a command', () => {
      const command = { type: 'test' };
      const domainEvent = { type: `$(command.type) happened` };
      const handler = {
          test: (command) => {
              return domainEvent;
          }
      };
      const dispatcher = new ImmediateCommandDispatcher([handler]);
      const observable = dispatcher.dispatch(command);

      describe('when subscribing to the dispatched observable', () => {
        it('should return the domain event when subscribing', (done) => {
            observable
                .filter((e) => e === domainEvent)
                .subscribe((e) => {
                    expect(e).toEqual(domainEvent);
                    done();
                });
        });
      });
    });
});