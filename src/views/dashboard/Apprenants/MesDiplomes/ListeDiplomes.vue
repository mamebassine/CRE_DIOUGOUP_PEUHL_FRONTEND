<template>
    <div>
        <div class="page-container">

            <div class="page-header">
                <div>
                    <h1>Mes diplômes et attestations</h1>
                    <p>
                        Consultez vos demandes de diplômes et d'attestations
                        auprès du CRE Diougoup Peuhl.
                    </p>
                </div>

                <button class="new-btn" @click="nouvelleDemande">
                    + Nouvelle demande
                </button>
            </div>

            <!-- Statistiques -->
            <div class="stats-grid">
                <div class="stat-card">
                    <span>Total des demandes</span>
                    <strong>{{ demandes.length }}</strong>
                </div>

                <div class="stat-card pending">
                    <span>En attente</span>
                    <strong>{{ compterStatut('en_attente') }}</strong>
                </div>

                <div class="stat-card validated">
                    <span>Validées</span>
                    <strong>{{ compterStatut('valide') + compterStatut('retire') }}</strong>
                </div>

                <div class="stat-card refused">
                    <span>Refusées</span>
                    <strong>{{ compterStatut('refuse') }}</strong>
                </div>
            </div>

            <!-- Messages -->
            <div v-if="message" class="alert success">
                {{ message }}
            </div>

            <div v-if="erreur" class="alert error">
                {{ erreur }}
            </div>

            <div v-if="documentsPrets > 0" class="alert ready">
                {{ documentsPrets === 1
                    ? "Votre demande a été validée : votre document est prêt à être téléchargé."
                    : `${documentsPrets} de vos demandes ont été validées : vos documents sont prêts à être téléchargés.` }}
            </div>

            <!-- Chargement -->
            <div v-if="chargement" class="loading">
                Chargement de vos demandes...
            </div>

            <!-- Liste des demandes -->
            <div v-else class="content-card">

                <div class="section-header">
                    <h2>Historique de mes demandes</h2>

                    <button class="refresh-btn" @click="chargerDemandes">
                        Actualiser
                    </button>
                </div>

                <div v-if="demandes.length === 0" class="empty-state">
                    <div class="empty-icon">📄</div>
                    <h3>Aucune demande pour le moment</h3>
                    <p>
                        Vous n'avez pas encore effectué de demande
                        de diplôme ou d'attestation.
                    </p>

                    <button class="new-btn" @click="nouvelleDemande">
                        Faire une demande
                    </button>
                </div>

                <div v-else class="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>N°</th>
                                <th>Document</th>
                                <th>Formation</th>
                                <th>Date de demande</th>
                                <th>Statut</th>
                                <th>Suite donnée</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr v-for="(demande, index) in demandes" :key="demande.id">
                                <td>{{ index + 1 }}</td>

                                <td>
                                    <strong>{{ demande.type_document }}</strong>

                                    <small v-if="demande.numero_document" class="sous-info">
                                        N° {{ demande.numero_document }}
                                    </small>
                                </td>

                                <td>{{ demande.formation || 'Non renseignée' }}</td>

                                <td>{{ formaterDate(demande.date_demande) }}</td>

                                <td>
                                    <span class="status" :class="demande.statut">
                                        {{ libelleStatut(demande.statut) }}
                                    </span>
                                </td>

                                <td>
                                    <template v-if="demande.statut === 'refuse'">
                                        <span class="motif">
                                            {{ demande.motif_refus || 'Aucun motif indiqué' }}
                                        </span>
                                    </template>

                                    <template v-else-if="demande.statut === 'valide' || demande.statut === 'retire'">
                                        <span class="info-delivrance">
                                            {{ demande.date_delivrance
                                                ? 'Délivré le ' + formaterDate(demande.date_delivrance)
                                                : 'Demande validée' }}
                                        </span>
                                    </template>

                                    <template v-else>
                                        <span class="info-attente">En cours de traitement</span>
                                    </template>
                                </td>

                                <td>
                                    <div class="actions">
                                        <button
                                            type="button"
                                            class="btn-voir"
                                            @click="voirDetails(demande)"
                                        >
                                            Voir
                                        </button>

                                        <button
                                            v-if="demande.statut === 'en_attente'"
                                            type="button"
                                            class="btn-modifier"
                                            @click="ouvrirModification(demande)"
                                        >
                                            Modifier
                                        </button>

                                        <button
                                            v-if="demande.fichier_demande"
                                            type="button"
                                            class="btn-lettre"
                                            @click="ouvrirFichier(demande.fichier_demande)"
                                        >
                                            Ma lettre
                                        </button>

                                        <button
                                            v-if="peutTelecharger(demande)"
                                            type="button"
                                            class="btn-download"
                                            @click="telechargerDocument(demande)"
                                        >
                                            Télécharger
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

            </div>

        </div>

        <Teleport to="body">

            <!-- DÉTAILS DE LA DEMANDE -->
            <div
                v-if="demandeSelectionnee && mode === 'details'"
                class="dip-overlay"
                @click.self="fermerModal"
            >
                <div class="dip-modal">
                    <div class="dip-header">
                        <h2>Détails de ma demande</h2>
                        <button type="button" class="btn-fermer" @click="fermerModal">×</button>
                    </div>

                    <div class="details-grid">
                        <p><strong>Document :</strong> {{ demandeSelectionnee.type_document }}</p>
                        <p><strong>Statut :</strong> {{ libelleStatut(demandeSelectionnee.statut) }}</p>
                        <p><strong>Prénom :</strong> {{ demandeSelectionnee.prenom }}</p>
                        <p><strong>Nom :</strong> {{ demandeSelectionnee.nom }}</p>
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
                        <p><strong>Lieu de la demande :</strong> {{ demandeSelectionnee.lieu_demande || "Non renseigné" }}</p>
                        <p><strong>Date de la demande :</strong> {{ formaterDate(demandeSelectionnee.date_demande) }}</p>

                        <p v-if="demandeSelectionnee.numero_document">
                            <strong>N° du document :</strong>
                            {{ demandeSelectionnee.numero_document }}
                        </p>

                        <p v-if="demandeSelectionnee.date_delivrance">
                            <strong>Date de délivrance :</strong>
                            {{ formaterDate(demandeSelectionnee.date_delivrance) }}
                        </p>

                        <p v-if="demandeSelectionnee.motif_refus">
                            <strong>Motif du refus :</strong>
                            {{ demandeSelectionnee.motif_refus }}
                        </p>
                    </div>

                    <div class="dip-footer">
                        <button type="button" class="btn-annuler" @click="fermerModal">
                            Fermer
                        </button>
                    </div>
                </div>
            </div>

            <!-- MODIFICATION DE LA DEMANDE -->
            <div
                v-if="demandeSelectionnee && mode === 'modifier'"
                class="dip-overlay"
                @click.self="fermerModal"
            >
                <div class="dip-modal">
                    <div class="dip-header">
                        <h2>Modifier ma demande</h2>
                        <button type="button" class="btn-fermer" @click="fermerModal">×</button>
                    </div>

                    <div class="formulaire">

                        <div>
                            <label>Document souhaité *</label>
                            <select v-model="formModif.type_document">
                                <option value="Diplome">Diplôme</option>
                                <option value="Attestation">Attestation</option>
                            </select>
                        </div>

                        <div class="form-grid">
                            <div>
                                <label>Prénom *</label>
                                <input v-model.trim="formModif.prenom" type="text">
                            </div>

                            <div>
                                <label>Nom *</label>
                                <input v-model.trim="formModif.nom" type="text">
                            </div>

                            <div>
                                <label>Date de naissance *</label>
                                <input v-model="formModif.date_naissance" type="date">
                            </div>

                            <div>
                                <label>Lieu de naissance *</label>
                                <input v-model.trim="formModif.lieu_naissance" type="text">
                            </div>

                            <div>
                                <label>Téléphone *</label>
                                <input v-model.trim="formModif.telephone" type="tel">
                            </div>

                            <div>
                                <label>Adresse *</label>
                                <input v-model.trim="formModif.adresse" type="text">
                            </div>

                            <div>
                                <label>Fonction</label>
                                <input v-model.trim="formModif.fonction" type="text">
                            </div>

                            <div>
                                <label>Formation suivie *</label>
                                <input v-model.trim="formModif.formation" type="text">
                            </div>

                            <div>
                                <label>Durée de la formation</label>
                                <input v-model.trim="formModif.duree_formation" type="text">
                            </div>

                            <div>
                                <label>Période de formation</label>
                                <input v-model.trim="formModif.periode_formation" type="text">
                            </div>

                            <div>
                                <label>Module suivi</label>
                                <input v-model.trim="formModif.module_suivi" type="text">
                            </div>

                            <div>
                                <label>Année académique</label>
                                <input v-model.trim="formModif.annee_academique" type="text">
                            </div>

                            <div>
                                <label>Lieu de la demande</label>
                                <input v-model.trim="formModif.lieu_demande" type="text">
                            </div>
                        </div>

                        <p v-if="erreurModif" class="message-erreur">{{ erreurModif }}</p>

                        <div class="dip-footer">
                            <button type="button" class="btn-annuler" @click="fermerModal">
                                Annuler
                            </button>

                            <button
                                type="button"
                                class="btn-enregistrer"
                                @click="enregistrerModification"
                                :disabled="enregistrement"
                            >
                                {{ enregistrement ? "Enregistrement..." : "Enregistrer" }}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </Teleport>
    </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import api from "@/api/api";

