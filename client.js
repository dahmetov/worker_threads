const db = require('./src/database');

let urls = [
    'https://proxify.io',
    'https://reddit.com',
    'https://google.com',
    'https://facebook.com',
    'https://twitter.com',
];

(async () => {
   for (const url of urls) {
       await db.create({
           url: url,
       });
   }
})()