# SICABA - Sistem Informasi Cagar Budaya Kota Tasikmalaya
## Versi PHP/MySQL/JavaScript

Aplikasi web untuk mengelola dan menginformasikan cagar budaya di Kota Tasikmalaya dengan sistem manajemen user berlapis dan verifikasi pembayaran.

---

## 🚀 Fitur Utama

### 👥 Manajemen User (4 Role)
- **Administrator** - Akses penuh sistem
- **Manager** - Kelola konten & review ODCB
- **User Member** - Akses penuh konten (berbayar Rp 110.000)
- **User Publik** - Akses dasar (gratis)

### 💰 Sistem Pembayaran
- Registrasi Manager/Member: **Rp 110.000,-**
- Transfer ke: **BRI 445301021768537 a.n Agus Wirabudiman**
- Upload bukti transfer
- Verifikasi oleh Administrator

### 🏛️ Cagar Budaya
- 10 cagar budaya terdaftar
- Status penetapan: Nasional, Provinsi, Kota/Kabupaten
- Lampiran dokumen (SK, sertifikat, foto, peta)
- Koordinat GPS & peta lokasi

### 📋 ODCB (Objek Diduga Cagar Budaya)
- Form pendaftaran multi-step
- Upload foto KTP/SIM
- Upload multiple foto ODCB
- Status: Diajukan → Diperiksa → Direvisi/Ditolak/Disetujui

### 📊 Dashboard & Statistik
- Grafik distribusi cagar budaya
- Statistik user & pendapatan
- Timeline sejarah
- Audit trail aktivitas

---

## 📁 Struktur Folder

```
php-app/
├── config/
│   └── config.php              # Konfigurasi database & helper functions
├── includes/
│   ├── header.php              # Header template
│   ├── navbar.php              # Navigation bar
│   └── footer.php              # Footer template
├── auth/
│   ├── login.php               # Halaman login
│   ├── register.php            # Halaman registrasi
│   ├── logout.php              # Logout handler
│   └── status-pendaftaran.php  # Status verifikasi
├── dashboard/
│   └── index.php               # Dashboard user
├── admin/
│   ├── users.php               # Kelola user
│   ├── verifikasi-pembayaran.php # Verifikasi pembayaran
│   ├── kelola-odcb.php         # Review ODCB
│   └── kelola-lampiran.php     # Kelola lampiran
├── pages/
│   ├── cagar-budaya.php        # Daftar cagar budaya
│   ├── detail-cagar-budaya.php # Detail cagar budaya
│   ├── peta.php                # Peta lokasi
│   ├── galeri.php              # Galeri foto
│   ├── statistik.php           # Statistik & grafik
│   ├── berita.php              # Berita & artikel
│   ├── odcb.php                # Pendaftaran ODCB
│   ├── faq.php                 # FAQ
│   └── database.php            # Dokumentasi database
├── assets/
│   ├── css/
│   │   └── style.css           # Custom CSS
│   └── js/
│       └── app.js              # Custom JavaScript
├── uploads/                    # Folder upload file
│   ├── bukti_pembayaran/
│   ├── lampiran/
│   ├── odcb/
│   └── galeri/
├── database/
│   ├── schema.sql              # Database schema
│   └── ERD.md                  # Dokumentasi ERD
└── index.php                   # Homepage
```

---

## 🛠️ Instalasi

### Persyaratan Sistem
- **PHP** 7.4 atau lebih baru (disarankan PHP 8.0+)
- **MySQL** 5.7+ atau **MariaDB** 10.3+
- **Web Server**: Apache/Nginx (XAMPP/Laragon recommended)
- **Browser**: Chrome, Firefox, Edge, Safari (versi terbaru)

### Langkah Instalasi

#### 1. Clone/Download Project
```bash
# Jika menggunakan Git
git clone <repository-url>
cd sicaba/php-app

# Atau download dan extract ke folder htdocs (XAMPP)
# C:\xampp\htdocs\sicaba\
```

#### 2. Setup Database
```bash
# Masuk ke MySQL
mysql -u root -p

# Import database
mysql -u root -p < database/schema.sql

# Atau via phpMyAdmin:
# 1. Buka http://localhost/phpmyadmin
# 2. Buat database baru: sicaba_db
# 3. Import file database/schema.sql
```

