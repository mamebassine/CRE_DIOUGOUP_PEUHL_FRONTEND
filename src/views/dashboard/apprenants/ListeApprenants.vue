<template>

<div class="page-apprenants">


    <!-- ================= HEADER ================= -->

    <div class="page-header">


        <div>

            <h2>
                Gestion des Apprenants
            </h2>


            <p>
                Liste complète des apprenants inscrits au centre
            </p>


        </div>



        <RouterLink
            to="/dashboard/apprenants/ajouter"
            class="btn-add"
        >

            <i class="fas fa-user-plus"></i>

            Ajouter un apprenant

        </RouterLink>


    </div>





    <!-- ================= RECHERCHE ================= -->


    <RechercheApprenant
        @search="rechercher"
    />







    <!-- ================= CHARGEMENT ================= -->


    <div
        v-if="loading"
        class="loading"
    >

        <div class="spinner"></div>

        Chargement des apprenants...

    </div>







    <!-- ================= ERREUR ================= -->


    <div
        v-if="error"
        class="alert-error"
    >

        {{ error }}

    </div>







    <!-- ================= TABLE ================= -->


   <TableApprenants
    :apprenants="apprenants"
    @voir="voirApprenant"
    @modifier="modifierApprenant"
    @supprimer="supprimerApprenant"
/>





</div>


</template>




<script setup>


import { ref, onMounted } from "vue";

import { useRouter } from "vue-router";


// composants

import TableApprenants from "../../../components/apprenants/TableApprenants.vue";

import RechercheApprenant from "../../../components/apprenants/RechercheApprenant.vue";


// API

import {
    getApprenants,
    deleteApprenant
} from "../../../services/apprenantService";





const router = useRouter();




// ===============================
// VARIABLES
// ===============================


const apprenants = ref([]);


const listeOriginale = ref([]);


const loading = ref(true);


const error = ref("");






// ===============================
// VOIR DETAIL
// ===============================


const voirApprenant = (id)=>{


    console.log("Voir apprenant :", id);


    router.push(
        `/dashboard/apprenants/${id}`
    );


};






// ===============================
// MODIFIER
// ===============================


const modifierApprenant = (id)=>{


    router.push(
        `/dashboard/apprenants/${id}/modifier`
    );


};






// ===============================
// CHARGER LISTE APPRENANTS
// ===============================


const chargerApprenants = async()=>{


    try{


        loading.value = true;


        const response = await getApprenants();



        apprenants.value = response.data;


        listeOriginale.value = response.data;



    }

    catch(err){


        console.log(err);


        error.value =
        "Impossible de charger les apprenants";


    }


    finally{


        loading.value = false;


    }


};







// ===============================
// RECHERCHE
// ===============================


const rechercher = (mot)=>{


    if(!mot){


        apprenants.value =
        listeOriginale.value;


        return;


    }




    apprenants.value =
    listeOriginale.value.filter((a)=>{


        const nom =
        `${a.user?.nom ?? ""} ${a.user?.prenom ?? ""}`
        .toLowerCase();



        const matricule =
        (a.matricule ?? "")
        .toLowerCase();



        return (

            nom.includes(
                mot.toLowerCase()
            )

            ||

            matricule.includes(
                mot.toLowerCase()
            )

        );


    });



};







// ===============================
// SUPPRESSION
// ===============================


const supprimerApprenant = async(id)=>{


    if(
        !confirm(
            "Voulez-vous supprimer cet apprenant ?"
        )
    ){

        return;

    }





    try{


        await deleteApprenant(id);



        alert(
            "Apprenant supprimé avec succès"
        );



        chargerApprenants();



    }


    catch(err){


        console.log(err);


        alert(
            "Erreur lors de la suppression"
        );


    }



};







// ===============================
// INITIALISATION
// ===============================


onMounted(()=>{


    chargerApprenants();


});



</script>






<style scoped>


.page-apprenants{

    width:100%;

    padding:20px;

    background:#F8FAFC;

}


.page-header{

    display:flex;

    justify-content:space-between;

    align-items:center;

    margin-bottom:30px;

    width:100%;

}





.page-header h2{


    color:#3B5998;

    font-weight:800;

    margin:0;


}




.page-header p{


    color:#6B7280;

    margin-top:5px;


}




.btn-add{


    background: #2E7D32;

    color:white;

    padding:12px 20px;

    border-radius:12px;

    text-decoration:none;

    font-weight:700;

    transition:.3s;


}



.btn-add:hover{


    background:#3B5998;

    transform:translateY(-2px);


}




.loading{


    text-align:center;

    padding:40px;

    color:#3B5998;


}





.spinner{


    width:40px;

    height:40px;

    border:4px solid #ddd;

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




.alert-error{


    background:#fee2e2;

    color:#b91c1c;

    padding:15px;

    border-radius:10px;


}





@media(max-width:700px){


.page-header{


    flex-direction:column;

    gap:15px;


}



}



</style>