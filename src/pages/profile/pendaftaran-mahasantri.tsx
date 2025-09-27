// src/pages/Pendaftaran.tsx
import React, { useState } from "react";

const accounts = [
  { bank: "BRI", number: "386201028545536", name: "Nayla Syarifa" },
  { bank: "BSI", number: "7235009492", name: "Nayla Syarifa" },
  {
    bank: "BTN",
    number: "108901610110387",
    name: "Azizah Fiqriyatul Mujahidah",
  },
  { bank: "Dana", number: "081998925631", name: "Azizah Fiqriyatul Mujahidah" },
  {
    bank: "Gopay",
    number: "085819704766",
    name: "Azizah Fiqriyatul Mujahidah",
  },
  {
    bank: "ShopeePay",
    number: "081998925631",
    name: "Azizah Fiqriyatul Mujahidah",
  },
];

const whatsappContacts = [
  { name: "Abian", number: "083176608687" },
  { name: "Syarifa", number: "085935271192" },
];

const FORM_LINK = "https://linktr.ee/OPRECSABA25";
const REGISTRATION_FEE = "Rp30.000,-";
const TIMELINE_START = "15 April 2025";
const TIMELINE_END = "21 Juli 2025";

const AccountRow: React.FC<{
  bank: string;
  number: string;
  name: string;
  onCopy: (s: string) => void;
  copied: boolean;
}> = ({ bank, number, name, onCopy, copied }) => {
  return (
    <div className="flex items-center justify-between gap-4 p-3 rounded-lg border border-gray-100 bg-white">
      <div>
        <div className="text-sm font-semibold text-gray-800">{bank}</div>
        <div className="text-xs text-gray-500">{name}</div>
      </div>

      <div className="flex-1 text-right">
        <div className="font-mono text-sm text-gray-700">{number}</div>
      </div>

      <div>
        <button
          onClick={() => onCopy(number)}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-md border border-gray-200 bg-gray-50 text-sm hover:bg-gray-100 transition"
          aria-label={`Copy nomor ${bank}`}
        >
          {copied ? (
            <span className="text-green-600 font-medium">Copied</span>
          ) : (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 7H6a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-2M16 3h5v5M16 3L8 11"
                />
              </svg>
              <span className="text-sm text-gray-700">Copy</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

const Pendaftaran: React.FC = () => {
  const [copiedNumber, setCopiedNumber] = useState<string | null>(null);

  const handleCopy = async (s: string) => {
    try {
      await navigator.clipboard.writeText(s);
      setCopiedNumber(s);
      setTimeout(() => setCopiedNumber(null), 2000);
    } catch {
      // fallback: select manually
      setCopiedNumber(s);
      setTimeout(() => setCopiedNumber(null), 2000);
    }
  };

  const makeWhatsAppLink = (phone: string, defaultText?: string) => {
    // sanitize phone: remove non-digit (basic)
    const raw = phone.replace(/\D/g, "");
    const text = encodeURIComponent(
      defaultText || "Halo, saya ingin konfirmasi pendaftaran PRM"
    );
    return `https://wa.me/${raw}?text=${text}`;
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-sm p-8 mb-8">
        <div className="md:flex md:items-center md:justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Pendaftaran Mahasantri Baru 2025
            </h1>
            <p className="text-gray-600">
              Pesantren Riset Al-Muhtada — Jelaskan persyaratan, mekanisme
              pendaftaran, dan tata cara konfirmasi.
            </p>

            <div className="mt-4 flex flex-wrap gap-3">
              <a
                href={FORM_LINK}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-green-600 text-white font-medium hover:bg-green-700 transition"
              >
                Daftar Sekarang
              </a>

              <a
                href={makeWhatsAppLink(
                  whatsappContacts[0].number,
                  "PRM_Nama_Prodi_Alamat"
                )}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-gray-200 text-gray-700 hover:bg-gray-50 transition"
              >
                Konfirmasi via WhatsApp
              </a>
            </div>
          </div>

          <div className="mt-6 md:mt-0">
            <div className="rounded-lg bg-green-50 px-4 py-3 text-center">
              <div className="text-sm text-gray-600">Biaya Pendaftaran</div>
              <div className="text-xl font-semibold text-green-700 mt-1">
                {REGISTRATION_FEE}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left: Persyaratan + Cara Daftar */}
        <div className="lg:col-span-2 space-y-6">
          {/* Persyaratan */}
          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Persyaratan Pendaftaran
            </h2>
            <ol className="list-decimal pl-5 space-y-2 text-gray-700">
              <li>Mahasiswa Universitas Negeri Semarang Angkatan 2025</li>
              <li>Laki-laki atau perempuan</li>
              <li>Beragama Islam</li>
              <li>Bisa membaca Al-Qur’an</li>
              <li>Tidak merokok</li>
              <li>Bersedia mematuhi tata tertib pesantren</li>
              <li>Bersedia mengikuti program Pesantren Riset Al-Muhtada</li>
              <li>
                Melakukan pembayaran biaya pendaftaran sebesar{" "}
                <strong>{REGISTRATION_FEE}</strong> ke salah satu rekening di
                bawah.
              </li>
              <li>
                Mengisi formulir online melalui laman{" "}
                <a
                  href={FORM_LINK}
                  className="text-[#00531b] hover:underline"
                  target="_blank"
                  rel="noreferrer"
                >
                  {FORM_LINK}
                </a>{" "}
                dan konfirmasi via WhatsApp (format:{" "}
                <code className="bg-gray-100 px-1 rounded">
                  PRM_Nama_Prodi_Alamat
                </code>
                ).
              </li>
            </ol>
          </div>

          {/* Accounts */}
          <div className="bg-white rounded-2xl shadow p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Rekening / Metode Pembayaran
            </h3>
            <div className="space-y-3">
              {accounts.map((a) => (
                <AccountRow
                  key={a.bank + a.number}
                  bank={a.bank}
                  number={a.number}
                  name={a.name}
                  copied={copiedNumber === a.number}
                  onCopy={handleCopy}
                />
              ))}
            </div>
            <p className="mt-3 text-xs text-gray-500">
              • Salin nomor rekening lalu lakukan pembayaran. Setelah transfer,
              jangan lupa konfirmasi via WA.
            </p>
          </div>

          {/* Cara Daftar & Timeline */}
          <div className="bg-white rounded-2xl shadow p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Cara Daftar & Timeline
            </h3>

            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-700">
                  Periode Pendaftaran
                </h4>
                <p className="text-sm text-gray-600">
                  {TIMELINE_START} — {TIMELINE_END}
                </p>
              </div>

              <div>
                <h4 className="font-medium text-gray-700">
                  Langkah Pendaftaran
                </h4>
                <ol className="list-decimal pl-5 text-gray-700 space-y-2 text-sm">
                  <li>Isi formulir online di link pendaftaran.</li>
                  <li>
                    Lakukan pembayaran biaya pendaftaran (Rp30.000) ke salah
                    satu rekening di atas.
                  </li>
                  <li>
                    Konfirmasi pembayaran via WhatsApp ke kontak di samping
                    dengan format PRM_Nama_Prodi_Alamat.
                  </li>
                  <li>Seleksi: wawancara & tes baca Al-Qur’an.</li>
                  <li>
                    Pengumuman hasil seleksi akan diberitahukan via WhatsApp &
                    laman resmi.
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Kontak & CTA */}
        <aside className="space-y-6">
          <div className="bg-white rounded-2xl shadow p-6 text-center">
            <h4 className="text-lg font-semibold text-gray-800 mb-2">
              Kontak Konfirmasi
            </h4>
            <p className="text-sm text-gray-600 mb-4">
              Silakan chat via WhatsApp untuk konfirmasi dan pertanyaan.
            </p>

            <div className="space-y-3">
              {whatsappContacts.map((c) => (
                <a
                  key={c.number}
                  href={makeWhatsAppLink(c.number, "PRM_Nama_Prodi_Alamat")}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between gap-3 px-4 py-2 rounded-md border border-gray-100 hover:shadow-sm transition"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={`https://ui-avatars.com/api/?name=${c.name.replace(
                        /\s+/g,
                        "+"
                      )}&background=0D9488&color=fff&size=32`}
                      alt={c.name}
                      className="w-8 h-8 rounded-full"
                    />
                    <div className="text-left">
                      <div className="text-sm font-medium text-gray-800">
                        {c.name}
                      </div>
                      <div className="text-xs text-gray-500">{c.number}</div>
                    </div>
                  </div>
                  <div className="text-xs text-green-600 font-medium">
                    Chat WA
                  </div>
                </a>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow p-6 text-center">
            <h4 className="text-lg font-semibold text-gray-800 mb-3">
              Butuh Bantuan?
            </h4>
            <p className="text-sm text-gray-600 mb-4">
              Jika mengalami kendala saat daftar, hubungi kontak resmi di atas.
            </p>
            <a
              href={FORM_LINK}
              target="_blank"
              rel="noreferrer"
              className="inline-block px-4 py-2 rounded-md bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition"
            >
              Isi Formulir Pendaftaran
            </a>
          </div>

          <div className="bg-white rounded-2xl shadow p-4 text-center text-xs text-gray-500">
            <div>Format Konfirmasi WA:</div>
            <div className="mt-2 font-mono text-sm">PRM_Nama_Prodi_Alamat</div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Pendaftaran;
