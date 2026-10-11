# Entity Relationship Diagram (ERD)
# Sistem Informasi Cagar Budaya (SICABA) - Kota Tasikmalaya

## 📊 Ringkasan Database

| Kategori | Jumlah Tabel |
|----------|--------------|
| Core (Utama) | 4 tabel |
| Relational | 6 tabel |
| Transactional | 5 tabel |
| System | 2 tabel |
| **Total** | **17 tabel** |

---

## 🗂️ Daftar Tabel

### 1. CORE TABLES (Tabel Utama)

#### `users` - Data Pengguna Sistem
Menyimpan seluruh data pengguna dengan 4 role berbeda.

| Kolom | Tipe | Keterangan |
|-------|------|------------|
| id | INT (PK) | Primary Key |
| nama | VARCHAR(100) | Nama lengkap |
| email | VARCHAR(100) | Email unik |
| password | VARCHAR(255) | Hash bcrypt |
| role | ENUM | admin/manager/member/public |
| avatar | VARCHAR(50) | Emoji avatar |
| phone | VARCHAR(20) | Nomor telepon |
| alamat | TEXT | Alamat lengkap |
| status | ENUM | aktif/nonaktif |
| status_akun | ENUM | pending/approved/rejected |
| tanggal_daftar | DATE | Tanggal registrasi |
| last_login | DATETIME | Waktu login terakhir |
| tanggal_verifikasi | DATE | Tanggal verifikasi admin |
| catatan_admin | TEXT | Catatan dari admin |
| verified_by | INT (FK) | Admin yang verifikasi |

**Relasi:**
- `verified_by` → `users.id` (self-referencing)
- 1:N → `bukti_pembayaran`
- 1:N → `odcb` (sebagai pendaftar)
- 1:N → `lampiran` (sebagai uploader)
- 1:N → `bookmark`
- 1:N → `komentar`
- 1:N → `notifikasi`
- 1:N → `log_aktivitas`

---

#### `cagar_budaya` - Data Cagar Budaya
Tabel utama yang menyimpan data cagar budaya.

| Kolom | Tipe | Keterangan |
|-------|------|------------|
| id | INT (PK) | Primary Key |
| nama | VARCHAR(200) | Nama cagar budaya |
| kategori_id | INT (FK) | Kategori cagar budaya |
| lokasi | TEXT | Alamat lengkap |
| kecamatan | VARCHAR(50) | Nama kecamatan |
| tahun_berdiri | VARCHAR(50) | Tahun/perkiraan |
| deskripsi | TEXT | Deskripsi singkat |
| sejarah | TEXT | Sejarah lengkap |
| arsitektur | TEXT | Detail arsitektur |
| status_penetapan | ENUM | Belum Ditetapkan/Kota/Provinsi/Nasional |
| nomor_sk | VARCHAR(100) | Nomor SK penetapan |
| tanggal_penetapan | DATE | Tanggal penetapan |
| latitude | DECIMAL(10,7) | Koordinat GPS |
| longitude | DECIMAL(10,7) | Koordinat GPS |
| gambar | VARCHAR(255) | Path gambar |
| created_by | INT (FK) | User yang input |
| updated_by | INT (FK) | User yang update |

**Relasi:**
- `kategori_id` → `kategori_cagar_budaya.id`
- `created_by` → `users.id`
- `updated_by` → `users.id`
- 1:N → `fasilitas_cagar_budaya`
- 1:N → `lampiran`
- 1:N → `galeri`
- 1:N → `bookmark`
- 1:N → `komentar`

---

#### `odcb` - Objek Diduga Cagar Budaya
Menyimpan data pendaftaran ODCB dari masyarakat.

| Kolom | Tipe | Keterangan |
|-------|------|------------|
| id | INT (PK) | Primary Key |
| nama_odcb | VARCHAR(200) | Nama objek |
| jenis_odcb | ENUM | Bangunan/Struktur/dll |
| lokasi | TEXT | Lokasi objek |
| kecamatan | VARCHAR(50) | Kecamatan |
| deskripsi | TEXT | Deskripsi objek |
| perkiraan_umur | VARCHAR(50) | Perkiraan umur |
| kondisi | ENUM | Baik/Cukup/Kurang/Rusak |
| latitude | DECIMAL(10,7) | Koordinat GPS |
| longitude | DECIMAL(10,7) | Koordinat GPS |
| pendaftar_id | INT (FK) | User pendaftar |
| pendaftar_nama | VARCHAR(100) | Nama pendaftar |
| pendaftar_email | VARCHAR(100) | Email pendaftar |
| pendaftar_phone | VARCHAR(20) | No. telepon |
| pendaftar_alamat | TEXT | Alamat pendaftar |
| jenis_identitas | ENUM | KTP/SIM |
| nomor_identitas | VARCHAR(30) | Nomor identitas |
| status | ENUM | Diajukan/Diperiksa/Revisi/Tolak/Setuju |
| tanggal_pengajuan | DATE | Tanggal diajukan |
| tanggal_update | DATE | Tanggal terakhir update |
| catatan_manager | TEXT | Catatan dari manager |
| reviewed_by | INT (FK) | Manager yang review |

