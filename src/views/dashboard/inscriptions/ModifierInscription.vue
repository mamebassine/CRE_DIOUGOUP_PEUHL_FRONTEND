<script setup>

import { onMounted } from "vue";

import { useRoute, useRouter } from "vue-router";

import { useInscriptionStore } from "../../../stores/inscription";

import FormInscription from "../../../components/inscriptions/FormInscription.vue";

const route = useRoute();

const router = useRouter();

const store = useInscriptionStore();

onMounted(() => {

    store.fetchInscription(route.params.id);

});

async function modifier(data) {

    await store.modifierInscription(

        route.params.id,

        data

    );

    router.push("/dashboard/inscriptions");

}

</script>

<template>

<h1>

Modifier une inscription

</h1>

<FormInscription

v-if="store.inscription"

mode="admin"

:inscription="store.inscription"

@submit="modifier"

/>

</template>