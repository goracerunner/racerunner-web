import wait from "p-min-delay";
import { timeout } from "promise-timeout";

/**
 * Wait for a promise between the specified amount of time. The promise will
 * not resolve until the minimum delay has elapsed. An error will be thrown
 * if the maximum wait time has been exceeded.
 * @param promise the promise to wait for
 * @param minDelay the minimum amount of time before the promise resolves
 * @param maxWait the maximum time the promise is allowed to resolve before an error is thrown
 */
export const waitFor = async <T>(
  promise: Promise<T>,
  minDelay: number,
  maxWait: number
) => {
  return await timeout<T>(wait<T>(promise, minDelay), maxWait);
};
