import { ref, reactive, computed, nextTick } from "vue";
import ApiElection from "../api/backend/urnasBackend";

export default function useElection() {
  const api = new ApiElection();

  const secoes = reactive([
    {
      id: "",
      zonaEleitoralId: "",
      quantidadeEleitores: 0,
    },
  ]);

  const candidatos = reactive([
    {
      nome: "",
    },
  ]);

  const zonasEleitorais = reactive([
    {
      id: "",
      secoes: secoes,
    },
  ]);

  const newElection = reactive({
    nomeEleicao: "",
    candidatos: candidatos,
    zonasEleitorais: zonasEleitorais,
  });

  const electionData = ref({});
  const sectionStatus = ref({});
  const sectionStatusFiltered = ref({});
  const results = ref({});
  const resultsFiltered = ref({});
  const lastUpdated = ref(null);

  function updateLastUpdated() {
    const now = new Date();
    lastUpdated.value = `${now.getHours().toString().padStart(2, "0")}:${now
      .getMinutes()
      .toString()
      .padStart(2, "0")}:${now.getSeconds().toString().padStart(2, "0")}`;
  }

  function addNewElection(name) {
    if (name == null) {
      return;
    }
    newElection.nomeEleicao = name;
  }

  function addCandidate() {
    newElection.candidatos.push({
      nome: "",
    });
  }

  function removeCandidate(index) {
    newElection.candidatos.splice(index, 1);
  }

  function removeElectoralZone(index) {
    newElection.zonasEleitorais.splice(index, 1);
  }

  function removeSection(zoneIndex, sectionIndex) {
    newElection.zonasEleitorais[zoneIndex].secoes.splice(sectionIndex, 1);
  }

  function addElectoralZone() {
    newElection.zonasEleitorais.push({
      id: "",
      secoes: [],
    });
  }

  function addSection(index) {
    newElection.zonasEleitorais[index].secoes.push({
      id: "",
      zonaEleitoralId: "",
      quantidadeEleitores: 0,
    });
  }

  function createElection() {
    api
      .createElection(newElection)
      .then((res) => {
        alert("Eleição Criada com Sucesso!");
        fetchElections()
        fetchResults()
        fetchSectionStatus();
        resetElection();
      })
      .catch((err) => {
        alert(err);
      });
  }

  function fetchElections() {
    api
      .getElection()
      .then((res) => {
        electionData.value = res.data[0];
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function fetchSectionStatus(zonaId, secaoId) {
    api
      .getSectionStatus(zonaId, secaoId)
      .then((res) => {
        if (zonaId || secaoId) {
          sectionStatusFiltered.value = res.data;
        } else {
          sectionStatus.value = res.data;
          updateLastUpdated();
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function fetchResults(zonaId, secaoId) {
    api
      .getResults(zonaId, secaoId)
      .then((res) => {
        if (zonaId || secaoId) {
          resultsFiltered.value = res.data;
        } else {
          results.value = res.data;
          updateLastUpdated();
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function importSectionResults(data) {
    api
      .importSectionResults(data)
      .then((res) => {})
      .catch((err) => {
        console.error(err);
      });
  }

  function resetElection() {
    newElection.nomeEleicao = "";
    newElection.candidatos = reactive([
      {
        nome: "",
      },
    ]);
    newElection.zonasEleitorais = reactive([
      {
        id: "",
        secoes: reactive([
          {
            id: "",
            zonaEleitoralId: "",
            quantidadeEleitores: 0,
          },
        ]),
      },
    ]);
  }

  return {
    requests: {
      createElection,
      fetchElections,
      fetchSectionStatus,
      fetchResults,
      importSectionResults,
    },
    newElection,
    electionData,
    sectionStatus,
    sectionStatusFiltered,
    results,
    resultsFiltered,
    lastUpdated,
    addNewElection,
    addCandidate,
    removeCandidate,
    removeElectoralZone,
    removeSection,
    addElectoralZone,
    addSection,
  };
}
