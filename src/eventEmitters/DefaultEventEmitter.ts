import * as events from 'events';
import { IEventEmitter } from '../IEventEmitter';

export class DefaultEventEmitter extends events.EventEmitter implements IEventEmitter {

}
