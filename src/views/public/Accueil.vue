<template>

<div class="home-page">

    
    <!-- ================= HERO ================= -->

<!-- ================= HERO ================= -->

<section class="hero">

    <!-- Images -->
    <div class="hero-images">

        <div class="image-left">
            <img
                src="@/assets/images/femmes.jpg"
                alt="Formation"
            >
        </div>

        <div class="image-right">
            <img
                src="@/assets/images/recherche.png"
                alt="Recherche"
            >
        </div>

    </div>

    <!-- Texte -->
    <div class="hero-content">

        <h1>
            Centre de Recherche
            <br>
            et d'Essais de
            <br>
            Diougoup Peuhl
        </h1>

        <p>
            Développez vos compétences dans les métiers du numérique,
            de l'informatique et de l'entrepreneuriat grâce à des
            formations adaptées aux besoins du marché.
        </p>

        <RouterLink
            to="/register"
            class="btn-primary"
        >
            S'inscrire maintenant →
        </RouterLink>

    </div>

    <!-- Bas -->
   <div class="hero-wave"></div>

<div class="hero-bottom">

    <i class="fa-solid fa-building-columns"></i>

    <h3>
        Centre de Recherche et d'Essais
        <br>
        de Diougoup Peuhl
    </h3>

</div>

</section>

    <!-- ================= STATISTIQUES ================= -->

    <section class="section light">

        <div class="content">

            <h2>
                Nos statistiques
            </h2>

            <div class="cards four">

                <div class="card">

                    <h3>250+</h3>

                    <p>Apprenants</p>

                </div>

                <div class="card">

                    <h3>15</h3>

                    <p>Formateurs</p>

                </div>

                <div class="card">

                    <h3>20+</h3>

                    <p>Modules</p>

                </div>

                <div class="card">

                    <h3>10+</h3>

                    <p>Partenaires</p>

                </div>

            </div>

        </div>

    </section>



    <!-- ================= FORMATIONS ================= -->

    <section class="section">

        <div class="content">

            <h2>
                Nos formations
            </h2>

            <div class="cards three">

                <div class="card">

                    <h4>
                        Développement Web
                    </h4>

                    <p>
                        HTML, CSS, JavaScript, PHP, Laravel et Vue.js.
                    </p>

                </div>

                <div class="card">

                    <h4>
                        Bureautique
                    </h4>

                    <p>
                        Word, Excel, PowerPoint et outils numériques.
                    </p>

                </div>

                <div class="card">

                    <h4>
                        Infographie
                    </h4>

                    <p>
                        Création graphique et communication visuelle.
                    </p>

                </div>

            </div>

        </div>

    </section>



    <!-- ================= ACTUALITES ================= -->

    <section class="section light">

        <div class="content">

            <h2>
                Actualités
            </h2>

            <div class="cards three">

                <div class="card">

                    <h4>
                        Nouvelle session de formation
                    </h4>

                    <p>
                        Les inscriptions sont ouvertes.
                    </p>

                </div>

                <div class="card">

                    <h4>
                        Activités du centre
                    </h4>

                    <p>
                        Découvrez nos événements.
                    </p>

                </div>

                <div class="card">

                    <h4>
                        Réussites des apprenants
                    </h4>

                    <p>
                        Nos apprenants construisent leur avenir.
                    </p>

                </div>

            </div>

        </div>

    </section>



    <!-- ================= PARTENAIRES ================= -->

    <section class="section">

        <div class="content">

            <h2>
                Nos partenaires
            </h2>

            <div class="cards three">

                <div class="card partner">

                    Partenaire 1

                </div>

                <div class="card partner">

                    Partenaire 2

                </div>

                <div class="card partner">

                    Partenaire 3

                </div>

            </div>

        </div>

    </section>



    <!-- ================= INSCRIPTION ================= -->

    <section class="join">

        <div class="join-content">

            <h2>
                Rejoignez le CRE Diougoup Peuhl
            </h2>

            <p>
                Développez vos compétences avec nos formations.
            </p>

            <RouterLink
                to="/register"
                class="btn-primary"
            >
                Créer un compte
            </RouterLink>

        </div>

    </section>

</div>

</template>




      <script setup>

      import { RouterLink } from "vue-router";
      import centreImage from "@/assets/images/recherche.png";

      </script>






<style scoped>

/****************************************
 VARIABLES
****************************************/

:root{

    --primary:#3B5998;
    --secondary:#2E7D32;
    --background:#F8FAFC;
    --surface:#FFFFFF;
    --text:#1F2937;

}

/****************************************
 RESET
****************************************/

*{

    margin:0;
    padding:0;
    box-sizing:border-box;

}

.home-page{

    width:100%;
    background:var(--background);

}

/****************************************
 CONTENEUR
****************************************/

.content{

    width:100%;
    max-width:1400px;
    margin:0 auto;
    padding:0 40px;

}




  
/****************************************
HERO tu m'a fatiguuer heeeeeeeee
****************************************/
.hero{

    position:relative;

    width:100%;

    height:520px;

    overflow:hidden;

    background:#fff;

    margin-top:105px;

}
.hero-images{

    position:absolute;

    inset:0;

}
.image-left{

    position:absolute;

    top:0;

    left:0;

    width:68%;

    height:100%;

}

.image-left img{

    width:100%;

    height:100%;

    object-fit:cover;

}
.image-right{

    position:absolute;

    right:0;

    top:0;

    width:45%;

    height:100%;

    clip-path:polygon(15% 0,100% 0,100% 100%,0 100%);

}

