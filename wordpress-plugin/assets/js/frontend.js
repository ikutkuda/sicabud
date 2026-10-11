/**
 * SICABA Frontend JavaScript
 */

(function($) {
    'use strict';
    
    $(document).ready(function() {
        
        // Initialize maps
        $('.sicaba-map-container').each(function() {
            var container = $(this);
            var lat = parseFloat(container.data('lat'));
            var lng = parseFloat(container.data('lng'));
            var title = container.data('title');
            
            if (typeof L !== 'undefined' && !isNaN(lat) && !isNaN(lng)) {
                var map = L.map(container[0]).setView([lat, lng], 15);
                
                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    attribution: '© OpenStreetMap contributors'
                }).addTo(map);
                
                L.marker([lat, lng]).addTo(map)
                    .bindPopup(title)
                    .openPopup();
            }
        });
        
        // Handle ODCB form submission
        $('#sicaba-odcb-form').on('submit', function(e) {
            e.preventDefault();
            
            var form = $(this);
            var formData = new FormData(this);
            
            // Show loading
            form.find('button[type="submit"]').prop('disabled', true).text('Mengirim...');
            
            $.ajax({
                url: sicaba_frontend.ajax_url,
                type: 'POST',
                data: formData,
                processData: false,
                contentType: false,
                success: function(response) {
                    if (response.success) {
                        alert('Pendaftaran ODCB berhasil dikirim!');
                        form[0].reset();
                        window.location.href = response.data.redirect_url;
                    } else {
                        alert('Error: ' + response.data.message);
                        form.find('button[type="submit"]').prop('disabled', false).text('Ajukan Pendaftaran');
                    }
                },
                error: function() {
                    alert('Terjadi kesalahan. Silakan coba lagi.');
                    form.find('button[type="submit"]').prop('disabled', false).text('Ajukan Pendaftaran');
                }
            });
        });
        
        // Handle file upload preview
        $('input[type="file"]').on('change', function() {
            var files = this.files;
            var previewContainer = $(this).siblings('.file-preview');
            
            previewContainer.empty();
            
            for (var i = 0; i < files.length; i++) {
                var file = files[i];
                var reader = new FileReader();
                
                reader.onload = function(e) {
                    var preview = $('<div class="file-preview-item"></div>');
                    preview.html('<img src="' + e.target.result + '" alt="Preview">');
                    previewContainer.append(preview);
                };
                
                reader.readAsDataURL(file);
            }
        });
        
        // Handle search
        $('#sicaba-search-form').on('submit', function(e) {
            e.preventDefault();
            
            var searchQuery = $('#sicaba-search-input').val();
            var url = new URL(window.location.href);
            url.searchParams.set('s', searchQuery);
            window.location.href = url.toString();
        });
        
        // Handle filter
        $('.sicaba-filter-select').on('change', function() {
            var filterName = $(this).attr('name');
            var filterValue = $(this).val();
            var url = new URL(window.location.href);
            
            if (filterValue) {
                url.searchParams.set(filterName, filterValue);
            } else {
                url.searchParams.delete(filterName);
            }
            
            window.location.href = url.toString();
        });
        
        // Handle lazy loading images
        if ('IntersectionObserver' in window) {
            var imageObserver = new IntersectionObserver(function(entries, observer) {
                entries.forEach(function(entry) {
                    if (entry.isIntersecting) {
                        var image = entry.target;
                        image.src = image.dataset.src;
                        image.classList.remove('lazy');
                        observer.unobserve(image);
                    }
                });
            });
            
            document.querySelectorAll('img.lazy').forEach(function(img) {
                imageObserver.observe(img);
            });
        }
        
        // Handle smooth scroll
        $('a[href^="#"]').on('click', function(e) {
            var target = $(this.getAttribute('href'));
            if (target.length) {
                e.preventDefault();
                $('html, body').stop().animate({
                    scrollTop: target.offset().top - 100
                }, 1000);
            }
        });
        
        // Handle lightbox for images
        $('.sicaba-lightbox').on('click', function(e) {
            e.preventDefault();
            
            var imgSrc = $(this).attr('href');
            var lightbox = $('<div class="sicaba-lightbox-overlay"></div>');
            lightbox.html('<img src="' + imgSrc + '" alt="Lightbox">');
            lightbox.appendTo('body');
            
            lightbox.on('click', function() {
                $(this).remove();
            });
        });
        
        // Handle share buttons
        $('.sicaba-share-btn').on('click', function(e) {
            e.preventDefault();
            
            var shareUrl = $(this).data('url');
            var shareTitle = $(this).data('title');
            var shareType = $(this).data('type');
            
            var shareWindow;
            
            switch (shareType) {
                case 'facebook':
                    shareWindow = window.open('https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(shareUrl), 'facebook-share', 'width=580,height=296');
                    break;
                case 'twitter':
                    shareWindow = window.open('https://twitter.com/intent/tweet?text=' + encodeURIComponent(shareTitle) + '&url=' + encodeURIComponent(shareUrl), 'twitter-share', 'width=580,height=296');
                    break;
                case 'whatsapp':
                    shareWindow = window.open('https://wa.me/?text=' + encodeURIComponent(shareTitle + ' ' + shareUrl), 'whatsapp-share', 'width=580,height=296');
                    break;
            }
            
            if (shareWindow) {
                shareWindow.focus();
            }
        });
        
        // Handle print button
        $('.sicaba-print-btn').on('click', function(e) {
            e.preventDefault();
            window.print();
        });
        
        // Handle back to top
        var backToTop = $('.sicaba-back-to-top');
        
        $(window).on('scroll', function() {
            if ($(this).scrollTop() > 300) {
                backToTop.addClass('visible');
            } else {
                backToTop.removeClass('visible');
            }
        });
        
        backToTop.on('click', function(e) {
            e.preventDefault();
            $('html, body').animate({
                scrollTop: 0
            }, 800);
        });
        
        // Handle tabs
        $('.sicaba-tab-link').on('click', function(e) {
            e.preventDefault();
            
            var tabId = $(this).data('tab');
            
            $(this).addClass('active').siblings().removeClass('active');
            $('#' + tabId).addClass('active').siblings().removeClass('active');
        });
        
        // Handle accordion
        $('.sicaba-accordion-header').on('click', function() {
            $(this).toggleClass('active');
            $(this).next('.sicaba-accordion-content').slideToggle();
        });
        
        // Handle modal
        $('.sicaba-modal-open').on('click', function(e) {
            e.preventDefault();
            
            var modalId = $(this).data('modal');
            $('#' + modalId).addClass('active');
        });
        
        $('.sicaba-modal-close').on('click', function() {
            $(this).closest('.sicaba-modal').removeClass('active');
        });
        
        $(document).on('click', function(e) {
            if ($(e.target).hasClass('sicaba-modal')) {
                $(e.target).removeClass('active');
            }
        });
        
        // Handle copy to clipboard
        $('.sicaba-copy-btn').on('click', function(e) {
            e.preventDefault();
            
            var text = $(this).data('text');
            
            if (navigator.clipboard) {
                navigator.clipboard.writeText(text).then(function() {
                    alert('Teks berhasil disalin!');
                });
            } else {
                // Fallback for older browsers
                var textarea = document.createElement('textarea');
                textarea.value = text;
                document.body.appendChild(textarea);
                textarea.select();
                document.execCommand('copy');
                document.body.removeChild(textarea);
                alert('Teks berhasil disalin!');
            }
        });
        
        // Handle countdown timer
        $('.sicaba-countdown').each(function() {
            var container = $(this);
            var targetDate = new Date(container.data('date')).getTime();
            
            var timer = setInterval(function() {
                var now = new Date().getTime();
                var distance = targetDate - now;
                
                if (distance < 0) {
                    clearInterval(timer);
                    container.html('Waktu habis!');
                    return;
                }
                
                var days = Math.floor(distance / (1000 * 60 * 60 * 24));
                var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                var seconds = Math.floor((distance % (1000 * 60)) / 1000);
                
                container.html(days + 'h ' + hours + 'j ' + minutes + 'm ' + seconds + 'd');
            }, 1000);
        });
        
    });
    
})(jQuery);
