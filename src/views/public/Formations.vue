<template>
  <div class="formations-page">

    <!-- HERO -->

    <section class="hero-formations">

      <div class="container">

        <span class="badge-cre">
          Nos Formations
        </span>

        <h1>
          Développez vos compétences avec le CRE de Diougoup Peuhl
        </h1>

        <p>
          Le Centre de Recherche et d'Essais (CRE) propose des formations
          professionnelles adaptées aux besoins du marché de l'emploi,
          du numérique, de l'entrepreneuriat et des métiers techniques.
        </p>

      </div>

    </section>



<!-- =======================
     FORMATIONS
======================== -->

<section class="container py-5">

  <div class="section-title">
    <h2>Nos modules de formation</h2>

    <p>
      Choisissez la formation qui correspond à votre projet professionnel.
    </p>
  </div>

  <div class="formation-grid">

    <div
      v-for="formation in formations"
      :key="formation.id"
      class="formation-card"
      @click="openFormation(formation)"
    >

      <div class="icon">
        {{ formation.icon }}
      </div>

      <h3>
        {{ formation.nom }}
      </h3>

      <p>
        {{ formation.resume }}
      </p>

      <span class="voir-plus">
        Voir les détails →
      </span>

    </div>

  </div>

</section>

<!-- =======================
        MODAL
======================== -->

<div
  v-if="selectedFormation"
  class="modal-overlay"
  @click="closeFormation"
>

  <div
    class="formation-modal"
    @click.stop
  >

    <button
      class="close-btn"
      @click="closeFormation"
    >
      ×
    </button>

    <div class="modal-icon">
      {{ selectedFormation.icon }}
    </div>

    <h2>
      {{ selectedFormation.nom }}
    </h2>

    <p class="description">
      {{ selectedFormation.description }}
    </p>

    <div class="info">

      <div class="info-item">
        <strong>Durée :</strong>
        {{ selectedFormation.duree }}
      </div>

      <div class="info-item">
        <strong>Diplôme :</strong>
        {{ selectedFormation.diplome }}
      </div>

      <div class="info-item">
        <strong>Lieu :</strong>
        {{ selectedFormation.lieu }}
      </div>

    </div>

    <h3>
      Objectifs de la formation
    </h3>

    <ul class="objectif-list">

      <li
        v-for="(objectif,index) in selectedFormation.objectifs"
        :key="index"
      >
        {{ objectif }}
      </li>

    </ul>

   <RouterLink
    to="/register"
    class="postuler-btn"
>
    Postuler →
</RouterLink>

  </div>

</div>

    





    <!-- HORAIRES -->

    <!-- ===========================
        HORAIRES
=========================== -->

<section class="horaire-section">

  <div class="container">

    <div class="section-title-light">

      <span>Organisation</span>

      <h2>Horaires des formations</h2>

      <p>
        Les formations sont organisées en plusieurs créneaux afin de répondre
        aux disponibilités des apprenants.
      </p>

    </div>

    <div class="horaire-grid">

      <!-- Cours du matin -->

      <div class="horaire-card">

        <div class="horaire-icon">
          🌞
        </div>

        <h3>Cours du matin</h3>

        <p class="heure">
          09h00 - 11h00
        </p>

        <p class="heure">
          11h00 - 13h00
        </p>

      </div>

      <!-- Pause -->

      <div class="horaire-card pause">

        <div class="horaire-icon">
          ☕
        </div>

        <h3>Pause</h3>

        <p class="heure">
          13h00 - 15h00
        </p>

        <small>
          Temps de repos et de déjeuner.
        </small>

      </div>

      <!-- Cours du soir -->

      <div class="horaire-card">

        <div class="horaire-icon">
          🌙
        </div>

        <h3>Cours de l'après-midi</h3>

        <p class="heure">
          15h00 - 17h00
        </p>

      </div>

    </div>

  </div>

</section>


    </div>
</template>



<script setup>

import { ref } from "vue";

