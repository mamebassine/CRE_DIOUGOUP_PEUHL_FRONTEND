<template>

    <div class="formations-page">

        <!-- ================================================= -->
        <!-- EN-TÊTE -->
        <!-- ================================================= -->

        <div class="page-header">

            <div>

                <h1>
                    <i class="fas fa-book-open"></i>
                    Mes formations
                </h1>

                <p>
                    Retrouvez ici les formations auxquelles votre inscription a été validée.
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

            Chargement de vos formations...

        </div>


        <!-- ================================================= -->
        <!-- MESSAGE D'ERREUR -->
        <!-- ================================================= -->

        <div
            v-else-if="errorMessage"
            class="message-box error-box"
        >

            <i class="fas fa-exclamation-circle"></i>

            {{ errorMessage }}

        </div>


        <!-- ================================================= -->
        <!-- AUCUNE FORMATION -->
        <!-- ================================================= -->

        <div
            v-else-if="formations.length === 0"
            class="empty-box"
        >

            <div class="empty-icon">

                <i class="fas fa-book-open"></i>

            </div>


            <h2>
                Aucune formation disponible
            </h2>


            <p>
                Vous n'avez actuellement aucune inscription validée à une formation.
            </p>

        </div>


        <!-- ================================================= -->
        <!-- LISTE DES FORMATIONS -->
        <!-- ================================================= -->

        <div
            v-else
            class="formations-grid"
        >

            <div
                v-for="formation in formations"
                :key="formation.inscription_id"
                class="formation-card"
            >

                <!-- ================================================= -->
                <!-- IMAGE -->
                <!-- ================================================= -->

                <div class="formation-image">

                    <img
                        v-if="formation.icone"
                        :src="getImageUrl(formation.icone)"
                        :alt="formation.nom"
                    >

                    <div
                        v-else
                        class="default-image"
                    >

                        <i class="fas fa-graduation-cap"></i>

                    </div>

                </div>


                <!-- ================================================= -->
                <!-- CONTENU -->
                <!-- ================================================= -->

                <div class="formation-content">

                    <div class="formation-top">

                        <h2>
                            {{ formation.nom }}
                        </h2>


                        <span class="status-badge">

                            <i class="fas fa-check-circle"></i>

                            Validée

                        </span>

                    </div>


                    <!-- ================================================= -->
                    <!-- RÉSUMÉ -->
                    <!-- ================================================= -->

                    <p
                        v-if="formation.resume"
                        class="formation-resume"
                    >

                        {{ formation.resume }}

                    </p>


                    <!-- ================================================= -->
                    <!-- INFORMATIONS -->
                    <!-- ================================================= -->

                    <div class="formation-info">

                        <div
                            v-if="formation.duree"
                            class="info-item"
                        >

                            <i class="fas fa-clock"></i>

                            <span>

                                <strong>Durée :</strong>

                                {{ formation.duree }}

                            </span>

                        </div>


                        <div
                            v-if="formation.diplome"
                            class="info-item"
                        >

                            <i class="fas fa-certificate"></i>

                            <span>

                                <strong>Diplôme :</strong>

                                {{ formation.diplome }}

                            </span>

                        </div>


                        <div
                            v-if="formation.lieu"
                            class="info-item"
                        >

                            <i class="fas fa-map-marker-alt"></i>

                            <span>

                                <strong>Lieu :</strong>

                                {{ formation.lieu }}

                            </span>

                        </div>


                        <div
                            v-if="formation.horaire"
                            class="info-item"
                        >

                            <i class="fas fa-calendar-alt"></i>

                            <span>

                                <strong>Horaire :</strong>

                                {{ formation.horaire }}

                            </span>

                        </div>

                    </div>


                    <!-- ================================================= -->
                    <!-- ÉTAT DE LA FORMATION -->
                    <!-- ================================================= -->

                    <div class="formation-progress">

                        <span class="progress-label">

                            État de la formation

                        </span>


                        <span
                            class="etat-badge"
                            :class="getEtatClass(formation.etat_formation)"
                        >

                            {{ formation.etat_formation || "Non commencée" }}

                        </span>

                    </div>


                    <!-- ================================================= -->
                    <!-- DATE D'INSCRIPTION -->
                    <!-- ================================================= -->

                    <div
                        v-if="formation.date_inscription"
                        class="date-inscription"
                    >

                        <i class="fas fa-calendar-check"></i>

                        Inscrit le :

                        {{ formatDate(formation.date_inscription) }}

                    </div>

                </div>

            </div>

        </div>


        <!-- ================================================= -->
        <!-- BOUTON EN BAS DES CARTES -->
        <!-- TOUJOURS VISIBLE HORS CHARGEMENT / ERREUR -->
        <!-- ================================================= -->

        <div
            v-if="!loading && !errorMessage"
            class="inscriptions-action"
        >

            <RouterLink
                to="/espace-apprenant/inscriptions"
                class="btn-inscriptions"
            >

                <i class="fas fa-file-alt"></i>

                Voir mes inscriptions

            </RouterLink>

        </div>

    </div>

