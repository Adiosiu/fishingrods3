<template>
    <div id="app">
      <header>
        <h1>Informasi Ikan</h1>
      </header>
      <main>
        <div v-if="showAddForm">
          <h2>Tambah Ikan Baru</h2>
          <form @submit.prevent="addFish">
            <label for="name">Nama Ikan:</label>
            <input type="text" id="name" v-model="newFish.name" required>
            <label for="habitat">Habitat:</label>
            <input type="text" id="habitat" v-model="newFish.habitat" required>
            <label for="food">Umpan/Makanan:</label>
            <input type="text" id="food" v-model="newFish.food" required>
            <button type="submit">Tambahkan</button>
          </form>
        </div>
  
        <div v-if="fishList.length > 0">
          <h2>Daftar Ikan</h2>
          <ul>
            <li v-for="(fish, index) in fishList" :key="index">
              <h3>{{ fish.name }}</h3>
              <p><strong>Habitat:</strong> {{ fish.habitat }}</p>
              <p><strong>Umpan/Makanan:</strong> {{ fish.food }}</p>
            </li>
          </ul>
        </div>
        <div v-else>
          <p>Tidak ada data ikan.</p>
        </div>
  
        <button @click="toggleAddForm">Tambah Ikan Baru</button>
      </main>
    </div>
  </template>
  
  <script>
  export default {
    name: 'App',
    data() {
      return {
        showAddForm: false,
        newFish: {
          name: '',
          habitat: '',
          food: ''
        },
        fishList: [
          { name: 'Ikan Nemo', habitat: 'Lautan tropis', food: 'Plankton' },
          { name: 'Ikan Koi', habitat: 'Kolam taman', food: 'Pelet ikan' }
        ]
      };
    },
    methods: {
      toggleAddForm() {
        this.showAddForm = !this.showAddForm;
      },
      addFish() {
        this.fishList.push({
          name: this.newFish.name,
          habitat: this.newFish.habitat,
          food: this.newFish.food
        });
        this.newFish.name = '';
        this.newFish.habitat = '';
        this.newFish.food = '';
        this.showAddForm = false;
      }
    }
  };
  </script>
  
  <style>
  /* CSS styling can be added here */
  </style>
  