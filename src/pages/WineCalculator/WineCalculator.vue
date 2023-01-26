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
			<div class="q-pb-xl q-mb-md welcome-to-calculator-desc q-pt-sm">
				Let’s count the worth you can get taking into account some factors.
			</div>
			<div class="calculator row items-center">
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
									v-if="secondSection === false"
									src="../../assets/plant.svg"
									width="50px"
									height="50px"
								/>
								<q-img
									v-else
									src="../../../public/images/plantGray.svg"
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
									1.&nbsp; Please select the amount you would like to invest.
								</div>
							</div>
						</div>
						<div class="flex justify-center">
							<div class="flex items-center column q-pt-lg plant-section">
								<q-img
									v-if="secondSection === false"
									src="../../assets/bomb.svg"
									width="35px"
									height="50px"
								/>
								<q-img
									v-else
									src="../../../public/images/bombGray.svg"
									width="35px"
									height="50px"
								/>
								<div class="q-pt-sm flex row full-width items-start">
									<div
										:class="
											secondSection === false
												? 'step-number '
												: 'next-step-number '
										"
									></div>
									<div
										:class="
											secondSection === false
												? 'current-step'
												: 'next-step-second-version'
										"
									>
										2.&nbsp; Pick the Risk level you are going to apply to your
										future portfolio.
									</div>
								</div>
							</div>
						</div>
						<div class="flex justify-center q-pt-lg">
							<div class="flex items-center column q-pt-lg plant-section">
								<q-img
									v-if="secondSection === false"
									src="../../assets/hourglass.svg"
									width="35px"
									height="40px"
								/>
								<q-img
									v-else
									src="../../../public/images/hourglass2.svg"
									width="31px"
									height="40px"
								/>
								<div
									class="q-pt-sm flex row items-start"
									style="align-self: start"
								>
									<div
										:class="
											secondSection === true
												? 'step-number '
												: 'next-step-number '
										"
									></div>
									<div
										:class="
											secondSection === true ? 'current-step' : 'next-step'
										"
									>
										3.&nbsp; Select the time you want to make the investment for
										to see possible.
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
					<div class="take-time">It may take a couple of seconds.</div>
				</div>
				<div
					v-else-if="calculateWorth === true && calculating === false"
					class="flex column justify-center items-center calculator-first-part"
				>
					<div class="calculating">Calculating the final worth...</div>
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
					<div class="calculator-second-part-wrapper column">
						<div v-if="secondSection === false" class="flex row q-py-lg">
							<div class="line-2"></div>
							<div class="line-3"></div>
						</div>

						<div class="starting-investment-wrapper q-pt-lg">
							<div class="flex row justify-between">
								<div class="starting-investment-text">
									Starting investment (USD)
								</div>
								<div class="starting-investment-number row">
									$&nbsp;
									<div id="rangeValue">15,000</div>
								</div>
							</div>
							<div class="q-pt-md">
								<div class="center">
									<div class="form-element">
										<input
											id="range"
											v-model="value"
											type="range"
											class="range"
											min="100"
											max="50000"
											oninput="rangeValue.innerText = this.value.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
											@input="updateSlider"
										/>
									</div>
								</div>
							</div>
						</div>
						<div class="flex column risk-level-container">
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
									<!-- <q-radio v-model="risk" dense val="low" /> -->
								</div>
								<div class="flex column q-pl-md risk-wrapper">
									<div class="flex row justify-between items-center">
										<div class="risk-title">Low Risk Portfolio</div>
										<div class="low-risk-border"></div>
									</div>
									<div class="risk-desc q-pt-sm">
										Steadily returning wines with low volatility
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
										<!-- <q-radio v-model="risk" dense val="medium" /> -->
									</div>
									<div class="flex column q-pl-md risk-wrapper">
										<div class="flex row justify-between items-center">
											<div class="risk-title">Medium Risk Portfolio</div>
											<div class="medium-risk-border"></div>
										</div>
										<div class="risk-desc q-pt-sm">
											Mostly high volume, high liquid investments
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
										<!-- <q-radio v-model="risk" dense val="high" /> -->
									</div>
									<div class="flex column q-pl-md risk-wrapper">
										<div class="flex row justify-between items-center">
											<div class="risk-title">High Risk Portfolio</div>
											<div class="high-risk-border"></div>
										</div>
										<div class="risk-desc q-pt-sm">
											Very volitile, highly risky wines
										</div>
									</div>
								</div>
							</div>
							<div>
								<div class="full-width continue-button-wrapper">
									<button
										class="continue-button full-width"
										@click="calculateRisk(risk)"
									>
										<div v-if="showButton" class="continue-text">Continue</div>
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div
					v-else
					class="flex column calculator-second-part full-height items-center"
				>
					<div class="calculator-second-part-wrapper column">
						<div v-if="secondSection === true" class="flex row q-py-lg">
							<div class="line"></div>
						</div>
						<div class="flex row justify-between">
							<div class="starting-investment-text-bold">
								Starting investment (USD)
							</div>
							<div class="starting-investment-number">
								{{ money }}
							</div>
						</div>
						<div class="flex row justify-between">
							<div class="starting-investment-text-bold">Risk level</div>
							<div class="starting-investment-number">
								{{ selectedRisk }}
							</div>
						</div>
						<div class="flex column timing-container">
							<div class="flex row justify-between">
								<div class="starting-investment-text-bold">Timing</div>
								<div class="starting-investment-number">
									<span>{{ timeValue }}</span>
								</div>
							</div>
							<div class="q-pt-lg">
								<div class="center">
									<div class="form-element">
										<input
											id="timeInput"
											v-model="timeValue"
											type="range"
											min="1"
											max="36"
											@input="updateTimeSlider"
										/>
									</div>
								</div>
							</div>
						</div>
						<div
							class="full-width"
							:style="[
								calculationFinished
									? { paddingTop: '231px' }
									: { paddingTop: '251px' },
							]"
						>
							<button
								v-if="calculationFinished === false"
								class="continue-button full-width"
								@click="calculateFinalWorth(selectedRisk)"
							>
								<div class="continue-text">Calculate</div>
							</button>
							<button
								v-else
								class="calculate-again-button full-width"
								@click="$router.go(0)"
							>
								Calculate again
							</button>
						</div>
						<div
							v-if="calculationFinished === false"
							class="back-button q-py-lg row items-center justify-start"
							@click="activateBackButton()"
						>
							<img src="../../../public/images/back.svg" class="q-pr-xs" /> Back
						</div>
						<button v-else class="continue-button full-width q-mt-md">
							<div class="continue-text">Check the wines</div>
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import '../../css/WineCalculator/WineCalculator.css';
import { defineComponent } from 'vue-demi';
import { ref } from 'vue';

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
			calculationFinished: false,
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
			value: 15000,
			timeValue: String(),
		};
	},

	mounted() {
		this.updateSlider();
	},

	methods: {
		updateSlider() {
			const progress = document.getElementById('range') as any;
			this.value = progress.value;
			progress.style.background = `linear-gradient(to right, #3586FF 0%, #3586FF ${
				this.value / 500
			}%, #fff ${this.value / 500}%, white 100%)`;
		},
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
				this.selectedRisk = 'Low';
			} else if (type === 'medium') {
				this.lowRisk = false;
				this.mediumRisk = true;
				this.highRisk = false;
				this.selectedRisk = 'Medium';
			} else if (type === 'high') {
				this.lowRisk = false;
				this.mediumRisk = false;
				this.highRisk = true;
				this.selectedRisk = 'High';
			}
			this.money = Number(number);
			this.calculating = true;
			setInterval(() => {
				this.calculating = false;
				this.showButton = true;
				this.openCalculationPage();
			}, 3000);
		},
		openCalculationPage() {
			this.showButton = false;
			this.secondSection = true;
			this.firstStepMobile = false;
			this.secondStepMobile = false;
			this.thirdStepMobile = true;
		},

		updateTimeSlider() {
			const progress = document.getElementById('timeInput') as any;
			this.timeValue = progress.value;
			progress.style.background = `linear-gradient(to right, #3586FF 0%, #3586FF ${Number(
				this.timeValue
			)}%, #fff ${Number(this.timeValue)}%, white 100%)`;
			let time = progress.value;
			if (time < 12) {
				this.timeValue = time + ' ' + 'months';
			} else if (time > 12 && time < 24) {
				for (let i: any; time > 12 && time < 24; ) {
					this.timeValue = '1 year' + ' ' + 1;
				}
				// this.timeValue = '1 year' + time;
			}
		},

		calculateFinalWorth(type: string) {
			const time = document.getElementById('timeInput');
			// const value = time.value;
			// if(time > 10 && time !== '1year')
			// if (time === '1year') {
			// 	this.time = 10;
			// } else if (time === '2year') {
			// 	this.time = 20;
			// } else if (time === '3year') {
			// 	this.time = 30;
			// }

			// oninput="this.value < 10 ? timeRange.innerText = this.value + 'mos': this.value == 10 || this.value == 20 || this.value == 30 ? timeRange.innerText = this.value.slice(0,1) + 'year': timeRange.innerText = this.value.split('').join(' year ') +' mos'"
			// if(time)

			this.calculateWorth = true;

			setTimeout(() => {
				this.calculateWorth = false;
				this.calculationFinished = true;
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
