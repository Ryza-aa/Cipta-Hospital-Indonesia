"use client"

import type React from "react"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAuth } from "@/contexts/AuthContext"
import { Loader2, Calendar, Clock } from "lucide-react"

interface AppointmentModalProps {
  isOpen: boolean
  onClose: () => void
}

interface Doctor {
  id: string
  name: string
  specialty: string
}

// Mock doctors data
const mockDoctors: Doctor[] = [
  { id: "1", name: "Dr. Anisa Putri, Sp.A", specialty: "Spesialis Anak" },
  { id: "2", name: "Dr. Budi Santoso, Sp.PD", specialty: "Spesialis Penyakit Dalam" },
  { id: "3", name: "Dr. Citra Dewi, Sp.OG", specialty: "Spesialis Kandungan" },
  { id: "4", name: "Dr. Doni Wijaya, Sp.JP", specialty: "Spesialis Jantung" },
]

export function AppointmentModal({ isOpen, onClose }: AppointmentModalProps) {
  const [loading, setLoading] = useState(false)
  const [doctors] = useState<Doctor[]>(mockDoctors)
  const [selectedDoctor, setSelectedDoctor] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const { user } = useAuth()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!user) return

    setLoading(true)
    setError("")

    const formData = new FormData(e.currentTarget)
    const doctorData = doctors.find((d) => d.id === selectedDoctor)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const appointmentData = {
      user_id: user.id,
      doctor_name: doctorData?.name || "",
      specialty: doctorData?.specialty || "",
      appointment_date: formData.get("date") as string,
      appointment_time: formData.get("time") as string,
      notes: formData.get("notes") as string,
    }

    // Store appointment in localStorage for demo
    const existingAppointments = JSON.parse(localStorage.getItem("cipta-hospital-appointments") || "[]")
    const newAppointment = {
      id: Date.now().toString(),
      ...appointmentData,
      status: "pending",
      created_at: new Date().toISOString(),
    }
    existingAppointments.push(newAppointment)
    localStorage.setItem("cipta-hospital-appointments", JSON.stringify(existingAppointments))

    setSuccess(true)
    setTimeout(() => {
      setSuccess(false)
      onClose()
      // Reset form
      setSelectedDoctor("")
    }, 2000)

    setLoading(false)
  }

  if (!user) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Login Diperlukan</DialogTitle>
          </DialogHeader>
          <p className="text-center py-4">Silakan login terlebih dahulu untuk membuat janji temu.</p>
          <Button onClick={onClose} className="w-full">
            Tutup
          </Button>
        </DialogContent>
      </Dialog>
    )
  }

  if (success) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Berhasil!</DialogTitle>
          </DialogHeader>
          <div className="text-center py-4">
            <div className="text-green-500 text-4xl mb-2">✓</div>
            <p>Janji temu Anda berhasil dibuat!</p>
            <p className="text-sm text-gray-500 mt-2">Kami akan menghubungi Anda untuk konfirmasi.</p>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Buat Janji Temu</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="doctor">Pilih Dokter</Label>
            <Select value={selectedDoctor} onValueChange={setSelectedDoctor} required>
              <SelectTrigger>
                <SelectValue placeholder="Pilih dokter..." />
              </SelectTrigger>
              <SelectContent>
                {doctors.map((doctor) => (
                  <SelectItem key={doctor.id} value={doctor.id}>
                    {doctor.name} - {doctor.specialty}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Tanggal</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="date"
                  name="date"
                  type="date"
                  className="pl-10"
                  min={new Date().toISOString().split("T")[0]}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="time">Waktu</Label>
              <div className="relative">
                <Clock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input id="time" name="time" type="time" className="pl-10" required />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Catatan (Opsional)</Label>
            <Textarea id="notes" name="notes" placeholder="Jelaskan keluhan atau informasi tambahan..." rows={3} />
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <Button type="submit" className="w-full bg-pink-500 hover:bg-pink-600" disabled={loading}>
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Buat Janji Temu
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
