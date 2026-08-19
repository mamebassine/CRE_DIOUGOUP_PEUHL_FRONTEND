<script setup>


defineProps({

    inscriptions:{
        type:Array,
        default:()=>[]
    }

});


defineEmits([

    "voir",

    "modifier",

    "supprimer"

]);


</script>



<template>


<table border="1" width="100%">


<thead>

<tr>

<th>
Apprenant
</th>


<th>
Formation
</th>


<th>
Horaire
</th>


<th>
Statut
</th>


<th>
Etat
</th>


<th>
Actions
</th>


</tr>


</thead>




<tbody>


<tr

v-for="inscription in inscriptions"

:key="inscription.id"

>


<td>

{{ inscription.apprenant?.user?.prenom }}
{{ inscription.apprenant?.user?.nom }}

</td>



<td>

{{ inscription.formation?.nom }}

</td>




<td>

{{ inscription.horaire }}

</td>



<td>

{{ inscription.statut }}

</td>




<td>

{{ inscription.etat_formation }}

</td>




<td>


<button

@click="$emit('voir', inscription.id)"

>

Voir

</button>




<button

@click="$emit('modifier', inscription.id)"

>

Modifier

</button>




<button

@click="$emit('supprimer', inscription.id)"

>

Supprimer

</button>



</td>



</tr>



</tbody>


</table>


</template>