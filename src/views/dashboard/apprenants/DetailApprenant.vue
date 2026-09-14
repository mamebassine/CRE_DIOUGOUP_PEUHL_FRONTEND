<template>

    <div class="page">

        <div class="detail-card">

            <!-- ================================================= -->
            <!-- HEADER PROFIL -->
            <!-- ================================================= -->

            <div class="profile-header">

                <div class="photo-section">

                    <img
                        v-if="apprenant.photo"
                        :src="`http://127.0.0.1:8000/storage/${apprenant.photo}`"
                        class="photo"
                        alt="Photo de l'apprenant"
                    >

                    <div
                        v-else
                        class="photo photo-default"
                    >

                        <i class="fas fa-user"></i>

                    </div>

                </div>


                <div class="profile-info">

                    <h2>

                        {{ apprenant.user?.prenom || "" }}

                        {{ apprenant.user?.nom || "" }}

                    </h2>


                    <p>

                        Matricule :

                        <strong>

                            {{ apprenant.matricule || "-" }}

                        </strong>

                    </p>


                    <span class="status">

                        {{ apprenant.statut || "Actif" }}

                    </span>

                </div>

            </div>


            <!-- ================================================= -->
            <!-- CHARGEMENT -->
            <!-- ================================================= -->

            <div
                v-if="loading"
                class="loading"
            >

                <i class="fas fa-spinner fa-spin"></i>

                Chargement...

            </div>


            <!-- ================================================= -->
            <!-- CONTENU -->
            <!-- ================================================= -->

            <div
                v-else
                class="content"
            >

                <!-- ================================================= -->
                <!-- INFORMATIONS PERSONNELLES -->
                <!-- ================================================= -->

                <div class="section">

                    <h3>

                        <i class="fas fa-user"></i>

                        Informations personnelles

                    </h3>


                    <div class="grid">

                        <!-- NOM -->

                        <div class="info-card">

                            <label>
                                Nom
                            </label>

                            <span>
                                {{ apprenant.user?.nom || "-" }}
                            </span>

                        </div>


                        <!-- PRÉNOM -->

                        <div class="info-card">

                            <label>
                                Prénom
                            </label>

                            <span>
                                {{ apprenant.user?.prenom || "-" }}
                            </span>

                        </div>


                        <!-- EMAIL -->

                        <div class="info-card">

                            <label>
                                Email
                            </label>

                            <span>
                                {{
                                    apprenant.user?.email
                                    || apprenant.email
                                    || "-"
                                }}
                            </span>

                        </div>


                        <!-- TÉLÉPHONE -->

                        <div class="info-card">

                            <label>
                                Téléphone
                            </label>

                            <span>
                                {{
                                    apprenant.telephone
                                    || apprenant.user?.telephone
                                    || "-"
                                }}
                            </span>

                        </div>


                        <!-- DATE NAISSANCE -->

                        <div class="info-card">

                            <label>
                                Date de naissance
                            </label>

                            <span>
                                {{ formaterDate(apprenant.date_naissance) }}
                            </span>

                        </div>


                        <!-- SEXE -->

                        <div class="info-card">

                            <label>
                                Sexe
                            </label>

                            <span>
                                {{ apprenant.sexe || "-" }}
                            </span>

                        </div>


                        <!-- ADRESSE -->

                        <div class="info-card">

                            <label>
                                Adresse
                            </label>

                            <span>
                                {{ apprenant.adresse || "-" }}
                            </span>

                        </div>


                        <!-- SITUATION -->

                        <div class="info-card">

                            <label>
                                Situation matrimoniale
                            </label>

                            <span>
                                {{ apprenant.situation_matrimoniale || "-" }}
                            </span>

                        </div>

                    </div>

                </div>


                <!-- ================================================= -->
                <!-- INFORMATIONS FORMATION -->
                <!-- ================================================= -->

                <div class="section">

                    <h3>

                        <i class="fas fa-graduation-cap"></i>

                        Formation

                    </h3>


                    <!-- AUCUNE INSCRIPTION -->

                    <div
                        v-if="!inscriptions.length"
                        class="no-formation"
                    >

                        <i class="fas fa-info-circle"></i>

                        Cet apprenant n'a aucune inscription.

                    </div>


                    <!-- INSCRIPTIONS -->

                    <div
                        v-for="inscription in inscriptions"
                        :key="inscription.id"
                        class="inscription-card"
                    >

                        <div class="inscription-title">

                            <i class="fas fa-graduation-cap"></i>

                            <strong>

                                {{
                                    inscription.formation?.nom
                                    || "Formation inconnue"
                                }}

                            </strong>

                        </div>


                        <div class="grid">

                            <!-- NIVEAU ÉTUDE -->

                            <div class="info-card">

                                <label>
                                    Niveau d'étude
                                </label>

                                <span>
                                    {{ apprenant.niveau_etude || "-" }}
                                </span>

                            </div>


                            <!-- NIVEAU INFORMATIQUE -->

                            <div class="info-card">

                                <label>
                                    Niveau informatique
                                </label>

                                <span>
                                    {{ apprenant.niveau_informatique || "-" }}
                                </span>

                            </div>


                            <!-- FORMATION -->

                            <div class="info-card">

                                <label>
                                    Formation
                                </label>

                                <span>
                                    {{ inscription.formation?.nom || "-" }}
                                </span>

                            </div>


                            <!-- HORAIRE -->

                            <div class="info-card">

                                <label>
                                    Horaire
                                </label>

                                <span>
                                    {{ inscription.horaire || "-" }}
                                </span>

                            </div>


                            <!-- DATE INSCRIPTION -->

                            <div class="info-card">

                                <label>
                                    Date d'inscription
                                </label>

                                <span>
                                    {{ formaterDate(inscription.date_inscription) }}
                                </span>

                            </div>


                            <!-- STATUT -->

                            <div class="info-card">

                                <label>
                                    Statut
                                </label>

                                <span
                                    :class="[
                                        'badge',
                                        getStatutClass(inscription.statut)
                                    ]"
                                >

                                    <span class="status-dot"></span>

                                    {{ inscription.statut || "-" }}

                                </span>

                            </div>


                            <!-- ÉTAT FORMATION -->

                            <div class="info-card">

                                <label>
                                    État de la formation
                                </label>

                                <span>
                                    {{ inscription.etat_formation || "-" }}
                                </span>

                            </div>


                            <!-- CAPACITÉ -->

                            <div class="info-card">

                                <label>
                                    Capacité de la formation
                                </label>

                                <span>

                                    {{
                                        inscription.formation?.capacite
                                            ? inscription.formation.capacite + " apprenants"
                                            : "Illimitée"
                                    }}

                                </span>

                            </div>

                        </div>

                    </div>

                </div>


                <!-- ================================================= -->
                <!-- INFORMATIONS COMPLÉMENTAIRES -->
                <!-- ================================================= -->

                <div class="section">

                    <h3>

                        <i class="fas fa-briefcase"></i>

                        Informations complémentaires

                    </h3>


                    <div class="grid">

                        <!-- FONCTION -->

                        <div class="info-card">

                            <label>
                                Fonction
                            </label>

                            <span>
                                {{ apprenant.fonction || "-" }}
                            </span>

                        </div>


                        <!-- MATRICULE -->

                        <div class="info-card">

                            <label>
                                Matricule
                            </label>

                            <span>
                                {{ apprenant.matricule || "-" }}
                            </span>

                        </div>

                    </div>

                </div>


                <!-- ================================================= -->
                <!-- RETOUR -->
                <!-- ================================================= -->

                <div class="actions">

                    <button
                        type="button"
                        class="btn-retour"
                        @click="retour"
                    >

                        <i class="fas fa-arrow-left"></i>

                        Retour

                    </button>

                </div>

            </div>

        </div>

    </div>

