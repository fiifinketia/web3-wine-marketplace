<template>
	<div class="calculator-header flex full-width items-center">
		<q-img class="grape-img-left" src="../../../public/images/Grape-left.svg" />
		<q-img
			class="grape-img-right"
			src="../../../public/images/Grape-right.svg"
		/>
		<!-- <q-img class="grape-mobile" src="../../../public/images/Grape-mobile.svg" /> -->
		<div class="flex column full-width items-center justify-center q-pt-lg">
			<div class="welcome-to-calculator">
				Welcome to WiV investment calculator!
			</div>
			<div class="q-pb-lg welcome-to-calculator-desc q-pt-sm">
				Let’s count the worth you can get taking into account some factors.
			</div>
			<div class="calculator flex row items-center">
				<div
					v-if="
						calculating === false &&
						calculateWorth === false &&
						showPrice === false
					"
					class="flex column calculator-first-part"
				>
					<div class="q-pl-lg q-pt-lg portfolio-calculation-title">
						Portfolio Calculation
					</div>
					<div
						class="flex column justify-between q-pt-lg portfolio-calculation-desktop"
					>
						<div class="flex justify-center">
							<div class="flex items-center column q-pt-lg plant-section">
								<q-img
									src="../../assets/plant.svg"
									width="50px"
									height="50px"
								/>
								<div
									:class="
										secondSection === false
											? 'current-step full-width'
											: 'next-step full-width'
									"
								>
									<div class="q-pr-sm">1.</div>
									<div>Please select the amount you would like to invest.</div>
								</div>
							</div>
						</div>
						<div class="flex justify-center">
							<div class="flex items-center column q-pt-lg plant-section">
								<q-img src="../../assets/bomb.svg" width="35px" height="50px" />
								<div class="q-pt-sm flex row full-width items-start">
									<div
										:class="
											secondSection === false
												? 'step-number q-pr-sm'
												: 'next-step-number q-pr-sm'
										"
									>
										2.
									</div>
									<div
										:class="
											secondSection === false
												? 'current-step'
												: 'next-step-second-version'
										"
									>
										Pick the Risk level you are going to apply to your future
										portfolio.
									</div>
								</div>
							</div>
						</div>
						<div class="flex justify-center q-pt-lg">
							<div class="flex items-center column q-pt-lg plant-section">
								<q-img
									src="../../assets/hourglass.svg"
									width="35px"
									height="40px"
								/>
								<div class="q-pt-sm flex row items-start">
									<div
										:class="
											secondSection === true
												? 'step-number q-pr-sm'
												: 'next-step-number q-pr-sm'
										"
									>
										3.
									</div>
									<div
										:class="
											secondSection === true ? 'current-step' : 'next-step'
										"
									>
										Select the time you want to make the investment for to see
										possible.
									</div>
								</div>
							</div>
						</div>
					</div>
					<div
						class="flex column justify-between q-pt-lg justify-center items-center"
					>
						<div
							class="flex row calculation-images-container portfolio-calculation-mobile justify-between"
						>
							<q-img src="../../assets/plant.svg" width="50px" height="50px" />
							<q-img
								src="../../assets/bombUnselected.svg"
								width="50px"
								height="50px"
							/>
							<q-img
								src="../../assets/hourglassUnselected.svg"
								width="50px"
								height="50px"
							/>
						</div>
						<div
							v-if="
								firstStepMobile === true &&
								secondStepMobile === false &&
								thirdStepMobile === false
							"
							class="step-mobile flex column"
						>
							<div>1.</div>
							<div>Please select the amount you would like to invest</div>
						</div>
						<div
							v-else-if="
								firstStepMobile === false &&
								secondStepMobile === true &&
								thirdStepMobile === false
							"
							class="step-mobile flex column"
						>
							<div>2.</div>
							<div>
								Pick the Risk level you are going to apply to your future
								portfolio.
							</div>
						</div>
						<div
							v-else-if="
								firstStepMobile === false &&
								secondStepMobile === false &&
								thirdStepMobile === true
							"
							class="step-mobile flex column"
						>
							<div>3.</div>
							<div>
								Select the time you want to make the investment for to see
								possible.
							</div>
						</div>
					</div>
					<div class="full-width flex justify-end q-pr-sm q-pt-lg help-section">
						Help
					</div>
				</div>
				<div
					v-else-if="calculating === true && calculateWorth === false"
					class="flex column justify-center items-center calculator-first-part"
				>
					<div class="calculating">Calculating...</div>
					<div>
						<q-img
							src="../../assets/giffycanvas.png"
							width="130px"
							height="190px"
						/>
					</div>
					<div class="take-time">It may take several a couple of minutes.</div>
				</div>
				<div
					v-else-if="calculateWorth === true && calculating === false"
					class="flex column justify-center items-center calculator-first-part"
				>
					<div class="calculating">Calculating the final worth</div>
					<div>
						<q-img
							src="../../assets/giffycanvas.png"
							width="130px"
							height="190px"
						/>
					</div>
					<div class="take-time">It may take several a couple of minutes.</div>
				</div>
				<div
					v-else-if="showPrice === true && calculateWorth === false"
					class="flex column justify-center items-center calculator-first-part"
				>
					<div class="q-pb-lg">
						<q-img
							src="../../assets/moneyPlant.png"
							width="55px"
							height="117px"
						/>
					</div>
					<div class="end-amount q-pt-sm">End amount</div>
					<div class="end-amount-price">${{ finalWorth.toFixed(2) }}</div>
					<div class="end-amount-percentage-title q-pt-lg">Percentage</div>
					<div class="end-amount-percentage">+{{ percentage.toFixed(2) }}%</div>
				</div>
				<div
					v-if="secondSection === false"
					class="flex full-height justify-center calculator-second-part"
				>
					<div class="calculator-second-part-wrapper flex column">
						<div v-if="secondSection === false" class="flex row q-pt-lg">
							<div class="line-2"></div>
							<div class="line-3"></div>
						</div>

						<div class="starting-investment-wrapper q-pt-lg">
							<div class="flex row justify-between">
								<div class="starting-investment-text">
									Starting investment (USD)
								</div>
								<div class="starting-investment-number">
									<div id="rangeValue">15000</div>
								</div>
							</div>
							<div class="q-pt-md">
								<div class="center">
									<div class="form-element">
										<input
											type="range"
											min="100"
											max="50000"
											value="15000"
											oninput="rangeValue.innerText = this.value"
										/>
									</div>
								</div>
							</div>
						</div>
						<div class="flex column">
							<div class="risk-level-title">Risk level</div>
							<div class="flex row risk-container items-center">
								<div
									class="flex justify-center items-center unselected-border-wrapper"
								>
									<div
										:class="
											lowRisk === true ? 'selected-risk' : 'unselected-border'
										"
										@click="calculateRisk('low')"
									></div>
								</div>
								<div class="flex column q-pl-md risk-wrapper">
									<div class="flex row justify-between items-center">
										<div class="risk-title">Low risk name</div>
										<div class="low-risk-border"></div>
									</div>
									<div class="risk-desc q-pt-sm">
										A short description of what it is and takes max two lines
									</div>
								</div>
							</div>
							<div class="q-pt-sm">
								<div class="flex row risk-container items-center">
									<div
										class="flex justify-center items-center unselected-border-wrapper"
									>
										<div
											:class="
												mediumRisk === true
													? 'selected-risk'
													: 'unselected-border'
											"
											@click="calculateRisk('medium')"
										></div>
									</div>
									<div class="flex column q-pl-md risk-wrapper">
										<div class="flex row justify-between items-center">
											<div class="risk-title">Mid risk name</div>
											<div class="medium-risk-border"></div>
										</div>
										<div class="risk-desc q-pt-sm">
											A shot description of what it is and takes max two lines
										</div>
									</div>
								</div>
							</div>
							<div class="q-pt-sm">
								<div class="flex row risk-container items-center">
									<div
										class="flex justify-center items-center unselected-border-wrapper"
									>
										<div
											:class="
												highRisk === true
													? 'selected-risk'
													: 'unselected-border'
											"
											@click="calculateRisk('high')"
										></div>
									</div>
									<div class="flex column q-pl-md risk-wrapper">
										<div class="flex row justify-between items-center">
											<div class="risk-title">High risk</div>
											<div class="high-risk-border"></div>
										</div>
										<div class="risk-desc q-pt-sm">
											A shot description of what it is and takes max two lines
										</div>
									</div>
								</div>
							</div>
							<div v-if="calculating === false && showButton === false">
								<div class="full-width continue-button-wrapper">
									<button
										class="continue-button full-width"
										@click="openCalculationPage()"
									>
										<div class="continue-text">Continue</div>
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div
					v-else
					class="flex column calculator-second-part full-height items-center q-pt-lg"
				>
					<div class="calculator-second-part-wrapper">
						<div v-if="secondSection === true" class="flex row q-pb-lg">
							<div class="line"></div>
						</div>
						<div class="flex row justify-between">
							<div class="starting-investment-text-bold">
								Starting investment (USD)
							</div>
							<div class="starting-investment-number">{{ money }}</div>
						</div>
						<div class="flex row justify-between">
							<div class="starting-investment-text-bold">Risk level</div>
							<div class="starting-investment-number">Mid Risk Name</div>
						</div>
						<div class="flex column timing-container">
							<div class="flex row justify-between">
								<div class="starting-investment-text-bold">Timing</div>
								<div class="starting-investment-number">
									<span id="timeRange">1 year</span>
								</div>
							</div>
							<div class="q-pt-lg">
								<div class="center">
									<div class="form-element">
										<input
											type="range"
											min="1"
											max="30"
											value="10"
											oninput="this.value < 10 ? timeRange.innerText = this.value + 'mos': this.value == 10 || this.value == 20 || this.value == 30 ? timeRange.innerText = this.value.slice(0,1) + 'year': timeRange.innerText = this.value.split('').join(' year ') +' mos'"
										/>
									</div>
								</div>
							</div>
						</div>
						<div class="calculate-button-wrapper full-width">
							<button
								class="continue-button full-width"
								@click="calculateFinalWorth(selectedRisk)"
							>
								<div class="continue-text">Calculate</div>
							</button>
						</div>
						<div class="q-pt-md back-button-wrapper">
							<div class="back-button" @click="activateBackButton()">Back</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import '../../css/WineCalculator/WineCalculator.css';
