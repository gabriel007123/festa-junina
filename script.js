        let map; // Variável para o mapa
        let markers = []; // Array para armazenar marcadores
        let selectedMarkers = []; // Para calcular distância entre dois marcadores

        // Mostrar/ocultar mapa e inicializá-lo (integrado ao botão "Explore As Lendas")
        document.getElementById('maps.html').addEventListener('click', function() {
            const mapaDiv = document.getElementById('mapa');
            if (mapaDiv.style.display === 'none' || mapaDiv.style.display === '') {
                mapaDiv.style.display = 'block';
                if (!map) { // Inicializa o mapa apenas uma vez
                    initMap();
                }
            } else {
                mapaDiv.style.display = 'none';
            }
        });

        // Função para inicializar o mapa (focado no Nordeste, com lendas)
        function initMap() {
            map = L.map('mapContainer').setView([-8.0, -38.0], 6); // Centro aproximado no Nordeste do Brasil

            // Camada base
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);

            // Marcadores relacionados a lendas do Nordeste
            const legendMarkers = [
                { lat: -12.9714, lng: -38.5016, title: 'Salvador (Bahia)', desc: 'Lar de lendas afro-brasileiras como a Mula-sem-Cabeça e encantarias.' },
                { lat: -7.2307, lng: -35.8817, title: 'Caruaru (Pernambuco)', desc: 'Histórias de Lampião e cangaço, com mitos sertanejos.' },
                { lat: -5.7945, lng: -35.2094, title: 'Natal (Rio Grande do Norte)', desc: 'Lendas de piratas e sereias nas praias do Nordeste.' },
                { lat: -9.3897, lng: -40.5097, title: 'Petrolina (Pernambuco)', desc: 'Mitos da caatinga, como o Caipora protetor dos animais.' },
                { lat: -3.1190, lng: -60.0217, title: 'Floresta Amazônica (influência)', desc: 'Lendas indígenas que influenciam o folclore nordestino.' }
            ];

            legendMarkers.forEach(markerData => {
                const marker = L.marker([markerData.lat, markerData.lng])
                    .addTo(map)
                    .bindPopup(`<b>${markerData.title}</b><br>${markerData.desc}`);
                
                // Adiciona evento de clique para calcular distância
                marker.on('click', function() {
                    selectedMarkers.push(marker.getLatLng());
                    if (selectedMarkers.length === 2) {
                        const dist = map.distance(selectedMarkers[0], selectedMarkers[1]);
                        document.getElementById('distanciaTexto').textContent = `Distância entre os pontos: ${(dist / 1000).toFixed(2)} km`;
                        selectedMarkers = []; // Reseta para próximos cliques
                    }
                });
                
                markers.push(marker);
            });

            // Controle de escala
            L.control.scale().addTo(map);
        }

        const bandeirinhas = document.querySelectorAll('.bandeirinha');
        bandeirinhas.forEach((bandeirinha, index) => {
            bandeirinha.style.animationDelay = `${index * 0.2}s`;
            bandeirinha.addEventListener('mouseover', function() {
                this.style.transform = 'scale(1.2)';
            });
            bandeirinha.addEventListener('mouseout', function() {
                this.style.transform = 'scale(1)';
            });
        });

        // Botão para próxima página (mantido)
        document.getElementById('btMProximaPagina').addEventListener('click', function() {
            window.location.href = 'fds.html';
        });