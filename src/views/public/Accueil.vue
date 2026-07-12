<template>

<div class="home-page">

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

   <!-- Courbe blanche -->
    <div class="hero-divider"></div>

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


<!-- ================= Historique ================= -->

<section class="about-home">

    <div class="container">

        <!-- Image -->
        <div class="about-image">

            <img
                src="@/assets/images/centre.png"
                alt="Centre de Recherche et d'Essais de Diougoup Peuhl"
            >

        </div>


        <!-- Texte -->
        <div class="about-content">

            <span class="section-subtitle">
                À propos du Centre
            </span>


            <h2>
                Centre de Recherche et d'Essais
                de Diougoup Peuhl
            </h2>


            <p>
                Le Centre de Recherche et d'Essais de Diougoup Peuhl (CRE)
                est un espace d'apprentissage, d'innovation et
                d'accompagnement dédié au développement des compétences.
                Placé sous la tutelle du Ministère de l’Enseignement
                Supérieur, de la Recherche et de l’Innovation (MESRI)
                du Sénégal, il contribue à la formation des jeunes et à
                la promotion des initiatives porteuses pour le développement
                local.
            </p>


            <RouterLink
                to="/centre"
                class="btn-about"
            >
                Découvrir le Centre →
            </RouterLink>


        </div>


    </div>


</section>


<!-- ================= FORMATIONS ================= -->

<section class="home-formations">

    <div class="home-formations-container">

        <div class="home-formations-header">

            <span>Nos formations</span>

            <h2>
                Des formations adaptées à votre avenir
            </h2>

            <p>
                Le CRE de Diougoup Peuhl propose des formations professionnelles
                dans les domaines du numérique, de l'informatique, de
                l'entrepreneuriat, de l'agroalimentaire et des énergies
                renouvelables.
            </p>

        </div>

        <div class="home-formations-grid">

            <div class="home-formation-card">

                <div class="home-formation-icon">💻</div>

                <h3>Bureautique</h3>

                <p>
                    MS Windows, Word, Excel et PowerPoint.
                </p>

            </div>

            <div class="home-formation-card">

                <div class="home-formation-icon">🛠️</div>

                <h3>Maintenance Informatique</h3>

                <p>
                    Installation, maintenance et dépannage des ordinateurs.
                </p>

            </div>

            <div class="home-formation-card">

                <div class="home-formation-icon">🎨</div>

                <h3>Infographie</h3>

                <p>
                    Photoshop et Illustrator pour la création graphique.
                </p>

            </div>

            <div class="home-formation-card">

                <div class="home-formation-icon">🌐</div>

                <h3>Développement Web</h3>

                <p>
                    Création de sites web modernes et applications web.
                </p>

            </div>

            <div class="home-formation-card">

                <div class="home-formation-icon">🚀</div>

                <h3>Entrepreneuriat</h3>

                <p>
                    Développement personnel et création d'entreprise.
                </p>

            </div>

            <div class="home-formation-card">

                <div class="home-formation-icon">☀️</div>

                <h3>Énergies renouvelables</h3>

                <p>
                    Formation sur les kits solaires et les solutions durables.
                </p>

            </div>

        </div>

        <div class="home-formations-button">

            <RouterLink
                to="/formations"
                class="home-btn-formation"
            >
                Voir toutes les formations →
            </RouterLink>

        </div>

    </div>

</section>


<!-- ================= PARTENAIRES ================= -->

