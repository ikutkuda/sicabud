<?php
/**
 * Template: Map
 */

if (!defined('ABSPATH')) {
    exit;
}

$height = isset($args['height']) ? $args['height'] : '500px';
$zoom = isset($args['zoom']) ? $args['zoom'] : 12;

// Get all cagar budaya with coordinates
$cagar_budaya_list = SICABA_Frontend::get_all_cagar_budaya(array('posts_per_page' => -1));
$markers = array();

foreach ($cagar_budaya_list['items'] as $item) {
    if (!empty($item['latitude']) && !empty($item['longitude'])) {
        $markers[] = array(
            'lat' => floatval($item['latitude']),
            'lng' => floatval($item['longitude']),
            'title' => $item['nama'],
            'url' => get_permalink($item['id']),
            'jenis' => !empty($item['jenis']) ? implode(', ', $item['jenis']) : '',
            'kategori' => !empty($item['kategori']) ? implode(', ', $item['kategori']) : ''
        );
    }
}
?>

<div class="sicaba-map-wrapper">
    <div id="sicaba-map" style="height: <?php echo esc_attr($height); ?>; width: 100%; border-radius: 8px; overflow: hidden;"></div>
</div>

<script>
document.addEventListener('DOMContentLoaded', function() {
    // Check if Leaflet is loaded
    if (typeof L === 'undefined') {
        // Load Leaflet CSS
        var leafletCss = document.createElement('link');
        leafletCss.rel = 'stylesheet';
        leafletCss.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
        document.head.appendChild(leafletCss);
        
        // Load Leaflet JS
        var leafletJs = document.createElement('script');
        leafletJs.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
        leafletJs.onload = function() {
            initMap();
        };
        document.body.appendChild(leafletJs);
    } else {
        initMap();
    }
    
    function initMap() {
        // Default center (Tasikmalaya)
        var map = L.map('sicaba-map').setView([-7.3274, 108.2217], <?php echo esc_js($zoom); ?>);
        
        // Add tile layer
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors',
            maxZoom: 19
        }).addTo(map);
        
        // Add markers
        var markers = <?php echo json_encode($markers); ?>;
        
        markers.forEach(function(marker) {
            var markerIcon = L.marker([marker.lat, marker.lng]).addTo(map);
            
            var popupContent = '<div class="sicaba-map-popup">';
            popupContent += '<h3><a href="' + marker.url + '">' + marker.title + '</a></h3>';
            if (marker.jenis) {
                popupContent += '<p><strong>Jenis:</strong> ' + marker.jenis + '</p>';
            }
            if (marker.kategori) {
                popupContent += '<p><strong>Kategori:</strong> ' + marker.kategori + '</p>';
            }
            popupContent += '</div>';
            
            markerIcon.bindPopup(popupContent);
        });
        
        // Fit bounds if markers exist
        if (markers.length > 0) {
            var group = new L.featureGroup(markers.map(function(m) {
                return L.marker([m.lat, m.lng]);
            }));
            map.fitBounds(group.getBounds().pad(0.1));
        }
    }
});
</script>

<style>
.sicaba-map-popup {
    min-width: 200px;
}

.sicaba-map-popup h3 {
    margin: 0 0 10px 0;
    font-size: 16px;
    font-weight: 700;
}

.sicaba-map-popup h3 a {
    color: #0073aa;
    text-decoration: none;
}

.sicaba-map-popup h3 a:hover {
    text-decoration: underline;
}

.sicaba-map-popup p {
    margin: 5px 0;
    font-size: 13px;
    color: #666;
}
</style>
