<script setup>

import { inscriptionPublique } from "@/services/inscriptionService";

import {
    ref,
    onMounted,
    computed
} from "vue";

import {
    useRouter,
    useRoute
} from "vue-router";

import { useFormationStore } from "../../stores/formation";


const router = useRouter();

const route = useRoute();

const formationStore = useFormationStore();


// ======================================================
// FORMATION
// ======================================================

const formation = ref(null);

const loading = ref(false);

const message = ref("");

const messageType = ref("");


// ======================================================
// FORMULAIRE
// ======================================================

const form = ref({

    nom: "",
    prenom: "",
    email: "",
    telephone: "",
    date_naissance: "",
    sexe: "",
    situation_matrimoniale: "",
    niveau_etude: "",
    niveau_informatique: "",
    adresse: "",
    formation_id: "",
    horaire: "",

    password: "",
    password_confirmation: ""

});


// ======================================================
// MOT DE PASSE
// ======================================================

const showPassword = ref(false);

const showPasswordConfirmation = ref(false);


// ======================================================
// DATE MINIMUM : 11 ANS
// ======================================================

const dateNaissanceMax = computed(() => {

    const date = new Date();

    date.setFullYear(
        date.getFullYear() - 11
    );

    return date.toISOString().split("T")[0];

});


// ======================================================
// CALCUL DE L'ÂGE
// ======================================================

const age = computed(() => {

    if (!form.value.date_naissance) {

        return null;

    }

    const naissance =
        new Date(form.value.date_naissance);

    const aujourdHui =
        new Date();

    let ageCalcule =
        aujourdHui.getFullYear()
        -
        naissance.getFullYear();

    const mois =
        aujourdHui.getMonth()
        -
        naissance.getMonth();

    if (
        mois < 0 ||
        (
            mois === 0 &&
            aujourdHui.getDate()
            <
            naissance.getDate()
        )
    ) {

        ageCalcule--;

    }

    return ageCalcule;

});


// ======================================================
// VÉRIFICATION ÂGE
// ======================================================

function verifierAge() {

    if (
        form.value.date_naissance &&
        age.value < 11
    ) {

        message.value =
            "L'inscription est réservée aux personnes âgées d'au moins 11 ans.";

        messageType.value =
            "error";

        return false;

    }

    return true;

}


// ======================================================
// RÉCUPÉRER LA FORMATION
// ======================================================

onMounted(async () => {

    const id =
        route.query.formation_id;

    if (!id) {

        message.value =
            "Aucune formation sélectionnée.";

        messageType.value =
            "error";

        return;

    }

    try {

        form.value.formation_id = id;

        await formationStore.fetchFormation(id);

        formation.value =
            formationStore.formation;

    }

    catch (error) {

        console.error(error);

        message.value =
            "Impossible de récupérer les informations de la formation.";

        messageType.value =
            "error";

    }

});


// ======================================================
// ENVOYER
// ======================================================

async function envoyer() {

    message.value = "";

    messageType.value = "";


    // --------------------------------------------------
    // VÉRIFICATION ÂGE
    // --------------------------------------------------

    if (!verifierAge()) {

        return;

    }


    // --------------------------------------------------
    // MOT DE PASSE
    // --------------------------------------------------

    if (
        form.value.password.length < 8
    ) {

        message.value =
            "Le mot de passe doit contenir au moins 8 caractères.";

        messageType.value =
            "error";

        return;

    }


    if (
        form.value.password !==
        form.value.password_confirmation
    ) {

        message.value =
            "Les deux mots de passe ne correspondent pas.";

        messageType.value =
            "error";

        return;

    }


    // --------------------------------------------------
    // FORMATION
    // --------------------------------------------------

    if (!form.value.formation_id) {

        message.value =
            "Veuillez sélectionner une formation.";

        messageType.value =
            "error";

        return;

    }


    // --------------------------------------------------
    // ENVOI
    // --------------------------------------------------

    try {

        loading.value = true;

        await inscriptionPublique(
            form.value
        );


        message.value =
            "Votre demande d'inscription a été envoyée avec succès.";

        messageType.value =
            "success";


        form.value.password = "";

        form.value.password_confirmation = "";


        setTimeout(() => {

            router.push("/formations");

        }, 2000);

    }

    catch (error) {

        console.error(error);


        if (
            error.response?.data?.errors
        ) {

            const errors =
                error.response.data.errors;

            const firstError =
                Object.values(errors)[0];


            message.value =
                Array.isArray(firstError)
                    ? firstError[0]
                    : firstError;

        }

        else {

            message.value =
                error.response?.data?.message ||
                "Une erreur est survenue lors de l'inscription.";

        }


        messageType.value =
            "error";

    }

    finally {

        loading.value = false;

    }

}

