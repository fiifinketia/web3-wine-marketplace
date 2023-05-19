/* eslint-disable */
declare module 'vue-shepherd' {
	export function useShepherd(options: TourOptions): Tour;

	interface Evented {
		on(event: string, handler: Function): void;

		once(event: string, handler: Function): void;

		off(event: string, handler?: Function): boolean | void;

		trigger(event: string): void;
	}

	export interface Step extends Evented {
		/**
		 * Create a step
		 * @param tour The tour for the step
		 * @param options The options for the step
		 * @return The newly created Step instance
		 */

		/**
		 * The string used as the `id` for the step.
		 */
		id: string;

		/**
		 * Cancel the tour
		 * Triggers the `cancel` event
		 */
		cancel(): void;

		/**
		 * Complete the tour
		 * Triggers the `complete` event
		 */
		complete(): void;

		/**
		 * Remove the step, delete the step's element, and destroy the FloatingUI instance for the step
		 * Triggers `destroy` event
		 */
		destroy(): void;

		/**
		 * Returns the element for the step
		 * @return The element instance. undefined if it has never been shown, null if it has been destroyed
		 */
		getElement(): HTMLElement | null | undefined;

		/**
		 * Returns the target for the step
		 * @returns The element instance. undefined if it has never been shown, null if query string has not been found
		 */
		getTarget(): HTMLElement | null | undefined;

		/**
		 * Returns the tour for the step
		 * @return The tour instance
		 */
		getTour(): Tour;

		/**
		 * Hide the step
		 */
		hide(): void;

		/**
		 * Check if the step is open and visible
		 * @return True if the step is open and visible
		 */
		isOpen(): boolean;

		/**
		 * Options for the step
		 */
		options: StepOptions;

		/**
		 * Wraps `_show` and ensures `beforeShowPromise` resolves before calling show
		 * @return Promise
		 */
		show(): Promise<void> | void;

		/**
		 * Updates the options of the step.
		 *
		 * @param {StepOptions} options to be updated
		 */
		updateStepOptions(options: StepOptions): void;
	}

	export interface StepOptions {
		/**
		 * The element the step should be attached to on the page.
		 * An object with properties `element` and `on`.
		 *
		 * ```js
		 * const step = new Step(tour, {
		 *   attachTo: { element: '.some .selector-path', on: 'left' },
		 *   ...moreOptions
		 * });
		 * ```
		 *
		 * If you don’t specify an attachTo the element will appear in the middle of the screen.
		 * If you omit the `on` portion of `attachTo`, the element will still be highlighted, but the tooltip will appear
		 * in the middle of the screen, without an arrow pointing to the target.
		 */
		attachTo?: StepOptionsAttachTo;

		/**
		 * An action on the page which should advance shepherd to the next step.
		 * It should be an object with a string `selector` and an `event` name
		 * ```js
		 * const step = new Step(tour, {
		 *   advanceOn: { selector: '.some .selector-path', event: 'click' },
		 *   ...moreOptions
		 * });
		 * ```
		 * `event` doesn’t have to be an event inside the tour, it can be any event fired on any element on the page.
		 * You can also always manually advance the Tour by calling `myTour.next()`.
		 */
		advanceOn?: StepOptionsAdvanceOn;

		/**
		 * Whether to display the arrow for the tooltip or not
		 */
		arrow?: boolean;

		/**
		 * A function that returns a promise.
		 * When the promise resolves, the rest of the `show` code for the step will execute.
		 */
		beforeShowPromise?: () => Promise<any>;

		/**
		 * An array of buttons to add to the step. These will be rendered in a
		 * footer below the main body text.
		 */
		buttons?: ReadonlyArray<StepOptionsButton>;

		/**
		 * Should a cancel “✕” be shown in the header of the step?
		 */
		cancelIcon?: StepOptionsCancelIcon;

		/**
		 * A boolean, that when set to false, will set `pointer-events: none` on the target.
		 */
		canClickTarget?: boolean;

		/**
		 * A string of extra classes to add to the step's content element.
		 */
		classes?: string;

