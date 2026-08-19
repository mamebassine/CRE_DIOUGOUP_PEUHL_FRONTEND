import api from "../api/api";


// =====================================================
// CONSTRUIRE FORMDATA
// =====================================================

function construireFormData(data) {

    const formData =
        new FormData();


    // =================================================
    // INFORMATIONS
    // =================================================

    formData.append(
        "nom",
        data.nom ?? ""
    );


    formData.append(
        "resume",
        data.resume ?? ""
    );


    formData.append(
        "description",
        data.description ?? ""
    );


    formData.append(
        "duree",
        data.duree ?? ""
    );


    formData.append(
        "diplome",
        data.diplome ?? ""
    );


    formData.append(
        "lieu",
        data.lieu ?? ""
    );


    // =================================================
    // OBJECTIFS
    // =================================================

    if (
        Array.isArray(
            data.objectifs
        )
    ) {

        data.objectifs.forEach(
            objectif => {

                if (
                    objectif !== null &&
                    objectif !== undefined &&
                    String(objectif).trim() !== ""
                ) {

                    formData.append(
                        "objectifs[]",
                        String(
                            objectif
                        ).trim()
                    );

                }

            }
        );

    }


    // =================================================
    // IMAGE LOCALE
    // =================================================

   if (data.icone instanceof File) {
    formData.append("icone", data.icone);
}


    // =================================================
    // IMAGE URL
    // =================================================

    if (
        data.icone_url &&
        String(
            data.icone_url
        ).trim() !== ""
    ) {

        formData.append(
            "icone_url",
            String(
                data.icone_url
            ).trim()
        );

    }


    // =================================================
    // SUPPRIMER IMAGE
    // =================================================

    if (
        data.supprimer_icone
    ) {

        formData.append(
            "supprimer_icone",
            "1"
        );

    }


    // =================================================
    // CAPACITÉ
    // =================================================

    if (
        data.capacite !== null &&
        data.capacite !== undefined &&
        data.capacite !== ""
    ) {

        formData.append(
            "capacite",
            String(
                data.capacite
            )
        );

    }


    // =================================================
    // ACTIVE
    // =================================================

    formData.append(
        "is_active",
        data.is_active
            ? "1"
            : "0"
    );


    return formData;
}


// =====================================================
// LISTE
// =====================================================

export function getFormations(
    page = 1
) {

    return api.get(
        `/auth/formations?page=${page}`
    );

}


// =====================================================
// DETAIL
// =====================================================

export function getFormation(id) {

    return api.get(
        `/auth/formations/${id}`
    );

}


// =====================================================
// AJOUT
// =====================================================

export function createFormation(
    data
) {

    const formData =
        construireFormData(data);


    return api.post(
        "/auth/formations",
        formData
    );

}


// =====================================================
// MODIFICATION
// =====================================================

export function updateFormation(
    id,
    data
) {

    const formData =
        construireFormData(data);


    /*
     * Laravel accepte le PUT
     * via POST + _method.
     */

    formData.append(
        "_method",
        "PUT"
    );


    return api.post(
        `/auth/formations/${id}`,
        formData
    );

}


// =====================================================
// SUPPRESSION
// =====================================================

export function deleteFormation(
    id
) {

    return api.delete(
        `/auth/formations/${id}`
    );

}