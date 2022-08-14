<template>
  <v-data-table
  :headers="cabecera"
  :items="requisiciones"
  sort-by="lcpCode"
  class="elevation-1">
  <template v-slot:top>
    <v-toolbar flat>
        <v-toolbar-title>Shopping Carts</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialogReq" max-width="800">
            <template v-slot:activator="{on, attrs}">
                <v-btn
                color="blue"
                dark
                class="mb-2"
                v-bind="attrs"
                v-on="on"> Nuevo Shopping Cart</v-btn>

            </template>
            <v-card>
                <v-card-title>Nuevo shoppingCart</v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12" sm="6" md="4"> <v-text-field v-model="shoppingCart.lcpCode" label="Lcp Code"></v-text-field></v-col>
                            <v-col cols="12" sm="6" md="4"> <v-select :items="type" label="Tipo Proyecto" v-model="newProject.type"></v-select></v-col>
                            <v-col cols="12" sm="6" md="4"> <v-select :items="projectType" label="Categoria" v-model="newProject.projectType"></v-select></v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12" sm="6" md="4"> <v-select :items="locations" label="Localizacion" v-model="newProject.locacion"></v-select></v-col>
                            <v-col cols="12" sm="6" md="8"> <v-text-field v-model="newProject.nombre" label="Nombre"></v-text-field></v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12" sm="3" md="3"> <v-text-field v-model="newProject.capital" label="Capital USD"></v-text-field></v-col>
                            <v-col cols="12" sm="3" md="3"> <v-text-field v-model="newProject.grafoCap" label="Grafo Capital"></v-text-field></v-col>
                            <v-col cols="12" sm="3" md="3"> <v-text-field v-model="newProject.expenses" label="Expense USD"></v-text-field></v-col>
                            <v-col cols="12" sm="3" md="3"> <v-text-field v-model="newProject.grafoExp" label="Grafo Expense"></v-text-field></v-col>
                        </v-row>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-btn plain @click="crearProyecto">Crear</v-btn>
                    <v-btn plain>Cancelar</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-toolbar>
    </template>
    <template v-slot:item.actions="{item}">
        <v-icon
        small
        class="mr-2"
        >mdi-pencil</v-icon>
        <v-icon
        small
        class="mr-2"
        >mdi-delete</v-icon>
        <v-icon
        small
        class="mr-2"
        @click="createPo(item)"
        >mdi-cash</v-icon>
    </template>
    

  </v-data-table>
</template>

<script>
export default {
    data() {
        return {
            projects: [],
            shoppingCart:{
                shoppingCart:null,
                lcpCode:null,
                descripcionGasto:null,
                cost:null,
                fechaGasto:null
            },
            requisiciones:[],
            dialogReq: false,
            dialog:false,
            dialog_updatePo: false,
            cabecera:[
                {text: "Proyecto",
                align: 'start',
                sortable: true,
                value:'nombreProyecto'},
                {text:'Shopping Cart', value:'shoppingCart'},
                {text:'Orden de Compra', value:'ordenCompra'},
                {text:'Descripcion de gasto', value:'descripcionGasto'},
                {text:'Costo USD', value:'cost'},
                {text:'Acciones', value:'actions', sortable: false},

            ]
        }
    },
    created () {
        this.get_project();
        this.get_req();
    },
    methods: {
        async get_project() {
      const axiosHeaders = {
        headers: {
          userId: "ZA51560",
        },
      };

      try {
        const res = await this.$axios.get("/project", axiosHeaders);
        this.projects = res.data.data;
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    },
    async get_req() {
      const axiosHeaders = {
        headers: {
          userId: "ZA51560",
        },
      };

      try {
        const res = await this.$axios.get("/requisiciones", axiosHeaders);
        this.requisiciones = res.data.data;
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    },
    async createPo(item){
        this.dialogReq = true
        console.log(item)

    }
    },

}
</script>

<style>

</style>