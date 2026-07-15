<template>
  <div class="container py-5">

    <div class="row justify-content-center">

      <div class="col-md-5">

        <div class="card shadow">

          <div class="card-body p-4">

            <h2 class="text-center mb-4">
              Connexion
            </h2>

            <form @submit.prevent="connexion">

              <div class="mb-3">

                <label class="form-label">
                  Email
                </label>

                <input
                  type="email"
                  class="form-control"
                  v-model="form.email"
                  required
                >

              </div>

              <div class="mb-4">

                <label class="form-label">
                  Mot de passe
                </label>

                <input
                  type="password"
                  class="form-control"
                  v-model="form.password"
                  required
                >

              </div>

              <button
                class="btn btn-success w-100"
                :disabled="loading"
              >

                <span
                  v-if="loading"
                  class="spinner-border spinner-border-sm me-2"
                ></span>

                {{ loading ? "Connexion..." : "Se connecter" }}

              </button>

            </form>

            <div
              v-if="erreur"
              class="alert alert-danger mt-3"
            >
              {{ erreur }}
            </div>

            <div class="text-center mt-4">

              Vous n'avez pas encore de compte ?

              <RouterLink to="/register">

                S'inscrire

              </RouterLink>

            </div>

          </div>

        </div>

      </div>

    </div>

  </div>
</template>

<script setup>

import { ref } from "vue";
import { RouterLink, useRouter } from "vue-router";
import { useAuthStore } from "../../stores/auth";

const router = useRouter();

const auth = useAuthStore();

const loading = ref(false);

const erreur = ref("");

const form = ref({

    email:"",
    password:""

});

const connexion = async()=>{

    loading.value = true;

    erreur.value = "";

    try{

        await auth.login(form.value);

        router.push("/dashboard");

    }catch(error){

        erreur.value = "Email ou mot de passe incorrect.";

    }finally{

        loading.value = false;

    }

}

</script>

<style scoped>

.card{

    border-radius:18px;

}

button{

    height:48px;

}

</style>