<template>
    <div>
        <div class="diplomes-container">

            <div class="page-header">
                <div>
                    <h1>Gestion des diplômes et attestations</h1>
                    <p>Consultez et gérez les demandes des apprenants.</p>
                </div>

                <button type="button" @click="chargerDemandes" :disabled="chargement">
                    {{ chargement ? "Chargement..." : "Actualiser" }}
                </button>
            </div>

            <div class="stats-container">
                <div class="stat-card">
                    <span>Total des demandes</span>
                    <h2>{{ demandes.length }}</h2>
                </div>

                <div class="stat-card attente">
                    <span>En attente</span>
                    <h2>{{ compterStatut("en_attente") }}</h2>
                </div>

                <div class="stat-card valide">
                    <span>Validées</span>
                    <h2>{{ compterStatut("valide") }}</h2>
                </div>

                <div class="stat-card refuse">
                    <span>Refusées</span>
                    <h2>{{ compterStatut("refuse") }}</h2>
                </div>
            </div>

            <p v-if="erreur" class="message-erreur">{{ erreur }}</p>
            <p v-if="message" class="message-succes">{{ message }}</p>

            <div class="table-container">
                <h2>Liste des demandes</h2>

                <div v-if="chargement" class="message">
                    Chargement des demandes...
                </div>

                <div v-else-if="demandes.length === 0" class="message">
                    Aucune demande de diplôme ou d'attestation pour le moment.
                </div>

                <table v-else>
                    <thead>
                        <tr>
                            <th>N°</th>
                            <th>Apprenant</th>
                            <th>Document</th>
                            <th>Formation</th>
                            <th>Date de demande</th>
                            <th>Statut</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr v-for="(demande, index) in demandes" :key="demande.id">
                            <td>{{ index + 1 }}</td>
                            <td>{{ demande.prenom }} {{ demande.nom }}</td>
                            <td>{{ demande.type_document }}</td>
                            <td>{{ demande.formation }}</td>
                            <td>{{ formaterDate(demande.date_demande) }}</td>

                            <td>
                                <span :class="['badge-statut', demande.statut]">
                                    {{ libelleStatut(demande.statut) }}
                                </span>
                            </td>

                            <td>
                                <div class="actions">
                                    <button
                                        type="button"
                                        class="btn-voir"
                                        @click.stop="voirDetails(demande)"
                                    >
                                        Voir
                                    </button>

                                    <button
                                        v-if="demande.fichier_demande"
                                        type="button"
                                        class="btn-telecharger"
                                        @click.stop="telechargerDemande(demande)"
                                    >
                                        Lettre PDF
                                    </button>

                                    <button
                                        v-if="demande.fichier_pdf"
                                        type="button"
                                        class="btn-telecharger"
                                        @click.stop="telechargerDocument(demande)"
                                    >
                                        Document PDF
                                    </button>

                                    <template v-if="demande.statut === 'en_attente'">
                                        <button
                                            type="button"
                                            class="btn-valider"
                                            @click.stop="ouvrirTraitement(demande, 'valide')"
                                        >
                                            Valider
                                        </button>

                                        <button
                                            type="button"
                                            class="btn-refuser"
                                            @click.stop="ouvrirTraitement(demande, 'refuse')"
                                        >
                                            Refuser
                                        </button>
                                    </template>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <Teleport to="body">

            <!-- DÉTAILS -->
            <div
                v-if="demandeSelectionnee && mode === 'details'"
                class="dip-overlay"
                @click.self="fermerModal"
            >
                <div class="dip-modal">
                    <div class="dip-header">
                        <h2>Détails de la demande</h2>
                        <button type="button" class="btn-fermer" @click="fermerModal">×</button>
                    </div>

                    <div class="details-grid">
                        <p><strong>Prénom :</strong> {{ demandeSelectionnee.prenom }}</p>
                        <p><strong>Nom :</strong> {{ demandeSelectionnee.nom }}</p>
                        <p><strong>Type :</strong> {{ demandeSelectionnee.type_document }}</p>
                        <p><strong>Date de naissance :</strong> {{ formaterDate(demandeSelectionnee.date_naissance) }}</p>
                        <p><strong>Lieu de naissance :</strong> {{ demandeSelectionnee.lieu_naissance }}</p>
                        <p><strong>Téléphone :</strong> {{ demandeSelectionnee.telephone }}</p>
                        <p><strong>Adresse :</strong> {{ demandeSelectionnee.adresse }}</p>
                        <p><strong>Fonction :</strong> {{ demandeSelectionnee.fonction || "Non renseignée" }}</p>
                        <p><strong>Formation :</strong> {{ demandeSelectionnee.formation }}</p>
                        <p><strong>Durée :</strong> {{ demandeSelectionnee.duree_formation || "Non renseignée" }}</p>
                        <p><strong>Période :</strong> {{ demandeSelectionnee.periode_formation || "Non renseignée" }}</p>
                        <p><strong>Module :</strong> {{ demandeSelectionnee.module_suivi || "Non renseigné" }}</p>
                        <p><strong>Année académique :</strong> {{ demandeSelectionnee.annee_academique || "Non renseignée" }}</p>
                        <p><strong>Lieu de demande :</strong> {{ demandeSelectionnee.lieu_demande || "Non renseigné" }}</p>
                        <p><strong>Date de demande :</strong> {{ formaterDate(demandeSelectionnee.date_demande) }}</p>
                        <p><strong>Statut :</strong> {{ libelleStatut(demandeSelectionnee.statut) }}</p>

                        <p v-if="demandeSelectionnee.motif_refus">
                            <strong>Motif du refus :</strong>
                            {{ demandeSelectionnee.motif_refus }}
                        </p>

                        <p v-if="demandeSelectionnee.numero_document">
                            <strong>N° document :</strong>
                            {{ demandeSelectionnee.numero_document }}
                        </p>

                        <p v-if="demandeSelectionnee.date_delivrance">
                            <strong>Date de délivrance :</strong>
                            {{ formaterDate(demandeSelectionnee.date_delivrance) }}
                        </p>
                    </div>

                    <div class="dip-footer">
                        <button type="button" class="btn-annuler" @click="fermerModal">
                            Fermer
                        </button>
                    </div>
                </div>
            </div>

            <!-- VALIDATION / REFUS -->
            <div
                v-if="demandeSelectionnee && mode === 'traitement'"
                class="dip-overlay"
                @click.self="fermerModal"
            >
                <div class="dip-modal">
                    <div class="dip-header">
                        <h2>
                            {{ statutTraitement === "valide" ? "Valider la demande" : "Refuser la demande" }}
                        </h2>

                        <button type="button" class="btn-fermer" @click="fermerModal">
                            ×
                        </button>
                    </div>

                    <div class="formulaire">

                        <p class="recap">
                            <strong>{{ demandeSelectionnee.prenom }} {{ demandeSelectionnee.nom }}</strong><br>
                            {{ demandeSelectionnee.type_document }} : {{ demandeSelectionnee.formation }}
                        </p>

                        <template v-if="statutTraitement === 'valide'">
                            <label>Numéro du diplôme ou de l'attestation</label>
                            <input v-model="form.numero_document" type="text">

                            <label>Date de délivrance</label>
                            <input v-model="form.date_delivrance" type="date">

                            <label>Document officiel PDF (facultatif)</label>
                            <input
                                type="file"
                                accept="application/pdf"
                                @change="selectionnerFichier"
                            >

                            <small>
                                Ces champs sont préremplis. Il suffit de cliquer sur Confirmer :
                                le document PDF sera généré automatiquement.
                                Vous pouvez aussi ajouter votre propre PDF (maximum 10 Mo).
                            </small>
                        </template>

                        <template v-else>
                            <label>Motif du refus *</label>
                            <textarea
                                v-model="form.motif_refus"
                                rows="4"
                                placeholder="Indiquez le motif du refus..."
                            ></textarea>
                        </template>

                        <p v-if="erreurTraitement" class="message-erreur">
                            {{ erreurTraitement }}
                        </p>

                        <div class="dip-footer">
                            <button type="button" class="btn-annuler" @click="fermerModal">
                                Annuler
                            </button>

                            <button
                                type="button"
                                :class="statutTraitement === 'valide' ? 'btn-valider' : 'btn-refuser'"
                                @click="traiterDemande"
                                :disabled="traitement"
                            >
                                {{ traitement ? "Enregistrement..." : "Confirmer" }}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Teleport>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import api from "@/api/api";

