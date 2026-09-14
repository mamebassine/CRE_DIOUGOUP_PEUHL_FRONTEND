<script setup>

import { ref, onMounted } from "vue";

import { useFormationStore } from "../../stores/formation";
import { useApprenantStore } from "../../stores/apprenant";


const props = defineProps({

    mode: {
        type: String,
        default: "admin"
    },

    inscription: {
        type: Object,
        default: null
    }

});


const emit = defineEmits([
    "submit"
]);


const formationStore = useFormationStore();

const apprenantStore = useApprenantStore();


const form = ref({

    apprenant_id: "",
    formation_id: "",
    horaire: "",
    statut: "En attente",
    etat_formation: "Non commencée"

});


onMounted(async () => {

    // ================================
    // FORMATIONS
    // ================================

    await formationStore.fetchFormations();


    // ================================
    // APPRENANTS
    // ================================

    if (props.mode === "admin") {

        await apprenantStore.fetchApprenants();

    }


    // ================================
    // MODIFICATION
    // ================================

    if (props.inscription) {

        form.value = {

            apprenant_id:
                props.inscription.apprenant_id,

            formation_id:
                props.inscription.formation_id,

            horaire:
                props.inscription.horaire,

            statut:
                props.inscription.statut,

            etat_formation:
                props.inscription.etat_formation

        };

    }

});


function envoyer() {

    emit(
        "submit",
        {
            ...form.value
        }
    );

}

</script>


<template>

<form
    class="form-inscription"
    @submit.prevent="envoyer"
>


    <!-- ==========================================
         TITRE
    =========================================== -->

    <div class="form-header">

        <div class="form-icon">
            📝
        </div>

        <div>

            <h2>
                Informations de l'inscription
            </h2>

            <p>
                Modifiez les informations de l'apprenant et de sa formation.
            </p>

        </div>

    </div>


    <!-- ==========================================
         CONTENU
    =========================================== -->

    <div class="form-grid">


        <!-- ==========================================
             APPRENANT
        =========================================== -->

        <div
            v-if="mode === 'admin'"
            class="form-group"
        >

            <label>
                Apprenant
                <span>*</span>
            </label>

            <select
                v-model="form.apprenant_id"
                required
            >

                <option value="">
                    Choisir un apprenant
                </option>

                <option
                    v-for="apprenant in apprenantStore.apprenants"
                    :key="apprenant.id"
                    :value="apprenant.id"
                >

                    {{ apprenant.user?.prenom }}
                    {{ apprenant.user?.nom }}

                </option>

            </select>

        </div>


        <!-- ==========================================
             FORMATION
        =========================================== -->

        <div class="form-group">

            <label>
                Formation
                <span>*</span>
            </label>

            <select
                v-model="form.formation_id"
                required
            >

                <option value="">
                    Choisir une formation
                </option>

                <option
                    v-for="formation in formationStore.formations"
                    :key="formation.id"
                    :value="formation.id"
                >

                    {{ formation.nom }}

                </option>

            </select>

        </div>


        <!-- ==========================================
             HORAIRE
        =========================================== -->

        <div class="form-group">

            <label>
                Horaire
                <span>*</span>
            </label>

            <select
                v-model="form.horaire"
                required
            >

                <option value="">
                    Choisir un horaire
                </option>

                <option value="Matin - 10h à 11h">
                    Matin - 10h à 11h
                </option>

                <option value="Après 10h - 11h à 13h">
                    Après 10h - 11h à 13h
                </option>

                <option value="Soir - 15h à 17h">
                    Soir - 15h à 17h
                </option>

            </select>

        </div>


        <!-- ==========================================
             STATUT
        =========================================== -->

        <div
            v-if="mode === 'admin' && inscription"
            class="form-group"
        >

            <label>
                Statut
            </label>

            <select
                v-model="form.statut"
            >

                <option value="En attente">
                    En attente
                </option>

                <option value="Valide">
                    Validé
                </option>

                <option value="Refuse">
                    Refusé
                </option>

            </select>

        </div>


        <!-- ==========================================
             ÉTAT FORMATION
        =========================================== -->

        <div
            v-if="mode === 'admin' && inscription"
            class="form-group"
        >

            <label>
                État de la formation
            </label>

            <select
                v-model="form.etat_formation"
            >

                <option value="Non commencée">
                    Non commencée
                </option>

                <option value="En cours">
                    En cours
                </option>

                <option value="Terminée">
                    Terminée
                </option>

                <option value="Abandonnée">
                    Abandonnée
                </option>

            </select>

        </div>


    </div>


    <!-- ==========================================
         BOUTON
    =========================================== -->

    <div class="form-actions">

        <button
            type="submit"
            class="btn-submit"
        >

            <span>
                ✓
            </span>

            {{ inscription
                ? "Modifier l'inscription"
                : "Enregistrer l'inscription"
            }}

        </button>

    </div>


