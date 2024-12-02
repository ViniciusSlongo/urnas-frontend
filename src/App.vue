<template>
  <div v-if="!hasElection">
    <div class="flex justify-center">
      <div class="bg-gray-300 rounded-lg p-3 w-80 item-center">
        <div class="text-2xl font-bold text-gray-500">Adicionar Eleição</div>

        <div class="mt-2 w-full">
          <div class="text-sm font-semibold">Nome da Eleição</div>
          <input
            class="w-11/12"
            type="text"
            v-model="newElection.nomeEleicao"
          />
        </div>
        <div class="mt-2 w-full">
          <div class="text-sm font-semibold">Candidatos</div>
          <div v-for="(c, index) in newElection.candidatos" :key="index">
            <div class="flex">
              <input class="w-11/12" type="text" v-model="c.nome" />
              <div
                v-show="index > 0"
                @click="removeCandidate(index)"
                class="fa fa-remove self-center ml-1 cursor-pointer hover:text-red-600"
              />
            </div>
          </div>
          <div class="flex justify-center">
            <div
              @click="addCandidate"
              class="cursor-pointer text-center text-xs mt-2 font-semibold px-2 py-1 rounded-md text-white bg-blue-500"
            >
              Adicionar Candidato
            </div>
          </div>
        </div>
        <hr class="mt-3 solid" />

        <div class="mt-2 w-full">
          <div class="text-sm font-semibold">Zonas Eleitorais</div>
          <div
            class="mt-2"
            v-for="(z, i) in newElection.zonasEleitorais"
            :key="index"
          >
            <div class="text-xs">Nome da Zona Eleitoral</div>
            <div class="flex">
              <input type="text" class="w-full" v-model="z.id" />
              <div
                v-show="i > 0"
                @click="removeElectoralZone(i)"
                class="fa fa-remove self-center ml-1 cursor-pointer hover:text-red-600"
              />
            </div>
            <div class="flex mt-2" v-for="(s, j) in z.secoes" :key="j">
              <div>
                <div class="text-xs">Nome da Seção</div>
                <input
                  type="text text-xs"
                  class="w-full text-xs"
                  v-model="s.id"
                />
              </div>
              <div class="ml-1">
                <div class="text-xs">Quantidade Eleitores</div>
                <div class="flex">
                  <input
                    type="text"
                    class="w-full text-xs"
                    v-model="s.quantidadeEleitores"
                  />
                  <div
                    v-show="j > 0"
                    @click="removeSection(i, j)"
                    class="fa fa-remove self-center ml-1 cursor-pointer hover:text-red-600"
                  />
                </div>
              </div>
            </div>
            <div class="flex justify-center">
              <div
                @click="addSection(i)"
                class="cursor-pointer text-center text-xs mt-2 font-semibold px-2 py-1 rounded-md text-white bg-blue-500"
              >
                Adicionar Seção
              </div>
            </div>
            <hr class="mt-3 solid" />
          </div>
          <div class="flex justify-center">
            <div
              @click="addElectoralZone"
              class="cursor-pointer text-center text-xs mt-2 font-semibold px-2 py-1 rounded-md text-white bg-blue-500"
            >
              Adicionar Zona Eleitoral
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex justify-center">
      <div
        @click="requests.createElection()"
        class="mt-2 bg-blue-500 text-center font-bold text-white cursor-pointer rounded-lg p-2 w-80 item-center"
      >
        Criar Eleição
      </div>
    </div>
  </div>
  <vote-counting
    v-else
    @update-results="handleUpdate"
    @update-sections="requests.fetchSectionStatus"
    :results="results"
    :results-filtered="resultsFiltered"
    :section-status="sectionStatus"
    :section-status-filtered="sectionStatusFiltered"
    :lastUpdated="lastUpdated"
    :election="electionData"
  />
</template>

<script setup>
import { computed, onMounted } from "vue";
import VoteCounting from "./components/VoteCounting.vue";
import useElection from "./composables/election";

const {
  requests,
  newElection,
  electionData,
  sectionStatus,
  sectionStatusFiltered,
  results,
  resultsFiltered,
  lastUpdated,
  addCandidate,
  removeCandidate,
  removeElectoralZone,
  removeSection,
  addElectoralZone,
  addSection,
} = useElection();

const hasElection = computed(() => {
  return electionData.value != null;
});

function handleUpdate(zoneId=null, sectionId=null) {
  requests.fetchResults(zoneId, sectionId);
  requests.fetchSectionStatus(zoneId, sectionId);
}

onMounted(() => {
  requests.fetchElections();
  requests.fetchResults();
  requests.fetchSectionStatus();
});
</script>

<style scoped>
input {
  @apply mt-1 border-black border-solid p-1  h-7;
  border-width: 1px;
  border-radius: 0.3rem;
}
hr.dashed {
  border-top: 3px dashed #bbb;
}

hr.dotted {
  border-top: 3px dotted #bbb;
}

hr.solid {
  border-top: 2px solid #bbb;
}

hr.rounded {
  border-top: 8px solid #bbb;
  border-radius: 5px;
}
</style>
