<script setup>

import { onMounted } from "vue";

import {
    useRoute,
    useRouter
} from "vue-router";

import FormFormation from "../../../components/formations/FormFormation.vue";

import { useFormationStore } from "../../../stores/formation";


const route = useRoute();

const router = useRouter();

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

    } catch (error) {

        console.error(
            "Erreur lors du chargement de la formation :",
            error
        );

    }

});


// =====================================================
// MODIFIER LA FORMATION
// =====================================================

async function modifier(data) {

    try {

        await store.modifierFormation(
            route.params.id,
            data
        );

        // Retour vers la liste
        router.push(
            "/dashboard/formations"
        );

    } catch (error) {

        console.error(
            "Erreur lors de la modification de la formation :",
            error
        );

    }

}

</script>


<template>

    <div>

        <h1>
            Modifier Formation
        </h1>


        <!-- CHARGEMENT -->

        <div v-if="store.loading">

            Chargement de la formation...

        </div>


        <!-- FORMULAIRE -->

        <FormFormation
            v-else-if="store.formation"
            :formation="store.formation"
            @submit="modifier"
        />


        <!-- FORMATION NON TROUVÉE -->

        <div v-else>

            Formation introuvable.

        </div>

    </div>

</template>