$(document).ready(function() {
    const apiKey = 'YOUR_API_KEY'; // Ganti dengan kunci API Anda dari GoAPI
  
    // Fungsi untuk mencari lokasi berdasarkan nama
    function cariLokasi(nama) {
      $.ajax({
        url: 'https://api.goapi.io/places?search=' + encodeURIComponent(nama) + '&api_key=' + apiKey,
        type: 'GET',
        success: function(response) {
          tampilkanInfoLokasi(response);
        },
        error: function(xhr, status, error) {
          console.error('Kesalahan saat mencari lokasi:', error);
          tampilkanError('Terjadi kesalahan saat mencari lokasi.');
        }
      });
    }
  
    // Fungsi untuk menampilkan informasi lokasi
    function tampilkanInfoLokasi(data) {
      $('#location-info').html('<h2>Informasi Lokasi:</h2>');
      if (data.results.length > 0) {
        data.results.forEach(function(result) {
          $('#location-info').append('<p><strong>Nama:</strong> ' + result.name + '</p>');
          $('#location-info').append('<p><strong>Tipe:</strong> ' + result.type + '</p>');
          $('#location-info').append('<p><strong>Alamat:</strong> ' + result.formatted_address + '</p>');
        });
      } else {
        tampilkanError('Lokasi tidak ditemukan.');
      }
    }
  
    // Fungsi untuk menampilkan pesan kesalahan
    function tampilkanError(pesan) {
      $('#location-info').html('<p style="color: red;">' + pesan + '</p>');
    }
  
    // Event jQuery untuk menangani klik tombol search-btn
    $('#search-btn').click(function() {
      var namaLokasi = $('#search-input').val().trim();
      if (namaLokasi !== '') {
        cariLokasi(namaLokasi);
      } else {
        tampilkanError('Masukkan nama lokasi.');
      }
    });
  
    // Menangani pencarian saat menekan tombol Enter
    $('#search-input').keypress(function(event) {
      if (event.which === 13) {
        $('#search-btn').click();
      }
    });
  });
  