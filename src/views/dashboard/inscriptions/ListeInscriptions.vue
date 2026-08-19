<script setup>

import { onMounted, computed, ref } from "vue";
import { useRouter } from "vue-router";

import { useInscriptionStore } from "../../../stores/inscription";

import RechercheInscription from "../../../components/inscriptions/RechercheInscription.vue";
import TableInscription from "../../../components/inscriptions/TableInscription.vue";

const router = useRouter();

const store = useInscriptionStore();

const recherche = ref("");

onMounted(() => {

    store.fetchInscriptions();

});

const inscriptionsFiltrees = computed(() => {

    if (!recherche.value) {

        return store.inscriptions;

    }

    return store.inscriptions.filter(inscription => {

        const apprenant = inscription.apprenant?.user?.name || "";

        const formation = inscription.formation?.nom || "";

        return (

            apprenant.toLowerCase().includes(recherche.value.toLowerCase())

            ||

            formation.toLowerCase().includes(recherche.value.toLowerCase())

        );

    });

});

function supprimer(id) {

    if (confirm("Supprimer cette inscription ?")) {

        store.supprimerInscription(id);

    }

}

</script>

<template>

<div>

<h1>Liste des inscriptions</h1>

<button
@click="router.push('/dashboard/inscriptions/ajouter')"
>

Nouvelle inscription

</button>

<br><br>

<RechercheInscription

@recherche="recherche = $event"

/>

<br>

<TableInscription

:inscriptions="inscriptionsFiltrees"

@voir="router.push(`/dashboard/inscriptions/${$event}`)"

@modifier="router.push(`/dashboard/inscriptions/${$event}/modifier`)"

@supprimer="supprimer"

/>

</div>

</template>