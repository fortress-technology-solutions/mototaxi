export interface IEventEmitter {
    on(event: string, listener: (event: any) => void);
    emit(event: string, ...args: any[]): void;
}