const demandes = ref([]);
const chargement = ref(false);
const erreur = ref("");
const message = ref("");

const demandeSelectionnee = ref(null);
const mode = ref("");
const statutTraitement = ref("");
const traitement = ref(false);
const erreurTraitement = ref("");

const form = reactive({
    numero_document: "",
    date_delivrance: "",
    motif_refus: "",
    fichier_pdf: null
});

const chargerDemandes = async () => {
    chargement.value = true;
    erreur.value = "";

    try {
        const reponse = await api.get("/auth/diplomes");
        demandes.value = reponse.data.data || [];
    } catch (error) {
        console.error("Erreur de récupération :", error);
        erreur.value =
            error.response?.data?.message ||
            "Impossible de récupérer les demandes.";
    } finally {
        chargement.value = false;
    }
};

const compterStatut = (statut) => {
    return demandes.value.filter(d => d.statut === statut).length;
};

const libelleStatut = (statut) => {
    const statuts = {
        en_attente: "En attente",
        valide: "Validée",
        refuse: "Refusée",
        retire: "Retirée"
    };

    return statuts[statut] || statut;
};

// Affiche une date AAAA-MM-JJ sous la forme JJ/MM/AAAA (sans décalage)
const formaterDate = (date) => {
    if (!date) return "Non renseignée";

    const [annee, mois, jour] = String(date).slice(0, 10).split("-");

    return `${jour}/${mois}/${annee}`;
};

