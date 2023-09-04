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
          class="column justify-between calculator-first-part q-pa-md"
        >
          <div class="portfolio-calculation-title q-pt-md q-pl-md">
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
          <div v-if="$q.screen.width < 768" class="flex column justify-between q-pt-lg justify-center items-center">
            <div class="flex row calculation-images-container portfolio-calculation-mobile justify-between">
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
          <!-- <div class="help-section row justify-end">
            <q-btn
              class="calc-help-btn"
              no-caps
              flat
              dense
            >
              Help
            </q-btn>
          </div> -->
        </div>
        <div
          v-else-if="calculating === true && calculateWorth === false"
          class="flex column justify-center items-center calculator-first-part"
        >
          <div class="calculating">Calculating...</div>
          <div>
            <q-img
              src="../../assets/giffycanvas.svg"
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
              src="../../assets/giffycanvas.svg"
              width="130px"
              height="190px"
            />
          </div>
          <div class="take-time">It may take several a couple of minutes.</div>
        </div>
        <div
          v-else-if="showPrice === true && calculateWorth === false"
          class="column justify-center items-center calculator-first-part q-py-md"
        >
          <div class="q-pb-lg">
            <q-img
              src="../../assets/moneyPlant.svg"
              width="55px"
              height="117px"
            />
          </div>
          <div class="end-amount q-pt-sm">End amount</div>
          <div class="end-amount-price">${{ potentialReturn.toFixed(2) }}</div>
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
                  <div>$ {{ investmentPrincipal.toFixed(2) }}</div>
                </div>
              </div>
              <div class="q-pt-md">
                <div class="center">
                  <div class="form-element">
                    <q-slider
                      v-model="investmentPrincipal"
                      thumb-path="0"
                      :step="100"
                      snap
                      :inner-min="100"
                      :min="0"
                      :max="50000"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="flex column risk-level-container">
              <div class="risk-level-title q-pt-sm q-pb-md">Risk level</div>
              <div
                class="flex row risk-container items-center cursor-pointer"
                @click="riskType = 'low'"
              >
                <div
                  class="flex justify-center items-center unselected-border-wrapper"
                >
                  <div
                    :class="
                      riskType === 'low' ? 'selected-risk' : 'unselected-border'
                    "
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
              <div class="q-pt-sm cursor-pointer" @click="riskType = 'medium'">
                <div class="flex row risk-container items-center">
                  <div
                    class="flex justify-center items-center unselected-border-wrapper"
                  >
                    <div
                      :class="
                        riskType === 'medium'
                          ? 'selected-risk'
                          : 'unselected-border'
                      "
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
              <div class="q-pt-sm cursor-pointer" @click="riskType = 'high'">
                <div class="flex row risk-container items-center">
                  <div
                    class="flex justify-center items-center unselected-border-wrapper"
                  >
                    <div
                      :class="
                        riskType === 'high'
                          ? 'selected-risk'
                          : 'unselected-border'
                      "
                    ></div>
                    <!-- <q-radio v-model="risk" dense val="high" /> -->
                  </div>
                  <div class="flex column q-pl-md risk-wrapper">
                    <div class="flex row justify-between items-center">
                      <div class="risk-title">High Risk Portfolio</div>
                      <div class="high-risk-border"></div>
                    </div>
                    <div class="risk-desc q-pt-sm">
                      Very volatile, highly risky wines
                    </div>
                  </div>
                </div>
              </div>
              <div v-if="showButton">
                <div class="full-width continue-button-wrapper">
                  <q-btn
                    class="continue-button full-width"
                    no-caps
                    unelevated
                    @click="openCalculationPage()"
                  >
                    <div class="continue-text">Continue</div>
                  </q-btn>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          v-else
          class="column calculator-second-part full-height items-center"
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
                {{ investmentPrincipal }}
              </div>
            </div>
            <div class="flex row justify-between">
              <div class="starting-investment-text-bold">Risk level</div>
              <div class="starting-investment-number text-capitalize">
                {{ riskType }}
              </div>
            </div>
            <div class="flex column timing-container">
              <div class="flex row justify-between">
                <div class="starting-investment-text-bold">Timing</div>
                <div class="starting-investment-number">
                  <span id="value">
                    {{
                      Math.floor(investmentAge / 12)
                        ? `${Math.floor(investmentAge / 12)} Years`
                        : ' '
                    }}
                    {{
                      investmentAge % 12 ? `${investmentAge % 12} Months` : ''
                    }}</span
                  >
                </div>
              </div>
              <div class="q-pt-lg">
                <div class="form-element">
                  <q-slider
                    v-model="investmentAge"
                    thumb-path="0"
                    snap
                    :inner-min="3"
                    :step="1"
                    :min="0"
                    :max="120"
                    :debounce="500"
                  />
                </div>
              </div>
            </div>
            <div
              class="row justify-center full-width"
              :style="[
                calculationFinished
                  ? { paddingTop: '231px' }
                  : { paddingTop: '251px' },
              ]"
            >
              <q-btn
                v-if="calculationFinished === false"
                class="continue-button full-width"
                no-caps
                unelevated
                @click="calculateFinalWorth(riskType)"
              >
                <div class="continue-text">Calculate</div>
              </q-btn>
              <q-btn-group
                v-else
                unelevated
                stretch
                outline
                rounded
                class="calculate-again-button full-width"
              >
                <q-btn
                  class="full-width"
                  color="primary"
                  no-caps
                  outline
                  rounded
                  @click="resetWindow()"
                >
                  Go Back
                </q-btn>
                <q-btn
                  class="full-width"
                  color="primary"
                  no-caps
                  outline
                  rounded
                  @click="calculateFinalWorth(riskType)"
                >
                  Re-calculate
                </q-btn>
              </q-btn-group>
            </div>
            <q-btn
              v-if="calculationFinished === false"
              unelevated
              dense
              no-caps
              align="left"
              class="back-button q-py-lg"
              @click="activateBackButton()"
            >
              <img src="../../../public/images/back.svg" class="q-pr-xs" /> Back
            </q-btn>
            <q-btn
              v-else
              class="continue-button full-width q-mt-md"
              no-caps
              unelevated
            >
              <div class="continue-text">Check the wines</div>
            </q-btn>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import '../../css/WineCalculator/WineCalculator.css';
