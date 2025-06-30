"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { AuthModal } from "@/components/AuthModal"
import { AppointmentModal } from "@/components/AppointmentModal"
import { ServiceDetailModal } from "@/components/ServiceDetailModal"
import { DoctorDetailModal } from "@/components/DoctorDetailModal"
import { FloatingActionButton } from "@/components/FloatingActionButton"
import { ScrollProgressBar } from "@/components/ScrollProgressBar"
import { PatientDashboard } from "@/components/PatientDashboard"
import { UserMenu } from "@/components/UserMenu"
import { useAuth } from "@/contexts/AuthContext"
import {
  Heart,
  Brain,
  Baby,
  Stethoscope,
  Bone,
  Ambulance,
  Star,
  Users,
  Award,
  Clock,
  MapPin,
  Phone,
  Mail,
  Calendar,
  ChevronRight,
  Menu,
  X,
  Shield,
  Activity,
  UserCheck,
  Zap,
  Target,
  TrendingUp,
} from "lucide-react"

export default function HomePage() {
  const { user } = useAuth()
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false)
  const [selectedService, setSelectedService] = useState<any>(null)
  const [selectedDoctor, setSelectedDoctor] = useState<any>(null)
  const [activeSection, setActiveSection] = useState("home")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [dashboardTab, setDashboardTab] = useState("dashboard")

  const services = [
    {
      id: 1,
      name: "Kardiologi",
      description: "Pelayanan kesehatan jantung dan pembuluh darah dengan teknologi terdepan",
      icon: <Heart className="h-8 w-8 text-white" />,
      gradient: "from-red-400 to-pink-500",
      rating: 4.9,
      patients: "2,500+",
      features: ["EKG Digital", "Kateterisasi Jantung", "Operasi Bypass"],
      price: "Mulai dari Rp 150.000",
      doctors: [
        {
          name: "Dr. Ahmad Rizki, Sp.JP",
          image: "/doctor-male.png",
          experience: "18 tahun",
          specialty: "Spesialis Jantung",
        },
        {
          name: "Dr. Sari Jantung, Sp.JP",
          image: "/doctor-female.png",
          experience: "12 tahun",
          specialty: "Elektrofisiologi",
        },
      ],
    },
    {
      id: 2,
      name: "Neurologi",
      description: "Diagnosis dan pengobatan gangguan sistem saraf pusat dan tepi",
      icon: <Brain className="h-8 w-8 text-white" />,
      gradient: "from-purple-400 to-indigo-500",
      rating: 4.8,
      patients: "1,800+",
      features: ["MRI Brain", "EEG", "Terapi Stroke"],
      price: "Mulai dari Rp 200.000",
      doctors: [
        {
          name: "Dr. Budi Neuro, Sp.S",
          image: "/doctor-male.png",
          experience: "18 tahun",
          specialty: "Stroke & Vaskular",
        },
        {
          name: "Dr. Nina Saraf, Sp.S",
          image: "/doctor-female.png",
          experience: "14 tahun",
          specialty: "Epilepsi & EEG",
        },
      ],
    },
    {
      id: 3,
      name: "Pediatri",
      description: "Perawatan kesehatan khusus untuk bayi, anak-anak, dan remaja",
      icon: <Baby className="h-8 w-8 text-white" />,
      gradient: "from-blue-400 to-cyan-500",
      rating: 4.9,
      patients: "3,200+",
      features: ["Imunisasi Lengkap", "Tumbuh Kembang", "Gizi Anak"],
      price: "Mulai dari Rp 100.000",
      doctors: [
        {
          name: "Dr. Anisa Putri, Sp.A",
          image: "/doctor-female.png",
          experience: "10 tahun",
          specialty: "Neonatologi",
        },
        {
          name: "Dr. Rina Anak, Sp.A",
          image: "/doctor-female.png",
          experience: "8 tahun",
          specialty: "Kardiologi Anak",
        },
      ],
    },
    {
      id: 4,
      name: "Penyakit Dalam",
      description: "Penanganan komprehensif penyakit internal dan metabolik",
      icon: <Stethoscope className="h-8 w-8 text-white" />,
      gradient: "from-green-400 to-emerald-500",
      rating: 4.7,
      patients: "2,100+",
      features: ["Diabetes Care", "Hipertensi", "Endoskopi"],
      price: "Mulai dari Rp 120.000",
      doctors: [
        {
          name: "Dr. Budi Santoso, Sp.PD",
          image: "/doctor-male.png",
          experience: "16 tahun",
          specialty: "Endokrinologi",
        },
        {
          name: "Dr. Maya Dalam, Sp.PD",
          image: "/doctor-female.png",
          experience: "12 tahun",
          specialty: "Gastroenterologi",
        },
      ],
    },
    {
      id: 5,
      name: "Ortopedi",
      description: "Spesialis tulang, sendi, dan sistem muskuloskeletal",
      icon: <Bone className="h-8 w-8 text-white" />,
      gradient: "from-orange-400 to-amber-500",
      rating: 4.8,
      patients: "1,900+",
      features: ["Arthroscopy", "Joint Replacement", "Fisioterapi"],
      price: "Mulai dari Rp 180.000",
      doctors: [
        {
          name: "Dr. Joko Tulang, Sp.OT",
          image: "/doctor-male.png",
          experience: "14 tahun",
          specialty: "Spine Surgery",
        },
        {
          name: "Dr. Siti Sendi, Sp.OT",
          image: "/doctor-female.png",
          experience: "11 tahun",
          specialty: "Sports Medicine",
        },
      ],
    },
    {
      id: 6,
      name: "Gawat Darurat",
      description: "Pelayanan darurat 24 jam dengan tim medis berpengalaman",
      icon: <Ambulance className="h-8 w-8 text-white" />,
      gradient: "from-red-600 to-rose-500",
      rating: 4.9,
      patients: "5,000+",
      features: ["24/7 Service", "Ambulance", "ICU"],
      price: "Sesuai Tindakan",
      doctors: [
        {
          name: "Dr. Eko Darurat, Sp.EM",
          image: "/doctor-male.png",
          experience: "12 tahun",
          specialty: "Emergency Medicine",
        },
        {
          name: "Dr. Lia Trauma, Sp.EM",
          image: "/doctor-female.png",
          experience: "9 tahun",
          specialty: "Trauma Surgery",
        },
      ],
    },
  ]

  const doctors = [
    {
      id: 1,
      name: "Dr. Budi Santoso, Sp.PD",
      specialty: "Spesialis Penyakit Dalam",
      experience: "15 tahun",
      rating: 4.9,
      patients: "2,500+",
      image: "/doctor-male.png",
      education: "Universitas Indonesia",
      schedule: ["Senin-Jumat: 08:00-16:00", "Sabtu: 08:00-12:00"],
      languages: ["Indonesia", "English"],
    },
    {
      id: 2,
      name: "Dr. Citra Dewi, Sp.OG",
      specialty: "Spesialis Kandungan",
      experience: "12 tahun",
      rating: 4.8,
      patients: "1,800+",
      image: "/doctor-female.png",
      education: "Universitas Gadjah Mada",
      schedule: ["Senin-Jumat: 09:00-17:00", "Sabtu: 09:00-13:00"],
      languages: ["Indonesia", "English"],
    },
    {
      id: 3,
      name: "Dr. Ahmad Rizki, Sp.JP",
      specialty: "Spesialis Jantung",
      experience: "18 tahun",
      rating: 4.9,
      patients: "3,200+",
      image: "/doctor-male.png",
      education: "Universitas Padjadjaran",
      schedule: ["Senin-Jumat: 07:00-15:00", "Sabtu: 07:00-11:00"],
      languages: ["Indonesia", "English", "Arabic"],
    },
  ]

  const stats = [
    { icon: <Users className="h-8 w-8 text-blue-600" />, value: "50,000+", label: "Pasien Terlayani" },
    { icon: <Award className="h-8 w-8 text-green-600" />, value: "25+", label: "Penghargaan" },
    { icon: <Stethoscope className="h-8 w-8 text-pink-600" />, value: "100+", label: "Dokter Ahli" },
    { icon: <Clock className="h-8 w-8 text-orange-600" />, value: "24/7", label: "Layanan Darurat" },
  ]

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsMobileMenuOpen(false)
  }

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "services", "doctors", "contact"]
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const offsetTop = element.offsetTop
          const offsetHeight = element.offsetHeight

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  if (user) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm sticky top-0 z-40">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Image
                  src="/hospital-logo-circle.png"
                  alt="Cipta Hospital Logo"
                  width={50}
                  height={50}
                  className="rounded-full"
                />
                <div>
                  <h1 className="text-xl font-bold text-pink-600">Cipta Hospital</h1>
                  <p className="text-sm text-gray-600">Indonesia Healthcare Excellence</p>
                </div>
              </div>
              <UserMenu />
            </div>
          </div>
        </header>

        {/* Navigation Tabs */}
        <div className="bg-white border-b">
          <div className="container mx-auto px-4">
            <nav className="flex space-x-8">
              {[
                { id: "dashboard", label: "Dashboard" },
                { id: "appointments", label: "Janji Temu" },
                { id: "medical-records", label: "Rekam Medis" },
                { id: "profile", label: "Profil" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setDashboardTab(tab.id)}
                  className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                    dashboardTab === tab.id
                      ? "border-pink-500 text-pink-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        <PatientDashboard
          activeTab={dashboardTab}
          onTabChange={setDashboardTab}
          onAppointmentClick={() => setIsAppointmentModalOpen(true)}
        />

        <AppointmentModal isOpen={isAppointmentModalOpen} onClose={() => setIsAppointmentModalOpen(false)} />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <ScrollProgressBar />

      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Image
                src="/hospital-logo-circle.png"
                alt="Cipta Hospital Logo"
                width={50}
                height={50}
                className="rounded-full"
              />
              <div>
                <h1 className="text-xl font-bold text-pink-600">Cipta Hospital</h1>
                <p className="text-sm text-gray-600">Indonesia Healthcare Excellence</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {[
                { id: "home", label: "Beranda" },
                { id: "about", label: "Tentang" },
                { id: "services", label: "Layanan" },
                { id: "doctors", label: "Dokter" },
                { id: "contact", label: "Kontak" },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`font-medium transition-colors ${
                    activeSection === item.id ? "text-pink-600" : "text-gray-600 hover:text-pink-600"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            <div className="flex items-center gap-4">
              <Button
                onClick={() => setIsAuthModalOpen(true)}
                className="hidden md:flex bg-pink-500 hover:bg-pink-600 text-white"
              >
                Masuk / Daftar
              </Button>

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <nav className="md:hidden mt-4 pb-4 border-t pt-4">
              <div className="flex flex-col space-y-4">
                {[
                  { id: "home", label: "Beranda" },
                  { id: "about", label: "Tentang" },
                  { id: "services", label: "Layanan" },
                  { id: "doctors", label: "Dokter" },
                  { id: "contact", label: "Kontak" },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`text-left font-medium transition-colors ${
                      activeSection === item.id ? "text-pink-600" : "text-gray-600 hover:text-pink-600"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
                <Button
                  onClick={() => {
                    setIsAuthModalOpen(true)
                    setIsMobileMenuOpen(false)
                  }}
                  className="bg-pink-500 hover:bg-pink-600 text-white w-full"
                >
                  Masuk / Daftar
                </Button>
              </div>
            </nav>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="relative bg-gradient-to-br from-pink-50 via-white to-blue-50 py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge className="bg-pink-100 text-pink-700 hover:bg-pink-200">🏥 Rumah Sakit Terpercaya</Badge>
                <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
                  Kesehatan Anda,{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-red-500">
                    Prioritas Utama
                  </span>{" "}
                  Kami
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Memberikan pelayanan kesehatan terbaik dengan teknologi modern dan tim medis berpengalaman untuk
                  keluarga Indonesia.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  onClick={() => setIsAppointmentModalOpen(true)}
                  className="bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white px-8 py-3 text-lg"
                >
                  <Calendar className="mr-2 h-5 w-5" />
                  Buat Janji Temu
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => scrollToSection("services")}
                  className="border-pink-200 text-pink-600 hover:bg-pink-50 px-8 py-3 text-lg"
                >
                  Lihat Layanan
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="flex justify-center mb-2">{stat.icon}</div>
                    <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Hospital Image - Hidden on Mobile */}
            <div className="relative hidden lg:block">
              <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-red-400 rounded-3xl transform rotate-6 opacity-20"></div>
              <Image
                src="/hospital-building.png"
                alt="Cipta Hospital Building"
                width={600}
                height={400}
                className="relative z-10 rounded-3xl shadow-2xl hover:scale-105 transition-transform duration-300 cursor-pointer"
              />
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200 mb-4">🏆 Tentang Kami</Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Mengapa Memilih{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-red-500">
                Cipta Hospital?
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Dengan pengalaman lebih dari 20 tahun, kami berkomitmen memberikan pelayanan kesehatan terdepan dengan
              standar internasional.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Shield className="h-12 w-12 text-blue-600" />,
                title: "Akreditasi Internasional",
                description: "Tersertifikasi JCI dan ISO untuk menjamin kualitas pelayanan terbaik",
              },
              {
                icon: <Activity className="h-12 w-12 text-green-600" />,
                title: "Teknologi Terdepan",
                description: "Peralatan medis canggih dan sistem informasi terintegrasi",
              },
              {
                icon: <UserCheck className="h-12 w-12 text-pink-600" />,
                title: "Tim Medis Berpengalaman",
                description: "Dokter spesialis dan tenaga medis profesional bersertifikat",
              },
              {
                icon: <Zap className="h-12 w-12 text-orange-600" />,
                title: "Pelayanan 24/7",
                description: "Siap melayani kebutuhan kesehatan Anda kapan saja",
              },
            ].map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <div className="flex justify-center mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-16 bg-gradient-to-r from-gray-50 to-blue-50 rounded-3xl p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-3xl font-bold text-gray-900 mb-6">Visi & Misi Kami</h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="text-xl font-semibold text-pink-600 mb-2">
                      <Target className="inline h-5 w-5 mr-2" />
                      Visi
                    </h4>
                    <p className="text-gray-700">
                      Menjadi rumah sakit pilihan utama yang memberikan pelayanan kesehatan berkualitas tinggi dan
                      terjangkau bagi seluruh masyarakat Indonesia.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-blue-600 mb-2">
                      <TrendingUp className="inline h-5 w-5 mr-2" />
                      Misi
                    </h4>
                    <p className="text-gray-700">
                      Memberikan pelayanan medis terbaik dengan teknologi terdepan, meningkatkan kualitas hidup
                      masyarakat, dan mengembangkan SDM kesehatan yang profesional.
                    </p>
                  </div>
                </div>
              </div>
              <div className="relative">
                <Image
                  src="/service-motto.png"
                  alt="Service Excellence"
                  width={400}
                  height={300}
                  className="rounded-2xl shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="bg-gradient-to-r from-pink-500 to-red-500 text-white hover:from-pink-600 hover:to-red-600 mb-4">
              🩺 Layanan Unggulan
            </Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Layanan Kesehatan{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-red-500">
                Terlengkap
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Kami menyediakan berbagai layanan kesehatan dengan standar internasional untuk memenuhi kebutuhan medis
              Anda dan keluarga.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <Card
                key={service.id}
                className="group hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer overflow-hidden relative"
                onClick={() => setSelectedService(service)}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-90`}>
                  <div className="absolute top-4 right-4 w-16 h-16 bg-white/20 rounded-full"></div>
                </div>
                <CardContent className="relative z-10 p-8 text-white">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-white/20 rounded-full backdrop-blur-sm">{service.icon}</div>
                    <div className="flex items-center gap-1 bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">
                      <Star className="h-4 w-4 fill-current text-yellow-300" />
                      <span className="text-sm font-medium">{service.rating}</span>
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{service.name}</h3>
                  <p className="text-white/90 mb-4 line-clamp-2">{service.description}</p>

                  {/* Doctors Section */}
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold mb-2 text-white/90">Tim Dokter:</h4>
                    <div className="flex -space-x-2 mb-2">
                      {service.doctors.map((doctor, index) => (
                        <div key={index} className="relative">
                          <Image
                            src={doctor.image || "/placeholder.svg"}
                            alt={doctor.name}
                            width={32}
                            height={32}
                            className="w-8 h-8 rounded-full border-2 border-white/50 bg-white/20"
                          />
                        </div>
                      ))}
                    </div>
                    <div className="text-xs text-white/80">
                      {service.doctors.map((doctor, index) => (
                        <div key={index} className="truncate">
                          {doctor.name} - {doctor.experience}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2 mb-6">
                    <div className="flex items-center gap-2 text-sm">
                      <Users className="h-4 w-4" />
                      <span>{service.patients} pasien</span>
                    </div>
                    <div className="text-sm font-medium">{service.price}</div>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {service.features.slice(0, 2).map((feature, index) => (
                      <span key={index} className="text-xs bg-white/20 px-2 py-1 rounded-full backdrop-blur-sm">
                        {feature}
                      </span>
                    ))}
                  </div>
                  <Button
                    variant="secondary"
                    className="w-full bg-white/20 hover:bg-white/30 text-white border-white/30 backdrop-blur-sm"
                  >
                    Lihat Detail
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Doctors Section */}
      <section id="doctors" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="bg-green-100 text-green-700 hover:bg-green-200 mb-4">👨‍⚕️ Tim Medis</Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Dokter{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-red-500">
                Berpengalaman
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Tim dokter spesialis kami siap memberikan pelayanan terbaik dengan pengalaman bertahun-tahun di bidangnya.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {doctors.map((doctor) => (
              <Card
                key={doctor.id}
                className="group hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer"
                onClick={() => setSelectedDoctor(doctor)}
              >
                <CardContent className="p-8 text-center">
                  <div className="relative mb-6">
                    <div className="w-32 h-32 mx-auto rounded-full bg-gray-100 border-4 border-pink-100 overflow-hidden">
                      <Image
                        src={doctor.image || "/placeholder.svg"}
                        alt={doctor.name}
                        width={128}
                        height={128}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-pink-500 text-white">
                        <Star className="h-3 w-3 mr-1 fill-current" />
                        {doctor.rating}
                      </Badge>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{doctor.name}</h3>
                  <p className="text-pink-600 font-medium mb-4">{doctor.specialty}</p>
                  <div className="space-y-2 text-sm text-gray-600 mb-6">
                    <div className="flex items-center justify-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span>{doctor.experience} pengalaman</span>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <Users className="h-4 w-4" />
                      <span>{doctor.patients} pasien</span>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    className="w-full border-pink-200 text-pink-600 hover:bg-pink-50 bg-transparent"
                  >
                    Lihat Profil
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gradient-to-br from-pink-50 via-white to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-200 mb-4">📞 Hubungi Kami</Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Siap Melayani{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-red-500">24/7</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Tim customer service kami siap membantu Anda kapan saja. Hubungi kami untuk informasi lebih lanjut atau
              konsultasi.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="grid sm:grid-cols-2 gap-6">
                {[
                  {
                    icon: <Phone className="h-6 w-6 text-pink-600" />,
                    title: "Telepon",
                    info: "+62 21 1500-XXX",
                    action: "tel:+622115000000",
                  },
                  {
                    icon: <Mail className="h-6 w-6 text-blue-600" />,
                    title: "Email",
                    info: "info@ciptahospital.com",
                    action: "mailto:info@ciptahospital.com",
                  },
                  {
                    icon: <MapPin className="h-6 w-6 text-green-600" />,
                    title: "Alamat",
                    info: "Jl. Kesehatan No. 123, Jakarta",
                    action: "https://maps.google.com/?q=Cipta+Hospital+Jakarta",
                  },
                  {
                    icon: <Clock className="h-6 w-6 text-orange-600" />,
                    title: "Jam Operasional",
                    info: "24 Jam Setiap Hari",
                    action: null,
                  },
                ].map((contact, index) => (
                  <Card key={index} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="p-2 bg-gray-100 rounded-lg">{contact.icon}</div>
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-1">{contact.title}</h3>
                          {contact.action ? (
                            <a
                              href={contact.action}
                              target={contact.action.startsWith("http") ? "_blank" : undefined}
                              className="text-gray-600 hover:text-pink-600 transition-colors"
                            >
                              {contact.info}
                            </a>
                          ) : (
                            <p className="text-gray-600">{contact.info}</p>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl text-gray-900">Layanan Darurat</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-6">
                    Untuk situasi darurat medis, segera hubungi nomor darurat kami atau datang langsung ke UGD.
                  </p>
                  <Button
                    size="lg"
                    className="w-full bg-red-500 hover:bg-red-600 text-white"
                    onClick={() => window.open("tel:1500-XXX", "_self")}
                  >
                    <Ambulance className="mr-2 h-5 w-5" />
                    Hubungi Darurat: 1500-XXX
                  </Button>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-gray-900">Kirim Pesan</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Nama Lengkap</label>
                      <Input placeholder="Masukkan nama lengkap" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Nomor Telepon</label>
                      <Input placeholder="Masukkan nomor telepon" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <Input type="email" placeholder="Masukkan alamat email" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Subjek</label>
                    <Input placeholder="Masukkan subjek pesan" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Pesan</label>
                    <Textarea placeholder="Tulis pesan Anda di sini..." rows={4} />
                  </div>
                  <Button type="submit" size="lg" className="w-full bg-pink-500 hover:bg-pink-600 text-white">
                    Kirim Pesan
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Image
                  src="/hospital-logo-circle.png"
                  alt="Cipta Hospital Logo"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <div>
                  <h3 className="text-xl font-bold text-pink-400">Cipta Hospital</h3>
                  <p className="text-sm text-gray-400">Healthcare Excellence</p>
                </div>
              </div>
              <p className="text-gray-400 mb-4">
                Memberikan pelayanan kesehatan terbaik dengan teknologi modern dan tim medis berpengalaman.
              </p>
              <div className="flex space-x-4">{/* Social media icons would go here */}</div>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Layanan</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-pink-400 transition-colors">
                    Kardiologi
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-pink-400 transition-colors">
                    Neurologi
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-pink-400 transition-colors">
                    Pediatri
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-pink-400 transition-colors">
                    Gawat Darurat
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Informasi</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-pink-400 transition-colors">
                    Tentang Kami
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-pink-400 transition-colors">
                    Karir
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-pink-400 transition-colors">
                    Berita
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-pink-400 transition-colors">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Kontak</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Jl. Kesehatan No. 123, Jakarta</li>
                <li>+62 21 1500-XXX</li>
                <li>info@ciptahospital.com</li>
                <li>24 Jam Setiap Hari</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Cipta Hospital. Semua hak dilindungi undang-undang.</p>
          </div>
        </div>
      </footer>

      {/* Floating Action Button */}
      <FloatingActionButton onAppointmentClick={() => setIsAppointmentModalOpen(true)} showEmergencyPrimary={true} />

      {/* Modals */}
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
      <AppointmentModal isOpen={isAppointmentModalOpen} onClose={() => setIsAppointmentModalOpen(false)} />
      {selectedService && (
        <ServiceDetailModal
          service={selectedService}
          isOpen={!!selectedService}
          onClose={() => setSelectedService(null)}
          onBookAppointment={() => {
            setSelectedService(null)
            setIsAppointmentModalOpen(true)
          }}
        />
      )}
      {selectedDoctor && (
        <DoctorDetailModal
          doctor={selectedDoctor}
          isOpen={!!selectedDoctor}
          onClose={() => setSelectedDoctor(null)}
          onBookAppointment={() => {
            setSelectedDoctor(null)
            setIsAppointmentModalOpen(true)
          }}
        />
      )}
    </div>
  )
}
