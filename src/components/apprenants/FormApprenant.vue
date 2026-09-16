<template>

    <div class="form-card">

        <form @submit.prevent="submitForm">

            <!-- ================================================= -->
            <!-- IDENTITÉ -->
            <!-- ================================================= -->

            <div
                v-if="mode === 'admin'"
                class="section"
            >

                <h3>
                    <i class="fas fa-user"></i>
                    Informations personnelles
                </h3>

                <div class="row">

                    <!-- NOM -->

                    <div class="col-md-6 mb-3">

                        <label>
                            Nom
                        </label>

                        <input
                            v-model="form.nom"
                            type="text"
                            class="form-control"
                            placeholder="Nom"
                            required
                        >

                    </div>


                    <!-- PRÉNOM -->

                    <div class="col-md-6 mb-3">

                        <label>
                            Prénom
                        </label>

                        <input
                            v-model="form.prenom"
                            type="text"
                            class="form-control"
                            placeholder="Prénom"
                            required
                        >

                    </div>

                </div>


                <!-- EMAIL -->

                <div class="mb-3">

                    <label>
                        Email
                    </label>

                    <input
                        v-model="form.email"
                        type="email"
                        class="form-control"
                        placeholder="exemple@email.com"
                        required
                    >

                </div>

            </div>


            <!-- ================================================= -->
            <!-- DATE DE NAISSANCE -->
            <!-- ================================================= -->

            <div class="section">

                <h3>
                    <i class="fas fa-id-card"></i>
                    Informations personnelles
                </h3>


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
                            :class="{
                                'age-error': age < 11
                            }"
                        >
                            Âge : {{ age }} ans
                        </small>

                    </div>

                </div>


                <!-- SEXE / SITUATION -->

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

            </div>


            <!-- ================================================= -->
            <!-- NIVEAU -->
            <!-- ================================================= -->

            <div class="section">

                <h3>
                    <i class="fas fa-graduation-cap"></i>
                    Niveau et compétences
                </h3>


                <div class="row">

                    <!-- NIVEAU INFORMATIQUE -->

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


                    <!-- NIVEAU ÉTUDE -->

                    <div class="col-md-6 mb-3">

                        <label>
                            Niveau d'étude
                        </label>

                        <input
                            type="text"
                            v-model="form.niveau_etude"
                            class="form-control"
                            placeholder="Ex : BFEM, BAC, Licence..."
                            required
                        >

                    </div>

                </div>

            </div>


            <!-- ================================================= -->
            <!-- CONTACT -->
            <!-- ================================================= -->

            <div class="section">

                <h3>
                    <i class="fas fa-phone"></i>
                    Coordonnées
                </h3>


                <div class="row">

                    <!-- TELEPHONE -->

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


                    <!-- ADRESSE -->

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

            </div>


            <!-- ================================================= -->
            <!-- FONCTION / PHOTO -->
            <!-- ================================================= -->

            <div class="section">

                <h3>
                    <i class="fas fa-briefcase"></i>
                    Informations complémentaires
                </h3>


                <div class="row">

                    <!-- FONCTION -->

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


                    <!-- PHOTO -->

                    <div class="col-md-6 mb-3">

                        <label>
                            Photo
                        </label>

                        <input
                            type="file"
                            class="form-control"
                            accept="image/jpeg,image/png,image/jpg,image/webp"
                            @change="handlePhoto"
                        >


                        <!-- PHOTO EXISTANTE -->

                        <div
                            v-if="
                                !previewPhoto &&
                                photoExistante
                            "
                            class="photo-container"
                        >

                            <span>
                                Photo actuelle
                            </span>

                            <img
                                :src="photoExistante"
                                class="photo-preview"
                                alt="Photo actuelle"
                            >

                        </div>


                        <!-- NOUVELLE PHOTO -->

                        <div
                            v-if="previewPhoto"
                            class="photo-container"
                        >

                            <span>
                                Nouvelle photo
                            </span>

                            <img
                                :src="previewPhoto"
                                class="photo-preview"
                                alt="Aperçu photo"
                            >

                        </div>

                    </div>

                </div>

            </div>


            <!-- ================================================= -->
            <!-- ADMIN -->
            <!-- ================================================= -->

            <div
                v-if="mode === 'admin'"
                class="admin-box"
            >

                <h3>
                    <i class="fas fa-cog"></i>
                    Gestion de l'apprenant
                </h3>


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

            </div>


            <!-- ================================================= -->
            <!-- INFORMATION -->
            <!-- ================================================= -->

            <div class="info-message">

                <i class="fas fa-info-circle"></i>

                <span>
                    La formation et l'horaire sont gérés
                    séparément dans les inscriptions.
                </span>

            </div>


            <!-- ================================================= -->
            <!-- BOUTON -->
            <!-- ================================================= -->

            <button
                type="submit"
                class="submit-btn"
                :disabled="loadingSubmit"
            >

                <i
                    v-if="loadingSubmit"
                    class="fas fa-spinner fa-spin"
                ></i>

                <i
                    v-else
                    class="fas fa-save"
                ></i>

                {{
                    loadingSubmit
                        ? "Modification..."
                        : bouton
                }}

            </button>

        </form>

    </div>