const router = useRouter();

const demandes = ref([]);
const chargement = ref(false);
const erreur = ref("");
const message = ref("");

// Fenêtres (détails / modification)
const demandeSelectionnee = ref(null);
const mode = ref("");
const enregistrement = ref(false);
const erreurModif = ref("");

const formModif = reactive({
    type_document: "",
    prenom: "",
    nom: "",
    date_naissance: "",
    lieu_naissance: "",
    telephone: "",
    adresse: "",
    fonction: "",
    formation: "",
    duree_formation: "",
    periode_formation: "",
    module_suivi: "",
    annee_academique: "",
    lieu_demande: ""
});

// Adresse du stockage Laravel
const URL_STOCKAGE = "http://127.0.0.1:8000/storage/";

// Récupérer les demandes de l'apprenant connecté
const chargerDemandes = async () => {
    chargement.value = true;
    erreur.value = "";

    try {
        const reponse = await api.get("/auth/diplomes/mes-demandes");
        const donnees = reponse.data;

        // Gérer les différents formats de réponse Laravel
        if (Array.isArray(donnees)) {
            demandes.value = donnees;
        } else if (Array.isArray(donnees.data)) {
            demandes.value = donnees.data;
        } else if (Array.isArray(donnees.demandes)) {
            demandes.value = donnees.demandes;
        } else {
            demandes.value = [];
        }

    } catch (error) {
        console.error("Erreur chargement des demandes :", error);

        erreur.value = error.response?.data?.message ||
            "Impossible de charger vos demandes. Veuillez réessayer.";
    } finally {
        chargement.value = false;
    }
};

