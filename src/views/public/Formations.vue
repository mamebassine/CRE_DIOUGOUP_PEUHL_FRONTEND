<template>
  <div class="formations-page">

    <!-- =====================================================
         HERO
    ====================================================== -->
    <section class="hero-formations">

      <div class="hero-content">

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


    <!-- =====================================================
         FORMATIONS
    ====================================================== -->
    <section class="formations-section">

      <div class="container">

        <!-- TITRE -->
        <div class="section-title">

          <span class="section-label">
            Nos programmes
          </span>

          <h2>
            Nos modules de formation
          </h2>

          <p>
            Choisissez la formation qui correspond à votre projet
            professionnel et développez de nouvelles compétences.
          </p>

        </div>


        <!-- =================================================
             CHARGEMENT
        ================================================== -->
        <div
          v-if="formationStore.loading"
          class="loading-container"
        >

          <div class="loader"></div>

          <p>
            Chargement des formations...
          </p>

        </div>


        <!-- =================================================
             AUCUNE FORMATION
        ================================================== -->
        <div
          v-else-if="formationStore.formations.length === 0"
          class="empty-container"
        >

          <div class="empty-icon">
            📚
          </div>

          <h3>
            Aucune formation disponible
          </h3>

          <p>
            Aucune formation active n'est disponible pour le moment.
          </p>

        </div>


        <!-- =================================================
             LISTE DES FORMATIONS
        ================================================== -->
        <div
          v-else
          class="formation-grid"
        >

          <article
            v-for="formation in formationStore.formations"
            :key="formation.id"
            class="formation-card"
            @click="openFormation(formation)"
          >

            <!-- IMAGE -->
            <div class="formation-image-container">

              <img
                v-if="getIconUrl(formation.icone)"
                :src="getIconUrl(formation.icone)"
                :alt="formation.nom"
                class="formation-image"
                @error="imageError"
              />

              <div
                v-else
                class="formation-default-icon"
              >
                📚
              </div>

            </div>


            <!-- CONTENU -->
            <div class="formation-content">

              <h3>
                {{ formation.nom }}
              </h3>

              <p class="formation-resume">
                {{ formation.resume }}
              </p>


              <!-- INFOS -->
              <div class="card-infos">

                <span>
                  <strong>⏳</strong>
                  {{ formation.duree }}
                </span>

                <span>
                  <strong>🎓</strong>
                  {{ formation.diplome }}
                </span>

              </div>


              <!-- BOUTON -->
              <button
                type="button"
                class="voir-plus"
                @click.stop="openFormation(formation)"
              >
                Voir les détails
                <span>→</span>
              </button>

            </div>

          </article>

        </div>


        <!-- =================================================
             PAGINATION
        ================================================== -->
        <div
          v-if="
            formationStore.pagination &&
            formationStore.pagination.last_page > 1
          "
          class="pagination"
        >

          <!-- PRECEDENT -->
          <button
            type="button"
            class="pagination-arrow"
            :disabled="
              formationStore.pagination.current_page === 1
            "
            @click="
              changerPage(
                formationStore.pagination.current_page - 1
              )
            "
          >
            ←
          </button>


          <!-- NUMEROS -->
          <button
            v-for="
              pageNumber in formationStore.pagination.last_page
            "
            :key="pageNumber"
            type="button"
            class="pagination-number"
            :class="{
              active:
                pageNumber ===
                formationStore.pagination.current_page
            }"
            @click="changerPage(pageNumber)"
          >
            {{ pageNumber }}
          </button>


          <!-- SUIVANT -->
          <button
            type="button"
            class="pagination-arrow"
            :disabled="
              formationStore.pagination.current_page ===
              formationStore.pagination.last_page
            "
            @click="
              changerPage(
                formationStore.pagination.current_page + 1
              )
            "
          >
            →
          </button>

        </div>

      </div>

    </section>


    <!-- =====================================================
         MODAL DETAIL
    ====================================================== -->
    <div
      v-if="selectedFormation"
      class="modal-overlay"
      @click.self="closeFormation"
    >

      <div class="formation-modal">

        <!-- FERMER -->
        <button
          type="button"
          class="close-btn"
          @click="closeFormation"
          aria-label="Fermer"
        >
          ×
        </button>


        <!-- IMAGE -->
        <div class="modal-icon">

          <img
            v-if="getIconUrl(selectedFormation.icone)"
            :src="getIconUrl(selectedFormation.icone)"
            :alt="selectedFormation.nom"
            class="modal-image"
            @error="imageError"
          />

          <span
            v-else
            class="modal-default-icon"
          >
            📚
          </span>

        </div>


        <!-- TITRE -->
        <h2>
          {{ selectedFormation.nom }}
        </h2>


        <!-- RESUME -->
        <p
          v-if="selectedFormation.resume"
          class="modal-resume"
        >
          {{ selectedFormation.resume }}
        </p>


        <!-- DESCRIPTION -->
        <div class="description-box">

          <h3>
            Présentation
          </h3>

          <p class="description">
            {{ selectedFormation.description }}
          </p>

        </div>


        <!-- INFORMATIONS -->
        <div class="info">

          <!-- DUREE -->
          <div class="info-item">

            <div class="info-icon">
              ⏳
            </div>

            <div>
              <strong>
                Durée
              </strong>

              <span>
                {{ selectedFormation.duree || 'Non renseignée' }}
              </span>
            </div>

          </div>


          <!-- DIPLOME -->
          <div class="info-item">

            <div class="info-icon">
              🎓
            </div>

            <div>
              <strong>
                Diplôme
              </strong>

              <span>
                {{ selectedFormation.diplome || 'Non renseigné' }}
              </span>
            </div>

          </div>


          <!-- LIEU -->
          <div class="info-item">

            <div class="info-icon">
              📍
            </div>

            <div>
              <strong>
                Lieu
              </strong>

              <span>
                {{ selectedFormation.lieu || 'Non renseigné' }}
              </span>
            </div>

          </div>


          <!-- CAPACITE -->
          <div
            v-if="selectedFormation.capacite"
            class="info-item"
          >

            <div class="info-icon">
              👥
            </div>

            <div>

              <strong>
                Capacité
              </strong>

              <span>
                {{ selectedFormation.capacite }} places
              </span>

            </div>

          </div>

        </div>


        <!-- =================================================
             OBJECTIFS
        ================================================== -->
        <div class="objectifs-section">

          <h3>
            Objectifs de la formation
          </h3>


          <ul
            v-if="
              Array.isArray(selectedFormation.objectifs) &&
              selectedFormation.objectifs.length > 0
            "
            class="objectif-list"
          >

            <li
              v-for="
                (objectif, index)
                in selectedFormation.objectifs
              "
              :key="index"
            >

              <span class="objectif-check">
                ✓
              </span>

              <span>
                {{ objectif }}
              </span>

            </li>

          </ul>


          <p
            v-else
            class="aucun-objectif"
          >
            Aucun objectif renseigné pour cette formation.
          </p>

        </div>


        <!-- =================================================
             POSTULER
        ================================================== -->
        <button
          type="button"
          class="postuler-btn"
          @click="postuler"
        >
          S'inscrire à cette formation
          <span>→</span>
        </button>

      </div>

    </div>


    <!-- =====================================================
         HORAIRES
    ====================================================== -->
    <section class="horaire-section">

      <div class="container">

        <div class="section-title-light">

          <span>
            Organisation
          </span>

          <h2>
            Horaires des formations
          </h2>

          <p>
            Les formations sont organisées en plusieurs créneaux
            afin de répondre aux disponibilités des apprenants.
          </p>

        </div>


        <div class="horaire-grid">


          <!-- MATIN -->
          <div class="horaire-card">

            <div class="horaire-icon">
              🌞
            </div>

            <h3>
              Cours du matin
            </h3>

            <p class="heure">
              09h00 - 11h00
            </p>

            <p class="heure">
              11h00 - 13h00
            </p>

          </div>


          <!-- PAUSE -->
          <div class="horaire-card pause">

            <div class="horaire-icon">
              ☕
            </div>

            <h3>
              Pause
            </h3>

            <p class="heure">
              13h00 - 15h00
            </p>

            <small>
              Temps de repos et de déjeuner.
            </small>

          </div>


          <!-- APRES-MIDI -->
          <div class="horaire-card">

            <div class="horaire-icon">
              🌙
            </div>

            <h3>
              Cours de l'après-midi
            </h3>

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

