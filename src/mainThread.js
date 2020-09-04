const { Worker } = require("worker_threads");
const path = require("path");
const os = require("os");
const db = require('./database');

const cpuCount = os.cpus().length;
const workerScript = path.join(__dirname, "./worker.js");

const sortArrayWithWorker = arr => {
    return new Promise((resolve, reject) => {
        const worker = new Worker(workerScript, { workerData: arr });
        worker.on("message", resolve);
        worker.on("error", reject);
    });
};

async function loadDistributedWorkers(workers, data) {
    const segmentsPerWorker = Math.round(data.length / workers);
    let promises = Array(workers)
        .fill()
        .map((_, index) => {
            let arrayToSort;
            if (index === 0) {
                arrayToSort = data.slice(0, segmentsPerWorker);
            } else if (index === workers - 1) {
                arrayToSort = data.slice(segmentsPerWorker * index);
            } else {
                arrayToSort = data.slice(segmentsPerWorker * index,segmentsPerWorker * (index + 1))
            }
            return sortArrayWithWorker(arrayToSort)
        });
    await Promise.all(promises)
}

async function run(data) {
    await loadDistributedWorkers(cpuCount, data);
}

db.find({ status: 'NEW' }).then(async (data) => {
    data = data.map((row) => {
        return {
            id: row._id.toString(),
            url: row.url
        }
    });
    if(data.length) {
        await run(data)
    } else {
        console.log('No any rows found')
        process.exit()
    }
});