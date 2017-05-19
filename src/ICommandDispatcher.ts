import { ICommand } from "./ICommand";

export interface ICommandDispatcher {
    dispatch(command: ICommand): Promise<Array<any>>;
}