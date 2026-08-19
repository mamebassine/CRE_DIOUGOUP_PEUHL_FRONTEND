<script setup>

import {ref} from "vue";


const props = defineProps({

formation:{
type:Object,
default:null
}

});


const emit = defineEmits([
"submit"
]);



const form = ref({

nom:props.formation?.nom || "",
resume:props.formation?.resume || "",
description:props.formation?.description || "",
duree:props.formation?.duree || "",
diplome:props.formation?.diplome || "",
lieu:props.formation?.lieu || "",
icone:props.formation?.icone || "",
is_active:props.formation?.is_active ?? true

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


<input 
v-model="form.nom"
placeholder="Nom formation"
required
>


<input 
v-model="form.resume"
placeholder="Résumé"
>



<textarea
v-model="form.description"
placeholder="Description"
></textarea>



<input
v-model="form.duree"
placeholder="Durée"
>



<input
v-model="form.diplome"
placeholder="Diplôme"
>



<input
v-model="form.lieu"
placeholder="Lieu"
>



<input
v-model="form.icone"
placeholder="Icône"
>



<label>

<input
type="checkbox"
v-model="form.is_active"
>

Active

</label>



<button>
Enregistrer
</button>



</form>


</template>