</template>


<script setup>

import { ref, onMounted } from "vue";

import api from "../../../../api/api";


// =========================================================
// VARIABLES
// =========================================================

const formations = ref([]);

const loading = ref(false);

const errorMessage = ref("");


// =========================================================
// RÉCUPÉRER LES FORMATIONS DE L'APPRENANT
// =========================================================

const getFormations = async () => {

    loading.value = true;

    errorMessage.value = "";


    try {

        /*
         * IMPORTANT :
         *
         * On ne récupère PAS :
         *
         * /auth/formations
         *
         * car cette route retourne toutes les formations
         * de la base de données.
         *
         * On récupère plutôt les inscriptions de l'apprenant.
         */

        const response = await api.get(
            "/auth/inscriptions"
        );


        /*
         * Le backend retourne uniquement les inscriptions
         * de l'apprenant connecté.
         *
         * On garde seulement les inscriptions VALIDÉES.
         */

        formations.value = (response.data || [])

            .filter(
                inscription =>
                    inscription.statut === "Valide" &&
                    inscription.formation
            )

            .map(
                inscription => ({

                    ...inscription.formation,

                    // Informations de l'inscription
                    inscription_id: inscription.id,

                    statut: inscription.statut,

                    etat_formation:
                        inscription.etat_formation,

                    horaire:
                        inscription.horaire,

                    date_inscription:
                        inscription.date_inscription

                })
            );


    } catch (error) {

        console.error(
            "Erreur lors du chargement des formations :",
            error
        );


        errorMessage.value =
            error.response?.data?.message ||
            "Impossible de récupérer vos formations.";

    } finally {

        loading.value = false;

    }

};


// =========================================================
// IMAGE DE LA FORMATION
// =========================================================

const getImageUrl = (image) => {

    if (!image) {

        return null;

    }


    /*
     * Si l'API retourne déjà une URL complète.
     */

    if (
        image.startsWith("http://") ||
        image.startsWith("https://")
    ) {

        return image;

    }


    /*
     * Sinon on utilise le stockage Laravel.
     */

    return `http://127.0.0.1:8000/storage/${image}`;

};


// =========================================================
// CLASSE DE L'ÉTAT DE FORMATION
// =========================================================

const getEtatClass = (etat) => {

    switch (etat) {

        case "En cours":

            return "etat-en-cours";


        case "Terminée":

            return "etat-terminee";


        case "Abandonnée":

            return "etat-abandonnee";


        case "...":
    // traitement
    break;

default:
    // traitement

            return "etat-non-commencee";

    }

};


// =========================================================
// FORMAT DATE
// =========================================================

