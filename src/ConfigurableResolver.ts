import { IResolver } from './IResolver';

export class ConfigurableResolver implements IResolver {
  constructor(private resolveFunc: (type) => any) {}

  resolve(handlerType) {
    return this.resolveFunc(handlerType);
  }
}
