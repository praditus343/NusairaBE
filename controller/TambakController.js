import { Tambak } from '../models/DataTambak.js'; 
import { Kolam } from '../models/DataKolam.js';  

class TambakController {
    async addTambak(req, res) {
        const { nama, negara, provinsi, kabupaten, alamat, jumlahKolam, kolamDetails } = req.body;
    
        if (!nama || !negara || !provinsi || !kabupaten || !alamat || !jumlahKolam || !kolamDetails) {
            return res.status(400).json({ message: 'Semua kolom harus diisi!' });
        }
    
        try {
            const tambak = await Tambak.save({
                nama,
                negara,
                provinsi,
                kabupaten,
                alamat,
                jumlahKolam
            }, req.user.id);  

            for (let i = 0; i < jumlahKolam; i++) {
                const kolamData = kolamDetails[i];  
                const kolam = {
                    tambak_id: tambak.id,
                    nama_kolam: kolamData.NamaKolam,
                    tipe_kolam: kolamData.tipeKolam,
                    panjang: kolamData.panjang,
                    lebar: kolamData.lebar,
                    kedalaman: kolamData.kedalaman,
                    size: kolamData.panjang * kolamData.lebar * kolamData.kedalaman,
                    jumlah_anco: kolamData.jumlahAnco, 
                };
    
                await Kolam.save(kolam); 
            }
    
            res.status(200).json({ message: 'Tambak dan kolam berhasil ditambahkan!' });
    
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Terjadi kesalahan dalam menambahkan tambak dan kolam', error: err.message });
        }
    }
    
    async getTambakById(req, res) {
        const tambakId = req.params.id;

        try {
            const tambak = await Tambak.getDetailById(tambakId, req.user.id);
            res.status(200).json(tambak);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Terjadi kesalahan dalam mengambil data tambak', error: err.message });
        }
    }

    async getAllTambak(req, res) {
        try {
            const tambakData = await Tambak.getAllTambak(req.user.id);

            if (tambakData.length === 0) {
                return res.status(404).json({ message: 'Tidak ada tambak yang ditemukan' });
            }

            res.status(200).json(tambakData); 
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Terjadi kesalahan dalam mengambil data tambak dan kolam', error: err.message });
        }
    }

    async updateTambak(req, res) {
        const tambakId = req.params.id;
        const data = req.body;
    
        try {
            const result = await Tambak.update(tambakId, data, req.user.id);
            res.status(200).json({ message: 'Tambak berhasil diperbarui', result });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Terjadi kesalahan saat memperbarui Tambak', error: err.message });
        }
    }
    
    async deleteTambak(req, res) {
        const tambakId = req.params.id;
    
        try {
            await Tambak.delete(tambakId, req.user.id);
            res.status(200).json({ message: 'Tambak berhasil dihapus' });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Terjadi kesalahan saat menghapus Tambak', error: err.message });
        }
    }
}

export default new TambakController();