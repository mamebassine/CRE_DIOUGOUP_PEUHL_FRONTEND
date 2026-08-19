<template>

<div class="register-page">


    <div class="register-card">


        <!-- ================= IMAGE ================= -->

        <div class="register-image">


            <img
                src="@/assets/images/login.jpg"
                alt="Inscription CRE"
            >


            <div class="image-overlay">


                <h2>
                    CRE<br>
                    de Diougoup Peuhl
                </h2>


                <span>
                    Créez votre compte et rejoignez votre espace personnel pour profiter de nos services.
                </span>


            </div>


        </div>




        <!-- ================= FORMULAIRE ================= -->


        <div class="register-content">


            <h1>
                Créer un compte ✨
            </h1>


            <p class="subtitle">
                Inscrivez-vous pour accéder à votre espace.
            </p>



            <form @submit.prevent="register">



                <div class="input-group">

                    <label>
                        Nom
                    </label>

                    <input
                        type="text"
                        v-model="form.nom"
                        required
                    >

                </div>




                <div class="input-group">

                    <label>
                        Prénom
                    </label>


                    <input
                        type="text"
                        v-model="form.prenom"
                        required
                    >

                </div>




                <div class="input-group">

                    <label>
                        Email
                    </label>


                    <input
                        type="email"
                        v-model="form.email"
                        required
                    >

                </div>




                <div class="input-group">

                    <label>
                        Téléphone
                    </label>


                    <input
                        type="text"
                        v-model="form.telephone"
                    >

                </div>



            <div class="input-group">

                <label>Formation choisie</label>

                <input
                    type="text"
                    v-model="form.formation"
                    readonly
                >

            </div>



            <div class="input-group">

                    <label>
                        Mot de passe
                    </label>


                    <input
                        type="password"
                        v-model="form.password"
                        required
                    >

                </div>




                <div class="input-group">

                    <label>
                        Confirmation mot de passe
                    </label>


                    <input
                        type="password"
                        v-model="form.password_confirmation"
                        required
                    >

                </div>



                <button
                    class="register-btn"
                    :disabled="loading"
                >


                    <span
                        v-if="loading"
                        class="loader"
                    ></span>


                    {{ loading ? "Création..." : "Créer mon compte" }}


                </button>



            </form>




            <div
                v-if="success"
                class="success-box"
            >

                {{ success }}

            </div>




            <div
                v-if="error"
                class="error-box"
            >

                {{ error }}

            </div>




            <div class="login-link">


                Vous avez déjà un compte ?


                <RouterLink to="/login">

                    Se connecter

                </RouterLink>



                <div class="back-site">


                    <RouterLink to="/">
                        ← Retour au site
                    </RouterLink>


                </div>



            </div>



        </div>



    </div>



</div>

</template>


<script setup>

import { ref } from "vue"
import { useRouter, useRoute, RouterLink } from "vue-router"
import { useAuthStore } from "../../stores/auth"


const router = useRouter()
const route = useRoute()

const auth = useAuthStore()


const loading = ref(false)

const success = ref("")

const error = ref("")



const form = ref({
    nom: "",
    prenom: "",
    email: "",
    telephone: "",
    formation: route.query.formation || "",
    password: "",
    password_confirmation: ""
})





const register = async()=>{


    loading.value = true

    success.value = ""

    error.value = ""



    try{


        await auth.register(form.value)



        success.value = "Compte créé avec succès."



        setTimeout(()=>{


            router.push("/login")


        },1500)



    }


    catch(e){



        if(e.response?.data?.message){


            error.value = e.response.data.message


        }


        else if(e.response?.data?.errors){


            error.value = Object.values(e.response.data.errors)
            .flat()
            .join(" ")


        }


        else{


            error.value = "Une erreur est survenue."


        }


    }


    finally{


        loading.value = false


    }



}



</script>



<style scoped>


/* =========================
   PAGE COMPLETE
========================= */

.register-page{

    height:100vh;

    display:flex;

    align-items:center;

    justify-content:center;

    padding:15px;

    background:#F8FAFC;

    box-sizing:border-box;

    overflow:hidden;

}



/* =========================
   CARTE PRINCIPALE
========================= */

.register-card{

    width:100%;

    max-width:1050px;

    height:85vh;

    max-height:650px;

    display:flex;

    overflow:hidden;

    background:white;

    border-radius:25px;

    box-shadow:0 20px 50px rgba(0,0,0,.12);

}



/* =========================
   IMAGE
========================= */

