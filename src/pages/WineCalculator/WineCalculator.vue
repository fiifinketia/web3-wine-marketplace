<template>
	<q-page-container class="fit row wrap justify-center items-center">
		<q-img class="grape-img-left" src="../../../public/images/Grape-left.svg" />
		<q-img
			class="grape-img-right"
			src="../../../public/images/Grape-right.svg"
		/>
		<section id="greeting" class="col-6 text-center">
			<h5 class="text-bold welcome-to-calculator q-ma-none">
				Welcome to WiV investment calculator!
			</h5>
			<span class="row col-6 text-center welcome-to-calculator-desc"
				>Let’s count the worth you can get taking into account some
				factors.</span
			>
		</section>
		<section id="calculator" class="col-xs-12 col-sm-10 col-md-9 col-lg-7">
			<q-card
				flat
				class="fit row wrap justify-center items-center full-height"
				:bordered="$q.screen.width > 576"
				style="
					border-color: rgba(94, 151, 236, 0.27);
					border-radius: 20px;
					min-height: 50vh !important;
				"
			>
				<q-card-section
					:class="
						$q.screen.width > 576
							? 'col self-center calculator-first-part'
							: 'col-12 self-center calculator-first-part'
					"
					style="min-height: 50vh"
				>
					<h6 class="portfolio-calculation-title q-ma-sm">
						PORTFOLIO CALCULATION
					</h6>
					<div v-if="!calculating && !calculated">
						<div
							class="fit column wrap justify-start items-center content-center q-pa-md"
						>
							<div
								:class="
									stepNumber === 1 || stepNumber === 2
										? 'current-step flex column'
										: 'next-step flex column'
								"
							>
								<q-img
									src="../../assets/plant.svg"
									width="50px"
									height="50px"
								/>
								<div class="full-width">
									1.&nbsp; Please select the amount you would like to invest.
								</div>
							</div>
						</div>
						<div
							class="fit column wrap justify-start items-center content-center q-pa-md"
						>
							<div
								:class="
									stepNumber === 2
										? 'current-step flex column'
										: 'next-step flex column'
								"
							>
								<q-img
									src="../../assets/bombUnselected.svg"
									width="50px"
									height="50px"
								/>
								<div class="full-width">
									2.&nbsp; Pick the Risk level you are going to apply to your
									future portfolio.
								</div>
							</div>
						</div>
						<div
							class="fit column wrap justify-start items-center content-center q-pa-md"
						>
							<div
								:class="
									stepNumber === 3
										? 'current-step flex column'
										: 'next-step flex column'
								"
							>
								<q-img
									src="../../assets/hourglass.svg"
									width="40px"
									height="40px"
								/>
								<div class="full-width">
									3.&nbsp; Select the time you want to make the investment for
									to see possible.
								</div>
							</div>
						</div>
						<div
							class="fit column wrap justify-end items-end content-end q-mt-md"
						>
							<q-btn
								flat
								color="primary"
								label="Help"
								style="text-decoration: underline"
								no-caps
							/>
						</div>
					</div>
					<div
						v-else-if="calculating"
						class="flex column justify-center items-center"
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
					<div v-else-if="calculated">
						<div class="q-pb-lg">
							<q-img
								src="../../assets/moneyPlant.png"
								width="55px"
								height="117px"
							/>
						</div>
						<div class="end-amount q-pt-sm">End amount</div>
						<div class="end-amount-price">
							${{ investmentReturn.toFixed(2) }}
						</div>
						<div class="end-amount-percentage-title q-pt-lg">Percentage</div>
						<div class="end-amount-percentage">+{{ 20 }}%</div>
					</div>
				</q-card-section>
				<q-separator v-if="$q.screen.width > 576" color="accent" vertical />
				<q-card-section
					:class="$q.screen.width > 576 ? 'q-py-none col' : 'q-py-none col-12'"
				>
					<q-linear-progress
						:value="progress"
						class="q-ma-none"
						track-color="accent"
					/>

					<div v-if="stepNumber < 3">
						<div class="row q-ma-none q-pa-none justify-between">
							<h6 class="col q-ma-none q-pa-none starting-investment-text">
								Start Investment
							</h6>
							<h6
								class="col q-ma-none text-primary text-right text-bold starting-investment-number"
							>
								$ {{ Intl.NumberFormat('en-US').format(startingAmount) }}
							</h6>
						</div>
						<q-slider
							v-model="startingAmount"
							:min="0"
							:max="100000"
							track-color="accent"
							thumb-color="accent"
							thumb-size="35px"
							thumb-path="M5 5 h10 v10 h-10 v-10"
							track-size="26px"
						/>
						<q-list padding>
							<q-item
								v-ripple
								class="risk-container q-pa-none q-ma-xs"
								tag="label"
							>
								<q-item-section avatar>
									<q-radio v-model="riskLevel" val="low" color="green" />
								</q-item-section>
								<q-item-section>
									<q-item-label>Low Risk</q-item-label>
									<q-item-label caption
										>Steadily returning wines with low volatility.</q-item-label
									>
								</q-item-section>
							</q-item>

							<q-item
								v-ripple
								class="risk-container q-pa-none q-ma-xs"
								tag="label"
							>
								<q-item-section avatar>
									<q-radio v-model="riskLevel" val="medium" color="primary" />
								</q-item-section>
								<q-item-section>
									<q-item-label>Medium Risk</q-item-label>
									<q-item-label caption
										>Mostly high volume, high liquid investments.
									</q-item-label>
								</q-item-section>
							</q-item>

							<q-item
								v-ripple
								class="risk-container q-pa-none q-ma-xs"
								tag="label"
							>
								<q-item-section avatar>
									<q-radio v-model="riskLevel" val="high" color="red" />
								</q-item-section>
								<q-item-section>
									<q-item-label>High Risk</q-item-label>
									<q-item-label caption
										>Very volitile, highly risky wines.</q-item-label
									>
								</q-item-section>
							</q-item>
						</q-list>
						<q-btn
							v-if="stepNumber === 2"
							label="Continue"
							class="full-width continue-button continue-text"
							no-caps
							@click="stepNumber++"
						/>
					</div>
					<div
						v-else
						class="q-ma-none q-mt-lg column justify-between wrap full-height"
					>
						<div class="col">
							<div class="row q-ma-none q-pa-none justify-between">
								<h6 class="col q-ma-none q-pa-none starting-investment-text">
									Start Investment
								</h6>
								<h6
									class="col q-ma-none text-primary text-right text-bold starting-investment-number"
								>
									$ {{ Intl.NumberFormat('en-US').format(startingAmount) }}
								</h6>
							</div>
							<div class="row q-ma-none q-pa-none justify-between q-mb-lg">
								<h6 class="col q-ma-none q-pa-none starting-investment-text">
									Risk Level
								</h6>
								<h6
									class="col q-ma-none text-primary text-right text-bold starting-investment-number"
								>
									{{ riskLevel.charAt(0).toUpperCase() + riskLevel.slice(1) }}
								</h6>
							</div>

							<div class="row q-mt-lg q-pa-none q-pt-lg justify-between">
								<h6 class="col q-ma-none q-pa-none starting-investment-text">
									Timing
								</h6>
								<h6
									class="col q-ma-none text-primary text-right text-bold starting-investment-number"
								>
									{{ getYears(timing) }}
								</h6>
							</div>
							<q-slider
								v-model="timing"
								:step="1"
								:min="0"
								:max="100"
								track-color="accent"
								thumb-color="accent"
								thumb-size="35px"
								thumb-path="M5 5 h10 v10 h-10 v-10"
								track-size="26px"
							/>
						</div>
						<div class="col">
							<q-btn
								v-if="stepNumber === 3"
								label="Calculate"
								class="q-my-sm full-width continue-button continue-text"
								no-caps
								@click="calculate"
							/>
							<q-btn
								v-if="calculated"
								label="Check the Wines"
								class="q-my-sm full-width calculate-again-button"
								no-caps
							/>
							<div class="row q-pa-none justify-center">
								<q-btn
									v-if="stepNumber === 3 && (!calculating && !calculated)"
									label="Back"
									style="text-decoration: underline"
									no-caps
									flat
									icon="app:back"
									@click="stepNumber--"
								/>
								<q-btn
									v-if="calculating"
									label="Back"
									style="text-decoration: underline"
									no-caps
									flat
									icon="app:back"
									@click="calculating = false;"
								/>
								<q-btn
									v-if="calculated"
									label="Back"
									style="text-decoration: underline"
									no-caps
									flat
									icon="app:back"
									@click="calculated = false;"
								/>
							</div>
						</div>
					</div>
				</q-card-section>
			</q-card>
		</section>
	</q-page-container>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import '../../css/WineCalculator/WineCalculator.css';
