const wa = require('@open-wa/wa-automate');

// Fungsi utama untuk menjalankan bot
function startBot(client) {
    console.log('✅ BOT BERHASIL TERSAMBUNG KE WHATSAPP!');
    console.log('ID Klien:', client.wid);

    // Menangani setiap pesan yang masuk
    client.onMessage(async (message) => {
        // Ambil isi pesan dan ubah ke huruf kecil untuk perbandingan
        const body = message.body.toLowerCase();
        
        // --- 1. Fitur Utama (Contoh Sederhana) ---
        
        // Fitur 1: Balas pesan "halo"
        if (body === 'halo') {
            await client.sendText(message.from, 'Halo juga! Saya adalah Bot WhatsApp.');
        }

        // Fitur 2: Cek Status Bot
        if (body === '!status') {
            await client.sendText(message.from, `Bot sedang aktif dengan ID: ${client.wid}`);
        }

        // Fitur 3: Memberikan Bantuan (List Fitur)
        if (body === '!help') {
            const helpMessage = `
**Daftar Fitur Bot (3 Fitur):**
1. Ketik: **halo** (Bot akan membalas sapaan Anda)
2. Ketik: **!status** (Cek apakah Bot sedang aktif)
3. Ketik: **!help** (Menampilkan menu ini)

Untuk 55 fitur lainnya, Anda perlu mengembangkannya dalam fungsi terpisah! 🚀
            `;
            await client.sendText(message.from, helpMessage);
        }

        // Jika Anda ingin membuat 58 fitur, Anda harus menambahkan 55
        // blok 'if' atau fungsi penanganan lainnya di sini.
    });
}

// Konfigurasi untuk wa-automate
wa.create({
    // path ke folder session (penting untuk menyimpan data login)
    sessionId: 'WaBotSession', 
    multiDevice: true, // Untuk mendukung login Multi-Device
    authTimeout: 60, // Waktu tunggu dalam detik untuk scan QR code
    disableSpins: true,
    // PENTING: Jika ada error ChromePathNotSetError, 
    // hapus baris di bawah ini dan gunakan variabel lingkungan!
    // Atau set path jika Anda yakin:
    // chromiumPath: '/usr/bin/chromium-browser', 
    
    // Opsi lain, seperti menentukan lokasi Chrome yang diunduh:
    // useChrome: true,
    // executablePath: '/usr/bin/google-chrome',
}).then(client => startBot(client))
  .catch(error => console.error('Gagal menjalankan Bot:', error));
