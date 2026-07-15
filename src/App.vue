<template>

    <RouterView />

</template>

<script setup>

import { RouterView } from "vue-router";
import { onMounted } from "vue";
import { useAuthStore } from "./stores/auth";

const auth = useAuthStore();

onMounted(async () => {

    if (auth.token) {

        try {

            await auth.profile();

        } catch (error) {

            await auth.logout();

        }

    }

});

</script>

<style>

*{

    margin:0;

    padding:0;

    box-sizing:border-box;

}

</style>