import {
  ref,
  onMounted,
  onBeforeUnmount
} from "vue";

import {
  useRouter
} from "vue-router";

import {
  useFormationStore
} from "../../stores/formation";


/*
|--------------------------------------------------------------------------
| ROUTER
|--------------------------------------------------------------------------
*/

const router = useRouter();


/*
|--------------------------------------------------------------------------
| STORE
|--------------------------------------------------------------------------
*/

const formationStore =
  useFormationStore();


/*
|--------------------------------------------------------------------------
| FORMATION SELECTIONNEE
|--------------------------------------------------------------------------
*/

const selectedFormation = ref(null);


/*
|--------------------------------------------------------------------------
| URL DU BACKEND
|--------------------------------------------------------------------------
|
| Ton Laravel tourne normalement sur :
|
| http://127.0.0.1:8000
|
| Si VITE_API_URL existe dans .env, elle sera utilisée.
|
|--------------------------------------------------------------------------
*/

const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://127.0.0.1:8000";


/*
|--------------------------------------------------------------------------
| CONVERSION DE L'ICONE EN URL
|--------------------------------------------------------------------------
|
| Le backend peut renvoyer :
|
| 1. formations/image.jpg
|
| 2. https://site.com/image.jpg
|
|--------------------------------------------------------------------------
*/