<section class="section partenaires">

    <div class="content">

        <h2>
            Nos partenaires
        </h2>

        <p class="section-subtitle">
            Le Centre de Recherche et d'Essais de Diougoup Peuhl collabore avec des institutions publiques et des partenaires engagés dans la formation, l'emploi et le développement.
        </p>

        <div class="partner-slider">

            <div class="partner-track">

                <!-- Série 1 -->

                <div class="partner">
                    <img src="@/assets/images/mesriSenegal.jpg" alt="MESRI Sénégal">
                </div>

                <div class="partner">
                    <img src="@/assets/images/force n.png" alt="Force N">
                </div>

                <div class="partner">
                    <img src="@/assets/images/directionEmploiSenegal.png" alt="Direction Emploi Sénégal">
                </div>

                <div class="partner">
                    <img src="@/assets/images/anpej.png" alt="ANPEJ">
                </div>

                <div class="partner">
                    <img src="@/assets/images/ansd.jpg" alt="ANSD">
                </div>

                <div class="partner">
                    <img src="@/assets/images/ugbs.jpg" alt="UGB">
                </div>

                <!-- Série 2 (pour un défilement infini) -->

                <div class="partner">
                    <img src="@/assets/images/mesriSenegal.jpg" alt="MESRI Sénégal">
                </div>

                <div class="partner">
                    <img src="@/assets/images/force n.png" alt="Force N">
                </div>

                <div class="partner">
                    <img src="@/assets/images/directionEmploiSenegal.png" alt="Direction Emploi Sénégal">
                </div>

                <div class="partner">
                    <img src="@/assets/images/anpej.png" alt="ANPEJ">
                </div>

                <div class="partner">
                    <img src="@/assets/images/ansd.jpg" alt="ANSD">
                </div>

                <div class="partner">
                    <img src="@/assets/images/ugbs.jpg" alt="UGB">
                </div>

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

            <router-link to="/actualites" class="card news-card">

                <img src="@/assets/images/cafe.jpeg" alt="Formation">

                <div class="news-content">

                    <span>Formation</span>

                    <h4>
                        Nouvelle session de formation
                    </h4>

                    <p>
                        Les inscriptions sont ouvertes pour les nouvelles formations du CRE.
                    </p>

                </div>

            </router-link>

            <router-link to="/actualites" class="card news-card">

                <img src="@/assets/images/tomate.jpeg" alt="Agriculture">

                <div class="news-content">

                    <span>Agriculture</span>

                    <h4>
                        Recherche et expérimentation
                    </h4>

                    <p>
                        Découvrez les nouvelles expérimentations agricoles du centre.
                    </p>

                </div>

            </router-link>

            <router-link to="/actualites" class="card news-card">

                <img src="@/assets/images/dev web.jpg" alt="Développement Web">

                <div class="news-content">

                    <span>Numérique</span>

                    <h4>
                        Développement Web
                    </h4>

                    <p>
                        Les apprenants réalisent des projets web modernes et innovants.
                    </p>

                </div>

            </router-link>

        </div>

    </div>

</section>




<!-- ================= STATISTIQUES ================= -->

<section class="section stats-section">

    <div class="content">

        <h2>
            Nos statistiques
        </h2>

        <div class="cards four">

            <div class="card stat-card">

                <h3 class="counter" data-target="250">0</h3>

                <p>Apprenants</p>

            </div>

            <div class="card stat-card">

                <h3 class="counter" data-target="15">0</h3>

                <p>Formateurs</p>

            </div>

            <div class="card stat-card">

                <h3 class="counter" data-target="20">0</h3>

                <p>Modules</p>

            </div>

            <div class="card stat-card">

                <h3 class="counter" data-target="10">0</h3>

                <p>Partenaires</p>

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

      
      
      import { onMounted } from "vue";

onMounted(() => {

    const counters = document.querySelectorAll(".counter");

    counters.forEach(counter => {

        const target = Number(counter.dataset.target);

        let value = 0;

        const step = Math.ceil(target / 80);

        const update = () => {

            value += step;

            if (value >= target) {

                counter.textContent = target + "+";

            } else {

                counter.textContent = value;

                requestAnimationFrame(update);

            }

        };

        update();

    });

});
      
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

    top:0;

    right:0;

    width:43%;

    height:100%;

    overflow:hidden;

    z-index:2;

}

.image-right img{

    width:100%;
    height:100%;
    object-fit:cover;

}

.image-right img{

    width:100%;

    height:100%;

    object-fit:cover;

}

.hero-divider{

    position:absolute;

    top:0%;

    right:44%;

    width:20px;

    height:120%;

    background:#fff;

    border-radius:200px;

    transform:rotate(5deg);

    z-index:3;

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

   padding-top:55px;
    padding-left:100px;


}