import { defineComponent } from 'vue-demi';

export default defineComponent({
	name: 'WineCalculator',
	data() {
		return {
			lowRisk: false,
			mediumRisk: false,
			highRisk: false,
			calculating: false,
			showButton: true,
			secondSection: false,
			calculateWorth: false,
			showPrice: false,
			money: Number(),
			time: Number(),
			moneyInvested: Number(),
			selectedRisk: String(),
			finalWorth: Number(),
			percentage: Number(),
			firstStepMobile: true,
			secondStepMobile: false,
			thirdStepMobile: false,
		};
	},

	methods: {
		handleCalculation() {
			this.calculating = false;
		},
		calculateRisk(type: string) {
			const number = document.getElementById('rangeValue')?.innerHTML;
			this.firstStepMobile = false;
			this.secondStepMobile = true;

			if (type === 'low') {
				this.lowRisk = true;
				this.mediumRisk = false;
				this.highRisk = false;
				this.selectedRisk = 'low';
				this.money = Number(number);
			} else if (type === 'medium') {
				this.lowRisk = false;
				this.mediumRisk = true;
				this.highRisk = false;
				this.money = Number(number);
				this.selectedRisk = 'medium';
			} else if (type === 'high') {
				this.lowRisk = false;
				this.mediumRisk = false;
				this.highRisk = true;
				this.money = Number(number);
				this.selectedRisk = 'high';
			}
			this.calculating = true;
			this.showButton = false;
			setInterval(() => {
				this.calculating = false;
			}, 3000);
		},
		openCalculationPage() {
			this.showButton = false;
			this.secondSection = true;
			this.firstStepMobile = false;
			this.secondStepMobile = false;
			this.thirdStepMobile = true;
		},

		calculateFinalWorth(type: string) {
			const time = document.getElementById('timeRange')?.innerHTML;
			if (time === '1year') {
				this.time = 10;
			} else if (time === '2year') {
				this.time = 20;
			} else if (time === '3year') {
				this.time = 30;
			}

			this.calculateWorth = true;

			setTimeout(() => {
				this.calculateWorth = false;
			}, 2000);
			if (type === 'low') {
				this.finalWorth = this.money * 1.08 * this.time;
				this.finalWorth.toFixed(2);
			} else if (type === 'medium') {
				this.finalWorth = this.money * 1.11 * this.time;
				this.finalWorth.toFixed(2);
			} else if (type === 'high') {
				this.finalWorth = this.money * 1.15 * this.time;
				this.finalWorth.toFixed(2);
			}
			this.percentage = ((this.finalWorth - this.money) / this.money) * 100;
			this.showPrice = true;
		},
		activateBackButton() {
			this.secondSection = false;
		},
	},
});
</script>

<style></style>
