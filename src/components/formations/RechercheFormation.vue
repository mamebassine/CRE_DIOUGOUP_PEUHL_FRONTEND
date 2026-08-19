<script setup>

import { ref, watch } from "vue";

const recherche = ref("");

const emit = defineEmits([
  "recherche",
]);

watch(recherche, (value) => {

  emit("recherche", value);

});

</script>

<template>

<input
  type="text"
  v-model="recherche"
  placeholder="Rechercher une formation..."
>

</template>