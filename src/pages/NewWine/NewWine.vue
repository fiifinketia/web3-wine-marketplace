<template>
	<div class="flex column justify-center items-center q-pt-lg">
		<div class="flex row">
			<input placeholder="Input Lwin" class="lwin-search" />
			<div class="q-pl-sm">
				<button class="search-button">Search</button>
			</div>
		</div>
		<div class="flex column">
			<input placeholder="Input case" class="lwin-search" />
			<input placeholder="Input format" class="lwin-search" />
		</div>
	</div>
</template>

<script>
import { defineComponent } from 'vue-demi';
import '../../css/NewWine/NewWine.css';
export default defineComponent({
	name: 'NewWine',
});
</script>

<style></style>