**Relasi:**
- `pendaftar_id` → `users.id`
- `reviewed_by` → `users.id`
- 1:N → `odcb_foto_identitas`
- 1:N → `odcb_foto_objek`

---

#### `artikel` - Berita & Artikel
Menyimpan konten berita dan artikel.

| Kolom | Tipe | Keterangan |
|-------|------|------------|
| id | INT (PK) | Primary Key |
| judul | VARCHAR(255) | Judul artikel |
| excerpt | TEXT | Ringkasan |
| konten | LONGTEXT | Isi lengkap |
| kategori | VARCHAR(50) | Kategori artikel |
| author | VARCHAR(100) | Nama penulis |
| tanggal_publikasi | DATE | Tanggal terbit |
| waktu_baca | VARCHAR(20) | Estimasi waktu baca |
| gambar | VARCHAR(255) | Path gambar |
| views | INT | Jumlah dilihat |
| published_by | INT (FK) | User yang publish |
| status | ENUM | draft/published/archived |

---

### 2. RELATIONAL TABLES (Tabel Pendukung)

#### `kategori_cagar_budaya` - Master Kategori
| Kolom | Tipe | Keterangan |
|-------|------|------------|
| id | INT (PK) | Primary Key |
| nama_kategori | VARCHAR(50) | Nama kategori |
| ikon | VARCHAR(10) | Emoji ikon |
| deskripsi | TEXT | Deskripsi kategori |

---

#### `fasilitas_cagar_budaya` - Fasilitas per Cagar Budaya
| Kolom | Tipe | Keterangan |
|-------|------|------------|
| id | INT (PK) | Primary Key |
| cagar_budaya_id | INT (FK) | FK ke cagar_budaya |
| nama_fasilitas | VARCHAR(100) | Nama fasilitas |

---

#### `lampiran` - Dokumen Lampiran Cagar Budaya
| Kolom | Tipe | Keterangan |
|-------|------|------------|
| id | INT (PK) | Primary Key |
| cagar_budaya_id | INT (FK) | FK ke cagar_budaya |
| nama_file | VARCHAR(255) | Nama file |
| path_file | VARCHAR(500) | Path penyimpanan |
| tipe_file | ENUM | pdf/doc/jpg/png/sk/foto/peta/sertifikat |
| ukuran_file | VARCHAR(20) | Ukuran file |
| deskripsi | TEXT | Deskripsi dokumen |
| tanggal_upload | DATE | Tanggal upload |
| uploaded_by | INT (FK) | User yang upload |

---

#### `bukti_pembayaran` - Bukti Transfer Pendaftaran
| Kolom | Tipe | Keterangan |
|-------|------|------------|
| id | INT (PK) | Primary Key |
| user_id | INT (FK) | FK ke users |
| nama_file | VARCHAR(255) | Nama file bukti |
| path_file | VARCHAR(500) | Path file |
| tipe_file | VARCHAR(10) | Tipe file |
| ukuran_file | VARCHAR(20) | Ukuran |
| nominal | DECIMAL(12,2) | Nominal transfer |
| rekening_tujuan | VARCHAR(30) | No. rekening |
| bank_tujuan | VARCHAR(50) | Nama bank |
| atas_nama_rekening | VARCHAR(100) | Nama pemilik rek |
| tanggal_upload | DATE | Tanggal upload |
| status_verifikasi | ENUM | pending/valid/invalid |
| catatan | VARCHAR(500) | Catatan verifikasi |

---

#### `odcb_foto_identitas` - Foto KTP/SIM Pendaftar ODCB
| Kolom | Tipe | Keterangan |
|-------|------|------------|
| id | INT (PK) | Primary Key |
| odcb_id | INT (FK) | FK ke odcb |
| nama_file | VARCHAR(255) | Nama file |
| path_file | VARCHAR(500) | Path file |
| tipe_file | VARCHAR(10) | Tipe file |
| ukuran_file | VARCHAR(20) | Ukuran |
| deskripsi | VARCHAR(255) | Deskripsi |
| tanggal_upload | DATE | Tanggal upload |

---

