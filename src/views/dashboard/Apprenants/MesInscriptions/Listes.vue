<template>

    <div class="inscriptions-page">

        <!-- ================================================= -->
        <!-- EN-TÊTE -->
        <!-- ================================================= -->

        <div class="page-header">

            <div>

                <h1>
                    <i class="fas fa-file-alt"></i>
                    Mes inscriptions
                </h1>

                <p>
                    Retrouvez ici toutes vos inscriptions aux formations.
                </p>

            </div>

        </div>


        <!-- ================================================= -->
        <!-- CHARGEMENT -->
        <!-- ================================================= -->

        <div
            v-if="loading"
            class="message-box loading-box"
        >

            <i class="fas fa-spinner fa-spin"></i>

            Chargement de vos inscriptions...

        </div>


        <!-- ================================================= -->
        <!-- ERREUR -->
        <!-- ================================================= -->

        <div
            v-else-if="errorMessage"
            class="message-box error-box"
        >

            <i class="fas fa-exclamation-circle"></i>

            {{ errorMessage }}

        </div>


        <!-- ================================================= -->
        <!-- AUCUNE INSCRIPTION -->
        <!-- ================================================= -->

        <div
            v-else-if="inscriptions.length === 0"
            class="empty-box"
        >

            <div class="empty-icon">

                <i class="fas fa-file-alt"></i>

            </div>

            <h2>
                Aucune inscription
            </h2>

            <p>
                Vous n'avez encore aucune inscription à une formation.
            </p>

            <RouterLink
                to="/formations"
                class="btn-formation"
            >

                <i class="fas fa-book-open"></i>

                Voir les formations

            </RouterLink>

        </div>


        <!-- ================================================= -->
        <!-- LISTE DES INSCRIPTIONS -->
        <!-- ================================================= -->

        <div
            v-else
            class="inscriptions-list"
        >

            <div
                v-for="inscription in inscriptions"
                :key="inscription.id"
                class="inscription-card"
            >

                <!-- ================================================= -->
                <!-- ICÔNE -->
                <!-- ================================================= -->

                <div class="card-icon">

                    <i class="fas fa-graduation-cap"></i>

                </div>


                <!-- ================================================= -->
                <!-- CONTENU -->
                <!-- ================================================= -->

                <div class="card-content">

                    <div class="card-header">

                        <div>

                            <h2>
                                {{ inscription.formation?.nom || "Formation inconnue" }}
                            </h2>

                            <p
                                v-if="inscription.formation?.resume"
                                class="resume"
                            >
                                {{ inscription.formation.resume }}
                            </p>

                        </div>


                        <!-- STATUT -->
                        <span
                            class="statut-badge"
                            :class="getStatutClass(inscription.statut)"
                        >

                            <i :class="getStatutIcon(inscription.statut)"></i>

                            {{ inscription.statut || "Non défini" }}

                        </span>

                    </div>


                    <!-- ================================================= -->
                    <!-- INFORMATIONS -->
                    <!-- ================================================= -->

                    <div class="infos-grid">

                        <div class="info-item">

                            <i class="fas fa-calendar-alt"></i>

                            <div>

                                <span class="label">
                                    Date d'inscription
                                </span>

                                <strong>
                                    {{ formatDate(inscription.date_inscription) }}
                                </strong>

                            </div>

                        </div>


                        <div class="info-item">

                            <i class="fas fa-clock"></i>

                            <div>

                                <span class="label">
                                    Horaire
                                </span>

                                <strong>
                                    {{ inscription.horaire || "Non défini" }}
                                </strong>

                            </div>

                        </div>


                        <div class="info-item">

                            <i class="fas fa-chart-line"></i>

                            <div>

                                <span class="label">
                                    État de la formation
                                </span>

                                <strong>
                                    {{ inscription.etat_formation || "Non commencée" }}
                                </strong>

                            </div>

                        </div>


                        <div
                            v-if="inscription.formation?.lieu"
                            class="info-item"
                        >

                            <i class="fas fa-map-marker-alt"></i>

                            <div>

                                <span class="label">
                                    Lieu
                                </span>

                                <strong>
                                    {{ inscription.formation.lieu }}
                                </strong>

                            </div>

                        </div>

                    </div>


                    <!-- ================================================= -->
                    <!-- PIED DE CARTE -->
                    <!-- ================================================= -->

                    <div class="card-footer">

                        <span class="formation-status">

                            <i class="fas fa-book-open"></i>

                            {{ inscription.formation?.nom || "Formation" }}

                        </span>


                        <!-- MODIFIER -->

                        <RouterLink
                            :to="`/espace-apprenant/inscriptions/${inscription.id}/modifier`"
                            class="btn-modifier"
                        >

                            <i class="fas fa-edit"></i>

                            Modifier

                        </RouterLink>

                    </div>

                </div>

            </div>

        </div>

    </div>

