<template>
  <div>
    <div class="flex justify-center">
      <div class="bg-white rounded-lg p-3 w-3/4 item-center">
        <div class="flex justify-between">
          <div class="text-sm font-semibold">
            {{ percentageSections }}% das seções totalizadas
          </div>
          <div
            class="flex bg-gray-200 rounded-lg cursor-pointer"
            @click="handleUpdateResults()"
          >
            <div class="self-center fa fa-refresh text-xs pl-2" />
            <div
              class="text-xs ml-1 self-center text-blue-500 font-semibold pr-2"
            >
              Atualizar
            </div>
          </div>
        </div>
        <div class="text-blue-500 font-semibold text-xs my-2">
          (Horário local)
        </div>
        <progressbar :progress="percentageSections" />
        <div class="text-xs font-semibold mt-1">
          Última atualização {{ lastUpdated }}
        </div>
      </div>
    </div>
    <div class="flex justify-center">
      <div class="w-3/4 py-3">
        <div class="font-semibold text-2xl text-gray-500">
          {{ election.nomeEleicao }}
        </div>
      </div>
    </div>
    <div class="flex justify-center">
      <div class="w-3/4">
        <div class="grid grid-cols-2 gap-2 w-full">
          <div
            v-for="(c, i) in results.candidatos"
            class="rounded-lg w-full bg-white"
          >
            <div class="p-3 flex justify-between">
              <div>
                <div class="text-xl font-bold mb-5">
                  {{ c.nomeCandidato }}
                </div>
                <div class="font-bold bg-blue-800 rounded-lg w-16">
                  <div class="text-white px-2 text-xs">1° Turno</div>
                </div>
              </div>
              <div>
                <div class="text-blue-500 text-xl font-bold text-right">
                  {{ c.percentualVotos }}%
                </div>
                <div class="font-semibold text-gray-500 text-sm text-right">
                  {{ c.quantidadeVotos }} votos
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex justify-center">
      <div class="w-3/4 py-3">
        <div class="font-semibold text-2xl text-gray-500">Totalização</div>
      </div>
    </div>

    <div class="flex justify-center mt-2">
      <div class="grid grid-cols-2 gap-2 w-3/4">
        <div class="bg-white rounded-lg p-3 item-center">
          <div class="font-semibold text-xl text-gray-500 mb-4">
            Eleitorado Apurado
          </div>
          <div class="flex">
            <div class="text-xs font-semibold mr-3">
              <div class="flex">
                <div class="rounded-sm mr-1 bg-blue-500 h-2 w-2 self-center" />
                <div>
                  {{ sectionStatus.totalEleitoresPresentes }}
                </div>
              </div>
              <div>Comparecimento</div>
            </div>
            <div class="text-xs font-semibold">
              <div class="flex">
                <div class="rounded-sm mr-1 bg-gray-500 h-2 w-2 self-center" />
                <div>
                  {{ sectionStatus.totalAbstencoes }}
                </div>
              </div>
              <div>Abstenção</div>
            </div>
          </div>
          <div class="mt-2">
            <div>
              <progressbar
                class="mb-4"
                color="bg-blue-500"
                :progress="sectionStatus.percentualPresentes"
                :show-progress="true"
              />
            </div>
            <div>
              <progressbar
                color="bg-gray-500"
                :progress="sectionStatus.percentualAbstencoes"
                :show-progress="true"
              />
            </div>
          </div>
        </div>
        <div class="bg-white rounded-lg p-3 item-center">
          <div class="font-semibold text-xl text-gray-500 mb-4">Votos</div>
          <div class="flex">
            <div class="text-xs font-semibold mr-3">
              <div class="flex">
                <div class="rounded-sm mr-1 bg-blue-500 h-2 w-2 self-center" />
                <div>
                  {{ results.totalVotosValidos }}
                </div>
              </div>
              <div>Votos Válidos</div>
            </div>
            <div class="text-xs font-semibold">
              <div class="flex">
                <div class="rounded-sm mr-1 bg-red-500 h-2 w-2 self-center" />
                <div>
                  {{ nullVotes }}
                </div>
              </div>
              <div>Votos Nulos</div>
            </div>
          </div>
          <div class="mt-2">
            <div>
              <progressbar
                class="mb-4"
                color="bg-blue-500"
                :progress="results.percentualVotosValidos"
                :show-progress="true"
              />
            </div>
            <div class="mt-2">
              <progressbar
                class="mb-4"
                color="bg-red-500"
                :progress="nullVotesPercentage"
                :show-progress="true"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex justify-center mt-2">
      <div class="bg-white rounded-lg p-3 w-3/4 item-center">
        <div class="grid grid-cols-3 gap-2 text-sm">
          <div>
            <div>Total Seções</div>
            <div class="font-bold">
              {{ sectionStatus.totalSecoes }}
            </div>
          </div>
          <div>
            <div>Seções Totalizadas</div>
            <div class="font-bold">
              {{ sectionStatus.secoesImportadas }}
            </div>
          </div>
          <div>
            <div>Não totalizadas</div>
            <div class="font-bold">
              {{ sectionStatus.totalSecoes - sectionStatus.secoesImportadas }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex justify-center mt-2">
      <div class="grid grid-cols-3 gap-2 w-3/4">
        <div class="rounded-lg p-1 item-center">
          <select
            v-model="selectedZone"
            class="border w-full rounded px-2 py-1"
          >
            <option value="" disabled selected>
              Selecione uma zona eleitoral
            </option>
            <option
              v-for="(zona, i) in election.zonasEleitorais"
              :key="i"
              :value="zona.id"
            >
              {{ zona.id }}
            </option>
          </select>
        </div>
        <div class="rounded-lg p-1 item-center">
          <select
            v-model="selectedSection"
            class="border w-full rounded px-2 py-1"
          >
            <option value="" disabled selected>
              Selecione uma seção
            </option>
            <option
              v-for="(zona, i) in filteredSections"
              :key="i"
              :value="zona.id"
            >
              {{ zona.id }}
            </option>
          </select>
        </div>
        <div
          @click="handleUpdateResults(selectedZone, selectedSection)"
          class="cursor-pointer self-center w-2/5 bg-blue-500 h-7 rounded-lg flex justify-center"
        >
          <div class="self-center px-3 text-white font-semibold">Buscar</div>
        </div>
      </div>
    </div>
    <div class="flex justify-center mt-2">
      <div class="bg-white rounded-lg p-3 w-3/4 item-center">
        <div class="text-xs mr-3 grid grid-cols-4 gap-2">
          <div class="">
            <div class="mr-1">Votos Válidos</div>
            <div class="flex mt-1">
              <div class="font-semibold">
                {{ resultsFiltered.totalVotosValidos }}
              </div>
              <div
                class="bg-blue-300 rounded-lg text-xs font-semibold self-center ml-1"
              >
                <div class="px-2">
                  {{ resultsFiltered.percentualVotosValidos }}%
                </div>
              </div>
            </div>
          </div>

          <div class="">
            <div class="mr-1">Total Eleitores Presentes</div>
            <div class="flex mt-1">
              <div class="font-semibold">
                {{ sectionStatusFiltered.totalEleitoresPresentes }}
              </div>
              <div
                class="bg-blue-300 rounded-lg text-xs font-semibold self-center ml-1"
              >
                <div class="px-2">
                  {{ sectionStatusFiltered.percentualPresentes }}%
                </div>
              </div>
            </div>
          </div>
          <div class="">
            <div class="mr-1">Total Abstenções</div>
            <div class="flex mt-1">
              <div class="font-semibold">
                {{ sectionStatusFiltered.totalAbstencoes }}
              </div>
              <div
                class="bg-blue-300 rounded-lg text-xs font-semibold self-center ml-1"
              >
                <div class="px-2">
                  {{ sectionStatusFiltered.percentualAbstencoes }}%
                </div>
              </div>
            </div>
          </div>
          <div class="">
            <div class="mr-1">Total Seções</div>
            <div class="font-semibold">
              {{ sectionStatusFiltered.totalSecoes }}
            </div>
          </div>
        </div>
        <div class="grid grid-cols-3 gap-2 w-full mt-2">
          <div
            class="mt-3 flex"
            v-for="(c, index) in resultsFiltered.candidatos"
            :key="index"
          >
            <div class="text-lg font-semibold">
              {{ c.nomeCandidato }}
            </div>
            <div
              class="bg-gray-300 rounded-lg text-xs font-semibold self-center ml-2"
            >
              <div class="px-2 flex">
                <div>
                  {{ c.quantidadeVotos }}
                </div>
                <div class="ml-1">Votos</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, defineProps, defineEmits, ref } from "vue";