function getIconUrl(icone) {

  /*
  |--------------------------------------------------------------------------
  | Pas d'image
  |--------------------------------------------------------------------------
  */

  if (!icone) {
    return null;
  }


  /*
  |--------------------------------------------------------------------------
  | URL EN LIGNE
  |--------------------------------------------------------------------------
  */

  if (
    icone.startsWith("http://") ||
    icone.startsWith("https://")
  ) {

    return icone;

  }


  /*
  |--------------------------------------------------------------------------
  | IMAGE LOCALE LARAVEL
  |--------------------------------------------------------------------------
  */

  return `${API_URL}/storage/${icone}`;

}


/*
|--------------------------------------------------------------------------
| ERREUR IMAGE
|--------------------------------------------------------------------------
*/

function imageError(event) {

  event.target.style.display = "none";

}


/*
|--------------------------------------------------------------------------
| CHARGEMENT DES FORMATIONS
|--------------------------------------------------------------------------
*/

async function chargerFormations(page = 1) {

  try {

    await formationStore.fetchFormations(page);

  } catch (error) {

    console.error(
      "Erreur lors du chargement des formations :",
      error
    );

  }

}


/*
|--------------------------------------------------------------------------
| CHANGER DE PAGE
|--------------------------------------------------------------------------
*/

async function changerPage(numero) {

  if (!formationStore.pagination) {
    return;
  }


  if (
    numero < 1 ||
    numero > formationStore.pagination.last_page
  ) {
    return;
  }


  await chargerFormations(numero);


  /*
  |--------------------------------------------------------------------------
  | Retour vers le début de la section
  |--------------------------------------------------------------------------
  */

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

}


/*
|--------------------------------------------------------------------------
| OUVRIR LE MODAL
|--------------------------------------------------------------------------
*/

function openFormation(formation) {

  selectedFormation.value = formation;

  /*
  |--------------------------------------------------------------------------
  | Bloquer le scroll derrière le modal
  |--------------------------------------------------------------------------
  */

  document.body.style.overflow = "hidden";

}


/*
|--------------------------------------------------------------------------
| FERMER LE MODAL
|--------------------------------------------------------------------------
*/

function closeFormation() {

  selectedFormation.value = null;

  /*
  |--------------------------------------------------------------------------
  | Réactiver le scroll
  |--------------------------------------------------------------------------
  */

  document.body.style.overflow = "";

}


/*
|--------------------------------------------------------------------------
| TOUCHE ECHAP
|--------------------------------------------------------------------------
*/

