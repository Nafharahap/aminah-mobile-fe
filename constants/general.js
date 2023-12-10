export const TRANSACTION_TYPE = {
  PENGISIAN_SALDO_LENDER: 1,
  PEMBAYARAN_BAGI_HASIL: 2,
  PENARIKAN_SALDO_LENDER: 3,
  PENARIKAN_PENDANAAN: 4,
  PENARIKAN_DANA_ADMIN: 5,
  PEMBAYARAN_PENDANAAN_LENDER: 6,
  PENGEMBALIAN_PENDANAAN: 7,
}

export const TRANSACTION_TYPE_LABEL = {
  1: 'Pengisian Saldo Lender',
  2: 'Pembayaran Bagi Hasil',
  3: 'Penarikan Saldo Lender',
  4: 'Penarikan Pendanaan',
  5: 'Penarikan Dana Admin',
  6: 'Pembayaran Pendanaan Lender',
  7: 'Pengembalian Pendanaan',
}

export const BUSINESS_TYPE = {
  MAKANAN: 1,
  MINUMAN: 2,
  JASA: 3,
  SEMBAKO: 4,
  JAJANAN: 5,
  ELETRONIK: 6,
  MATERIAL: 7,
  LAINNYA: 8,
}

export const BUSINESS_TYPE_LABEL = {
  1: 'Makanan',
  2: 'Minuman',
  3: 'Jasa',
  4: 'Sembako',
  5: 'Jajanan',
  6: 'Elektronik',
  7: 'Material',
  8: 'Lainnya',
}

export const TRANSACTION_STATUS = {
  WAITING: 'waiting',
  PENDING: 'pending',
  SUCCESS: 'success',
}

export const TRANSACTION_STATUS_LABEL = {
  waiting: 'Belum Bayar',
  pending: 'Menunggu Konfirmasi',
  success: 'Transaksi Berhasil',
}