#### `odcb_foto_objek` - Foto-foto Objek ODCB
| Kolom | Tipe | Keterangan |
|-------|------|------------|
| id | INT (PK) | Primary Key |
| odcb_id | INT (FK) | FK ke odcb |
| nama_file | VARCHAR(255) | Nama file |
| path_file | VARCHAR(500) | Path file |
| tipe_file | VARCHAR(10) | Tipe file |
| ukuran_file | VARCHAR(20) | Ukuran |
| deskripsi | VARCHAR(255) | Deskripsi |
| tanggal_upload | DATE | Tanggal upload |

---

#### `galeri` - Koleksi Foto Cagar Budaya
| Kolom | Tipe | Keterangan |
|-------|------|------------|
| id | INT (PK) | Primary Key |
| cagar_budaya_id | INT (FK) | FK ke cagar_budaya (nullable) |
| judul | VARCHAR(200) | Judul foto |
| deskripsi | TEXT | Deskripsi |
| path_file | VARCHAR(500) | Path file |
| tipe_file | VARCHAR(10) | Tipe file |
| kategori | VARCHAR(50) | Kategori foto |
| uploaded_by | INT (FK) | User yang upload |

---

#### `faq` - Pertanyaan Umum
| Kolom | Tipe | Keterangan |
|-------|------|------------|
| id | INT (PK) | Primary Key |
| pertanyaan | TEXT | Pertanyaan |
| jawaban | TEXT | Jawaban |
| kategori | VARCHAR(50) | Kategori FAQ |
| urutan | INT | Urutan tampil |
| is_active | BOOLEAN | Status aktif |
| created_by | INT (FK) | User yang buat |

---

#### `bookmark` - Favorit User
| Kolom | Tipe | Keterangan |
|-------|------|------------|
| id | INT (PK) | Primary Key |
| user_id | INT (FK) | FK ke users |
| cagar_budaya_id | INT (FK) | FK ke cagar_budaya |

**Unique Constraint:** (user_id, cagar_budaya_id)

---

#### `komentar` - Review Cagar Budaya
| Kolom | Tipe | Keterangan |
|-------|------|------------|
| id | INT (PK) | Primary Key |
| user_id | INT (FK) | FK ke users |
| cagar_budaya_id | INT (FK) | FK ke cagar_budaya |
| isi_komentar | TEXT | Isi komentar |
| rating | TINYINT | Rating 1-5 |
| is_approved | BOOLEAN | Status approved |

---

### 3. SYSTEM TABLES (Tabel Sistem)

#### `log_aktivitas` - Audit Trail
| Kolom | Tipe | Keterangan |
|-------|------|------------|
| id | BIGINT (PK) | Primary Key |
| user_id | INT (FK) | User yang beraksi |
| aksi | VARCHAR(100) | Jenis aksi |
| tabel | VARCHAR(50) | Tabel yang diubah |
| record_id | INT | ID record |
| deskripsi | TEXT | Deskripsi aksi |
| ip_address | VARCHAR(45) | IP address |
| user_agent | TEXT | User agent browser |

---

#### `notifikasi` - Notifikasi User
| Kolom | Tipe | Keterangan |
|-------|------|------------|
| id | INT (PK) | Primary Key |
| user_id | INT (FK) | User tujuan |
| judul | VARCHAR(200) | Judul notifikasi |
| pesan | TEXT | Isi pesan |
| tipe | ENUM | info/success/warning/error |
| is_read | BOOLEAN | Status dibaca |
| link | VARCHAR(255) | Link tujuan |

---

#### `pengaturan_sistem` - Konfigurasi Aplikasi
| Kolom | Tipe | Keterangan |
|-------|------|------------|
| id | INT (PK) | Primary Key |
| nama_setting | VARCHAR(100) | Nama setting (unique) |
| nilai | TEXT | Nilai setting |
| kategori | VARCHAR(50) | Kategori setting |
| deskripsi | VARCHAR(255) | Deskripsi |
| updated_by | INT (FK) | User yang update |

---

## 🔗 Diagram Relasi (Text-based ERD)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              USERS (1)                                       │
│  id, nama, email, password, role, status, status_akun                       │
└─────────────────────────────────────────────────────────────────────────────┘
         │                    │                    │                    │
         │                    │                    │                    │
         ▼                    ▼                    ▼                    ▼
┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐
│BUKTI_PEMBAYARAN │  │     ODCB (1)    │  │   LAMPIRAN (N)  │  │   BOOKMARK (N)  │
│  (N)            │  │                 │  │                 │  │                 │
│ user_id (FK)    │  │ pendaftar_id(FK)│  │ uploaded_by(FK) │  │  user_id (FK)   │
└─────────────────┘  └─────────────────┘  └─────────────────┘  └─────────────────┘
                            │                                            │
                            ▼                                            ▼
                   ┌─────────────────┐                        ┌─────────────────┐
                   │ODCB_FOTO_ID (N) │                        │  CAGAR_BUDAYA   │
                   │ odcb_id (FK)    │                        │     (1)         │
                   └─────────────────┘                        └─────────────────┘
                   ┌─────────────────┐                                │
                   │ODCB_FOTO_OBJ (N)│                                │
                   │ odcb_id (FK)    │                                │
                   └─────────────────┘                                │
                                                                      ▼
                                                          ┌───────────────────────┐
                                                          │ FASILITAS_CB (N)      │
                                                          │ cagar_budaya_id (FK)  │
                                                          └───────────────────────┘
                                                          ┌───────────────────────┐
                                                          │   GALERI (N)          │
                                                          │ cagar_budaya_id (FK)  │
                                                          └───────────────────────┘
                                                          ┌───────────────────────┐
                                                          │   KOMENTAR (N)        │
                                                          │ cagar_budaya_id (FK)  │
                                                          └───────────────────────┘
```

---

## 📈 Statistik Database

### Jumlah Data per Tabel (Sample Data)
| Tabel | Jumlah Record |
|-------|---------------|
| users | 8 |
| bukti_pembayaran | 6 |
| kategori_cagar_budaya | 7 |
| cagar_budaya | 10 |
| fasilitas_cagar_budaya | 15 |
| lampiran | 9 |
| odcb | 4 |
| odcb_foto_identitas | 4 |
| odcb_foto_objek | 10 |
| artikel | 3 |
| galeri | 0 |
| faq | 5 |
| log_aktivitas | 5 |
| notifikasi | 3 |
| bookmark | 0 |
| komentar | 0 |
| pengaturan_sistem | 8 |

### Distribusi Status Penetapan Cagar Budaya
| Status | Jumlah | Persentase |
|--------|--------|------------|
| Nasional | 4 | 40% |
| Provinsi | 2 | 20% |
| Kota/Kabupaten | 3 | 30% |
| Belum Ditetapkan | 1 | 10% |

### Distribusi Role User
| Role | Total | Approved | Pending | Rejected |
|------|-------|----------|---------|----------|
| Admin | 1 | 1 | 0 | 0 |
| Manager | 2 | 1 | 1 | 0 |
| Member | 4 | 2 | 1 | 1 |
| Public | 1 | 1 | 0 | 0 |

---

## 🔐 Keamanan

### Password Storage
- Menggunakan **bcrypt** hashing
- Cost factor: 10 (default)
- Salt: auto-generated per password

### Role-Based Access Control (RBAC)
| Fitur | Admin | Manager | Member | Public |
|-------|-------|---------|--------|--------|
| Kelola User | ✅ | ❌ | ❌ | ❌ |
| Kelola Konten | ✅ | ✅ | ❌ | ❌ |
| Review ODCB | ✅ | ✅ | ❌ | ❌ |
| Daftar ODCB | ✅ | ✅ | ✅ | ✅ |
| Bookmark | ✅ | ✅ | ✅ | ❌ |
| Komentar | ✅ | ✅ | ✅ | ❌ |
| Lihat Statistik | ✅ | ✅ | ❌ | ❌ |
| Akses Penuh | ✅ | ❌ | ✅ | ❌ |
| Lihat Konten | ✅ | ✅ | ✅ | ✅ |

---

## 📝 Catatan Implementasi

1. **Charset**: UTF-8 (utf8mb4) untuk mendukung emoji dan karakter khusus
2. **Engine**: InnoDB untuk mendukung transaksi dan foreign key
3. **Index**: Full-text search untuk pencarian cepat
4. **Trigger**: Auto-log aktivitas dan notifikasi
5. **Stored Procedure**: Untuk operasi kompleks (approve/reject user, update ODCB)
6. **View**: Untuk laporan dan statistik
7. **Soft Delete**: Tidak digunakan, menggunakan CASCADE delete

---

## 🚀 Deployment

### Requirements
- MySQL 8.0+ atau MariaDB 10.5+
- PHP 8.0+ (jika menggunakan PHP)
- Node.js 18+ (untuk backend API)

### Cara Import
```bash
mysql -u root -p < schema.sql
```

### Backup
```bash
mysqldump -u root -p sicaba_db > backup_$(date +%Y%m%d).sql
```

---

*Dibuat untuk Sistem Informasi Cagar Budaya (SICABA) Kota Tasikmalaya*
*Versi: 1.0.0 | Tanggal: 2024*
