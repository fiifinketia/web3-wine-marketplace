<template>
	<!-- Main box -->
	<q-scroll-area
		bordered
		class="main-filter-box dark-blue-border q-px-md"
		style="height: 85%; max-width: 100%; max-height: calc(100% - 200px)"
		:thumb-style="{
			right: '4px',
			borderRadius: '5px',
			backgroundColor: '#027be3',
			width: '5px',
			opacity: '0.75',
		}"
		:bar-style="{
			right: '2px',
			borderRadius: '9px',
			backgroundColor: '#027be3',
			width: '9px',
			opacity: '0.2',
		}"
	>
		<SidebarContents />
	</q-scroll-area>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import 'src/css/Marketplace/sidebar.css'
import SidebarContents from './SidebarContents.vue';

export default defineComponent({
	components: {
		SidebarContents: SidebarContents
	}
});
</script>

<style>

</style>
