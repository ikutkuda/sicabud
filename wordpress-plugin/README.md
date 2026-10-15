# SICABA - Sistem Informasi Cagar Budaya

**Plugin WordPress untuk Sistem Informasi Cagar Budaya Kota Tasikmalaya**

Versi: 1.0.0  
Author: Dinas Kebudayaan Kota Tasikmalaya  
License: GPL v2 or later

---

## 📋 Deskripsi

SICABA (Sistem Informasi Cagar Budaya) adalah plugin WordPress untuk mendokumentasikan dan mengelola cagar budaya di Kota Tasikmalaya sesuai dengan:

- **UU No. 11 Tahun 2010** tentang Cagar Budaya
- **Permendikbudristek No. 36 Tahun 2023** tentang Penyelenggaraan Register Nasional Cagar Budaya

## ✨ Fitur Utama

### 🏛️ Manajemen Cagar Budaya
- Custom Post Type untuk Cagar Budaya
- Taxonomy: Jenis, Kategori, Status Penetapan, Kecamatan
- Meta fields untuk data detail (lokasi, tahun, sejarah, arsitektur, koordinat GPS)
- Lampiran dokumen (SK, sertifikat, foto, peta)
- Status penetapan: Nasional, Provinsi, Kota/Kabupaten

### 📋 Pendaftaran ODCB (Objek Diduga Cagar Budaya)
- Form pendaftaran sesuai Permendikbudristek 36/2023
- 5 Jenis ODCB: Benda, Bangunan, Struktur, Situs, Kawasan
- Upload foto KTP/SIM dan foto ODCB
- Status tracking: Terdaftar → Pengkajian → Ditetapkan
- Dashboard user untuk melihat status pendaftaran

### 👥 Manajemen User
- 4 Role: Administrator, Manager, Member, Public
- Sistem pembayaran Rp 110.000 untuk Member/Manager
- Verifikasi pembayaran oleh Administrator
- Status akun: Pending → Approved/Rejected

### 📊 Dashboard & Statistik
- Statistik cagar budaya per jenis, kategori, status
- Statistik ODCB per status
- Grafik distribusi
- Audit trail aktivitas

### 🗺️ Peta Interaktif
- Peta lokasi cagar budaya
- Koordinat GPS
- Integrasi Google Maps/Leaflet

### 🔌 REST API
- Endpoint untuk cagar budaya
- Endpoint untuk ODCB
- Endpoint untuk statistik
- Authentication untuk operasi write

### 📱 Shortcodes
- `[sicaba_list]` - Tampilkan daftar cagar budaya
- `[sicaba_detail id="123"]` - Tampilkan detail cagar budaya
- `[sicaba_map]` - Tampilkan peta
- `[sicaba_statistics]` - Tampilkan statistik
- `[sicaba_odcb_form]` - Tampilkan form ODCB
- `[sicaba_odcb_list]` - Tampilkan daftar ODCB user

## 🚀 Instalasi

### Metode 1: Upload Manual
1. Download file plugin
2. Upload folder `sicaba` ke `/wp-content/plugins/`
3. Aktifkan plugin melalui menu 'Plugins' di WordPress
4. Plugin akan otomatis membuat database tables dan custom post types

### Metode 2: Via WordPress Admin
1. Download file plugin dan zip folder `sicaba`
2. Masuk ke WordPress Admin → Plugins → Add New → Upload Plugin
3. Pilih file zip dan klik "Install Now"
4. Aktifkan plugin

### Konfigurasi Awal
1. Masuk ke menu **SICABA** di admin sidebar
2. Atur pengaturan pembayaran di **Pengaturan**
3. Tambahkan cagar budaya melalui menu **Cagar Budaya**
4. Buat halaman dengan shortcode untuk frontend

## 📖 Penggunaan

### Shortcodes

#### Tampilkan Daftar Cagar Budaya
```
[sicaba_list limit="12" columns="3"]
```

Parameter:
- `limit` - Jumlah item per halaman (default: 12)
- `columns` - Jumlah kolom (default: 3)
- `jenis` - Filter berdasarkan jenis (slug)
- `kategori` - Filter berdasarkan kategori (slug)
- `kecamatan` - Filter berdasarkan kecamatan (slug)

#### Tampilkan Detail Cagar Budaya
```
[sicaba_detail id="123"]
```

#### Tampilkan Peta
```
[sicaba_map height="500px" zoom="12"]
```

#### Tampilkan Statistik
```
[sicaba_statistics]
```

#### Form Pendaftaran ODCB
```
[sicaba_odcb_form]
```

