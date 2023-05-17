<template>
	<q-dialog v-model="dialog" position="left"  full-height persistent class="my-wallet-background help-center-dialog row justify-end">
		<q-card class="q-pa-md" style="width: 100%">
			<q-card-section class="row justify-between no-wrap">
				<div class="row col no-wrap">
					<div
					  	:class="
							tab === 'topics' ?
							'cursor-pointer font-proxima-bold font-weight-700 font-size-18 line-height-26 spacing-02 dark-blue-color q-py-xs' :
							'cursor-pointer font-proxima-regular font-weight-400 font-size-18 line-height-26 spacing-02 dark-blue-color q-py-xs'
						"
						@click="openTopics"
					>HELP CENTER</div>
					<q-separator spaced="md" size="2px" vertical color="accent" />
					<div
						v-if="tab === 'subject'"
						class="no-pointer-events font-proxima-bold font-weight-700 font-size-18 line-height-26 spacing-02 dark-blue-color q-py-xs"
					>{{ faqs[subject].title.toUpperCase() }}</div>
					<div
						v-if="tab === 'support'"
						class="no-pointer-events font-proxima-bold font-weight-700 font-size-18 line-height-26 spacing-02 dark-blue-color q-py-xs"
					>CONTACT SUPPORT</div>

				</div>
				<img class="x-icon col-auto q-pa-sm" src="../../../public/images/x-icon.svg" alt="" @click="$emit('close-help-center')" />
			</q-card-section>
			<q-card-section v-if="tab !== 'support'" class="row justify-center no-wrap q-mt-lg">
				<div class="font-proxima-bold font-weight-700 font-size-20 line-height-24 spacing-02 text-primary">
					How can we help you?
				</div>
			</q-card-section>
			<q-card-section v-if="tab !== 'support'" class="column justify-center no-wrap q-mt-lg q-mx-auto">
				<div class="font-proxima-regular font-weight-400 font-size-18 line-height-22 spacing-02 text-center">
					Search for a question or topic,or find relevant ones below.
				</div>
				<div class="row q-my-xs justify-center">
					<q-input v-model="search" outlined class="col-9 q-mr-xs" placeholder="Search" dense>
						<template #prepend>
							<q-icon name="search" />
						</template>
					</q-input>
					<q-btn color="primary" label="GO" class="col-auto q-py-xs" unelevated />
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
							:key="topic.icon+topic.title"
							class="col-md-3 col-xs-5 topic-card"
							@click="setSubject(i)"
							flat
							bordered
						>
							<q-card-section class="q-ma-md">
								<div class="font-obviously-normal font-weight-400 font-size-18 line-height-26 spacing-02">
									{{ topic.title }}
								</div>
							</q-card-section>
							<q-card-section class="q-ma-md">
								<div
									v-for="subtitle in topic.subtitles"
									:key="topic.title+subtitle"
									class="font-proxima-regular text-caption">
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
							<q-expansion-item
								group="questions"
								hide-expand-icon
							>
								<template v-slot:header>
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
							<q-separator v-if="i !== faqs[subject].questions.length - 1"/>
						</div>
					</q-list>
				</q-tab-panel>
				<q-tab-panel name="support">
					<q-card class="column justify-evenly q-ma-md q-gutter-md" flat>
						<q-card-section class="row justify-center">
							<div class="font-proxima-regular font-weight-400 font-size-18 line-height-22 spacing-02 text-center">
								We will much appreciate if you add some more info so that we could have more productive communication at first message.
							</div>
						</q-card-section>
						<q-card-section class="row justify-center">
							<q-icon name="app:request-call" size="7rem" />
							<q-icon name="app:chat-us" size="7rem" />
							<q-icon name="app:email-us" size="7rem" />
						</q-card-section>
						<q-form class="column q-gutter-lg">
							<div class="text-start text-caption text-grey">
								{{ 'Name' }}
								<q-input outlined v-model="form_name" placeholder="Please enter your name" dense />
							</div>
							<div class="text-start text-caption text-grey">
								{{ 'Email' }}
								<q-input outlined v-model="form_email" type="email" placeholder="Please enter email" required dense />
							</div>
							<div class="text-start text-caption text-grey">
								{{ 'How can we help?' }}
								<q-input outlined v-model="form_message" type="textarea" placeholder="How can we help?" required dense />
							</div>
							<div class="row justify-end">
								<q-btn label="Send the message" color="primary" unelevated no-caps/>
							</div>
						</q-form>
					</q-card>
				</q-tab-panel>
			</q-tab-panels>
			<q-card-section v-if="tab !== 'support'" class="column justify-center">
				<div class="text-body text-center"> Can't find your answer? </div>
				<div class="text-bold text-center"> Ask our team! </div>
				<div class="row col-4 justify-center">
					<q-btn @click="openSupport" color="primary" label="Contact Support" no-caps unelevated />
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
  emits: ['close-help-center', 'open-contact-us'],
  props: {
  	openTab: String
  },
  data() {
    return {
	search: ref(''),
	faqs,
	tab: ref(this.openTab),
	subject: ref(0),
    };
  },
  updated () {
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
	}
  }
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
