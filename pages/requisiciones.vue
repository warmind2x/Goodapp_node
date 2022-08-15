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
                <v-card-title>Nuevo Shopping Cart</v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12" sm="8" md="8"><v-select :items="projects" item-text="nombre" item-value="lcpCode" v-model="newShoppingCart.lcpCode" label="Proyecto"></v-select></v-col>
                            <v-col cols="12" sm="3" md="3"><v-text-field label="Shoppingcart #" v-model="newShoppingCart.shoppingCart"></v-text-field></v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12" sm="8" md="8"><v-text-field label="Descripcion Gasto" v-model="newShoppingCart.descripcionGasto"></v-text-field></v-col>
                            <v-col cols="12" sm="3" md="3"><v-text-field label="Costo" v-model="newShoppingCart.cost"></v-text-field></v-col>
                        </v-row>
                    </v-container>
                </v-card-text>
            </v-card>
        </v-dialog>
    </v-toolbar>
    </template>
    <template v-slot:item.actions="{item}">
        <v-dialog v-model="dialogEdit" width="800">
            <template v-slot:activator="{on, attrs}">
                <v-btn
                color="blue lighten-2"
                small
                v-on="on"
                v-bind="attrs"
                @click="editReq(item)"
                ><v-icon>mdi-pencil</v-icon></v-btn>
            </template>
            <v-card>
                <v-card-title>Editar Shopping Cart</v-card-title>
                <v-card-text>Hola</v-card-text>
                <v-card-actions>f</v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDel" width="600">
            <template v-slot:activator="{on, attrs}">
                <v-btn
                color="red lighten-2"
                small
                v-on="on"
                v-bind="attrs"
                @click="deleteReq(item)"
                ><v-icon>mdi-delete</v-icon></v-btn>
            </template>
            <v-card>
                <v-card-title>Borrar Shopping Cart</v-card-title>
                <v-card-text>Quieres borrar el SC ?</v-card-text>
                <v-card-actions>Borrar</v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog v-model="dialogPo" width="600">
            <template v-slot:activator="{on, attrs}">
                <v-btn
                color="green lighten-2"
                small
                v-on="on"
                v-bind="attrs"
                @click="updatePo(item)"
                ><v-icon>mdi-cash</v-icon></v-btn>
            </template>
            <v-card>
                <v-card-title>Ingrese Orden de Compra</v-card-title>
                <v-card-text>Quieres borrar el SC ?</v-card-text>
                <v-card-actions>Borrar</v-card-actions>
            </v-card>
        </v-dialog>
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
            dialogDel: false,
            dialogEdit:false,
            dialogPo:false,
            newShoppingCart:{
                lcpCode:"",
                descripcionGasto:"",
                fechaGasto:"",
                shoppingCart:null,
                cost:null,
                },
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
        console.log(this.projects);
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
    async updatePo(item){
        
        console.log(item)

    },
    async editReq(item){
        console.log(item)
    },
    async deleteReq(item){
        console.log(item)
    },
    },

}
</script>

<style>

</style>