"use client"

import type React from "react"

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  HeartPulse,
  Stethoscope,
  Baby,
  Brain,
  Bone,
  Calendar,
  Phone,
  User,
  LogIn,
  Menu,
  X,
  Clock,
  LogOut,
} from "lucide-react"
import { AuthModal } from "@/components/AuthModal"
import { AppointmentModal } from "@/components/AppointmentModal"
import { PatientDashboard } from "@/components/PatientDashboard"
import { ServiceDetailModal } from "@/components/ServiceDetailModal"
import { DoctorDetailModal } from "@/components/DoctorDetailModal"
import { FloatingActionButton } from "@/components/FloatingActionButton"
import { ScrollProgressBar } from "@/components/ScrollProgressBar"
import { useAuth } from "@/contexts/AuthContext"

export default function CiptaHospitalPage() {
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const [authModalTab, setAuthModalTab] = useState<"login" | "register">("login")
  const [appointmentModalOpen, setAppointmentModalOpen] = useState(false)
  const [serviceModalOpen, setServiceModalOpen] = useState(false)
  const [doctorModalOpen, setDoctorModalOpen] = useState(false)
  const [selectedService, setSelectedService] = useState<any>(null)
  const [selectedDoctor, setSelectedDoctor] = useState<any>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [contactForm, setContactForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" })
  const [contactSubmitted, setContactSubmitted] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [activeDashboardTab, setActiveDashboardTab] = useState("dashboard")
  const [logoutLoading, setLogoutLoading] = useState(false)

  const { user, loading, signOut } = useAuth()

  // Auto-detect scroll position for active navigation
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "services", "doctors", "about", "contact"]
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

  const handleAuthClick = (type: "login" | "register") => {
    setAuthModalTab(type)
    setAuthModalOpen(true)
  }

  const handleAppointmentClick = () => {
    if (!user) {
      setAuthModalTab("login")
      setAuthModalOpen(true)
    } else {
      setAppointmentModalOpen(true)
    }
  }

  const handleServiceClick = (service: any) => {
    setSelectedService(service)
    setServiceModalOpen(true)
  }

  const handleDoctorClick = (doctor: any) => {
    setSelectedDoctor(doctor)
    setDoctorModalOpen(true)
  }

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate form submission
    setContactSubmitted(true)
    setTimeout(() => {
      setContactSubmitted(false)
      setContactForm({ name: "", email: "", phone: "", subject: "", message: "" })
    }, 3000)
  }

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId)
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setMobileMenuOpen(false)
  }

  const handleLogout = async () => {
    setLogoutLoading(true)
    await signOut()
    setLogoutLoading(false)
    setMobileMenuOpen(false)
  }

  const getNavItemClass = (sectionId: string) => {
    return activeSection === sectionId
      ? "text-sm font-medium text-pink-500 border-b-2 border-pink-500 pb-1 transition-colors cursor-pointer"
      : "text-sm font-medium text-gray-600 hover:text-pink-500 transition-colors pb-1 cursor-pointer"
  }

  const getMobileNavItemClass = (sectionId: string) => {
    return activeSection === sectionId
      ? "text-left text-pink-500 font-medium cursor-pointer"
      : "text-left text-gray-600 hover:text-pink-500 transition-colors cursor-pointer"
  }

  const getDashboardNavItemClass = (tabId: string) => {
    return activeDashboardTab === tabId
      ? "text-sm font-medium text-white border-b-2 border-white pb-1 transition-colors cursor-pointer"
      : "text-sm font-medium text-pink-100 hover:text-white transition-colors pb-1 cursor-pointer"
  }

  const getMobileDashboardNavItemClass = (tabId: string) => {
    return activeDashboardTab === tabId
      ? "text-left text-pink-500 font-medium cursor-pointer"
      : "text-left text-gray-600 hover:text-pink-500 transition-colors cursor-pointer"
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-pink-500"></div>
      </div>
    )
  }

  // Show Patient Dashboard if user is logged in
  if (user) {
    return (
      <div className="flex flex-col min-h-screen bg-white">
        <ScrollProgressBar />
        {/* Header for logged in users */}
        <header className="sticky top-0 z-40 bg-gradient-to-r from-pink-400 via-pink-500 to-red-400 text-white shadow-lg px-4 lg:px-6 h-16 flex items-center">
          <Link href="#" className="flex items-center justify-center gap-3 hover:scale-105 transition-transform">
            <Image
              src="/hospital-logo-circle.png"
              alt="Logo PT Cipta Hospital Indonesia"
              width={40}
              height={40}
              className="h-10 w-10"
            />
            <div className="flex flex-col">
              <span className="text-lg font-bold text-white">Cipta Hospital</span>
              <span className="text-xs text-pink-100">Portal Pasien</span>
            </div>
          </Link>

          {/* Desktop Navigation for logged in users */}
          <nav className="ml-auto hidden lg:flex gap-8">
            <button
              onClick={() => setActiveDashboardTab("dashboard")}
              className={getDashboardNavItemClass("dashboard")}
            >
              Dashboard
            </button>
            <button
              onClick={() => setActiveDashboardTab("appointments")}
              className={getDashboardNavItemClass("appointments")}
            >
              Janji Temu
            </button>
            <button
              onClick={() => setActiveDashboardTab("medical-records")}
              className={getDashboardNavItemClass("medical-records")}
            >
              Rekam Medis
            </button>
            <button onClick={() => setActiveDashboardTab("profile")} className={getDashboardNavItemClass("profile")}>
              Profil
            </button>
          </nav>

          {/* User Menu */}
          <div className="ml-8 hidden lg:flex gap-3">
            <Button
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-pink-500 transition-all"
            >
              <User className="w-4 h-4 mr-2" />
              {user?.full_name || user?.email?.split("@")[0] || "Demo User"}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/20 transition-all"
              onClick={handleLogout}
              disabled={logoutLoading}
            >
              <LogOut className="w-4 h-4" />
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="ml-auto lg:hidden hover:scale-110 transition-transform text-white hover:bg-white/20"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </header>

        {/* Mobile Menu for logged in users */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b shadow-lg animate-in slide-in-from-top-2 duration-200">
            <nav className="flex flex-col p-4 space-y-4">
              <button
                onClick={() => {
                  setActiveDashboardTab("dashboard")
                  setMobileMenuOpen(false)
                }}
                className={getMobileDashboardNavItemClass("dashboard")}
              >
                Dashboard
              </button>
              <button
                onClick={() => {
                  setActiveDashboardTab("appointments")
                  setMobileMenuOpen(false)
                }}
                className={getMobileDashboardNavItemClass("appointments")}
              >
                Janji Temu
              </button>
              <button
                onClick={() => {
                  setActiveDashboardTab("medical-records")
                  setMobileMenuOpen(false)
                }}
                className={getMobileDashboardNavItemClass("medical-records")}
              >
                Rekam Medis
              </button>
              <button
                onClick={() => {
                  setActiveDashboardTab("profile")
                  setMobileMenuOpen(false)
                }}
                className={getMobileDashboardNavItemClass("profile")}
              >
                Profil
              </button>
              <div className="flex gap-2 pt-4 border-t">
                <Button variant="outline" size="sm" className="flex-1">
                  <User className="w-4 h-4 mr-2" />
                  {user?.full_name || "Demo User"}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-red-600 border-red-200 hover:bg-red-50"
                  onClick={handleLogout}
                  disabled={logoutLoading}
                >
                  <LogOut className="w-4 h-4" />
                </Button>
              </div>
            </nav>
          </div>
        )}

        {/* Patient Dashboard */}
        <PatientDashboard
          activeTab={activeDashboardTab}
          onTabChange={setActiveDashboardTab}
          onAppointmentClick={handleAppointmentClick}
        />

        {/* Floating Action Button */}
        <FloatingActionButton onAppointmentClick={handleAppointmentClick} />

        {/* Modals */}
        <AppointmentModal isOpen={appointmentModalOpen} onClose={() => setAppointmentModalOpen(false)} />
      </div>
    )
  }

  const services = [
    {
      icon: <HeartPulse className="h-8 w-8 text-pink-500" />,
      title: "Kardiologi",
      titleColor: "text-gray-900",
      desc: "Pelayanan jantung dan pembuluh darah dengan teknologi terdepan",
      rating: 4.9,
      features: ["Kateterisasi Jantung", "Operasi Bypass", "Echocardiography 4D"],
      patients: "2,500+",
      availability: "Tersedia",
      bgColor: "bg-pink-50",
    },
    {
      icon: <Brain className="h-8 w-8 text-red-500" />,
      title: "Neurologi",
      titleColor: "text-red-500",
      desc: "Diagnosis dan pengobatan gangguan sistem saraf",
      rating: 4.8,
      features: ["Stroke Center 24 Jam", "Operasi Tumor Otak", "MRI 3 Tesla"],
      patients: "1,800+",
      availability: "Tersedia",
      bgColor: "bg-red-50",
    },
    {
      icon: <Baby className="h-8 w-8 text-pink-500" />,
      title: "Pediatri",
      titleColor: "text-gray-900",
      desc: "Perawatan kesehatan khusus untuk bayi dan anak-anak",
      rating: 4.9,
      features: ["NICU Level III", "Pediatric ICU", "Vaksinasi Lengkap"],
      patients: "3,200+",
      availability: "Tersedia",
      bgColor: "bg-pink-50",
    },
    {
      icon: <Stethoscope className="h-8 w-8 text-blue-500" />,
      title: "Penyakit Dalam",
      titleColor: "text-gray-900",
      desc: "Diagnosis dan penanganan penyakit internal komprehensif",
      rating: 4.7,
      features: ["Endoskopi", "Diabetes Center", "Hemodialisis"],
      patients: "2,100+",
      availability: "Tersedia",
      bgColor: "bg-blue-50",
    },
    {
      icon: <Bone className="h-8 w-8 text-green-500" />,
      title: "Ortopedi",
      titleColor: "text-gray-900",
      desc: "Perawatan tulang, sendi, dan sistem muskuloskeletal",
      rating: 4.8,
      features: ["Artroskopi", "Penggantian Sendi", "Fisioterapi"],
      patients: "1,900+",
      availability: "Tersedia",
      bgColor: "bg-green-50",
    },
    {
      icon: <HeartPulse className="h-8 w-8 text-orange-500" />,
      title: "Gawat Darurat",
      titleColor: "text-orange-500",
      desc: "Layanan darurat 24 jam dengan tim medis siaga",
      rating: 4.9,
      features: ["Trauma Center", "Ambulans 24 Jam", "ICU Darurat"],
      patients: "5,000+",
      availability: "24 Jam",
      bgColor: "bg-orange-50",
    },
  ]

  const doctors = [
    { img: "/doctor-female.png", name: "Dr. Anisa Putri, Sp.A", spec: "Spesialis Anak" },
    { img: "/doctor-male.png", name: "Dr. Budi Santoso, Sp.PD", spec: "Spesialis Penyakit Dalam" },
    { img: "/doctor-female.png", name: "Dr. Citra Dewi, Sp.OG", spec: "Spesialis Kandungan" },
    { img: "/doctor-male.png", name: "Dr. Doni Wijaya, Sp.JP", spec: "Spesialis Jantung" },
  ]

  // Show regular homepage for non-logged in users
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <ScrollProgressBar />

      {/* Header */}
      <header className="sticky top-0 z-40 bg-white shadow-sm px-4 lg:px-6 h-20 flex items-center">
        <Link href="#" className="flex items-center justify-center gap-3 hover:scale-105 transition-transform">
          <Image
            src="/hospital-logo-circle.png"
            alt="Logo PT Cipta Hospital Indonesia"
            width={48}
            height={48}
            className="h-12 w-12"
          />
          <div className="flex flex-col">
            <span className="text-xl font-bold text-pink-500">Cipta Hospital</span>
            <span className="text-xs text-gray-500">Indonesia Healthcare Excellence</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="ml-auto hidden lg:flex gap-8">
          <button onClick={() => scrollToSection("home")} className={getNavItemClass("home")}>
            Beranda
          </button>
          <button onClick={() => scrollToSection("about")} className={getNavItemClass("about")}>
            Tentang Kami
          </button>
          <button onClick={() => scrollToSection("services")} className={getNavItemClass("services")}>
            Layanan
          </button>
          <button onClick={() => scrollToSection("doctors")} className={getNavItemClass("doctors")}>
            Tim Dokter
          </button>
          <button onClick={() => scrollToSection("contact")} className={getNavItemClass("contact")}>
            Kontak
          </button>
        </nav>

        {/* Desktop Auth Buttons */}
        <div className="ml-8 hidden lg:flex gap-3">
          <Button
            variant="outline"
            className="border-pink-500 text-pink-500 hover:bg-pink-50 hover:scale-105 transition-all"
            onClick={() => handleAuthClick("register")}
          >
            <User className="w-4 h-4 mr-2" />
            Daftar
          </Button>
          <Button
            className="bg-pink-500 text-white hover:bg-pink-600 hover:scale-105 transition-all"
            onClick={() => handleAuthClick("login")}
          >
            <LogIn className="w-4 h-4 mr-2" />
            Login
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="ml-auto lg:hidden hover:scale-110 transition-transform"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b shadow-lg animate-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col p-4 space-y-4">
            <button onClick={() => scrollToSection("home")} className={getMobileNavItemClass("home")}>
              Beranda
            </button>
            <button onClick={() => scrollToSection("about")} className={getMobileNavItemClass("about")}>
              Tentang Kami
            </button>
            <button onClick={() => scrollToSection("services")} className={getMobileNavItemClass("services")}>
              Layanan
            </button>
            <button onClick={() => scrollToSection("doctors")} className={getMobileNavItemClass("doctors")}>
              Tim Dokter
            </button>
            <button onClick={() => scrollToSection("contact")} className={getMobileNavItemClass("contact")}>
              Kontak
            </button>
            <div className="flex gap-2 pt-4 border-t">
              <Button variant="outline" size="sm" onClick={() => handleAuthClick("register")}>
                Daftar
              </Button>
              <Button size="sm" className="bg-pink-500" onClick={() => handleAuthClick("login")}>
                Login
              </Button>
            </div>
          </nav>
        </div>
      )}

      <main className="flex-1">
        {/* Hero Section */}
        <section id="home" className="w-full py-16 md:py-24 lg:py-32 bg-gradient-to-br from-pink-50 to-rose-100">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_600px] items-center">
              <div className="flex flex-col justify-center space-y-6 animate-in fade-in-50 slide-in-from-left-10 duration-700">
                <div className="space-y-4">
                  <p className="text-pink-500 font-medium text-sm animate-in fade-in-50 slide-in-from-left-10 duration-500 delay-200">
                    Rumah Sakit Terpercaya #1 di Indonesia
                  </p>
                  <h1 className="text-4xl font-bold tracking-tight sm:text-5xl xl:text-6xl/none animate-in fade-in-50 slide-in-from-left-10 duration-700 delay-300">
                    <span className="text-gray-900">Kesehatan Anda,</span>
                    <br />
                    <span className="bg-gradient-to-r from-pink-500 to-red-500 bg-clip-text text-transparent">
                      Prioritas Utama
                    </span>
                  </h1>
                  <p className="max-w-[600px] text-gray-600 text-lg leading-relaxed animate-in fade-in-50 slide-in-from-left-10 duration-700 delay-500">
                    PT Cipta Hospital Indonesia memberikan pelayanan kesehatan terbaik dengan teknologi modern dan tim
                    medis berpengalaman untuk keluarga Indonesia.
                  </p>
                </div>
                <div className="flex flex-col gap-3 min-[400px]:flex-row animate-in fade-in-50 slide-in-from-left-10 duration-700 delay-700">
                  <Button
                    className="bg-pink-500 text-white hover:bg-pink-600 hover:scale-105 h-12 px-6 transition-all duration-300 shadow-lg hover:shadow-xl"
                    onClick={handleAppointmentClick}
                  >
                    <Calendar className="w-4 h-4 mr-2" />
                    Buat Janji Temu
                  </Button>
                  <Button
                    variant="outline"
                    className="border-pink-500 text-pink-500 hover:bg-pink-50 hover:scale-105 h-12 px-6 transition-all duration-300"
                    onClick={() => scrollToSection("contact")}
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Hubungi Kami
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-center animate-in fade-in-50 slide-in-from-right-10 duration-700 delay-300">
                <Image
                  src="/hospital-building.png"
                  width="400"
                  height="400"
                  alt="Hospital Building Illustration"
                  className="mx-auto aspect-square overflow-hidden object-contain hover:scale-110 transition-transform duration-500 cursor-pointer"
                  onClick={() => scrollToSection("about")}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-pink-100 px-3 py-1 text-sm text-pink-600 animate-in fade-in-50 slide-in-from-top-5 duration-500">
                  Layanan Unggulan
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-gray-900 animate-in fade-in-50 slide-in-from-top-5 duration-700 delay-200">
                  Layanan Medis Komprehensif
                </h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed animate-in fade-in-50 slide-in-from-top-5 duration-700 delay-400">
                  Kami menyediakan berbagai layanan spesialis untuk memenuhi semua kebutuhan kesehatan Anda.
                </p>
              </div>
            </div>
            <div className="mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-12 max-w-7xl">
              {services.map((service, index) => (
                <Card
                  key={index}
                  className="transform transition-all duration-500 hover:scale-105 hover:shadow-2xl cursor-pointer border border-gray-200 relative overflow-hidden group animate-in fade-in-50 slide-in-from-bottom-10"
                  style={{ animationDelay: `${index * 100}ms` }}
                  onClick={() => handleServiceClick(service)}
                  data-service={index}
                >
                  <CardContent className="p-6">
                    {/* Rating */}
                    <div className="absolute top-4 right-4 flex items-center gap-1 bg-yellow-100 px-2 py-1 rounded-full group-hover:bg-yellow-200 transition-colors">
                      <span className="text-yellow-500 text-sm">★</span>
                      <span className="text-sm font-medium text-gray-700">{service.rating}</span>
                    </div>

                    {/* Icon */}
                    <div
                      className={`w-16 h-16 ${service.bgColor} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                    >
                      {service.icon}
                    </div>

                    {/* Title and Description */}
                    <h3
                      className={`text-xl font-bold mb-2 ${service.titleColor} group-hover:text-pink-500 transition-colors`}
                    >
                      {service.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 leading-relaxed">{service.desc}</p>

                    {/* Features */}
                    <div className="space-y-2 mb-6">
                      {service.features.map((feature, featureIndex) => (
                        <div
                          key={featureIndex}
                          className="flex items-center gap-2 group-hover:translate-x-1 transition-transform duration-300"
                          style={{ transitionDelay: `${featureIndex * 50}ms` }}
                        >
                          <div className="w-4 h-4 bg-green-100 rounded-full flex items-center justify-center group-hover:bg-green-200 transition-colors">
                            <span className="text-green-600 text-xs">✓</span>
                          </div>
                          <span className="text-sm text-gray-600">{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* Stats */}
                    <div className="flex items-center justify-between mb-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1 hover:text-pink-500 transition-colors">
                        <User className="w-4 h-4" />
                        <span>{service.patients} pasien</span>
                      </div>
                      <div className="flex items-center gap-1 hover:text-pink-500 transition-colors">
                        <Clock className="w-4 h-4" />
                        <span>{service.availability}</span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        className="flex-1 border-red-500 text-red-500 hover:bg-red-50 hover:scale-105 text-sm transition-all duration-300"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleServiceClick(service)
                        }}
                      >
                        Lihat Detail
                        <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                      </Button>
                      <Button
                        size="icon"
                        className="bg-red-500 hover:bg-red-600 hover:scale-110 text-white transition-all duration-300"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleAppointmentClick()
                        }}
                      >
                        <Calendar className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Doctors Section */}
        <section id="doctors" className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-gray-900 animate-in fade-in-50 slide-in-from-top-5 duration-700">
                  Tim Dokter Profesional Kami
                </h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed animate-in fade-in-50 slide-in-from-top-5 duration-700 delay-200">
                  Bertemu dengan para dokter ahli kami yang berdedikasi untuk kesehatan Anda.
                </p>
              </div>
            </div>
            <div className="mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 py-12">
              {doctors.map((doctor, index) => (
                <Card
                  key={index}
                  className="text-center border-0 shadow-lg bg-white group hover:shadow-2xl transition-all duration-500 cursor-pointer animate-in fade-in-50 slide-in-from-bottom-10"
                  style={{ animationDelay: `${index * 150}ms` }}
                  onClick={() => handleDoctorClick(doctor)}
                  data-doctor={index}
                >
                  <CardContent className="flex flex-col items-center gap-4 pt-6">
                    <div className="relative">
                      <Image
                        src={doctor.img || "/placeholder.svg"}
                        alt={`Foto ${doctor.name}`}
                        width={140}
                        height={140}
                        className="rounded-full transition-all duration-500 group-hover:scale-110 group-hover:shadow-xl"
                      />
                      <div className="absolute inset-0 rounded-full bg-pink-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                    </div>
                    <div className="space-y-1 group-hover:translate-y-[-2px] transition-transform duration-300">
                      <h3 className="text-lg font-bold text-gray-900 group-hover:text-pink-500 transition-colors">
                        {doctor.name}
                      </h3>
                      <p className="text-pink-500 group-hover:text-pink-600 transition-colors">{doctor.spec}</p>
                    </div>
                    <Button
                      variant="outline"
                      className="border-pink-500 text-pink-500 hover:bg-pink-50 hover:text-pink-600 hover:scale-105 transition-all duration-300 group-hover:shadow-md"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleDoctorClick(doctor)
                      }}
                    >
                      Lihat Profil
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* About Us Section */}
        <section id="about" className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container grid items-center gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-10">
            <div className="space-y-4 animate-in fade-in-50 slide-in-from-left-10 duration-700">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight text-gray-900">
                Tentang Cipta Hospital Indonesia
              </h2>
              <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Sejak didirikan, Cipta Hospital telah menjadi pilar kesehatan bagi masyarakat. Kami menggabungkan
                teknologi medis terkini dengan perawatan yang penuh empati untuk memastikan hasil terbaik bagi pasien.
              </p>
              <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Visi kami adalah menjadi rumah sakit rujukan terdepan yang dikenal karena keunggulan klinis dan
                pelayanan pasien yang luar biasa.
              </p>
              <Button
                className="bg-pink-500 text-white hover:bg-pink-600 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                onClick={() => scrollToSection("contact")}
              >
                Hubungi Kami
              </Button>
            </div>
            <div className="flex items-center justify-center animate-in fade-in-50 slide-in-from-right-10 duration-700 delay-300">
              <Image
                src="/service-motto.png"
                width="550"
                height="400"
                alt="Senyuman Sehat, Kehidupan Bahagia"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-contain hover:scale-105 transition-transform duration-500 cursor-pointer shadow-lg hover:shadow-xl"
                onClick={() => scrollToSection("services")}
              />
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
          <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
            <div className="space-y-3 animate-in fade-in-50 slide-in-from-top-5 duration-700">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight text-gray-900">Hubungi Kami</h2>
              <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Punya pertanyaan atau ingin membuat janji temu? Tim kami siap membantu Anda.
              </p>
            </div>
            <div className="mx-auto w-full max-w-2xl animate-in fade-in-50 slide-in-from-bottom-10 duration-700 delay-300">
              {contactSubmitted ? (
                <div className="text-center py-8 animate-in fade-in-50 zoom-in-95 duration-500">
                  <div className="text-green-500 text-4xl mb-4 animate-bounce">✓</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Pesan Terkirim!</h3>
                  <p className="text-gray-500">Terima kasih telah menghubungi kami. Tim kami akan segera merespons.</p>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    type="text"
                    placeholder="Nama Lengkap"
                    className="w-full hover:border-pink-300 focus:border-pink-500 transition-colors"
                    value={contactForm.name}
                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                    required
                  />
                  <Input
                    type="email"
                    placeholder="Email"
                    className="w-full hover:border-pink-300 focus:border-pink-500 transition-colors"
                    value={contactForm.email}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                    required
                  />
                  <Input
                    type="tel"
                    placeholder="Nomor Telepon"
                    className="w-full hover:border-pink-300 focus:border-pink-500 transition-colors"
                    value={contactForm.phone}
                    onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                    required
                  />
                  <Input
                    type="text"
                    placeholder="Subjek"
                    className="w-full hover:border-pink-300 focus:border-pink-500 transition-colors"
                    value={contactForm.subject}
                    onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                    required
                  />
                  <Textarea
                    placeholder="Pesan Anda"
                    className="md:col-span-2 hover:border-pink-300 focus:border-pink-500 transition-colors"
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    required
                  />
                  <Button
                    type="submit"
                    className="w-full md:col-span-2 bg-pink-500 text-white hover:bg-pink-600 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    Kirim Pesan
                  </Button>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 px-4 md:px-6">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="animate-in fade-in-50 slide-in-from-bottom-5 duration-700">
            <h3 className="text-lg font-bold mb-2">Cipta Hospital</h3>
            <p className="text-sm text-gray-400 hover:text-gray-300 transition-colors cursor-pointer">
              Jl. Kesehatan Raya No. 123, Jakarta, Indonesia
            </p>
            <p className="text-sm text-gray-400 hover:text-gray-300 transition-colors cursor-pointer">
              Telepon: (021) 123-4567
            </p>
            <p className="text-sm text-gray-400 hover:text-gray-300 transition-colors cursor-pointer">
              Email: info@ciptahospital.co.id
            </p>
          </div>
          <div className="animate-in fade-in-50 slide-in-from-bottom-5 duration-700 delay-200">
            <h3 className="text-lg font-bold mb-2">Tautan Cepat</h3>
            <ul className="space-y-1">
              <li>
                <button
                  onClick={() => scrollToSection("home")}
                  className="text-sm text-gray-400 hover:text-white hover:translate-x-1 transition-all duration-300"
                >
                  Beranda
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("services")}
                  className="text-sm text-gray-400 hover:text-white hover:translate-x-1 transition-all duration-300"
                >
                  Layanan
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("doctors")}
                  className="text-sm text-gray-400 hover:text-white hover:translate-x-1 transition-all duration-300"
                >
                  Dokter
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("contact")}
                  className="text-sm text-gray-400 hover:text-white hover:translate-x-1 transition-all duration-300"
                >
                  Kontak
                </button>
              </li>
            </ul>
          </div>
          <div className="animate-in fade-in-50 slide-in-from-bottom-5 duration-700 delay-400">
            <h3 className="text-lg font-bold mb-2">Gawat Darurat 24 Jam</h3>
            <p className="text-lg font-semibold text-pink-400 hover:text-pink-300 transition-colors cursor-pointer hover:scale-105 transform duration-300">
              Hubungi: 1500-XXX
            </p>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm text-gray-500 animate-in fade-in-50 slide-in-from-bottom-5 duration-700 delay-600">
          <p>&copy; {new Date().getFullYear()} PT Cipta Hospital Indonesia. Semua Hak Cipta Dilindungi.</p>
        </div>
      </footer>

      {/* Floating Action Button with Emergency at Bottom */}
      <FloatingActionButton onAppointmentClick={handleAppointmentClick} showEmergencyPrimary={true} />

      {/* Modals */}
      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} defaultTab={authModalTab} />
      <AppointmentModal isOpen={appointmentModalOpen} onClose={() => setAppointmentModalOpen(false)} />
      <ServiceDetailModal
        isOpen={serviceModalOpen}
        onClose={() => setServiceModalOpen(false)}
        service={selectedService}
        onBookAppointment={handleAppointmentClick}
      />
      <DoctorDetailModal
        isOpen={doctorModalOpen}
        onClose={() => setDoctorModalOpen(false)}
        doctor={selectedDoctor}
        onBookAppointment={handleAppointmentClick}
      />
    </div>
  )
}