import { defineComponent } from 'vue';
import { ref } from 'vue';

function initialData() {
  return {
    riskType: 'low',
    calculating: false,
    showButton: true,
    secondSection: false,
    calculateWorth: false,
    calculationFinished: false,
    showPrice: false,
    potentialGain: ref(0),
    potentialReturn: ref(0),
    percentage: ref(0),
    firstStepMobile: true,
    secondStepMobile: false,
    thirdStepMobile: false,
    investmentPrincipal: 15000,
    investmentAge: 12,
  };
}
export default defineComponent({
  name: 'WineCalculator',
  data() {
    return initialData();
  },

  methods: {
    handleCalculation() {
      this.calculating = false;
    },
    openCalculationPage() {
      this.showButton = false;
      this.secondSection = true;
      this.firstStepMobile = false;
      this.secondStepMobile = false;
      this.thirdStepMobile = true;
    },

    calculateFinalWorth(type: string) {
      this.calculateWorth = true;

      setTimeout(() => {
        this.calculateWorth = false;
        this.calculationFinished = true;
      }, 500);

      switch (type) {
        case 'low':
          this.potentialGain =
            (this.investmentPrincipal * 1.08) ** (Math.floor(this.investmentAge / 12));
          break;
        case 'medium':
          this.potentialGain =
            (this.investmentPrincipal * 2.28) ** (Math.floor(this.investmentAge / 12));
          break;
        case 'high':
          this.potentialGain =
            (this.investmentPrincipal * 3.55) ** (Math.floor(this.investmentAge / 12));
          break;
        default:
          this.potentialGain = 0.0;
          break;
      }
      this.potentialReturn = this.investmentPrincipal + this.potentialGain;
      this.percentage =
        (this.potentialGain /
          this.investmentPrincipal) *
        100;
      this.showPrice = true;
    },
    activateBackButton() {
      this.secondSection = false;
      this.thirdStepMobile = false;
      this.firstStepMobile = true;
      this.showButton = true;
    },

    resetWindow() {
      Object.assign(this.$data, initialData());
    },
  },
});
</script>

<style></style>
