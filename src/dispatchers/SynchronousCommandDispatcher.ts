// tslint:disable

import { ICommand } from '../ICommand';
import { ICommandDispatcher } from '../ICommandDispatcher';
import { Observable } from 'rxjs/Observable';
import * as Rx from 'rxjs';
import { ILogger } from '../ILogger';
import { IResolver } from '../IResolver';

export class SynchronousCommandDispatcher implements ICommandDispatcher {
  constructor(
    private commandHandlers: any[],
    private resolver: IResolver,
    private logger: ILogger,
  ) {}

  private ignoredPrototypeFunctions = [
    'constructor',
    'toString',
    'toLocaleString',
    'join',
    'pop',
    'push',
    'concat',
    'reverse',
    'shift',
    'unshift',
    'slice',
    'splice',
    'sort',
    'filter',
    'forEach',
    'some',
    'every',
    'map',
    'indexOf',
    'lastIndexOf',
    'reduce',
    'reduceRight',
    'entries',
    'keys',
    'constructor',
    'toString',
    'toLocaleString',
    'valueOf',
    'hasOwnProperty',
    'isPrototypeOf',
    'propertyIsEnumerable',
    '__defineGetter__',
    '__lookupGetter__',
    '__defineSetter__',
    '__lookupSetter__',
  ];

  dispatch(command: ICommand): Observable<any> {
    const __this = this;
    return Rx.Observable
      .from(this.commandHandlers)
      .map(handler => {
        return __this.resolver.resolve(handler);
      })
      .flatMap(resolvedHandler => {
        const proto = Object.getPrototypeOf(resolvedHandler);
        const propNames = Object.getOwnPropertyNames(proto);
        const keys = Object.keys(resolvedHandler);
        const everythingOnThePrototype = propNames.concat(keys);
        const allFuncs = everythingOnThePrototype
          .filter(prop => typeof resolvedHandler[prop] === 'function')
          .filter(func => {
            const foundIntheList =
              this.ignoredPrototypeFunctions.indexOf(func) > -1;
            return !foundIntheList;
          });
        const functions = allFuncs.map(k => ({
          type: k,
          func: resolvedHandler[k],
          origin: resolvedHandler,
        }));
        return Rx.Observable.from(functions);
      })
      .filter(handler => {
        return handler.type === command.type;
      })
      .map(handler => {
        this.logger.log(`SyncCommandDispatcher: Handling ${command.type}...`);
        const result = handler.func.bind(handler.origin)(command);
        return result;
      });
  }
}
