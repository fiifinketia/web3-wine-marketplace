<template>
  <div class="timer-container row items-center justify-center q-py-sm">
    <span class="timer-end-label q-pr-sm"> Ends in </span>
    <div class="row items-center q-gutter-x-md">
      <div class="column q-gutter-y-xs items-center">
        <span class="timer-number">
          {{ days }}
        </span>
        <span class="timer-label">
          Dd
        </span>
      </div>
      <div class="column q-gutter-y-xs items-center">
        <span class="timer-number">
          {{ hours }}
        </span>
        <span class="timer-label">
          HH
        </span>
      </div>
      <div class="column q-gutter-y-xs items-center">
        <span class="timer-number">
          {{ minutes }}
        </span>
        <span class="timer-label">
          MM
        </span>
      </div>
      <div class="column q-gutter-y-xs items-center">
        <span class="timer-number">
          {{ seconds }}
        </span>
        <span class="timer-label">
          SS
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  props: {
    timeLeft: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      intervalID: undefined,
      remainingTime: {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
      }
    }
  },
  computed: {
    days() {
      return this.remainingTime.days;
    },
    hours() {
      return this.remainingTime.hours;
    },
    minutes() {
      return this.remainingTime.minutes;
    },
    seconds() {
      return this.remainingTime.seconds;
    }
  },
  mounted() {
    this.StartTimer();
  },
  unmounted() {
    this.StopTimer();
  },
  methods: {
    GetTimeRemaining (expTime: number) {
      const total = (expTime * 1000) - Date.now();
      const days = Math.floor(total / (1000 * 60 * 60 * 24));
      const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((total / 1000 / 60) % 60);
      const seconds = Math.floor((total / 1000) % 60);
      return {
        days,
        hours,
        minutes,
        seconds
      }
    },
    StartTimer () {
      this.intervalID = setInterval(() => {
        this.remainingTime = this.GetTimeRemaining(this.timeLeft)
      }, 1000) as any // eslint-disable-line
    },
    StopTimer() {
      clearInterval(this.intervalID);
    }
  }
})
</script>

<style>

</style>