import Progressbar from "./Progressbar.vue";

const props = defineProps({
  election: Object,
  results: Object,
  resultsFiltered: Object,
  sectionStatus: Object,
  sectionStatusFiltered: Object,
  lastUpdated: String,
});

const emits = defineEmits(["updateResults", "updateSections"]);

function handleUpdateResults(selectedZone = null, selectSection = null) {
  console.log(selectedZone)
  console.log(selectSection)
  emits("updateResults", selectedZone, selectSection);
}

const selectedZone = ref("");
const selectedSection = ref("");

const filteredSections = computed(() => {
  selectedSection.value = null;
  if (!selectedZone.value) return [];
  const zona = props.election.zonasEleitorais.find(
    (z) => z.id === selectedZone.value
  );
  return zona ? zona.secoes : [];
});

const nullVotesTotal = computed(() => {
  return (
    props.results.totalVotosValidos /
    (props.results.percentualVotosValidos / 100)
  );
});

const nullVotes = computed(() => {
  return nullVotesTotal?.value 
    ? nullVotesTotal.value - props.results.totalVotosValidos 
    : 0;
});

const nullVotesPercentage = computed(() => {
  if (nullVotesTotal.value === 0) {
    return 0;
  }
  return nullVotes.value ? ((nullVotes.value / nullVotesTotal.value) * 100).toFixed(2) : 0
});

const percentageSections = computed(() => {
  if (props.sectionStatus.totalSecoes === 0) {
    return 0;
  }
  return (
    (props.sectionStatus.secoesImportadas / props.sectionStatus.totalSecoes) *
    100
  ).toFixed(2)
});
</script>

<style></style>
