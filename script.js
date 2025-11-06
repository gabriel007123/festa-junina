   let map;
        
        // Mostrar localização e mapa
        document.getElementById('meuLocalBtn').addEventListener('click', function() {
            const mapa = document.getElementById('mapa');
            
            if(mapa.style.display === 'none') {
                mapa.style.display = 'block';
                
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(showPosition);
                } else {
                    document.getElementById('mapContainer').innerHTML = "Geolocalização não é suportada pelo seu navegador.";
                }
            } else {
                mapa.style.display = 'none';
            }
        });
        
        function showPosition(position) {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            
            // Coordenadas da festa (exemplo)
            const festaLat = -23.5505;
            const festaLon = -46.6333;
            
            // Calcular distância
            const distancia = calcularDistancia(lat, lon, festaLat, festaLon);
            document.getElementById('distanciaTexto').innerHTML = `Você está a aproximadamente ${distancia.toFixed(1)}km da festa!`;
        }
        
        function calcularDistancia(lat1, lon1, lat2, lon2) {
            const R = 6371; // Raio da Terra em km
            const dLat = (lat2 - lat1) * Math.PI / 180;
            const dLon = (lon2 - lon1) * Math.PI / 180;
            const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
                      Math.sin(dLon/2) * Math.sin(dLon/2);
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
            return R * c;
        }
        
        // Efeito nas bandeirinhas
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
 document.getElementById('btMProximaPagina').addEventListener('click', function() {
        window.location.href = 'fds.html';
    });
            // Função para inicializar o mapa
        function initMap() {
            map = L.map('mapContainer').setView([-14.235, -51.925], 5); // Centro no Brasil
            // Camada base
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);
            // Marcadores relacionados a lendas brasileiras
            const legendMarkers = [
                { lat: -3.1190, lng: -60.0217, title: 'Floresta Amazônica', desc: 'Lar de lendas indígenas como a da Cobra Grande e espíritos da floresta.' },
                { lat: -22.9068, lng: -43.1729, title: 'Rio de Janeiro', desc: 'Lendas urbanas e mitos sobre piratas e sereias nas praias.' },
                { lat: -15.7942, lng: -47.8822, title: 'Brasília', desc: 'Histórias modernas misturadas a tradições indígenas.' },
                { lat: -12.9714, lng: -38.5016, title: 'Salvador (Bahia)', desc: 'Lendas afro-brasileiras, como a do Boi Bumbá e encantarias.' },
                { lat: -23.5505, lng: -46.6333, title: 'São Paulo', desc: 'Mitos urbanos e histórias de imigrantes.' }
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