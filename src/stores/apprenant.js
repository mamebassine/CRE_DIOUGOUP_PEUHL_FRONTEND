import { defineStore } from "pinia";

import {
    getApprenants,
    getApprenant,
    createApprenant,
    updateApprenant,
    deleteApprenant,
    getMonProfil,
    updateMonProfil
} from "@/services/apprenantService";

export const useApprenantStore = defineStore("apprenant", {

    state: () => ({

        apprenants: [],
        apprenant: null,
        loading: false,
        error: null

    }),

    actions: {

        // ===========================
        // LISTE
        // ===========================

        async fetchApprenants() {

            this.loading = true;

            this.error = null;

            try {

                const response = await getApprenants();

                this.apprenants = response.data.data ?? response.data;

            } catch (error) {

                this.error = error.response?.data?.message || error.message;

            } finally {

                this.loading = false;

            }

        },

        // ===========================
        // DETAIL
        // ===========================

        async fetchApprenant(id) {

            const response = await getApprenant(id);

            this.apprenant = response.data.data ?? response.data;

        },

        // ===========================
        // AJOUT
        // ===========================

        async ajouterApprenant(data) {

            const response = await createApprenant(data);

            if (response.data.data) {

                this.apprenants.unshift(response.data.data);

            }

        },

        // ===========================
        // MODIFICATION
        // ===========================

        async modifierApprenant(id, data) {

            const response = await updateApprenant(id, data);

            const index = this.apprenants.findIndex(
                a => a.id == id
            );

            if (index !== -1 && response.data.data) {

                this.apprenants[index] = response.data.data;

            }

            return response;

        },

        // ===========================
        // SUPPRESSION
        // ===========================

        async supprimerApprenant(id) {

            await deleteApprenant(id);

            this.apprenants = this.apprenants.filter(
                a => a.id != id
            );

        },

        // ===========================
        // MON PROFIL
        // ===========================

        async fetchMonProfil() {

            const response = await getMonProfil();

            this.apprenant = response.data.data ?? response.data;

        },

        async modifierMonProfil(data) {

            return await updateMonProfil(data);

        }

    }

});