</template>


<script setup>

import { ref, onMounted } from "vue";

import api from "../../../../api/api";


// =========================================================
// VARIABLES
// =========================================================

const inscriptions = ref([]);

const loading = ref(false);

const errorMessage = ref("");


// =========================================================
// RÉCUPÉRER LES INSCRIPTIONS
// =========================================================

const getInscriptions = async () => {

    loading.value = true;

    errorMessage.value = "";

    try {

        /*
         * Cette route est déjà adaptée au rôle de l'utilisateur.
         *
         * Pour un apprenant connecté :
         *
         * GET /auth/inscriptions
         *
         * retourne uniquement SES inscriptions.
         */

        const response = await api.get(
            "/auth/inscriptions"
        );


        inscriptions.value =
            Array.isArray(response.data)
                ? response.data
                : [];

    } catch (error) {

        console.error(
            "Erreur lors du chargement des inscriptions :",
            error
        );

        errorMessage.value =
            error.response?.data?.message ||
            "Impossible de récupérer vos inscriptions.";

    } finally {

        loading.value = false;

    }

};


// =========================================================
// STATUT : CLASSE CSS
// =========================================================

const getStatutClass = (statut) => {

    switch (statut) {

        case "Valide":
            return "statut-valide";

        case "En attente":
            return "statut-attente";

        case "Refuse":
            return "statut-refuse";

        default:
            return "statut-inconnu";

    }

};


// =========================================================
// STATUT : ICÔNE
// =========================================================

const getStatutIcon = (statut) => {

    switch (statut) {

        case "Valide":
            return "fas fa-check-circle";

        case "En attente":
            return "fas fa-hourglass-half";

        case "Refuse":
            return "fas fa-times-circle";

        default:
            return "fas fa-question-circle";

    }

};


// =========================================================
// FORMAT DATE
// =========================================================

const formatDate = (date) => {

    if (!date) {

        return "Non définie";

    }

    const dateObj = new Date(date);

    if (isNaN(dateObj.getTime())) {

        return date;

    }

    return dateObj.toLocaleDateString(
        "fr-FR",
        {
            day: "2-digit",
            month: "2-digit",
            year: "numeric"
        }
    );

};


// =========================================================
// CHARGEMENT
// =========================================================

onMounted(() => {

    getInscriptions();

});

</script>


<style scoped>

/* ========================================================= */
/* PAGE */
/* ========================================================= */

.inscriptions-page {

    padding: 30px;

    min-height: 100%;

    background: #f8fafc;

}


/* ========================================================= */
/* HEADER */
/* ========================================================= */

.page-header {

    background: white;

    border-radius: 16px;

    padding: 25px 30px;

    margin-bottom: 25px;

    border-left: 5px solid #3B5998;

    box-shadow:
        0 4px 15px rgba(0, 0, 0, 0.06);

}


.page-header h1 {

    margin: 0 0 8px;

    color: #1F2937;

    font-size: 28px;

}


.page-header h1 i {

    color: #3B5998;

    margin-right: 10px;

}


.page-header p {

    margin: 0;

    color: #6b7280;

}


/* ========================================================= */
/* MESSAGES */
/* ========================================================= */

.message-box {

    padding: 20px;

    border-radius: 12px;

    text-align: center;

    background: white;

    box-shadow:
        0 3px 12px rgba(0, 0, 0, 0.05);

}


.loading-box {

    color: #3B5998;

}


.loading-box i {

    margin-right: 8px;

}


.error-box {

    color: #b91c1c;

    background: #fef2f2;

    border: 1px solid #fecaca;

}


.error-box i {

    margin-right: 8px;

}


/* ========================================================= */
/* VIDE */
/* ========================================================= */

.empty-box {

    background: white;

    border-radius: 16px;

    padding: 50px 30px;

    text-align: center;

    box-shadow:
        0 4px 15px rgba(0, 0, 0, 0.06);

}


.empty-icon {

    width: 75px;

    height: 75px;

    margin: 0 auto 20px;

    border-radius: 50%;

    display: flex;

    align-items: center;

    justify-content: center;

    background: #eef2ff;

    color: #3B5998;

    font-size: 30px;

}


.empty-box h2 {

    color: #1F2937;

    margin-bottom: 10px;

}


