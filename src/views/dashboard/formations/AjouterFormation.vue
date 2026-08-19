<script setup>

import { useRouter } from "vue-router";

import FormFormation from "../../../components/formations/FormFormation.vue";

import { useFormationStore } from "../../../stores/formation";


const router = useRouter();

const store = useFormationStore();


// =====================================================
// AJOUTER UNE FORMATION
// =====================================================

async function ajouter(data) {

    try {

        await store.ajouterFormation(data);

        router.push("/dashboard/formations");

    } catch (error) {

        console.error(
            "Erreur lors de l'ajout de la formation :",
            error
        );

        console.error(
            "Réponse Laravel :",
            error.response?.data
        );

    }

}

</script>


<template>

    <h1>
        Ajouter une formation
    </h1>

    <FormFormation
        @submit="ajouter"
    />

</template>