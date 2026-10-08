import api from "../api/api";

export default {

    // ===============================
    // INSCRIPTION
    // ===============================
    register(data) {
        return api.post("/auth/register", data);
    },


    // ===============================
    // CONNEXION
    // ===============================
    login(data) {
        return api.post("/auth/login", data);
    },


    // ===============================
    // RECUPERER LE PROFIL
    // ===============================
    profile() {
        return api.get("/auth/profile");
    },


    // ===============================
    // MODIFIER LE PROFIL
    // ===============================
    updateProfile(formData) {
        return api.post("/auth/profile", formData);
    },


    // ===============================
    // DECONNEXION
    // ===============================
    logout() {
        return api.post("/auth/logout");
    }

};
