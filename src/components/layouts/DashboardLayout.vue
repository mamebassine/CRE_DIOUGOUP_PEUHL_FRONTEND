<template>


<div class="dashboard-layout">



    <!-- ================= SIDEBAR ================= -->


    <Sidebar />






    <!-- ================= CONTENU ================= -->


    <div class="dashboard-content">






        <!-- ================= HEADER ================= -->


        <header class="topbar">





            <div class="page-title">


                <h5>
                    Tableau de bord
                </h5>


                <small>
                    CRE de Diougoup Peuhl
                </small>


            </div>







            <!-- ================= PROFIL UTILISATEUR ================= -->


            <div class="profile">





                <!-- Notification -->


                <div class="notification">


                    <i class="fas fa-bell"></i>


                    <span class="badge">
                        3
                    </span>


                </div>







<!-- ================= IMAGE UTILISATEUR ================= -->

<img
    v-if="auth.user?.photo"
    :src="`http://127.0.0.1:8000/storage/${auth.user.photo}`"
    alt="Utilisateur"
    class="user-image"
>


<img
    v-else
    src="http://127.0.0.1:8000/storage/users/default.png"
    alt="Utilisateur"
    class="user-image"
>







                <!-- Informations -->


                <div class="user-info">


                    <strong>

                        {{ auth.user?.nom }}

                    </strong>



                    <small>

                        {{ auth.user?.role }}

                    </small>


                </div>




            </div>





        </header>









        <!-- ================= CONTENU PAGE ================= -->


        <main class="page-content">


            <RouterView />


        </main>





    </div>





</div>



</template>









<script setup>


import Sidebar from "../Sidebar.vue";

import { RouterView } from "vue-router";

import { useAuthStore } from "../../stores/auth";



const auth = useAuthStore();



</script>









<style scoped>



/* =========================
LAYOUT
========================= */


.dashboard-layout{


    display:flex;


    min-height:100vh;


    background:#F8FAFC;


}


/* =========================
CONTENU========================= */

.dashboard-content{
    flex:1;
    margin-left:260px;
    width:calc(100% - 260px);
    min-height:100vh;
    background:#F8FAFC;
}

.page-content{
    padding:65px;
}

/* =========================
TOPBAR
========================= */


.topbar{


    height:75px;


    background:#FFFFFF;


    display:flex;


    justify-content:space-between;


    align-items:center;


    padding:0 30px;


    box-shadow:0 3px 15px rgba(0,0,0,.08);


}






.page-title h5{


    color:#3B5998;


    font-weight:800;


    margin:0;


}





.page-title small{


    color:#1F2937;


}








/* =========================
PROFILE
========================= */


.profile{


    display:flex;


    align-items:center;


    gap:15px;


}







/* IMAGE */


.user-image{


    width:45px;


    height:45px;


    border-radius:50%;


    object-fit:cover;


    border:3px solid #2E7D32;


}







/* NOM + ROLE */


.user-info{


    display:flex;


    flex-direction:column;


    line-height:1.2;


}



.user-info strong{


    color:#1F2937;


    font-size:15px;


}



.user-info small{


    color:#2E7D32;


    font-weight:600;


}









/* =========================
NOTIFICATION
========================= */


.notification{


    position:relative;


    width:40px;


    height:40px;


    border-radius:50%;


    display:flex;


    align-items:center;


    justify-content:center;


    background:#F8FAFC;


    color:#3B5998;


    cursor:pointer;


    transition:.3s;


}





.notification:hover{


    background:#3B5998;


    color:white;


}




.notification i{


    font-size:18px;


}






.badge{


    position:absolute;


    top:-3px;


    right:-3px;


    background:#2E7D32;


    color:white;


    font-size:11px;


    width:18px;


    height:18px;


    border-radius:50%;


    display:flex;


    align-items:center;


    justify-content:center;


}


/* =========================
RESPONSIVE
========================= */


@media(max-width:850px){


    .dashboard-content{


        margin-left:230px;


    }


}



</style>