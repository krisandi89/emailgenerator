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

        // Call the backend API to improve the draft
        try {
            const response = await fetch('http://localhost:3000/api/improve', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    draft: userDraft,
                    context: emailContext,
                    style: style,
                    language: language,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'An unknown error occurred.');
            }

            const data = await response.json();
            improvedDraftEl.value = data.improvedText;

        } catch (error) {
            improvedDraftEl.value = `Failed to improve the draft: ${error.message}`;
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
});