<template>

<div>


<!-- HERO -->

<section class="contact-hero">

<div class="overlay">

<div class="container text-center text-white">

<h1>
Nous Contacter
</h1>

<p>
Une question ? Une demande d'information ?
Notre équipe est à votre écoute.
</p>

</div>

</div>

</section>





<!-- CARTES CONTACT -->

<section class="container py-5">

<div class="row g-4">


<!-- Adresse -->

<div class="col-md-4">

<div class="contact-card">


<div class="icon">

<i class="bi bi-geo-alt"></i>

</div>


<h4>
Adresse
</h4>


<p>
Centre de Recherche et d'Essais
<br>
Diougoup Peuhl, Sénégal
</p>


<a href="#" class="card-btn">

Localisation

<i class="bi bi-arrow-right"></i>

</a>


</div>

</div>





<!-- Téléphone -->

<div class="col-md-4">

<div class="contact-card">


<div class="icon">

<i class="bi bi-telephone"></i>

</div>


<h4>
Téléphone
</h4>


<p>
+221 77 000 00 00
</p>


<a href="tel:+221770000000" class="card-btn">

Appeler

<i class="bi bi-telephone"></i>

</a>


</div>

</div>






<!-- Email -->

<div class="col-md-4">

<div class="contact-card">


<div class="icon">

<i class="bi bi-envelope-fill"></i>

</div>


<h4>
Email
</h4>


<p>
contact@cre.sn
</p>


<a href="mailto:contact@cre.sn" class="card-btn">

Email

<i class="bi bi-send"></i>

</a>


</div>

</div>



</div>

</section>








<!-- FORMULAIRE -->


<section class="contact-section">


<div class="container">


<div class="row align-items-center g-5">



<div class="col-lg-5">


<h2>
Parlons ensemble
</h2>


<p>

Vous souhaitez obtenir plus d'informations sur nos formations,
nos activités ou nos services ?

Notre équipe vous accompagne.

</p>



<div class="contact-info">


<div>

<i class="bi bi-clock"></i>

Horaires : Lundi - Vendredi 08h - 17h

</div>



<div>

<i class="bi bi-building"></i>

Centre de Recherche et d'Essais

</div>


<div>

<i class="bi bi-envelope"></i>

contact@cre.sn

</div>


</div>


</div>







<div class="col-lg-7">


<form class="contact-form">


<h3>

<i class="bi bi-chat-dots"></i>

Envoyer un message

</h3>



<div class="row">


<div class="col-md-6 mb-3 input-group-custom">


<i class="bi bi-person"></i>


<input
type="text"
class="form-control"
placeholder="Votre nom"
>


</div>




<div class="col-md-6 mb-3 input-group-custom">


<i class="bi bi-envelope"></i>


<input
type="email"
class="form-control"
placeholder="Votre email"
>


</div>



</div>






<div class="input-group-custom mb-3">


<i class="bi bi-pencil"></i>


<input
type="text"
class="form-control"
placeholder="Sujet"
>


</div>






<div class="input-group-custom mb-4">


<i class="bi bi-chat-left-text"></i>


<textarea
class="form-control"
rows="5"
placeholder="Votre message">
</textarea>


</div>





<button class="btn-send">

Envoyer le message

<i class="bi bi-send"></i>

</button>



</form>


</div>



</div>


</div>


</section>








<!-- RESEAUX SOCIAUX -->


<section class="social-section">


<div class="container text-center">


<h2>
Nos réseaux sociaux
</h2>


<p>
Suivez toutes nos actualités.
</p>



<div class="social-links">


<a href="#">
<i class="fab fa-facebook-f"></i>
</a>


<a href="#">
<i class="fab fa-linkedin-in"></i>
</a>


<a href="#">
<i class="fab fa-instagram"></i>
</a>


<a href="#">
<i class="fab fa-whatsapp"></i>
</a>


<a href="#">
<i class="fab fa-youtube"></i>
</a>


</div>


</div>


</section>







<!-- MAP -->


<section class="map-section">


<div class="container">


<h2 class="text-center mb-4">

Notre localisation

</h2>



<div class="map">


<iframe

src="https://www.google.com/maps?q=Diougoup%20Peuhl%20Senegal&output=embed"

width="100%"

height="450"

style="border:0"

loading="lazy"

allowfullscreen>

</iframe>


</div>


</div>


</section>




</div>

</template>





<style scoped>


/* ================= HERO ================= */


.contact-hero{

height:350px;

background:url("https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=1800")

center/cover no-repeat;

}



.overlay{

height:100%;

display:flex;

align-items:center;

justify-content:center;

background:linear-gradient(
135deg,
rgba(59,89,152,.90),
rgba(46,125,50,.85)
);

}



