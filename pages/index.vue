<!-- components/FishCard.vue -->
<template>
    <div id="app">
      <header>
        <h1>Fishing Rod</h1>
      </header>
      <main>
        <div v-if="showAddForm">
          <h2>Tambah Ikan Baru</h2>
          <form @submit.prevent="addFish">
            <label for="nama">Nama Ikan:</label>
            <input type="text" id="nama" v-model="newFish.nama" required>
            <label for="image">Gambar Ikan:</label>
            <input type="file" id="image" @change="handleImageUpload" required>
            <label for="habitat">Habitat:</label>
            <input type="text" id="habitat" v-model="newFish.habitat" required>
            <label for="pakan">Umpan/Makanan:</label>
            <input type="text" id="pakan" v-model="newFish.pakan" required>
            <button type="submit">Tambahkan</button>
          </form>
        </div>
  
        <div v-if="fishList.length > 0">
          <h2>Daftar Ikan</h2>
          <ul>
            <li v-for="(fish, index) in fishList" :key="index">
              <h3>{{ fish.nama }}</h3>
              <p><strong>Habitat:</strong> {{ fish.habitat }}</p>
              <p><strong>Umpan/Makanan:</strong> {{ fish.pakan }}</p>
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
    nama: 'App',
    data() {
      return {
        showAddForm: false,
        newFish: {
          nama: '',
          Image: '',
          habitat: '',
          pakan: ''
        },
        fishList: [
          { nama: 'Ikan Nemo', habitat: 'Lautan tropis', pakan: 'Plankton' },
          { nama: 'Ikan Koi', habitat: 'Kolam taman', pakan: 'Pelet ikan' },
          { nama: 'Ikan Cupang', habitat: 'Air Tawar', pakan: 'Pelet, cacing'}
        ]
      };
    },
    methods: {
      toggleAddForm() {
        this.showAddForm = !this.showAddForm;
      },
      addFish() {
        this.fishList.push({
          nama: this.newFish.nama,
          Image: this.handleImageUpload,
          habitat: this.newFish.habitat,
          pakan: this.newFish.pakan
        });
        this.newFish.nama = '';
        this.newFish.habitat = '';
        this.newFish.pakan = '';
        this.showAddForm = false;
      }
    }
  };
  </script>
  
  <style>
  /* CSS styling can be added here */
  </style>
  