const form = document.getElementById("formPendaftaran");
const pesanSukses = document.getElementById("pesanSukses");

form.addEventListener("submit", function(e) {
    e.preventDefault(); // Supaya tidak reload halaman

    // Ambil nilai dari input
    const nama = document.getElementById("nama").value.trim();
    const email = document.getElementById("email").value.trim();
    const kategori = document.getElementById("kategori").value.trim();

    // Cek jika ada input yang kosong
    if (nama === "" || email === "" || kategori === "") {
        alert("⚠️ Harap isi semua kolom sebelum mendaftar!");
        return; // Hentikan proses
    }

    // Jika semua sudah diisi, tampilkan pesan sukses
    pesanSukses.classList.remove("hidden");
    form.reset(); // Kosongkan form
});
// Tangkap elemen
const form = document.getElementById("formPendaftaran");
const pesan = document.getElementById("pesan");
const setuju = document.getElementById("setuju");

// Ambil data lama dari localStorage (jika ada)
let pendaftar = JSON.parse(localStorage.getItem("pendaftar")) || [];

// --- Preview File Function ---
function previewFile(input, previewId) {
  const file = input.files[0];
  const preview = document.getElementById(previewId);
  preview.innerHTML = ""; // reset isi

  if (file) {
    const fileType = file.type;
    if (fileType.startsWith("image/")) {
      // Jika gambar, tampilkan sebagai img
      const img = document.createElement("img");
      img.src = URL.createObjectURL(file);
      img.style.maxWidth = "200px";
      img.style.marginTop = "10px";
      preview.appendChild(img);
    } else if (fileType === "application/pdf") {
      // Jika PDF, tampilkan link
      const link = document.createElement("a");
      link.href = URL.createObjectURL(file);
      link.textContent = "📄 Lihat PDF";
      link.target = "_blank";
      preview.appendChild(link);
    } else {
      preview.textContent = "⚠️ Format file tidak didukung.";
    }
  }
}

// --- Event Listener untuk input file ---
document.getElementById("akta").addEventListener("change", function () {
  previewFile(this, "preview-akta");
});

document.getElementById("kk").addEventListener("change", function () {
  previewFile(this, "preview-kk");
});

// --- Event Submit Form ---
form.addEventListener("submit", function (e) {
  e.preventDefault(); // cegah reload halaman

  // Ambil nilai input
  const nama = form.nama.value.trim();
  const email = form.email.value.trim();
  const ponsel = form.ponsel.value.trim();
  const tgl_lahir = form.tgl_lahir.value;
  const alamat = form.alamat.value.trim();
  const kategori = form.category.value;
  const tim = form.tim.value.trim();

  const aktaFile = form.akta.files[0];
  const kkFile = form.kk.files[0];

  // Validasi persyaratan
  if (!setuju.checked) {
    pesan.textContent = "Anda harus menyetujui persyaratan sebelum mendaftar!";
    pesan.style.color = "red";
    return;
  }

  if (!aktaFile || !kkFile) {
    pesan.textContent = "Wajib upload Akta Kelahiran & Kartu Keluarga!";
    pesan.style.color = "red";
    return;
  }

  // Buat objek data pendaftar
  const data = {
    nama: nama,
    email: email,
    ponsel: ponsel,
    tgl_lahir: tgl_lahir,
    alamat: alamat,
    kategori: kategori,
    tim: tim,
    // Simpan hanya nama file (karena localStorage tidak bisa simpan file asli)
    akta: aktaFile.name,
    kk: kkFile.name,
    waktu: new Date().toLocaleString()
  };

  // Simpan ke array & localStorage
  pendaftar.push(data);
  localStorage.setItem("pendaftar", JSON.stringify(pendaftar));

  // Tampilkan pesan sukses
  pesan.textContent = `✅ Terima kasih ${nama}, kamu berhasil mendaftar di kategori ${kategori}!`;
  pesan.style.color = "green";

  // Reset form
  form.reset();
  document.getElementById("preview-akta").innerHTML = "";
  document.getElementById("preview-kk").innerHTML = "";
  setuju.checked = false;
});
// Preview gambar untuk Akta & KK
function previewFile(input, previewId) {
  const file = input.files[0];
  const preview = document.getElementById(previewId);
  preview.innerHTML = ""; // reset preview

  if (file) {
    if (file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = function(e) {
        const img = document.createElement("img");
        img.src = e.target.result;
        img.style.maxWidth = "200px";
        img.style.marginTop = "10px";
        img.style.border = "1px solid #ccc";
        img.style.borderRadius = "8px";
        preview.appendChild(img);
      };
      reader.readAsDataURL(file);
    } else if (file.type === "application/pdf") {
      const p = document.createElement("p");
      p.textContent = "📄 " + file.name;
      preview.appendChild(p);
    } else {
      preview.textContent = "Format file tidak didukung!";
    }
  }
}

// Event listener
document.getElementById("akta").addEventListener("change", function() {
  previewFile(this, "preview-akta");
});

document.getElementById("kk").addEventListener("change", function() {
  previewFile(this, "preview-kk");
});