function handleEscape(event) {

  if (
    event.key === "Escape" &&
    selectedFormation.value
  ) {

    closeFormation();

  }

}


/*
|--------------------------------------------------------------------------
| POSTULER
|--------------------------------------------------------------------------
|
| On garde ta route existante :
|
| /inscription-formation
|
| avec :
|
| formation_id
|
|--------------------------------------------------------------------------
*/

function postuler() {

  if (!selectedFormation.value) {
    return;
  }


  router.push({

    path: "/inscription-formation",

    query: {
      formation_id:
        selectedFormation.value.id
    }

  });

}


/*
|--------------------------------------------------------------------------
| CHARGEMENT INITIAL
|--------------------------------------------------------------------------
*/

onMounted(async () => {

  await chargerFormations(1);

  window.addEventListener(
    "keydown",
    handleEscape
  );

});


/*
|--------------------------------------------------------------------------
| NETTOYAGE
|--------------------------------------------------------------------------
*/

onBeforeUnmount(() => {

  document.body.style.overflow = "";

  window.removeEventListener(
    "keydown",
    handleEscape
  );

});

</script>


<style scoped>

/* =========================================================
   PAGE
========================================================= */

.formations-page {

  background: #f5f8fc;

  color: #1f2937;

  margin-top: 70px;

  min-height: 100vh;

}


/* =========================================================
   CONTAINER
========================================================= */

.container {

  width: 90%;

  max-width: 1200px;

  margin: 0 auto;

}


/* =========================================================
   HERO
========================================================= */

.hero-formations {

  background: linear-gradient(
    135deg,
    #3B5998,
    #3B5998
  );

  color: #fff;

  text-align: center;

  padding: 100px 20px;

}


.hero-content {

  max-width: 900px;

  margin: 0 auto;

}


.badge-cre {

  display: inline-block;

  background: #ffffff25;

  border: 1px solid #ffffff55;

  padding: 10px 22px;

  border-radius: 40px;

  font-weight: 600;

  letter-spacing: 1px;

  backdrop-filter: blur(8px);

}


.hero-formations h1 {

  font-size: 3rem;

  font-weight: 700;

  margin: 25px 0 20px;

  color: #fff;

  line-height: 1.2;

}


.hero-formations p {

  max-width: 780px;

  margin: auto;

  font-size: 1.1rem;

  line-height: 1.8;

  color: #fff;

}


/* =========================================================
   SECTION FORMATIONS
========================================================= */

.formations-section {

  padding: 90px 0;

  background: #f5f8fc;

}


/* =========================================================
   TITRE
========================================================= */

.section-title {

  text-align: center;

  margin-bottom: 55px;

}


.section-label {

  display: inline-block;

  color: #3B5998;

  font-weight: 700;

  font-size: 14px;

  text-transform: uppercase;

  letter-spacing: 1px;

  margin-bottom: 10px;

}


.section-title h2 {

  font-size: 2.5rem;

  color: #3B5998;

  margin: 0 0 15px;

}


.section-title p {

  max-width: 700px;

  margin: auto;

  color: #666;

  font-size: 1.05rem;

  line-height: 1.7;

}


/* =========================================================
   GRID FORMATIONS
========================================================= */

.formation-grid {

  display: grid;

  grid-template-columns:
    repeat(3, minmax(0, 1fr));

  gap: 30px;

}


/* =========================================================
   CARTE FORMATION
========================================================= */

.formation-card {

  background: #fff;

  border-radius: 18px;

  overflow: hidden;

  cursor: pointer;

  box-shadow:
    0 10px 25px rgba(0, 0, 0, .08);

  transition:
    transform .35s ease,
    box-shadow .35s ease;

  border-top: 5px solid #3B5998;

  display: flex;

  flex-direction: column;

}


.formation-card:hover {

  transform: translateY(-8px);

  box-shadow:
    0 18px 40px rgba(0, 0, 0, .15);

}


/* =========================================================
   IMAGE
========================================================= */

.formation-image-container {

  width: 100%;

  height: 190px;

  background: #eaf3ff;

  overflow: hidden;

  display: flex;

  align-items: center;

  justify-content: center;

}


