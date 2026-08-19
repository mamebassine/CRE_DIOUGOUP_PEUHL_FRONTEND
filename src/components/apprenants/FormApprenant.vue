<template>

    <div class="form-card">

        <form @submit.prevent="submitForm">

            <!-- ================= DATE ================= -->

            <div class="row">

                <div class="col-md-6 mb-3">

                    <label>
                        Date de naissance
                    </label>

                    <input
                        type="date"
                        v-model="form.date_naissance"
                        class="form-control"
                        :max="dateMax"
                        required
                    >

                    <small
                        v-if="age !== null"
                        class="age-info"
                        :class="{ 'age-error': age < 11 }"
                    >
                        Âge : {{ age }} ans
                    </small>

                </div>

            </div>


            <!-- ================= SEXE / SITUATION ================= -->

            <div class="row">

                <div class="col-md-6 mb-3">

                    <label>
                        Sexe
                    </label>

                    <select
                        v-model="form.sexe"
                        class="form-select"
                        required
                    >

                        <option value="">
                            Choisir
                        </option>

                        <option value="Masculin">
                            Masculin
                        </option>

                        <option value="Feminin">
                            Féminin
                        </option>

                    </select>

                </div>


                <div class="col-md-6 mb-3">

                    <label>
                        Situation matrimoniale
                    </label>

                    <select
                        v-model="form.situation_matrimoniale"
                        class="form-select"
                        required
                    >

                        <option value="">
                            Choisir
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

            </div>


            <!-- ================= NIVEAU ================= -->

            <div class="row">

                <div class="col-md-6 mb-3">

                    <label>
                        Niveau informatique
                    </label>

                    <select
                        v-model="form.niveau_informatique"
                        class="form-select"
                        required
                    >

                        <option value="">
                            Choisir
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


                <div class="col-md-6 mb-3">

                    <label>
                        Niveau d'étude
                    </label>

                    <input
                        type="text"
                        v-model="form.niveau_etude"
                        class="form-control"
                        placeholder="Ex : Licence"
                        required
                    >

                </div>

            </div>


            <!-- ================= TELEPHONE / ADRESSE ================= -->

            <div class="row">

                <div class="col-md-6 mb-3">

                    <label>
                        Téléphone
                    </label>

                    <input
                        type="text"
                        v-model="form.telephone"
                        class="form-control"
                        placeholder="Ex : 77 000 00 00"
                        required
                    >

                </div>


                <div class="col-md-6 mb-3">

                    <label>
                        Adresse
                    </label>

                    <input
                        type="text"
                        v-model="form.adresse"
                        class="form-control"
                        placeholder="Votre adresse"
                        required
                    >

                </div>

            </div>


            <!-- ================= FONCTION / PHOTO ================= -->

            <div class="row">

                <div class="col-md-6 mb-3">

                    <label>
                        Fonction
                    </label>

                    <input
                        type="text"
                        v-model="form.fonction"
                        class="form-control"
                        placeholder="Ex : Étudiant, Enseignant..."
                    >

                </div>


                <div class="col-md-6 mb-3">

                    <label>
                        Photo
                    </label>

                    <input
                        type="file"
                        class="form-control"
                        accept="image/*"
                        @change="handlePhoto"
                    >

                    <!-- APERÇU PHOTO -->

                    <img
                        v-if="previewPhoto"
                        :src="previewPhoto"
                        class="photo-preview"
                        alt="Aperçu photo"
                    >

                </div>

            </div>


            <!-- ================= MODULE / HORAIRE ================= -->

            <div class="row">

                <div class="col-md-6 mb-3">

                    <label>
                        Module choisi
                    </label>

                    <select
                        v-model="form.module_choisi"
                        class="form-select"
                    >

                        <option value="">
                            Choisir un module
                        </option>

                        <option value="Bureautique">
                            Bureautique
                        </option>

                        <option value="Développement Web">
                            Développement Web
                        </option>

                        <option value="Infographie">
                            Infographie
                        </option>

                        <option value="Réseaux">
                            Réseaux
                        </option>

                    </select>

                </div>


                <div class="col-md-6 mb-3">

                    <label>
                        Horaire choisi
                    </label>

                    <select
                        v-model="form.horaire_choisi"
                        class="form-select"
                    >

                        <option value="">
                            Choisir un horaire
                        </option>

                        <option value="Matin - 10h à 11h">
                            Matin — 10h à 11h
                        </option>

                        <option value="Après 10h - 11h à 13h">
                            Après 10h — 11h à 13h
                        </option>

                        <option value="Soir - 15h à 17h">
                            Soir — 15h à 17h
                        </option>

                    </select>

                    <small class="horaire-info">
                        Révision / retapage : mercredi matin seulement.
                    </small>

                </div>

            </div>


            <!-- ================= ADMIN ================= -->

            <div
                v-if="mode === 'admin'"
                class="admin-box"
            >

                <!-- ================= STATUT ================= -->

                <div class="row">

                    <div class="col-md-6 mb-3">

                        <label>
                            Statut de l'apprenant
                        </label>

                        <select
                            v-model="form.statut"
                            class="form-select"
                        >

                            <option value="En attente">
                                En attente
                            </option>

                            <option value="Valide">
                                Valide
                            </option>

                            <option value="Refuse">
                                Refusé
                            </option>

                        </select>

                    </div>

                </div>


                <!-- ================= INFORMATIONS UTILISATEUR ================= -->

                <h5>
                    Informations utilisateur
                </h5>


                <div class="row">

                    <div class="col-md-6 mb-3">

                        <label>
                            Nom
                        </label>

                        <input
                            v-model="form.nom"
                            type="text"
                            class="form-control"
                            required
                        >

                    </div>


                    <div class="col-md-6 mb-3">

                        <label>
                            Prénom
                        </label>

                        <input
                            v-model="form.prenom"
                            type="text"
                            class="form-control"
                            required
                        >

                    </div>

                </div>


                <div class="mb-3">

                    <label>
                        Email
                    </label>

                    <input
                        type="email"
                        v-model="form.email"
                        class="form-control"
                        required
                    >

                </div>

            </div>


            <!-- ================= BOUTON ================= -->

            <button
                type="submit"
                class="submit-btn"
            >

                <i class="fas fa-save"></i>

                {{ bouton }}

            </button>

        </form>

    </div>