#### Daftar ODCB User
```
[sicaba_odcb_list]
```

### REST API

#### Get Cagar Budaya List
```
GET /wp-json/sicaba/v1/cagar-budaya
```

Parameters:
- `per_page` - Items per page
- `page` - Page number
- `jenis` - Filter by jenis
- `kategori` - Filter by kategori
- `kecamatan` - Filter by kecamatan
- `search` - Search query

#### Get Cagar Budaya Detail
```
GET /wp-json/sicaba/v1/cagar-budaya/{id}
```

#### Get Statistics
```
GET /wp-json/sicaba/v1/statistics
```

#### Create ODCB (Authenticated)
```
POST /wp-json/sicaba/v1/odcb
```

Headers:
```
Authorization: Bearer {token}
Content-Type: application/json
```

## 👤 Akun Demo

### Administrator
- **Email**: admin@sicaba.go.id
- **Password**: admin123

### Administrator (Agus Wirabudiman)
- **Email**: agus.wirabudiman@gmail.com
- **Password**: @GunungJantra1476

### Manager
- **Email**: manager@sicaba.go.id
- **Password**: manager123

### Member
- **Email**: member@sicaba.go.id
- **Password**: member123

### Public
- **Email**: public@sicaba.go.id
- **Password**: public123

## 💳 Informasi Pembayaran

Untuk pendaftaran Member/Manager:
- **Nominal**: Rp 110.000,-
- **Bank**: BRI (Bank Rakyat Indonesia)
- **No. Rekening**: 445301021768537
- **Atas Nama**: Agus Wirabudiman

## 📁 Struktur File

```
sicaba/
├── sicaba.php                          # Main plugin file
├── includes/
│   ├── class-sicaba.php               # Main plugin class
│   ├── class-sicaba-activator.php     # Activation handler
│   ├── class-sicaba-deactivator.php   # Deactivation handler
│   ├── class-sicaba-database.php      # Database operations
│   ├── class-sicaba-post-types.php    # Custom post types
│   ├── class-sicaba-admin.php         # Admin interface
│   ├── class-sicaba-frontend.php      # Frontend display
│   ├── class-sicaba-rest-api.php      # REST API endpoints
│   └── class-sicaba-shortcodes.php    # Shortcodes
├── admin/
│   └── views/                         # Admin page templates
├── templates/                         # Frontend templates
├── assets/
│   ├── css/
│   │   ├── admin.css                 # Admin styles
│   │   └── frontend.css              # Frontend styles
│   └── js/
│       ├── admin.js                  # Admin scripts
│       └── frontend.js               # Frontend scripts
├── languages/                         # Translation files
└── README.md                          # This file
```

## 🔧 Requirements

- WordPress 5.8 or higher
- PHP 7.4 or higher
- MySQL 5.7 or higher

## 📝 Changelog

### Version 1.0.0 (2024)
- Initial release
- Custom post type untuk Cagar Budaya
- Sistem ODCB sesuai Permendikbudristek 36/2023
- Manajemen user dengan 4 role
- Sistem pembayaran terintegrasi
- REST API endpoints
- Shortcodes untuk frontend
- Dashboard admin lengkap
- Audit trail
- Responsive design

## 🐛 Troubleshooting

### Plugin tidak aktif
- Pastikan WordPress versi 5.8+
- Pastikan PHP versi 7.4+
- Cek error log di `/wp-content/debug.log`

### Database tables tidak terbuat
- Deactivate dan reactivate plugin
- Cek permission database user
- Cek error log

### Shortcode tidak tampil
- Pastikan plugin aktif
- Cek nama shortcode
- Clear cache jika menggunakan caching plugin

### REST API error
- Pastikan permalink structure bukan "Plain"
- Cek REST API enabled
- Cek authentication untuk write operations

## 📞 Support

Untuk bantuan dan pertanyaan:
- **Email**: sicaba@tasikmalayakota.go.id
- **Website**: https://tasikmalayakota.go.id
- **Phone**: (0265) 321234

## 📄 License

This plugin is licensed under the GPL v2 or later.

```
Copyright (C) 2024 Dinas Kebudayaan Kota Tasikmalaya

This program is free software; you can redistribute it and/or
modify it under the terms of the GNU General Public License
as published by the Free Software Foundation; either version 2
of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU General Public License for more details.
```

## 🙏 Credits

- **WordPress** - https://wordpress.org
- **Tailwind CSS** - https://tailwindcss.com
- **Leaflet** - https://leafletjs.com (untuk peta)

---

**Dibuat dengan ❤️ untuk pelestarian budaya Kota Tasikmalaya**