</template>


<script setup>

import {
    ref,
    computed,
    onMounted
} from "vue";

import {
    useRoute,
    useRouter
} from "vue-router";

import {
    getApprenant
} from "../../../services/apprenantService";


/* =====================================================
   ROUTER
===================================================== */

const route = useRoute();

const router = useRouter();


/* =====================================================
   DONNÉES
===================================================== */

const apprenant = ref({});

const loading = ref(true);


/* =====================================================
   INSCRIPTIONS
===================================================== */

const inscriptions = computed(() => {

    if (
        !apprenant.value ||
        !Array.isArray(apprenant.value.inscriptions)
    ) {

        return [];

    }

    return apprenant.value.inscriptions;

});


/* =====================================================
   FORMATER DATE
===================================================== */

function formaterDate(date) {

    if (!date) {

        return "-";

    }

    try {

        return new Date(date).toLocaleDateString(
            "fr-FR",
            {
                day: "2-digit",
                month: "2-digit",
                year: "numeric"
            }
        );

    }

    catch {

        return "-";

    }

}


/* =====================================================
   CLASSE STATUT
===================================================== */

function getStatutClass(statut) {

    if (!statut) {

        return "statut-default";

    }


    const valeur =
        statut
            .toLowerCase()
            .trim();


    if (
        valeur.includes("valid")
        ||
        valeur.includes("accept")
        ||
        valeur.includes("inscrit")
    ) {

        return "statut-valide";

    }


    if (
        valeur.includes("attente")
        ||
        valeur.includes("pending")
    ) {

        return "statut-attente";

    }


    if (
        valeur.includes("refus")
        ||
        valeur.includes("annul")
    ) {

        return "statut-refuse";

    }


    return "statut-default";

}


