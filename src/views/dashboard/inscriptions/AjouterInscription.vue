<script setup>

import { useRouter } from "vue-router";

import FormInscription from "../../../components/inscriptions/FormInscription.vue";

import { useInscriptionStore } from "../../../stores/inscription";

const router = useRouter();

const store = useInscriptionStore();

async function ajouter(data) {

    await store.ajouterInscriptionAdmin(data);

    router.push("/dashboard/inscriptions");

}

</script>

<template>

<h1>

Ajouter une inscription

</h1>

<FormInscription

mode="admin"

@submit="ajouter"

/>

</template>