.formation-image {

  width: 100%;

  height: 100%;

  object-fit: cover;

  display: block;

  transition: transform .4s ease;

}


.formation-card:hover .formation-image {

  transform: scale(1.05);

}


.formation-default-icon {

  width: 80px;

  height: 80px;

  background: #eaf3ff;

  border-radius: 50%;

  display: flex;

  align-items: center;

  justify-content: center;

  font-size: 2.5rem;

}


/* =========================================================
   CONTENU CARTE
========================================================= */

.formation-content {

  padding: 28px;

  display: flex;

  flex-direction: column;

  flex: 1;

}


.formation-card h3 {

  color: #3B5998;

  margin: 0 0 14px;

  font-size: 1.4rem;

  line-height: 1.3;

}


.formation-resume {

  color: #666;

  line-height: 1.7;

  margin: 0 0 22px;

  display: -webkit-box;

  -webkit-line-clamp: 3;

  -webkit-box-orient: vertical;

  overflow: hidden;

}


/* =========================================================
   INFORMATIONS CARTE
========================================================= */

.card-infos {

  display: flex;

  flex-wrap: wrap;

  gap: 10px;

  margin-top: auto;

  margin-bottom: 22px;

}


.card-infos span {

  background: #f8f9fb;

  color: #555;

  padding: 8px 11px;

  border-radius: 8px;

  font-size: .9rem;

}


.card-infos strong {

  color: #3B5998;

}


/* =========================================================
   BOUTON DETAILS
========================================================= */

.voir-plus {

  width: 100%;

  border: none;

  padding: 14px 16px;

  border-radius: 12px;

  background: #3B5998;

  color: #fff;

  font-weight: 600;

  font-size: 15px;

  cursor: pointer;

  transition: .3s;

}


.voir-plus span {

  margin-left: 7px;

  transition: .3s;

}


.voir-plus:hover {

  background: #2E7D32;

}


.voir-plus:hover span {

  margin-left: 12px;

}


/* =========================================================
   LOADING
========================================================= */

.loading-container {

  min-height: 300px;

  display: flex;

  flex-direction: column;

  justify-content: center;

  align-items: center;

  color: #666;

}


.loader {

  width: 45px;

  height: 45px;

  border-radius: 50%;

  border: 4px solid #eaf3ff;

  border-top-color: #3B5998;

  animation:
    rotation .8s linear infinite;

  margin-bottom: 15px;

}


@keyframes rotation {

  to {

    transform: rotate(360deg);

  }

}


/* =========================================================
   AUCUNE FORMATION
========================================================= */

.empty-container {

  text-align: center;

  padding: 70px 20px;

  background: #fff;

  border-radius: 18px;

  box-shadow:
    0 10px 25px rgba(0, 0, 0, .05);

}


.empty-icon {

  font-size: 4rem;

  margin-bottom: 15px;

}


.empty-container h3 {

  color: #3B5998;

  margin-bottom: 10px;

}


.empty-container p {

  color: #666;

}


/* =========================================================
   PAGINATION
========================================================= */

.pagination {

  display: flex;

  justify-content: center;

  align-items: center;

  gap: 10px;

  margin-top: 50px;

  flex-wrap: wrap;

}


.pagination button {

  width: 42px;

  height: 42px;

  border: none;

  border-radius: 50%;

  background: #fff;

  color: #3B5998;

  font-weight: 700;

  cursor: pointer;

  box-shadow:
    0 5px 15px rgba(0, 0, 0, .1);

  transition: .3s;

}


.pagination button:hover:not(:disabled),

.pagination button.active {

  background: #3B5998;

  color: #fff;

}


.pagination button:disabled {

  opacity: .4;

  cursor: not-allowed;

}


/* =========================================================
   MODAL
========================================================= */

.modal-overlay {

  position: fixed;

  inset: 0;

  background: rgba(0, 0, 0, .65);

  display: flex;

  justify-content: center;

  align-items: center;

  padding: 20px;

  z-index: 9999;

  overflow-y: auto;

}