/* =====================================================
   CHARGER APPRENANT
===================================================== */

async function charger() {

    loading.value = true;


    try {

        const response =
            await getApprenant(
                route.params.id
            );


        apprenant.value =
            response.data;


        console.log(
            "Apprenant chargé :",
            apprenant.value
        );

    }

    catch (error) {

        console.error(
            "Erreur chargement apprenant :",
            error
        );

        console.error(
            "Réponse API :",
            error.response?.data
        );

    }

    finally {

        loading.value = false;

    }

}


/* =====================================================
   RETOUR
===================================================== */

function retour() {

    router.back();

}


/* =====================================================
   MOUNTED
===================================================== */

onMounted(() => {

    charger();

});

</script>


<style scoped>

/* =========================================================
   PAGE
========================================================= */

.page {

    width: 100%;

    min-height: 100vh;

    padding: 35px;

    background: #f1f5f9;

}


/* =========================================================
   CARTE PRINCIPALE
========================================================= */

.detail-card {

    width: 100%;

    max-width: 1100px;

    margin: 0 auto;

    background: #ffffff;

    border-radius: 22px;

    overflow: hidden;

    border: 1px solid #e2e8f0;

    box-shadow:
        0 15px 40px rgba(15, 23, 42, 0.08);

}


/* =========================================================
   HEADER PROFIL
========================================================= */

.profile-header {

    background:
        linear-gradient(
            135deg,
            #3B5998,
            #2E7D32
        );

    padding: 35px 40px;

    color: #ffffff;

    display: flex;

    align-items: center;

    gap: 28px;

}


/* =========================================================
   PHOTO
========================================================= */

.photo {

    width: 125px;

    height: 125px;

    border-radius: 50%;

    object-fit: cover;

    border: 5px solid #ffffff;

    box-shadow:
        0 8px 25px rgba(0, 0, 0, .25);

}


.photo-default {

    display: flex;

    align-items: center;

    justify-content: center;

    background: rgba(255,255,255,.2);

    font-size: 45px;

}


/* =========================================================
   INFORMATIONS PROFIL
========================================================= */

.profile-info h2 {

    margin: 0 0 10px;

    font-size: 28px;

    font-weight: 800;

}


.profile-info p {

    margin: 0;

    font-size: 15px;

    opacity: .95;

}


.profile-info p strong {

    font-weight: 800;

}


.status {

    display: inline-flex;

    align-items: center;

    margin-top: 15px;

    padding: 7px 18px;

    border-radius: 30px;

    background: #ffffff;

    color: #15803d;

    font-size: 13px;

    font-weight: 800;

}


/* =========================================================
   CONTENU
========================================================= */

.content {

    padding: 35px 40px;

}


/* =========================================================
   SECTION
========================================================= */

.section {

    margin-bottom: 38px;

}


.section h3 {

    display: flex;

    align-items: center;

    gap: 10px;

    margin: 0 0 20px;

    color: #3B5998;

    font-size: 19px;

    font-weight: 800;

}


.section h3 i {

    font-size: 18px;

}


/* =========================================================
   GRID
========================================================= */

.grid {

    display: grid;

    grid-template-columns:
        repeat(2, minmax(0, 1fr));

    gap: 16px;

}


/* =========================================================
   INFO CARD
========================================================= */

.info-card {

    padding: 17px 19px;

    background: #f8fafc;

    border: 1px solid #e2e8f0;

    border-radius: 14px;

    transition: .2s ease;

}


