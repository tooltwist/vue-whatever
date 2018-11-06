<template lang="pug">
  div
    .tt-property-header Whatever
    .c-element-properties
      .tt-property
        .c-property-label Message
        .c-property-value
          input.input(v-model="message")
</template>

<script>
import PropertyMixins from '../../mixins/PropertyMixins'

export default {
  name: 'content-whatever-props',
  mixins: [ PropertyMixins ],
  computed: {

    // We cannot update the element directly - it is stored
    // in this.$store and must be updated with a 'commit'.
    // See https://vuex.vuejs.org/en/forms.html
    message: {
      get () {
        let value = this.element['message']
        return value ? value : ''
      },
      set (value) {
        this.$content.setProperty({ vm: this, element: this.element, name: 'message', value })
      }
    },
  },
}
</script>

<style lang="scss" scoped>
  .c-property-value {
    input.input {
      margin-top: 2px;
      font-size: 9px;
    }
  }

  .my-button {
    position: absolute;
    right: 5px;
    cursor: pointer;
  }

</style>
