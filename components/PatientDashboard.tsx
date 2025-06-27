"use client"
import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/AuthContext"
import { Calendar, Clock, User, FileText, Bell, Plus, ChevronRight, Stethoscope, Ambulance, LogOut } from "lucide-react"

interface Appointment {
  id: string
  doctor_name: string
  specialty: string
  appointment_date: string
  appointment_time: string
  status: string
  notes?: string
}

interface PatientDashboardProps {
  activeTab?: string
  onTabChange?: (tab: string) => void
  onAppointmentClick?: () => void
}

export function PatientDashboard({ activeTab = "dashboard", onTabChange, onAppointmentClick }: PatientDashboardProps) {
  const { user, signOut } = useAuth()
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [upcomingAppointment, setUpcomingAppointment] = useState<Appointment | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // Load appointments from localStorage
    const storedAppointments = JSON.parse(localStorage.getItem("cipta-hospital-appointments") || "[]")
    const userAppointments = storedAppointments.filter((apt: Appointment) => apt.user_id === user?.id)
    setAppointments(userAppointments)

    // Find next upcoming appointment
    const upcoming = userAppointments
      .filter((apt: Appointment) => new Date(apt.appointment_date) >= new Date())
      .sort(
        (a: Appointment, b: Appointment) =>
          new Date(a.appointment_date).getTime() - new Date(b.appointment_date).getTime(),
      )[0]

    setUpcomingAppointment(upcoming || null)
  }, [user])

  const handleLogout = async () => {
    setLoading(true)
    await signOut()
    setLoading(false)
  }

  const handleTabClick = (tab: string) => {
    if (onTabChange) {
      onTabChange(tab)
    }
  }

  const handleAppointmentButtonClick = () => {
    if (onAppointmentClick) {
      onAppointmentClick()
    }
  }

  // Render different content based on active tab
  const renderContent = () => {
    switch (activeTab) {
      case "appointments":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Janji Temu Saya</h2>
              <Button className="bg-pink-500 hover:bg-pink-600 text-white" onClick={handleAppointmentButtonClick}>
                <Plus className="h-4 w-4 mr-2" />
                Buat Janji Baru
              </Button>
            </div>

            {appointments.length === 0 ? (
              <Card>
                <CardContent className="text-center py-16">
                  <div className="bg-gray-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                    <Calendar className="h-10 w-10 text-gray-400" />
                  </div>
                  <p className="text-gray-500 text-lg mb-6">Belum ada janji temu</p>
                  <Button
                    className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-2"
                    onClick={handleAppointmentButtonClick}
                  >
                    Buat Janji Temu Pertama
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4">
                {appointments.map((appointment) => (
                  <Card key={appointment.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="bg-pink-100 p-3 rounded-full">
                            <Stethoscope className="h-6 w-6 text-pink-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-lg text-gray-900">{appointment.doctor_name}</h3>
                            <p className="text-pink-600">{appointment.specialty}</p>
                            <div className="flex items-center gap-4 text-sm text-gray-600 mt-2">
                              <div className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                {new Date(appointment.appointment_date).toLocaleDateString("id-ID")}
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                {appointment.appointment_time}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <span
                            className={`px-3 py-1 rounded-full text-sm ${
                              appointment.status === "pending"
                                ? "bg-yellow-100 text-yellow-800"
                                : appointment.status === "confirmed"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-red-100 text-red-800"
                            }`}
                          >
                            {appointment.status === "pending"
                              ? "Menunggu"
                              : appointment.status === "confirmed"
                                ? "Dikonfirmasi"
                                : "Dibatalkan"}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )

      case "medical-records":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Rekam Medis</h2>
            <Card>
              <CardContent className="text-center py-16">
                <div className="bg-gray-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                  <FileText className="h-10 w-10 text-gray-400" />
                </div>
                <p className="text-gray-500 text-lg mb-4">Rekam medis Anda akan muncul di sini</p>
                <p className="text-gray-400 text-sm">
                  Setelah konsultasi dengan dokter, rekam medis akan tersedia untuk diunduh
                </p>
              </CardContent>
            </Card>
          </div>
        )

      case "profile":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Profil Saya</h2>
            <Card>
              <CardContent className="p-6">
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="bg-pink-100 p-4 rounded-full">
                      <User className="h-8 w-8 text-pink-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">{user?.full_name || "Demo User"}</h3>
                      <p className="text-gray-600">{user?.email}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Nama Lengkap</label>
                      <input
                        type="text"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                        value={user?.full_name || "Demo User"}
                        readOnly
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                      <input
                        type="email"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                        value={user?.email || ""}
                        readOnly
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Nomor Telepon</label>
                      <input
                        type="tel"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                        placeholder="Belum diisi"
                        readOnly
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Tanggal Lahir</label>
                      <input
                        type="date"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                        readOnly
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Alamat</label>
                    <textarea
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                      rows={3}
                      placeholder="Belum diisi"
                      readOnly
                    />
                  </div>

                  <div className="flex gap-3">
                    <Button className="bg-pink-500 hover:bg-pink-600 text-white">Edit Profil</Button>
                    <Button variant="outline">Ubah Password</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )

      default: // dashboard
        return (
          <>
            {/* Stats Cards Row */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Total Janji Temu</p>
                      <p className="text-3xl font-bold text-gray-900">{appointments.length}</p>
                    </div>
                    <div className="bg-blue-100 p-3 rounded-full">
                      <Calendar className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Janji Mendatang</p>
                      <p className="text-3xl font-bold text-gray-900">
                        {appointments.filter((apt) => new Date(apt.appointment_date) >= new Date()).length}
                      </p>
                    </div>
                    <div className="bg-green-100 p-3 rounded-full">
                      <Clock className="h-6 w-6 text-green-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Dokter Favorit</p>
                      <p className="text-3xl font-bold text-gray-900">3</p>
                    </div>
                    <div className="bg-pink-100 p-3 rounded-full">
                      <Stethoscope className="h-6 w-6 text-pink-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Notifikasi</p>
                      <p className="text-3xl font-bold text-gray-900">2</p>
                    </div>
                    <div className="bg-orange-100 p-3 rounded-full">
                      <Bell className="h-6 w-6 text-orange-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Content Area - Two Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column - Riwayat Janji Temu */}
              <div className="lg:col-span-2">
                <Card className="bg-white shadow-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span className="text-xl font-semibold text-gray-900">Riwayat Janji Temu</span>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-gray-600 hover:text-pink-600"
                        onClick={() => handleTabClick("appointments")}
                      >
                        Lihat Semua
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {appointments.length === 0 ? (
                      <div className="text-center py-16">
                        <div className="bg-gray-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                          <Calendar className="h-10 w-10 text-gray-400" />
                        </div>
                        <p className="text-gray-500 text-lg mb-6">Belum ada janji temu</p>
                        <Button
                          className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-2"
                          onClick={handleAppointmentButtonClick}
                        >
                          Buat Janji Temu
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {appointments.slice(0, 3).map((appointment) => (
                          <div
                            key={appointment.id}
                            className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                            onClick={() => handleTabClick("appointments")}
                          >
                            <div className="flex items-center gap-4">
                              <div className="bg-pink-100 p-2 rounded-full">
                                <User className="h-5 w-5 text-pink-600" />
                              </div>
                              <div>
                                <h4 className="font-medium text-gray-900">{appointment.doctor_name}</h4>
                                <p className="text-sm text-gray-600">{appointment.specialty}</p>
                                <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                                  <span>{new Date(appointment.appointment_date).toLocaleDateString("id-ID")}</span>
                                  <span>•</span>
                                  <span>{appointment.appointment_time}</span>
                                </div>
                              </div>
                            </div>
                            <ChevronRight className="h-4 w-4 text-gray-400" />
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Right Column - Aksi Cepat */}
              <div>
                <Card className="bg-white shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-xl font-semibold text-gray-900">Aksi Cepat</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button
                      className="w-full justify-start bg-pink-500 hover:bg-pink-600 text-white h-12"
                      onClick={handleAppointmentButtonClick}
                    >
                      <Plus className="h-5 w-5 mr-3" />
                      Buat Janji Temu Baru
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start h-12 hover:bg-gray-50"
                      onClick={() => handleTabClick("medical-records")}
                    >
                      <FileText className="h-5 w-5 mr-3 text-gray-600" />
                      Lihat Rekam Medis
                    </Button>
                    <Button variant="outline" className="w-full justify-start h-12 hover:bg-gray-50">
                      <Bell className="h-5 w-5 mr-3 text-gray-600" />
                      Pengingat Obat
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start h-12 hover:bg-red-50 text-red-600 border-red-200 hover:border-red-300"
                      onClick={handleLogout}
                      disabled={loading}
                    >
                      <LogOut className="h-5 w-5 mr-3" />
                      {loading ? "Keluar..." : "Keluar"}
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </>
        )
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with gradient background matching the screenshot */}
      <div className="bg-gradient-to-r from-pink-400 via-pink-500 to-red-400 text-white py-8">
        <div className="container mx-auto px-4">
          {/* Header content can be minimal since the main header is handled in page.tsx */}
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">{renderContent()}</div>

      {/* Floating Emergency Button - Top Right */}
      <div className="fixed top-24 right-6 z-50">
        <Button
          className="bg-gradient-to-r from-red-400 to-orange-400 hover:from-red-500 hover:to-orange-500 text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-full px-4 py-2"
          onClick={() => window.open("tel:1500-XXX", "_self")}
        >
          <Ambulance className="h-4 w-4 mr-2" />
          Darurat
        </Button>
      </div>

      {/* Floating Action Button - Bottom Right */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          size="icon"
          className="h-14 w-14 rounded-full bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
          onClick={handleAppointmentButtonClick}
        >
          <Plus className="h-6 w-6" />
        </Button>
      </div>
    </div>
  )
}
