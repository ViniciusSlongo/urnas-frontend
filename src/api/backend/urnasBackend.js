import instance from "../axios.js";

class ApiElection {
    createElection(data) {
        return new Promise((resolve, reject) => {
            instance.post("api/eleicao", data)
                .then((res) => {
                    resolve(res);
                })
                .catch((err) => {
                    console.log(err);
                    reject(err);
                });
        });
    }

    importSectionResults(data) {
        return new Promise((resolve, reject) => {
            instance.post("api/eleicao/importacoes-secoes", data)
                .then((res) => {
                    resolve(res);
                })
                .catch((err) => {
                    console.log(err);
                    reject(err);
                });
        });
    }

    getSectionStatus(zonaId = null, secaoId = null) {
        const params = {};
        if (zonaId) params.zonaId = zonaId;
        if (secaoId) params.secaoId = secaoId;

        return new Promise((resolve, reject) => {
            instance.get("api/eleicao/importacoes-secoes", { params })
                .then((res) => {
                    resolve(res);
                })
                .catch((err) => {
                    console.log(err);
                    reject(err);
                });
        });
    }

    getResults(zonaId = null, secaoId = null) {
        const params = {};
        if (zonaId) params.zonaId = zonaId;
        if (secaoId) params.secaoId = secaoId;

        return new Promise((resolve, reject) => {
            instance.get("api/eleicao/resultados", { params })
                .then((res) => {
                    resolve(res);
                })
                .catch((err) => {
                    console.log(err);
                    reject(err);
                });
        });
    }

    getElection() {
        return new Promise((resolve, reject) => {
            instance.get("api/eleicao")
                .then((res) => {
                    resolve(res);
                })
                .catch((err) => {
                    console.log(err);
                    reject(err);
                });
        });
    }
}

export default ApiElection;
