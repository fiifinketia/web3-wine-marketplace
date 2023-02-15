<template>
	<div class="flex column">
		<div class="flex column justify-center items-start q-pt-lg q-pl-lg">
			<div class="q-pb-lg">
				Number of NFTs currently on list(in database): {{ count }}
			</div>
			<div class="flex row">
				<input v-model="lwin" placeholder="Input Lwin" class="lwin-search" />
				<div class="q-pl-sm">
					<button id="input" class="search-button" @click="getNFTs(lwin)">
						Search
					</button>
				</div>
			</div>
			<div
				class="flex row items-center justify-between full-width q-pr-lg q-pt-sm"
			>
				<div>
					<input v-model="name" placeholder="Name" class="lwin-search" />
				</div>
				<div>
					<input
						v-model="packSize"
						placeholder="packSize"
						class="lwin-search"
					/>
				</div>
				<div>
					<input
						v-model="bottleSize"
						placeholder="Bottle Size (Format)"
						class="lwin-search"
					/>
				</div>
				<div>
					<input v-model="tokenID" placeholder="tokenID" class="lwin-search" />
				</div>
				<div>
					<input
						v-model="smartContract"
						placeholder="Smart Contract"
						class="lwin-search"
					/>
				</div>

				<div>
					<button
						class="submit-button"
						@click="
							sendWine(name, lwin, packSize, bottleSize, tokenID, smartContract)
						"
					>
						Submit
					</button>
				</div>
			</div>
		</div>
		<div v-if="showTable === true" class="flex justify-center q-pt-lg">
			<q-table
				v-model:selected="selected"
				title="Wines"
				:rows="rows"
				row-key="tokenID"
				selection="single"
				v-bind="filterWine()"
				:filter="filter"
			/>
		</div>
		<div v-else class="flex justify-center items-center q-pt-lg">
			{{ status }}
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue-demi';
import '../../css/NewWine/NewWine.css';
import { getAllNFTs, getListCount } from './service/getAllNFTs.service';
import { sendWineToList } from './service/sendWineToList.service';
import { SuggestedWinesResponseModel } from './models/Response/ResponseModel.model';
export default defineComponent({
	name: 'NewWine',
	setup() {
		const selected = ref([]);

		return {
			selected,
			filter: ref(''),
		};
	},

	data() {
		return {
			lwin: '',
			rows: new Array<SuggestedWinesResponseModel>(),
			name: '',
			bottleSize: '',
			packSize: '',
			tokenID: Number(),
			smartContract: '',
			price: Number() || '',
			status: '',
			showTable: false,
			count: Number(),
		};
	},
	mounted() {
		this.getCount();
	},
	methods: {
		async getNFTs(lwin: string) {
			this.showTable = true;

			this.rows = [];
			const result = await getAllNFTs(lwin);
			result.data.forEach((item: SuggestedWinesResponseModel) => {
				this.rows.push(item);
			});
		},
		filterWine() {
			this.selected.filter((item: any) => {
				this.lwin = item.lwin;
				this.name = item.name;
				this.bottleSize = item.format;
				this.packSize = item.case;
				this.tokenID = item.tokenID;
				this.smartContract = item.smartContractAddress;
			});
		},
		async sendWine(
			name: string,
			lwin: string,
			packSize: string,
			bottleSize: string,
			tokenID: number,
			smartContract: string
		) {
			const result = await sendWineToList(
				name,
				lwin,
				packSize,
				bottleSize,
				tokenID,
				smartContract
			);
			if (result.data === 'Duplicate') {
				this.status = 'The wine is already in the database';
				this.showTable = false;
			} else if (result.data === 'Not owner') {
				this.status = 'You dont own this wine';
				this.showTable = false;
			} else {
				this.status = 'Wine is successfully added in the database';
				this.showTable = false;
			}
		},
		async getCount() {
			const number = await getListCount();
			this.count = number;
		},
	},
});
</script>

<style></style>