// Compter les demandes selon leur statut
const compterStatut = (statut) => {
    return demandes.value.filter(
        demande => demande.statut === statut
    ).length;
};

// Traduire les statuts
const libelleStatut = (statut) => {
    const statuts = {
        en_attente: "En attente",
        valide: "Validée",
        refuse: "Refusée",
        retire: "Retirée"
    };

    return statuts[statut] || statut || "Inconnu";
};

// Affiche une date AAAA-MM-JJ sous la forme JJ/MM/AAAA (sans décalage)
const formaterDate = (date) => {
    if (!date) return "—";

    const [annee, mois, jour] = String(date).slice(0, 10).split("-");

    return `${jour}/${mois}/${annee}`;
};

// Le diplôme / l'attestation officiel est dans la colonne "fichier_pdf"
const peutTelecharger = (demande) => {
    return (
        (demande.statut === "valide" || demande.statut === "retire") &&
        !!demande.fichier_pdf
    );
};

const documentsPrets = computed(() => {
    return demandes.value.filter(
        demande => peutTelecharger(demande)
    ).length;
});

// Ouvrir un fichier du stockage
const ouvrirFichier = (chemin) => {
    if (!chemin) return;

    const url = /^https?:\/\//.test(chemin)
        ? chemin
        : URL_STOCKAGE + chemin.replace(/^\/+/, "");

    window.open(url, "_blank");
};