</template>


<script setup>

import {
    reactive,
    ref,
    computed,
    watch,
    onMounted,
    onBeforeUnmount
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

    nom: "",

    prenom: "",

    email: "",

    date_naissance: "",

    sexe: "",

    situation_matrimoniale: "",

    niveau_informatique: "",

    niveau_etude: "",

    telephone: "",

    adresse: "",

    fonction: "",

    photo: null,

    statut: "En attente"

});


/* =====================================================
   CHARGEMENT
===================================================== */

const loadingSubmit = ref(false);


/* =====================================================
   PHOTO
===================================================== */

const previewPhoto = ref(null);


/* =====================================================
   PHOTO EXISTANTE
===================================================== */

const photoExistante = computed(() => {

    if (!props.apprenant?.photo) {

        return null;

    }


    const photo =
        String(props.apprenant.photo);


    if (photo.startsWith("http")) {

        return photo;

    }


    return `http://127.0.0.1:8000/storage/${photo}`;

});


/* =====================================================
   REMPLIR FORMULAIRE
===================================================== */

function remplirFormulaire(apprenant) {

    if (!apprenant) {

        return;

    }


    /*
     * Informations du USER
     */

    form.nom =
        apprenant.user?.nom || "";

    form.prenom =
        apprenant.user?.prenom || "";

    form.email =
        apprenant.user?.email ||
        apprenant.email ||
        "";


    /*
     * Informations APPRENANT
     */

    form.date_naissance =
        apprenant.date_naissance
            ? String(
                apprenant.date_naissance
            ).split("T")[0]
            : "";


    form.sexe =
        apprenant.sexe || "";


    form.situation_matrimoniale =
        apprenant.situation_matrimoniale || "";


    form.niveau_informatique =
        apprenant.niveau_informatique || "";


    form.niveau_etude =
        apprenant.niveau_etude || "";


    form.telephone =
        apprenant.telephone || "";


    form.adresse =
        apprenant.adresse || "";


    form.fonction =
        apprenant.fonction || "";


    form.statut =
        apprenant.statut || "En attente";


    /*
     * IMPORTANT
     *
     * On ne met pas :
     *
     * - user
     * - inscriptions
     * - matricule
     * - created_by
     * - user_id
     *
     * dans le formulaire.
     */


    form.photo = null;


    if (previewPhoto.value) {

        URL.revokeObjectURL(
            previewPhoto.value
        );

    }

    previewPhoto.value = null;

}


/* =====================================================
   WATCH
===================================================== */

watch(

    () => props.apprenant,

    (nouveau) => {

        remplirFormulaire(nouveau);

    },

    {
        deep: true,
        immediate: true
    }

);


/* =====================================================
   DATE MAX
===================================================== */

const dateMax = computed(() => {

    const date = new Date();

    date.setFullYear(
        date.getFullYear() - 11
    );


    const annee =
        date.getFullYear();

    const mois =
        String(
            date.getMonth() + 1
        ).padStart(2, "0");

    const jour =
        String(
            date.getDate()
        ).padStart(2, "0");


    return `${annee}-${mois}-${jour}`;

});


/* =====================================================
   ÂGE
===================================================== */

