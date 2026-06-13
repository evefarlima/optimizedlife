// =====================================================================
// ⚙️ CONFIGURAÇÕES PRINCIPAIS (Altere apenas os valores aqui)
// =====================================================================

const CONFIG = {
    // ⏱️ Tempo de Delay: Formato "Minutos:Segundos"
    tempoDeDelay: "00:10", // Altere para "00:10" para testar em 10 segundos!

    // 🔗 Links de Checkout dos Botões
    linkPote2: "https://glpropatche.com/b?p=GPP2V1&b=341&fid=640&fnid=2&pfnid=1&pg=9467&aff_id=1286",
    linkPote6: "https://glpropatche.com/b?p=GPP6V1&b=341&fid=640&fnid=2&pfnid=1&pg=9467&aff_id=1286",
    linkPote3: "https://glpropatche.com/b?p=GPP3V1&b=341&fid=640&fnid=2&pfnid=1&pg=9467&aff_id=1286"
};

// =====================================================================
// 💻 CÓDIGO DO SISTEMA (Sincronizado com VTurb)
// =====================================================================

function onDomReady(callback) {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', callback);
    } else {
        callback();
    }
}

onDomReady(function() {

    // 1. APLICAR LINKS DE CHECKOUT
    document.getElementById('card-2-bottles').href = CONFIG.linkPote2;
    document.getElementById('card-6-bottles').href = CONFIG.linkPote6;
    document.getElementById('card-3-bottles').href = CONFIG.linkPote3;

    // Converte o tempo do formato "MM:SS" para segundos puros
    function converterParaSegundos(tempoStr) {
        const partes = tempoStr.split(':');
        const minutos = parseInt(partes[0], 10) || 0;
        const segundos = parseInt(partes[1], 10) || 0;
        return (minutos * 60) + segundos;
    }

    const tempoAlvoSegundos = converterParaSegundos(CONFIG.tempoDeDelay);
    let ofertaExibida = false;

    // Função que efetivamente mostra os botões e ativa os pop-ups
    function revelarOferta() {
        if (ofertaExibida) return; // Evita rodar duas vezes
        ofertaExibida = true;
        
        // Revela a área oculta
        document.querySelector('.video-cta-container').style.display = 'block';
        
        // Inicia as notificações falsas
        if (typeof startAllNotifications === 'function') {
            startAllNotifications();
        }
    }

    // 2. INTEGRAÇÃO DIRETA COM A API DO VTURB (Sincronização por segundo)
    window.vTurbOnPlayerReady = window.vTurbOnPlayerReady || [];
    window.vTurbOnPlayerReady.push(function(player) {
        
        // Toda vez que o tempo do vídeo muda, o VTurb avisa essa função
        player.on('timeupdate', function(data) {
            const tempoAtualDoVideo = data.currentTime;
            
            // Se o vídeo chegou no tempo configurado, mostra a oferta!
            if (tempoAtualDoVideo >= tempoAlvoSegundos) {
                revelarOferta();
            }
        });
    });

    // BACKUP DE SEGURANÇA: Se o player falhar, abre por tempo de página
    setTimeout(() => {
        revelarOferta();
    }, (tempoAlvoSegundos + 10) * 1000); 


    // 3. SISTEMA DO CONTADOR DE PESSOAS ASSISTINDO
    function getRandomInt(min, max) { return Math.floor(Math.random() * (max - min + 1) + min); }
    function updateCounter() {
        var viewsEl = document.getElementById('viewsCount');
        if(!viewsEl) return;
        var currentCount = parseInt(viewsEl.textContent.replace(/,/g, ''), 10);
        var increment = getRandomInt(1, 5);
        var nextCount = currentCount + increment;
        viewsEl.textContent = nextCount.toLocaleString('en-US');
        setTimeout(updateCounter, getRandomInt(1500, 3000));
    }
    if(document.getElementById('viewsCount')) {
        document.getElementById('viewsCount').textContent = '71,712';
        updateCounter();
    }

    // 4. SISTEMA DE NOTIFICAÇÕES FALSAS DE COMPRA
    const customerNames = ["Olivia", "Emma", "Ava", "Charlotte", "Sophia", "Amelia", "Isabella", "Mia", "Evelyn", "Harper", "Camila", "Gianna", "Abigail", "Luna", "Ella", "Elizabeth", "Sofia", "Emily", "Avery", "Mila", "Liam", "Noah", "Oliver", "Elijah", "William", "James", "Benjamin", "Lucas", "Henry", "Alexander"];
    const states = [
        {"name": "Alabama", "abbreviation": "al"}, {"name": "Alaska", "abbreviation": "ak"}, {"name": "Arizona", "abbreviation": "az"}, {"name": "Arkansas", "abbreviation": "ar"}, {"name": "California", "abbreviation": "ca"}, {"name": "Colorado", "abbreviation": "co"}, {"name": "Florida", "abbreviation": "fl"}, {"name": "Georgia", "abbreviation": "ga"}, {"name": "Hawaii", "abbreviation": "hi"}, {"name": "Illinois", "abbreviation": "il"}, {"name": "Texas", "abbreviation": "tx"}, {"name": "New York", "abbreviation": "ny"}
    ];
    const productNames = ["2 Bottles of GLPro", "3 Bottles of GLPro", "6 Bottles of GLPro"];

    function startAllNotifications() {
        const purchaseNotification = document.getElementById('purchase-notification');
        if(!purchaseNotification) return;

        function updateNotificationContent(name, location, product, image) {
            purchaseNotification.querySelector('.customer-name').textContent = name;
            purchaseNotification.querySelector('.customer-location').textContent = location;
            purchaseNotification.querySelector('.product-name').textContent = product;
            purchaseNotification.querySelector('.profile-image').src = image;
        }

        function showNotification() {
            const name = customerNames[Math.floor(Math.random() * customerNames.length)];
            const state = states[Math.floor(Math.random() * states.length)];
            const product = productNames[Math.floor(Math.random() * productNames.length)];
            const image = `https://flagcdn.com/h40/us-${state.abbreviation}.png`;

            updateNotificationContent(name, state.name, product, image);

            purchaseNotification.classList.add('show');
            setTimeout(() => {
                purchaseNotification.classList.remove('show');
                purchaseNotification.classList.add('hide');
                setTimeout(() => purchaseNotification.classList.remove('hide'), 500);
            }, 10000);
        }

        function startRandomInterval() {
            setTimeout(() => {
                showNotification();
                startRandomInterval();
            }, Math.random() * (30000 - 10000) + 11000);
        }

        setTimeout(() => {
            showNotification();
            startRandomInterval();
        }, 2000);
    }
});