</script>


<template>

<div class="inscription-page">


    <!-- ==================================================
         CONTENU DU FORMULAIRE
    =================================================== -->

    <main class="inscription-content">


        <div class="inscription-card">


            <!-- HEADER -->

            <div class="page-header">

                <h1>
                    Inscription à une formation
                </h1>

                <p>
                    Remplissez le formulaire pour envoyer votre demande.
                </p>

            </div>


            <!-- FORMATION -->

            <div
                v-if="formation"
                class="formation-info"
            >

                <div>

                    <span class="formation-label">
                        Formation choisie
                    </span>

                    <h3>
                        {{ formation.nom }}
                    </h3>

                </div>

            </div>


            <!-- MESSAGE -->

            <div
                v-if="message"
                :class="[
                    'message',
                    messageType
                ]"
            >

                {{ message }}

            </div>


            <!-- FORMULAIRE -->

            <form
                @submit.prevent="envoyer"
                class="inscription-form"
            >


                <!-- INFORMATIONS -->

                <div class="section-title">

                    <h2>
                        Informations personnelles
                    </h2>

                </div>


                <div class="grid">


                    <!-- NOM -->

                    <div class="form-group">

                        <label>
                            Nom
                        </label>

                        <input
                            v-model="form.nom"
                            type="text"
                            placeholder="Votre nom"
                            required
                        >

                    </div>


                    <!-- PRÉNOM -->

                    <div class="form-group">

                        <label>
                            Prénom
                        </label>

                        <input
                            v-model="form.prenom"
                            type="text"
                            placeholder="Votre prénom"
                            required
                        >

                    </div>


                    <!-- EMAIL -->

                    <div class="form-group">

                        <label>
                            Adresse email
                        </label>

                        <input
                            v-model="form.email"
                            type="email"
                            placeholder="exemple@email.com"
                            required
                        >

                    </div>


                    <!-- TÉLÉPHONE -->

                    <div class="form-group">

                        <label>
                            Téléphone
                        </label>

                        <input
                            v-model="form.telephone"
                            type="tel"
                            placeholder="77 000 00 00"
                            required
                        >

                    </div>


                    <!-- DATE -->

                    <div class="form-group">

                        <label>
                            Date de naissance
                        </label>

                        <input
                            v-model="form.date_naissance"
                            type="date"
                            :max="dateNaissanceMax"
                            @change="verifierAge"
                            required
                        >

                        <small
                            v-if="age !== null"
                            class="age-info"
                            :class="{
                                'age-error': age < 11
                            }"
                        >

                            Âge :
                            {{ age }}
                            an<span v-if="age > 1">s</span>

                        </small>

                    </div>


                    <!-- SEXE -->

                    <div class="form-group">

                        <label>
                            Sexe
                        </label>

                        <select
                            v-model="form.sexe"
                            required
                        >

                            <option value="">
                                Sélectionner
                            </option>

                            <option value="Masculin">
                                Masculin
                            </option>

                            <option value="Feminin">
                                Féminin
                            </option>

                        </select>

                    </div>


                    <!-- SITUATION -->

                    <div class="form-group">

                        <label>
                            Situation matrimoniale
                        </label>

                        <select
                            v-model="
                                form.situation_matrimoniale
                            "
                            required
                        >

                            <option value="">
                                Sélectionner
                            </option>

                            <option value="Celibataire">
                                Célibataire
                            </option>

                            <option value="Marie">
                                Marié(e)
                            </option>

                            <option value="Divorce">
                                Divorcé(e)
                            </option>

                            <option value="Veuf">
                                Veuf(ve)
                            </option>

                        </select>

                    </div>


                    <!-- NIVEAU ÉTUDE -->

                    <div class="form-group">

                        <label>
                            Niveau d'étude
                        </label>

                        <input
                            v-model="form.niveau_etude"
                            type="text"
                            placeholder="Ex : BFEM, Bac, Licence..."
                            required
                        >

                    </div>


                    <!-- INFORMATIQUE -->

                    <div class="form-group">

                        <label>
                            Niveau informatique
                        </label>

                        <select
                            v-model="form.niveau_informatique"
                            required
                        >

                            <option value="">
                                Sélectionner
                            </option>

                            <option value="Debutant">
                                Débutant
                            </option>

                            <option value="Intermediaire">
                                Intermédiaire
                            </option>

                            <option value="Avance">
                                Avancé
                            </option>

                        </select>

                    </div>


                    <!-- ADRESSE -->

                    <div class="form-group full">

                        <label>
                            Adresse
                        </label>

                        <input
                            v-model="form.adresse"
                            type="text"
                            placeholder="Votre adresse"
                            required
                        >

                    </div>

                </div>




             


            <!-- ==================================================
     HORAIRE
