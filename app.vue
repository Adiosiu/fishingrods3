<template>
  <div id="app">
    <header>
      <h1>Fishing Rod</h1>
    </header>
    <main>
      <div v-if="fishList.length > 0" class="fish-list">
        <h2><img src="public/fishicon.png" alt="Fish Icon" class="fish-icon"> Daftar Ikan</h2>
        <ul>
          <li v-for="(fish, index) in fishList" :key="index" class="fish-item">
            <h3><img src="public/fishicon.png" alt="Fish Icon" class="fish-icon"> {{ fish.nama }}</h3>
            <img :src="fish.gambar" alt="Gambar Ikan" v-if="fish.gambar">
            <p><strong>Habitat:</strong> {{ fish.habitat }}</p>
            <p><strong>Umpan/Makanan:</strong> {{ fish.pakan }}</p>
            <button class="btn" @click="editFish(index)">Edit</button>
            <button class="btn btn-delete" @click="deleteFish(index)">Hapus</button>
            <div v-if="editIndex === index" class="edit-form">
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
                <button type="submit" class="btn">Simpan</button>
                <button type="button" class="btn btn-cancel" @click="cancelEdit">Batal</button>
              </form>
            </div>
          </li>
        </ul>
      </div>
      <div v-else>
        <p>Tidak ada data ikan.</p>
      </div>

      <!-- Form Tambah Ikan Baru dan tombol untuk menampilkannya -->
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
          <button type="submit" class="btn">Tambahkan</button>
          <button type="button" class="btn btn-cancel" @click="cancelAdd">Batal</button>
        </form>
      </div>

      <!-- Tombol untuk menampilkan form tambah ikan baru -->
      <button @click="toggleAddForm">
        {{ showAddForm ? 'Batal Tambah Ikan' : 'Tambah Ikan Baru' }}
      </button>
    </main>
  </div>
</template>

<script>
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
  mounted() {
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
        this.fishList.push({
          nama: this.newFish.nama,
          habitat: this.newFish.habitat,
          pakan: this.newFish.pakan,
          gambar: this.newFish.gambar
        });
        this.saveFishList();
        this.resetNewFish();
        this.showAddForm = false;
      } else {
        alert('Silakan lengkapi semua informasi sebelum menambahkan ikan baru.');
      }
    },
    editFish(index) {
      this.editIndex = index;
      this.editFishData = { ...this.fishList[index] };
    },
    updateFish() {
      if (this.editIndex !== null) {
        if (this.editFishData.nama && this.editFishData.habitat && this.editFishData.pakan && this.editFishData.gambar) {
          this.$set(this.fishList, this.editIndex, { ...this.editFishData });
          this.saveFishList();
          this.editIndex = null;
          this.editFishData = {
            nama: '',
            habitat: '',
            pakan: '',
            gambar: ''
          };
        } else {
          alert('Silakan lengkapi semua informasi sebelum menyimpan perubahan.');
        }
      }
    },
    cancelEdit() {
      this.editIndex = null;
    },
    deleteFish(index) {
      this.fishList.splice(index, 1);
      this.saveFishList();
    },
    resetNewFish() {
      this.newFish.nama = '';
      this.newFish.habitat = '';
      this.newFish.pakan = '';
      this.newFish.gambar = '';
    },
    saveFishList() {
      localStorage.setItem('fishList', JSON.stringify(this.fishList));
    },
    loadFishList() {
      const fishListData = localStorage.getItem('fishList');
      if (fishListData) {
        this.fishList = JSON.parse(fishListData);
      } else {
        this.fishList = [
          { nama: 'Ikan Nemo', habitat: 'Lautan tropis', pakan: 'Plankton', gambar: '/ikannemo.jpeg' },
          { nama: 'Ikan Koi', habitat: 'Kolam taman', pakan: 'Pelet ikan', gambar: '/ikankoi.jpeg' },
          { nama: 'Ikan Cupang', habitat: 'Air Tawar', pakan: 'Pelet, cacing', gambar: '/ikan cupang.jpeg'}
        ];
      }
    }
  }
};
</script>

<style>
body {
  font-family: Arial, sans-serif;
  background-color: #f4f4f4;
  margin: 0;
  padding: 0;
}

#app {
  max-width: 800px;
  margin: 20px auto;
  background: #fff;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}

/* Existing styles */

header {
  position: relative;
  width: 100%;
  height: 300px; /* Atur tinggi header sesuai kebutuhan */
  background-image: url('/public/banner.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  text-align: center;
  margin-bottom: 20px;
}

.banner {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

h1 {
  color: white;
  font-size: 2.5em;
  margin: 0;
  z-index: 1;
}


.fish-icon {
  width: 24px;
  height: auto;
  vertical-align: middle;
  margin-right: 8px;
}

h2 {
  margin-top: 0;
  color: #666;
}

.form-container,
.edit-form {
  margin-bottom: 20px;
}

label {
  display: block;
  margin: 10px 0 5px;
}

input[type="text"] {
  width: calc(100% - 20px);
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button.btn {
  background-color: #28a745;
  color: white;
}

button.btn-cancel {
  background-color: #dc3545;
  color: white;
}

button.btn-delete {
  background-color: #dc3545;
  color: white;
}

button.btn + button.btn {
  margin-left: 10px;
}

.fish-list h2 {
  display: flex;
  align-items: center;
  margin-top: 0;
  color: #666;
}

.fish-icon {
  width: 24px;
  height: auto;
  margin-right: 8px;
}

.fish-item h3 {
  display: flex;
  align-items: center;
}

.fish-item .fish-icon {
  margin-right: 8px;
}


img {
  width: 100%;
  height: auto;
  max-width: 300px;
  object-fit: cover;
  display: block;
  margin-bottom: 10px;
}

.edit-form {
  margin-top: 10px;
  padding: 10px;
  border: 1px solid #ccc;
}

</style>
