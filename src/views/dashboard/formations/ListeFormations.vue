<script setup>

import {
    ref,
    computed,
    onMounted
} from "vue";

import {
    useFormationStore
} from "../../../stores/formation";

import {
    useRouter
} from "vue-router";

import FormationTable
    from "../../../components/formations/TableFormation.vue";


/* =====================================================
   STORE
===================================================== */

const store =
    useFormationStore();


/* =====================================================
   ROUTER
===================================================== */

const router =
    useRouter();


/* =====================================================
   RECHERCHE
===================================================== */

const search =
    ref("");


/* =====================================================
   FORMATIONS FILTRÉES
===================================================== */

const formationsFiltrees =
    computed(() => {

        const texte =
            search.value
                .trim()
                .toLowerCase();


        if (!texte) {

            return store.formations;

        }


        return store.formations.filter(
            formation => {

                return (

                    formation.nom
                        ?.toLowerCase()
                        .includes(texte)

                    ||

                    formation.duree
                        ?.toLowerCase()
                        .includes(texte)

                    ||

                    formation.diplome
                        ?.toLowerCase()
                        .includes(texte)

                    ||

                    formation.lieu
                        ?.toLowerCase()
                        .includes(texte)

                );

            }
        );

    });


/* =====================================================
   CHARGER LES FORMATIONS
===================================================== */

onMounted(async () => {

    await store.fetchFormations();

});


/* =====================================================
   VOIR
===================================================== */

function voir(id) {

    router.push(
        `/dashboard/formations/${id}`
    );

}


/* =====================================================
   MODIFIER
===================================================== */

function modifier(id) {

    router.push(
        `/dashboard/formations/${id}/modifier`
    );

}


/* =====================================================
   SUPPRIMER
===================================================== */

async function supprimer(id) {

    if (
        !confirm(
            "Supprimer cette formation ?"
        )
    ) {

        return;

    }


    await store.supprimerFormation(id);

}


/* =====================================================
   INSCRIRE APPRENANT
===================================================== */

function inscrireApprenant(id) {

    router.push(
        `/dashboard/formations/${id}/inscrire`
    );

}


/* =====================================================
   AJOUTER FORMATION
===================================================== */

function ajouterFormation() {

    router.push(
        "/dashboard/formations/ajouter"
    );

}

</script>


<template>

    <div class="formations-page">

        <!-- =================================================
             EN-TÊTE PAGE
        ================================================== -->

        <div class="page-header">

            <div>

                <h1>
                    Liste des formations
                </h1>

                <p>
                    Gestion des formations proposées par le centre
                </p>

            </div>


            <!-- AJOUT -->

            <button
                type="button"
                class="btn-add"
                @click="ajouterFormation"
            >

                <i class="fas fa-plus"></i>

                Ajouter une formation

            </button>

        </div>


        <!-- =================================================
             CHARGEMENT
        ================================================== -->

        <div
            v-if="store.loading"
            class="loading"
        >

            <div class="loader"></div>

            <p>
                Chargement des formations...
            </p>

        </div>


        <!-- =================================================
             TABLEAU
        ================================================== -->

        <FormationTable
            v-else
            :formations="formationsFiltrees"
            :search="search"
            @update:search="search = $event"
            @voir="voir"
            @modifier="modifier"
            @supprimer="supprimer"
            @inscrire="inscrireApprenant"
        />

    </div>

</template>


<style scoped>

/* =========================================================
   PAGE
========================================================= */

.formations-page {

    width: 100%;

}


/* =========================================================
   HEADER
========================================================= */

.page-header {

    display: flex;

    justify-content: space-between;

    align-items: center;

    gap: 20px;

    margin-bottom: 28px;

}


.page-header h1 {

    margin: 0;

    color: #1f2937;

    font-size: 32px;

    font-weight: 800;

}


.page-header p {

    margin: 7px 0 0;

    color: #64748b;

    font-size: 15px;

}


/* =========================================================
   BOUTON AJOUT
========================================================= */

.btn-add {

    display: flex;

    align-items: center;

    gap: 9px;

    padding: 13px 20px;

    border: none;

    border-radius: 10px;

    background: #3B5998;

    color: #ffffff;

    cursor: pointer;

    font-size: 14px;

    font-weight: 700;

    transition: .2s ease;

    white-space: nowrap;

}


.btn-add:hover {

    background: #2E7D32;

    transform: translateY(-2px);

}


/* =========================================================
   LOADING
========================================================= */

.loading {

    min-height: 300px;

    background: #ffffff;

    border-radius: 18px;

    display: flex;

    flex-direction: column;

    justify-content: center;

    align-items: center;

    color: #64748b;

}


.loader {

    width: 42px;

    height: 42px;

    border-radius: 50%;

    border: 4px solid #e8edf5;

    border-top-color: #3B5998;

    animation:
        rotation .8s linear infinite;

    margin-bottom: 15px;

}


@keyframes rotation {

    to {

        transform: rotate(360deg);

    }

}


/* =========================================================
   RESPONSIVE
========================================================= */

@media (max-width: 768px) {

    .page-header {

        flex-direction: column;

        align-items: stretch;

    }


    .page-header h1 {

        font-size: 26px;

    }


    .btn-add {

        width: 100%;

        justify-content: center;

    }

}

</style>