================================================== -->

<div class="section-title">

    <h2>
        Choix de l'horaire
    </h2>

    <p>
        Sélectionnez le créneau qui vous convient.
    </p>

</div>


<div class="horaires-container">

    <!-- ==================================================
         MATIN : 10H À 11H
    ================================================== -->

    <label class="horaire-card">

        <input
            type="radio"
            v-model="form.horaire"
            value="Matin - 10h à 11h"
            required
        >

        <div class="horaire-content">

            <h3>
                Matin
            </h3>

            <strong>
                10h à 11h
            </strong>

            <p>
                Lundi et Mardi :
                <b>Cours</b>
            </p>

            <p>
                Mercredi :
                <b>Révision / Retapage</b>
            </p>

            <p>
                Jeudi et Vendredi :
                <b>Cours</b>
            </p>

        </div>

    </label>


    <!-- ==================================================
         APRÈS 10H : 11H À 13H
    ================================================== -->

    <label class="horaire-card">

        <input
            type="radio"
            v-model="form.horaire"
            value="Après 10h - 11h à 13h"
        >

        <div class="horaire-content">

            <h3>
                Après 10h
            </h3>

            <strong>
                11h à 13h
            </strong>

            <p>
                Lundi et Mardi :
                <b>Cours</b>
            </p>

            <p>
                Mercredi :
                <b>Révision / Retapage</b>
            </p>

            <p>
                Jeudi et Vendredi :
                <b>Cours</b>
            </p>

        </div>

    </label>


    <!-- ==================================================
         SOIR : 15H À 17H
    ================================================== -->

    <label class="horaire-card">

        <input
            type="radio"
            v-model="form.horaire"
            value="Soir - 15h à 17h"
        >

        <div class="horaire-content">

            <h3>
                Soir
            </h3>

            <strong>
                15h à 17h
            </strong>

            <p>
                Lundi, Mardi, Mercredi et Jeudi :
                <b>Cours</b>
            </p>

            <p>
                Vendredi :
                <b>Pas de cours</b>
            </p>

        </div>

    </label>

