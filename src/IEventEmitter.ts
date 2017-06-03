export interface IEventEmitter {
    emit: (commandType: string, payload: any) => void;
    on: (commandType: string, action: (command) => any) => void;
}
