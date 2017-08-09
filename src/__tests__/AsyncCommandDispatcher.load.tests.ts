// tslint:disable
import { AsynchronousCommandDispatcher } from '../dispatchers/AsynchronousCommandDispatcher';
import { IEventEmitter } from '../IEventEmitter';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/mergeAll';
import { Observable } from 'rxjs/Observable';
import * as Rx from 'rxjs';

describe('The Asynchronous Command Dispatcher Under Load', () => {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;

  describe('when dispatching multiple commands', () => {
    const listeners: any = {};
    const emitted: any[] = [];

    const getRandomInt = (min, max) => {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min)) + min;
    };

    const eventEmitter: IEventEmitter = {
      addListener: (type, callback) => {
        listeners[type] = callback;
      },
      removeListener: listener => {},
      emit: (type, payload) => {
        const delay = getRandomInt(100, 2000);
        setTimeout(() => {
          listeners[type](payload);
          emitted.push(payload);
        }, delay);
      }
    };
    const console = {
      log: () => {}
    };
    const dispatcher = new AsynchronousCommandDispatcher(eventEmitter, console);

    describe('when subscribing to each dispatched observable', () => {
      const amountOfTestsToRun = 1000;

      it('should return the domain event when subscribing', done => {
        const observables: Observable<any>[] = [];
        for (let counter = 0; counter < amountOfTestsToRun; ++counter) {
          const id = `${getRandomInt(0, 1000000)}_id`;
          const observable: Observable<any> = dispatcher.dispatch({ type: id });
          observables.push(observable);
        }

        Rx.Observable.combineLatest(observables).subscribe(domainEvents => {
          emitted.forEach(eventEmitted => {
            expect(domainEvents).toContainEqual(eventEmitted);
          });
          done();
        });
      });
    });
  });
});
