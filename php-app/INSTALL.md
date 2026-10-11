# 🚀 Panduan Instalasi Cepat SICABA PHP

## Langkah 1: Persiapan Environment

### Opsi A: XAMPP (Windows/Mac/Linux)
1. Download XAMPP dari https://www.apachefriends.org/
2. Install XAMPP
3. Start Apache dan MySQL dari XAMPP Control Panel

### Opsi B: Laragon (Windows - Recommended)
1. Download Laragon dari https://laragon.org/
2. Install Laragon
3. Start All Services

### Opsi C: Server Production (Linux)
```bash
# Install LAMP stack
sudo apt update
sudo apt install apache2 mysql-server php php-mysql php-mbstring php-xml

# Enable mod_rewrite
sudo a2enmod rewrite
sudo systemctl restart apache2
```

---

## Langkah 2: Setup Database

### Via Command Line
```bash
# Login ke MySQL
mysql -u root -p

# Buat database dan import
mysql -u root -p < database/schema.sql
```

### Via phpMyAdmin
1. Buka http://localhost/phpmyadmin
2. Klik tab "Import"
3. Pilih file `database/schema.sql`
4. Klik "Go"

---

## Langkah 3: Deploy Aplikasi

### Local Development
```bash
# Copy folder ke htdocs (XAMPP) atau www (Laragon)
# Windows XAMPP:
copy /E /I php-app C:\xampp\htdocs\sicaba

# Windows Laragon:
copy /E /I php-app C:\laragon\www\sicaba

# Linux:
sudo cp -r php-app /var/www/html/sicaba
sudo chown -R www-data:www-data /var/www/html/sicaba
```

### Setup Upload Folders
```bash
# Windows
mkdir C:\xampp\htdocs\sicaba\uploads\bukti_pembayaran
mkdir C:\xampp\htdocs\sicaba\uploads\lampiran
mkdir C:\xampp\htdocs\sicaba\uploads\odcb
mkdir C:\xampp\htdocs\sicaba\uploads\galeri

# Linux
sudo mkdir -p /var/www/html/sicaba/uploads/{bukti_pembayaran,lampiran,odcb,galeri}
sudo chmod -R 777 /var/www/html/sicaba/uploads
```

---

## Langkah 4: Konfigurasi

Edit file `config/config.php`:

```php
// Sesuaikan dengan environment Anda
define('DB_HOST', 'localhost');
define('DB_NAME', 'sicaba_db');
define('DB_USER', 'root');          // Username MySQL
define('DB_PASS', '');              // Password MySQL (kosongkan jika default)
define('BASE_URL', 'http://localhost/sicaba');  // URL aplikasi
```

---

## Langkah 5: Akses Aplikasi

Buka browser dan akses:
```
http://localhost/sicaba/
```

---

## 👤 Akun Login Default

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@sicaba.go.id | admin123 |
| Manager | manager@sicaba.go.id | manager123 |
| Member | member@sicaba.go.id | member123 |
| Public | public@sicaba.go.id | public123 |

---

## ✅ Checklist Verifikasi

- [ ] Apache/MySQL berjalan
- [ ] Database `sicaba_db` terbuat
- [ ] Tabel-tabel terimport (17 tabel)
- [ ] File `config/config.php` sudah disesuaikan
- [ ] Folder `uploads/` memiliki permission write
- [ ] Bisa akses http://localhost/sicaba/
- [ ] Bisa login dengan akun demo

---

## 🔧 Troubleshooting

### Error: "Koneksi database gagal"
- Pastikan MySQL service berjalan
- Cek username & password di `config/config.php`
- Pastikan database `sicaba_db` sudah terbuat

### Error: "Upload gagal"
- Cek permission folder `uploads/`
- Linux: `sudo chmod -R 777 uploads/`
- Windows: Klik kanan folder → Properties → Security → Edit → Full Control

### Error: "404 Not Found"
- Pastikan `BASE_URL` di `config/config.php` sesuai
- Pastikan file berada di folder yang benar

### Error: "Session error"
- Cek folder `session.save_path` di php.ini
- Restart Apache

---

## 📞 Support

Jika ada masalah, hubungi:
- Email: sicaba@tasikmalayakota.go.id
- Phone: (0265) 321234

---

**Selamat! Aplikasi SICABA siap digunakan 🎉**
