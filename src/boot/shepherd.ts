import { boot } from 'quasar/wrappers'
import { useShepherd, StepOptions, Tour } from 'vue-shepherd'
import 'shepherd.js/dist/css/shepherd.css'
import { useTourStore } from 'src/stores/tour-state';

// Defining the $shepherd type to the global this keyword like the this.$router
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $shepherd: Tour;
  }
}



// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async ({ app, router, store }) => {

	// Creating a global tour object
	const tour = useShepherd({
		useModalOverlay: true,
	}) as Tour;

	const tourStore = useTourStore(store);

	// Adding steps to the tour
	const steps: StepOptions[] = [
		{
			id: 'welcome-step',
			attachTo: {
				element: '#welcome-step',
				on: 'bottom',
			},
			text: 'Welcome to the WiV Marketplace',
			buttons: [
				{
					text: 'Continue',
					action: () => {
						tour.next()
						tour.removeStep('welcome-step')
					},
				},
			],
		},
		{
			id: 'go-to-marketplace',
			attachTo: {
				element: '#go-to-marketplace',
				on: 'bottom',
			},
			text: 'Click here to go to the marketplace',
			scrollTo: {
				// Make sure the element is in the viewport
				behavior: 'smooth',
				block: 'end',
			},
			buttons: [
				{
					text: 'Skip',
					action: () => {
						tour.cancel()
						tourStore.setCompleted();
					}
				}
			]
		},
	]

	tour.addSteps(steps)


	// This would start the tour when the applications is loaded
	// TODO: Checking of the user has already done/completed the tour
	// Set timeout to wait for the DOM to load
	setTimeout(() => {
		console.log('reloaded')
		// If page is not the home page, do not start the tour
		if(router.currentRoute.value.path !== '/')
		{
			return;
		}
		tour.start()
	}, 3000)
	// Setting the this.$shepherd variable to the tour object we created
	// Doing this would make it accessible any where the project
	// As long as the component is Using the Optiond API
	app.config.globalProperties.$shepherd = tour as Tour;
})


