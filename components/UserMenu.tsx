"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useAuth } from "@/contexts/AuthContext"
import { User, Calendar, Settings, LogOut } from "lucide-react"

export function UserMenu() {
  const { user, signOut } = useAuth()
  const [loading, setLoading] = useState(false)
  const [showAppointments, setShowAppointments] = useState(false)
  const [appointments, setAppointments] = useState<any[]>([])

  const handleSignOut = async () => {
    setLoading(true)
    await signOut()
    setLoading(false)
  }

  const handleViewAppointments = () => {
    const storedAppointments = JSON.parse(localStorage.getItem("cipta-hospital-appointments") || "[]")
    const userAppointments = storedAppointments.filter((apt: any) => apt.user_id === user?.id)
    setAppointments(userAppointments)
    setShowAppointments(true)
  }

  if (!user) return null

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="border-pink-500 text-pink-500 hover:bg-pink-50">
            <User className="w-4 h-4 mr-2" />
            {user.full_name || user.email?.split("@")[0]}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuItem>
            <User className="mr-2 h-4 w-4" />
            <span>Profil Saya</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleViewAppointments}>
            <Calendar className="mr-2 h-4 w-4" />
            <span>Janji Temu Saya</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Settings className="mr-2 h-4 w-4" />
            <span>Pengaturan</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleSignOut} disabled={loading}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Keluar</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={showAppointments} onOpenChange={setShowAppointments}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Janji Temu Saya</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {appointments.length === 0 ? (
              <p className="text-center text-gray-500 py-8">Belum ada janji temu</p>
            ) : (
              appointments.map((appointment) => (
                <div key={appointment.id} className="border rounded-lg p-4 space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">{appointment.doctor_name}</h3>
                      <p className="text-sm text-gray-600">{appointment.specialty}</p>
                    </div>
                    <span
                      className={`px-2 py-1 rounded text-xs ${
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
                  <div className="text-sm text-gray-600">
                    <p>📅 {new Date(appointment.appointment_date).toLocaleDateString("id-ID")}</p>
                    <p>🕐 {appointment.appointment_time}</p>
                    {appointment.notes && <p>📝 {appointment.notes}</p>}
                  </div>
                </div>
              ))
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
