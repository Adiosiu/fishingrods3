<!-- components/FishCard.vue -->
<template>
    <div class="fish-card">
      <img :src="fish.image" alt="Fish Image" />
      <h2>{{ fish.name }}</h2>
      <p><strong>Habitat:</strong> {{ fish.habitat }}</p>
      <p><strong>Umpan/Makanan:</strong> {{ fish.food }}</p>
    </div>
  </template>
  
  <script>
  export default {
    props: ['fish'],
  };
  </script>
  
  <style scoped>
  .fish-card {
    border: 1px solid #ccc;
    padding: 10px;
    margin: 10px;
    width: 300px;
  }
  img {
    max-width: 100%;
    height: auto;
  }
  </style>

<!-- components/AddFishForm.vue -->
<template>
    <form @submit.prevent="addFish">
      <label for="name">Nama Ikan:</label>
      <input type="text" id="name" v-model="newFish.name" required />
  
      <label for="habitat">Habitat:</label>
      <input type="text" id="habitat" v-model="newFish.habitat" required />
  
      <label for="food">Umpan/Makanan:</label>
      <input type="text" id="food" v-model="newFish.food" required />
  
      <label for="image">URL Gambar Ikan:</label>
      <input type="url" id="image" v-model="newFish.image" required />
  
      <button type="submit">Tambah Ikan</button>
    </form>
  </template>
  
  <script>
  export default {
    data() {
      return {
        newFish: {
          name: '',
          habitat: '',
          food: '',
          image: '',
        },
      };
    },
    methods: {
      addFish() {
        // Kirim data ikan baru ke parent component (misalnya ke App.vue)
        this.$emit('add-fish', this.newFish);
        // Reset form setelah ditambahkan
        this.newFish = {
          name: '',
          habitat: '',
          food: '',
          image: '',
        };
      },
    },
  };
  </script>
  
  <style scoped>
  form {
    display: flex;
    flex-direction: column;
    max-width: 400px;
  }
  label {
    margin-bottom: 5px;
  }
  input, button {
    margin-bottom: 10px;
    padding: 8px;
  }
  button {
    background-color: #007BFF;
    color: white;
    border: none;
    cursor: pointer;
  }
  button:hover {
    background-color: #0056b3;
  }
  </style>
  