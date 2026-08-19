import api from "../api/api";


// ===============================
// LISTE APPRENANTS
// GET /api/auth/apprenants
// ===============================

export function getApprenants(){

    return api.get("/auth/apprenants");

}




// ===============================
// DETAIL
// GET /api/auth/apprenants/{id}
// ===============================

export function getApprenant(id){

    return api.get(`/auth/apprenants/${id}`);

}




// ===============================
// CREATION
// POST /api/auth/apprenants
// ===============================

export function createApprenant(data){


    const formData = new FormData();


    Object.keys(data).forEach(key => {

        formData.append(
            key,
            data[key]
        );

    });



    return api.post(

        "/auth/apprenants",

        formData,

        {
            headers:{
                "Content-Type":"multipart/form-data"
            }
        }

    );

}





// ===============================
// MODIFICATION
// PUT /api/auth/apprenants/{id}
// ===============================

export function updateApprenant(id,data){


    const formData = new FormData();


    Object.keys(data).forEach(key => {


        if(data[key] !== null && data[key] !== undefined){

            formData.append(
                key,
                data[key]
            );

        }


    });




    // Laravel gère mieux PUT avec FormData via POST
    formData.append("_method","PUT");



    return api.post(

        `/auth/apprenants/${id}`,

        formData,

        {
            headers:{
                "Content-Type":"multipart/form-data"
            }
        }

    );

}





// ===============================
// SUPPRESSION
// DELETE /api/auth/apprenants/{id}
// ===============================

export function deleteApprenant(id){

    return api.delete(
        `/auth/apprenants/${id}`
    );

}





// ===============================
// MON PROFIL APPRENANT
// GET /api/auth/mon-profil-apprenant
// ===============================

export function getMonProfil(){

    return api.get(
        "/auth/mon-profil-apprenant"
    );

}





// ===============================
// MODIFIER MON PROFIL
// PUT /api/auth/mon-profil-apprenant
// ===============================

export function updateMonProfil(data){



    const formData = new FormData();



    Object.keys(data).forEach(key => {


        if(data[key] !== null && data[key] !== undefined){

            formData.append(
                key,
                data[key]
            );

        }


    });




    formData.append("_method","PUT");




    return api.post(

        "/auth/mon-profil-apprenant",

        formData,

        {
            headers:{
                "Content-Type":"multipart/form-data"
            }
        }

    );

}