</div>


            



                <!-- COMPTE -->

                <div class="section-title">

                    <h2>
                        Sécuriser votre compte
                    </h2>

                    <p>
                        Choisissez un mot de passe personnel.
                    </p>

                </div>


                <div class="grid">


                    <!-- PASSWORD -->

                    <div class="form-group">

                        <label>
                            Mot de passe
                        </label>

                        <div class="password-field">

                            <input
                                v-model="form.password"
                                :type="
                                    showPassword
                                        ? 'text'
                                        : 'password'
                                "
                                placeholder="Minimum 8 caractères"
                                minlength="8"
                                required
                            >

                            <button
                                type="button"
                                class="password-toggle"
                                @click="
                                    showPassword =
                                        !showPassword
                                "
                            >

                                {{
                                    showPassword
                                        ? "Masquer"
                                        : "Afficher"
                                }}

                            </button>

                        </div>

                    </div>


                    <!-- CONFIRMATION -->

                    <div class="form-group">

                        <label>
                            Confirmer le mot de passe
                        </label>

                        <div class="password-field">

                            <input
                                v-model="
                                    form.password_confirmation
                                "
                                :type="
                                    showPasswordConfirmation
                                        ? 'text'
                                        : 'password'
                                "
                                placeholder="Confirmer votre mot de passe"
                                minlength="8"
                                required
                            >

                            <button
                                type="button"
                                class="password-toggle"
                                @click="
                                    showPasswordConfirmation =
                                        !showPasswordConfirmation
                                "
                            >

                                {{
                                    showPasswordConfirmation
                                        ? "Masquer"
                                        : "Afficher"
                                }}

                            </button>

                        </div>

                    </div>

                </div>


                <!-- BOUTON -->

                <button
                    type="submit"
                    class="submit-button"
                    :disabled="loading"
                >

                    {{
                        loading
                            ? "Envoi en cours..."
                            : "Envoyer ma demande"
                    }}

                </button>


            </form>

        </div>

    </main>

</div>

</template>


<style scoped>

/* ==========================================================
   PAGE
========================================================== */

.inscription-page {

    min-height: 100vh;

    background: #f5f8fc;

}


/* ==========================================================
   CONTENU
========================================================== */

.inscription-content {

    min-height: 100vh;

    display: flex;

    justify-content: center;

    align-items: center;

    padding: 50px 20px;

    box-sizing: border-box;

}


.inscription-card {

    width: 100%;

    max-width: 950px;

    background: #ffffff;

    padding: 45px;

    border-radius: 20px;

    box-shadow:
        0 10px 35px
        rgba(0, 0, 0, 0.08);

    box-sizing: border-box;

}


/* ==========================================================
   HEADER FORMULAIRE
========================================================== */

.page-header {

    text-align: center;

    margin-bottom: 30px;

}


.page-header h1 {

    margin: 0 0 10px;

    color: #3B5998;

    font-size: 30px;

}


.page-header p {

    margin: 0;

    color: #777;

    font-size: 15px;

}


/* ==========================================================
   FORMATION
========================================================== */

.formation-info {

    background: #eaf3ff;

    border-left: 5px solid #3B5998;

    padding: 18px 20px;

    border-radius: 10px;

    margin-bottom: 25px;

}


.formation-label {

    display: block;

    font-size: 13px;

    color: #777;

    margin-bottom: 5px;

}


.formation-info h3 {

    margin: 0;

    color: #3B5998;

    font-size: 19px;

}


/* ==========================================================
   MESSAGE
========================================================== */

.message {

    padding: 15px;

    border-radius: 10px;

    margin-bottom: 25px;

    font-size: 14px;

}


.message.success {

    background: #dff5e1;

    color: #1b6e23;

}


.message.error {

    background: #ffe3e3;

    color: #b42318;

}


/* ==========================================================
   SECTION
========================================================== */

.section-title {

    margin-top: 30px;

    margin-bottom: 20px;

    border-bottom: 1px solid #eee;

    padding-bottom: 10px;

}