// Date du jour au format AAAA-MM-JJ
const dateDuJour = () => {
    const maintenant = new Date();
    const mois = String(maintenant.getMonth() + 1).padStart(2, "0");
    const jour = String(maintenant.getDate()).padStart(2, "0");

    return `${maintenant.getFullYear()}-${mois}-${jour}`;
};

// Numéro proposé automatiquement. Exemple : CRE-DIP-2026-0010
const genererNumeroSuggere = (demande) => {
    const prefixe = demande.type_document === "Diplome" ? "DIP" : "ATT";
    const annee = new Date().getFullYear();
    const numero = String(demande.id).padStart(4, "0");

    return `CRE-${prefixe}-${annee}-${numero}`;
};

const voirDetails = (demande) => {
    demandeSelectionnee.value = demande;
    mode.value = "details";
};

const ouvrirTraitement = (demande, statut) => {
    demandeSelectionnee.value = demande;
    statutTraitement.value = statut;
    mode.value = "traitement";
    erreurTraitement.value = "";

    const validation = statut === "valide";

    // Formulaire prérempli pour une validation
    form.numero_document = validation
        ? (demande.numero_document || genererNumeroSuggere(demande))
        : "";

    form.date_delivrance = validation ? dateDuJour() : "";
    form.motif_refus = "";
    form.fichier_pdf = null;
};

const selectionnerFichier = (event) => {
    const fichier = event.target.files[0];

    if (!fichier) return;

    if (fichier.type !== "application/pdf") {
        erreurTraitement.value = "Veuillez sélectionner un fichier PDF.";
        event.target.value = "";
        form.fichier_pdf = null;
        return;
    }

    if (fichier.size > 10 * 1024 * 1024) {
        erreurTraitement.value = "Le fichier ne doit pas dépasser 10 Mo.";
        event.target.value = "";
        form.fichier_pdf = null;
        return;
    }

    erreurTraitement.value = "";
    form.fichier_pdf = fichier;
};

const traiterDemande = async () => {
    erreurTraitement.value = "";

    if (
        statutTraitement.value === "refuse" &&
        !form.motif_refus.trim()
    ) {
        erreurTraitement.value = "Veuillez renseigner le motif du refus.";
        return;
    }

    traitement.value = true;

    try {
        const donnees = new FormData();
        donnees.append("statut", statutTraitement.value);

        if (statutTraitement.value === "valide") {
            // Si un champ est vide, le serveur le génère automatiquement
            if (form.numero_document.trim()) {
                donnees.append("numero_document", form.numero_document.trim());
            }

            if (form.date_delivrance) {
                donnees.append("date_delivrance", form.date_delivrance);
            }

            if (form.fichier_pdf) {
                donnees.append("fichier_pdf", form.fichier_pdf);
            }
        } else {
            donnees.append("motif_refus", form.motif_refus);
        }

        donnees.append("_method", "PUT");

        await api.post(
            `/auth/diplomes/${demandeSelectionnee.value.id}`,
            donnees
        );

        const etaitValide = statutTraitement.value === "valide";

        message.value = etaitValide
            ? "La demande a été validée avec succès."
            : "La demande a été refusée avec succès.";

        fermerModal();
        await chargerDemandes();

    } catch (error) {
        console.error("Erreur de traitement :", error);

        const erreursValidation = error.response?.data?.errors;

        if (erreursValidation) {
            erreurTraitement.value = Object.values(erreursValidation)
                .flat()
                .join(" ");
        } else {
            erreurTraitement.value =
                error.response?.data?.message ||
                "Une erreur est survenue pendant le traitement.";
        }
    } finally {
        traitement.value = false;
    }
};

const ouvrirFichier = (chemin) => {
    if (!chemin) return;

    const url = `http://127.0.0.1:8000/storage/${chemin.replace(/^\/+/, "")}`;
    window.open(url, "_blank");
};

const telechargerDemande = (demande) => {
    if (!demande.fichier_demande) {
        erreur.value = "Aucun PDF de demande disponible.";
        return;
    }

    ouvrirFichier(demande.fichier_demande);
};

const telechargerDocument = (demande) => {
    if (!demande.fichier_pdf) {
        erreur.value = "Aucun document officiel disponible.";
        return;
    }

    ouvrirFichier(demande.fichier_pdf);
};

const fermerModal = () => {
    demandeSelectionnee.value = null;
    mode.value = "";
    statutTraitement.value = "";
    erreurTraitement.value = "";
};

