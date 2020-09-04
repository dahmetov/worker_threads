const { parentPort, workerData } = require('worker_threads');
const urlStatusCode = require('url-status-code');
const db = require('./database');

function fetchUrl(urls) {
    urls.forEach(async (url) => {
        await db.updateOne({ _id: url.id }, {
            status: 'PROCESSING'
        });
        let http_code;
        let status;
        try {
            http_code = await urlStatusCode(url.url)
            status = 'DONE';
        } catch (error) {
            status = 'ERROR';
        } finally {
            await db.updateOne({ _id: url.id }, {
                status: status,
                http_code: http_code
            });
            console.log(`Url ${url.url} responding with ${http_code} status`)
            parentPort.postMessage({
                status: status,
                http_code: http_code
            });
        }
    })
}
fetchUrl(workerData)
