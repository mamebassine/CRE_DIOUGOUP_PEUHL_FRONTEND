<template>

<div class="page">

    <div class="detail-card">


        <!-- HEADER PROFIL -->

        <div class="profile-header">


            <div class="photo-section">

                <img
                v-if="apprenant.photo"
                :src="`http://127.0.0.1:8000/storage/${apprenant.photo}`"
                class="photo"
                >

                <img
                v-else
                src="http://127.0.0.1:8000/storage/users/default.png"
                class="photo"
                >

            </div>


            <div class="profile-info">

                <h2>
                    {{ apprenant.user?.prenom }}
                    {{ apprenant.user?.nom }}
                </h2>

                <p>
                    Matricule :
                    <strong>
                        {{ apprenant.matricule }}
                    </strong>
                </p>


                <span class="status">
                    {{ apprenant.statut }}
                </span>

            </div>


        </div>



        <div
        v-if="loading"
        class="loading"
        >
            Chargement...
        </div>



        <div
        v-else
        class="content"
        >



            <div class="section">

                <h3>
                    👤 Informations personnelles
                </h3>


                <div class="grid">


                    <div class="info-card">
                        <label>Nom</label>
                        <span>{{ apprenant.user?.nom }}</span>
                    </div>


                    <div class="info-card">
                        <label>Prénom</label>
                        <span>{{ apprenant.user?.prenom }}</span>
                    </div>


                    <div class="info-card">
                        <label>Email</label>
                        <span>{{ apprenant.user?.email }}</span>
                    </div>


                    <div class="info-card">
                        <label>Téléphone</label>
                        <span>{{ apprenant.telephone }}</span>
                    </div>


                    <div class="info-card">
                        <label>Date naissance</label>
                        <span>
                        {{ formaterDate(apprenant.date_naissance) }}
                        </span>
                    </div>


                    <div class="info-card">
                        <label>Sexe</label>
                        <span>{{ apprenant.sexe }}</span>
                    </div>


                    <div class="info-card">
                        <label>Adresse</label>
                        <span>{{ apprenant.adresse }}</span>
                    </div>


                    <div class="info-card">
                        <label>Situation</label>
                        <span>
                        {{ apprenant.situation_matrimoniale }}
                        </span>
                    </div>


                </div>


            </div>




            <div class="section">

                <h3>
                    🎓 Formation
                </h3>


                <div class="grid">


                    <div class="info-card">
                        <label>Niveau étude</label>
                        <span>
                        {{ apprenant.niveau_etude }}
                        </span>
                    </div>


                    <div class="info-card">
                        <label>Niveau informatique</label>
                        <span>
                        {{ apprenant.niveau_informatique }}
                        </span>
                    </div>


                    <div class="info-card">
                        <label>Module choisi</label>
                        <span>
                        {{ apprenant.module_choisi }}
                        </span>
                    </div>


                    <div class="info-card">
                        <label>Horaire</label>
                        <span>
                        {{ apprenant.horaire_choisi }}
                        </span>
                    </div>


                    <div class="info-card">
                        <label>Date inscription</label>
                        <span>
                        {{ formaterDate(apprenant.date_inscription) }}
                        </span>
                    </div>


                    <div class="info-card">
                        <label>Fonction</label>
                        <span>
                        {{ apprenant.fonction || "-" }}
                        </span>
                    </div>


                </div>


            </div>

<!-- ACTIONS -->

<div class="actions">

    <button 
    class="btn-retour"
    @click="$router.back()"
    >
        <i class="fas fa-arrow-left"></i>
        Retour
    </button>


</div>

        </div>


    </div>





</div>

</template>




<script setup>

import { ref, onMounted } from "vue";

import { useRoute } from "vue-router";

import { getApprenant } from "../../../services/apprenantService";

const route = useRoute();

const apprenant = ref({});

const loading = ref(true);



// ==========================
// FORMATER LES DATES
// ==========================

const formaterDate = (date) => {

    if (!date) return "-";

    return new Date(date).toLocaleDateString("fr-FR");

};



// ==========================
// CHARGER APPRENANT
// ==========================

const charger = async () => {

    try {

        const response = await getApprenant(route.params.id);

        apprenant.value = response.data;

    }

    catch (error) {

        console.log(error);

    }

    finally {

        loading.value = false;

    }

};



// ==========================
// AU CHARGEMENT
// ==========================

onMounted(() => {

    charger();

});

</script>




<style scoped>


.page{

    padding:40px;

    background:#f1f5f9;

    min-height:100vh;

}



/* CARD PRINCIPALE */

.detail-card{

    max-width:1000px;

    margin:auto;

    background:white;

    border-radius:25px;

    overflow:hidden;

    box-shadow:
    0 20px 40px rgba(0,0,0,.08);

}



/* HEADER */

.profile-header{


    background:
    linear-gradient(
    135deg,
    #3B5998 ,
    #2E7D32
    );


    padding:35px;

    color:white;

    display:flex;

    align-items:center;

    gap:30px;

}



.photo{

    width:150px;

    height:150px;

    border-radius:50%;

    object-fit:cover;

    border:6px solid white;

    box-shadow:
    0 10px 25px rgba(0,0,0,.3);

}



.profile-info h2{

    font-size:28px;

    margin-bottom:10px;

}


.profile-info p{

    opacity:.9;

}



.status{


    display:inline-block;

    margin-top:15px;

    background:white;

    color:#15803d;

    padding:8px 20px;

    border-radius:30px;

    font-weight:600;

}



/* CONTENU */


.content{

    padding:35px;

}



.section{

    margin-bottom:40px;

}



.section h3{

    color:#3B5998 ;

    margin-bottom:20px;

    font-size:20px;

}



/* GRID */


.grid{

    display:grid;

    grid-template-columns:
    repeat(2,1fr);

    gap:20px;

}



.info-card{


    background:#f8fafc;

    padding:18px;

    border-radius:15px;

    border:1px solid #e2e8f0;

    transition:.3s;


}


.info-card:hover{


    transform:translateY(-4px);

    box-shadow:
    0 10px 20px rgba(0,0,0,.08);


}



.info-card label{


    display:block;

    color:#64748b;

    font-size:14px;

    margin-bottom:8px;

}



.info-card span{


    font-weight:600;

    color:#1e293b;

    word-break:break-word;

}



/* LOADING */


.loading{


padding:50px;

text-align:center;

color:#3B5998 ;

font-size:20px;


}




@media(max-width:768px){


.page{

padding:15px;

}


.profile-header{

flex-direction:column;

text-align:center;

}


.grid{

grid-template-columns:1fr;

}


.photo{

width:120px;

height:120px;

}


}






/* ================= ACTIONS ================= */

.actions{

    margin-top:30px;

    display:flex;

    justify-content:flex-end;

}


.btn-retour{


    display:flex;

    align-items:center;

    gap:10px;


    background: #3B5998 ;

    color:white;

    border:none;

    padding:12px 25px;

    border-radius:12px;

    font-size:15px;

    font-weight:600;

    cursor:pointer;

    transition:.3s;


}



.btn-retour:hover{


    background: #2E7D32;

    transform:translateY(-3px);

    box-shadow:
    0 8px 20px rgba(37,99,235,.3);


}



.btn-retour i{

    font-size:14px;

}
</style>