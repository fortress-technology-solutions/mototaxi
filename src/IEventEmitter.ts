export interface IEventEmitter {
  emit: (commandType: string, payload: any) => void;
  addListener: (commandType: string, action: (command) => any) => any;
  removeListener: (type: string, listener: any) => void;
}