		/**
		 * An extra class to apply to the `attachTo` element when it is
		 * highlighted (that is, when its step is active). You can then target that selector in your CSS.
		 */
		highlightClass?: string;

		/**
		 * The string to use as the `id` for the step.
		 */
		id?: string;

		/**
		 * An amount of padding to add around the modal overlay opening
		 */
		modalOverlayOpeningPadding?: number;

		/**
		 * An amount of border radius to add around the modal overlay opening
		 */
		modalOverlayOpeningRadius?:
			| number
			| {
					topLeft?: number;
					bottomLeft?: number;
					bottomRight?: number;
					topRight?: number;
				};

		/**
		 * Extra [options to pass to FloatingUI]{@link https://floating-ui.com/docs/tutorial/}
		 */
		floatingUIOptions?: object;

		/**
		 * Should the element be scrolled to when this step is shown?
		 */
		scrollTo?: boolean | ScrollIntoViewOptions;

		/**
		 * A function that lets you override the default scrollTo behavior and
		 * define a custom action to do the scrolling, and possibly other logic.
		 */
		scrollToHandler?: (element: HTMLElement) => void;

		/**
		 * A function that, when it returns `true`, will show the step.
		 * If it returns `false`, the step will be skipped.
		 */
		showOn?: () => boolean;

		/**
		 * The text in the body of the step. It can be one of four types:
		 * ```
		 * - HTML string
		 * - Array of HTML strings
		 * - `HTMLElement` object
		 * - `Function` to be executed when the step is built. It must return one of the three options above.
		 * ```
		 */
		text?:
			| string
			| ReadonlyArray<string>
			| HTMLElement
			| (() => string | ReadonlyArray<string> | HTMLElement);

		/**
		 * The step's title. It becomes an `h3` at the top of the step.
		 * ```
		 * - HTML string
		 * - `Function` to be executed when the step is built. It must return HTML string.
		 * ```
		 */
		title?: string | (() => string);

		/**
		 * You can define `show`, `hide`, etc events inside `when`. For example:
		 * ```js
		 * when: {
		 *   show: function() {
		 *     window.scrollTo(0, 0);
		 *   }
		 * }
		 * ```
		 */
		when?: StepOptionsWhen;
	}

	type PopperPlacement =
		| 'top'
		| 'top-start'
		| 'top-end'
		| 'bottom'
		| 'bottom-start'
		| 'bottom-end'
		| 'right'
		| 'right-start'
		| 'right-end'
		| 'left'
		| 'left-start'
		| 'left-end';

	interface StepOptionsAttachTo {
		element?:
			| HTMLElement
			| string
			| (() => HTMLElement | string | null | undefined);
		on?: PopperPlacement;
	}

	interface StepOptionsAdvanceOn {
		selector?: string;
		event?: string;
	}

	export interface StepOptionsButton {
		/**
		 * A function executed when the button is clicked on
		 * It is automatically bound to the `tour` the step is associated with, so things like `this.next` will
		 * work inside the action.
		 * You can use action to skip steps or navigate to specific steps, with something like:
		 * ```js
		 * action() {
		 *   return this.show('some_step_name');
		 * }
		 * ```
		 */
		action?: (this: Tour) => void;

		/**
		 * Extra classes to apply to the `<a>`
		 */
		classes?: string;

		/**
		 * Whether the button should be disabled
		 * When the value is `true`, or the function returns `true` the button will be disabled
		 */
		disabled?: boolean | (() => boolean);

		/**
		 * The aria-label text of the button
		 */
		label?: string | (() => string);

		/**
		 * A boolean, that when true, adds a `shepherd-button-secondary` class to the button.
		 */
		secondary?: boolean;

		/**
		 * The HTML text of the button
		 */
		text?: string | (() => string);
	}

	interface StepOptionsButtonEvent {
		[key: string]: () => void;
	}

	interface StepOptionsCancelIcon {
		enabled?: boolean;
		label?: string;
	}

	interface StepOptionsWhen {
		[key: string]: (this: Step) => void;
	}