#### 3. Konfigurasi Database
Edit file `config/config.php`:
```php
define('DB_HOST', 'localhost');
define('DB_NAME', 'sicaba_db');
define('DB_USER', 'root');        // Ganti dengan username MySQL Anda
define('DB_PASS', '');            // Ganti dengan password MySQL Anda
define('BASE_URL', 'http://localhost/sicaba'); // Sesuaikan URL
```

#### 4. Setup Folder Upload
```bash
# Buat folder uploads dan set permission
mkdir -p uploads/bukti_pembayaran
mkdir -p uploads/lampiran
mkdir -p uploads/odcb
mkdir -p uploads/galeri

# Set permission (Linux/Mac)
chmod -R 755 uploads/
chmod -R 777 uploads/  # Jika ada masalah upload
```

#### 5. Akses Aplikasi
Buka browser dan akses:
```
http://localhost/sicaba/php-app/
```

---

## 👤 Akun Demo

### Administrator
- **Email**: admin@sicaba.go.id
- **Password**: admin123
- **Akses**: Full system access

### Administrator (Agus Wirabudiman)
- **Email**: agus.wirabudiman@gmail.com
- **Password**: admin2024
- **Akses**: Full system access

### Manager
- **Email**: manager@sicaba.go.id
- **Password**: manager123
- **Akses**: Kelola konten, review ODCB

### User Member
- **Email**: member@sicaba.go.id
- **Password**: member123
- **Akses**: Full content access

### User Publik
- **Email**: public@sicaba.go.id
- **Password**: public123
- **Akses**: Basic access

### Akun Pending (Menunggu Verifikasi)
- **Email**: dewi@email.com
- **Password**: member123
- **Status**: Menunggu verifikasi admin

### Akun Ditolak
- **Email**: hendra@email.com
- **Password**: member123
- **Status**: Ditolak (bukti transfer tidak jelas)

---

## 📊 Database Schema

### Tabel Utama (17 tabel)

#### Core Tables
1. `users` - Data pengguna sistem
2. `cagar_budaya` - Data cagar budaya
3. `odcb` - Pendaftaran ODCB
4. `artikel` - Berita & artikel

#### Relational Tables
5. `bukti_pembayaran` - Bukti transfer pendaftaran
6. `lampiran` - Dokumen lampiran cagar budaya
7. `odcb_foto_identitas` - Foto KTP/SIM pendaftar
8. `odcb_foto_objek` - Foto-foto objek ODCB
9. `kategori_cagar_budaya` - Master kategori
10. `fasilitas_cagar_budaya` - Fasilitas per cagar budaya

#### Transactional Tables
11. `galeri` - Koleksi foto
12. `bookmark` - Favorit user
13. `komentar` - Review & rating
14. `faq` - Pertanyaan umum

#### System Tables
15. `log_aktivitas` - Audit trail
16. `notifikasi` - Notifikasi user
17. `pengaturan_sistem` - Konfigurasi aplikasi

### Views
- `v_statistik_penetapan` - Distribusi status penetapan
- `v_statistik_user` - Statistik user per role
- `v_pendapatan` - Ringkasan pendapatan
- `v_detail_odcb` - Detail ODCB dengan pendaftar

### Stored Procedures
- `sp_approve_user()` - Approve user + notifikasi
- `sp_reject_user()` - Reject user + notifikasi
- `sp_update_status_odcb()` - Update status ODCB

---

## 🔐 Keamanan

### Password
- Menggunakan **bcrypt** hashing
- Cost factor: 10 (default)
- Salt auto-generated per password

### CSRF Protection
- Token CSRF pada setiap form
- Validasi token di server-side

### Session Management
- Session timeout otomatis
- Secure session handling
- Regenerate session ID setelah login

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

## 📝 Fitur Lengkap

### Halaman Publik
- ✅ Homepage dengan hero section
- ✅ Daftar cagar budaya dengan filter & search
- ✅ Detail cagar budaya dengan lampiran
- ✅ Peta lokasi interaktif
- ✅ Galeri foto
- ✅ Statistik & grafik
- ✅ Berita & artikel
- ✅ FAQ
- ✅ Dokumentasi database

