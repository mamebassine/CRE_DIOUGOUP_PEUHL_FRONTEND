<script setup>

import { useRouter } from "vue-router";

import FormFormation from "../../../../components/formations/FormFormation.vue";

import { useFormationStore } from "../../../../stores/formation";


const router = useRouter();

const store = useFormationStore();


// =====================================================
// AJOUTER UNE FORMATION
// =====================================================

async function ajouter(data) {

    try {

        await store.ajouterFormation(data);

        alert(
            "Formation ajoutée avec succès."
        );

        router.push(
            "/dashboard/formations"
        );

    }

    catch (error) {

        console.error(
            "Erreur lors de l'ajout de la formation :",
            error
        );

        console.error(
            "Réponse Laravel :",
            error.response?.data
        );

        alert(
            error.response?.data?.message
            ||
            "Erreur lors de l'ajout de la formation."
        );

    }

}

</script>


<template>

    <div class="page">

        <div class="card-form">

            <div class="header">

                <h2>
                    Ajouter une formation
                </h2>

                <p>
                    Création d'une nouvelle formation
                </p>

            </div>


            <div class="form-content">

                <FormFormation
                    @submit="ajouter"
                />

            </div>

        </div>

    </div>

</template>


<style scoped>

.page {

    padding: 30px;

    background: #F8FAFC;

    min-height: 100%;

}


.card-form {

    max-width: 850px;

    margin: auto;

    background: white;

    border-radius: 20px;

    overflow: hidden;

    box-shadow:
        0 15px 35px rgba(0,0,0,.08);

}


.header {

    padding: 25px;

    background: linear-gradient(
        135deg,
        #3B5998,
        #2E7D32
    );

    color: white;

}


.header h2 {

    margin: 0;

    font-weight: 800;

}


.header p {

    margin: 5px 0 0;

    opacity: .9;

}


.form-content {

    padding: 30px;

}

</style>