import { getYears } from '../../utils';

export default defineComponent({
	name: 'WineCalculator',
	data() {
		return {
			stepNumber: 1,
			progress: ref(1 / 3),
			riskLevel: ref('none'),
			startingAmount: 0,
			timing: ref(0),
			calculated: false,
			calculating: false,
			investmentReturn: 0,
		};
	},
	watch: {
		riskLevel: {
			handler: function (val, prev) {
				if (val !== 'none' && prev === 'none') {
					this.stepNumber++;
					this.setProgress();
				}
			},
		},
	},
	methods: {
		setProgress() {
			this.progress = this.stepNumber / 3;
		},
		getYears: getYears,
		calculate() {
			this.calculating = true;
			this.investmentReturn = this.startingAmount + 0.2 * this.startingAmount;
			this.calculating = false;
			this.calculated = true;
		},
	},
});
</script>

<style>
.current-step {
	font-family: 'Proxima Nova';
	font-style: normal;
	font-weight: 700;
	font-size: 16px;
	line-height: 24px;
	color: #212131;
}
.current-step > img {
	color: #3586ff;
}
.next-step {
	font-family: 'Proxima Nova';
	font-style: normal;
	font-weight: 400;
	font-size: 16px;
	line-height: 24px;
	color: #9d9d9d;
	filter: grayscale();
}
@media screen and (max-width: 576px) {
	.next-step {
		display: none;
	}
}
</style>
