<template>

<div>


<!-- ================= HERO ================= -->

<section class="actualite-hero">

<div class="overlay">


<div class="container text-center text-white">


<h1>
Nos Actualités
</h1>


<p>
Découvrez les dernières nouvelles, formations,
événements et activités du Centre de Recherche et d'Essais.
</p>


</div>


</div>

</section>







<!-- ================= ACTUALITES ================= -->


<section class="container py-5">


<div class="text-center mb-5">


<h2>
Dernières actualités
</h2>


<p>
Suivez les activités et les moments importants du CRE.
</p>


</div>





<div class="row g-4">





<!-- Article 1 -->


<div class="col-md-4">


<div class="article-card">



<img 
src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=900"
>



<div class="article-content">


<span>

<i class="bi bi-calendar"></i>

12 Juillet 2026

</span>



<h4>
Nouvelle session de formation numérique
</h4>



<p>

Le CRE lance une nouvelle session de formation
dans les métiers du numérique et du développement web.

</p>



<a href="#" class="read-btn">

Lire plus

<i class="bi bi-arrow-right"></i>

</a>


</div>


</div>


</div>








<!-- Article 2 -->


<div class="col-md-4">


<div class="article-card">



<img 
src="https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=900"
>



<div class="article-content">


<span>

<i class="bi bi-calendar"></i>

05 Juillet 2026

</span>



<h4>
Atelier entrepreneuriat et innovation
</h4>



<p>

Un atelier destiné à accompagner les jeunes
dans la création de projets innovants.

</p>



<a href="#" class="read-btn">

Lire plus

<i class="bi bi-arrow-right"></i>

</a>


</div>


</div>


</div>








<!-- Article 3 -->


<div class="col-md-4">


<div class="article-card">



<img 
src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=900"
>



<div class="article-content">


<span>

<i class="bi bi-calendar"></i>

28 Juin 2026

</span>



<h4>
Vie du centre et collaborations
</h4>



<p>

Découvrez les rencontres, projets et collaborations
réalisés au sein du centre.

</p>



<a href="#" class="read-btn">

Lire plus

<i class="bi bi-arrow-right"></i>

</a>


</div>


</div>


</div>





</div>


</section>









<!-- ================= DOMAINES ================= -->


<section class="domain-section">


<div class="container">


<h2 class="text-center mb-5">

Nos domaines d'activités

</h2>




<div class="row g-4">



<div class="col-md-3">


<div class="domain-card">

<i class="bi bi-code-slash"></i>

<h5>
Développement Web
</h5>

</div>


</div>




<div class="col-md-3">


<div class="domain-card">

<i class="bi bi-phone"></i>

<h5>
Technologies mobiles
</h5>

</div>


</div>





<div class="col-md-3">


<div class="domain-card">

<i class="bi bi-lightbulb"></i>

<h5>
Innovation
</h5>

</div>


</div>





<div class="col-md-3">


<div class="domain-card">

<i class="bi bi-rocket"></i>

<h5>
Entrepreneuriat
</h5>

</div>


</div>



</div>


</div>


</section>









<!-- ================= EVENEMENTS ================= -->


<section class="container py-5">


<div class="event-box">


<div>

<i class="bi bi-megaphone-fill"></i>

</div>


<div>


<h3>
Événements à venir
</h3>


<p>

Retrouvez prochainement nos formations,
ateliers, conférences et rencontres professionnelles.

</p>


</div>



</div>


</section>








<!-- ================= NEWSLETTER ================= -->


<section class="newsletter">


<div class="container text-center">


<h2>
Restez informé
</h2>


<p>
Recevez nos dernières actualités.
</p>



<div class="newsletter-form">


<input 
type="email"
placeholder="Votre adresse email"
>


<button>

S'inscrire

</button>


</div>


</div>


</section>





</div>

</template>





<script setup>


</script>







<style scoped>



/* HERO */


.actualite-hero{

height:350px;

background:url("https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1800")

center/cover;

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



.actualite-hero h1{

font-size:55px;

font-weight:900;

}





.actualite-hero p{

font-size:20px;

max-width:700px;

margin:auto;

}







/* ARTICLES */


h2{

color:#3B5998;

font-weight:900;

}



.article-card{

background:white;

border-radius:22px;

overflow:hidden;

box-shadow:

0 15px 35px rgba(59,89,152,.15);

transition:.4s;

height:100%;

}



.article-card:hover{

transform:translateY(-12px);

}



.article-card img{

width:100%;

height:220px;

object-fit:cover;

}



.article-content{

padding:25px;

}



.article-content span{

color:#2E7D32;

font-weight:600;

}



.article-content h4{

color:#3B5998;

font-weight:800;

margin-top:15px;

}



.article-content p{

color:#1F2937;

line-height:1.7;

}



.read-btn{

display:inline-flex;

gap:8px;

background:#3B5998;

color:white;

padding:10px 22px;

border-radius:30px;

text-decoration:none;

}



.read-btn:hover{

background:#2E7D32;

}







/* DOMAINES */


.domain-section{

background:#F8FAFC;

padding:80px 0;

}



.domain-card{

background:white;

padding:30px;

border-radius:20px;

text-align:center;

box-shadow:0 10px 25px rgba(0,0,0,.08);

transition:.3s;

}



.domain-card:hover{

transform:translateY(-10px);

}



.domain-card i{

font-size:40px;

color:#3B5998;

}





/* EVENEMENT */


.event-box{

background:#3B5998;

color:white;

padding:35px;

border-radius:25px;

display:flex;

gap:25px;

align-items:center;

}



.event-box i{

font-size:45px;

color:#FFFFFF;

}






/* NEWSLETTER */


.newsletter{

background:#F8FAFC;

padding:70px 0;

}



.newsletter-form{

display:flex;

justify-content:center;

gap:10px;

margin-top:30px;

}



.newsletter-form input{

padding:15px;

width:350px;

border-radius:30px;

border:1px solid #ddd;

}



.newsletter-form button{

background:#2E7D32;

color:white;

border:none;

padding:15px 30px;

border-radius:30px;

}





@media(max-width:768px){


.actualite-hero h1{

font-size:35px;

}


.newsletter-form{

flex-direction:column;

}


.newsletter-form input{

width:100%;

}


}



</style>