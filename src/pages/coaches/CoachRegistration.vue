<template>
  <section>
    <base-card>
      <h2>Register as a coach now!</h2>
      <coach-form @save-data="saveData"></coach-form>
    </base-card>
  </section>
</template>

<script>
import BaseCard from '../../components/base/BaseCard.vue';
import CoachForm from '../../components/coaches/CoachForm.vue';
export default {
  components: {
    CoachForm,
    BaseCard,
  },
  methods: {
    saveData(data) {
        this.$store.dispatch('coaches/registerCoach', data);

        this.$router.replace('/coaches');
    }
  },
};
</script>