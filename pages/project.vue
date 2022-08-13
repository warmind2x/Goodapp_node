<template>
  <div>
    <v-simple-table>
        <template v-slot:default>
            <thead>
            <tr>
                <th class="text-left">LCP Code</th>
                <th class="text-left">Nombre</th>
                <th class="text-left">Fecha Creacion</th>
                <th class="text-left">Acciones</th>
            </tr>
            </thead>
            <tbody>
                <tr v-for="project in projects" :key="project.lcpCode">
                    <td>{{project.lcpCode}}</td>
                    <td>{{project.nombre}}</td>
                    <td>{{project.created}}</td>
                    <td><v-dialog
                            v-model="dialog"
                            width="600">
                            <template v-slot:activator="{on,attrs}">
                                <v-btn color="red lighten-2" dark v-bind="attrs" v-on="on">Ver requisiciones</v-btn>
                            </template>
                            <v-card>
                                <v-card-title>Requisiciones</v-card-title>
                                <v-card-text>
                                    <v-simple-table>
                                        <thead>
                                            <tr>
                                                <th class="text-left">Shopping Cart</th>
                                                <th class="text-left">Nombre</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>{{project.lcpCode}}</td>
                                            </tr>
                                        </tbody>
                                    </v-simple-table>
                                </v-card-text>
                            </v-card>
                        
                        </v-dialog></td>


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

        }
    },
    created () {
        this.get_project();
    },
    methods: {
        async get_project() {
            const axiosHeaders = {
                headers:{
                    userId: "ZA51560"
                },
            };

            try {
                const res = await this.$axios.get("/project",axiosHeaders);
                this.projects = res.data.data
                console.log(res.data)
                
            } catch (error) {
                console.log(error)
            }
            
        },
        showReq(item){
            const project = item

            console.log(project)
        },
    },

}
</script>

<style>

</style>