<template>

<div class="bg-success text-white vh-100 p-3">

<h4 class="mb-4">
CRE
</h4>

<ul class="nav flex-column">

<li class="nav-item">
<RouterLink class="nav-link text-white" to="/dashboard">
Dashboard
</RouterLink>
</li>

<li class="nav-item">
<RouterLink class="nav-link text-white" to="/profil">
Mon Profil
</RouterLink>
</li>

<li class="nav-item">
<RouterLink class="nav-link text-white" to="/apprenants">
Apprenants
</RouterLink>
</li>

<li class="nav-item">
<RouterLink class="nav-link text-white" to="/diplomes">
Diplômes
</RouterLink>
</li>

<li class="nav-item">
<RouterLink class="nav-link text-white" to="/boite-idees">
Boîte à idées
</RouterLink>
</li>

<li class="nav-item">
<RouterLink class="nav-link text-white" to="/users">
Utilisateurs
</RouterLink>
</li>

<li class="nav-item">
<RouterLink class="nav-link text-white" to="/statistiques">
Statistiques
</RouterLink>
</li>

</ul>

</div>

</template>

<script setup>
import { RouterLink } from "vue-router";
</script>