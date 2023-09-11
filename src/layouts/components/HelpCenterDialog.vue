<template>
  <q-dialog
    persistent
    class="my-wallet-background help-center-dialog row justify-end"
  >
    <q-card class="q-pa-md" style="width: 100%">
      <q-card-section class="row justify-between no-wrap">
        <div class="row col no-wrap">
          <div
            :class="
              tab === 'topics'
                ? 'cursor-pointer font-proxima-bold font-weight-700 font-size-18 line-height-26 spacing-02 dark-blue-color q-py-xs'
                : 'cursor-pointer font-proxima-regular font-weight-400 font-size-18 line-height-26 spacing-02 dark-blue-color q-py-xs'
            "
            @click="openTopics"
          >
            HELP CENTER
          </div>
          <q-separator spaced="md" size="2px" vertical color="accent" />
          <div
            v-if="tab === 'subject'"
            class="no-pointer-events font-proxima-bold font-weight-700 font-size-18 line-height-26 spacing-02 dark-blue-color q-py-xs"
          >
            {{ faqs[subject].title.toUpperCase() }}
          </div>
          <div
            v-if="tab === 'support'"
            class="no-pointer-events font-proxima-bold font-weight-700 font-size-18 line-height-26 spacing-02 dark-blue-color q-py-xs"
          >
            CONTACT SUPPORT
          </div>
        </div>
        <img
          class="x-icon col-auto q-pa-sm"
          src="../../../public/images/x-icon.svg"
          alt=""
          @click="$emit('close-help-center')"
        />
      </q-card-section>
      <q-card-section
        v-if="tab !== 'support'"
        class="row justify-center no-wrap q-mt-lg"
      >
        <div
          class="font-proxima-bold font-weight-700 font-size-20 line-height-24 spacing-02 text-primary"
        >
          How can we help you?
        </div>
      </q-card-section>
      <q-card-section
        v-if="tab !== 'support'"
        class="column justify-center no-wrap q-mt-lg q-mx-auto"
      >
        <div
          class="font-proxima-regular font-weight-400 font-size-18 line-height-22 spacing-02 text-center"
        >
          Search for a question or topic,or find relevant ones below.
        </div>
        <div class="row q-my-xs justify-center">
          <q-input
            v-model="search"
            outlined
            class="col-9 q-mr-xs"
            placeholder="Search"
            dense
          >
            <template #prepend>
              <q-icon name="search" />
            </template>
          </q-input>
          <q-btn
            color="primary"
            label="GO"
            class="col-auto q-py-xs"
            unelevated
          />
        </div>
      </q-card-section>
      <q-tab-panels
        v-model="tab"
        animated
        transition-prev="jump-up"
        transition-next="jump-down"
      >
        <q-tab-panel name="topics">
          <q-card-section class="row q-my-md justify-evenly q-gutter-sm">
            <q-card
              v-for="(topic, i) in faqs"
              :key="topic.icon + topic.title"
              class="col-md-3 col-xs-5 topic-card"
              flat
              bordered
              @click="setSubject(i)"
            >
              <q-card-section class="q-ma-md">
                <div
                  class="font-obviously-normal font-weight-400 font-size-18 line-height-26 spacing-02"
                >
                  {{ topic.title }}
                </div>
              </q-card-section>
              <q-card-section class="q-ma-md">
                <div
                  v-for="subtitle in topic.subtitles"
                  :key="topic.title + subtitle"
                  class="font-proxima-regular text-caption"
                >
                  {{ subtitle }}
                </div>
              </q-card-section>
              <q-card-section class="row q-mx-md q-mb-xs justify-end">
                <q-icon :name="topic.icon" color="primary" size="32px" />
              </q-card-section>
            </q-card>
          </q-card-section>
        </q-tab-panel>
        <q-tab-panel name="subject">
          <q-list>
            <div
              v-for="(question, i) in faqs[subject].questions"
              :key="question.question"
            >
              <q-expansion-item group="questions" hide-expand-icon>
                <template #header>
                  <q-item-section avatar>
                    <q-icon color="primary" name="add" />
                  </q-item-section>

                  <q-item-section>
                    {{ question.question }}
                  </q-item-section>
                </template>
                <q-card class="q-my-md q-mx-xl">
                  <q-card-section>{{ question.answer }}</q-card-section>
                </q-card>
              </q-expansion-item>
              <q-separator v-if="i !== faqs[subject].questions.length - 1" />
            </div>
          </q-list>
        </q-tab-panel>
        <q-tab-panel name="support">
          <q-card class="column justify-evenly q-ma-md q-gutter-md" flat>
            <q-card-section class="row justify-center">
              <div
                class="font-proxima-regular font-weight-400 font-size-18 line-height-22 spacing-02 text-center"
              >
                We will much appreciate if you add some more info so that we
                could have more productive communication at first message.
              </div>
            </q-card-section>
            <q-card-section class="row justify-center">
              <q-icon name="app:email-us" size="7rem" />
            </q-card-section>
            <q-form
              class="column q-gutter-lg"
              @submit.prevent.stop="onSubmitMessage"
            >
              <div class="text-start text-caption text-grey">
                {{ 'Name' }}
                <q-input
                  v-model="form.name"
                  outlined
                  placeholder="Please enter your name"
                  dense
                  :rules="[
                    val => !!val || '* Required',
                    val => val.length > 4 || 'Please use minumum 4 characters',
                  ]"
                  lazy-rules
                />
              </div>
              <div class="text-start text-caption text-grey">
                {{ 'Email' }}
                <q-input
                  v-model="form.email"
                  outlined
                  type="email"
                  placeholder="Please enter email"
                  required
                  dense
                  :rules="[
                    val => !!val || '* Required',
                    val =>
                      /.+@.+\..+/.test(val) || 'Please enter a valid email',
                  ]"
                />
              </div>
              <div class="text-start text-caption text-grey">
                {{ 'How can we help?' }}
                <q-input
                  v-model="form.message"
                  outlined
                  type="textarea"
                  placeholder="How can we help?"
                  required
                  dense
                  :rules="[
                    val => !!val || '* Required',
                    val => val.length > 10 || 'Please use minimum 10 character',
                  ]"
                />
              </div>
              <div class="row justify-end">
                <q-btn
                  label="Send the message"
                  color="primary"
                  unelevated
                  no-caps
                  :loading="sendingMessage"
                  type="submit"
                />
              </div>
            </q-form>
          </q-card>
        </q-tab-panel>
      </q-tab-panels>
      <q-card-section v-if="tab !== 'support'" class="column justify-center">
        <div class="text-body text-center">Can't find your answer?</div>
        <div class="text-bold text-center">Ask our team!</div>
        <div class="row col-4 justify-center">
          <q-btn
            color="primary"
            label="Contact Support"
            no-caps
            unelevated
            @click="openSupport"
          />
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import faqs from 'src/shared/faqs.json';

