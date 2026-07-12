<!-- ===========================
        INSCRIPTION
=========================== -->

<section id="inscription" class="inscription">

    <div class="container">

        <div class="section-title">

            <h2>
                Formulaire de pré-inscription
            </h2>

            <p>
                Veuillez remplir les informations ci-dessous pour soumettre votre candidature.
            </p>

        </div>


        <form class="inscription-form">


            <div class="form-grid">


                <!-- NOM -->

                <div class="form-group">

                    <label>
                        Nom
                    </label>

                    <input 
                        type="text"
                        placeholder="Votre nom"
                    >

                </div>



                <!-- PRENOM -->

                <div class="form-group">

                    <label>
                        Prénom
                    </label>

                    <input 
                        type="text"
                        placeholder="Votre prénom"
                    >

                </div>



                <!-- DATE NAISSANCE -->

                <div class="form-group">

                    <label>
                        Date de naissance
                    </label>

                    <input 
                        type="date"
                    >

                </div>



                <!-- SEXE -->

                <div class="form-group">

                    <label>
                        Sexe
                    </label>


                    <select>

                        <option>
                            Choisir
                        </option>

                        <option>
                            Masculin
                        </option>

                        <option>
                            Féminin
                        </option>

                    </select>

                </div>



                <!-- SITUATION -->

                <div class="form-group">

                    <label>
                        Situation matrimoniale
                    </label>


                    <select>

                        <option>
                            Choisir
                        </option>

                        <option>
                            Célibataire
                        </option>

                        <option>
                            Marié(e)
                        </option>

                        <option>
                            Divorcé(e)
                        </option>

                        <option>
                            Veuf(ve)
                        </option>

                    </select>


                </div>




                <!-- TELEPHONE -->

                <div class="form-group">

                    <label>
                        Téléphone
                    </label>

                    <input 
                        type="tel"
                        placeholder="77 000 00 00"
                    >

                </div>




                <!-- EMAIL -->

                <div class="form-group">

                    <label>
                        Email
                    </label>

                    <input 
                        type="email"
                        placeholder="exemple@gmail.com"
                    >

                </div>




                <!-- ADRESSE -->

                <div class="form-group">

                    <label>
                        Adresse
                    </label>


                    <input 
                        type="text"
                        placeholder="Votre adresse"
                    >

                </div>




                <!-- NIVEAU ETUDE -->

                <div class="form-group">

                    <label>
                        Niveau d'étude
                    </label>


                    <select>

                        <option>
                            Choisir
                        </option>

                        <option>
                            Sans niveau
                        </option>

                        <option>
                            BFEM
                        </option>

                        <option>
                            Baccalauréat
                        </option>

                        <option>
                            BTS
                        </option>

                        <option>
                            Licence
                        </option>

                        <option>
                            Master
                        </option>


                    </select>


                </div>




                <!-- PROFESSION -->

                <div class="form-group">


                    <label>
                        Profession
                    </label>


                    <input 
                        type="text"
                        placeholder="Profession actuelle"
                    >


                </div>




                <!-- NIVEAU INFORMATIQUE -->

                <div class="form-group">


                    <label>
                        Niveau en informatique
                    </label>


                    <select>

                        <option>
                            Choisir
                        </option>


                        <option>
                            Débutant
                        </option>


                        <option>
                            Intermédiaire
                        </option>


                        <option>
                            Avancé
                        </option>


                    </select>


                </div>





                <!-- FORMATION AUTOMATIQUE -->

                <div class="form-group">


                    <label>
                        Formation souhaitée
                    </label>


                    <select v-model="formationChoisie">


                        <option value="">
                            Choisir une formation
                        </option>


                        <option
                            v-for="formation in formations"
                            :key="formation.id"
                            :value="formation.nom"
                        >

                            {{ formation.nom }}

                        </option>


                    </select>


                </div>






                <!-- HORAIRE -->

                <div class="form-group">


                    <label>
                        Horaire souhaité
                    </label>


                    <select>


                        <option value="">
                            Choisir un horaire
                        </option>


                        <option>
                            🌞 Matin (09h00 - 13h00)
                        </option>


                        <option>
                            🌙 Soir (15h00 - 17h00)
                        </option>


                    </select>


                </div>






                <!-- PHOTO -->

                <div class="form-group">


                    <label>
                        Photo d'identité
                    </label>


                    <input 
                        type="file"
                    >


                </div>






                <!-- PIECE IDENTITE -->

                <div class="form-group">


                    <label>
                        Pièce d'identité
                    </label>


                    <input 
                        type="file"
                    >


                </div>



            </div>





            <!-- MOTIVATION -->

            <div class="form-group full">


                <label>
                    Pourquoi souhaitez-vous suivre cette formation ?
                </label>


                <textarea
                    rows="5"
                    placeholder="Expliquez brièvement votre motivation..."
                ></textarea>


            </div>






            <button
                class="btn-inscription"
                type="submit"
            >

                Envoyer ma candidature


            </button>




        </form>


    </div>


</section>


<script setup>

// Formation sélectionnée dans le formulaire

const formationChoisie = ref("");


// Quand le candidat clique sur "Postuler"

function postulerFormation(){

    if(selectedFormation.value){

        formationChoisie.value = selectedFormation.value.nom;

    }


    // fermer le modal

    selectedFormation.value = null;



    // aller vers le formulaire

    setTimeout(()=>{

        document
        .getElementById("inscription")
        .scrollIntoView({

            behavior:"smooth"

        });


    },100);


}
</script>



/*==================================
        INSCRIPTION FORMULAIRE
==================================*/


.inscription{

    padding:90px 0;

    background:#f5f8fc;

}



.inscription .section-title{

    text-align:center;

    margin-bottom:50px;

}



.inscription h2{

    color:#0056b3;

    font-size:2.5rem;

    margin-bottom:15px;

}



.inscription p{

    color:#666;

}




/* CONTENEUR FORMULAIRE */

.inscription-form{

    background:#fff;

    padding:45px;

    border-radius:25px;

    box-shadow:0 15px 40px rgba(0,0,0,.08);

}




/* GRID */

.form-grid{

    display:grid;

    grid-template-columns:repeat(2,1fr);

    gap:25px;

}




/* CHAMP */

.form-group{

    display:flex;

    flex-direction:column;

}



.form-group label{

    margin-bottom:10px;

    font-weight:600;

    color:#333;

}




.form-group input,
.form-group select,
.form-group textarea{


    width:100%;

    padding:15px 18px;

    border:1px solid #ddd;

    border-radius:12px;

    outline:none;

    font-size:1rem;

    transition:.3s;

    background:#fff;


}



.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus{


    border-color:#0056b3;

    box-shadow:0 0 0 3px rgba(0,86,179,.15);


}




/* GRANDE ZONE */

.full{

    margin-top:25px;

}




.form-group textarea{

    resize:none;

}




/* BOUTON */


.btn-inscription{


    display:block;

    margin:40px auto 0;

    background:#0056b3;

    color:white;

    border:none;

    padding:17px 45px;

    border-radius:50px;

    font-size:1.05rem;

    font-weight:600;

    cursor:pointer;

    transition:.3s;

    box-shadow:0 12px 30px rgba(0,86,179,.3);

}



.btn-inscription:hover{

    background:#003f88;

    transform:translateY(-5px);

}



/* FORMATION AUTO SELECTIONNEE */

select option{

    padding:10px;

}




/* RESPONSIVE */

@media(max-width:768px){


    .inscription-form{

        padding:25px;

    }


    .form-grid{

        grid-template-columns:1fr;

    }


    .inscription h2{

        font-size:2rem;

    }


}