	export interface Tour extends Evented {
		/**
		 * @param options The options for the tour
		 * @returns The newly created Tour instance
		 */
		// constructor(options?: Tour.TourOptions); //TODO superheri Note: Return on constructor is not possible in typescript. Could this be possible to make this the same for the constructor of the Step class?

		/**
		 * Adds a new step to the tour
		 * @param options An object containing step options or a Step instance
		 * @param index The optional index to insert the step at. If undefined, the step
		 * is added to the end of the array.
		 * @return The newly added step
		 */
		addStep(options: Step | StepOptions, index?: number): Step;

		/**
		 * Add multiple steps to the tour
		 */
		addSteps(steps: Array<object> | Array<Step>): Tour;

		/**
		 * Go to the previous step in the tour
		 */
		back(): void;

		/**
		 * Calls done() triggering the 'cancel' event
		 * If `confirmCancel` is true, will show a window.confirm before cancelling
		 * If `confirmCancel` is a function, will call it and wait for the return value,
		 * and only cancel when the value returned is true
		 */
		cancel(): void;

		/**
		 * Calls done() triggering the `complete` event
		 */
		complete(): void;

		/**
		 * Gets the step from a given id
		 * @param id The id of the step to retrieve
		 * @return The step corresponding to the `id` or null if no step matches the `id`
		 */
		getById(id: number | string): Step | null;

		/**
		 * Gets the current step
		 * @returns {Step|null}
		 */
		getCurrentStep(): Step | null;

		/**
		 * Hide the current step
		 */
		hide(): void;

		/**
		 * Tells if the tour is active
		 */
		isActive(): boolean;

		/**
		 * Go to the next step in the tour
		 * If we are at the end, call `complete`
		 */
		next(): void;

		/**
		 * Removes the step from the tour
		 * @param name The id for the step to remove
		 */
		removeStep(name: string): void;

		/**
		 * Show a specific step in the tour
		 * @param key The key to look up the step by
		 * @param forward True if we are going forward, false if backward
		 */
		show(key?: number | string, forward?: boolean): void;

		/**
		 * Start the tour
		 */
		start(): void;

		/**
		 * An array of Step instances
		 */
		steps: Array<Step>;
	}

	export interface TourOptions {
		/**
		 * The prefix to add to the `shepherd-enabled` and `shepherd-target` class names as well as the `data-shepherd-step-id`.
		 */
		classPrefix?: string;

		/**
		 * If true, will issue a `window.confirm` before cancelling
		 * If it is a function(support Async Function), it will be called and wait for the return value, and will only be cancelled if the value returned is true
		 */
		confirmCancel?:
			| boolean
			| (() => boolean)
			| Promise<boolean>
			| (() => Promise<boolean>);

		/**
		 * The message to display in the confirm dialog
		 */
		confirmCancelMessage?: string;

		/**
		 * Default options for Steps created through `addStep`
		 */
		defaultStepOptions?: StepOptions;

		/**
		 * Exiting the tour with the escape key will be enabled unless this is explicitly
		 * set to false.
		 */
		exitOnEsc?: boolean;

		/**
		 * Navigating the tour via left and right arrow keys will be enabled
		 * unless this is explicitly set to false.
		 */
		keyboardNavigation?: boolean;

		/**
		 * An optional container element for the steps. If not set, the steps will be appended to document.body.
		 */
		stepsContainer?: HTMLElement;

		/**
		 * An optional container element for the modal. If not set, the modal will be appended to document.body.
		 */
		modalContainer?: HTMLElement;

		/**
		 * An array of step options objects or Step instances to initialize the tour with
		 */
		steps?: Array<object> | Array<Step>;

		/**
		 * An optional "name" for the tour. This will be appended to the the tour's
		 * dynamically generated `id` property.
		 */
		tourName?: string;

		/**
		 * Whether or not steps should be placed above a darkened
		 * modal overlay. If true, the overlay will create an opening around the target element so that it
		 * can remain interactive
		 */
		useModalOverlay?: string | boolean;
	}
}
