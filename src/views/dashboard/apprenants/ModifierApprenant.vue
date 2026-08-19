<template>

<div class="page">


    <div class="card-form">


        <!-- HEADER -->

        <div class="header">


            <h2>
                Modifier un apprenant
            </h2>


            <p>
                Mise à jour du dossier apprenant
            </p>


        </div>





        <!-- CHARGEMENT -->

        <div
            v-if="loading"
            class="loading"
        >

            Chargement des informations...

        </div>






        <!-- FORMULAIRE -->


       <FormApprenant

    v-if="!loading"

    :apprenant="apprenant"

    mode="admin"

    bouton="Modifier"

    @submit="modifier"

/>



    </div>



</div>


</template>








<script setup>


import { ref,onMounted } from "vue";

import { useRoute,useRouter } from "vue-router";


import FormApprenant from "../../../components/apprenants/FormApprenant.vue";


import {
    getApprenant,
    updateApprenant
} from "../../../services/apprenantService";







const route = useRoute();


const router = useRouter();




const apprenant = ref({});



const loading = ref(true);









/*
|--------------------------------------------------------------------------
| CHARGER APPRENANT
|--------------------------------------------------------------------------
*/


const charger = async()=>{


    try{


        const response = await getApprenant(
            route.params.id
        );


        apprenant.value = response.data;



    }

    catch(error){


        console.log(error);


        alert(
            "Impossible de charger l'apprenant"
        );


    }

    finally{


        loading.value=false;


    }



};









/*
|--------------------------------------------------------------------------
| MODIFIER
|--------------------------------------------------------------------------
*/


const modifier = async(data)=>{


    try{


        await updateApprenant(

            route.params.id,

            data

        );



        alert(
            "Modification réussie"
        );



        router.push(
            "/dashboard/apprenants"
        );



    }


    catch(error){


        console.log(error);



        alert(

            error.response?.data?.message

            ||

            "Erreur modification"

        );


    }


};








onMounted(()=>{


    charger();


});



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

    overflow:hidden;

    box-shadow:
    0 15px 35px rgba(0,0,0,.08);


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

    opacity:.9;


}







.loading{


    text-align:center;

    padding:50px;

    color:#3B5998;

}





</style>