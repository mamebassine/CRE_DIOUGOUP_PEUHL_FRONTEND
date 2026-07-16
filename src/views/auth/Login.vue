<template>

<div class="login-page">

    <div class="login-card">

        <!-- ================= IMAGE ================= -->

        <div class="login-image">

            <img
                src="@/assets/images/login.jpg"
                alt="Connexion CRE"
            >

            <div class="image-overlay">

                <h2>
                    CRE<br>
                    de Diougoup Peuhl
                </h2>

                <span>
                    Connectez-vous pour accéder à votre espace personnel et gérer vos activités en toute simplicité.
                </span>

            </div>

        </div>


        <!-- ================= FORMULAIRE ================= -->

        <div class="login-content">

            <h1>
                Bon retour 👋
            </h1>

            <p class="subtitle">
                Connectez-vous à votre compte.
            </p>


            <form @submit.prevent="connexion">


                <div class="input-group">

                    <label>
                        Email
                    </label>

                    <input
                        type="email"
                        v-model="form.email"
                        placeholder="Entrez votre adresse email"
                        required
                    >

                </div>


                <div class="input-group">

                    <label>
                        Mot de passe
                    </label>

                    <input
                        type="password"
                        v-model="form.password"
                        placeholder="Entrez votre mot de passe"
                        required
                    >

                </div>



                <button
                    class="login-btn"
                    :disabled="loading"
                >

                    <span
                        v-if="loading"
                        class="loader"
                    ></span>


                    {{ loading ? "Connexion..." : "Se connecter" }}


                </button>


            </form>



            <div
                v-if="erreur"
                class="error-box"
            >
                {{ erreur }}
            </div>




            <div class="register">


                Vous n'avez pas encore de compte ?


                <RouterLink to="/register">

                    S'inscrire

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

/* =========================
   PAGE COMPLETE
========================= */

.login-page{

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

.login-card{

    width:100%;

    max-width:1050px;

    height:85vh;

    max-height:620px;

    display:flex;

    overflow:hidden;

    background:#FFFFFF;

    border-radius:25px;

    box-shadow:0 20px 50px rgba(0,0,0,0.12);

}


/* =========================
   IMAGE
========================= */

.login-image{

    width:50%;

    height:100%;

    position:relative;

    overflow:hidden;

}



.login-image img{

    width:100%;

    height:100%;

    object-fit:cover;

    display:block;

}



.image-overlay{

    position:absolute;

    inset:0;

    background:linear-gradient(
        rgba(59,89,152,0.80),
        rgba(46,125,50,0.80)
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


.login-content{

    width:50%;

    padding:35px;

    box-sizing:border-box;

    overflow:hidden;

}



.login-content h1{

    color:#3B5998;

    font-size:28px;

    font-weight:800;

    margin-bottom:8px;

}



.subtitle{

    color:#1F2937;

    margin-bottom:20px;

}



/* =========================
   INPUTS
========================= */


.input-group{

    margin-bottom:15px;

}



.input-group label{

    display:block;

    margin-bottom:6px;

    color:#1F2937;

    font-weight:600;

}



.input-group input{

    width:100%;

    height:46px;

    padding:0 15px;

    border-radius:12px;

    border:2px solid #E5E7EB;

    background:#F8FAFC;

    color:#1F2937;

    font-size:14px;

    outline:none;

    box-sizing:border-box;

}



.input-group input:focus{

    border-color:#3B5998;

    background:#FFFFFF;

    box-shadow:0 0 0 4px rgba(59,89,152,.15);

}



/* =========================
   BOUTON
========================= */


.login-btn{

    width:100%;

    height:48px;

    border:none;

    border-radius:12px;

    background:#2E7D32;

    color:#FFFFFF;

    font-size:16px;

    font-weight:700;

    cursor:pointer;

    transition:.3s;

}



.login-btn:hover{

    background:#256728;

    transform:translateY(-2px);

}



/* =========================
   LOADER
========================= */


.loader{

    display:inline-block;

    width:15px;

    height:15px;

    border:3px solid rgba(255,255,255,.4);

    border-top-color:#FFFFFF;

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
   ERREUR
========================= */


.error-box{

    margin-top:12px;

    padding:10px;

    border-radius:10px;

    background:#FEE2E2;

    color:#B91C1C;

    border-left:5px solid #DC2626;

}



/* =========================
   INSCRIPTION
========================= */


.register{

    margin-top:15px;

    text-align:center;

    color:#1F2937;

}



.register a{

    color:#3B5998;

    font-weight:700;

    text-decoration:none;

    margin-left:5px;

}



.register a:hover{

    color:#2E7D32;

}



/* =========================
   RETOUR AU SITE
========================= */


.back-site{

    margin-top:10px;

    text-align:center;

}



.back-site a{

    color:#2E7D32;

    font-weight:700;

    text-decoration:none;

}



/* =========================
   RESPONSIVE
========================= */


@media(max-width:850px){


    .login-page{

        height:auto;

        min-height:100vh;

        overflow:hidden;

    }



    .login-card{

        height:auto;

        max-height:none;

        flex-direction:column;

    }



    .login-image,
    .login-content{

        width:100%;

    }



    .login-image{

        height:250px;

    }



    .login-content{

        padding:25px;

    }


}



@media(max-width:500px){


    .login-content h1{

        font-size:24px;

    }



    .image-overlay{

        padding:20px;

    }



    .image-overlay h2{

        font-size:22px;

    }


}


</style>