</template>


<script setup>

import {
    reactive,
    ref,
    computed,
    watch
} from "vue";


/* =====================================================
   PROPS
===================================================== */

const props = defineProps({

    apprenant: {
        type: Object,
        default: () => ({})
    },

    mode: {
        type: String,
        default: "admin"
    },

    bouton: {
        type: String,
        default: "Ajouter l'apprenant"
    }

});


/* =====================================================
   EMIT
===================================================== */

const emit = defineEmits([
    "submit"
]);


/* =====================================================
   FORMULAIRE
===================================================== */

const form = reactive({

    ...props.apprenant,

    nom: props.apprenant.user?.nom || "",

    prenom: props.apprenant.user?.prenom || "",

    email: props.apprenant.user?.email || "",

    statut:
        props.apprenant.statut ||
        "En attente",

    photo: null

});


/* =====================================================
   SYNCHRONISATION AVEC LE PROPS
===================================================== */

watch(
    () => props.apprenant,

    (nouveau) => {

        if (!nouveau) {
            return;
        }

        Object.assign(
            form,
            {

                ...nouveau,

                nom:
                    nouveau.user?.nom ||
                    "",

                prenom:
                    nouveau.user?.prenom ||
                    "",

                email:
                    nouveau.user?.email ||
                    "",

                statut:
                    nouveau.statut ||
                    "En attente",

                photo:
                    null

            }
        );

    },

    {
        deep: true,
        immediate: true
    }
);


/* =====================================================
   DATE MAXIMALE
   AU MOINS 11 ANS
===================================================== */

const dateMax = computed(() => {

    const date = new Date();

    date.setFullYear(
        date.getFullYear() - 11
    );

    return date
        .toISOString()
        .split("T")[0];

});


/* =====================================================
   CALCUL DE L'ÂGE
===================================================== */

