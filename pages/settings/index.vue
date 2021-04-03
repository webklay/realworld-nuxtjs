<template>
  <div class="settings-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Your Settings</h1>
          <ul
            v-for="(value, key) in errorText"
            :key="key"
            class="error-messages"
          >
            <li>{{ key }} {{ value }}</li>
          </ul>
          <form @submit.prevent="onSubmit">
            <fieldset>
              <fieldset class="form-group">
                <input
                  v-model="user.image"
                  class="form-control"
                  type="text"
                  placeholder="URL of profile picture"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  v-model="user.username"
                  class="form-control form-control-lg"
                  type="text"
                  placeholder="Your Name"
                />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  v-model="user.bio"
                  class="form-control form-control-lg"
                  rows="8"
                  placeholder="Short bio about you"
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input
                  v-model="user.email"
                  class="form-control form-control-lg"
                  type="text"
                  placeholder="Email"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  v-model="user.password"
                  class="form-control form-control-lg"
                  type="password"
                  placeholder="Password"
                />
              </fieldset>
              <button class="btn btn-lg btn-primary pull-xs-right">
                Update Settings
              </button>
            </fieldset>
          </form>
          <hr>
          <button class="btn btn-outline-danger" @click="loginout">
          Or click here to logout.
        </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { userInfo, updateUserInfo } from "@/api/user";
import { mapState } from "vuex";
const Cookie = process.client ? require("js-cookie") : undefined;
export default {
  middleware: "authenticated",
  name: "SettingsIndex",
  layout: "index",
  async asyncData({ store }) {
    const { data } = await userInfo();
    return {
      user: {
        ...data.user,
        password: "",
      },
      errorText: {},
    };
  },
  head () {
    return {
      title: `Settings - conduit`,
    }
  },
  created() {},
  methods: {
    async onSubmit() {
      try {
        const { data } = await updateUserInfo({ user: this.user });
        this.$store.commit("setUser", data.user);
        Cookie.set("user", data.user);
        this.$router.push("/");
      } catch (error) {
        this.errorText = error.response.data.errors;
        return false;
      }
    },
    loginout() {

      Cookie.remove("user");
      this.$store.commit('setUser', null)
      this.$router.push("/");
    }
  },
};
</script>

<style>
</style>
