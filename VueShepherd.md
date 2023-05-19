# Vue-Shepherd

Vue-Shepherd is a library that allows you to create a tour for your Vue.js application. It is a wrapper around [Shepherd.js](https://shepherdjs.dev/), a library for creating guided tours for websites and single-page apps.

## Installation

```bash
npm install vue-shepherd @popperjs/core
```

## Usage

To use vue-shepherd we have to setup a boot file to add the VueShepherd as a plugin.
A boot file is a simple JavaScript file which can optionally export a function.
Quasar will then call the exported function when it boots the application and additionally pass an object with the following properties to the function.

1. Setting Up the boot file
     1. First you have to create a boot file using the `quasar new boot shepherd`
     2. This would create a boot file in the `src/boot` directory
     3. The boot file is wrapped in boot() higher order function.
     4. It would look like this
   	 	```
   	 	import { boot } from 'quasar/wrappers'

   		export default boot(async ({ app, router, store }) => {
   			// something to do
   			await something()
   		})
   		```
     5. We then have to add it to the boot properties in the `quasar.config.js` file
      	`boot: ['shepherd']`

2. We can now initialize out tour object using the `useShepherd()` hook
	 ```
		import { useShepherd } from 'vue-shepherd'
		export default boot(async ({ app, router, store }) => {
			const tour = useShepherd({
				useModalOverlay: true, // This would tell shepherd to use modals over the Page's view
			})

			// this would initialize the tour variable gloabally as this.$shepherd
			app.config.globalProperties.$shepherd = tour as Tour;
		})
	 ```

3. To Make use typescript knows what we mean when we say `this.$shepherd` we add they types to the vue gloabal module, this could be done in the `boot/shepherd.ts` file
   ```
	 	declare module '@vue/runtime-core' {
			interface ComponentCustomProperties {
				$shepherd: Tour;
			}
		}
	 ```
4. We can now add steps and start the tour anywhere:
	 ```
		export default boot(async ({ app, router, store }) => {
			const tour = useShepherd({
				useModalOverlay: true, // This would tell shepherd to use modals over the Page's view
			})

			const step: StepOptions = {
				id: 'step1',
				attachTo: {
					element: '#step1',
					on: 'bottom',
				},
				title: 'Step 1',
				text: 'This is the first step',
				buttons: [
					{
						text: 'Next',
						action: () => {
							tour.next()
						},
					},
				],
			},

			tour.addStep(step)

			tour.addSteps([step]) // We could use the add Steps and pass in an array of multiple steps in order
			tour.start()

			// this would initialize the tour variable gloabally as this.$shepherd
			app.config.globalProperties.$shepherd = tour as Tour;

			// this can also ne done in the component by
			this.$shepherd.addStep()
			this.$shepherd.start()
		})
	 ```

## Typescript

Since the 'vue-shepherd' library does not have typescript definitions yet, we have to:

1. Declare the `useShepherd` hook as a function that returns a `Tour` object
	 ```
	 declare module 'vue-shepherd' {
	 	export function useShepherd(options: ShepherdOptions): Tour;
	 }
	 ```
2. Add all the types definitions for the the library has to be defined in the project manually. They can be found at [https://github.com/shipshapecode/shepherd/tree/master/src/types](https://github.com/shipshapecode/shepherd/tree/master/src/types)

## Pages

### Home

The user would be guided through the main layout of the application to do the following:

- [ ] Check WiV is about
- [ ] Check age confirmation
- [ ] Go through page to understand breifly what it is about and how it works
- [ ] Connect your wallet
- [ ] Go to marketplace

### Marketplace

#### Marketplace - Main (All NFTs)

The user would be guided through the marketplace page of the application to do the following:

- [ ] Check the NFTs
- [ ] Check the types of NFTs (Wines metadata fields/ Filters)
- [ ] Select favorite NFTs from list
- [ ] Check NFTs listed for sale
- [ ] Select an NFT to view Metadata Page

#### Marketplace - Metadata Page

The user would be guided through the NFT metadata page of the application to do the following:

- [ ] Check the type of options available for purchasing the NFT
- [ ] If users wants to make an offer, click on the "Make an Offer" button
- [ ] Enter the details and make sure your metamask is connected and has enough funds to make the offer
- [ ] If Buy Now is available, click on the "Buy Now" button and do same
- [ ] If users makes an offer either by "Make an Offer" or "Buy Now", the user would be redirected to the Profile page
- [ ] Else user scroll down to view detailed information about the NFT
- [ ] Open other tabs in About, Transactions section to view more information

#### Marketplace - Release Page

The user would be guided through the release page of the application to do the following:

- [ ] Check the new NFTs

#### Marketplace - Recommended Page

The user would be guided through the recommended page of the application to do the following:

- [ ] Check the recommended NFTs

#### Profile Page

The user would be guided through the profile page of the application to do the following:

- [ ] Check the user's outgoing offers to other users (if any). Show them how they can cancel the offer.
- [ ] Check the user's incoming offers from other users (if any). Show them how they can accept or reject the offer
- [ ] Check the user's NFTs listed for sale (if any). Show them how they can edit the price of the NFT or delete the listing
- [ ] Check the user's transactions
