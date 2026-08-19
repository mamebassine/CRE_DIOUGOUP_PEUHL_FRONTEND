<template>

<div class="page">


    <div class="card-form">


        <!-- HEADER -->

        <div class="header">

            <h2>
                Ajouter un apprenant
            </h2>

            <p>
                Création d'un nouveau dossier apprenant
            </p>

        </div>





        <!-- FORMULAIRE -->


        <FormApprenant
            @submit="ajouter"
        />




    </div>


</div>


</template>






<script setup>


import { useRouter } from "vue-router";


import FormApprenant from "../../../components/apprenants/FormApprenant.vue";


import { createApprenant } from "../../../services/apprenantService";



const router = useRouter();







const ajouter = async(data)=>{


    try{


        console.log("Données envoyées :", data);



        await createApprenant(data);



        alert("Apprenant ajouté avec succès");



        router.push("/dashboard/apprenants");



    }

    catch(error){


        console.log(error);



        alert(

            error.response?.data?.message

            ||

            "Erreur lors de l'ajout"

        );


    }



};



</script>









<style scoped>


.page{


    padding:30px;


    background:#F8FAFC;


    min-height:100%;



}







.card-form{


    max-width:850px;


    margin:auto;


    background:white;


    border-radius:20px;


    box-shadow:

    0 15px 35px rgba(0,0,0,.08);



    overflow:hidden;



}







.header{



    padding:25px;



    background:linear-gradient(

        135deg,

        #3B5998,

        #2E7D32

    );


    color:white;



}






.header h2{



    margin:0;


    font-weight:800;



}






.header p{



    margin:5px 0 0;



}



</style>