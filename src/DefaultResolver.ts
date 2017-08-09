import { IResolver } from "./IResolver";

export class DefaultResolver implements IResolver {
  resolve(handlerType) {
    return handlerType;
  }
}
