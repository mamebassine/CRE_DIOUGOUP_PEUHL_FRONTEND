<script setup>

import { ref, onMounted } from "vue";

import { useFormationStore } from "../../stores/formation";
import { useApprenantStore } from "../../stores/apprenant";

const props = defineProps({

    mode:{
        type:String,
        default:"admin"
    },

    inscription:{
        type:Object,
        default:null
    }

});

const emit = defineEmits([
    "submit"
]);

const formationStore = useFormationStore();
const apprenantStore = useApprenantStore();

const form = ref({

    apprenant_id:"",
    formation_id:"",
    horaire:"",
    statut:"En attente",
    etat_formation:"Non commencée"

});

onMounted(async()=>{

    // Charger les formations
    await formationStore.fetchFormations();

    // Charger les apprenants (admin)
    if(props.mode==="admin"){

        await apprenantStore.fetchApprenants();

    }

    // Mode modification
    if(props.inscription){

        form.value = {

            apprenant_id:
            props.inscription.apprenant_id,

            formation_id:
            props.inscription.formation_id,

            horaire:
            props.inscription.horaire,

            statut:
            props.inscription.statut,

            etat_formation:
            props.inscription.etat_formation

        };

    }

});

function envoyer(){

    emit(
        "submit",
        form.value
    );

}

</script>

<template>

<form @submit.prevent="envoyer">

    <!-- ADMIN -->

    <div v-if="mode==='admin'">

        <label>
            Apprenant
        </label>

        <select
            v-model="form.apprenant_id"
            required
        >

            <option value="">
                Choisir un apprenant
            </option>

            <option
                v-for="apprenant in apprenantStore.apprenants"
                :key="apprenant.id"
                :value="apprenant.id"
            >

                {{ apprenant.user?.prenom }} {{ apprenant.user?.nom }}

            </option>

        </select>

    </div>

    <label>
        Formation
    </label>

    <select
        v-model="form.formation_id"
        required
    >

        <option value="">
            Choisir une formation
        </option>

        <option
            v-for="formation in formationStore.formations"
            :key="formation.id"
            :value="formation.id"
        >

            {{ formation.nom }}

        </option>

    </select>

    <label>
        Horaire
    </label>

    <select
        v-model="form.horaire"
        required
    >

        <option value="">
            Choisir horaire
        </option>

        <option>Matin</option>

        <option>Après-midi</option>

        <option>Soir</option>

    </select>

    <!-- MODIFICATION ADMIN -->

    <div
        v-if="mode==='admin' && inscription"
    >

        <label>
            Statut
        </label>

        <select v-model="form.statut">

            <option>En attente</option>

            <option>Valide</option>

            <option>Refuse</option>

        </select>

        <label>
            Etat formation
        </label>

        <select v-model="form.etat_formation">

            <option>Non commencée</option>

            <option>En cours</option>

            <option>Terminée</option>

            <option>Abandonnée</option>

        </select>

    </div>

    <button type="submit">

        Enregistrer

    </button>

</form>

</template>