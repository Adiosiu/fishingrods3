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
          <button type="button" @click="cancelAdd">Batal</button>
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
            <button @click="editFish(index)">Edit</button>
            <button @click="deleteFish(index)">Hapus</button>
            <div v-if="editIndex === index">
              <h3>Edit Ikan</h3>
              <form @submit.prevent="updateFish(index)">
                <label for="editNama">Nama Ikan:</label>
                <input type="text" id="editNama" v-model="editFishData.nama" required>
                <label for="editHabitat">Habitat:</label>
                <input type="text" id="editHabitat" v-model="editFishData.habitat" required>
                <label for="editPakan">Umpan/Makanan:</label>
                <input type="text" id="editPakan" v-model="editFishData.pakan" required>
                <label for="editGambar">URL Gambar:</label>
                <input type="text" id="editGambar" v-model="editFishData.gambar" required>
                <button type="submit">Simpan</button>
                <button type="button" @click="cancelEdit">Batal</button>
              </form>
            </div>
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
import firebase from '@/firebaseConfig'; // Sesuaikan path dengan lokasi firebaseConfig.js Anda

export default {
  name: 'FishCard',
  data() {
    return {
      showAddForm: false,
      newFish: {
        nama: '',
        habitat: '',
        pakan: '',
        gambar: ''
      },
      fishList: [],
      editIndex: null,
      editFishData: {
        nama: '',
        habitat: '',
        pakan: '',
        gambar: ''
      }
    };
  },
  created() {
    this.loadFishList();
  },
  methods: {
    toggleAddForm() {
      this.showAddForm = !this.showAddForm;
    },
    cancelAdd() {
      this.showAddForm = false;
      this.resetNewFish();
    },
    addFish() {
      if (this.newFish.nama && this.newFish.habitat && this.newFish.pakan && this.newFish.gambar) {
        firebase.database().ref('fish').push({
          nama: this.newFish.nama,
          habitat: this.newFish.habitat,
          pakan: this.newFish.pakan,
          gambar: this.newFish.gambar
        }).then(() => {
          console.log('Data ikan berhasil ditambahkan ke Firebase.');
          this.resetNewFish();
          this.showAddForm = false;
        }).catch((error) => {
          console.error('Error adding new fish:', error);
        });
      } else {
        alert('Silakan lengkapi semua informasi sebelum menambahkan ikan baru.');
      }
    },
    editFish(index) {
      this.editIndex = index;
      this.editFishData = { ...this.fishList[index] };
    },
    updateFish(index) {
      if (this.editIndex !== null) {
        if (this.editFishData.nama && this.editFishData.habitat && this.editFishData.pakan && this.editFishData.gambar) {
          firebase.database().ref('fish/' + this.fishList[index].key).set({
            nama: this.editFishData.nama,
            habitat: this.editFishData.habitat,
            pakan: this.editFishData.pakan,
            gambar: this.editFishData.gambar
          }).then(() => {
            console.log('Data ikan berhasil diperbarui di Firebase.');
            this.editIndex = null;
            this.editFishData = {
              nama: '',
              habitat: '',
              pakan: '',
              gambar: ''
            };
          }).catch((error) => {
            console.error('Error updating fish:', error);
          });
        } else {
          alert('Silakan lengkapi semua informasi sebelum menyimpan perubahan.');
        }
      }
    },
    cancelEdit() {
      this.editIndex = null;
    },
    deleteFish(index) {
      firebase.database().ref('fish/' + this.fishList[index].key).remove().then(() => {
        console.log('Data ikan berhasil dihapus dari Firebase.');
      }).catch((error) => {
        console.error('Error deleting fish:', error);
      });
    },
    resetNewFish() {
      this.newFish.nama = '';
      this.newFish.habitat = '';
      this.newFish.pakan = '';
      this.newFish.gambar = '';
    },
    loadFishList() {
      firebase.database().ref('fish').on('value', (snapshot) => {
        const fishListData = snapshot.val();
        if (fishListData) {
          this.fishList = Object.keys(fishListData).map(key => ({
            key: key,
            nama: fishListData[key].nama,
            habitat: fishListData[key].habitat,
            pakan: fishListData[key].pakan,
            gambar: fishListData[key].gambar
          }));
        } else {
          this.fishList = [];
        }
      });
    }
  }
};
</script>

<style>
/* CSS styling can be added here */
img {
  width: 16em;
  height: 8em;
  object-fit: cover;
}
</style>
