<template>

<div>

    <Navbar />

    <main>
        <RouterView />
    </main>

    <Footer />

</div>

</template>


<script setup>

import { RouterView } from "vue-router";

import Navbar from "../Navbar.vue";
import Footer from "../Footer.vue";

</script>