<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <FormExample></FormExample>
    <CommunicationExample></CommunicationExample>
  </div>
</template>

<script>
import FormExample from '@/components/form'
import CommunicationExample from '@/components/communication'

export default {
  name: 'App',
  components: {
    FormExample,
    CommunicationExample
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