### Autentikasi
- ✅ Login dengan validasi status akun
- ✅ Registrasi multi-step (3 langkah)
- ✅ Pilih role (Public/Member/Manager)
- ✅ Upload bukti pembayaran
- ✅ Status pendaftaran real-time
- ✅ Logout

### Dashboard User
- ✅ Overview statistik
- ✅ Profil user
- ✅ Bookmark cagar budaya
- ✅ Riwayat aktivitas

### Dashboard Admin
- ✅ Kelola user (CRUD)
- ✅ Verifikasi pembayaran
- ✅ Approve/reject user
- ✅ Kelola konten cagar budaya
- ✅ Kelola lampiran
- ✅ Review ODCB
- ✅ Update status ODCB
- ✅ Lihat statistik pendapatan
- ✅ Audit trail

### Dashboard Manager
- ✅ Kelola konten
- ✅ Review ODCB
- ✅ Lihat statistik
- ✅ Kelola lampiran

### Dashboard Member
- ✅ Akses penuh konten
- ✅ Daftar ODCB
- ✅ Bookmark & komentar
- ✅ Lihat status pendaftaran

---

## 🎨 Teknologi

### Frontend
- **HTML5** - Struktur halaman
- **Tailwind CSS** (via CDN) - Styling
- **JavaScript** - Interaktivitas
- **Alpine.js** (optional) - Reactive UI

### Backend
- **PHP 7.4+** - Server-side logic
- **PDO** - Database abstraction
- **MySQL 5.7+** - Database

### Features
- Responsive design (mobile-friendly)
- SEO-friendly URLs
- Flash messages
- Form validation
- File upload handling
- Image optimization
- Pagination
- Search & filter
- AJAX (optional)

---

## 🚀 Deployment

### Local Development (XAMPP/Laragon)
1. Install XAMPP/Laragon
2. Copy folder ke `htdocs` atau `www`
3. Start Apache & MySQL
4. Import database
5. Akses via `http://localhost/sicaba`

### Production Server
1. Upload semua file ke server
2. Import database via phpMyAdmin
3. Edit `config/config.php`:
   - Sesuaikan DB credentials
   - Update BASE_URL
4. Set folder permissions:
   ```bash
   chmod 755 uploads/
   chmod 777 uploads/bukti_pembayaran/
   chmod 777 uploads/lampiran/
   ```
5. Enable mod_rewrite (Apache):
   ```apache
   <Directory /var/www/html/sicaba>
       AllowOverride All
   </Directory>
   ```

### Environment Variables (Optional)
Untuk production, gunakan environment variables:
```php
define('DB_HOST', getenv('DB_HOST'));
define('DB_NAME', getenv('DB_NAME'));
define('DB_USER', getenv('DB_USER'));
define('DB_PASS', getenv('DB_PASS'));
```

---

## 📞 Support & Contact

### Developer
- **Nama**: Agus Wirabudiman
- **Email**: sicaba@tasikmalayakota.go.id
- **Phone**: (0265) 321234

### Dinas Kebudayaan Kota Tasikmalaya
- **Alamat**: Jl. Ir. H. Juanda No. 1, Tasikmalaya 46111
- **Website**: www.tasikmalayakota.go.id

---

## 📄 Lisensi

Aplikasi ini dikembangkan untuk Dinas Kebudayaan Kota Tasikmalaya.
Hak cipta © 2024. All rights reserved.

---

## 🙏 Credits

- **Tailwind CSS** - https://tailwindcss.com
- **Font Awesome** - https://fontawesome.com
- **MySQL** - https://www.mysql.com
- **PHP** - https://www.php.net

---

## 📝 Changelog

### Version 1.0.0 (2024)
- Initial release
- 17 tabel database
- 4 role user
- Sistem pembayaran terintegrasi
- Manajemen ODCB lengkap
- Dashboard admin & manager
- Responsive design
- Audit trail
- Notifikasi otomatis

---

**Dibuat dengan ❤️ untuk pelestarian budaya Kota Tasikmalaya**
