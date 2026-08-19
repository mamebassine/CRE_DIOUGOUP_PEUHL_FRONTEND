<script setup>

import { onMounted } from "vue";

import { useRoute } from "vue-router";

import { useInscriptionStore } from "../../../stores/inscription";

const route = useRoute();

const store = useInscriptionStore();

onMounted(() => {

    store.fetchInscription(route.params.id);

});

</script>

<template>

<div v-if="store.inscription">

<h2>

Détail de l'inscription

</h2>

<p>

<strong>Apprenant :</strong>

{{ store.inscription.apprenant?.user?.name }}

</p>

<p>

<strong>Formation :</strong>

{{ store.inscription.formation?.nom }}

</p>

<p>

<strong>Horaire :</strong>

{{ store.inscription.horaire }}

</p>

<p>

<strong>Date :</strong>

{{ store.inscription.date_inscription }}

</p>

<p>

<strong>Statut :</strong>

{{ store.inscription.statut }}

</p>

<p>

<strong>État de la formation :</strong>

{{ store.inscription.etat_formation }}

</p>

</div>

</template>