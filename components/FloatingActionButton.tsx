"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, MessageCircle, MapPin, Plus, X, Ambulance, Phone } from "lucide-react"

interface FloatingActionButtonProps {
  onAppointmentClick: () => void
  showEmergencyPrimary?: boolean
}

export function FloatingActionButton({ onAppointmentClick, showEmergencyPrimary = false }: FloatingActionButtonProps) {
  const [isOpen, setIsOpen] = useState(false)

  const actions = [
    {
      icon: <Calendar className="h-5 w-5" />,
      label: "Buat Janji",
      color: "bg-pink-500 hover:bg-pink-600",
      action: () => {
        onAppointmentClick()
        setIsOpen(false)
      },
    },
    {
      icon: <MessageCircle className="h-5 w-5" />,
      label: "Chat",
      color: "bg-green-500 hover:bg-green-600",
      action: () => {
        window.open("https://wa.me/6281234567890", "_blank")
        setIsOpen(false)
      },
    },
    {
      icon: <MapPin className="h-5 w-5" />,
      label: "Lokasi",
      color: "bg-blue-500 hover:bg-blue-600",
      action: () => {
        window.open("https://maps.google.com/?q=Cipta+Hospital+Jakarta", "_blank")
        setIsOpen(false)
      },
    },
    {
      icon: <Phone className="h-5 w-5" />,
      label: "Telepon",
      color: "bg-orange-500 hover:bg-orange-600",
      action: () => {
        window.open("tel:+622115000000", "_self")
        setIsOpen(false)
      },
    },
  ]

  const handleMainAction = () => {
    setIsOpen(!isOpen)
  }

  const handleEmergencyCall = () => {
    window.open("tel:1500119", "_self")
  }

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50">
      {/* Emergency Button - Always visible when showEmergencyPrimary is true */}
      {showEmergencyPrimary && (
        <div className="mb-3 sm:mb-4">
          <Button
            className="h-14 w-14 sm:h-16 sm:w-16 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 bg-gradient-to-r from-red-500 via-red-600 to-pink-600 hover:from-red-600 hover:via-red-700 hover:to-pink-700 shadow-red-500/50 relative group animate-pulse hover:animate-none border-2 border-white"
            onClick={handleEmergencyCall}
          >
            <Ambulance className="h-6 w-6 sm:h-7 sm:w-7 text-white drop-shadow-lg" />

            {/* Tooltip */}
            <div className="absolute -top-12 sm:-top-14 left-1/2 transform -translate-x-1/2 bg-red-600 text-white text-xs sm:text-sm px-3 py-2 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none shadow-lg">
              <div className="font-semibold">Darurat 24 Jam</div>
              <div className="text-xs opacity-90">Tekan untuk panggil</div>
              {/* Arrow */}
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-red-600"></div>
            </div>

            {/* Pulsing ring effect */}
            <div className="absolute inset-0 rounded-full bg-red-500 animate-ping opacity-20"></div>
            <div
              className="absolute inset-0 rounded-full bg-red-500 animate-ping opacity-10"
              style={{ animationDelay: "0.5s" }}
            ></div>
          </Button>
        </div>
      )}

      {/* Action Menu */}
      {isOpen && (
        <div className="absolute bottom-16 sm:bottom-20 right-0 space-y-3 animate-in slide-in-from-bottom-5 duration-300">
          {actions.map((action, index) => (
            <div
              key={index}
              className="flex items-center gap-3 animate-in slide-in-from-right-5 duration-300"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Label Card */}
              <Card className="shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <CardContent className="p-3">
                  <span className="text-sm font-medium text-gray-700 whitespace-nowrap">{action.label}</span>
                </CardContent>
              </Card>

              {/* Action Button */}
              <Button
                size="icon"
                className={`h-12 w-12 sm:h-14 sm:w-14 ${action.color} text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 border-2 border-white`}
                onClick={action.action}
              >
                {action.icon}
              </Button>
            </div>
          ))}
        </div>
      )}

      {/* Main FAB with Plus Icon */}
      <Button
        size="icon"
        className={`h-14 w-14 sm:h-16 sm:w-16 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-white ${
          isOpen
            ? "bg-gray-600 hover:bg-gray-700 rotate-45"
            : "bg-gradient-to-r from-pink-500 via-pink-600 to-red-500 hover:from-pink-600 hover:via-pink-700 hover:to-red-600 shadow-pink-500/50"
        }`}
        onClick={handleMainAction}
      >
        {isOpen ? (
          <X className="h-6 w-6 sm:h-7 sm:w-7 text-white drop-shadow-lg" />
        ) : (
          <Plus className="h-6 w-6 sm:h-7 sm:w-7 text-white drop-shadow-lg animate-pulse" />
        )}

        {/* Tooltip for main button */}
        {!isOpen && (
          <div className="absolute -top-12 sm:-top-14 left-1/2 transform -translate-x-1/2 bg-pink-600 text-white text-xs sm:text-sm px-3 py-2 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none shadow-lg group">
            <div className="font-semibold">Menu Cepat</div>
            <div className="text-xs opacity-90">Tekan untuk opsi</div>
            {/* Arrow */}
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-pink-600"></div>
          </div>
        )}

        {/* Subtle pulsing ring for main button */}
        {!isOpen && (
          <>
            <div className="absolute inset-0 rounded-full bg-pink-500 animate-ping opacity-10"></div>
            <div
              className="absolute inset-0 rounded-full bg-pink-500 animate-ping opacity-5"
              style={{ animationDelay: "1s" }}
            ></div>
          </>
        )}
      </Button>
    </div>
  )
}
