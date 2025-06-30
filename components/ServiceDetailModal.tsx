"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Calendar,
  Clock,
  Star,
  Users,
  Award,
  Shield,
  Phone,
  MapPin,
  CheckCircle,
  Stethoscope,
  GraduationCap,
  Clock3,
} from "lucide-react"

interface ServiceDetailModalProps {
  isOpen: boolean
  onClose: () => void
  service: {
    title: string
    desc: string
    icon: React.ReactNode
    rating: number
    features: string[]
    patients: string
    availability: string
    bgColor: string
    titleColor: string
  } | null
  onBookAppointment: () => void
}

export function ServiceDetailModal({ isOpen, onClose, service, onBookAppointment }: ServiceDetailModalProps) {
  const [activeTab, setActiveTab] = useState("overview")

  if (!service) return null

  const serviceDetails = {
    Kardiologi: {
      description:
        "Pusat Jantung Terpadu dengan teknologi terdepan untuk diagnosis dan pengobatan penyakit kardiovaskular.",
      doctors: [
        {
          name: "Dr. Ahmad Rizki, Sp.JP",
          experience: "18 tahun",
          specialty: "Spesialis Jantung & Intervensi",
          education: "FK UI, Fellowship Interventional Cardiology",
          schedule: "Senin, Rabu, Jumat: 08:00-12:00",
          image: "/doctor-male.png",
          rating: 4.9,
          patients: "2,500+",
          achievements: ["Fellow American College of Cardiology", "Sertifikat Intervensi Kardiovaskular"],
        },
        {
          name: "Dr. Sari Jantung, Sp.JP",
          experience: "15 tahun",
          specialty: "Elektrofisiologi & Aritmia",
          education: "FK UNPAD, Fellowship Cardiac Electrophysiology",
          schedule: "Selasa, Kamis, Sabtu: 08:00-12:00",
          image: "/doctor-female.png",
          rating: 4.8,
          patients: "1,800+",
          achievements: ["Certified Electrophysiologist", "Heart Rhythm Society Member"],
        },
        {
          name: "Dr. Budi Kardio, Sp.JP",
          experience: "12 tahun",
          specialty: "Kardiologi Preventif",
          education: "FK UGM, Fellowship Preventive Cardiology",
          schedule: "Senin, Kamis: 13:00-17:00",
          image: "/doctor-male.png",
          rating: 4.7,
          patients: "1,200+",
          achievements: ["Preventive Cardiology Specialist", "Lipid Management Expert"],
        },
      ],
      facilities: [
        "Cath Lab dengan teknologi terbaru",
        "Echocardiography 4D Real-time",
        "CT Angiography 256-slice",
        "Cardiac Rehabilitation Center",
        "ICU Jantung 24 jam",
      ],
      procedures: [
        "Kateterisasi Jantung Diagnostik",
        "Angioplasti & Pemasangan Stent",
        "Operasi Bypass Jantung",
        "Pacemaker & ICD Implantation",
        "Ablasi Aritmia",
      ],
      schedule: "Senin - Sabtu: 08:00 - 17:00\nMinggu & Darurat: 24 jam",
      price: "Konsultasi mulai dari Rp 350.000",
    },
    Neurologi: {
      description:
        "Pusat Neurologi dengan fasilitas Stroke Center 24 jam dan teknologi MRI 3 Tesla untuk diagnosis akurat.",
      doctors: [
        {
          name: "Dr. Budi Neuro, Sp.S",
          experience: "20 tahun",
          specialty: "Stroke & Neurologi Vaskular",
          education: "FK UI, Fellowship Stroke Medicine",
          schedule: "Senin, Rabu, Jumat: 08:00-12:00",
          image: "/doctor-male.png",
          rating: 4.9,
          patients: "3,000+",
          achievements: ["Stroke Specialist Certification", "Indonesian Stroke Society Board Member"],
        },
        {
          name: "Dr. Nina Saraf, Sp.S",
          experience: "16 tahun",
          specialty: "Epilepsi & Neurologi Pediatrik",
          education: "FK UNAIR, Fellowship Pediatric Neurology",
          schedule: "Selasa, Kamis, Sabtu: 08:00-12:00",
          image: "/doctor-female.png",
          rating: 4.8,
          patients: "2,200+",
          achievements: ["Pediatric Neurology Expert", "Epilepsy Surgery Certified"],
        },
        {
          name: "Dr. Andi Kepala, Sp.S",
          experience: "14 tahun",
          specialty: "Neurologi Geriatri",
          education: "FK UNHAS, Fellowship Geriatric Neurology",
          schedule: "Senin, Kamis: 13:00-17:00",
          image: "/doctor-male.png",
          rating: 4.7,
          patients: "1,500+",
          achievements: ["Geriatric Neurology Specialist", "Dementia Care Expert"],
        },
      ],
      facilities: [
        "MRI 3 Tesla dengan Spektroskopi",
        "CT Scan 128-slice",
        "EEG & Video EEG Monitoring",
        "Stroke Unit dengan Thrombolysis",
        "Neuro ICU",
      ],
      procedures: [
        "Thrombolysis untuk Stroke Akut",
        "Operasi Tumor Otak",
        "Deep Brain Stimulation",
        "Epilepsi Surgery",
        "Endovascular Neurosurgery",
      ],
      schedule: "Senin - Sabtu: 08:00 - 17:00\nStroke Center: 24 jam",
      price: "Konsultasi mulai dari Rp 300.000",
    },
    Pediatri: {
      description: "Layanan kesehatan anak terlengkap dengan NICU Level III dan tim dokter anak sub-spesialis.",
      doctors: [
        {
          name: "Dr. Anisa Putri, Sp.A",
          experience: "12 tahun",
          specialty: "Neonatologi & Perinatologi",
          education: "FK UI, Fellowship Neonatology",
          schedule: "Senin, Rabu, Jumat: 08:00-12:00",
          image: "/doctor-female.png",
          rating: 4.9,
          patients: "2,800+",
          achievements: ["NICU Level III Certified", "Neonatal Resuscitation Expert"],
        },
        {
          name: "Dr. Rina Anak, Sp.A",
          experience: "10 tahun",
          specialty: "Kardiologi Anak",
          education: "FK UNPAD, Fellowship Pediatric Cardiology",
          schedule: "Selasa, Kamis, Sabtu: 08:00-12:00",
          image: "/doctor-female.png",
          rating: 4.8,
          patients: "1,600+",
          achievements: ["Pediatric Cardiology Specialist", "Congenital Heart Disease Expert"],
        },
        {
          name: "Dr. Tono Bocah, Sp.A",
          experience: "15 tahun",
          specialty: "Tumbuh Kembang Anak",
          education: "FK UGM, Fellowship Developmental Pediatrics",
          schedule: "Senin, Kamis: 13:00-17:00",
          image: "/doctor-male.png",
          rating: 4.7,
          patients: "2,000+",
          achievements: ["Developmental Pediatrics Expert", "Early Intervention Specialist"],
        },
      ],
      facilities: [
        "NICU Level III",
        "PICU (Pediatric ICU)",
        "Ruang Bermain Anak",
        "Klinik Tumbuh Kembang",
        "Vaksinasi Center",
      ],
      procedures: [
        "Perawatan Bayi Prematur",
        "Operasi Jantung Anak",
        "Terapi Tumbuh Kembang",
        "Vaksinasi Lengkap",
        "Emergency Pediatric",
      ],
      schedule: "Senin - Sabtu: 08:00 - 17:00\nDarurat Anak: 24 jam",
      price: "Konsultasi mulai dari Rp 250.000",
    },
    "Penyakit Dalam": {
      description:
        "Pelayanan komprehensif untuk penyakit internal dengan fokus pada diabetes, hipertensi, dan penyakit metabolik.",
      doctors: [
        {
          name: "Dr. Budi Santoso, Sp.PD",
          experience: "18 tahun",
          specialty: "Endokrinologi & Diabetes",
          education: "FK UI, Fellowship Endocrinology",
          schedule: "Senin, Rabu, Jumat: 08:00-12:00",
          image: "/doctor-male.png",
          rating: 4.9,
          patients: "3,200+",
          achievements: ["Diabetes Educator Certified", "Endocrine Society Member"],
        },
        {
          name: "Dr. Maya Dalam, Sp.PD",
          experience: "14 tahun",
          specialty: "Gastroenterologi & Hepatologi",
          education: "FK UNAIR, Fellowship Gastroenterology",
          schedule: "Selasa, Kamis, Sabtu: 08:00-12:00",
          image: "/doctor-female.png",
          rating: 4.8,
          patients: "2,400+",
          achievements: ["Gastroenterology Specialist", "Hepatology Expert"],
        },
        {
          name: "Dr. Sari Ginjal, Sp.PD",
          experience: "16 tahun",
          specialty: "Nefrologi & Hipertensi",
          education: "FK UNPAD, Fellowship Nephrology",
          schedule: "Senin, Kamis: 13:00-17:00",
          image: "/doctor-female.png",
          rating: 4.7,
          patients: "1,800+",
          achievements: ["Nephrology Specialist", "Hypertension Management Expert"],
        },
      ],
      facilities: [
        "Diabetes Center",
        "Endoskopi Center",
        "Hemodialisis Unit",
        "Laboratorium 24 jam",
        "Medical Check-up",
      ],
      procedures: [
        "Endoskopi & Kolonoskopi",
        "Hemodialisis",
        "Diabetes Management",
        "Hipertensi Treatment",
        "Gastric Balloon",
      ],
      schedule: "Senin - Sabtu: 08:00 - 17:00\nHemodialisis: Senin, Rabu, Jumat",
      price: "Konsultasi mulai dari Rp 275.000",
    },
    Ortopedi: {
      description: "Pusat Ortopedi dengan teknologi artroskopi dan penggantian sendi untuk masalah tulang dan sendi.",
      doctors: [
        {
          name: "Dr. Joko Tulang, Sp.OT",
          experience: "16 tahun",
          specialty: "Spine Surgery & Ortopedi Tulang Belakang",
          education: "FK UI, Fellowship Spine Surgery",
          schedule: "Senin, Rabu, Jumat: 08:00-12:00",
          image: "/doctor-male.png",
          rating: 4.9,
          patients: "2,600+",
          achievements: ["Spine Surgery Specialist", "Minimally Invasive Surgery Expert"],
        },
        {
          name: "Dr. Siti Sendi, Sp.OT",
          experience: "13 tahun",
          specialty: "Sports Medicine & Artroskopi",
          education: "FK UGM, Fellowship Sports Medicine",
          schedule: "Selasa, Kamis, Sabtu: 08:00-12:00",
          image: "/doctor-female.png",
          rating: 4.8,
          patients: "2,000+",
          achievements: ["Sports Medicine Specialist", "Arthroscopy Expert"],
        },
        {
          name: "Dr. Andi Patah, Sp.OT",
          experience: "14 tahun",
          specialty: "Trauma & Rekonstruksi",
          education: "FK UNHAS, Fellowship Trauma Orthopedics",
          schedule: "Senin, Kamis: 13:00-17:00",
          image: "/doctor-male.png",
          rating: 4.7,
          patients: "1,700+",
          achievements: ["Trauma Surgery Specialist", "Bone Reconstruction Expert"],
        },
      ],
      facilities: [
        "Operating Theater Ortopedi",
        "Artroskopi Center",
        "Fisioterapi & Rehabilitasi",
        "Sports Medicine Clinic",
        "Prosthetic & Orthotic",
      ],
      procedures: [
        "Artroskopi Lutut & Bahu",
        "Penggantian Sendi",
        "Operasi Tulang Belakang",
        "Rekonstruksi Ligamen",
        "Fisioterapi Intensif",
      ],
      schedule: "Senin - Sabtu: 08:00 - 17:00\nFisioterapi: 07:00 - 19:00",
      price: "Konsultasi mulai dari Rp 300.000",
    },
    "Gawat Darurat": {
      description: "Layanan gawat darurat 24 jam dengan tim trauma center dan ambulans siaga untuk penanganan cepat.",
      doctors: [
        {
          name: "Dr. Eko Darurat, Sp.EM",
          experience: "14 tahun",
          specialty: "Emergency Medicine & Trauma",
          education: "FK UI, Fellowship Emergency Medicine",
          schedule: "Shift 24 Jam - On Call",
          image: "/doctor-male.png",
          rating: 4.9,
          patients: "5,000+",
          achievements: ["Emergency Medicine Specialist", "Trauma Team Leader"],
        },
        {
          name: "Dr. Lia Trauma, Sp.EM",
          experience: "11 tahun",
          specialty: "Trauma Surgery & Critical Care",
          education: "FK UNPAD, Fellowship Trauma Surgery",
          schedule: "Shift 24 Jam - On Call",
          image: "/doctor-female.png",
          rating: 4.8,
          patients: "3,800+",
          achievements: ["Trauma Surgery Certified", "Critical Care Specialist"],
        },
        {
          name: "Dr. Rudi Cepat, Sp.EM",
          experience: "9 tahun",
          specialty: "Emergency Pediatrics",
          education: "FK UGM, Fellowship Pediatric Emergency",
          schedule: "Shift 24 Jam - On Call",
          image: "/doctor-male.png",
          rating: 4.7,
          patients: "2,500+",
          achievements: ["Pediatric Emergency Specialist", "PALS Instructor"],
        },
      ],
      facilities: [
        "Trauma Center Level I",
        "Ambulans 24 jam",
        "Emergency ICU",
        "Helipad untuk Medical Helicopter",
        "Poison Control Center",
      ],
      procedures: [
        "Resusitasi Jantung Paru",
        "Trauma Surgery",
        "Stroke Management",
        "Cardiac Emergency",
        "Pediatric Emergency",
      ],
      schedule: "24 Jam Setiap Hari",
      price: "Biaya sesuai tindakan darurat",
    },
  }

  const currentService = serviceDetails[service.title as keyof typeof serviceDetails]

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-2xl">
            <div className={`p-3 ${service.bgColor} rounded-xl`}>{service.icon}</div>
            <div>
              <h2 className={`${service.titleColor} font-bold`}>{service.title}</h2>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-yellow-500 fill-current" />
                  <span className="text-sm font-medium">{service.rating}</span>
                </div>
                <Badge variant="secondary" className="text-xs">
                  {service.availability}
                </Badge>
              </div>
            </div>
          </DialogTitle>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="doctors">Dokter</TabsTrigger>
            <TabsTrigger value="facilities">Fasilitas</TabsTrigger>
            <TabsTrigger value="booking">Booking</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <Users className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-900">{service.patients}</p>
                  <p className="text-sm text-gray-600">Pasien Dilayani</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <Award className="h-8 w-8 text-green-500 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-900">{service.rating}/5</p>
                  <p className="text-sm text-gray-600">Rating Pasien</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <Shield className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-900">24/7</p>
                  <p className="text-sm text-gray-600">Layanan Darurat</p>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Tentang Layanan</h3>
              <p className="text-gray-600 leading-relaxed">{currentService?.description}</p>

              <h4 className="font-semibold">Prosedur Unggulan:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {currentService?.procedures.map((procedure, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">{procedure}</span>
                  </div>
                ))}
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">Jadwal Layanan</h4>
                <p className="text-blue-700 text-sm whitespace-pre-line">{currentService?.schedule}</p>
              </div>

              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-2">Informasi Biaya</h4>
                <p className="text-green-700 text-sm">{currentService?.price}</p>
                <p className="text-xs text-green-600 mt-1">*Biaya dapat berubah sesuai tindakan medis</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="doctors" className="space-y-4">
            <div className="flex items-center gap-2 mb-6">
              <Stethoscope className="h-6 w-6 text-pink-500" />
              <h3 className="text-xl font-bold text-gray-900">Tim Dokter Spesialis</h3>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {currentService?.doctors.map((doctor, index) => (
                <Card key={index} className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-pink-500">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row gap-4">
                      {/* Doctor Image */}
                      <div className="flex-shrink-0">
                        <div className="relative">
                          <img
                            src={doctor.image || "/placeholder.svg"}
                            alt={doctor.name}
                            className="w-24 h-24 rounded-full object-cover border-4 border-pink-100"
                          />
                          <div className="absolute -bottom-2 -right-2 bg-green-500 rounded-full p-1">
                            <div className="w-3 h-3 bg-white rounded-full"></div>
                          </div>
                        </div>
                      </div>

                      {/* Doctor Info */}
                      <div className="flex-1 space-y-3">
                        <div>
                          <h4 className="text-lg font-bold text-gray-900">{doctor.name}</h4>
                          <p className="text-pink-600 font-medium">{doctor.specialty}</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div className="flex items-center gap-2">
                            <GraduationCap className="h-4 w-4 text-blue-500" />
                            <span className="text-gray-600">{doctor.education}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock3 className="h-4 w-4 text-green-500" />
                            <span className="text-gray-600">Pengalaman: {doctor.experience}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-4 text-sm">
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 text-yellow-500 fill-current" />
                            <span className="font-medium">{doctor.rating}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4 text-blue-500" />
                            <span className="text-gray-600">{doctor.patients} pasien</span>
                          </div>
                        </div>

                        <div className="bg-gray-50 p-3 rounded-lg">
                          <p className="text-sm font-medium text-gray-700 mb-1">Jadwal Praktik:</p>
                          <p className="text-sm text-gray-600">{doctor.schedule}</p>
                        </div>

                        <div className="space-y-2">
                          <p className="text-sm font-medium text-gray-700">Sertifikasi & Pencapaian:</p>
                          <div className="flex flex-wrap gap-2">
                            {doctor.achievements.map((achievement, achIndex) => (
                              <Badge key={achIndex} variant="secondary" className="text-xs">
                                {achievement}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div className="flex gap-2 pt-2">
                          <Button
                            size="sm"
                            className="bg-pink-500 hover:bg-pink-600 text-white"
                            onClick={() => {
                              onBookAppointment()
                              onClose()
                            }}
                          >
                            <Calendar className="h-4 w-4 mr-2" />
                            Buat Janji
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-pink-500 text-pink-600 hover:bg-pink-50 bg-transparent"
                          >
                            <Phone className="h-4 w-4 mr-2" />
                            Konsultasi
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-8 p-6 bg-gradient-to-r from-pink-50 to-red-50 rounded-lg">
              <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                <Award className="h-5 w-5 text-pink-500" />
                Mengapa Memilih Dokter Kami?
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                  <span>Dokter berpengalaman dengan sertifikasi internasional</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                  <span>Menggunakan teknologi medis terdepan</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                  <span>Pendekatan holistik dan patient-centered care</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                  <span>Konsultasi dan follow-up yang komprehensif</span>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="facilities" className="space-y-4">
            <h3 className="text-lg font-semibold">Fasilitas & Teknologi</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {currentService?.facilities.map((facility, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-sm font-medium">{facility}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-gradient-to-r from-pink-50 to-red-50 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">Keunggulan Fasilitas Kami</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Teknologi medis terdepan dan terupdate</li>
                <li>• Standar internasional JCI (Joint Commission International)</li>
                <li>• Tim medis berpengalaman dan tersertifikasi</li>
                <li>• Layanan 24 jam untuk kasus darurat</li>
                <li>• Sistem informasi terintegrasi untuk pelayanan optimal</li>
              </ul>
            </div>
          </TabsContent>

          <TabsContent value="booking" className="space-y-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2">Siap untuk Konsultasi?</h3>
              <p className="text-gray-600 mb-6">Dapatkan pelayanan terbaik dari tim medis profesional kami</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <Card className="p-4">
                  <Calendar className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                  <h4 className="font-semibold">Buat Janji Temu</h4>
                  <p className="text-sm text-gray-600 mb-3">Pilih dokter dan waktu yang sesuai</p>
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

                <Card className="p-4">
                  <Phone className="h-8 w-8 text-green-500 mx-auto mb-2" />
                  <h4 className="font-semibold">Hubungi Langsung</h4>
                  <p className="text-sm text-gray-600 mb-3">Konsultasi via telepon</p>
                  <Button
                    variant="outline"
                    className="w-full border-green-500 text-green-600 hover:bg-green-50 bg-transparent"
                  >
                    <Phone className="h-4 w-4 mr-2" />
                    (021) 123-4567
                  </Button>
                </Card>
              </div>

              <div className="bg-yellow-50 p-4 rounded-lg">
                <h4 className="font-semibold text-yellow-800 mb-2">Informasi Penting</h4>
                <ul className="text-sm text-yellow-700 text-left space-y-1">
                  <li>• Harap datang 15 menit sebelum jadwal konsultasi</li>
                  <li>• Bawa kartu identitas dan kartu asuransi (jika ada)</li>
                  <li>• Siapkan riwayat medis dan obat yang sedang dikonsumsi</li>
                  <li>• Konfirmasi kehadiran H-1 melalui WhatsApp atau telepon</li>
                </ul>
              </div>

              <div className="flex items-center justify-center gap-4 pt-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin className="h-4 w-4" />
                  <span>Jl. Kesehatan Raya No. 123, Jakarta</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Clock className="h-4 w-4" />
                  <span>Buka 24 Jam</span>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
