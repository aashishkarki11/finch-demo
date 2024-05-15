// import express from 'express';
// import fs from 'fs';
// import dotenv from 'dotenv';
// import Finch from '@tryfinch/finch-api';

// dotenv.config();
// const app = express();

// const clientId = process.env.CLIENT_ID;
// const clientSecret = process.env.CLIENT_SECRET;
// const redirectUri = process.env.REDIRECT_URI;

// console.log('CLIENT_ID:', clientId);
// console.log('CLIENT_SECRET:', clientSecret);
// console.log('REDIRECT_URI:', redirectUri);

// const finchClient = new Finch({
//     clientId: clientId,
//     clientSecret: clientSecret,
//     redirectUri: redirectUri
// });

// app.get('/auth', async (req, res) => {
//     const code = req.query.code;
//     console.log("code:", code);

//     if (!code) {
//         res.status(400).send('Authorization code is missing');
//         return;
//     }

//     try {
//         console.log('Requesting access token with code:', code);

//         const accessTokenResponse = await finchClient.accessTokens.create({
//             code: code,
//             client_id: process.env.CLIENT_ID,
//             client_secret: process.env.CLIENT_SECRET,
//             redirect_uri: process.env.REDIRECT_URI
//         });

//         const accessToken = accessTokenResponse.access_token;
//         const jsonResponse = {
//             access_token: accessToken
//         };

//         console.log(jsonResponse);
//         fs.writeFileSync('token.json', JSON.stringify(jsonResponse));
//         res.json(jsonResponse);
//     } catch (error) {
//         console.error('Error exchanging code for access token:', error.message);
//         res.status(500).send('Error exchanging code for access token');
//     }
// });

// const port = process.env.PORT || 3001;

// app.listen(port, () => {
//     console.log(`Server listening on port ${port}`);
// });

// old sdk method
import express from 'express';
import fs from 'fs';
import dotenv from 'dotenv';
import Finch from '@tryfinch/finch-api';

dotenv.config();
const app = express();

const finchClient = new Finch({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET
});

app.get('/auth', async (req, res) => {
    const code = req.query.code;
    console.log("code:", code);

    try {
        const accessToken = await finchClient.getAccessToken(code, {
            redirectUri: process.env.REDIRECT_URI
        });

        const jsonResponse = {
            access_token: accessToken
        };

        console.log(jsonResponse);
        fs.writeFileSync('token.json', JSON.stringify(jsonResponse));
        res.json(jsonResponse);
    } catch (error) {
        console.error('Error exchanging code for access token:', error);
        res.status(500).send('Error exchanging code for access token');
    }
});

const port = process.env.PORT;

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});


//rest endpoint

// import express from 'express'
// import axios from 'axios';
// import fs from 'fs'
// import dotenv from 'dotenv';
//
// dotenv.config()
// const app = express();
//
// app.get('/auth', async (req, res) => {
//     const code = req.query.code;
//     console.log("code:", code);
//
//     try {
//         const tokenResponse = await axios.post('https://api.tryfinch.com/auth/token', {
//             client_id: process.env.CLIENT_ID,
//             client_secret: process.env.CLIENT_SECRET,
//             code: code,
//             redirect_uri: process.env.REDIRECT_URI
//         });
//
//         if (tokenResponse.status === 200) {
//             const accessToken = tokenResponse.data.access_token;
//             const jsonResponse = {
//                 access_token: accessToken
//             };
//
//             console.log(jsonResponse);
//             fs.writeFileSync('token.json', JSON.stringify(jsonResponse));
//             res.json(jsonResponse);
//         } else {
//             throw new Error(`Failed to exchange code for access token. Status: ${tokenResponse.status}`);
//         }
//     } catch (error) {
//         console.error('Error exchanging code for access token:', error);
//         res.status(500).send('Error exchanging code for access token');
//     }
// });
//
// const port = process.env.PORT;
//
// app.listen(port, () => {
//     console.log(`Server listening on port ${port}`);
// });



