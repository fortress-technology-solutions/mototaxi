// tslint:disable
import { SynchronousCommandDispatcher } from "../dispatchers/SynchronousCommandDispatcher";
import "rxjs/add/operator/filter";

describe("The Synchronous Command Dispatcher", () => {
  describe("when dispatching a command with a resolver", () => {
    const command = { type: "test" };
    const domainEvent = { type: `tested` };
    const handler = function(dependency) {
      return {
        test: function(command) {
          return { domainEvent, dependency };
        }
      };
    };
    const console = {
      log: () => {}
    };
    const fakeDependency = { thing: 123 };
    const resolver = {
      resolve: testHandler => new testHandler(fakeDependency)
    };
    const dispatcher = new SynchronousCommandDispatcher(
      [handler],
      resolver,
      console
    );
    const observable = dispatcher.dispatch(command);

    describe("when subscribing to the dispatched observable", () => {
      it("should return the domain event when subscribing", done => {
        observable.filter(e => e.domainEvent === domainEvent).subscribe(e => {
          expect(e.domainEvent).toEqual(domainEvent);
          expect(e.dependency).toEqual(fakeDependency);
          done();
        });
      });
    });
  });
});