.section-title h2 {

    margin: 0;

    color: #3B5998;

    font-size: 20px;

}


.section-title p {

    margin: 5px 0 0;

    color: #777;

    font-size: 14px;

}


/* ==========================================================
   GRID
========================================================== */

.grid {

    display: grid;

    grid-template-columns:
        repeat(2, 1fr);

    gap: 20px;

}


/* ==========================================================
   FORM GROUP
========================================================== */

.form-group {

    display: flex;

    flex-direction: column;

    gap: 8px;

}


.form-group.full {

    grid-column: 1 / -1;

}


.form-group label {

    font-size: 14px;

    font-weight: 600;

    color: #333;

}


/* ==========================================================
   INPUT
========================================================== */

input,
select {

    width: 100%;

    box-sizing: border-box;

    padding: 14px;

    border-radius: 10px;

    border: 1px solid #ddd;

    background: #fff;

    font-size: 15px;

    outline: none;

    transition: 0.2s;

}


input:focus,
select:focus {

    border-color: #3B5998;

    box-shadow:
        0 0 0 3px
        rgba(59, 89, 152, 0.08);

}


/* ==========================================================
   ÂGE
========================================================== */

.age-info {

    color: #2E7D32;

    font-size: 13px;

}


.age-info.age-error {

    color: #b42318;

}




/* ==========================================================
   HORAIRES
========================================================== */

.horaires-container {

    display: grid;

    grid-template-columns: repeat(3, 1fr);

    gap: 18px;

}


.horaire-card {

    display: flex;

    align-items: flex-start;

    gap: 12px;

    padding: 20px;

    border: 1px solid #ddd;

    border-radius: 14px;

    background: #ffffff;

    cursor: pointer;

    transition: 0.2s;

}


.horaire-card:hover {

    border-color: #3B5998;

}


.horaire-card input[type="radio"] {

    width: 18px;

    height: 18px;

    margin-top: 3px;

    accent-color: #3B5998;

}


.horaire-content {

    flex: 1;

}


.horaire-content h3 {

    margin: 0 0 8px;

    color: #3B5998;

    font-size: 18px;

}


.horaire-content strong {

    display: inline-block;

    margin-bottom: 10px;

    color: #3B5998;

    font-size: 14px;

}


.horaire-content p {

    margin: 6px 0;

    color: #666;

    font-size: 13px;

    line-height: 1.5;

}


.horaire-content b {

    color: #333;

}




/* ==========================================================
   PASSWORD
========================================================== */

.password-field {

    position: relative;

    display: flex;

}


.password-field input {

    padding-right: 90px;

}


.password-toggle {

    position: absolute;

    right: 8px;

    top: 50%;

    transform: translateY(-50%);

    width: auto;

    margin: 0;

    padding: 7px 10px;

    background: transparent;

    color: #3B5998;

    border: none;

    font-size: 12px;

    cursor: pointer;

}


.password-toggle:hover {

    background: transparent;

    color: #2E7D32;

}


/* ==========================================================
   BOUTON
========================================================== */

.submit-button {

    width: 100%;

    margin-top: 35px;

    padding: 16px;

    background: #3B5998;

    color: white;

    border: none;

    border-radius: 12px;

    font-size: 17px;

    font-weight: 600;

    cursor: pointer;

    transition: 0.2s;

}


.submit-button:hover {

    background: #2E7D32;

}


.submit-button:disabled {

    opacity: 0.6;

    cursor: not-allowed;

}


/* ==========================================================
   RESPONSIVE
========================================================== */

@media (max-width: 700px) {

    .inscription-content {

        padding: 25px 15px;

        align-items: flex-start;

    }


    .inscription-card {

        padding: 25px;

        border-radius: 15px;

    }


    .grid {

        grid-template-columns: 1fr;

    }


    .form-group.full {

        grid-column: auto;

    }


    .page-header h1 {

        font-size: 24px;

    }

}

</style>