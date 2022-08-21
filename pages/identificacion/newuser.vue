<template>
    <div class="d-flex flex-column justify-space-between align-center">
        <v-card width="500" shaped>
            <v-img src="/goodyear.jpg"></v-img>
            <v-card-title>Registro</v-card-title>
            <v-card-text>
                <v-form ref="form" v-model="valid">
                    <v-container>
                        <v-row>
                            <v-col cols="12" md="12">
                                <v-text-field v-model="newUser.name" :rules="nameRules" label="Nombre"></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12" md="12">
                                <v-text-field v-model="newUser.email" :rules="emailRules" label="Correo"></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12" md="6">
                                <v-text-field v-model="newUser.userId" :rules="userIdRules"  label="User Id"></v-text-field>
                            </v-col>
                            <v-col cols="12" md="6">
                                <v-text-field :type="show1 ? 'text' : 'password'" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" @click:append="show1 = !show1" v-model="newUser.password" :counter="15" :rules="passwordRules" label="Password"></v-text-field>
                            </v-col>
                        </v-row>
                    </v-container>

                </v-form>
                <v-divider></v-divider>
            </v-card-text>
            <v-card-actions>
                <v-btn plain :disabled="!valid" @click="register">Registrar</v-btn>
                <v-btn plain @click="reset">Reset</v-btn>
                <v-divider vertical ></v-divider>
                <v-icon right>mdi-login</v-icon>
            </v-card-actions>

        </v-card>
    </div>

</template>

<script>
export default {
    layout: 'user',
    data() {
        return {
            newUser: {
                name:"",
                userId:"",
                email:"",
                password:""
            },
            valid:false,
            nameRules:[v=> !!v || 'Nombre es requerido'],
            emailRules:[v=> !!v || 'Email es requerido', v => /.+@.+/.test(v) || 'Email debe ser valido'],
            passwordRules:[v=> !!v || 'Password es requerido', v=> v.length == 15 || 'Password debe ser de 15 caracteres'],
            userIdRules:[v=> !!v || 'UserId es requerido'],
            show1: false,
        }
    },
    methods: {
        reset() {
            this.newUser = {
                name:"",
                userId:"",
                email:"",
                password:""
            },
            this.$refs.form.resetValidation()
            
        },
        async register(){
            const res = await this.$axios.post("/register", this.newUser)
            if (res.data.status == "success") {
                this.newUser={
                name:"",
                userId:"",
                email:"",
                password:""
                },
                this.$refs.form.resetValidation()
                
            }

        },
    },

}
</script>

<style>
</style>