const selectedFormation = ref(null);

const formations = ref([

  {
    id: 1,
    icon: "💻",
    nom: "Bureautique",
    resume: "Maîtrisez les outils bureautiques indispensables en entreprise.",
    description:
      "Cette formation permet d'acquérir les compétences nécessaires pour utiliser efficacement les logiciels de bureautique.",
    duree: "2 mois",
    diplome: "Attestation de formation",
    lieu: "CRE Diougoup Peuhl",
    objectifs: [
      "Maîtriser Microsoft Word",
      "Utiliser Microsoft Excel",
      "Créer des présentations PowerPoint",
      "Améliorer sa productivité"
    ]
  },

  {
    id: 2,
    icon: "🛠️",
    nom: "Maintenance Informatique",
    resume: "Apprenez à installer, réparer et maintenir un ordinateur.",
    description:
      "Formation pratique destinée aux futurs techniciens en maintenance informatique.",
    duree: "3 mois",
    diplome: "Attestation de formation",
    lieu: "CRE Diougoup Peuhl",
    objectifs: [
      "Assembler un ordinateur",
      "Diagnostiquer les pannes",
      "Installer Windows",
      "Configurer les périphériques"
    ]
  },

  {
    id: 3,
    icon: "🎨",
    nom: "Infographie",
    resume: "Créez des affiches, logos et supports de communication.",
    description:
      "Découvrez les logiciels professionnels de création graphique.",
    duree: "3 mois",
    diplome: "Attestation de formation",
    lieu: "CRE Diougoup Peuhl",
    objectifs: [
      "Utiliser Photoshop",
      "Créer avec Illustrator",
      "Concevoir des affiches",
      "Créer des logos"
    ]
  },

  {
    id: 4,
    icon: "🌐",
    nom: "Internet & Web 2.0",
    resume: "Naviguez efficacement et utilisez les outils collaboratifs.",
    description:
      "Formation destinée à développer les compétences numériques essentielles.",
    duree: "1 mois",
    diplome: "Attestation de formation",
    lieu: "CRE Diougoup Peuhl",
    objectifs: [
      "Utiliser Internet",
      "Créer une adresse e-mail",
      "Partager des documents",
      "Utiliser Google Workspace"
    ]
  },

  {
    id: 5,
    icon: "🗄️",
    nom: "Base de données",
    resume: "Initiez-vous à la conception et la gestion des bases de données.",
    description:
      "Formation sur Microsoft Access et les notions fondamentales des bases de données.",
    duree: "2 mois",
    diplome: "Attestation de formation",
    lieu: "CRE Diougoup Peuhl",
    objectifs: [
      "Créer une base de données",
      "Créer des formulaires",
      "Créer des requêtes",
      "Gérer les informations"
    ]
  },

  {
    id: 6,
    icon: "🚀",
    nom: "Entrepreneuriat & Développement Personnel",
    resume: "Développez votre leadership et votre esprit entrepreneurial.",
    description:
      "Formation pour renforcer les compétences personnelles et professionnelles.",
    duree: "2 mois",
    diplome: "Certificat",
    lieu: "CRE Diougoup Peuhl",
    objectifs: [
      "Développer le leadership",
      "Créer un projet",
      "Prendre la parole",
      "Renforcer la confiance en soi"
    ]
  },

  {
    id: 7,
    icon: "🌾",
    nom: "Métiers de l'Agroalimentaire",
    resume: "Découvrez les techniques de transformation des produits agricoles.",
    description:
      "Formation pratique destinée aux métiers de la transformation agroalimentaire.",
    duree: "3 mois",
    diplome: "Attestation",
    lieu: "CRE Diougoup Peuhl",
    objectifs: [
      "Transformer les produits agricoles",
      "Respecter les normes d'hygiène",
      "Valoriser les produits locaux",
      "Créer une activité rentable"
    ]
  },

  {
    id: 8,
    icon: "🔬",
    nom: "Découverte du Fablab",
    resume: "Initiez-vous aux outils numériques et à la fabrication digitale.",
    description:
      "Découvrez les équipements et les nouvelles technologies de fabrication.",
    duree: "1 mois",
    diplome: "Attestation",
    lieu: "CRE Diougoup Peuhl",
    objectifs: [
      "Découvrir l'impression 3D",
      "Utiliser les machines numériques",
      "Créer des prototypes",
      "Développer sa créativité"
    ]
  },

  {
    id: 9,
    icon: "👨‍💻",
    nom: "Développement Web",
    resume: "Apprenez à créer des sites web modernes et responsives.",
    description:
      "Formation complète en développement web front-end et initiation au back-end.",
    duree: "6 mois",
    diplome: "Certificat professionnel",
    lieu: "CRE Diougoup Peuhl",
    objectifs: [
      "Maîtriser HTML",
      "Maîtriser CSS",
      "Découvrir JavaScript",
      "Créer un site web responsive"
    ]
  },

  {
    id: 10,
    icon: "☀️",
    nom: "Énergies Renouvelables",
    resume: "Découvrez les solutions énergétiques durables.",
    description:
      "Formation sur les énergies renouvelables et les installations solaires.",
    duree: "2 mois",
    diplome: "Attestation",
    lieu: "CRE Diougoup Peuhl",
    objectifs: [
      "Comprendre le solaire",
      "Installer des équipements",
      "Assurer la maintenance",
      "Promouvoir les énergies propres"
    ]
  },

  {
    id: 11,
    icon: "💼",
    nom: "Entrepreneuriat",
    resume: "Transformez votre idée en entreprise viable.",
    description:
      "Formation destinée aux futurs entrepreneurs.",
    duree: "2 mois",
    diplome: "Attestation",
    lieu: "CRE Diougoup Peuhl",
    objectifs: [
      "Créer un business plan",
      "Monter une entreprise",
      "Gérer une activité",
      "Développer son projet"
    ]
  },

  {
    id: 12,
    icon: "🥜",
    nom: "Transformation Agroalimentaire",
    resume: "Valorisez les produits agricoles locaux.",
    description:
      "Formation sur les procédés de transformation alimentaire.",
    duree: "3 mois",
    diplome: "Attestation",
    lieu: "CRE Diougoup Peuhl",
    objectifs: [
      "Transformer les céréales",
      "Transformer les fruits",
      "Conditionner les produits",
      "Respecter les normes"
    ]
  },

  {
    id: 13,
    icon: "🔋",
    nom: "Montage de Kits Solaires",
    resume: "Installez des systèmes photovoltaïques performants.",
    description:
      "Formation pratique en installation et maintenance des kits solaires.",
    duree: "3 mois",
    diplome: "Attestation",
    lieu: "CRE Diougoup Peuhl",
    objectifs: [
      "Installer un kit solaire",
      "Réaliser le câblage",
      "Effectuer la maintenance",
      "Diagnostiquer les pannes"
    ]
  }

]);

