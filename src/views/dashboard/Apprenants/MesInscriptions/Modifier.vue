```vue
<template>

    <div class="page-container">

        <!-- ===================================================== -->
        <!-- EN-TÊTE -->
        <!-- ===================================================== -->

        <div class="page-header">

            <div>
                <h1>
                    <i class="fas fa-edit"></i>
                    Modifier mon inscription
                </h1>

                <p>
                    Modifiez uniquement votre formation et votre horaire.
                </p>
            </div>

            <RouterLink
                to="/espace-apprenant/inscriptions"
                class="btn-retour"
            >
                <i class="fas fa-arrow-left"></i>
                Retour
            </RouterLink>

        </div>


        <!-- ===================================================== -->
        <!-- MESSAGE DE SUCCÈS -->
        <!-- ===================================================== -->

        <div
            v-if="successMessage"
            class="alert alert-success"
        >
            <i class="fas fa-check-circle"></i>
            {{ successMessage }}
        </div>


        <!-- ===================================================== -->
        <!-- MESSAGE D'ERREUR -->
        <!-- ===================================================== -->

        <div
            v-if="errorMessage"
            class="alert alert-error"
        >
            <i class="fas fa-exclamation-circle"></i>
            {{ errorMessage }}
        </div>


        <!-- ===================================================== -->
        <!-- CHARGEMENT -->
        <!-- ===================================================== -->

        <div
            v-if="loading"
            class="loading"
        >
            <i class="fas fa-spinner fa-spin"></i>
            Chargement...
        </div>


        <!-- ===================================================== -->
        <!-- FORMULAIRE -->
        <!-- ===================================================== -->

        <div
            v-if="!loading && inscription"
            class="form-card"
        >

            <form @submit.prevent="modifierInscription">

                <!-- ================================================= -->
                <!-- FORMATION -->
                <!-- ================================================= -->

                <div class="form-group">

                    <label for="formation_id">
                        Formation
                    </label>

                    <select
                        id="formation_id"
                        v-model="form.formation_id"
                        required
                    >

                        <option
                            value=""
                            disabled
                        >
                            Sélectionnez une formation
                        </option>

                        <option
                            v-for="formation in formations"
                            :key="formation.id"
                            :value="formation.id"
                        >
                            {{ formation.nom }}
                        </option>

                    </select>

                </div>


                <!-- ================================================= -->
                <!-- HORAIRE -->
                <!-- ================================================= -->

                <div class="form-group">

                    <label for="horaire">
                        Horaire
                    </label>

                    <select
                        id="horaire"
                        v-model="form.horaire"
                        required
                    >

                        <option
                            value=""
                            disabled
                        >
                            Sélectionnez un horaire
                        </option>

                        <!-- LES 3 HORAIRES -->

                        <option value="Matin - 10h à 11h">
                            Matin - 10h à 11h
                        </option>

                        <option value="Après 10h - 11h à 13h">
                            Après 10h - 11h à 13h
                        </option>

                        <option value="Soir - 15h à 17h">
                            Soir - 15h à 17h
                        </option>

                    </select>

                </div>


                <!-- ================================================= -->
                <!-- INFORMATIONS ACTUELLES -->
                <!-- ================================================= -->

                <div class="info-box">

                    <div class="info-item">

                        <span class="info-label">
                            Horaire actuel :
                        </span>

                        <span class="horaire-actuel">
                            {{ form.horaire || "Aucun horaire enregistré" }}
                        </span>

                    </div>


                    <div class="info-item">

                        <span class="info-label">
                            Statut :
                        </span>

                        <span
                            class="badge"
                            :class="getStatutClass(inscription.statut)"
                        >
                            {{ inscription.statut }}
                        </span>

                    </div>


                    <div class="info-item">

                        <span class="info-label">
                            État de la formation :
                        </span>

                        <span class="etat">
                            {{ inscription.etat_formation }}
                        </span>

                    </div>

                </div>


                <!-- ================================================= -->
                <!-- BOUTONS -->
                <!-- ================================================= -->

                <div class="form-actions">

                    <RouterLink
                        to="/espace-apprenant/inscriptions"
                        class="btn-cancel"
                    >
                        Annuler
                    </RouterLink>

                    <button
                        type="submit"
                        class="btn-submit"
                        :disabled="saving"
                    >

                        <i
                            v-if="saving"
                            class="fas fa-spinner fa-spin"
                        ></i>

                        <i
                            v-else
                            class="fas fa-save"
                        ></i>

                        {{ saving ? 'Modification...' : 'Enregistrer' }}

                    </button>

                </div>

            </form>

        </div>

    </div>

</template>


<script setup>

import { ref, onMounted } from "vue";

import {
    useRoute,
    useRouter
} from "vue-router";

import api from "../../../../api/api";


// =============================================================
// ROUTER
// =============================================================

const route = useRoute();

const router = useRouter();


// =============================================================
// VARIABLES
// =============================================================

const inscription = ref(null);

const formations = ref([]);

const loading = ref(true);

const saving = ref(false);

const errorMessage = ref("");

const successMessage = ref("");


// =============================================================
// FORMULAIRE
// =============================================================

const form = ref({

    formation_id: "",

    horaire: ""

});


// =============================================================
// RÉCUPÉRER L'INSCRIPTION
// =============================================================

const chargerInscription = async () => {

    try {

        const response = await api.get(
            `/auth/inscriptions/${route.params.id}`
        );

        console.log(
            "Réponse inscription :",
            response.data
        );


        /*
         * L'API peut retourner directement l'inscription
         * ou dans response.data.data.
         */

        const data =
            response.data?.data ||
            response.data;


        inscription.value = data;


        // =====================================================
        // FORMATION ACTUELLE
        // =====================================================

        form.value.formation_id =
            data?.formation_id
            ?? data?.formation?.id
            ?? "";


        // =====================================================
        // HORAIRE ACTUEL
        // =====================================================

        form.value.horaire =
            data?.horaire
            ?? "";


        console.log(
            "Formation récupérée :",
            form.value.formation_id
        );

        console.log(
            "Horaire récupéré :",
            form.value.horaire
        );

    } catch (error) {

        console.error(
            "Erreur récupération inscription :",
            error
        );

        errorMessage.value =
            error.response?.data?.message ||
            "Impossible de récupérer cette inscription.";

    }

};


// =============================================================
// RÉCUPÉRER LES FORMATIONS
// =============================================================

const chargerFormations = async () => {

    try {

        const response = await api.get(
            "/auth/formations"
        );


        console.log(
            "Réponse formations :",
            response.data
        );


        /*
         * Laravel peut retourner les données
         * sous différentes formes selon la pagination.
         */

        if (Array.isArray(response.data)) {

            formations.value =
                response.data;

        } else if (Array.isArray(response.data?.data)) {

            formations.value =
                response.data.data;

        } else if (
            Array.isArray(
                response.data?.data?.data
            )
        ) {

            formations.value =
                response.data.data.data;

        } else {

            formations.value = [];

        }


        console.log(
            "Formations récupérées :",
            formations.value
        );

    } catch (error) {

        console.error(
            "Erreur récupération formations :",
            error
        );

        errorMessage.value =
            error.response?.data?.message ||
            "Impossible de récupérer les formations.";

    }

};


// =============================================================
// MODIFIER L'INSCRIPTION
// =============================================================

const modifierInscription = async () => {

    errorMessage.value = "";

    successMessage.value = "";

    saving.value = true;


    try {

        /*
         * Vérification avant envoi
         */

        if (!form.value.formation_id) {

            errorMessage.value =
                "Veuillez sélectionner une formation.";

            saving.value = false;

            return;

        }


        if (!form.value.horaire) {

            errorMessage.value =
                "Veuillez sélectionner un horaire.";

            saving.value = false;

            return;

        }


        console.log(
            "Données envoyées pour modification :",
            {
                formation_id: form.value.formation_id,
                horaire: form.value.horaire
            }
        );


        const response = await api.put(
            `/auth/inscriptions/${route.params.id}`,
            {
                formation_id:
                    form.value.formation_id,

                horaire:
                    form.value.horaire
            }
        );


        console.log(
            "Réponse modification :",
            response.data
        );


        successMessage.value =
            response.data?.message ||
            "Votre inscription a été modifiée avec succès.";


        /*
         * Mettre à jour les données affichées
         */

        if (response.data?.data) {

            inscription.value =
                response.data.data;

            form.value.formation_id =
                response.data.data.formation_id
                ?? response.data.data.formation?.id
                ?? form.value.formation_id;


            form.value.horaire =
                response.data.data.horaire
                ?? form.value.horaire;

        }


        /*
         * Retourner vers la liste après
         * un court délai.
         */

        setTimeout(() => {

            router.push(
                "/espace-apprenant/inscriptions"
            );

        }, 1200);


    } catch (error) {

        console.error(
            "Erreur modification inscription :",
            error
        );


        console.error(
            "Réponse serveur :",
            error.response?.data
        );


        errorMessage.value =
            error.response?.data?.message ||
            "Impossible de modifier cette inscription.";

    } finally {

        saving.value = false;

    }

};


// =============================================================
// CLASSE DU STATUT
// =============================================================

const getStatutClass = (statut) => {

    if (statut === "Valide") {

        return "statut-valide";

    }

    if (statut === "Refuse") {

        return "statut-refuse";

    }

    return "statut-attente";

};


// =============================================================
// CHARGEMENT INITIAL
// =============================================================

onMounted(async () => {

    loading.value = true;


    await Promise.all([
        chargerInscription(),
        chargerFormations()
    ]);


    loading.value = false;

});

</script>

<style scoped>

/* ========================================================= */
/* CONTENEUR */
/* ========================================================= */

.page-container {

    padding: 30px;

    max-width: 1100px;

    margin: 0 auto;

}


/* ========================================================= */
/* EN-TÊTE */
/* ========================================================= */

.page-header {

    display: flex;

    justify-content: space-between;

    align-items: center;

    gap: 20px;

    margin-bottom: 25px;

}

.page-header h1 {

    margin: 0 0 8px;

    color: #1F2937;

    font-size: 28px;

}

.page-header p {

    margin: 0;

    color: #6B7280;

}


/* ========================================================= */
/* BOUTON RETOUR */
/* ========================================================= */

.btn-retour {

    display: inline-flex;

    align-items: center;

    gap: 8px;

    padding: 10px 16px;

    background: #F3F4F6;

    color: #374151;

    text-decoration: none;

    border-radius: 8px;

    transition: 0.2s;

}

.btn-retour:hover {

    background: #E5E7EB;

}


/* ========================================================= */
/* ALERTES */
/* ========================================================= */

.alert {

    padding: 14px 18px;

    border-radius: 8px;

    margin-bottom: 20px;

    display: flex;

    align-items: center;

    gap: 10px;

}

.alert-success {

    background: #DCFCE7;

    color: #166534;

    border: 1px solid #86EFAC;

}

.alert-error {

    background: #FEE2E2;

    color: #991B1B;

    border: 1px solid #FCA5A5;

}


/* ========================================================= */
/* CHARGEMENT */
/* ========================================================= */

.loading {

    text-align: center;

    padding: 50px;

    color: #3B5998;

    font-size: 18px;

}


/* ========================================================= */
/* CARTE FORMULAIRE */
/* ========================================================= */

.form-card {

    background: white;

    padding: 30px;

    border-radius: 12px;

    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);

}


/* ========================================================= */
/* GROUPES */
/* ========================================================= */

.form-group {

    margin-bottom: 22px;

}

.form-group label {

    display: block;

    margin-bottom: 8px;

    font-weight: 600;

    color: #1F2937;

}


/* ========================================================= */
/* INPUT / SELECT */
/* ========================================================= */

.form-group input,
.form-group select {

    width: 100%;

    padding: 12px 14px;

    border: 1px solid #D1D5DB;

    border-radius: 8px;

    font-size: 15px;

    box-sizing: border-box;

    background: white;

}

.form-group input:focus,
.form-group select:focus {

    outline: none;

    border-color: #3B5998;

    box-shadow: 0 0 0 3px rgba(59, 89, 152, 0.1);

}


/* ========================================================= */
/* INFORMATIONS */
/* ========================================================= */

.info-box {

    background: #F8FAFC;

    border: 1px solid #E5E7EB;

    border-radius: 8px;

    padding: 18px;

    margin-bottom: 25px;

}

.info-item {

    display: flex;

    align-items: center;

    gap: 10px;

    margin-bottom: 10px;

}

.info-item:last-child {

    margin-bottom: 0;

}

.info-label {

    font-weight: 600;

    color: #374151;

}

.horaire-actuel {

    color: #3B5998;

    font-weight: 600;

}

.etat {

    color: #4B5563;

}


/* ========================================================= */
/* BADGES STATUT */
/* ========================================================= */

.badge {

    display: inline-block;

    padding: 5px 10px;

    border-radius: 20px;

    font-size: 13px;

    font-weight: 600;

}

.statut-valide {

    background: #DCFCE7;

    color: #166534;

}

.statut-refuse {

    background: #FEE2E2;

    color: #991B1B;

}

.statut-attente {

    background: #FEF3C7;

    color: #92400E;

}


/* ========================================================= */
/* ACTIONS */
/* ========================================================= */

.form-actions {

    display: flex;

    justify-content: flex-end;

    gap: 12px;

    margin-top: 25px;

}

.btn-cancel {

    display: inline-flex;

    align-items: center;

    justify-content: center;

    padding: 11px 20px;

    background: #E5E7EB;

    color: #374151;

    text-decoration: none;

    border-radius: 8px;

    font-weight: 600;

}

.btn-submit {

    display: inline-flex;

    align-items: center;

    justify-content: center;

    gap: 8px;

    padding: 11px 20px;

    background: #3B5998;

    color: white;

    border: none;

    border-radius: 8px;

    font-weight: 600;

    cursor: pointer;

}

.btn-submit:hover {

    background: #304A82;

}

.btn-submit:disabled {

    opacity: 0.6;

    cursor: not-allowed;

}


/* ========================================================= */
/* RESPONSIVE */
/* ========================================================= */

@media (max-width: 768px) {

    .page-container {

        padding: 20px;

    }

    .page-header {

        flex-direction: column;

        align-items: flex-start;

    }

    .form-card {

        padding: 20px;

    }

    .form-actions {

        flex-direction: column;

    }

    .btn-cancel,
    .btn-submit {

        width: 100%;

    }

}

</style>
