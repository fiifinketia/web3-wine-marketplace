export function generateRandomColor() {
  const maxVal = 0xffffff; // 16777215
  let randomNumber = Math.random() * maxVal;
  randomNumber = Math.floor(randomNumber);
  const randColor = randomNumber.toString(16).padStart(6, '0');
  return randColor.toUpperCase();
}

/**
 * This code is defining a type PromiseResult which is either
 * {status: 'fulfilled'; value: T} indicating that the promise was fulfilled with a value of type T, or
 * {status: 'rejected'; reason: any} indicating that the promise was rejected with a reason of type any.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type PromiseResult<T> = { status: 'fulfilled'; value: T } | { status: 'rejected'; reason: any };


/**
 * The code also defines a function customAllSettled which takes an array of promises and
 * returns a promise of an array of PromiseResult.
 * This function wraps each promise using the map method and
 * returns a new promise by calling Promise.all on the mapped array.
 * @param promises
 * @returns Promise of type `PromiseResult<T>`
 */
export function customAllSettled<T>(promises: Promise<T>[]): Promise<PromiseResult<T>[]> {
  return Promise.all(
		/**
		 * Inside the map method, the function first attaches a
		 * .then callback which will be called when the promise resolves successfully.
		 * The callback wraps the result value in an object with the fulfilled status and
		 * then returns it. If the promise is rejected, the function attaches a
		 * .catch callback which catches the rejection reason and wraps it in an object with
		 * the rejected status and then returns it.
		 */
    promises.map(promise =>
      promise.then(value => ({ status: 'fulfilled' as const, value })).catch(reason => ({ status: 'rejected' as const, reason }))
    )
  );
}
