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
            <button @click="deleteFish(fish.id)">Hapus</button>
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
import { db } from './firebaseConfig';

export default {
  name: 'App',
  data() {
    return {
      showAddForm: false,
      newFish: {
        nama: '',
        habitat: '',
        pakan: ''
      },
      fishList: []
    };
  },
  mounted() {
    this.loadFishList();
  },
  methods: {
    toggleAddForm() {
      this.showAddForm = !this.showAddForm;
    },
    async addFish() {
      const docRef = await db.collection('fish').add({
        nama: this.newFish.nama,
        habitat: this.newFish.habitat,
        pakan: this.newFish.pakan
      });
      this.fishList.push({ id: docRef.id, ...this.newFish });
      this.newFish.nama = '';
      this.newFish.habitat = '';
      this.newFish.pakan = '';
      this.showAddForm = false;
    },
    async deleteFish(id) {
      await db.collection('fish').doc(id).delete();
      this.fishList = this.fishList.filter(fish => fish.id !== id);
    },
    async loadFishList() {
      const snapshot = await db.collection('fish').get();
      this.fishList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    }
  }
};
</script>

<style>
/* CSS styling can be added here */
</style>
