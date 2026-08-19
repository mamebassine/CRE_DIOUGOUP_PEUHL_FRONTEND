import { defineStore } from "pinia";

import {
    getFormations,
    getFormation,
    createFormation,
    updateFormation,
    deleteFormation
} from "../services/formationService";


export const useFormationStore = defineStore(
    "formation",
    {

        state: () => ({

            formations: [],

            pagination: null,

            formation: null,

            loading: false

        }),


        actions: {


            // =================================================
            // LISTE
            // =================================================

            async fetchFormations(page = 1) {

                this.loading = true;

                try {

                    const response =
                        await getFormations(page);


                    this.formations =
                        response.data.data;


                    this.pagination =
                        response.data;


                    return response.data;

                } finally {

                    this.loading = false;

                }

            },


            // =================================================
            // DETAIL
            // =================================================

            async fetchFormation(id) {

                this.loading = true;

                try {

                    const response =
                        await getFormation(id);


                    this.formation =
                        response.data;


                    return response.data;

                } finally {

                    this.loading = false;

                }

            },


            // =================================================
            // AJOUT
            // =================================================

            async ajouterFormation(data) {

                this.loading = true;

                try {

                    const response =
                        await createFormation(data);


                    this.formations.push(
                        response.data.data
                    );


                    return response.data;

                } finally {

                    this.loading = false;

                }

            },


            // =================================================
            // MODIFICATION
            // =================================================

            async modifierFormation(
                id,
                data
            ) {

                this.loading = true;

                try {

                    const response =
                        await updateFormation(
                            id,
                            data
                        );


                    const formationModifiee =
                        response.data.data;


                    // =================================================
                    // METTRE À JOUR LA LISTE
                    // =================================================

                    const index =
                        this.formations.findIndex(

                            formation =>

                                Number(
                                    formation.id
                                ) === Number(id)

                        );


                    if (index !== -1) {

                        this.formations[index] =
                            formationModifiee;

                    }


                    // =================================================
                    // METTRE À JOUR LA FORMATION ACTUELLE
                    // =================================================

                    this.formation =
                        formationModifiee;


                    return response.data;

                } finally {

                    this.loading = false;

                }

            },


            // =================================================
            // SUPPRESSION
            // =================================================

            async supprimerFormation(id) {

                this.loading = true;

                try {

                    await deleteFormation(id);


                    this.formations =
                        this.formations.filter(

                            formation =>

                                Number(
                                    formation.id
                                ) !== Number(id)

                        );


                } finally {

                    this.loading = false;

                }

            }

        }

    }
);