const telechargerDocument = (demande) => {
    if (!demande.fichier_pdf) {
        erreur.value = "Le document officiel n'est pas encore disponible.";
        return;
    }

    ouvrirFichier(demande.fichier_pdf);
};

// Voir les détails
const voirDetails = (demande) => {
    demandeSelectionnee.value = demande;
    mode.value = "details";
};

// Ouvrir la modification (formulaire prérempli)
const ouvrirModification = (demande) => {
    demandeSelectionnee.value = demande;
    mode.value = "modifier";
    erreurModif.value = "";

    formModif.type_document = demande.type_document || "";
    formModif.prenom = demande.prenom || "";
    formModif.nom = demande.nom || "";
    formModif.date_naissance = demande.date_naissance
        ? String(demande.date_naissance).slice(0, 10)
        : "";
    formModif.lieu_naissance = demande.lieu_naissance || "";
    formModif.telephone = demande.telephone || "";
    formModif.adresse = demande.adresse || "";
    formModif.fonction = demande.fonction || "";
    formModif.formation = demande.formation || "";
    formModif.duree_formation = demande.duree_formation || "";
    formModif.periode_formation = demande.periode_formation || "";
    formModif.module_suivi = demande.module_suivi || "";
    formModif.annee_academique = demande.annee_academique || "";
    formModif.lieu_demande = demande.lieu_demande || "";
};

// Enregistrer la modification
const enregistrerModification = async () => {
    erreurModif.value = "";

    if (
        !formModif.prenom || !formModif.nom || !formModif.date_naissance ||
        !formModif.lieu_naissance || !formModif.telephone ||
        !formModif.adresse || !formModif.formation
    ) {
        erreurModif.value = "Veuillez remplir tous les champs obligatoires (*).";
        return;
    }

    enregistrement.value = true;

    try {
        const reponse = await api.put(
            `/auth/diplomes/${demandeSelectionnee.value.id}/modifier-demande`,
            { ...formModif }
        );

        message.value = reponse.data.message ||
            "Votre demande a été modifiée avec succès.";

        fermerModal();
        await chargerDemandes();

    } catch (error) {
        console.error("Erreur modification demande :", error);

        const erreursValidation = error.response?.data?.errors;

        if (erreursValidation) {
            erreurModif.value = Object.values(erreursValidation)
                .flat()
                .join(" ");
        } else {
            erreurModif.value = error.response?.data?.message ||
                "Impossible de modifier la demande.";
        }
    } finally {
        enregistrement.value = false;
    }
};

const fermerModal = () => {
    demandeSelectionnee.value = null;
    mode.value = "";
    erreurModif.value = "";
};

// Aller vers le formulaire
const nouvelleDemande = () => {
    router.push("/espace-apprenant/diplomes/demander");
};

// Charger les demandes au chargement de la page
onMounted(() => {
    chargerDemandes();
});
</script>

<style scoped>
.page-container {
    padding: 25px;
    max-width: 1200px;
    margin: auto;
}

.page-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 15px;
    flex-wrap: wrap;
    margin-bottom: 25px;
}

.page-header h1 {
    color: #3B5998;
    font-size: 25px;
    margin-bottom: 8px;
}

.page-header p {
    color: #666;
}

button {
    border: none;
    border-radius: 7px;
    cursor: pointer;
    font-size: 13px;
}

button:disabled {
    opacity: 0.6;
    cursor: not-allowed;
}

.new-btn {
    background: #2E7D32;
    color: white;
    padding: 12px 18px;
    border-radius: 8px;
    font-weight: 600;
}

.new-btn:hover {
    background: #256529;
}

.stats-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 18px;
    margin-bottom: 25px;
}

.stat-card {
    background: white;
    padding: 20px;
    border-radius: 12px;
    box-shadow: 0 3px 12px rgba(0, 0, 0, 0.05);
    display: flex;
    flex-direction: column;
    gap: 12px;
    border-left: 4px solid #3B5998;
}

.stat-card span {
    color: #666;
    font-size: 14px;
}

.stat-card strong {
    font-size: 27px;
    color: #3B5998;
}

.stat-card.pending {
    border-color: #ed9c28;
}

.stat-card.pending strong {
    color: #ed9c28;
}

.stat-card.validated {
    border-color: #2E7D32;
}

.stat-card.validated strong {
    color: #2E7D32;
}