.formation-modal {

  background: #fff;

  width: 100%;

  max-width: 780px;

  border-radius: 20px;

  padding: 45px;

  position: relative;

  animation: zoom .3s ease;

  max-height: 90vh;

  overflow-y: auto;

}


@keyframes zoom {

  from {

    opacity: 0;

    transform: scale(.8);

  }

  to {

    opacity: 1;

    transform: scale(1);

  }

}


/* =========================================================
   FERMER
========================================================= */

.close-btn {

  color: #3B5998;

  position: absolute;

  top: 18px;

  right: 18px;

  width: 40px;

  height: 40px;

  border: none;

  border-radius: 50%;

  background: #f1f1f1;

  cursor: pointer;

  font-size: 25px;

  line-height: 1;

  transition: .3s;

}


.close-btn:hover {

  background: #2E7D32;

  color: #fff;

}


/* =========================================================
   IMAGE MODAL
========================================================= */

.modal-icon {

  width: 110px;

  height: 110px;

  margin: 0 auto 25px;

  background: #eaf3ff;

  border-radius: 50%;

  display: flex;

  justify-content: center;

  align-items: center;

  overflow: hidden;

}


.modal-image {

  width: 100%;

  height: 100%;

  object-fit: cover;

}


.modal-default-icon {

  font-size: 3.2rem;

}


/* =========================================================
   TITRE MODAL
========================================================= */

.formation-modal h2 {

  text-align: center;

  color: #3B5998;

  margin-bottom: 12px;

  font-size: 2rem;

}


.modal-resume {

  text-align: center;

  color: #3B5998;

  font-weight: 600;

  line-height: 1.6;

  margin-bottom: 25px;

}


.description-box {

  background: #f8f9fb;

  border-radius: 12px;

  padding: 20px;

  margin-bottom: 30px;

}


.description-box h3 {

  color: #3B5998;

  margin-bottom: 10px;

}


.description {

  color: #666;

  line-height: 1.8;

  margin: 0;

}


/* =========================================================
   INFORMATIONS MODAL
========================================================= */

.info {

  display: grid;

  grid-template-columns:
    repeat(2, minmax(0, 1fr));

  gap: 15px;

  margin-bottom: 35px;

}


.info-item {

  background: #f8f9fb;

  padding: 17px;

  border-radius: 12px;

  display: flex;

  align-items: center;

  gap: 12px;

}


.info-icon {

  width: 42px;

  height: 42px;

  min-width: 42px;

  border-radius: 50%;

  background: #eaf3ff;

  display: flex;

  align-items: center;

  justify-content: center;

}


.info-item strong {

  display: block;

  color: #3B5998;

  margin-bottom: 5px;

}


.info-item span {

  color: #555;

  font-size: .95rem;

}


/* =========================================================
   OBJECTIFS
========================================================= */

.objectifs-section {

  margin-bottom: 30px;

}


.objectifs-section h3 {

  color: #3B5998;

  margin-bottom: 18px;

}


.objectif-list {

  list-style: none;

  padding: 0;

  margin: 0;

}


.objectif-list li {

  display: flex;

  align-items: flex-start;

  gap: 10px;

  margin-bottom: 13px;

  color: #555;

  line-height: 1.6;

}


.objectif-check {

  width: 24px;

  height: 24px;

  min-width: 24px;

  border-radius: 50%;

  background: #3B5998;

  color: #fff;

  display: flex;

  align-items: center;

  justify-content: center;

  font-size: 13px;

  font-weight: bold;

}


.aucun-objectif {

  color: #777;

  font-style: italic;

}


/* =========================================================
   POSTULER
========================================================= */

.postuler-btn {

  width: 100%;

  padding: 16px;

  border: none;

  border-radius: 12px;

  background: #3B5998;

  color: #fff;

  font-size: 17px;

  font-weight: 600;

  cursor: pointer;

  transition: .3s;

}


.postuler-btn span {

  margin-left: 8px;

}


.postuler-btn:hover {

  background: #2E7D32;

}


/* =========================================================
   HORAIRES
========================================================= */

.horaire-section {

  padding: 90px 0;

  margin-top: 0;

  background:
    linear-gradient(
      135deg,
      #0056b3,
      #0088cc
    );

  color: #fff;

}


