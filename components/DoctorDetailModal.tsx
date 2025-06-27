"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"
import { Calendar, Star, Award, GraduationCap, MapPin, Phone, Mail, Users, Heart, CheckCircle } from "lucide-react"

interface DoctorDetailModalProps {
  isOpen: boolean
  onClose: () => void
  doctor: {
    img: string
    name: string
    spec: string
  } | null
  onBookAppointment: () => void
}

export function DoctorDetailModal({ isOpen, onClose, doctor, onBookAppointment }: DoctorDetailModalProps) {
  if (!doctor) return null

  const doctorDetails = {
    "Dr. Anisa Putri, Sp.A": {
      fullName: "Dr. Anisa Putri, Sp.A, M.Kes",
      specialty: "Spesialis Anak",
      subSpecialty: "Neonatologi & Kardiologi Anak",
      experience: "10 tahun",
      education: [
        "S1 Kedokteran - Universitas Indonesia (2010)",
        "Spesialis Anak - FKUI/RSCM (2015)",
        "Fellowship Neonatologi - Singapura (2017)",
      ],
      certifications: [
        "Sertifikat Kompetensi Dokter Spesialis Anak",
        "Advanced Pediatric Life Support (APLS)",
        "Neonatal Resuscitation Program (NRP)",
        "Pediatric Advanced Life Support (PALS)",
      ],
      schedule: [
        { day: "Senin", time: "08:00 - 12:00", location: "Poliklinik Anak Lt. 2" },
        { day: "Rabu", time: "14:00 - 17:00", location: "Poliklinik Anak Lt. 2" },
        { day: "Jumat", time: "08:00 - 12:00", location: "Poliklinik Anak Lt. 2" },
        { day: "Sabtu", time: "08:00 - 11:00", location: "Poliklinik Anak Lt. 2" },
      ],
      expertise: [
        "Perawatan Bayi Prematur",
        "Penyakit Jantung Bawaan",
        "Gangguan Tumbuh Kembang",
        "Vaksinasi Anak",
        "Nutrisi Pediatrik",
      ],
      achievements: [
        "Best Young Doctor Award 2020",
        "Penelitian Terbaik Neonatologi 2019",
        "Speaker Internasional Pediatric Conference",
      ],
      rating: 4.9,
      totalPatients: "2,500+",
      languages: ["Indonesia", "English"],
      consultationFee: "Rp 250.000",
    },
    "Dr. Budi Santoso, Sp.PD": {
      fullName: "Dr. Budi Santoso, Sp.PD, FINASIM",
      specialty: "Spesialis Penyakit Dalam",
      subSpecialty: "Endokrinologi & Diabetes",
      experience: "16 tahun",
      education: [
        "S1 Kedokteran - Universitas Gadjah Mada (2005)",
        "Spesialis Penyakit Dalam - FK UGM (2010)",
        "Fellowship Endokrinologi - RSCM Jakarta (2012)",
      ],
      certifications: [
        "Sertifikat Kompetensi Dokter Spesialis Penyakit Dalam",
        "Certified Diabetes Educator (CDE)",
        "Advanced Cardiac Life Support (ACLS)",
        "Fellow Indonesian Society of Internal Medicine",
      ],
      schedule: [
        { day: "Selasa", time: "08:00 - 12:00", location: "Poliklinik Penyakit Dalam Lt. 3" },
        { day: "Kamis", time: "14:00 - 17:00", location: "Poliklinik Penyakit Dalam Lt. 3" },
        { day: "Sabtu", time: "08:00 - 12:00", location: "Poliklinik Penyakit Dalam Lt. 3" },
      ],
      expertise: [
        "Diabetes Mellitus",
        "Hipertensi & Kardiovaskular",
        "Penyakit Tiroid",
        "Obesitas & Metabolik",
        "Gastroenterologi",
      ],
      achievements: [
        "Excellence in Diabetes Care 2021",
        "Best Internal Medicine Specialist 2020",
        "Research Grant Winner - Diabetes Study",
      ],
      rating: 4.8,
      totalPatients: "3,200+",
      languages: ["Indonesia", "English"],
      consultationFee: "Rp 275.000",
    },
    "Dr. Citra Dewi, Sp.OG": {
      fullName: "Dr. Citra Dewi, Sp.OG, M.Kes",
      specialty: "Spesialis Kandungan",
      subSpecialty: "Obstetri & Ginekologi",
      experience: "12 tahun",
      education: [
        "S1 Kedokteran - Universitas Padjadjaran (2008)",
        "Spesialis Obstetri Ginekologi - UNPAD (2013)",
        "Fellowship Maternal Fetal Medicine - Australia (2015)",
      ],
      certifications: [
        "Sertifikat Kompetensi Dokter Spesialis ObGyn",
        "Advanced Life Support in Obstetrics (ALSO)",
        "Fetal Medicine Foundation Certificate",
        "Laparoscopic Surgery Certification",
      ],
      schedule: [
        { day: "Senin", time: "14:00 - 17:00", location: "Poliklinik Kandungan Lt. 4" },
        { day: "Rabu", time: "08:00 - 12:00", location: "Poliklinik Kandungan Lt. 4" },
        { day: "Jumat", time: "14:00 - 17:00", location: "Poliklinik Kandungan Lt. 4" },
      ],
      expertise: [
        "Kehamilan Risiko Tinggi",
        "Operasi Laparoskopi",
        "Infertilitas & Bayi Tabung",
        "Kanker Ginekologi",
        "USG 4D Kehamilan",
      ],
      achievements: [
        "Best ObGyn Specialist 2021",
        "Laparoscopic Surgery Excellence Award",
        "International Speaker - Women's Health",
      ],
      rating: 4.9,
      totalPatients: "2,800+",
      languages: ["Indonesia", "English"],
      consultationFee: "Rp 300.000",
    },
    "Dr. Doni Wijaya, Sp.JP": {
      fullName: "Dr. Doni Wijaya, Sp.JP, FIHA",
      specialty: "Spesialis Jantung",
      subSpecialty: "Kardiologi Intervensi",
      experience: "14 tahun",
      education: [
        "S1 Kedokteran - Universitas Indonesia (2006)",
        "Spesialis Jantung - FKUI/RSCM (2011)",
        "Fellowship Interventional Cardiology - Jepang (2013)",
      ],
      certifications: [
        "Sertifikat Kompetensi Dokter Spesialis Jantung",
        "Interventional Cardiology Certification",
        "Advanced Cardiac Life Support (ACLS)",
        "Fellow Indonesian Heart Association",
      ],
      schedule: [
        { day: "Selasa", time: "08:00 - 12:00", location: "Poliklinik Jantung Lt. 5" },
        { day: "Kamis", time: "08:00 - 12:00", location: "Poliklinik Jantung Lt. 5" },
        { day: "Sabtu", time: "14:00 - 17:00", location: "Poliklinik Jantung Lt. 5" },
      ],
      expertise: ["Kateterisasi Jantung", "Angioplasti & Stent", "Gagal Jantung", "Aritmia Jantung", "Ekokardiografi"],
      achievements: [
        "Cardiologist of the Year 2022",
        "Excellence in Interventional Cardiology",
        "International Research Publication Award",
      ],
      rating: 4.9,
      totalPatients: "2,100+",
      languages: ["Indonesia", "English", "Japanese"],
      consultationFee: "Rp 350.000",
    },
  }

  const currentDoctor = doctorDetails[doctor.name as keyof typeof doctorDetails]

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-start gap-4">
            <Image
              src={doctor.img || "/placeholder.svg"}
              alt={doctor.name}
              width={80}
              height={80}
              className="rounded-full border-4 border-pink-100"
            />
            <div className="flex-1">
              <h2 className="text-xl font-bold text-gray-900">{currentDoctor?.fullName}</h2>
              <p className="text-pink-600 font-medium">{currentDoctor?.specialty}</p>
              <p className="text-sm text-gray-600">{currentDoctor?.subSpecialty}</p>
              <div className="flex items-center gap-4 mt-2">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-yellow-500 fill-current" />
                  <span className="text-sm font-medium">{currentDoctor?.rating}</span>
                </div>
                <Badge variant="secondary" className="text-xs">
                  {currentDoctor?.experience} pengalaman
                </Badge>
                <div className="flex items-center gap-1 text-sm text-gray-600">
                  <Users className="h-4 w-4" />
                  <span>{currentDoctor?.totalPatients} pasien</span>
                </div>
              </div>
            </div>
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="profile">Profil</TabsTrigger>
            <TabsTrigger value="schedule">Jadwal</TabsTrigger>
            <TabsTrigger value="expertise">Keahlian</TabsTrigger>
            <TabsTrigger value="booking">Booking</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <Award className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-900">{currentDoctor?.rating}/5</p>
                  <p className="text-sm text-gray-600">Rating Pasien</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <Users className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-900">{currentDoctor?.totalPatients}</p>
                  <p className="text-sm text-gray-600">Total Pasien</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <GraduationCap className="h-8 w-8 text-green-500 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-900">{currentDoctor?.experience}</p>
                  <p className="text-sm text-gray-600">Pengalaman</p>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-3">Pendidikan</h3>
                <div className="space-y-2">
                  {currentDoctor?.education.map((edu, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <GraduationCap className="h-4 w-4 text-blue-500" />
                      <span className="text-sm">{edu}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Sertifikasi</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {currentDoctor?.certifications.map((cert, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm">{cert}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Penghargaan</h3>
                <div className="space-y-2">
                  {currentDoctor?.achievements.map((achievement, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Award className="h-4 w-4 text-yellow-500" />
                      <span className="text-sm">{achievement}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">Informasi Tambahan</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Bahasa:</span>
                    <span className="ml-2">{currentDoctor?.languages.join(", ")}</span>
                  </div>
                  <div>
                    <span className="font-medium">Biaya Konsultasi:</span>
                    <span className="ml-2 text-green-600 font-semibold">{currentDoctor?.consultationFee}</span>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="schedule" className="space-y-4">
            <h3 className="text-lg font-semibold">Jadwal Praktik</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentDoctor?.schedule.map((sched, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-gray-900">{sched.day}</h4>
                      <Badge variant="outline">{sched.time}</Badge>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin className="h-4 w-4" />
                      <span>{sched.location}</span>
                    </div>
                    <Button
                      size="sm"
                      className="w-full mt-3 bg-pink-500 hover:bg-pink-600"
                      onClick={() => {
                        onBookAppointment()
                        onClose()
                      }}
                    >
                      <Calendar className="h-4 w-4 mr-2" />
                      Pilih Jadwal Ini
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="bg-yellow-50 p-4 rounded-lg">
              <h4 className="font-semibold text-yellow-800 mb-2">Catatan Penting</h4>
              <ul className="text-sm text-yellow-700 space-y-1">
                <li>• Harap konfirmasi kehadiran H-1 sebelum jadwal konsultasi</li>
                <li>• Datang 15 menit sebelum waktu yang dijadwalkan</li>
                <li>• Bawa kartu identitas dan riwayat medis lengkap</li>
                <li>• Jadwal dapat berubah sewaktu-waktu karena kondisi darurat</li>
              </ul>
            </div>
          </TabsContent>

          <TabsContent value="expertise" className="space-y-4">
            <h3 className="text-lg font-semibold">Bidang Keahlian</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {currentDoctor?.expertise.map((skill, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-pink-50 rounded-lg">
                  <Heart className="h-5 w-5 text-pink-500" />
                  <span className="font-medium">{skill}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">Mengapa Memilih {doctor.name}?</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>
                  • Pengalaman {currentDoctor?.experience} dalam bidang {currentDoctor?.specialty}
                </li>
                <li>• Telah menangani {currentDoctor?.totalPatients} pasien dengan tingkat kepuasan tinggi</li>
                <li>• Menggunakan teknologi dan metode pengobatan terkini</li>
                <li>• Pendekatan holistik dan personal untuk setiap pasien</li>
                <li>• Aktif dalam penelitian dan pengembangan ilmu kedokteran</li>
              </ul>
            </div>
          </TabsContent>

          <TabsContent value="booking" className="space-y-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2">Buat Janji dengan {doctor.name}</h3>
              <p className="text-gray-600 mb-6">Dapatkan konsultasi terbaik dari dokter spesialis berpengalaman</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <Card className="p-4 border-pink-200">
                  <Calendar className="h-8 w-8 text-pink-500 mx-auto mb-2" />
                  <h4 className="font-semibold">Konsultasi Langsung</h4>
                  <p className="text-sm text-gray-600 mb-3">Bertemu langsung di rumah sakit</p>
                  <p className="text-lg font-bold text-pink-600 mb-3">{currentDoctor?.consultationFee}</p>
                  <Button
                    className="w-full bg-pink-500 hover:bg-pink-600"
                    onClick={() => {
                      onBookAppointment()
                      onClose()
                    }}
                  >
                    <Calendar className="h-4 w-4 mr-2" />
                    Booking Sekarang
                  </Button>
                </Card>

                <Card className="p-4 border-blue-200">
                  <Phone className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                  <h4 className="font-semibold">Konsultasi Telepon</h4>
                  <p className="text-sm text-gray-600 mb-3">Konsultasi via telepon/video call</p>
                  <p className="text-lg font-bold text-blue-600 mb-3">Rp 150.000</p>
                  <Button variant="outline" className="w-full border-blue-500 text-blue-600 hover:bg-blue-50">
                    <Phone className="h-4 w-4 mr-2" />
                    Hubungi Sekarang
                  </Button>
                </Card>
              </div>

              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-2">Keuntungan Booking Online</h4>
                <ul className="text-sm text-green-700 text-left space-y-1">
                  <li>• Pilih jadwal yang sesuai dengan ketersediaan Anda</li>
                  <li>• Konfirmasi otomatis via SMS dan email</li>
                  <li>• Reminder H-1 sebelum jadwal konsultasi</li>
                  <li>• Dapat reschedule hingga 2 jam sebelum jadwal</li>
                  <li>• Akses riwayat konsultasi dan resep digital</li>
                </ul>
              </div>

              <div className="flex items-center justify-center gap-6 pt-4 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>Jl. Kesehatan Raya No. 123</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <span>(021) 123-4567</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <span>info@ciptahospital.co.id</span>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
