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
          <label for="gambar">URL Gambar:</label>
          <input type="text" id="gambar" v-model="newFish.gambar" required>
          <button type="submit">Tambahkan</button>
        </form>
      </div>

      <div v-if="fishList.length > 0">
        <h2>Daftar Ikan</h2>
        <ul>
          <li v-for="(fish, index) in fishList" :key="index">
            <h3>{{ fish.nama }}</h3>
            <img :src="fish.gambar" alt="Gambar Ikan" v-if="fish.gambar">
            <p><strong>Habitat:</strong> {{ fish.habitat }}</p>
            <p><strong>Umpan/Makanan:</strong> {{ fish.pakan }}</p>
            <button @click="deleteFish(index)">Hapus</button>
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
        nama: '',
        habitat: '',
        pakan: '',
        gambar: '' // Menambahkan field untuk URL gambar
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
    addFish() {
      this.fishList.push({
        nama: this.newFish.nama,
        habitat: this.newFish.habitat,
        pakan: this.newFish.pakan,
        gambar: this.newFish.gambar // Menyimpan URL gambar
      });
      this.newFish.nama = '';
      this.newFish.habitat = '';
      this.newFish.pakan = '';
      this.newFish.gambar = ''; // Mengosongkan field gambar setelah menambahkan ikan
      this.showAddForm = false;
      this.saveFishList();
    },
    deleteFish(index) {
      this.fishList.splice(index, 1);
      this.saveFishList();
    },
    saveFishList() {
      localStorage.setItem('fishList', JSON.stringify(this.fishList));
    },
    loadFishList() {
      const fishListData = localStorage.getItem('fishList');
      if (fishListData) {
        this.fishList = JSON.parse(fishListData);
      } else {
        // Jika tidak ada data di Local Storage, tambahkan data default dengan gambar
        this.fishList = [
          { nama: 'Ikan Nemo', habitat: 'Lautan tropis', pakan: 'Plankton', gambar: 'https://link-to-nemo-image.com' },
          { nama: 'Ikan Koi', habitat: 'Kolam taman', pakan: 'Pelet ikan', gambar: 'https://link-to-koi-image.com' },
          { nama: 'Ikan Cupang', habitat: 'Air Tawar', pakan: 'Pelet, cacing', gambar: 'https://link-to-cupang-image.com'}
        ];
      }
    }
  }
};
</script>

<style>
/* CSS styling can be added here */
img {
  width: 4em;
  height: 8em;
  object-fit: cover; /* menjaga proporsi gambar */
}
</style>
