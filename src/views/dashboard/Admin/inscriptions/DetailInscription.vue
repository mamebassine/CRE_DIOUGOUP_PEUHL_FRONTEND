
<script setup>

import {
    onMounted,
    computed
} from "vue";

import {
    useRoute
} from "vue-router";

import {
    useInscriptionStore
} from "../../../../stores/inscription";


/* =========================================================
   ROUTE
========================================================= */

const route = useRoute();


/* =========================================================
   STORE
========================================================= */

const store =
    useInscriptionStore();


/* =========================================================
   CHARGER L'INSCRIPTION
========================================================= */

onMounted(() => {

    store.fetchInscription(
        route.params.id
    );

});


/* =========================================================
   DATE FORMATTÉE
========================================================= */

const dateFormatee =
    computed(() => {

        const date =
            store.inscription?.date_inscription;

        if (!date) {

            return "Non renseignée";

        }

        return new Date(date)
            .toLocaleDateString(
                "fr-FR",
                {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric"
                }
            );

    });


/* =========================================================
   NOM APPRENANT
========================================================= */

const nomApprenant =
    computed(() => {

        const user =
            store.inscription?.apprenant?.user;

        if (!user) {

            return "Non renseigné";

        }

        return `${user.prenom || ""}
                ${user.nom || ""}`.trim();

    });

</script>


<template>

    <div class="detail-page">

        <!-- =====================================================
             EN-TÊTE
        ====================================================== -->

        <div class="page-header">

            <h1>
                Détail de l'inscription
            </h1>

            <p>
                Consultez les informations de cette inscription
            </p>

        </div>


        <!-- =====================================================
             CHARGEMENT
        ====================================================== -->

        <div
            v-if="store.loading"
            class="loading"
        >

            <div class="loader"></div>

            <p>
                Chargement des informations...
            </p>

        </div>


        <!-- =====================================================
             CONTENU
        ====================================================== -->

        <div
            v-else-if="store.inscription"
            class="detail-card"
        >

            <!-- =================================================
                 EN-TÊTE CARTE
            ================================================== -->

            <div class="card-header">

                <div class="header-icon">

                    <i class="fas fa-file-signature"></i>

                </div>


                <div>

                    <h2>
                        Informations de l'inscription
                    </h2>

                    <span>
                        Inscription #{{ store.inscription.id }}
                    </span>

                </div>

            </div>


            <!-- =================================================
                 INFORMATIONS
            ================================================== -->

            <div class="details-grid">

                <!-- APPRENANT -->

                <div class="detail-item">

                    <div class="item-icon apprenant-icon">

                        <i class="fas fa-user-graduate"></i>

                    </div>

                    <div class="item-content">

                        <span class="label">
                            APPRENANT
                        </span>

                        <strong>
                            {{ nomApprenant }}
                        </strong>

                    </div>

                </div>


                <!-- FORMATION -->

                <div class="detail-item">

                    <div class="item-icon formation-icon">

                        <i class="fas fa-graduation-cap"></i>

                    </div>

                    <div class="item-content">

                        <span class="label">
                            FORMATION
                        </span>

                        <strong>
                            {{
                                store.inscription.formation?.nom
                                || "Non renseignée"
                            }}
                        </strong>

                    </div>

                </div>


                <!-- HORAIRE -->

                <div class="detail-item">

                    <div class="item-icon horaire-icon">

                        <i class="far fa-clock"></i>

                    </div>

                    <div class="item-content">

                        <span class="label">
                            HORAIRE
                        </span>

                        <strong>
                            {{
                                store.inscription.horaire
                                || "Non renseigné"
                            }}
                        </strong>

                    </div>

                </div>


                <!-- DATE -->

                <div class="detail-item">

                    <div class="item-icon date-icon">

                        <i class="far fa-calendar-alt"></i>

                    </div>

                    <div class="item-content">

                        <span class="label">
                            DATE D'INSCRIPTION
                        </span>

                        <strong>
                            {{ dateFormatee }}
                        </strong>

                    </div>

                </div>


                <!-- STATUT -->

                <div class="detail-item">

                    <div class="item-icon statut-icon">

                        <i class="fas fa-check-circle"></i>

                    </div>

                    <div class="item-content">

                        <span class="label">
                            STATUT
                        </span>

                        <span
                            class="badge"
                            :class="{
                                valide:
                                    store.inscription.statut
                                    ?.toLowerCase()
                                    .includes('valid'),

                                attente:
                                    store.inscription.statut
                                    ?.toLowerCase()
                                    .includes('attente'),

                                refuse:
                                    store.inscription.statut
                                    ?.toLowerCase()
                                    .includes('refus')
                            }"
                        >

                            <span class="status-dot"></span>

                            {{
                                store.inscription.statut
                                || "Non renseigné"
                            }}

                        </span>

                    </div>

                </div>


                <!-- ÉTAT FORMATION -->

                <div class="detail-item">

                    <div class="item-icon etat-icon">

                        <i class="fas fa-book-open"></i>

                    </div>

                    <div class="item-content">

                        <span class="label">
                            ÉTAT DE LA FORMATION
                        </span>

                        <strong>
                            {{
                                store.inscription.etat_formation
                                || "Non renseigné"
                            }}
                        </strong>

                    </div>

                </div>

            </div>


            <!-- =================================================
                 PIED DE CARTE
            ================================================== -->

            <div class="card-footer">

                <button
                    type="button"
                    class="btn-footer-retour"
                    @click="$router.back()"
                >

                    <i class="fas fa-arrow-left"></i>

                    Retour à la liste

                </button>

            </div>

        </div>


        <!-- =====================================================
             INSCRIPTION INTROUVABLE
        ====================================================== -->

        <div
            v-else
            class="not-found"
        >

            <div class="not-found-icon">

                <i class="fas fa-file-circle-xmark"></i>

            </div>

            <h3>
                Inscription introuvable
            </h3>

            <p>
                Les informations de cette inscription ne sont pas disponibles.
            </p>

            <button
                type="button"
                class="btn-footer-retour"
                @click="$router.back()"
            >

                <i class="fas fa-arrow-left"></i>

                Retour

            </button>

        </div>

    </div>