.hero-content h1{

    color:white;

    font-size:40px;

    line-height:1.2;

    font-weight:1000;

    margin-bottom:15px;

}
.hero-content p{

    color:white;

    font-size:16px;

    line-height:1.7;

    max-width:650px;
    font-weight:450;


}
.hero-bottom{

    position:absolute;

    bottom:43px;   /* Avant : 35px */
    left:50%;

    transform: translateX(calc(-51% + 70px));

    z-index:5;

    text-align:center;

    width:100%;
}

.hero-bottom i{

    font-size:23px;   /* Avant : 38px */

    color:#173d88;

    margin-bottom:2px;
}

.hero-bottom h3{

    color:#173d88;

    font-size:15px;   /* Avant : 34px */

    line-height:1.5;

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

    padding:14px 10px;

    background:#3B5998
;

    color:white;

    border-radius:17px;

    text-decoration:none;

    font-weight:900;

    transition:.3s;

}

.btn-primary:hover{

    background:#2E7D32;

}

.hero-wave{

    position:absolute;

    bottom:-140px;

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

  








 /*************
 Historique
 *****************/ 

.about-home{

    padding:90px 0;

    background:#fff;

}

.container{

    width:90%;

    max-width:1200px;

    margin:auto;

    display:flex;

    align-items:center;

    justify-content:space-between;

    gap:60px;

}

.about-image{

    flex:1;

}

.about-image img{

    width:100%;

    border-radius:18px;

    box-shadow:0 15px 40px rgba(0,0,0,.15);

}

.about-content{

    flex:1;

}

.section-subtitle{

    color:#2E7D32;

    font-weight:700;

    text-transform:uppercase;

    letter-spacing:1px;

}

.about-content h2{

    margin:15px 0 20px;

    font-size:38px;

    color:#183C84;

    line-height:1.3;

}

.about-content p{

    font-size:17px;

    color:#555;

    line-height:1.8;

    text-align:justify;

}

.btn-about{

    display:inline-block;

    margin-top:30px;

    padding:14px 28px;

    background:#183C84;

    color:#fff;

    text-decoration:none;

    border-radius:10px;

    font-weight:700;

    transition:.3s;

}

.btn-about:hover{

    background:#2E7D32;

}

@media(max-width:991px){

    .container{

        flex-direction:column;

        text-align:center;

    }

    .about-content h2{

        font-size:30px;

    }

}




/****************************************
 FORMATIONS
****************************************/

/****************************************
 FORMATIONS ACCUEIL
****************************************/

.home-formations{

    padding:90px 0;

    background:#f8fbff;

}

.home-formations-container{

    width:90%;

    max-width:1200px;

    margin:auto;

}

.home-formations-header{

    text-align:center;
    margin-bottom:60px;

}

.home-formations-header span{

    display:block;

    color:var(--primary);   /* ou #3B5998 */

    font-size:25px;

    font-weight:700;

    text-transform:uppercase;

    letter-spacing:2px;

    margin-bottom:12px;

}

.home-formations-header h2{

    font-size:2.5rem;

    color:#0b1f3a;

    font-weight:700;

    margin:0;

}

.home-formations-header p{

    max-width:700px;

    margin:auto;

    color:#666;

    line-height:1.8;

}

.home-formations-grid{

    display:grid;

    grid-template-columns:repeat(auto-fit,minmax(270px,1fr));

    gap:30px;

}

.home-formation-card{

    background:#fff;

    padding:35px 25px;

    border-radius:18px;

    text-align:center;

    box-shadow:0 10px 25px rgba(0,0,0,.08);

    transition:.35s;

}

.home-formation-card:hover{

    transform:translateY(-10px);

    box-shadow:0 18px 35px rgba(0,0,0,.15);

}

.home-formation-icon{

    width:70px;

    height:70px;

    margin:auto;

    margin-bottom:20px;

    border-radius:50%;

    background:#eaf2ff;

    display:flex;

    justify-content:center;

    align-items:center;

    font-size:32px;

}

.home-formation-card h3{

    color:#0b1f3a;

    margin-bottom:15px;

    font-size:1.3rem;

}

.home-formation-card p{

    color:#666;

    line-height:1.7;

}

.home-formations-button{

    text-align:center;

    margin-top:50px;

}

.home-btn-formation{

    display:inline-block;

    background:#3B5998;

    color:#fff;

    padding:15px 35px;

    border-radius:50px;

    text-decoration:none;

    font-weight:600;

    transition:.3s;

}

.home-btn-formation:hover{

    background:#2E7D32;

    color:#fff;

    transform:translateY(-4px);

}

@media (max-width:768px){

    .home-formations-header h2{

        font-size:2rem;

    }

    .home-formations-grid{

        grid-template-columns:1fr;

    }

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

  /********
  
  les cartes sont pour actu et  stati
  ********/

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
 actualites
****************************************/

/****************************************
ACTUALITES
****************************************/

.news-card{

    overflow:hidden;

    padding:0;

    text-decoration:none;

    color:inherit;

    cursor:pointer;

    position:relative;

}

.news-card img{

    width:100%;

    height:220px;

    object-fit:cover;

    transition:.6s;

}

.news-content{

    padding:25px;

}

.news-content span{

    display:inline-block;

    background:#2E7D32;

    color:#fff;

    padding:6px 14px;

    border-radius:30px;

    font-size:13px;

    margin-bottom:15px;

}

.news-content h4{

    color:var(--primary);

    font-weight:800;

}

.news-content p{

    margin-top:15px;

    color:#555;

}

.news-card:hover{

    transform:translateY(-12px);

    box-shadow:0 20px 45px rgba(59,89,152,.25);

}

.news-card:hover img{

    transform:scale(1.12);

}

.news-card::before{

    content:"";

    position:absolute;

    top:-120%;

    left:-40%;

    width:50%;

    height:300%;

    background:rgba(255,255,255,.35);

    transform:rotate(25deg);

    animation:shine 4s infinite;

}

@keyframes shine{

    0%{

        left:-60%;

    }

    100%{

        left:160%;

    }

}





/****************************************
 PARTENAIRES
****************************************/

.partenaires{

    overflow:hidden;

}

.section-subtitle{

    max-width:700px;

    margin:15px auto 40px;

    text-align:center;

    color:#666;

    line-height:1.8;

}

.partner-slider{

    overflow:hidden;

    width:100%;

    position:relative;

}

.partner-track{

    display:flex;

    width:max-content;

    animation:defilement 30s linear infinite;

}

.partner-track:hover{

    animation-play-state:paused;

}

.partner{

    width:220px;

    height:160px;

    margin:0 15px;

    display:flex;

    justify-content:center;

    align-items:center;

    background:#fff;

    border-radius:20px;

    box-shadow:0 8px 20px rgba(0,0,0,.08);

    flex-shrink:0;

    transition:.3s;

}

.partner:hover{

    transform:translateY(-8px);

}

.partner img{

    max-width:150px;

    max-height:90px;

    object-fit:contain;

}

@keyframes defilement{

    0%{

        transform:translateX(0);

    }

    100%{

        transform:translateX(-50%);

    }

}




/****************************************
STATISTIQUES
****************************************/

.stats-section{

    background:linear-gradient(135deg,#f8fbff,#eef6ff);

}

.stat-card{

    text-align:center;

    padding:35px 20px;

    border-radius:20px;

    background:#fff;

    box-shadow:0 15px 35px rgba(0,0,0,.08);

    transition:.4s;

    animation:pulse 3s infinite;

}

.stat-card:hover{

    transform:translateY(-12px) scale(1.05);

    box-shadow:0 25px 50px rgba(59,89,152,.25);

}

.stat-card h3{

    font-size:55px;

    color:var(--primary);

    font-weight:900;

    margin-bottom:10px;

    text-shadow:0 0 12px rgba(59,89,152,.25);

}

.stat-card p{

    font-size:18px;

    font-weight:600;

    color:#555;

}

@keyframes pulse{

    0%{

        transform:scale(1);

    }

    50%{

        transform:scale(1.03);

    }

    100%{

        transform:scale(1);

    }

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