.image-right img{

    width:100%;

    height:100%;

    object-fit:cover;

}
.hero::before{

    content:"";

    position:absolute;

    inset:0;

    background:linear-gradient(
        90deg,
        rgba(0,0,0,.55),
        rgba(0,0,0,.15)
    );

    z-index:1;

}
.hero-content{

    position:relative;

    z-index:3;

    width:650px;

   padding-top:60px;
    padding-left:90px;


}

.hero-content h1{

    color:white;

    font-size:37px;

    line-height:1.2;

    font-weight:1000;

    margin-bottom:15px;

}
.hero-content p{

    color:white;

    font-size:18px;

    line-height:1.7;

    max-width:650px;

}
.hero-bottom{

    position:absolute;

    bottom:65px;   /* Avant : 35px */
    left:50%;

    transform:translateX(-50%);

    z-index:5;

    text-align:center;

    width:100%;
}

.hero-bottom i{

    font-size:13px;   /* Avant : 38px */

    color:#173d88;

    margin-bottom:10px;
}

.hero-bottom h3{

    color:#173d88;

    font-size:10px;   /* Avant : 34px */

    line-height:1.4;

    font-weight:1000;

    margin:0;
}
.btn-primary{

    margin-top:45px;

    position:relative;

    z-index:5;

}

.btn-primary{

    display:inline-block;

    margin-top:18px;

    padding:14px 8px;

    background:#3949db;

    color:white;

    border-radius:17px;

    text-decoration:none;

    font-weight:900;

    transition:.3s;

}

.btn-primary:hover{

    background:#1f8a46;

}

.hero-wave{

    position:absolute;

    bottom:-120px;

    left:50%;

    transform:translateX(-50%);

    width:140%;

    height:260px;

    background:#fff;

    border-top-left-radius:100%;

    border-top-right-radius:100%;

    z-index:2;

}
.hero-wave i{

    font-size:40px;

    color:#183c84;

}
.hero-wave h3{

    margin-top:15px;

    color:#183c84;

    text-align:center;

    line-height:1.5;

}

  

  
  
  
  
  /****************************************
  SECTIONS hero bocoutes fiiiiii
  ****************************************/

  .section{

      padding:80px 0;

  }

  .light{

      background:#F5F8FC;

  }

  /****************************************
  TITRES ET PARAGRAPHES
  ****************************************/

  .section h2{

    text-align:center;

    color:var(--primary);

    font-size:36px;

    margin-bottom:45px;

}


  h3{

      color:var(--primary);

      font-size:38px;

  }

  h4{

      color:var(--primary);

      font-size:24px;

      margin-bottom:18px;

  }

  .section p{

    color:var(--text);

    line-height:1.8;

    font-size:16px;

}

  /****************************************
  PRESENTATION
  ****************************************/

  .presentation{

      display:flex;

      justify-content:space-between;

      align-items:center;

      gap:60px;

  }

  .presentation-text{

      flex:1;

  }

  .presentation-text p{

      margin-bottom:20px;

      text-align:justify;

  }

  .presentation-image{

      flex:1;

  }

  .presentation-image img{

      width:100%;

      display:block;

      border-radius:20px;

      box-shadow:0 10px 30px rgba(0,0,0,.15);

  }

  /****************************************
  CARDS
  ****************************************/

  .cards{

      display:flex;

      justify-content:space-between;

      gap:30px;

      flex-wrap:wrap;

  }

  .cards.four .card{

      flex:1 1 calc(25% - 25px);

  }

  .cards.three .card{

      flex:1 1 calc(33.333% - 20px);

  }

  .card{

      background:white;

      border-radius:18px;

      padding:30px;

      text-align:center;

      box-shadow:0 8px 25px rgba(0,0,0,.08);

      transition:.3s;

  }

  .card:hover{

      transform:translateY(-8px);

      box-shadow:0 15px 35px rgba(0,0,0,.15);

  }

  .card p{

      margin-top:15px;

  }














/****************************************
 STATISTIQUES
****************************************/

.cards.four .card h3{

    font-size:42px;

    font-weight:800;

    color:var(--primary);

    margin-bottom:12px;

}

/****************************************
 FORMATIONS
****************************************/

.cards.three .card h4{

    font-size:22px;

    color:var(--primary);

}

/****************************************
 PARTENAIRES
****************************************/

.partner{

    display:flex;

    justify-content:center;

    align-items:center;

    min-height:140px;

    font-size:22px;

    font-weight:700;

    color:var(--primary);

}

/****************************************
 SECTION INSCRIPTION
****************************************/

.join{

    width:100%;

    background:var(--primary);

    padding:80px 20px;

}

.join-content{

    max-width:900px;

    margin:auto;

    text-align:center;

}

.join h2{

    color:white;

}

.join p{

    color:white;

    margin:25px 0 35px;

}

/****************************************
 RESPONSIVE TABLETTE
****************************************/

@media (max-width:992px){

.content{

    padding:0 25px;

}

.hero{

    min-height:auto;

}

.overlay{

    min-height:auto;
    padding:80px 0;

}

.hero-content{

    flex-direction:column-reverse;
    text-align:center;

}

.hero-text h2{

    text-align:center;
    font-size:34px;

}

.presentation{

    flex-direction:column;

}

.cards.four .card,
.cards.three .card{

    flex:1 1 calc(50% - 15px);

}

}

/****************************************
 RESPONSIVE MOBILE
****************************************/

@media (max-width:768px){

.content{

    padding:0 18px;

}

.hero{

    margin-top:90px;

}

.hero-text h2{

    font-size:28px;

}

.hero-text p{

    font-size:16px;

}

.hero-image img{

    max-width:320px;

}

.section{

    padding:60px 0;

}

.cards{

    flex-direction:column;

}

.cards.four .card,
.cards.three .card{

    flex:1 1 100%;

}

.btn-primary,
.btn-secondary{

    width:100%;
    text-align:center;

}

}

</style>