.empty-box p {

    color: #6b7280;

    margin-bottom: 25px;

}


.btn-formation {

    display: inline-flex;

    align-items: center;

    gap: 8px;

    padding: 11px 18px;

    border-radius: 8px;

    background: #3B5998;

    color: white;

    text-decoration: none;

    font-weight: 600;

}


.btn-formation:hover {

    background: #2f477a;

}


/* ========================================================= */
/* LISTE */
/* ========================================================= */

.inscriptions-list {

    display: flex;

    flex-direction: column;

    gap: 20px;

}


/* ========================================================= */
/* CARTE */
/* ========================================================= */

.inscription-card {

    display: flex;

    gap: 20px;

    background: white;

    border-radius: 16px;

    padding: 24px;

    box-shadow:
        0 4px 15px rgba(0, 0, 0, 0.07);

    transition:
        transform 0.2s ease,
        box-shadow 0.2s ease;

}


.inscription-card:hover {

    transform: translateY(-3px);

    box-shadow:
        0 8px 25px rgba(0, 0, 0, 0.10);

}


/* ========================================================= */
/* ICÔNE */
/* ========================================================= */

.card-icon {

    width: 65px;

    height: 65px;

    min-width: 65px;

    border-radius: 14px;

    display: flex;

    align-items: center;

    justify-content: center;

    background: #eef2ff;

    color: #3B5998;

    font-size: 26px;

}


/* ========================================================= */
/* CONTENU */
/* ========================================================= */

.card-content {

    flex: 1;

    min-width: 0;

}


.card-header {

    display: flex;

    align-items: flex-start;

    justify-content: space-between;

    gap: 20px;

    margin-bottom: 20px;

}


.card-header h2 {

    margin: 0 0 6px;

    color: #1F2937;

    font-size: 21px;

}


.resume {

    margin: 0;

    color: #6b7280;

    font-size: 14px;

    line-height: 1.5;

}


/* ========================================================= */
/* STATUT */
/* ========================================================= */

.statut-badge {

    flex-shrink: 0;

    display: inline-flex;

    align-items: center;

    gap: 6px;

    padding: 7px 12px;

    border-radius: 20px;

    font-size: 12px;

    font-weight: 700;

}


.statut-valide {

    background: #dcfce7;

    color: #166534;

}


.statut-attente {

    background: #fef3c7;

    color: #92400e;

}


.statut-refuse {

    background: #fee2e2;

    color: #991b1b;

}


.statut-inconnu {

    background: #e5e7eb;

    color: #374151;

}


/* ========================================================= */
/* INFORMATIONS */
/* ========================================================= */

.infos-grid {

    display: grid;

    grid-template-columns:
        repeat(2, minmax(0, 1fr));

    gap: 15px;

    padding: 18px;

    background: #f8fafc;

    border-radius: 12px;

}


.info-item {

    display: flex;

    align-items: center;

    gap: 12px;

}


.info-item > i {

    width: 35px;

    height: 35px;

    display: flex;

    align-items: center;

    justify-content: center;

    border-radius: 8px;

    background: white;

    color: #3B5998;

}


.info-item .label {

    display: block;

    color: #6b7280;

    font-size: 12px;

    margin-bottom: 3px;

}


.info-item strong {

    color: #1F2937;

    font-size: 14px;

}


/* ========================================================= */
/* FOOTER */
/* ========================================================= */

.card-footer {

    display: flex;

    align-items: center;

    justify-content: space-between;

    gap: 15px;

    margin-top: 20px;

    padding-top: 18px;

    border-top: 1px solid #e5e7eb;

}


.formation-status {

    color: #6b7280;

    font-size: 13px;

}


.formation-status i {

    color: #3B5998;

    margin-right: 5px;

}


.btn-modifier {

    display: inline-flex;

    align-items: center;

    gap: 7px;

    padding: 9px 15px;

    border-radius: 8px;

    background: #3B5998;

    color: white;

    text-decoration: none;

    font-size: 13px;

    font-weight: 600;

    transition: 0.2s;

}


.btn-modifier:hover {

    background: #2f477a;

}


/* ========================================================= */
/* RESPONSIVE */
/* ========================================================= */

@media (max-width: 768px) {

    .inscriptions-page {

        padding: 15px;

    }


    .inscription-card {

        flex-direction: column;

    }


    .card-header {

        flex-direction: column;

    }


    .infos-grid {

        grid-template-columns: 1fr;

    }


    .card-footer {

        flex-direction: column;

        align-items: stretch;

    }


    .btn-modifier {

        justify-content: center;

    }

}

</style>