const formatDate = (date) => {

    if (!date) {

        return "";

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
// CHARGEMENT AU DÉMARRAGE
// =========================================================

onMounted(() => {

    getFormations();

});

</script>


<style scoped>

/* ========================================================= */
/* PAGE */
/* ========================================================= */

.formations-page {

    padding: 30px;

    min-height: 100%;

    background: #f8fafc;

}


/* ========================================================= */
/* EN-TÊTE */
/* ========================================================= */

.page-header {

    background: white;

    border-radius: 16px;

    padding: 25px 30px;

    margin-bottom: 25px;

    box-shadow:
        0 4px 15px rgba(0, 0, 0, 0.06);

    border-left: 5px solid #3B5998;

}


.page-header h1 {

    margin: 0 0 8px;

    color: #1F2937;

    font-size: 28px;

    font-weight: 700;

}


.page-header h1 i {

    color: #3B5998;

    margin-right: 10px;

}


.page-header p {

    margin: 0;

    color: #6b7280;

    font-size: 15px;

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
/* AUCUNE FORMATION */
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


/* ========================================================= */
/* BOUTON INSCRIPTIONS */
/* ========================================================= */

.inscriptions-action {

    display: flex;

    justify-content: center;

    margin-top: 30px;

    padding-bottom: 25px;

}


.btn-inscriptions {

    display: inline-flex;

    align-items: center;

    justify-content: center;

    gap: 8px;

    padding: 12px 22px;

    border-radius: 8px;

    background: #3B5998;

    color: white;

    text-decoration: none;

    font-weight: 600;

    transition: 0.2s;

    box-shadow:
        0 4px 10px rgba(59, 89, 152, 0.20);

}


.btn-inscriptions:hover {

    background: #2f477a;

    transform: translateY(-2px);

}


.btn-inscriptions i {

    font-size: 15px;

}


/* ========================================================= */
/* GRILLE */
/* ========================================================= */

.formations-grid {

    display: grid;

    grid-template-columns:
        repeat(auto-fill, minmax(330px, 1fr));

    gap: 25px;

}


/* ========================================================= */
/* CARTE */
/* ========================================================= */

.formation-card {

    background: white;

    border-radius: 16px;

    overflow: hidden;

    box-shadow:
        0 4px 15px rgba(0, 0, 0, 0.07);

    transition:
        transform 0.2s ease,
        box-shadow 0.2s ease;

}


.formation-card:hover {

    transform: translateY(-4px);

    box-shadow:
        0 8px 25px rgba(0, 0, 0, 0.10);

}


/* ========================================================= */
/* IMAGE */
/* ========================================================= */

.formation-image {

    height: 190px;

    background: #eef2f7;

    overflow: hidden;

}


.formation-image img {

    width: 100%;

    height: 100%;

    object-fit: cover;

}


.default-image {

    width: 100%;

    height: 100%;

    display: flex;

    align-items: center;

    justify-content: center;

    color: #3B5998;

    font-size: 55px;

}


/* ========================================================= */
/* CONTENU */
/* ========================================================= */

.formation-content {

    padding: 22px;

}


.formation-top {

    display: flex;

    align-items: flex-start;

    justify-content: space-between;

    gap: 12px;

    margin-bottom: 12px;

}


.formation-top h2 {

    margin: 0;

    color: #1F2937;

    font-size: 20px;

    font-weight: 700;

}


/* ========================================================= */
/* STATUT */
/* ========================================================= */

.status-badge {

    flex-shrink: 0;

    display: inline-flex;

    align-items: center;

    gap: 5px;

    padding: 6px 10px;

    border-radius: 20px;

    background: #dcfce7;

    color: #166534;

    font-size: 12px;

    font-weight: 700;

}


.status-badge i {

    font-size: 11px;

}


/* ========================================================= */
/* RÉSUMÉ */
/* ========================================================= */

.formation-resume {

    color: #6b7280;

    line-height: 1.6;

    font-size: 14px;

    margin-bottom: 18px;

}


/* ========================================================= */
/* INFORMATIONS */
/* ========================================================= */

.formation-info {

    display: flex;

    flex-direction: column;

    gap: 10px;

    margin-bottom: 18px;

}


.info-item {

    display: flex;

    align-items: center;

    gap: 10px;

    color: #4b5563;

    font-size: 14px;

}


.info-item i {

    width: 18px;

    color: #3B5998;

    text-align: center;

}


.info-item strong {

    color: #1F2937;

}


/* ========================================================= */
/* ÉTAT FORMATION */
/* ========================================================= */

.formation-progress {

    display: flex;

    align-items: center;

    justify-content: space-between;

    gap: 10px;

    padding: 12px;

    border-radius: 10px;

    background: #f8fafc;

    margin-bottom: 15px;

}


.progress-label {

    color: #4b5563;

    font-size: 13px;

    font-weight: 600;

}


.etat-badge {

    padding: 5px 10px;

    border-radius: 20px;

    font-size: 12px;

    font-weight: 700;

}


/* ========================================================= */
/* ÉTAT : NON COMMENCÉE */
/* ========================================================= */

.etat-non-commencee {

    background: #e0e7ff;

    color: #3730a3;

}


/* ========================================================= */
/* ÉTAT : EN COURS */
/* ========================================================= */

.etat-en-cours {

    background: #fef3c7;

    color: #92400e;

}


/* ========================================================= */
/* ÉTAT : TERMINÉE */
/* ========================================================= */

.etat-terminee {

    background: #dcfce7;

    color: #166534;

}


/* ========================================================= */
/* ÉTAT : ABANDONNÉE */
/* ========================================================= */

.etat-abandonnee {

    background: #fee2e2;

    color: #991b1b;

}


/* ========================================================= */
/* DATE */
/* ========================================================= */

.date-inscription {

    color: #6b7280;

    font-size: 13px;

    border-top: 1px solid #e5e7eb;

    padding-top: 13px;

}


.date-inscription i {

    color: #3B5998;

    margin-right: 5px;

}


/* ========================================================= */
/* RESPONSIVE */
/* ========================================================= */

@media (max-width: 768px) {

    .formations-page {

        padding: 15px;

    }


    .page-header {

        padding: 20px;

    }


    .page-header h1 {

        font-size: 23px;

    }


    .formations-grid {

        grid-template-columns: 1fr;

    }


    .formation-top {

        flex-direction: column;

    }


    .inscriptions-action {

        margin-top: 25px;

    }


    .btn-inscriptions {

        width: 100%;

    }

}

</style>
