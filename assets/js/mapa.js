const map = L.map('map').setView([4.75, -75.65], 10);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap'
    }).addTo(map);

    // ICONOS
    function crearIcono(color) {
      return L.divIcon({
        className: 'custom-marker',
        html: `<div class="marker-pin" style="background:${color};"></div>`,
        iconSize: [22, 22],
        iconAnchor: [11, 22]
      });
    }

    const iconos = {
      cafe: crearIcono('#6f4e37'),
      cultura: crearIcono('#8e24aa'),
      natural: crearIcono('#43a047')
    };

    // FUNCIÓN WIKI
    function wikiLink(nombre) {
      return `https://es.wikipedia.org/wiki/Especial:Buscar?search=${encodeURIComponent(nombre)}`;
    }

    // LUGARES DEL CAFÉ
    const lugares = [
      {
        nombre: "Salento",
        coords: [4.6376, -75.5709],
        categoria: "cafe",
        wiki: "lugar-salento.html",
        descripcion: `
      Salento es uno de los lugares más importantes del Eje Cafetero.<br><br>
      <b>Puntos Importantes:</b> Calle Real, Mirador Alto de la Cruz, Arquitectura Antioqueña.<br><br>
      <b>Dónde tomar café:</b> Café Jesús Martín, Café Don Matías, o en las tiendas tradicionales alrededor de la plaza principal.<br><br>
      <b>Aprende:</b> Aquí puedes entender cómo el café forma parte de la cultura, la arquitectura y la vida diaria.
    `
      },
      {
        nombre: "Valle del Cocora",
        coords: [4.6370, -75.5000],
        categoria: "natural",
        wiki: "lugar-cocora.html",
        descripcion: `
      Este paisaje representa el entorno natural donde se desarrolla la cultura cafetera.<br><br>
      <b>Puntos Importantes:</b> Bosques de Palma de Cera, Senderos ecológicos, Miradores naturales.<br><br>
      <b>Dónde tomar café:</b> En los paradores tradicionales al inicio del valle, o probar un buen "café con leche" o "chaqueta" al bajar de la caminata en los restaurantes locales.<br><br>
      <b>Aprende:</b> El café depende del clima, la tierra y la biodiversidad.
    `
      },
      {
        nombre: "Santa Rosa de Cabal",
        coords: [4.8686, -75.6214],
        categoria: "cafe",
        wiki: "lugar-santarosa.html",
        descripcion: `
      Municipio donde la tradición cafetera sigue viva, famoso por sus aguas termales.<br><br>
      <b>Puntos Importantes:</b> Parque de las Araucarias, Termales de Santa Rosa, Fincas Cafeteras aledañas.<br><br>
      <b>Dónde tomar café:</b> Café de Leo, Don Pascual, o acompañado de los tradicionales chorizos santarrosanos.<br><br>
      <b>Aprende:</b> El café está ligado a la vida cotidiana de las familias.
    `
      },
      {
        nombre: "Pereira",
        coords: [4.8143, -75.6946],
        categoria: "cultura",
        wiki: "lugar-pereira.html",
        descripcion: `
      Ciudad clave en el desarrollo del café y motor comercial de la región.<br><br>
      <b>Puntos Importantes:</b> Plaza de Bolívar, Viaducto César Gaviria Trujillo, Parque del Lago, Monumento al Bolívar Desnudo.<br><br>
      <b>Dónde tomar café:</b> El Barista, La Ruana, El Clan, o probar el café de las tostadoras locales en el centro de la ciudad.<br><br>
      <b>Aprende:</b> El café impulsó la economía y el crecimiento urbano.
    `
      }
    ];

    // POPUPS
    function crearPopup(lugar) {
      return `
    <div class="popup-card">
      <h3>${lugar.nombre}</h3>
      <div class="popup-text">${lugar.descripcion}</div>
      <div class="popup-buttons">
        <a href="${lugar.wiki}" target="_blank" class="btn-popup wiki">Ver más</a>
        <a href="https://www.google.com/maps/search/?api=1&query=${lugar.coords[0]},${lugar.coords[1]}"
        target="_blank" class="btn-popup ruta">Cómo llegar</a>
      </div>
    </div>
  `;
    }

    // MARCADORES
    lugares.forEach(lugar => {
      const marker = L.marker(lugar.coords, {
        icon: iconos[lugar.categoria]
      }).addTo(map);

      marker.bindPopup(crearPopup(lugar));
    });