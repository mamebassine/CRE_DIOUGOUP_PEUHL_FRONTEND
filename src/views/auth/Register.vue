<template>
  <div class="container py-5">
    <div class="row justify-content-center">

      <div class="col-lg-6">

        <div class="card shadow border-0">

          <div class="card-body p-5">

            <h2 class="text-center mb-4">
              Créer un compte
            </h2>

            <form @submit.prevent="register">

              <!-- Nom -->
              <div class="mb-3">
                <label class="form-label">Nom</label>

                <input
                  type="text"
                  class="form-control"
                  v-model="form.nom"
                  required
                >
              </div>

              <!-- Prénom -->
              <div class="mb-3">
                <label class="form-label">Prénom</label>

                <input
                  type="text"
                  class="form-control"
                  v-model="form.prenom"
                  required
                >
              </div>

              <!-- Email -->
              <div class="mb-3">
                <label class="form-label">Email</label>

                <input
                  type="email"
                  class="form-control"
                  v-model="form.email"
                  required
                >
              </div>

              <!-- Téléphone -->
              <div class="mb-3">
                <label class="form-label">Téléphone</label>

                <input
                  type="text"
                  class="form-control"
                  v-model="form.telephone"
                >
              </div>

              <!-- Mot de passe -->
              <div class="mb-3">
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

              <!-- Confirmation -->
              <div class="mb-4">
                <label class="form-label">
                  Confirmer le mot de passe
                </label>

                <input
                  type="password"
                  class="form-control"
                  v-model="form.password_confirmation"
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

                {{ loading ? "Création..." : "Créer mon compte" }}

              </button>

            </form>

            <div
              v-if="success"
              class="alert alert-success mt-4"
            >
              {{ success }}
            </div>

            <div
              v-if="error"
              class="alert alert-danger mt-4"
            >
              {{ error }}
            </div>

            <div class="text-center mt-4">

              Vous avez déjà un compte ?

              <RouterLink to="/login">

                Se connecter

              </RouterLink>

            </div>

          </div>

        </div>

      </div>

    </div>
  </div>
</template>

<script setup>

import { ref } from "vue"
import { useRouter } from "vue-router"
import { useAuthStore } from "../../stores/auth"

const router = useRouter()

const auth = useAuthStore()

const loading = ref(false)

const success = ref("")

const error = ref("")

const form = ref({

    nom:"",
    prenom:"",
    email:"",
    telephone:"",
    password:"",
    password_confirmation:""

})

const register = async()=>{

    loading.value=true

    success.value=""

    error.value=""

    try{

        await auth.register(form.value)

        success.value="Compte créé avec succès."

        setTimeout(()=>{

            router.push("/login")

        },1500)

    }

    catch(e){

        if(e.response?.data?.message){

            error.value=e.response.data.message

        }

        else if(e.response?.data?.errors){

            error.value=Object.values(e.response.data.errors)
            .flat()
            .join(" ")

        }

        else{

            error.value="Une erreur est survenue."

        }

    }

    finally{

        loading.value=false

    }

}

</script>

<style scoped>

.card{

    border-radius:20px;

}

h2{

    font-weight:bold;

}

button{

    height:50px;

}

</style>