function openFormation(formation) {
  selectedFormation.value = formation;
}

function closeFormation() {
  selectedFormation.value = null;
}




const allerInscription = () => {

    selectedFormation.value = null;

    const section = document.getElementById("inscription");

    section?.scrollIntoView({

        behavior: "smooth"

    });

};

</script>





<style scoped>

/* ===========================
   PAGE FORMATIONS
=========================== */

.formations-page{
    background: #f5f8fc;
    color: #1f2937;
      margin-top:70px;

}

/* ===========================
   HERO
=========================== */

.hero-formations{
    background:linear-gradient(135deg,#3B5998,#3B5998);
    color:#fff;
    text-align:center;
    padding:90px 20px;
    
}

.hero-formations h1{
    font-size:3rem;
    font-weight:700;
    margin:20px 0;
    color: #3B5998;
}

.hero-formations p{
    max-width:750px;
    margin:auto;
    font-size:1.1rem;
    line-height:1.8;
}

.badge-cre{
    display:inline-block;
    background:#ffffff25;
    border:1px solid #ffffff55;
    padding:10px 22px;
    border-radius:40px;
    font-weight:600;
    letter-spacing:1px;
    backdrop-filter:blur(8px);
}

/* ===========================
   TITRE
=========================== */

.section-title{
    text-align:center;
    margin-bottom:60px;
}

.section-title h2{
    font-size:2.5rem;
    color: #3B5998;
    margin-bottom:15px;
}

.section-title p{
    color: #666;
    font-size:1.05rem;
}


/*==================================
    GRID DES FORMATIONS
==================================*/

.formation-grid{
    display:grid;
    grid-template-columns:repeat(auto-fit,minmax(280px,1fr));
    gap:30px;
}

/*==================================
    CARTE
==================================*/

.formation-card{
    background:#fff;
    border-radius:18px;
    padding:30px;
    cursor:pointer;
    box-shadow:0 10px 25px rgba(0,0,0,.08);
    transition:.35s;
    border-top:5px solid #3B5998;
}

.formation-card:hover{
    transform:translateY(-8px);
    box-shadow:0 18px 40px rgba(0,0,0,.15);
}

.icon{
    width:70px;
    height:70px;
    background:#eaf3ff;
    border-radius:50%;
    display:flex;
    align-items:center;
    justify-content:center;
    font-size:2rem;
    margin-bottom:20px;
}

.formation-card h3{
    color: #3B5998;
    margin-bottom:15px;
    font-size:1.4rem;
}

.formation-card p{
    color:#666;
    line-height:1.7;
    margin-bottom:25px;
}

.voir-plus{
    color: #fff;
    font-weight:600;
    transition:.3s;
    background: #3B5998;
     padding:14px 10px;

    border-radius:15px;

}

.formation-card:hover .voir-plus{
    margin-left:8px;
}

/*==================================
        MODAL
==================================*/

.modal-overlay{
    position:fixed;
    inset:0;
    background:rgba(0,0,0,.65);
    display:flex;
    justify-content:center;
    align-items:center;
    padding:20px;
    z-index:9999;
}

.formation-modal{
    background:#fff;
    width:100%;
    max-width:700px;
    border-radius:20px;
    padding:40px;
    position:relative;
    animation:zoom .3s ease;
    max-height:90vh;
    overflow-y:auto;
}

@keyframes zoom{

    from{
        opacity:0;
        transform:scale(.8);
    }

    to{
        opacity:1;
        transform:scale(1);
    }

}

/*==================================
    BOUTON FERMER
==================================*/

.close-btn{
  color: #3B5998;
    position:absolute;
    top:18px;
    right:18px;
    width:40px;
    height:40px;
    border:none;
    border-radius:50%;
    background: #f1f1f1;
    cursor:pointer;
    font-size:22px;
    transition:.3s;
}

.close-btn:hover{
    background: #2E7D32;
    color:#fff;
}

/*==================================
        ICONE MODAL
==================================*/

.modal-icon{
    width:90px;
    height:90px;
    margin:auto;
    margin-bottom:25px;
    background: #eaf3ff;
    border-radius:50%;
    display:flex;
    justify-content:center;
    align-items:center;
    font-size:3rem;
}

.formation-modal h2{
    text-align:center;
    color: #3B5998;
    margin-bottom:20px;
}

.description{
    color:#666;
    line-height:1.8;
    text-align:center;
    margin-bottom:30px;
}

/*==================================
        INFOS
==================================*/

.info{
    display:grid;
    grid-template-columns:repeat(auto-fit,minmax(180px,1fr));
    gap:15px;
    margin-bottom:30px;
}

.info-item{
    background: #f8f9fb;
    padding:15px;
    border-radius:10px;
}

.info-item strong{
    display:block;
    color: #3B5998;
    margin-bottom:6px;
}

/*==================================
      OBJECTIFS
==================================*/

.objectif-list{
    margin-top:15px;
    margin-bottom:35px;
    padding-left:20px;
}

.objectif-list li{
    margin-bottom:12px;
    color:#555;
    line-height:1.6;
}

/*==================================
      BOUTON POSTULER
==================================*/

.postuler-btn{
    display: inline-block;
    padding:15px;
    border:none;
    border-radius:12px;
    background: #3B5998;
    color:#fff;
    font-size:17px;
    font-weight:600;
    cursor:pointer;
    transition:.3s;
        text-decoration: none;

}

.postuler-btn:hover{
    background: #2E7D32;
}


/*==================================
      RESPONSIVE
==================================*/

@media(max-width:768px){

    .formation-modal{
        padding:25px;
    }

    .formation-modal h2{
        font-size:1.6rem;
    }

    .icon{
        width:60px;
        height:60px;
        font-size:1.8rem;
    }

}




/*==================================
        HORAIRES
==================================*/

.horaire-section{

    padding:90px 0;

    margin-top:90px;

    background:linear-gradient(135deg,#0056b3,#0088cc);

    color:#fff;

}

.section-title-light{

    text-align:center;

    margin-bottom:60px;

}

.section-title-light span{

    display:inline-block;

    padding:8px 18px;

    background:rgba(255,255,255,.15);

    border-radius:30px;

    font-size:.95rem;

    margin-bottom:20px;

}

.section-title-light h2{

    font-size:2.6rem;

    margin-bottom:15px;

    font-weight:700;

}

.section-title-light p{

    max-width:650px;

    margin:auto;

    line-height:1.8;

    color:rgba(255,255,255,.9);

}

.horaire-grid{

    display:grid;

    grid-template-columns:repeat(auto-fit,minmax(280px,1fr));

    gap:30px;

}

.horaire-card{

    background:rgba(255,255,255,.12);

    backdrop-filter:blur(12px);

    border-radius:20px;

    padding:35px;

    text-align:center;

    transition:.35s;

    border:1px solid rgba(255,255,255,.18);

}

.horaire-card:hover{

    transform:translateY(-8px);

    background:rgba(255,255,255,.18);

    box-shadow:0 20px 40px rgba(0,0,0,.20);

}

.horaire-icon{

    width:75px;

    height:75px;

    margin:auto;

    margin-bottom:20px;

    border-radius:50%;

    background:rgba(255,255,255,.18);

    display:flex;

    justify-content:center;

    align-items:center;

    font-size:2rem;

}

.horaire-card h3{

    margin-bottom:25px;

    font-size:1.5rem;

}

.heure{

    font-size:1.2rem;

    font-weight:600;

    margin:12px 0;

}

.pause{

    border:2px solid #FFD54F;

}

.pause .horaire-icon{

    background:#FFD54F;

}

.pause h3{

    color:#FFD54F;

}

.pause small{

    display:block;

    margin-top:15px;

    color:#f8f8f8;

    font-size:.95rem;

    line-height:1.6;

}

@media(max-width:768px){

    .section-title-light h2{

        font-size:2rem;

    }

}





@media(max-width:768px){

.hero-formations{

    padding:70px 20px;

}

.hero-formations h1{

    font-size:2rem;

}

.hero-formations p{

    font-size:1rem;

}

.section-title{

    margin-bottom:40px;

}

.section-title h2{

    font-size:1.8rem;

}

.formation-card{

    padding:25px;

}

.icon{

    width:60px;

    height:60px;

    font-size:1.7rem;

}

.horaire-section{

    padding:60px 0;

}

.horaire-section h2{

    font-size:2rem;

}

.inscription h2{

    font-size:2rem;

}

}

@media(max-width:576px){

.hero-formations h1{

    font-size:1.7rem;

}

.hero-formations p{

    line-height:1.6;

}

.section-title h2{

    font-size:1.6rem;

}

.formation-card h3{

    font-size:1.2rem;

}

.horaire-card{

    padding:25px;

}

.infos span{

    width:100%;

}

}

</style>