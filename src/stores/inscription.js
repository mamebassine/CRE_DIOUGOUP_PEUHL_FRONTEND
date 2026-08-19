import { defineStore } from "pinia";

import {

    getInscriptions,
    getInscription,
    createInscription,
    inscriptionAdmin,
    updateInscription,
    deleteInscription

} from "../services/inscriptionService";

export const useInscriptionStore = defineStore("inscription", {

    state: () => ({

        inscriptions: [],
        inscription: null,
        loading: false

    }),

    actions: {

        // ============================
        // LISTE
        // ============================

        async fetchInscriptions() {

            this.loading = true;

            try {

                const response = await getInscriptions();

                this.inscriptions = response.data;

            } finally {

                this.loading = false;

            }

        },

        // ============================
        // DETAIL
        // ============================

        async fetchInscription(id) {

            const response = await getInscription(id);

            this.inscription = response.data;

        },

        // ============================
        // AJOUT APPRENANT
        // ============================

        async ajouterInscription(data) {

            const response = await createInscription(data);

            if (response.data.data) {

                this.inscriptions.push(response.data.data);

            }

        },

        // ============================
        // AJOUT ADMIN
        // ============================

        async ajouterInscriptionAdmin(data) {

            const response = await inscriptionAdmin(data);

            if (response.data.data) {

                this.inscriptions.push(response.data.data);

            }

        },

        // ============================
        // MODIFICATION
        // ============================

        async modifierInscription(id, data) {

            const response = await updateInscription(id, data);

            const index = this.inscriptions.findIndex(

                inscription => inscription.id == id

            );

            if (index !== -1 && response.data.data) {

                this.inscriptions[index] = response.data.data;

            }

        },

        // ============================
        // SUPPRESSION
        // ============================

        async supprimerInscription(id) {

            await deleteInscription(id);

            this.inscriptions = this.inscriptions.filter(

                inscription => inscription.id != id

            );

        }

    }

});