const age = computed(() => {

    if (!form.date_naissance) {
        return null;
    }

    const naissance =
        new Date(
            form.date_naissance
        );

    const aujourd =
        new Date();

    let resultat =
        aujourd.getFullYear()
        -
        naissance.getFullYear();

    const mois =
        aujourd.getMonth()
        -
        naissance.getMonth();

    if (
        mois < 0 ||
        (
            mois === 0 &&
            aujourd.getDate()
            <
            naissance.getDate()
        )
    ) {

        resultat--;

    }

    return resultat;

});


/* =====================================================
   APERÇU PHOTO
===================================================== */

const previewPhoto =
    ref(null);


const handlePhoto = (event) => {

    const file =
        event.target.files[0];

    if (!file) {
        return;
    }

    form.photo = file;

    previewPhoto.value =
        URL.createObjectURL(file);

};


/* =====================================================
   ENVOI DU FORMULAIRE
===================================================== */

const submitForm = () => {

    /* Vérification de l'âge */

    if (
        age.value !== null &&
        age.value < 11
    ) {

        alert(
            "L'apprenant doit avoir au moins 11 ans."
        );

        return;

    }


    /* Envoi au parent */

    emit(
        "submit",
        form
    );

};

</script>


<style scoped>

/* ==========================================================
   FORMULAIRE
========================================================== */

.form-card {

    background: white;

    padding: 30px;

    border-radius: 20px;

    box-shadow:
        0 10px 25px
        rgba(0, 0, 0, .08);

}


/* ==========================================================
   ROW
========================================================== */

.row {

    display: flex;

    gap: 20px;

    flex-wrap: wrap;

}


/* ==========================================================
   COLONNE
========================================================== */

.col-md-6 {

    flex: 1;

    min-width: 280px;

}


/* ==========================================================
   MARGIN
========================================================== */

.mb-3 {

    margin-bottom: 20px;

}


/* ==========================================================
   LABEL
========================================================== */

label {

    display: block;

    font-weight: 600;

    color: #1F2937;

    margin-bottom: 8px;

}


/* ==========================================================
   INPUT / SELECT
========================================================== */

.form-control,
.form-select {

    width: 100%;

    border:
        1px solid #D1D5DB;

    border-radius: 10px;

    padding: 11px 12px;

    font-size: 15px;

    outline: none;

    transition: .3s;

    box-sizing: border-box;

}


.form-control:focus,
.form-select:focus {

    border-color: #3B5998;

    box-shadow:
        0 0 0 3px
        rgba(59, 89, 152, .15);

}


/* ==========================================================
   ÂGE
========================================================== */

.age-info {

    display: block;

    margin-top: 8px;

    color: #2E7D32;

    font-weight: 700;

}


.age-info.age-error {

    color: #b42318;

}


/* ==========================================================
   HORAIRE
========================================================== */

.horaire-info {

    display: block;

    margin-top: 8px;

    color: #666;

    font-size: 13px;

}


/* ==========================================================
   PHOTO
========================================================== */

.photo-preview {

    width: 100px;

    height: 100px;

    object-fit: cover;

    border-radius: 50%;

    margin-top: 15px;

    border:
        3px solid #3B5998;

}


/* ==========================================================
   ADMIN
========================================================== */

.admin-box {

    margin-top: 25px;

    padding: 20px;

    background: #F8FAFC;

    border-radius: 15px;

    border-left:
        5px solid #3B5998;

}


.admin-box h5 {

    margin-bottom: 20px;

    color: #3B5998;

    font-weight: 700;

}


/* ==========================================================
   BOUTON
========================================================== */

.submit-btn {

    margin-top: 20px;

    background: #2E7D32;

    color: white;

    border: none;

    padding: 12px 30px;

    border-radius: 12px;

    font-weight: 700;

    cursor: pointer;

    transition: .3s;

}


.submit-btn:hover {

    background: #3B5998;

}


/* ==========================================================
   RESPONSIVE
========================================================== */

@media (max-width: 768px) {

    .row {

        flex-direction: column;

    }

    .col-md-6 {

        width: 100%;

        min-width: 100%;

    }

}

</style>