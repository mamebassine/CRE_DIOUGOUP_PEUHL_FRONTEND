<template>

<footer class="footer">


    <div class="container">


        <div class="footer-content">


            <!-- Logo + présentation -->

            <div class="footer-section logo-footer">


                <img
                    src="@/assets/images/logo cre.png"
                    alt="Logo CRE"
                    class="footer-logo"
                >


                <h5>
                    CRE DIOUGOUP PEUHL
                </h5>


                <p>
                    Centre de Recherche et d'Essais de Diougoup Peuhl.
                    Formation, innovation et développement numérique.
                </p>


            </div>





            <!-- Contact -->

            <div class="footer-section">


                <h5>
                    Contact
                </h5>


                <p>
                    📧 contact@cre.sn
                </p>


                <p>
                    📞 77 000 00 00
                </p>


                <p>
                    🌐 www.cre.sn
                </p>


            </div>






            <!-- Adresse -->

            <div class="footer-section">


                <h5>
                    Adresse
                </h5>


                <p>
                    📍 Saint-Louis - Sénégal
                </p>


                <p>
                    Centre de Recherche et d'Essais
                </p>


                <p>
                    🕘 Lun - Ven : 08h - 18h
                </p>


            </div>



        </div>


    </div>





    <!-- COPYRIGHT -->


    <div class="copyright">


        © 2026 CRE DIOUGOUP PEUHL - Tous droits réservés


    </div>



</footer>


</template>




   <style scoped>

/************************
 FOOTER GENERAL
************************/

.footer{

    width:100%;

    background:#3B5998;

    color:white;

    margin-top:50px;

    padding-top:45px;

}


/************************
 CONTAINER PLEINE LARGEUR
************************/

.container{

    width:100%;

    max-width:1400px;

    margin:auto;

    padding:0 40px;

}



/************************
 CONTENU FOOTER
************************/

.footer-content{

    width:100%;

    display:flex;

    justify-content:space-between;

    align-items:flex-start;

    gap:80px;

    padding-bottom:40px;

}



/************************
 SECTIONS
************************/

.footer-section{

    flex:1;

}


.logo-footer{

    flex:1.5;

}




.footer-section h5{

    color:white;

    font-size:20px;

    font-weight:700;

    margin-bottom:18px;

}



.footer-section h5::after{

    content:"";

    display:block;

    width:45px;

    height:3px;

    background:#2E7D32;

    margin-top:8px;

}




.footer-section p{

    color:#e8edff;

    font-size:15px;

    line-height:1.8;

    margin:8px 0;

}



/************************
 LOGO
************************/

.footer-logo{

    width:90px;

    height:90px;

    object-fit:contain;

    background:white;

    border-radius:50%;

    padding:5px;

    margin-bottom:12px;

}




/************************
 COPYRIGHT
************************/


.copyright{

    width:100%;

    background:#2E7D32;

    text-align:center;

    padding:15px;

    color:white;

    font-size:14px;

}




/************************
 RESPONSIVE
************************/


@media(max-width:900px){


.footer-content{

    flex-direction:column;

    align-items:center;

    text-align:center;

    gap:35px;

}


.container{

    padding:0 20px;

}



.footer-section h5::after{

    margin:8px auto;

}



.logo-footer{

    align-items:center;

}


}

</style>