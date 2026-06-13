// =====================================================================
// ⚙️ CONFIGURAÇÕES PRINCIPAIS (Altere apenas os valores aqui)
// =====================================================================

const CONFIG = {
    // ⏱️ Tempo de Delay: Formato "Minutos:Segundos"
    tempoDeDelay: "00:10", // Deixe em 00:10 para testar. Depois mude para 30:00

    // 🔗 Links de Checkout dos Botões
    linkPote2: "https://glpropatche.com/b?p=GPP2V1&b=341&fid=640&fnid=2&pfnid=1&pg=9467&aff_id=1286",
    linkPote6: "https://glpropatche.com/b?p=GPP6V1&b=341&fid=640&fnid=2&pfnid=1&pg=9467&aff_id=1286",
    linkPote3: "https://glpropatche.com/b?p=GPP3V1&b=341&fid=640&fnid=2&pfnid=1&pg=9467&aff_id=1286"
};

// =====================================================================
// 💻 CÓDIGO DO SISTEMA ULTRA-RESISTENTE
// =====================================================================

(function() {
    // 1. Converte tempo "MM:SS" para segundos
    function converterParaSegundos(tempoStr) {
        const partes = tempoStr.split(':');
        const minutos = parseInt(partes[0], 10) || 0;
        const segundos = parseInt(partes[1], 10) || 0;
        return (minutos * 60) + segundos;
    }

    const tempoAlvo = converterParaSegundos(CONFIG.tempoDeDelay);
    let ofertaExibida = false;

    // 2. Função Suprema para Mostrar a Oferta
    function revelarOferta() {
        if (ofertaExibida) return;
        ofertaExibida = true;

        console.log("🚀 ATIVANDO OFERTA AGORA!");

        // Configura os links dos botões com segurança
        const btn2 = document.getElementById('card-2-bottles');
        const btn6 = document.getElementById('card-6-bottles');
        const btn3 = document.getElementById('card-3-bottles');
        if(btn2) btn2.href = CONFIG.linkPote2;
        if(btn6) btn6.href = CONFIG.linkPote6;
        if(btn3) btn3.href = CONFIG.linkPote3;

        // Força a exibição tirando qualquer bloqueio de CSS
        const ctaContainer = document.querySelector('.video-cta-container');
        if (ctaContainer) {
            ctaContainer.style.setProperty('display', 'block', 'important');
        }

        // Liga os Pop-ups
        if (typeof startAllNotifications === 'function') {
            startAllNotifications();
        }
    }

    // 3. MONITORAMENTO VIA SMARTPLAYER (MÉTODO LOCAL)
    function checarTempoVideo() {
        // Tenta encontrar o player de várias formas possíveis
        const playerEl = document.querySelector('vturb-smartplayer') || document.querySelector('iframe[src*="converteai"]');
        
        if (playerEl) {
            // A VTurb costuma salvar o estado do tempo no localStorage ou via atributo
            // Vamos checar se ela disparou a classe de "segundos assistidos" que ela cria nativamente
            if (window.smartplayer && window.smartplayer.instances) {
                for (const id in window.smartplayer.instances) {
                    const instancia = window.smartplayer.instances[id];
                    if (instancia && instancia.video && instancia.video.currentTime >= tempoAlvo) {
                        revelarOferta();
                        clearInterval(intervaloVar);
                        return;
                    }
                }
            }
        }
    }
    // Roda uma checagem a cada 1 segundo para garantir que não vai passar batido
    const intervaloVar = setInterval(checarTempoVideo, 1000);

    // 4. EVENTO NATIVO DO VTURB (Se o de cima falhar, esse pega)
    window.addEventListener("message", function(event) {
        if (event.data && event.data.vTurbEvent === "timeupdate") {
            if (event.data.currentTime >= tempoAlvo) {
                revelarOferta();
                clearInterval(intervaloVar);
            }
        }
    });

    // 5. TRUQUE DA PRÓPRIA VTURB (A VTurb avisa a página quando o delay deles acaba)
    // Se você configurou um delay no painel da VTurb, ela roda essa função sozinha:
    window.vTurbOnDelayEnd = function() {
        revelarOferta();
        clearInterval(intervaloVar);
    };

    // 6. CONTADOR DE PESSOAS ASSISTINDO (Independente e imune a erros)
    setInterval(function() {
        var viewsEl = document.getElementById('viewsCount');
        if(!viewsEl) return;
        var currentCount = parseInt(viewsEl.textContent.replace(/,/g, ''), 10) || 71712;
        currentCount += Math.floor(Math.random() * 5) + 1;
        viewsEl.textContent = currentCount.toLocaleString('en-US');
    }, 2000);

})();

// 7. SISTEMA DE NOTIFICAÇÕES FALSAS (Ajustado para não travar)
function startAllNotifications() {
    const purchaseNotification = document.getElementById('purchase-notification');
    if(!purchaseNotification) return;

    const customerNames = ["Olivia", "Emma", "Ava", "Charlotte", "Sophia", "Amelia", "Isabella", "Mia", "Evelyn", "Harper"];
    const states = [{"name": "Alabama", "abbreviation": "al"}, {"name": "California", "abbreviation": "ca"}, {"name": "Florida", "abbreviation": "fl"}, {"name": "Texas", "abbreviation": "tx"}, {"name": "New York", "abbreviation": "ny"}];
    const productNames = ["2 Bottles of GLPro", "3 Bottles of GLPro", "6 Bottles of GLPro"];

    function showNotification() {
        const name = customerNames[Math.floor(Math.random() * customerNames.length)];
        const state = states[Math.floor(Math.random() * states.length)];
        const product = productNames[Math.floor(Math.random() * productNames.length)];
        
        purchaseNotification.querySelector('.customer-name').textContent = name;
        purchaseNotification.querySelector('.customer-location').textContent = state.name;
        purchaseNotification.querySelector('.product-name').textContent = product;
        purchaseNotification.querySelector('.profile-image').src = `https://flagcdn.com/h40/us-${state.abbreviation}.png`;

        purchaseNotification.style.display = 'block';
        purchaseNotification.classList.add('show');
        
        setTimeout(() => {
            purchaseNotification.classList.remove('show');
            setTimeout(() => purchaseNotification.style.display = 'none', 500);
        }, 8000);
    }

    setTimeout(showNotification, 2000);
    setInterval(showNotification, 25000);
}
