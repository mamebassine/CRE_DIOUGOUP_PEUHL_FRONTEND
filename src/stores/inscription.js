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


        // ==========================================
        // LISTE
        // ==========================================

        async fetchInscriptions() {

            this.loading = true;

            try {

                const response =
                    await getInscriptions();

                this.inscriptions =
                    response.data.data ??
                    response.data;

            }

            finally {

                this.loading = false;

            }

        },


        // ==========================================
        // DETAIL
        // ==========================================

        async fetchInscription(id) {

            const response =
                await getInscription(id);

            this.inscription =
                response.data.data ??
                response.data;

            return response;

        },


        // ==========================================
        // AJOUT APPRENANT
        // ==========================================

        async ajouterInscription(data) {

            const response =
                await createInscription(data);

            const inscription =
                response.data.data;

            if (inscription) {

                this.inscriptions.push(
                    inscription
                );

            }

            return response;

        },


        // ==========================================
        // AJOUT ADMIN
        // ==========================================

        async ajouterInscriptionAdmin(data) {

            const response =
                await inscriptionAdmin(data);

            const inscription =
                response.data.data;

            if (inscription) {

                this.inscriptions.unshift(
                    inscription
                );

            }

            return response;

        },


        // ==========================================
        // MODIFICATION
        // ==========================================

        async modifierInscription(id, data) {

            const response =
                await updateInscription(
                    id,
                    data
                );

            const inscription =
                response.data.data;

            const index =
                this.inscriptions.findIndex(
                    inscription =>
                        inscription.id == id
                );

            if (
                index !== -1 &&
                inscription
            ) {

                this.inscriptions[index] =
                    inscription;

            }

            return response;

        },


        // ==========================================
        // SUPPRESSION
        // ==========================================

        async supprimerInscription(id) {

            await deleteInscription(id);

            this.inscriptions =
                this.inscriptions.filter(
                    inscription =>
                        inscription.id != id
                );

        }

    }

});