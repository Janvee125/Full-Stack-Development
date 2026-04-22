const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();

/* serve static files */
app.use(express.static(__dirname));

/* resume route */
app.get('/resume', (req, res) => {

    const filePath = path.join(__dirname, 'resume.pdf');

    if (fs.existsSync(filePath)) {
        return res.sendFile(filePath);
    }

    return res.send(`
        <html>
        <body style="text-align:center; font-family:Arial; margin-top:100px;">
            <h1 style="font-weight:bold;">No Resume Found</h1>
            <p>Please upload the resume</p>
            <a href="/" style="
                padding:10px 20px;
                background:#8b5cf6;
                color:white;
                text-decoration:none;
                border-radius:8px;
            ">
                Back to Home
            </a>
        </body>
        </html>
    `);
});

/* start server */
app.listen(3000, () => {
    console.log("Running on http://localhost:3000");
});