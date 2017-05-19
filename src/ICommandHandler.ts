export interface ICommandHandler {
    type: string;
    handle(command: ICommand) : Promise<any>;
}