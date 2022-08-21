<template>
  <div class="d-flex flex-column justify-space-between align-center">
        <v-card width="500" shaped>
            <v-img src="/goodyear.jpg"></v-img>
            <v-card-title>Login</v-card-title>
            <v-card-text>
                <v-form ref="login" v-model="valid">
                    <v-container>
                        
                        <v-row>
                            <v-col cols="12" md="6">
                                <v-text-field v-model="user.userId"  label="User Id"></v-text-field>
                            </v-col>
                            <v-col cols="12" md="6">
                                <v-text-field :type="show1 ? 'text' : 'password'" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" @click:append="show1 = !show1" v-model="user.password"  label="Password"></v-text-field>
                            </v-col>
                        </v-row>
                    </v-container>

                </v-form>
                <v-divider></v-divider>
            </v-card-text>
            <v-card-actions>
                <v-btn plain :disabled="!valid" @click="login">Entrar</v-btn>
                <v-btn plain @click="reset">Reset</v-btn>
                <v-divider vertical ></v-divider>
                <v-icon right>mdi-account-plus</v-icon>
            </v-card-actions>

        </v-card>
    </div>
</template>

<script>
export default {
    layout:'user',
    data() {
        return {
            valid: false,
            show1:false,
            user:{
                userId:"",
                password:""
            },

        }
    },
    methods: {
        reset() {
            this.$refs.login.reset()
        },
        async login(){
             const res = await this.$axios.post("/login", this.user)
             console.log(res)
             if (res.data.status == "success") {
                console.log(res.data)
             }
        }
    },

}
</script>

<style>

</style>