</template>


<style scoped>

/* =========================================================
   PAGE
========================================================= */

.detail-page {

    width: 100%;

    min-height: 100%;

}


/* =========================================================
   HEADER
========================================================= */

.page-header {

    margin-bottom: 28px;

}


.page-header h1 {

    margin: 0;

    color: #172554;

    font-size: 30px;

    font-weight: 800;

}


.page-header p {

    margin: 6px 0 0;

    color: #64748b;

    font-size: 14px;

}


/* =========================================================
   CARTE
========================================================= */

.detail-card {

    width: 100%;

    background: #ffffff;

    border: 1px solid #e8edf5;

    border-radius: 20px;

    box-shadow:
        0 8px 30px rgba(15, 23, 42, 0.06);

    overflow: hidden;

}


/* =========================================================
   HEADER CARTE
========================================================= */

.card-header {

    display: flex;

    align-items: center;

    gap: 15px;

    padding: 25px 30px;

    border-bottom: 1px solid #edf1f7;

}


.header-icon {

    width: 55px;

    height: 55px;

    border-radius: 14px;

    display: flex;

    align-items: center;

    justify-content: center;

    background: #eef2ff;

    color: #3B5998;

    font-size: 21px;

}


.card-header h2 {

    margin: 0;

    color: #172554;

    font-size: 20px;

    font-weight: 800;

}


.card-header span {

    display: block;

    margin-top: 5px;

    color: #94a3b8;

    font-size: 13px;

}


/* =========================================================
   GRILLE
========================================================= */

.details-grid {

    display: grid;

    grid-template-columns:
        repeat(2, minmax(0, 1fr));

    gap: 18px;

    padding: 30px;

}


/* =========================================================
   ITEM
========================================================= */

.detail-item {

    min-height: 95px;

    padding: 18px;

    display: flex;

    align-items: center;

    gap: 15px;

    background: #f8fafc;

    border: 1px solid #edf1f7;

    border-radius: 14px;

    transition: .2s ease;

}


.detail-item:hover {

    background: #ffffff;

    border-color: #dbe4f0;

    box-shadow:
        0 5px 18px rgba(15, 23, 42, 0.05);

    transform: translateY(-2px);

}


/* =========================================================
   ICÔNES
========================================================= */

.item-icon {

    width: 45px;

    height: 45px;

    flex-shrink: 0;

    border-radius: 12px;

    display: flex;

    align-items: center;

    justify-content: center;

    font-size: 17px;

}


.apprenant-icon {

    background: #eef2ff;

    color: #3B5998;

}


