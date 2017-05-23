import { ICommand } from '../ICommand';
import { ICommandHandler } from '../ICommandHandler';
import { ICommandDispatcher } from '../ICommandDispatcher';
import { EventEmitter} from 'EventEmitter';

export default class EventEmitterCommandDispatcher implements ICommandDispatcher {

  constructor(private eventEmitter: EventEmitter) {
  }

  async dispatch(command: ICommand): Promise<any> {
    
    //emit the event, don't handle it


  }
}
