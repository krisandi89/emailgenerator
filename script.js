document.addEventListener('DOMContentLoaded', () => {
    const improveBtn = document.getElementById('improve-btn');
    const copyBtn = document.getElementById('copy-btn');
    const userDraftEl = document.getElementById('user-draft');
    const emailContextEl = document.getElementById('email-context');
    const improvedDraftEl = document.getElementById('improved-draft');
    const emailStyleEl = document.getElementById('email-style');
    const outputLanguageEl = document.getElementById('output-language');

    improveBtn.addEventListener('click', async () => {
        const userDraft = userDraftEl.value;
        const emailContext = emailContextEl.value;
        const style = emailStyleEl.value;
        const language = outputLanguageEl.value;

        if (!userDraft) {
            alert('Please paste your draft to improve.');
            return;
        }

        improvedDraftEl.value = 'Improving your draft...';

        // Simulate API call to improve the draft
        try {
            const improvedText = await improveEmailDraft(userDraft, style, language, emailContext);
            improvedDraftEl.value = improvedText;
        } catch (error) {
            improvedDraftEl.value = 'Failed to improve the draft. Please try again.';
            console.error(error);
        }
    });

    copyBtn.addEventListener('click', () => {
        if (!improvedDraftEl.value || improvedDraftEl.value.includes('...')) {
            alert('There is no text to copy.');
            return;
        }
        improvedDraftEl.select();
        document.execCommand('copy');
        alert('Text copied successfully!');
    });

    // Placeholder function to simulate a more intelligent API
    function improveEmailDraft(draft, style, lang, context = '') {
        return new Promise(resolve => {
            setTimeout(() => {
                // --- Smarter Simulation Logic ---
                const normalizedDraft = draft.trim().toLowerCase();
                let improvedText = '';

                // Example 1: Requesting a day off
                const dayOffRequest = "hi, i need to ask for a day off next week. thanks";
                if (normalizedDraft === dayOffRequest) {
                    if (lang === 'en') {
                        if (style === 'professional') {
                            improvedText = "I am writing to formally request a day of leave for next week. Thank you for your consideration.";
                        } else if (style === 'friendly') {
                            improvedText = "Hey! Just wanted to ask if I could take a day off next week. Let me know if that works. Thanks a bunch!";
                        } else { // concise
                            improvedText = "I would like to request one day of leave for next week.";
                        }
                    } else { // Indonesian
                        if (style === 'professional') {
                            improvedText = "Dengan hormat, saya menulis surat ini untuk secara resmi mengajukan permohonan cuti selama satu hari pada minggu depan. Terima kasih atas pertimbangan Anda.";
                        } else if (style === 'friendly') {
                            improvedText = "Halo, saya mau tanya apakah saya bisa mengambil cuti sehari di minggu depan? Tolong kabari ya. Makasih banyak!";
                        } else { // concise
                            improvedText = "Saya ingin mengajukan permohonan cuti satu hari untuk minggu depan.";
                        }
                    }
                    resolve(improvedText);
                    return;
                }

                // --- Fallback for any other text ---
                let finalDraft = draft;
                if (context) {
                    const contextText = lang === 'id' ? 'Menanggapi email Anda:' : 'In response to your email:';
                    finalDraft = `${contextText}\n>"${context.trim()}"\n\n${draft}`;
                }

                const placeholder = "[IMPROVED_DRAFT_HERE]";
                let template = `(This is a basic template. A real AI would provide a more refined version.)\n\n${placeholder}`;

                if (lang === 'id') {
                    template = `(Ini adalah templat dasar. AI yang sebenarnya akan memberikan versi yang lebih baik.)\n\n${placeholder}`;
                }

                resolve(template.replace(placeholder, finalDraft));
            }, 1000); // Simulate network delay
        });
    }
});