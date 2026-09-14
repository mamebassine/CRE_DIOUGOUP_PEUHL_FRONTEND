<script setup>

import { onMounted } from "vue";

import {
    useRoute,
    useRouter
} from "vue-router";

import {
    useFormationStore
} from "../../../stores/formation";


const route = useRoute();

const router = useRouter();

const store =
    useFormationStore();


// =====================================================
// CHARGER LA FORMATION
// =====================================================

onMounted(() => {

    store.fetchFormation(
        route.params.id
    );

});


// =====================================================
// RETOUR
// =====================================================

function retour() {

    router.back();

}


// =====================================================
// VÉRIFIER URL
// =====================================================

function isUrl(value) {

    if (!value) {

        return false;

    }

    try {

        new URL(value);

        return true;

    }

    catch {

        return false;

    }

}


// =====================================================
// URL IMAGE
// =====================================================

function getImageUrl(icone) {

    if (!icone) {

        return null;

    }

    if (isUrl(icone)) {

        return icone;

    }

    return `http://127.0.0.1:8000/storage/${icone}`;

}


// =====================================================
// ERREUR IMAGE
// =====================================================

function imageError(event) {

    event.target.style.display =
        "none";

}


// =====================================================
// CLASSE STATUT
// =====================================================

function getStatutClass(active) {

    return active
        ? "statut-active"
        : "statut-inactive";

}

</script>


<template>

