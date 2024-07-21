<template>
  <div id="app">
    <header>
      <h1>Fishing Rod</h1>
    </header>
    <main>
      <div v-if="showAddForm" class="form-container">
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

      <div v-if="fishList.length > 0" class="fish-list">
        <h2>Daftar Ikan</h2>
        <ul>
          <li v-for="(fish, index) in fishList" :key="index" class="fish-item">
            <h3>{{ fish.nama }}</h3>
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

      <button class="btn" @click="toggleAddForm">Tambah Ikan Baru</button>
    </main>
  </div>
</template>