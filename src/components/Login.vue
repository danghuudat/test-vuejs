<template>
  <div>
    <b-form @submit="onSubmit" @reset="onReset">
      <b-form-group
        id="input-group-1"
        label="Email address:"
        label-for="input-1"
        description="We'll never share your email with anyone else."
      >
        <b-form-input
          id="input-1"
          v-model="form.email"
          type="email"
          placeholder="Enter email"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Your Name:" label-for="input-2">
        <b-form-input
          id="input-2"
          type="password"
          v-model="form.password"
          placeholder="Enter name"
          required
        ></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
  </div>
</template>

<script>

import { LOGIN } from "../core/services/store/auth.module";


export default {
  data() {
    return {
      form: {
        email: 'danghuudat19@gmail.com',
        password: 'password',
      },
    }
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();
      this.$store
        .dispatch(LOGIN, this.form)
        .then(data => {
          console.log(data)
          this.$router.push({name: "SecondComponent", params: {hocluc: 0}})
        }).catch(err => {
          console.log(err)
      });
    },
    onReset(event) {
      event.preventDefault()
      // Reset our form values
      this.form.email = ''
      this.form.password = ''
      // Trick to reset/clear native browser form validation state

    }
  }
}
</script>