<div class="page">


    <!-- ================================================= -->
    <!-- CHARGEMENT -->
    <!-- ================================================= -->

    <div
        v-if="store.loading"
        class="loading"
    >

        <div class="loader"></div>

        <p>
            Chargement de la formation...
        </p>

    </div>


    <!-- ================================================= -->
    <!-- FORMATION -->
    <!-- ================================================= -->

    <div
        v-else-if="store.formation"
        class="detail-card"
    >


        <!-- ================================================= -->
        <!-- HEADER FORMATION -->
        <!-- ================================================= -->

        <div class="formation-header">


            <!-- IMAGE -->

            <div class="photo-section">

                <img
                    v-if="store.formation.icone"
                    :src="
                        getImageUrl(
                            store.formation.icone
                        )
                    "
                    :alt="store.formation.nom"
                    class="formation-photo"
                    @error="imageError"
                >

                <div
                    v-else
                    class="formation-photo no-image"
                >

                    <i class="fas fa-graduation-cap"></i>

                </div>

            </div>


            <!-- INFORMATIONS -->

            <div class="formation-header-info">

                <h2>

                    {{ store.formation.nom || "Formation" }}

                </h2>


                <p>

                    Formation professionnelle

                </p>


                <span
                    :class="[
                        'status',
                        getStatutClass(
                            store.formation.is_active
                        )
                    ]"
                >

                    <span class="status-dot"></span>

                    {{
                        store.formation.is_active
                            ? "Formation active"
                            : "Formation inactive"
                    }}

                </span>

            </div>

        </div>


        <!-- ================================================= -->
        <!-- CONTENU -->
        <!-- ================================================= -->

        <div class="content">


            <!-- ================================================= -->
            <!-- BOUTON RETOUR -->
            <!-- ================================================= -->

            <div class="top-action">

                <button
                    class="btn-retour"
                    type="button"
                    @click="retour"
                >

                    <i class="fas fa-arrow-left"></i>

                    Retour

                </button>

            </div>


            <!-- ================================================= -->
            <!-- DESCRIPTION -->
            <!-- ================================================= -->

            <div class="section">

                <h3>

                    <i class="fas fa-align-left"></i>

                    Description

                </h3>


                <div class="description-card">

                    <p>

                        {{
                            store.formation.description
                            || "Aucune description disponible."
                        }}

                    </p>

                </div>

            </div>


            <!-- ================================================= -->
            <!-- INFORMATIONS FORMATION -->
            <!-- ================================================= -->

            <div class="section">

                <h3>

                    <i class="fas fa-info-circle"></i>

                    Informations de la formation

                </h3>


                <div class="grid">


                    <!-- DURÉE -->

                    <div class="info-card">

                        <label>

                            <i class="fas fa-clock"></i>

                            Durée

                        </label>

                        <span>

                            {{ store.formation.duree || "-" }}

                        </span>

                    </div>


                    <!-- DIPLÔME -->

                    <div class="info-card">

                        <label>

                            <i class="fas fa-certificate"></i>

                            Diplôme

                        </label>

                        <span>

                            {{ store.formation.diplome || "-" }}

                        </span>

                    </div>


                    <!-- LIEU -->

                    <div class="info-card">

                        <label>

                            <i class="fas fa-map-marker-alt"></i>

                            Lieu

                        </label>

                        <span>

                            {{ store.formation.lieu || "-" }}

                        </span>

                    </div>


                    <!-- CAPACITÉ -->

                    <div class="info-card">

                        <label>

                            <i class="fas fa-users"></i>

                            Capacité

                        </label>

                        <span>

                            {{
                                store.formation.capacite
                                    ? store.formation.capacite + " apprenants"
                                    : "Illimitée"
                            }}

                        </span>

                    </div>

                </div>

            </div>


            <!-- ================================================= -->
            <!-- RÉSUMÉ -->
            <!-- ================================================= -->

            <div
                v-if="store.formation.resume"
                class="section"
            >

                <h3>

                    <i class="fas fa-file-alt"></i>

                    Résumé

                </h3>


                <div class="text-card">

                    <p>

                        {{ store.formation.resume }}

                    </p>

                </div>

            </div>


            <!-- ================================================= -->
            <!-- OBJECTIFS -->
            <!-- ================================================= -->

            <div
                v-if="
                    store.formation.objectifs &&
                    store.formation.objectifs.length
                "
                class="section"
            >

                <h3>

                    <i class="fas fa-bullseye"></i>

                    Objectifs de la formation

                </h3>


                <div class="objectifs-card">

                    <div
                        v-for="
                            (objectif, index)
                            in store.formation.objectifs
                        "
                        :key="index"
                        class="objectif"
                    >

                        <span class="objectif-icon">

                            <i class="fas fa-check"></i>

                        </span>


                        <span>

                            {{ objectif }}

                        </span>

                    </div>

                </div>

            </div>


            <!-- ================================================= -->
            <!-- STATUT -->
            <!-- ================================================= -->

            <div class="section">

                <h3>

                    <i class="fas fa-toggle-on"></i>

                    Statut

                </h3>


                <div class="status-card">

                    <span
                        :class="[
                            'badge',
                            getStatutClass(
                                store.formation.is_active
                            )
                        ]"
                    >

                        <span class="status-dot"></span>

                        {{
                            store.formation.is_active
                                ? "Active"
                                : "Inactive"
                        }}

                    </span>

                </div>

            </div>


            <!-- ================================================= -->
            <!-- BOUTON RETOUR BAS -->
            <!-- ================================================= -->

            <div class="actions">

                <button
                    class="btn-retour"
                    type="button"
                    @click="retour"
                >

                    <i class="fas fa-arrow-left"></i>

                    Retour aux formations

                </button>

            </div>


        </div>

    </div>


    <!-- ================================================= -->
    <!-- FORMATION INTROUVABLE -->
    <!-- ================================================= -->

    <div
        v-else
        class="not-found"
    >

        <div class="not-found-icon">

            <i class="fas fa-graduation-cap"></i>

        </div>


        <h3>

            Formation introuvable

        </h3>


        <p>

            La formation demandée n'existe pas ou
            n'est plus disponible.

        </p>


        <button
            class="btn-retour"
            type="button"
            @click="retour"
        >

            <i class="fas fa-arrow-left"></i>

            Retour

        </button>

    </div>

</div>

</template>


<style scoped>

/* ===================================================== */
/* PAGE */
/* ===================================================== */

.page {

    min-height: 100vh;

    padding: 40px;

    background: #f1f5f9;

    box-sizing: border-box;

}


/* ===================================================== */
/* CARD PRINCIPALE */
/* ===================================================== */

.detail-card {

    width: 100%;

    max-width: 1000px;

    margin: 0 auto;

    background: #ffffff;

    border-radius: 25px;

    overflow: hidden;

    box-shadow:
        0 20px 40px rgba(0, 0, 0, .08);

}


/* ===================================================== */
/* HEADER */
/* ===================================================== */

.formation-header {

    background:
        linear-gradient(
            135deg,
            #3B5998,
            #2E7D32
        );

    padding: 35px;

    color: white;

    display: flex;

    align-items: center;

    gap: 30px;

}