export default defineComponent({
  name: 'HelpCenterDialog',
  props: {
    openTab: {
      type: String,
      required: true,
    },
  },
  emits: ['close-help-center', 'open-contact-us'],
  data() {
    return {
      search: ref(''),
      faqs,
      tab: ref(this.openTab),
      subject: ref(0),
      sendingMessage: ref(false),
      form: ref({
        name: '',
        email: '',
        message: '',
      }),
    };
  },
  updated() {
    this.tab = this.openTab;
  },
  methods: {
    setSubject(i: number) {
      this.subject = i;
      this.tab = 'subject';
    },
    openTopics() {
      this.tab = 'topics';
    },
    openSupport() {
      this.tab = 'support';
    },
    async onSubmitMessage() {
      this.sendingMessage = true;
      // Send the code
      const marketplaceAPIUrl = process.env.MARKETPLACE_API_URL;
      try {
        await this.$axios.post(`${marketplaceAPIUrl}/market/messenger/send-email`, {
          payload: {
            context: {
              name: this.form.name,
              from: this.form.email,
              message: this.form.message,
            },
            to: process.env.WIVMKT_SUPPORT_EMAIL,
						cc: this.form.email,
						headers: {
							'type' : 'contact_us'
						}
          },
          apiKey: process.env.MKTPLACE_API_KEY,
        });
      } catch (error) {
        this.$q.notify({
          type: 'negative',
          message: 'Something went wrong. Please try again later.',
        });
        throw error;
      } finally {
				this.sendingMessage = false;
			}
    },
  },
});
</script>
<style>
.topic-card {
  background: rgba(255, 255, 255, 0.85);
  /* Primary/blue */
  border: none;
  box-shadow: 0px 0px 7px rgba(0, 0, 0, 0.1) !important;
  border-radius: 14px;
  height: auto;
}

.topic-card:hover {
  border: 1px solid #3586ff;
}

@media screen and (min-width: 800px) {
  .help-center-dialog .q-dialog__inner {
    min-width: 70vw !important;
  }
}
@media screen and (max-width: 799px) {
  .help-center-dialog .q-dialog__inner {
    min-width: 100vw !important;
  }
}
</style>
