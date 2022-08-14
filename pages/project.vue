<template>
  <div>
    <v-simple-table>
        <template v-slot:top>
            <v-toolbar flat>
                <v-toolbar-title>Proyectos</v-toolbar-title>
                <v-divider inset vertical class="mx-4"></v-divider>
                <v-spacer></v-spacer>
           <v-dialog
            v-model="dialogCreate"
            width="800">
            <template v-slot:activator="{on, attrs}">
                <v-btn color="blue lighten-2" dark v-bind="attrs" v-on="on" >Nuevo Proyecto</v-btn>
            </template>
            <v-card>
                <v-card-title>Nuevo Proyecto</v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12" sm="6" md="4"> <v-text-field v-model="newProject.lcpCode" label="Lcp Code"></v-text-field></v-col>
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
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">LCP Code</th>
            <th class="text-left">Tipo de Proyecto</th>
            <th class="text-left">Categoria</th>
            <th class="text-left">Nombre</th>
            <th class="text-left">Locacion</th>
            <th class="text-left">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="project in projects" :key="project.lcpCode">
            <td>{{ project.lcpCode }}</td>
            <td>{{ project.type }}</td>
            <td>{{ project.projectType }}</td>
            <td>{{ project.nombre }}</td>
            <td>{{ project.locacion }}</td>
            <td>
              
              <v-dialog v-model="dialogEdit" width="600">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    color="blue lighten-2"
                    dark
                    v-bind="attrs"
                    v-on="on"
                    @click="editedProject(project)"
                    small
                    ><v-icon dark>mdi-wrench</v-icon></v-btn
                  >
                </template>
                <v-card>
                <v-card-title>Editar Proyecto</v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12" sm="6" md="4"> <v-text-field v-model="editProject.lcpCode" label="Lcp Code"></v-text-field></v-col>
                            <v-col cols="12" sm="6" md="4"> <v-select :items="type" label="Tipo Proyecto" v-model="editProject.type"></v-select></v-col>
                            <v-col cols="12" sm="6" md="4"> <v-select :items="projectType" label="Categoria" v-model="editProject.projectType"></v-select></v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12" sm="6" md="4"> <v-select :items="locations" label="Localizacion" v-model="editProject.locacion"></v-select></v-col>
                            <v-col cols="12" sm="6" md="8"> <v-text-field v-model="editProject.nombre" label="Nombre"></v-text-field></v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12" sm="3" md="3"> <v-text-field v-model="editProject.capital" label="Capital USD"></v-text-field></v-col>
                            <v-col cols="12" sm="3" md="3"> <v-text-field v-model="editProject.grafoCap" label="Grafo Capital"></v-text-field></v-col>
                            <v-col cols="12" sm="3" md="3"> <v-text-field v-model="editProject.expenses" label="Expense USD"></v-text-field></v-col>
                            <v-col cols="12" sm="3" md="3"> <v-text-field v-model="editProject.grafoExp" label="Grafo Expense"></v-text-field></v-col>
                        </v-row>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-btn plain @click="updateProject">Modificar</v-btn>
                    <v-btn plain @click="closeProject">Cancelar</v-btn>
                </v-card-actions>
            </v-card>
              </v-dialog>
              <v-dialog v-model="dialogDelete" width="600" :retain-focus="false">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    color="red lighten-2"
                    dark
                    v-bind="attrs"
                    v-on="on"
                    @click="showReq(project)"
                    small
                    ><v-icon dark>mdi-delete</v-icon></v-btn
                  >
                </template>
                <v-card>
                  <v-card-title>Borrar</v-card-title>
                  <v-card-text>
                    Seguro que quiere borrar este Proyecto?
                  </v-card-text>
                  <v-divider></v-divider>
                  <v-card-actions>
                    <v-btn plain @click="borrar(project)">Borrar</v-btn>
                    <v-btn plain @click="cerrar">Cancelar</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <v-dialog v-model="dialog" width="600">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    color="green lighten-2"
                    dark
                    v-bind="attrs"
                    v-on="on"
                    @click="showReq(project)"
                    small
                    ><v-icon dark>mdi-cash</v-icon></v-btn
                  >
                </template>
                <v-card>
                  <v-card-title>Requisiciones</v-card-title>
                  <v-card-text>
                    <v-simple-table>
                      <thead>
                        <tr>
                          <th class="text-left">Shopping Cart</th>
                          <th class="text-left">Nombre</th>
                          <th class="text-left">Costo</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          v-for="requisicion in requisiciones"
                          :key="requisicion.shoppingCart"
                        >
                          <td>{{ requisicion.shoppingCart }}</td>
                          <td>{{ requisicion.descripcionGasto }}</td>
                          <td>{{ requisicion.cost }}</td>
                        </tr>
                      </tbody>
                    </v-simple-table>
                  </v-card-text>
                </v-card>
              </v-dialog>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      projects: [],
      dialog: false,
      dialogDelete: false,
      dialogCreate:false,
      dialogEdit:false,
      requisiciones: [],
      newProject:{
        lcpCode:null,
        type: null,
        capital: null,
        expenses: null,
        grafoCap: null,
        grafoExp: null,
        locacion: null,
        projectType: null,
        nombre: null,
        status:null
      },
      editProject:{
        lcpCode:null,
        type: null,
        capital: null,
        expenses: null,
        grafoCap: null,
        grafoExp: null,
        locacion: null,
        projectType: null,
        nombre: null,
        status:null
      },
      type:['Expenses','Capital','Miscelaneo'],
      projectType:['Sustaining', 'EHS', 'Growth', 'Savings'],
      locations:['Vulcanizacion', 'Mixer', 'Final Finish', 'Construccion','Apexer', 'SSEE', 'Casa de maquina']
    };
  },
  created() {
    this.get_project();
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
    showReq(item) {
      const project = item;
      this.requisiciones = project.requisiciones;

      console.log(project.requisiciones);
    },
    cerrar() {
      this.dialogDelete = false;
    },
    closeProject(){
        this.dialogEdit = false
    },
    async borrar(item) {
      const project = item;
      const axiosHeaders = {
        headers: {
          userId: "ZA51560",
        },
        params: {
          lcpCode: project.lcpCode,
        },
      };
      console.log(axiosHeaders);

      try {
        const res = await this.$axios.delete("/project", axiosHeaders);
        if (res.data.status == "success") {
          this.dialogDelete = false;
          this.get_project();
        }
      } catch (error) {
        console.log(error);
      }
    },
    async crearProyecto(){
        const axiosHeaders = {
            headers:{
                userId:'ZA51560'
            }
            
        };
        const toSend ={
            newProject: this.newProject
        };

        try {
            const res = await this.$axios.post("/project", toSend, axiosHeaders)
            console.log(res)
            if (res.data.status == "success") {
                console.log('hola')
                this.dialogCreate = false
                this.newProject ={
                    lcpCode:null,
        type: null,
        capital: null,
        expenses: null,
        grafoCap: null,
        grafoExp: null,
        locacion: null,
        projectType: null,
        nombre: null,
        status:null
                }
                this.get_project()
            }
        } catch (error) {
            console.error(error)
        }



    },
    editedProject(item){
        this.editProject = item
    },
    async updateProject(){
        const axiosHeaders = {
            headers:{
                userId:'ZA51560'
            }
        };
        const toSend = {
            editedProject:this.editProject
        };

        const res = await this.$axios.put("/project", toSend, axiosHeaders)
        if (res.data.status == "success") {
            this.dialogEdit = false
            this.get_project()
        }

    },
    
  },
};
</script>

<style></style>
