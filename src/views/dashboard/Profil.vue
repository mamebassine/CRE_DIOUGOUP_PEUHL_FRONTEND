<template>

<div class="profile-page">


    <div class="profile-card">



        <!-- ================= HEADER PROFIL ================= -->


        <div class="profile-header">


         <div class="avatar-box">


    <img
        v-if="user.photo"
        :src="`http://127.0.0.1:8000/storage/${user.photo}`"
        alt="Utilisateur"
        class="avatar"
    >


    <img
        v-else
        src="@/assets/images/user.png"
        alt="Utilisateur"
        class="avatar"
    >


</div>



            <h2>

                {{ user.nom }} {{ user.prenom }}

            </h2>



            <span class="role">

                {{ user.role }}

            </span>


            <p>

                Bienvenue dans votre espace personnel CRE

            </p>


        </div>







        <!-- ================= CHARGEMENT ================= -->


        <div
            v-if="loading"
            class="loading"
        >


            <div class="spinner"></div>


            Chargement du profil...


        </div>








        <!-- ================= INFORMATIONS ================= -->


        <div
            v-else
            class="profile-body"
        >



            <div class="info-card">


                <i class="fas fa-user"></i>


                <div>

                    <small>
                        Nom complet
                    </small>

                    <strong>
                        {{ user.nom }} {{ user.prenom }}
                    </strong>

                </div>


            </div>






            <div class="info-card">


                <i class="fas fa-envelope"></i>


                <div>

                    <small>
                        Email
                    </small>

                    <strong>
                        {{ user.email }}
                    </strong>

                </div>


            </div>







            <div class="info-card">


                <i class="fas fa-phone"></i>


                <div>

                    <small>
                        Téléphone
                    </small>

                    <strong>
                        {{ user.telephone || "Non renseigné" }}
                    </strong>

                </div>


            </div>







            <div class="info-card">


                <i class="fas fa-user-shield"></i>


                <div>

                    <small>
                        Rôle
                    </small>

                    <strong>
                        {{ user.role }}
                    </strong>

                </div>


            </div>







            <div class="info-card">


                <i class="fas fa-check-circle"></i>


                <div>

                    <small>
                        Statut du compte
                    </small>


                    <span
                        v-if="user.is_active"
                        class="active"
                    >

                        Actif

                    </span>


                    <span
                        v-else
                        class="inactive"
                    >

                        Désactivé

                    </span>


                </div>


            </div>





        </div>






        <!-- ================= ACTION ================= -->


        <button class="edit-btn">


            <i class="fas fa-edit"></i>


            Modifier mon profil


        </button>



    </div>



</div>


</template>




<script setup>


import { ref,onMounted } from "vue"

import { useAuthStore } from "../../stores/auth"



const auth = useAuthStore()



const loading = ref(true)



const user = ref({})





const chargerProfil = async()=>{


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




onMounted(()=>{


    chargerProfil()


})



</script>



<style scoped>


/* =========================
   PAGE PROFIL
========================= */

.profile-page{

    min-height:calc(100vh - 75px);

    background:#F8FAFC;

    padding:10px;

    box-sizing:border-box;

    display:flex;

    align-items:center;

    justify-content:center;

}




/* =========================
   CARTE
========================= */


.profile-card{

    width:100%;

    max-width:600px;

    background:#FFFFFF;

    border-radius:18px;

    overflow:hidden;

    box-shadow:0 10px 25px rgba(0,0,0,.10);

}






/* =========================
   HEADER
========================= */


.profile-header{


    text-align:center;

    padding:18px;

    background:linear-gradient(
        135deg,
        #3B5998,
        #2E7D32
    );

    color:white;

}




.avatar{


    width:65px;

    height:65px;

    border-radius:50%;

    object-fit:cover;

    border:3px solid white;

}




.profile-header h2{


    margin:8px 0 4px;

    font-size:18px;

    font-weight:800;

}




.role{


    display:inline-block;

    background:white;

    color:#3B5998;

    padding:4px 12px;

    border-radius:15px;

    font-size:12px;

    font-weight:700;

}




.profile-header p{


    margin:5px 0 0;

    font-size:12px;

}







/* =========================
   INFORMATIONS
========================= */


.profile-body{


    padding:15px;

    display:grid;

    grid-template-columns:1fr 1fr;

    gap:10px;

}





.info-card{


    display:flex;

    align-items:center;

    gap:10px;

    padding:12px;

    border-radius:10px;

    background:#F8FAFC;

    border:1px solid #E5E7EB;

}





.info-card i{


    font-size:17px;

    color:#3B5998;

}





.info-card small{


    display:block;

    font-size:11px;

    color:#6B7280;

}





.info-card strong{


    font-size:13px;

    color:#1F2937;

}





.active{


    color:#2E7D32;

    font-weight:700;

}



.inactive{


    color:#B91C1C;

    font-weight:700;

}







/* =========================
   BOUTON
========================= */


.edit-btn{


    display:block;

    margin:5px auto 15px;

    padding:8px 20px;

    border:none;

    border-radius:10px;

    background:#2E7D32;

    color:white;

    font-size:14px;

    font-weight:700;

    cursor:pointer;

}



.edit-btn:hover{


    background:#3B5998;

}







/* =========================
   LOADING
========================= */


.loading{


    padding:25px;

    text-align:center;

    color:#3B5998;

}





.spinner{


    width:30px;

    height:30px;

    border:3px solid #E5E7EB;

    border-top-color:#3B5998;

    border-radius:50%;

    margin:auto;

    animation:spin 1s linear infinite;

}




@keyframes spin{


    to{

        transform:rotate(360deg);

    }

}







@media(max-width:700px){


.profile-body{


    grid-template-columns:1fr;

}



}

</style>