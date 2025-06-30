"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, MessageCircle, MapPin, Plus, X, Ambulance } from "lucide-react"

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
  ]

  const handleMainAction = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50">
      {/* Emergency Button - Always at bottom */}
      {showEmergencyPrimary && (
        <div className="mb-3 sm:mb-4">
          <Button
            className="h-12 w-12 sm:h-16 sm:w-16 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-r from-red-400 via-red-500 to-pink-500 hover:from-red-500 hover:via-red-600 hover:to-pink-600 shadow-red-400/50 relative group"
            onClick={() => window.open("tel:1500-XXX", "_self")}
          >
            <Ambulance className="h-4 w-4 sm:h-6 sm:w-6 text-white drop-shadow-lg animate-pulse" />
            <span className="absolute -top-8 sm:-top-12 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs px-2 py-1 sm:px-3 sm:py-1 rounded-full whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
              Darurat 24 Jam
            </span>
          </Button>
        </div>
      )}

      {/* Action Menu */}
      {isOpen && (
        <div className="absolute bottom-14 sm:bottom-16 right-0 space-y-2 sm:space-y-3 animate-in slide-in-from-bottom-5 duration-300">
          {actions.map((action, index) => (
            <div
              key={index}
              className="flex items-center gap-3 animate-in slide-in-from-right-5 duration-300"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <Card className="shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-2">
                  <span className="text-sm font-medium text-gray-700 whitespace-nowrap">{action.label}</span>
                </CardContent>
              </Card>
              <Button
                size="icon"
                className={`${action.color} text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110`}
                onClick={action.action}
              >
                {action.icon}
              </Button>
            </div>
          ))}
        </div>
      )}

      {/* Main FAB */}
      <Button
        size="icon"
        className={`h-12 w-12 sm:h-14 sm:w-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 ${
          isOpen
            ? "bg-gray-500 hover:bg-gray-600 rotate-45"
            : "bg-gradient-to-r from-pink-400 via-pink-500 to-red-400 hover:from-pink-500 hover:via-pink-600 hover:to-red-500 shadow-pink-400/50"
        }`}
        onClick={handleMainAction}
      >
        {isOpen ? (
          <X className="h-5 w-5 sm:h-6 sm:w-6 text-white drop-shadow-lg" />
        ) : (
          <Plus className="h-5 w-5 sm:h-6 sm:w-6 text-white drop-shadow-lg animate-pulse" />
        )}
      </Button>
    </div>
  )
}
