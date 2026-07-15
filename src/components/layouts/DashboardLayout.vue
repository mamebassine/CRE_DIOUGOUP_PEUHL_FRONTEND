<template>

<div class="container-fluid">

    <div class="row">

        <!-- Sidebar -->
        <div class="col-md-3 col-lg-2 p-0">

            <Sidebar />

        </div>

        <!-- Contenu -->
        <div class="col-md-9 col-lg-10 p-0">

            <!-- Barre supérieure -->
            <div class="d-flex justify-content-between align-items-center bg-white shadow-sm p-3">

                <div>
                    <h5 class="mb-0">
                        Tableau de bord
                    </h5>
                </div>

                <div class="d-flex align-items-center">

                    <span class="me-3 fw-bold">

                        {{ auth.user?.nom }} {{ auth.user?.prenom }}

                    </span>

                    <button
                        class="btn btn-danger btn-sm"
                        @click="logout"
                    >

                        <i class="fas fa-sign-out-alt me-2"></i>

                        Déconnexion

                    </button>

                </div>

            </div>

            <!-- Pages -->
            <div class="p-4">

                <RouterView />

            </div>

        </div>

    </div>

</div>

</template>

<script setup>

import Sidebar from "../Sidebar.vue";
import { RouterView, useRouter } from "vue-router";
import { useAuthStore } from "../../stores/auth";

const router = useRouter();

const auth = useAuthStore();

const logout = async () => {

    await auth.logout();

    router.push("/login");

};

</script>