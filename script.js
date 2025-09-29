document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generate-btn');
    const copyBtn = document.getElementById('copy-btn');
    const originalEmailEl = document.getElementById('original-email');
    const generatedReplyEl = document.getElementById('generated-reply');
    const replyToneEl = document.getElementById('reply-tone');
    const languageEl = document.getElementById('language');

    generateBtn.addEventListener('click', async () => {
        const originalEmail = originalEmailEl.value;
        const tone = replyToneEl.value;
        const language = languageEl.value;

        if (!originalEmail) {
            alert('Silakan tempel email yang ingin Anda balas.');
            return;
        }

        generatedReplyEl.value = 'Membuat balasan...';

        // Simulasi panggilan API
        // Di masa mendatang, ini akan diganti dengan panggilan API yang sebenarnya
        try {
            const reply = await generateEmailReply(originalEmail, tone, language);
            generatedReplyEl.value = reply;
        } catch (error) {
            generatedReplyEl.value = 'Gagal membuat balasan. Silakan coba lagi.';
            console.error(error);
        }
    });

    copyBtn.addEventListener('click', () => {
        if (!generatedReplyEl.value || generatedReplyEl.value === 'Balasan email akan muncul di sini...') {
            alert('Tidak ada teks untuk disalin.');
            return;
        }
        generatedReplyEl.select();
        document.execCommand('copy');
        alert('Teks berhasil disalin!');
    });

    // Fungsi placeholder untuk simulasi API
    function generateEmailReply(email, tone, lang) {
        return new Promise(resolve => {
            setTimeout(() => {
                let replyText = '';
                if (lang === 'id') {
                    if (tone === 'professional') {
                        replyText = `Dengan hormat,\n\nTerima kasih atas email Anda. Kami akan segera menindaklanjutinya.\n\nSalam,\n[Nama Anda]`;
                    } else if (tone === 'friendly') {
                        replyText = `Hai,\n\nMakasih ya emailnya. Nanti kami kabari lagi secepatnya.\n\nSalam hangat,\n[Nama Anda]`;
                    } else {
                        replyText = `Yth. Bapak/Ibu,\n\nEmail Anda sudah kami terima dan akan kami proses.\n\nTerima kasih,\n[Nama Anda]`;
                    }
                } else { // English
                    if (tone === 'professional') {
                        replyText = `Dear Sir/Madam,\n\nThank you for your email. We will follow up on this matter shortly.\n\nSincerely,\n[Your Name]`;
                    } else if (tone === 'friendly') {
                        replyText = `Hi there,\n\nThanks for the email! We'll get back to you soon.\n\nBest regards,\n[Your Name]`;
                    } else {
                        replyText = `Hello,\n\nWe have received your email and will process it accordingly.\n\nThanks,\n[Your Name]`;
                    }
                }
                resolve(replyText);
            }, 1000); // Simulasi jeda jaringan
        });
    }
});