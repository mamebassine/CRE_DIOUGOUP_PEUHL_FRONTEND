<script setup>

import {
    onMounted
} from "vue";

import {
    useRoute,
    useRouter
} from "vue-router";

import FormFormation from "../../../components/formations/FormFormation.vue";

import {
    useFormationStore
} from "../../../stores/formation";


// =====================================================
// ROUTE
// =====================================================

const route = useRoute();

const router = useRouter();


// =====================================================
// STORE
// =====================================================

const store = useFormationStore();


// =====================================================
// CHARGER LA FORMATION
// =====================================================

onMounted(async () => {

    try {

        // Éviter d'afficher une ancienne formation
        store.formation = null;

        await store.fetchFormation(
            route.params.id
        );

        console.log(
            "Formation chargée :",
            store.formation
        );

    }

    catch (error) {

        console.error(
            "Erreur lors du chargement de la formation :",
            error
        );

        alert(
            error.response?.data?.message
            ||
            "Impossible de charger la formation."
        );

    }

});


// =====================================================
// MODIFIER LA FORMATION
// =====================================================

async function modifier(data) {

    try {

        console.log(
            "Données à modifier :",
            data
        );

        await store.modifierFormation(

            route.params.id,

            data

        );


        alert(
            "Formation modifiée avec succès."
        );


        router.push(
            "/dashboard/formations"
        );

    }

    catch (error) {

        console.error(
            "Erreur lors de la modification :",
            error
        );

        console.error(
            "Réponse Laravel :",
            error.response?.data
        );


        alert(

            error.response?.data?.message

            ||

            "Erreur lors de la modification."

        );

    }

}


// =====================================================
// RETOUR
// =====================================================

function retour() {

    router.push(
        "/dashboard/formations"
    );

}

</script>


<template>

    <div class="page">

        <div class="card-form">


            <!-- ============================================= -->
            <!-- HEADER -->
            <!-- ============================================= -->

            <div class="header">

                <div>

                    <h2>
                        Modifier une formation
                    </h2>

                    <p>
                        Mise à jour des informations de la formation
                    </p>

                </div>


                <button
                    type="button"
                    class="btn-retour"
                    @click="retour"
                >

                    ← Retour

                </button>

            </div>


            <!-- ============================================= -->
            <!-- CHARGEMENT -->
            <!-- ============================================= -->

            <div
                v-if="store.loading"
                class="loading"
            >

                Chargement des informations...

            </div>


            <!-- ============================================= -->
            <!-- FORMULAIRE -->
            <!-- ============================================= -->

            <div
                v-else-if="store.formation"
                class="form-content"
            >

                <FormFormation

                    :formation="store.formation"

                    @submit="modifier"

                />

            </div>


            <!-- ============================================= -->
            <!-- ERREUR -->
            <!-- ============================================= -->

            <div
                v-else
                class="not-found"
            >

                <h3>
                    Formation introuvable
                </h3>

                <button
                    type="button"
                    class="btn-retour-bottom"
                    @click="retour"
                >

                    ← Retour à la liste

                </button>

            </div>


        </div>

    </div>

</template>


<style scoped>


/* ===================================================== */
/* PAGE */
/* ===================================================== */

.page {

    padding: 30px;

    background: #F8FAFC;

    min-height: 100%;

}


/* ===================================================== */
/* CARTE */
/* ===================================================== */

.card-form {

    max-width: 850px;

    margin: auto;

    background: white;

    border-radius: 20px;

    overflow: hidden;

    box-shadow:

        0 15px 35px rgba(0,0,0,.08);

}


/* ===================================================== */
/* HEADER */
/* ===================================================== */

.header {

    padding: 25px;

    background: linear-gradient(

        135deg,

        #3B5998,

        #2E7D32

    );

    color: white;

    display: flex;

    justify-content: space-between;

    align-items: center;

    gap: 20px;

}


.header h2 {

    margin: 0;

    font-weight: 800;

}


.header p {

    margin: 5px 0 0;

    opacity: .9;

}


/* ===================================================== */
/* BOUTON RETOUR */
/* ===================================================== */

.btn-retour {

    padding: 10px 18px;

    background: rgba(255,255,255,.2);

    color: white;

    border: 1px solid rgba(255,255,255,.5);

    border-radius: 8px;

    cursor: pointer;

    font-size: 14px;

    font-weight: 600;

    transition: .2s;

}


.btn-retour:hover {

    background: white;

    color: #3B5998;

}


/* ===================================================== */
/* CONTENU */
/* ===================================================== */

.form-content {

    padding: 30px;

}


/* ===================================================== */
/* CHARGEMENT */
/* ===================================================== */

.loading {

    text-align: center;

    padding: 50px;

    color: #3B5998;

    font-size: 16px;

}


/* ===================================================== */
/* FORMATION INTROUVABLE */
/* ===================================================== */

.not-found {

    text-align: center;

    padding: 50px;

}


.not-found h3 {

    color: #c62828;

}


.btn-retour-bottom {

    padding: 12px 20px;

    background: #3B5998;

    color: white;

    border: none;

    border-radius: 8px;

    cursor: pointer;

    font-weight: 600;

}


.btn-retour-bottom:hover {

    background: #2E7D32;

}


/* ===================================================== */
/* RESPONSIVE */
/* ===================================================== */

@media (max-width: 600px) {

    .page {

        padding: 15px;

    }


    .header {

        flex-direction: column;

        align-items: flex-start;

    }


    .form-content {

        padding: 20px;

    }

}

</style>