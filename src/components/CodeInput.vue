<template>
  <div
    :class="{
      'code-input-container': true,
      [className]: !!className,
    }"
  >
    <div class="code-input row">
      <p v-if="title" class="col title">{{ title }}</p>
      <p v-if="error" class="col-12 text-center text-negative text-bold text-body1">
        Invalid code, try again
      </p>
        <template v-for="(v, index) in values" :key="index">
          <input
            :ref="
              el => {
                if (el) inputs[index + 1] = el;
              }
            "
            class="col w-14 h-14 rounded-lg border border-gray outline-none focus:outline-none focus:border-primary focus:ring-0 text-center transition-all"
            type="number"
            pattern="[0-9]"
            :style="{
              width: fieldWidth ? `${props.fieldWidth}px` : '3rem',
              height: fieldHeight ? `${props.fieldHeight}px` : '3rem',
              // color: error ? 'red' : 'primary',
            }"
            :autoFocus="autoFocus && index === autoFocusIndex"
            :data-id="index"
            :value="v"
            :required="props.required"
            :disabled="props.disabled"
            maxlength="1"
            @input="onValueChange"
            @focus="onFocus"
            @keydown="onKeyDown"
          />
        </template>
      <q-inner-loading :showing="loading" />
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, ref, toRef, onBeforeUpdate } from 'vue';

const props = defineProps({
  className: {
    type: String,
    default: ''
  },
  fields: {
    type: Number,
    default: 3,
  },
  fieldWidth: {
    type: Number,
    default: undefined,
    required: false,
  },
  fieldHeight: {
    type: Number,
    default: undefined,
    required: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  error: {
    type: Boolean,
    default: false,
  },
  required: {
    type: Boolean,
    default: true,
  },
  title: {
    type: String,
    default: ''
  }
});

const emit = defineEmits(['change', 'complete']);

const KEY_CODE = {
  backspace: 8,
  delete: 46,
  left: 37,
  up: 38,
  right: 39,
  down: 40,
};

const values = ref([]);
const iRefs = ref([]);
const inputs = ref([]);
const fields = toRef(props, 'fields');
const autoFocusIndex = ref(0);
const autoFocus = true;

const initVals = () => {
  let vals;
  if (values.value && values.value.length) {
    vals = [];
    for (let i = 0; i < fields.value; i++) {
      vals.push(values.value[i] || '');
    }
    autoFocusIndex.value =
      values.value.length >= fields.value ? 0 : values.value.length;
  } else {
    vals = Array(fields.value).fill('');
  }
  iRefs.value = [];
  for (let i = 0; i < fields.value; i++) {
    iRefs.value.push(i + 1);
  }
  values.value = vals;
};

const onFocus = e => {
  e.target.select(e);
};

// eslint-disable-next-line no-use-before-define
const triggerChange = (values = values.value) => {
  const val = values.join('');
  emit('change', val);
  emit('complete', val.length >= fields.value);
};

const onValueChange = e => {
  const index = parseInt(e.target.dataset.id);
  e.target.value = e.target.value.replace(/[^\d]/gi, '');
  // this.handleKeys[index] = false;
  if (e.target.value === '' || !e.target.validity.valid) {
    return;
  }
  let next;
  const value = e.target.value;
  values.value = Object.assign([], values.value);
  if (value.length > 1) {
    let nextIndex = value.length + index - 1;
    if (nextIndex >= fields.value) {
      nextIndex = fields.value - 1;
    }
    next = iRefs.value[nextIndex];
    const split = value.split('');
    split.forEach((item, i) => {
      const cursor = index + i;
      if (cursor < fields.value) {
        values.value[cursor] = item;
      }
    });
  } else {
    next = iRefs.value[index + 1];
    values.value[index] = value;
  }
  if (next) {
    const element = inputs.value[next];
    element.focus();
    element.select();
  }
  triggerChange(values.value);
};

const onKeyDown = e => {
  const index = parseInt(e.target.dataset.id);
  const prevIndex = index - 1;
  const nextIndex = index + 1;
  const prev = iRefs.value[prevIndex];
  const next = iRefs.value[nextIndex];
  switch (e.keyCode) {
    case KEY_CODE.backspace: {
      e.preventDefault();
      const vals = [...values.value];
      if (values.value[index]) {
        vals[index] = '';
        values.value = vals;
        triggerChange(vals);
      } else if (prev) {
        vals[prevIndex] = '';
        inputs.value[prev].focus();
        values.value = vals;
        triggerChange(vals);
      }
      break;
    }
    case KEY_CODE.delete: {
      e.preventDefault();
      const vals = [...values.value];
      if (values.value[index]) {
        vals[index] = '';
        values.value = vals;
        triggerChange(vals);
      } else if (next) {
        vals[nextIndex] = '';
        inputs.value[next].focus();
        values.value = vals;
        triggerChange(vals);
      }
      break;
    }
    case KEY_CODE.left:
      e.preventDefault();
      if (prev) {
        inputs.value[prev].focus();
      }
      break;
    case KEY_CODE.right:
      e.preventDefault();
      if (next) {
        inputs.value[next].focus();
      }
      break;
    case KEY_CODE.up:
    case KEY_CODE.down:
      e.preventDefault();
      break;
    default:
      // this.handleKeys[index] = true;
      break;
  }
};

initVals();

onBeforeUpdate(() => {
  inputs.value = [];
});
</script>

<style scoped>
.code-input-container {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
}
.code-input {
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 10px;
}
.code-input > input {
  border: solid 1px #a8adb7;
  font-family: 'Lato';
  font-size: 20px;
  border-radius: 8px;
  text-align: center;
  transition: 0.2s all ease-in-out;
  color: #525461;
  box-sizing: border-box;
  -webkit-appearance: initial;
}
.code-input > input:focus {
  outline: none;
  border: 1px solid #006fff;
  caret-color: #006fff;
}
.title {
  margin: 0;
  height: 20px;
  padding-bottom: 10px;
}
</style>