</form>

</template>


<style scoped>

/* =====================================================
   FORMULAIRE PRINCIPAL
===================================================== */

.form-inscription {

    width: 100%;
    max-width: 950px;

    margin: 30px auto;

    background: #ffffff;

    border-radius: 16px;

    padding: 30px;

    box-shadow:
        0 4px 15px rgba(0, 0, 0, 0.06);

    border: 1px solid #e5e7eb;

}


/* =====================================================
   EN-TÊTE
===================================================== */

.form-header {

    display: flex;

    align-items: center;

    gap: 18px;

    padding-bottom: 25px;

    margin-bottom: 30px;

    border-bottom: 1px solid #e5e7eb;

}


.form-icon {

    width: 52px;

    height: 52px;

    display: flex;

    align-items: center;

    justify-content: center;

    border-radius: 12px;

    background: #e8f5e9;

    font-size: 24px;

}


.form-header h2 {

    margin: 0 0 5px;

    font-size: 21px;

    font-weight: 700;

    color: #1f2937;

}


.form-header p {

    margin: 0;

    color: #6b7280;

    font-size: 14px;

}


/* =====================================================
   GRILLE
===================================================== */

.form-grid {

    display: grid;

    grid-template-columns: repeat(2, 1fr);

    gap: 24px;

}


/* =====================================================
   GROUPE
===================================================== */

.form-group {

    display: flex;

    flex-direction: column;

    gap: 8px;

}


.form-group label {

    font-size: 14px;

    font-weight: 600;

    color: #374151;

}


.form-group label span {

    color: #dc2626;

    margin-left: 3px;

}


/* =====================================================
   SELECT
===================================================== */

.form-group select {

    width: 100%;

    height: 48px;

    padding: 0 14px;

    border: 1px solid #d1d5db;

    border-radius: 9px;

    background: #ffffff;

    color: #1f2937;

    font-size: 14px;

    outline: none;

    cursor: pointer;

    transition:
        border-color 0.2s ease,
        box-shadow 0.2s ease,
        background 0.2s ease;

}


.form-group select:hover {

    border-color: #9ca3af;

}


.form-group select:focus {

    border-color: #3b5998;

    box-shadow:
        0 0 0 3px rgba(59, 89, 152, 0.12);

}


/* =====================================================
   ACTIONS
===================================================== */

.form-actions {

    display: flex;

    justify-content: flex-end;

    margin-top: 32px;

    padding-top: 25px;

    border-top: 1px solid #e5e7eb;

}


.btn-submit {

    display: flex;

    align-items: center;

    justify-content: center;

    gap: 9px;

    min-width: 220px;

    height: 48px;

    padding: 0 22px;

    border: none;

    border-radius: 9px;

    background: #2e7d32;

    color: #ffffff;

    font-size: 14px;

    font-weight: 600;

    cursor: pointer;

    transition:
        background 0.2s ease,
        transform 0.2s ease,
        box-shadow 0.2s ease;

}


.btn-submit:hover {

    background: #256b2a;

    transform: translateY(-1px);

    box-shadow:
        0 5px 12px rgba(46, 125, 50, 0.20);

}


.btn-submit:active {

    transform: translateY(0);

}


.btn-submit span {

    font-size: 16px;

}


/* =====================================================
   RESPONSIVE
===================================================== */

@media (max-width: 700px) {

    .form-inscription {

        margin: 20px 10px;

        padding: 20px;

    }


    .form-grid {

        grid-template-columns: 1fr;

        gap: 18px;

    }


    .form-header {

        align-items: flex-start;

    }


    .form-header h2 {

        font-size: 18px;

    }


    .form-actions {

        justify-content: stretch;

    }


    .btn-submit {

        width: 100%;

    }

}

</style>