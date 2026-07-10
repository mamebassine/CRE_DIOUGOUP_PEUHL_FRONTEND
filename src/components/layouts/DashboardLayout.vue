<template>

<div class="container-fluid">

<div class="row">

<div class="col-md-3 col-lg-2 p-0">

<Sidebar />

</div>

<div class="col-md-9 col-lg-10 p-4">

<RouterView />

</div>

</div>

</div>

</template>

<script setup>

import Sidebar from "../Sidebar.vue";
import { RouterView } from "vue-router";

</script>