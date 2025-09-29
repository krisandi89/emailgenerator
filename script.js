document.addEventListener('DOMContentLoaded', () => {
    const improveBtn = document.getElementById('improve-btn');
    const copyBtn = document.getElementById('copy-btn');
    const userDraftEl = document.getElementById('user-draft');
    const improvedDraftEl = document.getElementById('improved-draft');
    const emailStyleEl = document.getElementById('email-style');
    const outputLanguageEl = document.getElementById('output-language');

    improveBtn.addEventListener('click', async () => {
        const userDraft = userDraftEl.value;
        const style = emailStyleEl.value;
        const language = outputLanguageEl.value;

        if (!userDraft) {
            alert('Please paste your draft to improve.');
            return;
        }

        improvedDraftEl.value = 'Improving your draft...';

        // Simulate API call to improve the draft
        try {
            const improvedText = await improveEmailDraft(userDraft, style, language);
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

    // Placeholder function to simulate the API
    function improveEmailDraft(draft, style, lang) {
        return new Promise(resolve => {
            setTimeout(() => {
                const placeholder = "[IMPROVED_DRAFT_HERE]";
                let template = '';

                if (lang === 'id') {
                    switch (style) {
                        case 'professional':
                            template = `Dengan hormat,\n\nMenindaklanjuti draf Anda, kami telah menyempurnakannya agar terdengar lebih profesional. Berikut adalah versi yang disarankan:\n\n${placeholder}\n\nSalam,\n[Nama Anda]`;
                            break;
                        case 'friendly':
                            template = `Hai,\n\nIni draf kamu yang udah dibuat lebih ramah. Semoga suka ya!\n\n${placeholder}\n\nSalam hangat,\n[Nama Anda]`;
                            break;
                        case 'concise':
                            template = `Berikut adalah draf Anda yang telah diringkas:\n\n${placeholder}\n\nTerima kasih,\n[Nama Anda]`;
                            break;
                    }
                } else { // English
                    switch (style) {
                        case 'professional':
                            template = `Dear Sir/Madam,\n\nFurther to your draft, we have refined it to sound more professional. Here is the suggested version:\n\n${placeholder}\n\nSincerely,\n[Your Name]`;
                            break;
                        case 'friendly':
                            template = `Hi there,\n\nHere's your draft, but friendlier. Hope you like it!\n\n${placeholder}\n\nBest regards,\n[Your Name]`;
                            break;
                        case 'concise':
                            template = `Here is your condensed draft:\n\n${placeholder}\n\nThanks,\n[Your Name]`;
                            break;
                    }
                }

                // In a real scenario, an API would return a completely new text.
                // For this simulation, we just wrap the original draft in the template.
                const improvedText = template.replace(placeholder, draft);
                resolve(improvedText);
            }, 1000); // Simulate network delay
        });
    }
});