.contact-hero h1{

font-size:55px;

font-weight:900;

color:#FFFFFF;

}



.contact-hero p{

font-size:20px;

color:#FFFFFF;

max-width:700px;

margin:auto;

}






/* ================= CARTES CONTACT ================= */


.contact-card{

background:#FFFFFF;

padding:35px;

border-radius:22px;

text-align:center;

height:100%;

cursor:pointer;

box-shadow:
0 10px 30px rgba(59,89,152,.15);

transition:.4s ease;

}



.contact-card:hover{

transform:translateY(-15px);

box-shadow:
0 25px 50px rgba(59,89,152,.30);

}






/* ================= ICONES ================= */


.icon{

width:80px;

height:80px;

border-radius:50%;


margin:0 auto 20px;


display:flex;

align-items:center;

justify-content:center;


background:#3B5998;


transition:.5s;


box-shadow:
0 10px 25px rgba(59,89,152,.25);

}



.contact-card:hover .icon{

background:#2E7D32;

transform:
scale(1.1)
rotateY(360deg);

}



.icon i{

font-size:32px;

color:#FFFFFF;

}






.contact-card h4{

color:#3B5998;

font-weight:800;

}



.contact-card p{

color:#1F2937;

line-height:1.7;

}






/* ================= BOUTONS CARTES ================= */


.card-btn{

background:#3B5998;

color:#FFFFFF;

padding:12px 25px;

border-radius:30px;

text-decoration:none;

display:inline-flex;

align-items:center;

gap:8px;

transition:.3s;

}



.card-btn:hover{

background:#2E7D32;

color:#FFFFFF;

transform:translateY(-3px);

}








/* ================= SECTION FORMULAIRE ================= */


.contact-section{

background:#F8FAFC;

padding:80px 0;

}



.contact-section h2{

color:#3B5998;

font-size:40px;

font-weight:900;

}



.contact-section p{

color:#1F2937;

line-height:1.8;

}






/* ================= INFORMATIONS ================= */


.contact-info div{

margin:18px 0;

font-weight:600;

color:#1F2937;

}



.contact-info i{

color:#3B5998;

margin-right:12px;

font-size:22px;

}





/* ================= FORMULAIRE ================= */


.contact-form{

background:#FFFFFF;

padding:40px;

border-radius:25px;


box-shadow:

0 20px 50px rgba(59,89,152,.15);

}



.contact-form h3{

color:#3B5998;

font-weight:800;

margin-bottom:30px;

}



.contact-form h3 i{

color:#2E7D32;

}






.input-group-custom{

position:relative;

}



.input-group-custom i{

position:absolute;

left:18px;

top:50%;

transform:translateY(-50%);

color:#3B5998;

font-size:20px;

z-index:2;

}



.form-control{

padding:

15px 
15px 
15px 
50px;


border-radius:15px;


border:1px solid #ddd;


color:#1F2937;

}



.form-control:focus{

border-color:#3B5998;


box-shadow:

0 0 0 3px rgba(59,89,152,.15);

}






/* ================= BOUTON ENVOYER ================= */


.btn-send{

background:#3B5998;

color:#FFFFFF;

border:none;

padding:15px 35px;

border-radius:30px;

font-weight:700;

transition:.3s;

}



.btn-send:hover{

background:#2E7D32;

transform:translateY(-5px);

}








/* ================= RESEAUX SOCIAUX ================= */


.social-section{

padding:70px 0;

background:#FFFFFF;

}



.social-section h2{

color:#3B5998;

font-weight:900;

}



.social-section p{

color:#1F2937;

}




.social-links{

display:flex;

justify-content:center;

gap:20px;

margin-top:30px;

}





.social-links a{

width:60px;

height:60px;

border-radius:50%;


background:#3B5998;


color:#FFFFFF;


display:flex;

align-items:center;

justify-content:center;


font-size:28px;


transition:.4s;


box-shadow:

0 10px 25px rgba(59,89,152,.20);

}





.social-links a:hover{

background:#2E7D32;

transform:

translateY(-10px)
scale(1.1);

}




.social-links i{

color:#FFFFFF;

}









/* ================= MAP ================= */


.map{

border-radius:20px;

overflow:hidden;


box-shadow:

0 15px 40px rgba(59,89,152,.20);

}







/* ================= RESPONSIVE ================= */


@media(max-width:768px){


.contact-hero h1{

font-size:35px;

}



.contact-hero{

height:260px;

}


.contact-form{

padding:25px;

}


.contact-section h2{

font-size:32px;

}


}



</style>




