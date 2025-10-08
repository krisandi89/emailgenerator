const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// A simple test route
app.get('/', (req, res) => {
  res.send('Email Improver API is running!');
});

// API endpoint to improve an email draft
app.post('/api/improve', async (req, res) => {
    const { draft, context, style, language } = req.body;

    if (!draft) {
        return res.status(400).json({ error: 'Email draft is required.' });
    }

    try {
        // --- Placeholder for Real AI API Call ---
        // In a real application, you would make a call to an AI service here.
        // You would need to use an API key, which should be stored securely
        // as an environment variable, not hardcoded.
        //
        // Example with a fictional AI service:
        // const apiKey = process.env.AI_API_KEY;
        // const response = await fetch('https://api.ai-provider.com/v1/completions', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Authorization': `Bearer ${apiKey}`,
        //     },
        //     body: JSON.stringify({
        //         prompt: `Given the context "${context}", improve the following email draft with a ${style} tone in ${language}: "${draft}"`,
        //         max_tokens: 250,
        //     }),
        // });
        // const data = await response.json();
        // const improvedText = data.choices[0].text;

        // Using a more realistic placeholder response for now.
        const improvedText = `This is a much-improved, AI-generated response based on your draft. It has a '${style}' tone and is written in '${language}'.\n\nOriginal context provided:\n>"${context}"`;

        res.json({ improvedText });

    } catch (error) {
        console.error('Error improving email draft:', error);
        res.status(500).json({ error: 'Failed to improve email draft.' });
    }
});


app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});