<script setup>

import { onMounted } from "vue";

import {
    useRoute
} from "vue-router";

import {
    useFormationStore
} from "../../../stores/formation";


const route =
    useRoute();

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
// VÉRIFIER UNE URL
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
// URL DE L'IMAGE
// =====================================================

function getImageUrl(icone) {

    if (!icone) {

        return null;

    }


    /*
     * Image provenant d'Internet
     */

    if (isUrl(icone)) {

        return icone;

    }


    /*
     * Image locale enregistrée
     * par Laravel
     */

    return `http://127.0.0.1:8000/storage/${icone}`;

}


// =====================================================
// ERREUR IMAGE
// =====================================================

function imageError(event) {

    event.target.style.display =
        "none";

}

</script>


<template>

    <div
        v-if="store.loading"
        class="loading"
    >

        Chargement...

    </div>


    <div
        v-else-if="store.formation"
        class="formation-detail"
    >


        <!-- ================================================= -->
        <!-- IMAGE -->
        <!-- ================================================= -->

        <div class="formation-image-container">

            <img
                v-if="
                    store.formation.icone
                "
                :src="
                    getImageUrl(
                        store.formation.icone
                    )
                "
                :alt="
                    store.formation.nom
                "
                class="formation-image"
                @error="imageError"
            >


            <div
                v-else
                class="no-image"
            >

                Aucune image disponible

            </div>

        </div>


        <!-- ================================================= -->
        <!-- NOM -->
        <!-- ================================================= -->

        <h2>

            {{ store.formation.nom }}

        </h2>


        <!-- ================================================= -->
        <!-- DESCRIPTION -->
        <!-- ================================================= -->

        <p>

            {{ store.formation.description }}

        </p>


        <!-- ================================================= -->
        <!-- INFORMATIONS -->
        <!-- ================================================= -->

        <div class="formation-informations">


            <div class="information">

                <strong>
                    Durée :
                </strong>

                <span>
                    {{ store.formation.duree }}
                </span>

            </div>


            <div class="information">

                <strong>
                    Diplôme :
                </strong>

                <span>
                    {{ store.formation.diplome }}
                </span>

            </div>


            <div class="information">

                <strong>
                    Lieu :
                </strong>

                <span>
                    {{ store.formation.lieu }}
                </span>

            </div>


            <div
                v-if="
                    store.formation.capacite
                "
                class="information"
            >

                <strong>
                    Capacité :
                </strong>

                <span>
                    {{ store.formation.capacite }}
                    apprenants
                </span>

            </div>


        </div>


        <!-- ================================================= -->
        <!-- RÉSUMÉ -->
        <!-- ================================================= -->

        <div
            v-if="
                store.formation.resume
            "
            class="section"
        >

            <h3>
                Résumé
            </h3>

            <p>

                {{ store.formation.resume }}

            </p>

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
                Objectifs de la formation
            </h3>


            <ul>

                <li
                    v-for="
                        (objectif, index)
                        in store.formation.objectifs
                    "
                    :key="index"
                >

                    {{ objectif }}

                </li>

            </ul>

        </div>


        <!-- ================================================= -->
        <!-- STATUT -->
        <!-- ================================================= -->

        <div class="status">

            <span
                :class="
                    store.formation.is_active
                        ? 'active'
                        : 'inactive'
                "
            >

                {{
                    store.formation.is_active
                        ? 'Formation active'
                        : 'Formation inactive'
                }}

            </span>

        </div>


    </div>


    <!-- ===================================================== -->
    <!-- FORMATION INTROUVABLE -->
    <!-- ===================================================== -->

    <div
        v-else
        class="not-found"
    >

        Formation introuvable.

    </div>

</template>


<style scoped>

.formation-detail {

    width: 100%;

    max-width: 900px;

    margin: 0 auto;

    padding: 25px;

    background: white;

    border-radius: 12px;

    box-sizing: border-box;

}


.formation-image-container {

    width: 100%;

    max-width: 300px;

    height: 220px;

    margin: 0 auto 25px;

    border-radius: 12px;

    overflow: hidden;

    background: #f5f5f5;

    border: 1px solid #ddd;

    display: flex;

    align-items: center;

    justify-content: center;

}


.formation-image {

    width: 100%;

    height: 100%;

    object-fit: cover;

}


.no-image {

    color: #777;

    text-align: center;

    font-size: 14px;

}


.formation-detail h2 {

    margin-bottom: 15px;

    font-size: 28px;

}


.formation-detail p {

    line-height: 1.7;

    color: #555;

}


.formation-informations {

    display: grid;

    grid-template-columns:
        repeat(2, 1fr);

    gap: 15px;

    margin-top: 25px;

}


.information {

    padding: 15px;

    background: #f8f9fa;

    border-radius: 8px;

}


.information strong {

    display: block;

    margin-bottom: 5px;

}


.section {

    margin-top: 30px;

}


.section h3 {

    margin-bottom: 12px;

}


.section ul {

    padding-left: 20px;

}


.section li {

    margin-bottom: 8px;

}


.status {

    margin-top: 30px;

}


.active,
.inactive {

    display: inline-block;

    padding: 8px 14px;

    border-radius: 20px;

    font-size: 13px;

    font-weight: 600;

}


.active {

    background: #e8f5e9;

    color: #2e7d32;

}


.inactive {

    background: #ffebee;

    color: #c62828;

}


.loading {

    padding: 40px;

    text-align: center;

    color: #666;

}


.not-found {

    padding: 40px;

    text-align: center;

    color: #777;

}


@media (max-width: 600px) {

    .formation-detail {

        padding: 15px;

    }


    .formation-informations {

        grid-template-columns: 1fr;

    }


    .formation-detail h2 {

        font-size: 22px;

    }

}

</style>