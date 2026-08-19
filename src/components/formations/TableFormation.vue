<script setup>

defineProps({
  formations: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits([
  "voir",
  "modifier",
  "supprimer",
]);

</script>

<template>

<table border="1" width="100%">

  <thead>

    <tr>

      <th>Nom</th>
      <th>Durée</th>
      <th>Diplôme</th>
      <th>Lieu</th>
      <th>Statut</th>
      <th>Actions</th>

    </tr>

  </thead>

  <tbody>

    <tr
      v-for="formation in formations"
      :key="formation.id"
    >

      <td>{{ formation.nom }}</td>

      <td>{{ formation.duree }}</td>

      <td>{{ formation.diplome }}</td>

      <td>{{ formation.lieu }}</td>

      <td>

        {{ formation.is_active ? "Active" : "Inactive" }}

      </td>

      <td>

        <button @click="$emit('voir', formation.id)">
          Voir
        </button>

        <button @click="$emit('modifier', formation.id)">
          Modifier
        </button>

        <button @click="$emit('supprimer', formation.id)">
          Supprimer
        </button>

      </td>

    </tr>

  </tbody>

</table>

</template>