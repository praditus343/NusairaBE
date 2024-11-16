import { Tambak } from '../models/DataTambak.js'; 
import { Kolam } from '../models/DataKolam.js';  

class TambakController {
    async addTambak(req, res) {
        const { nama, negara, provinsi, kabupaten, alamat, jumlahKolam, kolamDetails } = req.body;
    
        if (!nama || !negara || !provinsi || !kabupaten || !alamat || !jumlahKolam || !kolamDetails) {
            return res.status(400).json({ message: 'Semua kolom harus diisi!' });
        }
    
        try {
            // Create and save Tambak
            const tambak = await Tambak.save({
                nama,
                negara,
                provinsi,
                kabupaten,
                alamat,
                jumlahKolam
            });
    
            // Add Kolam details using the provided kolamDetails array
            for (let i = 0; i < jumlahKolam; i++) {
                const kolamData = kolamDetails[i];  // Get kolam data from request body
    
                // Create a Kolam object
                const kolam = {
                    tambak_id: tambak.id, // Link kolam to the tambak's id
                    nama_kolam: kolamData.NamaKolam,
                    tipe_kolam: kolamData.tipeKolam,
                    panjang: kolamData.panjang,
                    lebar: kolamData.lebar,
                    kedalaman: kolamData.kedalaman,
                    size: kolamData.panjang * kolamData.lebar * kolamData.kedalaman,
                    jumlah_anco: kolamData.jumlahAnco, 
                };
    
                // Call the static save method on Kolam to insert into the database
                await Kolam.save(kolam); // Use Kolam.save(), not kolam.save()
            }
    
            res.status(201).json({ message: 'Tambak dan kolam berhasil ditambahkan!' });
    
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Terjadi kesalahan dalam menambahkan tambak dan kolam', error: err.message });
        }
    }
    
    
   
    async getTambakById(req, res) {
        const tambakId = req.params.id;

        try {
            const tambak = await Tambak.getDetailById(tambakId);
            res.status(200).json(tambak);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Terjadi kesalahan dalam mengambil data tambak', error: err.message });
        }
    }

    async getAllTambak(req, res) {
        try {
            const tambakData = await Tambak.getAllTambak();

            if (tambakData.length === 0) {
                return res.status(404).json({ message: 'Tidak ada tambak yang ditemukan' });
            }

            res.status(200).json(tambakData); 
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Terjadi kesalahan dalam mengambil data tambak dan kolam', error: err.message });
        }
    }
}

export default new TambakController();
