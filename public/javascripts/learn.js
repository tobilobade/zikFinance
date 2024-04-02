function showMessage(coin) {
    var message = '';
    switch(coin) {
        case 'Bitcoin':
                message = 'Bitcoin is a decentralized digital currency, without a central bank or single administrator, that can be sent from user to user on the peer-to-peer bitcoin network without the need for intermediaries.  Bitcoin was invented in 2008 by Satoshi Nakamoto, an unknown person. Use of bitcoin as a currency began in 2009 with a pizza transaction';
                break;
            case 'Ethereum':
                message = 'Ethereum is a decentralized platform that runs smart contracts: applications that run exactly as programmed without any possibility of downtime, fraud or third-party interference.';
                break;
            case 'Litecoin':
                message = 'Litecoin is a peer-to-peer cryptocurrency created by Charlie Lee. It was created based on the Bitcoin protocol but differs in terms of the hashing algorithm used.';
                break;
            case 'Ripple':
                message = 'Ripple is a digital payment protocol that operates as both a cryptocurrency and a digital payment network for financial transactions.';
                break;
            case 'Bitcoin Cash':
                message = 'Bitcoin Cash is a peer-to-peer electronic cash system that aims to become sound global money with fast payments, micro fees, privacy, and high transaction capacity.';
                break;
            case 'EOS':
                message = 'EOS is a blockchain platform designed for the development and hosting of decentralized applications.';
                break;
            case 'Monero':
                message = 'Monero is a privacy-focused cryptocurrency that aims to provide secure, private, and untraceable transactions.';
                break;
            case 'Tron':
                message = 'Tron is a blockchain-based decentralized platform that aims to build a free, global digital content entertainment system with distributed storage technology.';
                break;
            case 'NEM':
                message = 'NEM is a blockchain platform and cryptocurrency that aims to provide solutions for businesses and enterprises.';
                break;
            case 'Tezos':
                message = 'Tezos is a blockchain platform that allows for the creation of smart contracts and decentralized applications.';
                break;
            case 'Theta':
                message = 'Theta is a decentralized video delivery network that aims to revolutionize video streaming and delivery.';
                break;
            case 'Neo':
                message = 'Neo is a blockchain platform and cryptocurrency designed to build scalable decentralized applications.';
                break;
            case 'Dash':
                message = 'Dash is a cryptocurrency that focuses on privacy and instant transactions.';
                break;
            case 'Dogecoin':
                message = 'Dogecoin is a cryptocurrency featuring a Shiba Inu from the "Doge" Internet meme as its logo. created by software engineers Billy Markus and Jackson Palmer, who decided to create a payment system as a joke, making fun of the wild speculation in cryptocurrencies at the time';
                break;
            default:
                message = 'No information available.';
                break;
    }
    document.getElementById("message").innerHTML = `${message} <br><a href="https://en.wikipedia.org/wiki/${coin}" target="_blank">Learn More on ${coin}</a><br>`
}