.info-card:hover {

    transform: translateY(-2px);

    border-color: #cbd5e1;

    box-shadow:
        0 7px 18px rgba(15,23,42,.06);

}


.info-card label {

    display: block;

    margin-bottom: 7px;

    color: #64748b;

    font-size: 12px;

    font-weight: 700;

}


.info-card span {

    display: block;

    color: #1e293b;

    font-size: 14px;

    font-weight: 700;

    word-break: break-word;

}


/* =========================================================
   CARTE INSCRIPTION
========================================================= */

.inscription-card {

    padding: 22px;

    margin-bottom: 18px;

    background: #ffffff;

    border: 1px solid #e2e8f0;

    border-radius: 17px;

    box-shadow:
        0 5px 18px rgba(15,23,42,.05);

}


/* =========================================================
   TITRE INSCRIPTION
========================================================= */

.inscription-title {

    display: flex;

    align-items: center;

    gap: 10px;

    margin-bottom: 18px;

    padding-bottom: 14px;

    color: #3B5998;

    border-bottom: 1px solid #e2e8f0;

    font-size: 17px;

}


.inscription-title i {

    font-size: 18px;

}


/* =========================================================
   MESSAGE AUCUNE FORMATION
========================================================= */

.no-formation {

    display: flex;

    justify-content: center;

    align-items: center;

    gap: 9px;

    padding: 25px;

    background: #f8fafc;

    border: 1px dashed #cbd5e1;

    border-radius: 15px;

    color: #64748b;

    font-size: 14px;

}


/* =========================================================
   BADGES
========================================================= */

.badge {

    display: inline-flex !important;

    align-items: center;

    gap: 7px;

    width: fit-content;

    padding: 7px 12px;

    border-radius: 30px;

    font-size: 12px !important;

    font-weight: 800 !important;

}


.status-dot {

    width: 7px;

    height: 7px;

    border-radius: 50%;

}


/* =========================================================
   STATUT VALIDE
========================================================= */

.statut-valide {

    background: #ecfdf3;

    color: #15803d !important;

}


.statut-valide .status-dot {

    background: #22c55e;

}


/* =========================================================
   STATUT ATTENTE
========================================================= */

.statut-attente {

    background: #fff7df;

    color: #a66a00 !important;

}


.statut-attente .status-dot {

    background: #f59e0b;

}


/* =========================================================
   STATUT REFUSE
========================================================= */

.statut-refuse {

    background: #fff1f2;

    color: #dc2626 !important;

}


.statut-refuse .status-dot {

    background: #ef4444;

}


/* =========================================================
   STATUT DEFAULT
========================================================= */

.statut-default {

    background: #f1f5f9;

    color: #64748b !important;

}


.statut-default .status-dot {

    background: #94a3b8;

}


/* =========================================================
   LOADING
========================================================= */

.loading {

    min-height: 300px;

    display: flex;

    align-items: center;

    justify-content: center;

    gap: 10px;

    color: #3B5998;

    font-size: 16px;

    font-weight: 700;

}


/* =========================================================
   ACTIONS
========================================================= */

.actions {

    display: flex;

    justify-content: flex-end;

    padding-top: 5px;

}


/* =========================================================
   BOUTON RETOUR
========================================================= */

.btn-retour {

    display: flex;

    align-items: center;

    justify-content: center;

    gap: 9px;

    padding: 12px 22px;

    border: none;

    border-radius: 11px;

    background: #3B5998;

    color: #ffffff;

    cursor: pointer;

    font-size: 14px;

    font-weight: 700;

    transition: .2s ease;

}


.btn-retour:hover {

    background: #2E7D32;

    transform: translateY(-2px);

    box-shadow:
        0 7px 18px rgba(59,89,152,.25);

}


/* =========================================================
   RESPONSIVE
========================================================= */

@media (max-width: 768px) {

    .page {

        padding: 15px;

    }


    .profile-header {

        padding: 25px 20px;

        flex-direction: column;

        text-align: center;

    }


    .profile-info h2 {

        font-size: 23px;

    }


    .content {

        padding: 25px 20px;

    }


    .grid {

        grid-template-columns: 1fr;

    }


    .actions {

        justify-content: stretch;

    }


    .btn-retour {

        width: 100%;

    }

}


@media (max-width: 480px) {

    .page {

        padding: 10px;

    }


    .detail-card {

        border-radius: 15px;

    }


    .photo {

        width: 105px;

        height: 105px;

    }

}

</style>