.register-image{

    width:50%;

    height:100%;

    position:relative;

    overflow:hidden;

}



.register-image img{

    width:100%;

    height:100%;

    object-fit:cover;

    display:block;

}



.image-overlay{

    position:absolute;

    inset:0;

    background:linear-gradient(
        rgba(59,89,152,.80),
        rgba(46,125,50,.80)
    );

    display:flex;

    flex-direction:column;

    justify-content:center;

    padding:35px;

    color:white;

}



.image-overlay h2{
 font-size:50px;

    font-weight:900;

    line-height:1.2;

    margin-bottom:12px;

    text-transform:uppercase;

}


.image-overlay span{
  font-size:18px;

    line-height:1.5;

    font-weight:600;

    margin-bottom:12px;

}



/* =========================
   FORMULAIRE
========================= */

.register-content{

    width:50%;

    padding:30px 35px;

    box-sizing:border-box;

    overflow-y:auto;

}



/* scrollbar */

.register-content::-webkit-scrollbar{

    width:6px;

}


.register-content::-webkit-scrollbar-thumb{

    background:#2E7D32;

    border-radius:10px;

}





.register-content h1{

    color:#3B5998;

    font-size:26px;

    font-weight:800;

    margin-bottom:8px;

}



.subtitle{

    color:#1F2937;

    margin-bottom:12px;

}



/* =========================
   INPUTS
========================= */


.input-group{

    margin-bottom:10px;

}



.input-group label{

    display:block;

    margin-bottom:5px;

    color:#1F2937;

    font-weight:600;

}



.input-group input{

    width:100%;

    height:40px;

    padding:0 15px;

    border-radius:12px;

    border:2px solid #E5E7EB;

    background:#F8FAFC;

    color:#1F2937;

    font-size:14px;

    outline:none;

    box-sizing:border-box;

    transition:.3s;

}



.input-group input:focus{

    border-color:#3B5998;

    background:white;

    box-shadow:0 0 0 4px rgba(59,89,152,.15);

}



/* =========================
   BOUTON
========================= */


.register-btn{

    width:100%;

    height:48px;

    border:none;

    border-radius:12px;

    background:#2E7D32;

    color:white;

    font-size:16px;

    font-weight:700;

    cursor:pointer;

    transition:.3s;

}



.register-btn:hover{

    background:#256728;

    transform:translateY(-2px);

}



.register-btn:disabled{

    opacity:.7;

    cursor:not-allowed;

}



/* =========================
   LOADER
========================= */


.loader{

    display:inline-block;

    width:15px;

    height:15px;

    border:3px solid rgba(255,255,255,.4);

    border-top-color:white;

    border-radius:50%;

    margin-right:8px;

    animation:rotation .8s linear infinite;

}



@keyframes rotation{

    100%{

        transform:rotate(360deg);

    }

}



/* =========================
   MESSAGE SUCCESS
========================= */


.success-box{

    margin-top:12px;

    padding:10px;

    border-radius:10px;

    background:#DCFCE7;

    color:#166534;

}



/* =========================
   MESSAGE ERREUR
========================= */


.error-box{

    margin-top:12px;

    padding:10px;

    border-radius:10px;

    background:#FEE2E2;

    color:#B91C1C;

}



/* =========================
   LOGIN LINK
========================= */


.login-link{

    text-align:center;

    margin-top:15px;

    color:#1F2937;

}



.login-link a{

    color:#3B5998;

    font-weight:700;

    text-decoration:none;

    margin-left:5px;

}



.login-link a:hover{

    color:#2E7D32;

}



/* =========================
   RETOUR AU SITE
========================= */


.back-site{

    margin-top:10px;

}



.back-site a{

    color:#2E7D32;

    font-weight:700;

    text-decoration:none;

}



.back-site a:hover{

    color:#3B5998;

}



/* =========================
   RESPONSIVE
========================= */


@media(max-width:850px){


    .register-page{

        height:auto;

        min-height:100vh;

        overflow:auto;

    }



    .register-card{

        height:auto;

        max-height:none;

        flex-direction:column;

    }



    .register-image,
    .register-content{

        width:100%;

    }



    .register-image{

        height:230px;

    }



    .register-content{

        padding:25px;

        overflow:visible;

    }


}



@media(max-width:500px){


    .image-overlay h2{

        font-size:24px;

    }



    .image-overlay p{

        font-size:15px;

    }



    .register-content h1{

        font-size:24px;

    }


}


</style>