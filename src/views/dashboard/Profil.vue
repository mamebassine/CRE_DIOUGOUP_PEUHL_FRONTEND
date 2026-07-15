<template>
  <div class="container-fluid">

    <div class="row justify-content-center">

      <div class="col-lg-8">

        <div class="card shadow border-0">

          <div class="card-header bg-success text-white">

            <h4 class="mb-0">
              Mon Profil
            </h4>

          </div>

          <div class="card-body">

            <!-- Chargement -->
            <div
              v-if="loading"
              class="text-center py-5"
            >
              <div class="spinner-border text-success"></div>
            </div>

            <!-- Profil -->
            <div v-else>

              <div class="text-center mb-4">

                <img
                  src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                  class="avatar"
                >

                <h3 class="mt-3">

                  {{ user.nom }} {{ user.prenom }}

                </h3>

                <span class="badge bg-success">

                  {{ user.role }}

                </span>

              </div>

              <table class="table table-bordered">

                <tbody>

                  <tr>

                    <th width="220">
                      Nom
                    </th>

                    <td>

                      {{ user.nom }}

                    </td>

                  </tr>

                  <tr>

                    <th>

                      Prénom

                    </th>

                    <td>

                      {{ user.prenom }}

                    </td>

                  </tr>

                  <tr>

                    <th>

                      Email

                    </th>

                    <td>

                      {{ user.email }}

                    </td>

                  </tr>

                  <tr>

                    <th>

                      Téléphone

                    </th>

                    <td>

                      {{ user.telephone || "-" }}

                    </td>

                  </tr>

                  <tr>

                    <th>

                      Rôle

                    </th>

                    <td>

                      {{ user.role }}

                    </td>

                  </tr>

                  <tr>

                    <th>

                      Compte

                    </th>

                    <td>

                      <span
                        v-if="user.is_active"
                        class="badge bg-success"
                      >
                        Actif
                      </span>

                      <span
                        v-else
                        class="badge bg-danger"
                      >
                        Désactivé
                      </span>

                    </td>

                  </tr>

                </tbody>

              </table>

            </div>

          </div>

        </div>

      </div>

    </div>

  </div>
</template>

<script setup>

import { ref, onMounted } from "vue"

import { useAuthStore } from "../../stores/auth"

const auth = useAuthStore()

const loading = ref(true)

const user = ref({})

const chargerProfil = async () => {

    try{

        await auth.profile()

        user.value = auth.user

    }

    catch(error){

        console.log(error)

    }

    finally{

        loading.value=false

    }

}

onMounted(() => {

    chargerProfil()

})

</script>

<style scoped>

.avatar{

    width:120px;

    height:120px;

    border-radius:50%;

    object-fit:cover;

}

.card{

    border-radius:15px;

}

</style>