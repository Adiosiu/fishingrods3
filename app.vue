<template>
  <div>
  <template>
  <div>
    <h1>Daftar Ikan</h1>
    <ul>
      <li v-for="(fish, index) in fishList" :key="index">
        <strong>Nama:</strong> {{ fish.name }} <br>
        <strong>Habitat:</strong> {{ fish.habitat }} <br>
        <strong>Umpan/Makanan:</strong> {{ fish.food }} <br>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  computed: {
    fishList() {
      return this.$store.state.fish
    }
  }
}
</script>

<template>
  <div>
    <FishList />
    <nuxt-link to="/add-fish">Tambah Ikan</nuxt-link>
  </div>
</template>

<script>
import FishList from '~/components/FishList.vue'

export default {
  components: {
    FishList
  }
}
</script>

<style scoped>
/* Tambahkan gaya yang diinginkan */
</style>


<style scoped>
/* Tambahkan gaya yang diinginkan */
</style>

<template>
  <form @submit.prevent="addFish">
    <div>
      <label for="name">Nama Ikan:</label>
      <input type="text" v-model="fish.name" required />
    </div>
    <div>
      <label for="habitat">Habitat:</label>
      <input type="text" v-model="fish.habitat" required />
    </div>
    <div>
      <label for="food">Umpan/Makanan:</label>
      <input type="text" v-model="fish.food" required />
    </div>
    <button type="submit">Tambah Ikan</button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      fish: {
        name: '',
        habitat: '',
        food: ''
      }
    }
  },
  methods: {
    addFish() {
      this.$store.dispatch('addFish', this.fish)
      this.fish = { name: '', habitat: '', food: '' }
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
/* Tambahkan gaya yang diinginkan */
</style>

  </div>
</template>