.stat-card.refused {
    border-color: #c62828;
}

.stat-card.refused strong {
    color: #c62828;
}

.content-card {
    background: white;
    padding: 25px;
    border-radius: 12px;
    box-shadow: 0 3px 12px rgba(0, 0, 0, 0.05);
}

.section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 12px;
    margin-bottom: 22px;
}

.section-header h2 {
    color: #333;
    font-size: 19px;
}

.refresh-btn {
    background: #f0f3f8;
    color: #3B5998;
    padding: 9px 14px;
}

.table-container {
    overflow-x: auto;
}

table {
    width: 100%;
    border-collapse: collapse;
    min-width: 1000px;
}

th, td {
    padding: 14px;
    text-align: left;
    border-bottom: 1px solid #eee;
    font-size: 14px;
}

th {
    background: #f7f8fa;
    color: #444;
}

td {
    color: #555;
}

.sous-info {
    display: block;
    margin-top: 4px;
    color: #777;
    font-size: 12px;
}

.status {
    display: inline-block;
    padding: 6px 11px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 600;
}

.status.en_attente {
    background: #fff3cd;
    color: #856404;
}

.status.valide {
    background: #e8f5e9;
    color: #2E7D32;
}

.status.refuse {
    background: #ffebee;
    color: #c62828;
}

.status.retire {
    background: #e3f2fd;
    color: #1565c0;
}

.motif {
    color: #c62828;
}

.info-delivrance {
    color: #2E7D32;
}

.info-attente {
    color: #888;
    font-size: 13px;
}

.actions {
    display: flex;
    gap: 6px;
    flex-wrap: wrap;
}

.actions button {
    padding: 8px 12px;
    font-weight: 600;
}

.btn-voir {
    background: #e8eef8;
    color: #3B5998;
}

.btn-modifier {
    background: #fff3cd;
    color: #856404;
}

.btn-lettre {
    background: #e0f2fe;
    color: #0369a1;
}

.btn-download {
    background: #3B5998;
    color: white;
}

.btn-download:hover {
    background: #2f477a;
}

.empty-state {
    text-align: center;
    padding: 45px 15px;
}

.empty-icon {
    font-size: 45px;
    margin-bottom: 15px;
}

.empty-state h3 {
    color: #333;
    margin-bottom: 10px;
}

.empty-state p {
    color: #777;
    margin-bottom: 20px;
}

.loading {
    background: white;
    padding: 35px;
    text-align: center;
    color: #3B5998;
    border-radius: 10px;
}

.alert {
    padding: 14px;
    border-radius: 8px;
    margin-bottom: 18px;
}

.success {
    background: #e8f5e9;
    color: #2E7D32;
}

.ready {
    background: #e8f5e9;
    color: #1b5e20;
    border-left: 4px solid #2E7D32;
}

.error {
    background: #ffebee;
    color: #c62828;
}

.message-erreur {
    color: #c62828;
    margin: 8px 0;
}

/* FENETRES (préfixe dip- pour éviter les conflits CSS) */
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
    max-width: 700px;
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
    gap: 14px;
}

.details-grid p {
    color: #555;
    overflow-wrap: anywhere;
    font-size: 14px;
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
    display: block;
    font-weight: 600;
    color: #333;
    font-size: 13px;
    margin-bottom: 5px;
}

.formulaire input,
.formulaire select {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 6px;
    font-family: inherit;
    font-size: 14px;
    box-sizing: border-box;
}

.form-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 14px;
}

.dip-footer {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    margin-top: 20px;
}

.dip-footer button {
    padding: 10px 16px;
    font-weight: 600;
}

.btn-annuler {
    background: #eee;
    color: #333;
}

.btn-enregistrer {
    background: #2E7D32;
    color: white;
}

@media (max-width: 800px) {
    .stats-grid {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (max-width: 650px) {
    .details-grid,
    .form-grid {
        grid-template-columns: 1fr;
    }
}

@media (max-width: 550px) {
    .page-container {
        padding: 15px;
    }

    .stats-grid {
        gap: 10px;
    }

    .content-card {
        padding: 15px;
    }

    .section-header {
        align-items: flex-start;
        flex-direction: column;
    }

    .new-btn {
        width: 100%;
    }
}
</style>