/* ===================================================== */
/* IMAGE */
/* ===================================================== */

.photo-section {

    flex-shrink: 0;

}


.formation-photo {

    width: 150px;

    height: 150px;

    border-radius: 20px;

    object-fit: cover;

    border: 6px solid white;

    background: #ffffff;

    box-shadow:
        0 10px 25px rgba(0, 0, 0, .25);

}


.no-image {

    display: flex;

    align-items: center;

    justify-content: center;

    color: #3B5998;

    background: #eef2ff;

    font-size: 45px;

}


/* ===================================================== */
/* INFORMATIONS HEADER */
/* ===================================================== */

.formation-header-info {

    flex: 1;

}


.formation-header-info h2 {

    margin: 0 0 8px;

    font-size: 30px;

    font-weight: 800;

}


.formation-header-info p {

    margin: 0;

    color: rgba(255, 255, 255, .85);

    font-size: 15px;

}


/* ===================================================== */
/* STATUT HEADER */
/* ===================================================== */

.status {

    display: inline-flex;

    align-items: center;

    gap: 8px;

    margin-top: 18px;

    padding: 8px 18px;

    border-radius: 30px;

    background: white;

    font-size: 13px;

    font-weight: 700;

}


.status-dot {

    width: 8px;

    height: 8px;

    border-radius: 50%;

    display: inline-block;

}


.status.statut-active {

    color: #15803d;

}


.status.statut-active .status-dot {

    background: #22c55e;

}


.status.statut-inactive {

    color: #dc2626;

}


.status.statut-inactive .status-dot {

    background: #ef4444;

}


/* ===================================================== */
/* CONTENU */
/* ===================================================== */

.content {

    padding: 35px;

}


/* ===================================================== */
/* ACTION HAUT */
/* ===================================================== */

.top-action {

    margin-bottom: 30px;

}


/* ===================================================== */
/* BOUTON RETOUR */
/* ===================================================== */

.btn-retour {

    display: inline-flex;

    align-items: center;

    justify-content: center;

    gap: 10px;

    padding: 12px 22px;

    border: none;

    border-radius: 12px;

    background: #3B5998;

    color: #ffffff;

    font-size: 14px;

    font-weight: 700;

    cursor: pointer;

    transition: .3s ease;

}


.btn-retour:hover {

    background: #2E7D32;

    transform: translateX(-3px);

    box-shadow:
        0 8px 20px rgba(59, 89, 152, .25);

}


/* ===================================================== */
/* SECTION */
/* ===================================================== */

.section {

    margin-bottom: 40px;

}


.section h3 {

    display: flex;

    align-items: center;

    gap: 10px;

    margin: 0 0 20px;

    color: #3B5998;

    font-size: 20px;

    font-weight: 800;

}


.section h3 i {

    font-size: 18px;

}


/* ===================================================== */
/* DESCRIPTION */
/* ===================================================== */

.description-card {

    padding: 20px;

    background: #f8fafc;

    border: 1px solid #e2e8f0;

    border-radius: 15px;

}


.description-card p {

    margin: 0;

    color: #475569;

    line-height: 1.8;

    font-size: 14px;

}


/* ===================================================== */
/* GRID */
/* ===================================================== */

.grid {

    display: grid;

    grid-template-columns:
        repeat(2, 1fr);

    gap: 20px;

}


/* ===================================================== */
/* INFO CARD */
/* ===================================================== */

.info-card {

    background: #f8fafc;

    padding: 18px;

    border-radius: 15px;

    border: 1px solid #e2e8f0;

    transition: .3s ease;

}


.info-card:hover {

    transform: translateY(-3px);

    box-shadow:
        0 10px 20px rgba(0, 0, 0, .07);

}


.info-card label {

    display: flex;

    align-items: center;

    gap: 8px;

    color: #64748b;

    font-size: 13px;

    margin-bottom: 9px;

}


.info-card label i {

    color: #3B5998;

}


.info-card span {

    color: #1e293b;

    font-size: 15px;

    font-weight: 700;

    word-break: break-word;

}


/* ===================================================== */
/* CARTE TEXTE */
/* ===================================================== */

.text-card {

    padding: 20px;

    background: #f8fafc;

    border-radius: 15px;

    border: 1px solid #e2e8f0;

}


