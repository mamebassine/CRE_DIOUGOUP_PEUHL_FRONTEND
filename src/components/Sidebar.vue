<template>

<div class="bg-success text-white vh-100 d-flex flex-column p-3">

    <h3 class="text-center mb-4">

        CRE

    </h3>

    <!-- Utilisateur -->
    <div class="text-center mb-4">

        <i class="fas fa-user-circle fa-4x mb-2"></i>

        <h6>

            {{ auth.user?.nom }}

            {{ auth.user?.prenom }}

        </h6>

        <small>

            {{ auth.user?.role }}

        </small>

    </div>

    <ul class="nav flex-column">

        <li class="nav-item">

            <RouterLink
                class="nav-link text-white"
                to="/dashboard"
            >
                <i class="fas fa-home me-2"></i>

                Dashboard
            </RouterLink>

        </li>

        <li class="nav-item">

            <RouterLink
                class="nav-link text-white"
                to="/dashboard/profil"
            >
                <i class="fas fa-user me-2"></i>

                Mon Profil
            </RouterLink>

        </li>

        <li class="nav-item">

            <RouterLink
                class="nav-link text-white"
                to="/dashboard/apprenants"
            >
                <i class="fas fa-user-graduate me-2"></i>

                Apprenants
            </RouterLink>

        </li>

        <li class="nav-item">

            <RouterLink
                class="nav-link text-white"
                to="/dashboard/diplomes"
            >
                <i class="fas fa-award me-2"></i>

                Diplômes
            </RouterLink>

        </li>

        <li class="nav-item">

            <RouterLink
                class="nav-link text-white"
                to="/dashboard/boite-idees"
            >
                <i class="fas fa-lightbulb me-2"></i>

                Boîte à idées
            </RouterLink>

        </li>

        <li class="nav-item">

            <RouterLink
                class="nav-link text-white"
                to="/dashboard/users"
            >
                <i class="fas fa-users me-2"></i>

                Utilisateurs
            </RouterLink>

        </li>

        <li class="nav-item">

            <RouterLink
                class="nav-link text-white"
                to="/dashboard/statistiques"
            >
                <i class="fas fa-chart-bar me-2"></i>

                Statistiques
            </RouterLink>

        </li>

    </ul>

    <!-- Déconnexion -->
    <div class="mt-auto">

        <button
            class="btn btn-danger w-100"
            @click="logout"
        >

            <i class="fas fa-sign-out-alt me-2"></i>

            Déconnexion

        </button>

    </div>

</div>

</template>

<script setup>

import { RouterLink, useRouter } from "vue-router";
import { useAuthStore } from "../stores/auth";

const router = useRouter();

const auth = useAuthStore();

const logout = async () => {

    await auth.logout();

    router.push("/login");

};

</script>