const age = computed(() => {

    if (!form.date_naissance) {

        return null;

    }


    const naissance =
        new Date(
            `${form.date_naissance}T00:00:00`
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
   PHOTO
===================================================== */

function handlePhoto(event) {

    const file =
        event.target.files?.[0];


    if (!file) {

        return;

    }


    const formatsAcceptes = [

        "image/jpeg",

        "image/png",

        "image/jpg",

        "image/webp"

    ];


    if (
        !formatsAcceptes.includes(
            file.type
        )
    ) {

        alert(
            "Format photo non accepté. Utilisez JPG, JPEG, PNG ou WEBP."
        );

        event.target.value = "";

        return;

    }


    if (
        file.size >
        2 * 1024 * 1024
    ) {

        alert(
            "La photo ne doit pas dépasser 2 Mo."
        );

        event.target.value = "";

        return;

    }


    if (previewPhoto.value) {

        URL.revokeObjectURL(
            previewPhoto.value
        );

    }


    form.photo = file;

    previewPhoto.value =
        URL.createObjectURL(file);

}


/* =====================================================
   SOUMISSION
===================================================== */

function submitForm() {

    if (
        age.value !== null &&
        age.value < 11
    ) {

        alert(
            "L'apprenant doit avoir au moins 11 ans."
        );

        return;

    }


    if (!form.date_naissance) {

        alert(
            "Veuillez renseigner la date de naissance."
        );

        return;

    }


    /*
     * OBJET PROPRE
     */

    const data = {

        nom:
            form.nom.trim(),

        prenom:
            form.prenom.trim(),

        email:
            form.email.trim(),

        date_naissance:
            form.date_naissance,

        sexe:
            form.sexe,

        situation_matrimoniale:
            form.situation_matrimoniale,

        niveau_informatique:
            form.niveau_informatique,

        niveau_etude:
            form.niveau_etude.trim(),

        telephone:
            form.telephone.trim(),

        adresse:
            form.adresse.trim(),

        fonction:
            form.fonction.trim(),

        statut:
            form.statut,

        photo:
            form.photo

    };


    console.log(
        "Données envoyées pour modification :",
        data
    );


    emit(
        "submit",
        data
    );

}


/* =====================================================
   MONTAGE
===================================================== */

onMounted(() => {

});


/* =====================================================
   NETTOYAGE
===================================================== */

onBeforeUnmount(() => {

    if (previewPhoto.value) {

        URL.revokeObjectURL(
            previewPhoto.value
        );

    }

});

</script>


<style scoped>

/* =========================================================
   FORMULAIRE
========================================================= */

.form-card {

    background: #ffffff;

    padding: 30px;

    border-radius: 20px;

    box-shadow:
        0 10px 25px
        rgba(0, 0, 0, .08);

}


/* =========================================================
   SECTION
========================================================= */

.section {

    margin-bottom: 30px;

    padding-bottom: 5px;

}


.section h3 {

    display: flex;

    align-items: center;

    gap: 10px;

    margin: 0 0 22px;

    color: #3B5998;

    font-size: 18px;

    font-weight: 800;

}


.section h3 i {

    font-size: 17px;

}


/* =========================================================
   ROW
========================================================= */

.row {

    display: flex;

    gap: 20px;

    flex-wrap: wrap;

}


/* =========================================================
   COLONNE
========================================================= */

.col-md-6 {

    flex: 1;

    min-width: 280px;

}


/* =========================================================
   MARGIN
========================================================= */

.mb-3 {

    margin-bottom: 20px;

}


/* =========================================================
   LABEL
========================================================= */

label {

    display: block;

    font-weight: 600;

    color: #1F2937;

    margin-bottom: 8px;

}


/* =========================================================
   INPUT
========================================================= */

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


/* =========================================================
   ÂGE
========================================================= */

.age-info {

    display: block;

    margin-top: 8px;

    color: #2E7D32;

    font-weight: 700;

}


.age-info.age-error {

    color: #b42318;

}


/* =========================================================
   ADMIN
========================================================= */

.admin-box {

    margin-top: 20px;

    margin-bottom: 25px;

    padding: 22px;

    background: #F8FAFC;

    border-radius: 15px;

    border-left:
        5px solid #3B5998;

}


.admin-box h3 {

    display: flex;

    align-items: center;

    gap: 10px;

    margin: 0 0 20px;

    color: #3B5998;

    font-size: 17px;

}


/* =========================================================
   MESSAGE
========================================================= */

.info-message {

    display: flex;

    align-items: center;

    gap: 10px;

    margin-top: 10px;

    margin-bottom: 20px;

    padding: 13px 16px;

    background: #eff6ff;

    border: 1px solid #bfdbfe;

    border-radius: 10px;

    color: #1e40af;

    font-size: 13px;

}


.info-message i {

    font-size: 16px;

}


/* =========================================================
   PHOTO
========================================================= */

.photo-container {

    display: flex;

    flex-direction: column;

    gap: 8px;

    margin-top: 12px;

}


.photo-container span {

    color: #64748b;

    font-size: 12px;

    font-weight: 600;

}


.photo-preview {

    width: 100px;

    height: 100px;

    object-fit: cover;

    border-radius: 50%;

    border:
        3px solid #3B5998;

}


/* =========================================================
   BOUTON
========================================================= */

.submit-btn {

    margin-top: 10px;

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


.submit-btn:disabled {

    opacity: .6;

    cursor: not-allowed;

}


/* =========================================================
   RESPONSIVE
========================================================= */

@media (max-width: 768px) {

    .form-card {

        padding: 20px;

    }


    .row {

        flex-direction: column;

    }


    .col-md-6 {

        width: 100%;

        min-width: 100%;

    }

}

</style>