 const blockchainSelect = document.getElementById('blockchainSelect');

const startBtn = document.getElementById('startBtn');

const stopBtn = document.getElementById('stopBtn');

const miningStatus = document.getElementById('miningStatus');

const profitDisplay = document.getElementById('profitDisplay');

const profitGraph = document.getElementById('profitGraph');

const coinAnimation = document.getElementById('coinAnimation');

const miningProfits = {

FIXERCOIN: 0.0000001,

    LOCKER: 0.0000001,

    PUSHER: 0.0000001,

    // Add more as needed

};

let miningInterval;

let selectedBlockchain = 'bitcoin';

let miningStarted = false;

let totalProfit = 0;

let profitData = [];

startBtn.addEventListener('click', function() {

    if (!miningStarted) {

        startMining();

        miningStarted = true;

        startBtn.disabled = true;

        stopBtn.disabled = false;

    }

});

stopBtn.addEventListener('click', function() {

    if (miningStarted) {

        stopMining();

        miningStarted = false;

        startBtn.disabled = false;

        stopBtn.disabled = true;

    }

});

blockchainSelect.addEventListener('change', function() {

    selectedBlockchain = blockchainSelect.value;

    resetDashboard();

});

function startMining() {

    miningInterval = setInterval(function() {

        mine(selectedBlockchain);

    }, 1000); // Mining interval set to 1 second (1000 milliseconds)

    coinAnimation.innerHTML = '<img src="update.png" alt="Coin" class="coin spinning">';

}

function stopMining() {

    clearInterval(miningInterval);

    updateMiningStatus('Mining stopped.');

    coinAnimation.innerHTML = '';

}

function mine(blockchain) {

    const profitPerSecond = miningProfits[blockchain];

    totalProfit += profitPerSecond;

    profitData.push(totalProfit.toFixed(8));

    updateMiningStatus(`Mining ${blockchain.toUpperCase()}...`);

    updateProfitDisplay(`Total Profit: ${totalProfit.toFixed(8)} ${blockchain.toUpperCase()} (estimated)`); // Display profit with 8 decimal places

    updateProfitGraph(profitData);

}

function updateMiningStatus(status) {

    miningStatus.textContent = status;

}

function updateProfitDisplay(profit) {

    profitDisplay.textContent = profit;

}

function updateProfitGraph(data) {

    profitGraph.innerHTML = ''; // Clear previous graph

    const maxProfit = Math.max(...data);

    const graphHeight = profitGraph.clientHeight;

    data.forEach((value) => {

        const barHeight = (value / maxProfit) * graphHeight;

        const bar = document.createElement('div');

        bar.style.height = `${barHeight}px`;

        bar.classList.add('bar');

        profitGraph.appendChild(bar);

    });

}

function resetDashboard() {

    totalProfit = 0;

    profitData = [];

    updateProfitDisplay(`Total Profit: 0 ${selectedBlockchain.toUpperCase()}`);

    profitGraph.innerHTML = '';

    updateMiningStatus('Select a blockchain and start mining.');

}
