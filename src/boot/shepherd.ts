import { boot } from 'quasar/wrappers'
import { useShepherd, Tour } from 'vue-shepherd'
import 'shepherd.js/dist/css/shepherd.css'

// Defining the $shepherd type to the global this keyword like the this.$router
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $shepherd: Tour;
  }
}



// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async ({ app }) => {

	// Creating a global tour object
	const tour = useShepherd({
		useModalOverlay: true,
	}) as Tour;


	// This would start the tour when the applications is loaded
	// TODO: Checking of the user has already done/completed the tour
	// Set timeout to wait for the DOM to load
	setTimeout(() => {
		tour.start()
	}, 3000)
	// Setting the this.$shepherd variable to the tour object we created
	// Doing this would make it accessible any where the project
	// As long as the component is Using the Optiond API
	app.config.globalProperties.$shepherd = tour as Tour;
})