.section-title-light {

  text-align: center;

  margin-bottom: 60px;

}


.section-title-light span {

  display: inline-block;

  padding: 8px 18px;

  background: rgba(255, 255, 255, .15);

  border-radius: 30px;

  font-size: .95rem;

  margin-bottom: 20px;

}


.section-title-light h2 {

  font-size: 2.6rem;

  margin-bottom: 15px;

  font-weight: 700;

}


.section-title-light p {

  max-width: 650px;

  margin: auto;

  line-height: 1.8;

  color: rgba(255, 255, 255, .9);

}


/* =========================================================
   GRID HORAIRES
========================================================= */

.horaire-grid {

  display: grid;

  grid-template-columns:
    repeat(3, minmax(0, 1fr));

  gap: 30px;

}


.horaire-card {

  background: rgba(255, 255, 255, .12);

  backdrop-filter: blur(12px);

  border-radius: 20px;

  padding: 35px;

  text-align: center;

  transition: .35s;

  border: 1px solid rgba(255, 255, 255, .18);

}


.horaire-card:hover {

  transform: translateY(-8px);

  background: rgba(255, 255, 255, .18);

  box-shadow:
    0 20px 40px rgba(0, 0, 0, .20);

}


.horaire-icon {

  width: 75px;

  height: 75px;

  margin: 0 auto 20px;

  border-radius: 50%;

  background: rgba(255, 255, 255, .18);

  display: flex;

  justify-content: center;

  align-items: center;

  font-size: 2rem;

}


.horaire-card h3 {

  margin-bottom: 25px;

  font-size: 1.5rem;

}


.heure {

  font-size: 1.2rem;

  font-weight: 600;

  margin: 12px 0;

}


.pause {

  border: 2px solid #FFD54F;

}


.pause .horaire-icon {

  background: #FFD54F;

}


.pause h3 {

  color: #FFD54F;

}


.pause small {

  display: block;

  margin-top: 15px;

  color: #f8f8f8;

  font-size: .95rem;

  line-height: 1.6;

}


/* =========================================================
   TABLETTE
========================================================= */

@media (max-width: 992px) {

  .formation-grid {

    grid-template-columns:
      repeat(2, minmax(0, 1fr));

  }

  .horaire-grid {

    grid-template-columns:
      repeat(2, minmax(0, 1fr));

  }

}


/* =========================================================
   MOBILE
========================================================= */

@media (max-width: 768px) {

  .formations-page {

    margin-top: 60px;

  }


  .hero-formations {

    padding: 70px 20px;

  }


  .hero-formations h1 {

    font-size: 2rem;

  }


  .hero-formations p {

    font-size: 1rem;

    line-height: 1.6;

  }


  .formations-section {

    padding: 60px 0;

  }


  .section-title {

    margin-bottom: 40px;

  }


  .section-title h2 {

    font-size: 1.8rem;

  }


  .formation-grid {

    grid-template-columns: 1fr;

  }


  .formation-image-container {

    height: 210px;

  }


  .formation-modal {

    padding: 30px 20px;

    max-height: 94vh;

  }


  .formation-modal h2 {

    font-size: 1.6rem;

  }


  .info {

    grid-template-columns: 1fr;

  }


  .horaire-section {

    padding: 60px 0;

  }


  .section-title-light h2 {

    font-size: 2rem;

  }


  .horaire-grid {

    grid-template-columns: 1fr;

  }

}


/* =========================================================
   PETIT TELEPHONE
========================================================= */

@media (max-width: 576px) {

  .hero-formations h1 {

    font-size: 1.7rem;

  }


  .hero-formations p {

    line-height: 1.6;

  }


  .section-title h2 {

    font-size: 1.6rem;

  }


  .formation-card h3 {

    font-size: 1.2rem;

  }


  .formation-content {

    padding: 22px;

  }


  .formation-image-container {

    height: 180px;

  }


  .horaire-card {

    padding: 25px;

  }


  .pagination {

    gap: 7px;

  }


  .pagination button {

    width: 36px;

    height: 36px;

  }

}

</style>