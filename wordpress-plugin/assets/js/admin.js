/**
 * SICABA Admin JavaScript
 */

(function($) {
    'use strict';
    
    $(document).ready(function() {
        
        // Initialize datepickers
        if ($.fn.datepicker) {
            $('.sicaba-datepicker').datepicker({
                dateFormat: 'yy-mm-dd'
            });
        }
        
        // Handle ODCB status update
        $('.sicaba-update-status').on('click', function(e) {
            e.preventDefault();
            
            var odcbId = $(this).data('id');
            var newStatus = prompt('Masukkan status baru (Terdaftar, Pengkajian, Direkomendasikan, Ditetapkan, Ditolak):');
            
            if (newStatus) {
                var catatan = prompt('Masukkan catatan (opsional):') || '';
                
                $.ajax({
                    url: sicaba_admin.ajax_url,
                    type: 'POST',
                    data: {
                        action: 'sicaba_update_odcb_status',
                        nonce: sicaba_admin.nonce,
                        odcb_id: odcbId,
                        status: newStatus,
                        catatan: catatan
                    },
                    success: function(response) {
                        if (response.success) {
                            alert('Status berhasil diperbarui');
                            location.reload();
                        } else {
                            alert('Error: ' + response.data.message);
                        }
                    },
                    error: function() {
                        alert('Terjadi kesalahan. Silakan coba lagi.');
                    }
                });
            }
        });
        
        // Handle payment verification
        $('.sicaba-verify-payment').on('click', function(e) {
            e.preventDefault();
            
            var paymentId = $(this).data('id');
            var action = $(this).data('action'); // 'approve' or 'reject'
            
            var confirmation = confirm('Apakah Anda yakin ingin ' + (action === 'approve' ? 'menyetujui' : 'menolak') + ' pembayaran ini?');
            
            if (confirmation) {
                var catatan = prompt('Masukkan catatan (opsional):') || '';
                
                $.ajax({
                    url: sicaba_admin.ajax_url,
                    type: 'POST',
                    data: {
                        action: 'sicaba_verify_payment',
                        nonce: sicaba_admin.nonce,
                        payment_id: paymentId,
                        status: action,
                        catatan: catatan
                    },
                    success: function(response) {
                        if (response.success) {
                            alert('Verifikasi berhasil');
                            location.reload();
                        } else {
                            alert('Error: ' + response.data.message);
                        }
                    },
                    error: function() {
                        alert('Terjadi kesalahan. Silakan coba lagi.');
                    }
                });
            }
        });
        
        // Handle file upload preview
        $('input[type="file"]').on('change', function() {
            var fileName = $(this).val().split('\\').pop();
            $(this).siblings('.file-name').text(fileName);
        });
        
        // Handle bulk actions
        $('#sicaba-bulk-action').on('submit', function(e) {
            e.preventDefault();
            
            var action = $('#bulk-action-select').val();
            var ids = [];
            
            $('.sicaba-bulk-checkbox:checked').each(function() {
                ids.push($(this).val());
            });
            
            if (ids.length === 0) {
                alert('Pilih minimal satu item');
                return;
            }
            
            if (action === 'none') {
                alert('Pilih action');
                return;
            }
            
            var confirmation = confirm('Apakah Anda yakin ingin melakukan action "' + action + '" pada ' + ids.length + ' item?');
            
            if (confirmation) {
                $.ajax({
                    url: sicaba_admin.ajax_url,
                    type: 'POST',
                    data: {
                        action: 'sicaba_bulk_action',
                        nonce: sicaba_admin.nonce,
                        bulk_action: action,
                        ids: ids
                    },
                    success: function(response) {
                        if (response.success) {
                            alert('Bulk action berhasil');
                            location.reload();
                        } else {
                            alert('Error: ' + response.data.message);
                        }
                    },
                    error: function() {
                        alert('Terjadi kesalahan. Silakan coba lagi.');
                    }
                });
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
        
        // Handle delete confirmation
        $('.sicaba-delete').on('click', function(e) {
            e.preventDefault();
            
            var confirmation = confirm('Apakah Anda yakin ingin menghapus item ini? Tindakan ini tidak dapat dibatalkan.');
            
            if (confirmation) {
                window.location.href = $(this).attr('href');
            }
        });
        
        // Initialize tooltips
        if ($.fn.tooltip) {
            $('[data-tooltip]').tooltip();
        }
        
        // Handle sortable tables
        if ($.fn.sortable) {
            $('.sicaba-sortable').sortable({
                handle: '.sicaba-sort-handle',
                update: function(event, ui) {
                    var order = [];
                    $(this).find('.sicaba-sort-item').each(function() {
                        order.push($(this).data('id'));
                    });
                    
                    $.ajax({
                        url: sicaba_admin.ajax_url,
                        type: 'POST',
                        data: {
                            action: 'sicaba_update_order',
                            nonce: sicaba_admin.nonce,
                            order: order
                        }
                    });
                }
            });
        }
        
        // Handle character counter
        $('.sicaba-char-counter').each(function() {
            var input = $(this).find('input, textarea');
            var counter = $(this).find('.counter');
            var maxLength = input.attr('maxlength');
            
            input.on('input', function() {
                var currentLength = $(this).val().length;
                counter.text(currentLength + ' / ' + maxLength);
            });
        });
        
        // Handle image preview
        $('.sicaba-image-upload').on('change', function() {
            var file = this.files[0];
            var preview = $(this).siblings('.sicaba-image-preview');
            
            if (file) {
                var reader = new FileReader();
                reader.onload = function(e) {
                    preview.attr('src', e.target.result).show();
                };
                reader.readAsDataURL(file);
            }
        });
        
        // Handle auto-save
        var autoSaveTimer;
        $('.sicaba-auto-save').on('input', function() {
            clearTimeout(autoSaveTimer);
            autoSaveTimer = setTimeout(function() {
                // Auto-save logic here
                console.log('Auto-saving...');
            }, 2000);
        });
        
    });
    
})(jQuery);