.formation-icon {

    background: #ecfdf3;

    color: #15803d;

}


.horaire-icon {

    background: #fff7df;

    color: #a66a00;

}


.date-icon {

    background: #f3e8ff;

    color: #9333ea;

}


.statut-icon {

    background: #ecfdf3;

    color: #16a34a;

}


.etat-icon {

    background: #e0f2fe;

    color: #0284c7;

}


/* =========================================================
   CONTENU
========================================================= */

.item-content {

    min-width: 0;

    display: flex;

    flex-direction: column;

    gap: 6px;

}


.label {

    color: #94a3b8;

    font-size: 10px;

    font-weight: 800;

    letter-spacing: .7px;

}


.item-content strong {

    color: #334155;

    font-size: 14px;

    font-weight: 700;

    word-break: break-word;

}


/* =========================================================
   BADGES
========================================================= */

.badge {

    width: fit-content;

    display: inline-flex;

    align-items: center;

    gap: 7px;

    padding: 7px 12px;

    border-radius: 30px;

    background: #f1f5f9;

    color: #64748b;

    font-size: 11px;

    font-weight: 800;

}


.status-dot {

    width: 7px;

    height: 7px;

    border-radius: 50%;

    background: #94a3b8;

}


/* =========================================================
   VALIDÉ
========================================================= */

.badge.valide {

    background: #ecfdf3;

    color: #15803d;

}


.badge.valide .status-dot {

    background: #22c55e;

}


/* =========================================================
   ATTENTE
========================================================= */

.badge.attente {

    background: #fff7df;

    color: #a66a00;

}


.badge.attente .status-dot {

    background: #f59e0b;

}


/* =========================================================
   REFUS
========================================================= */

.badge.refuse {

    background: #fff1f2;

    color: #dc2626;

}


.badge.refuse .status-dot {

    background: #ef4444;

}


/* =========================================================
   FOOTER
========================================================= */

.card-footer {

    padding: 20px 30px;

    border-top: 1px solid #edf1f7;

    display: flex;

    justify-content: flex-end;

}


/* =========================================================
   BOUTON FOOTER
========================================================= */

.btn-footer-retour {

    height: 40px;

    padding: 0 16px;

    border: none;

    border-radius: 9px;

    background: #3B5998;

    color: #ffffff;

    display: flex;

    align-items: center;

    gap: 8px;

    cursor: pointer;

    font-size: 12px;

    font-weight: 700;

    transition: .2s ease;

}


.btn-footer-retour:hover {

    background: #2E7D32;

    transform: translateY(-2px);

}


/* =========================================================
   CHARGEMENT
========================================================= */

.loading {

    min-height: 300px;

    background: #ffffff;

    border-radius: 18px;

    display: flex;

    flex-direction: column;

    align-items: center;

    justify-content: center;

    color: #64748b;

}


.loader {

    width: 42px;

    height: 42px;

    border-radius: 50%;

    border: 4px solid #e8edf5;

    border-top-color: #3B5998;

    animation: rotation .8s linear infinite;

    margin-bottom: 15px;

}


@keyframes rotation {

    to {

        transform: rotate(360deg);

    }

}


/* =========================================================
   INTROUVABLE
========================================================= */

.not-found {

    padding: 70px 20px;

    background: #ffffff;

    border: 1px solid #e8edf5;

    border-radius: 20px;

    text-align: center;

}


.not-found-icon {

    width: 70px;

    height: 70px;

    margin: 0 auto 18px;

    border-radius: 50%;

    background: #f1f5f9;

    color: #94a3b8;

    display: flex;

    align-items: center;

    justify-content: center;

    font-size: 26px;

}


.not-found h3 {

    margin: 0 0 8px;

    color: #334155;

    font-size: 18px;

}


.not-found p {

    margin: 0 0 20px;

    color: #94a3b8;

    font-size: 13px;

}


/* =========================================================
   RESPONSIVE
========================================================= */

@media (max-width: 900px) {

    .details-grid {

        grid-template-columns: 1fr;

    }

}


@media (max-width: 600px) {

    .page-header h1 {

        font-size: 24px;

    }


    .card-header {

        padding: 20px;

    }


    .details-grid {

        padding: 20px;

        gap: 12px;

    }


    .detail-item {

        padding: 15px;

    }


    .card-footer {

        padding: 18px 20px;

    }

}

</style>
