<script setup>

import { ref } from "vue";
import { useRouter } from "vue-router";

import FormInscription from "../../../components/inscriptions/FormInscription.vue";
import { useInscriptionStore } from "../../../stores/inscription";

const router = useRouter();

const store = useInscriptionStore();

const erreur = ref("");

async function ajouter(data) {

    erreur.value = "";

    try {

        await store.ajouterInscriptionAdmin(data);

        router.push("/dashboard/inscriptions");

    }

    catch (error) {

        console.error(error);

        erreur.value =
            error.response?.data?.message ||
            "Impossible de créer l'inscription.";

    }

}

</script>


<template>

<div>

    <h1>
        Ajouter une inscription
    </h1>


    <!-- MESSAGE ERREUR -->

    <div
        v-if="erreur"
        style="
            padding:15px;
            margin-bottom:20px;
            background:#ffe3e3;
            color:#b42318;
            border-radius:10px;
        "
    >

        {{ erreur }}

    </div>


    <FormInscription
        mode="admin"
        @submit="ajouter"
    />

</div>

</template>