onMounted(() => {
    chargerDemandes();
});
</script>

<style scoped>
.diplomes-container {
    padding: 25px;
}

.page-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 15px;
    margin-bottom: 25px;
}

.page-header h1 {
    color: #3B5998;
    margin-bottom: 8px;
}

.page-header p {
    color: #777;
}

button {
    border: none;
    padding: 10px 14px;
    border-radius: 6px;
    cursor: pointer;
    font-size: 13px;
}

button:disabled {
    opacity: 0.6;
    cursor: not-allowed;
}

.page-header button {
    background: #3B5998;
    color: white;
    padding: 11px 18px;
}

.stats-container {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 15px;
    margin-bottom: 25px;
}

.stat-card {
    background: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 2px 8px #0000000d;
}

.stat-card span {
    color: #777;
}

.stat-card h2 {
    margin-top: 10px;
    color: #3B5998;
}

.stat-card.attente h2 {
    color: #e69b19;
}

.stat-card.valide h2 {
    color: #2E7D32;
}

.stat-card.refuse h2 {
    color: #d32f2f;
}

.table-container {
    background: white;
    padding: 20px;
    border-radius: 10px;
    overflow-x: auto;
}

.table-container h2 {
    margin-bottom: 20px;
    color: #333;
}

table {
    width: 100%;
    border-collapse: collapse;
    min-width: 950px;
}

th, td {
    padding: 13px;
    text-align: left;
    border-bottom: 1px solid #eee;
}

th {
    background: #f5f7fb;
    color: #3B5998;
}

.badge-statut {
    padding: 6px 10px;
    border-radius: 20px;
    font-size: 12px;
}

.badge-statut.en_attente {
    background: #fff3cd;
    color: #856404;
}

.badge-statut.valide {
    background: #d4edda;
    color: #155724;
}

.badge-statut.refuse {
    background: #f8d7da;
    color: #721c24;
}

.badge-statut.retire {
    background: #dbeafe;
    color: #1e40af;
}

.actions {
    display: flex;
    gap: 6px;
    flex-wrap: wrap;
}

.btn-voir {
    background: #e8eef8;
    color: #3B5998;
}

.btn-telecharger {
    background: #e0f2fe;
    color: #0369a1;
}

.btn-valider {
    background: #2E7D32;
    color: white;
}

.btn-refuser {
    background: #d32f2f;
    color: white;
}

.message {
    text-align: center;
    padding: 30px;
    color: #777;
}

.message-erreur {
    color: #d32f2f;
    margin: 12px 0;
}

.message-succes {
    color: #2E7D32;
    margin: 12px 0;
}

.dip-overlay {
    position: fixed !important;
    top: 0 !important;
    left: 0 !important;
    width: 100vw !important;
    height: 100vh !important;
    background: rgba(0, 0, 0, 0.65);
    display: flex !important;
    align-items: center;
    justify-content: center;
    padding: 20px;
    z-index: 2147483647 !important;
    visibility: visible !important;
    opacity: 1 !important;
}

.dip-modal {
    display: block !important;
    visibility: visible !important;
    opacity: 1 !important;
    background: white;
    width: 100%;
    max-width: 650px;
    max-height: 90vh;
    overflow-y: auto;
    padding: 25px;
    border-radius: 12px;
    position: relative;
    box-shadow: 0 10px 40px #00000030;
}

.dip-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
}

.dip-header h2 {
    color: #3B5998;
    font-size: 20px;
}

.btn-fermer {
    background: #f1f1f1;
    font-size: 22px;
    padding: 3px 10px;
}

.details-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 15px;
}

.details-grid p {
    color: #555;
    overflow-wrap: anywhere;
}

.details-grid strong {
    color: #333;
}

.formulaire {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.formulaire label {
    font-weight: 600;
    color: #333;
}

.formulaire input,
.formulaire textarea {
    width: 100%;
    padding: 11px;
    border: 1px solid #ddd;
    border-radius: 6px;
    font-family: inherit;
}

.formulaire small {
    color: #777;
}

.recap {
    background: #f0f5ff;
    color: #3B5998;
    padding: 10px 12px;
    border-radius: 6px;
    line-height: 1.5;
}

.dip-footer {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    margin-top: 20px;
}

.btn-annuler {
    background: #eee;
    color: #333;
}

@media (max-width: 768px) {
    .stats-container {
        grid-template-columns: repeat(2, 1fr);
    }

    .page-header {
        align-items: flex-start;
        flex-direction: column;
    }

    .details-grid {
        grid-template-columns: 1fr;
    }
}

@media (max-width: 450px) {
    .stats-container {
        grid-template-columns: 1fr;
    }

    .diplomes-container {
        padding: 12px;
    }
}
</style>
