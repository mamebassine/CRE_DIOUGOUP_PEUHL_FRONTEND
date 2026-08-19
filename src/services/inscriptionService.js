import api from "../api/api";

// ===============================
// LISTE DES INSCRIPTIONS
// ===============================

export function getInscriptions() {
    return api.get("/auth/inscriptions");
}

// ===============================
// DETAIL
// ===============================

export function getInscription(id) {
    return api.get(`/auth/inscriptions/${id}`);
}

// ===============================
// INSCRIPTION PUBLIQUE
// ===============================
// Utilisée par le visiteur depuis le site

export function inscriptionPublique(data) {
    return api.post("/auth/inscription-formation", data);
}

// ===============================
// INSCRIPTION APPRENANT CONNECTÉ
// ===============================

export function createInscription(data) {
    return api.post("/auth/inscriptions", data);
}

// ===============================
// INSCRIPTION PAR ADMIN
// ===============================

export function inscriptionAdmin(data) {
    return api.post("/auth/inscriptions/admin", data);
}

// ===============================
// VALIDATION
// ===============================

export function updateInscription(id, data) {
    return api.put(`/auth/inscriptions/${id}`, data);
}

// ===============================
// SUPPRESSION
// ===============================

export function deleteInscription(id) {
    return api.delete(`/auth/inscriptions/${id}`);
}