.text-card p {

    margin: 0;

    color: #475569;

    line-height: 1.8;

    font-size: 14px;

}


/* ===================================================== */
/* OBJECTIFS */
/* ===================================================== */

.objectifs-card {

    display: flex;

    flex-direction: column;

    gap: 12px;

}


.objectif {

    display: flex;

    align-items: center;

    gap: 12px;

    padding: 15px 18px;

    background: #f8fafc;

    border: 1px solid #e2e8f0;

    border-radius: 14px;

    color: #334155;

    font-size: 14px;

    line-height: 1.5;

}


.objectif-icon {

    width: 30px;

    height: 30px;

    flex-shrink: 0;

    display: flex;

    align-items: center;

    justify-content: center;

    border-radius: 50%;

    background: #dcfce7;

    color: #15803d;

    font-size: 12px;

}


/* ===================================================== */
/* STATUT */
/* ===================================================== */

.status-card {

    padding: 18px;

    background: #f8fafc;

    border-radius: 15px;

    border: 1px solid #e2e8f0;

}


/* ===================================================== */
/* BADGE */
/* ===================================================== */

.badge {

    display: inline-flex;

    align-items: center;

    gap: 8px;

    padding: 9px 16px;

    border-radius: 30px;

    font-size: 13px;

    font-weight: 700;

}


.badge.statut-active {

    background: #dcfce7;

    color: #15803d;

}


.badge.statut-active .status-dot {

    background: #22c55e;

}


.badge.statut-inactive {

    background: #fee2e2;

    color: #dc2626;

}


.badge.statut-inactive .status-dot {

    background: #ef4444;

}


/* ===================================================== */
/* ACTIONS BAS */
/* ===================================================== */

.actions {

    display: flex;

    justify-content: flex-end;

    margin-top: 10px;

    padding-top: 25px;

    border-top: 1px solid #e2e8f0;

}


/* ===================================================== */
/* CHARGEMENT */
/* ===================================================== */

.loading {

    min-height: 400px;

    display: flex;

    flex-direction: column;

    align-items: center;

    justify-content: center;

    color: #3B5998;

}


.loader {

    width: 45px;

    height: 45px;

    border-radius: 50%;

    border: 4px solid #e2e8f0;

    border-top-color: #3B5998;

    animation:
        rotation .8s linear infinite;

    margin-bottom: 15px;

}


.loading p {

    margin: 0;

    color: #64748b;

    font-size: 14px;

}


@keyframes rotation {

    to {

        transform: rotate(360deg);

    }

}


/* ===================================================== */
/* INTROUVABLE */
/* ===================================================== */

.not-found {

    max-width: 600px;

    margin: 80px auto;

    padding: 50px 30px;

    background: #ffffff;

    border-radius: 20px;

    text-align: center;

    box-shadow:
        0 15px 35px rgba(0, 0, 0, .07);

}


.not-found-icon {

    width: 70px;

    height: 70px;

    margin: 0 auto 20px;

    border-radius: 50%;

    display: flex;

    align-items: center;

    justify-content: center;

    background: #eef2ff;

    color: #3B5998;

    font-size: 28px;

}


.not-found h3 {

    margin: 0 0 10px;

    color: #1e293b;

}


.not-found p {

    margin: 0 0 25px;

    color: #64748b;

}


/* ===================================================== */
/* RESPONSIVE */
/* ===================================================== */

@media (max-width: 768px) {

    .page {

        padding: 15px;

    }


    .formation-header {

        flex-direction: column;

        text-align: center;

        padding: 30px 20px;

    }


    .formation-photo {

        width: 125px;

        height: 125px;

    }


    .formation-header-info h2 {

        font-size: 24px;

    }


    .content {

        padding: 20px;

    }


    .grid {

        grid-template-columns: 1fr;

    }


    .section h3 {

        font-size: 18px;

    }


    .actions {

        justify-content: stretch;

    }


    .actions .btn-retour {

        width: 100%;

    }

}


@media (max-width: 480px) {

    .page {

        padding: 10px;

    }


    .detail-card {

        border-radius: 18px;

    }


    .formation-header {

        padding: 25px 15px;

    }


    .content {

        padding: 18px;

    }


    .formation-photo {

        width: 110px;

        height: 110px;

    }


    .formation-header-info h2 {

        font-size: 21px;

    }

}

</style>