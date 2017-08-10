// tslint:disable
import { SynchronousCommandDispatcher } from '../dispatchers/SynchronousCommandDispatcher';
import 'rxjs/add/operator/filter';

describe('The Synchronous Command Dispatcher', () => {
  describe('when dispatching a command', () => {
    describe('with the default resolver', () => {
      const resolver = { resolve: o => o };
      const domainEvent = { type: `tested` };
      const handlers = {
        test: cmd => domainEvent,
      };
      describe('with a single handler', () => {
        const command = { type: 'test' };
        const dispatcher = new SynchronousCommandDispatcher(
          [handlers],
          resolver,
          console,
        );
        const observable = dispatcher.dispatch(command);

        it('should return the domain event when subscribing', done => {
          expect(observable).not.toBeUndefined();
          observable.subscribe(e => {
            expect(e).toBe(domainEvent);
            done();
          });
        });
      });
    });
    describe('with a resolver that instantiates', () => {
      describe('with a class of handlers', () => {
        const resolver = {
          resolve: testHandler => new testHandler(),
        };
        const domainEvent = { type: `tested` };
        class handlers {
          test(cmd) {
            return domainEvent;
          }
          test2(cmd) {}
        }
        class handlers2 {
          test3(cmd) {}
          test4(cmd) {
            return domainEvent;
          }
        }
        describe('with a single handler', () => {
          const command = { type: 'test' };
          const dispatcher = new SynchronousCommandDispatcher(
            [handlers],
            resolver,
            console,
          );
          const observable = dispatcher.dispatch(command);

          it('should return the domain event when subscribing', done => {
            expect(observable).not.toBeUndefined();
            observable.subscribe(e => {
              expect(e).toBe(domainEvent);
              done();
            });
          });
        });
        describe('with a multiple handlers', () => {
          const command = { type: 'test4' };
          const dispatcher = new SynchronousCommandDispatcher(
            [handlers, handlers2],
            resolver,
            console,
          );
          const observable = dispatcher.dispatch(command);

          it('should return the domain event when subscribing', done => {
            expect(observable).not.toBeUndefined();
            observable.subscribe(e => {
              expect(e).toBe(domainEvent);
              done();
            });
          });
        });
      });

      describe('with a function of handlers', () => {
        const command = { type: 'test6' };
        const resolver = {
          resolve: testHandler => new testHandler(),
        };
        const domainEvent = { type: `tested` };
        function handlers3() {
          return {
            test5: cmd => {},
            test6: cmd => {
              return domainEvent;
            },
          };
        }
        const dispatcher = new SynchronousCommandDispatcher(
          [handlers3],
          resolver,
          console,
        );
        const observable = dispatcher.dispatch(command);

        it('should return the domain event when subscribing', done => {
          expect(observable).not.toBeUndefined();
          observable.subscribe(e => {
            console.log(e);
            expect(e).toBe(domainEvent);
            done();
          });
        });
      });
    });
  });
});
