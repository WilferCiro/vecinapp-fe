"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Megaphone, CalendarCheck, MessageSquare, Wrench, CreditCard, AlertCircle } from "lucide-react"

export default function DashboardPage() {
  const [userRole, setUserRole] = useState<string | null>('admin')

  const adminStats = [
    {
      title: "Visitantes Activos",
      value: 5,
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Comunicados Publicados",
      value: 3,
      icon: Megaphone,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Reservas Pendientes",
      value: 2,
      icon: CalendarCheck,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      title: "PQRS Activos",
      value: 2,
      icon: MessageSquare,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
    {
      title: "Mantenimientos Programados",
      value: 2,
      icon: Wrench,
      color: "text-red-600",
      bgColor: "bg-red-50",
    },
    {
      title: "Items en Inventario",
      value: 3,
      icon: CreditCard,
      color: "text-indigo-600",
      bgColor: "bg-indigo-50",
    },
  ]

  const residentStats = [
    {
      title: "Mis Visitantes",
      value: 5,
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Comunicados Nuevos",
      value: 3,
      icon: Megaphone,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Mis Reservas",
      value: 2,
      icon: CalendarCheck,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      title: "Pagos Pendientes",
      value: 3,
      icon: CreditCard,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
  ]

  const stats = userRole === "admin" ? adminStats : residentStats

  const recentAnnouncements = [
    {
      id: "1",
      title: "Reunión de Vecinos",
      content: "Se convoca reunión general para el próximo viernes a las 7:00 PM.",
      priority: "high",
      createdAt: new Date("2023-10-15"),
    },
    {
      id: "2",
      title: "Cierre de Área Común",
      content: "El área comunal estará cerrada por mantenimiento del 15 al 20 de octubre.",
      priority: "medium",
      createdAt: new Date("2023-10-14"),
    },
    {
      id: "3",
      title: "Nueva Regla de Aparcamiento",
      content: "Se implementa nueva regla para el uso del área de aparcamiento.",
      priority: "medium",
      createdAt: new Date("2023-10-13"),
    },
  ]

  const pendingPQRS = [
    {
      id: "1",
      title: "Problema con el ascensor",
      description: "El ascensor no funciona correctamente en el segundo piso.",
      status: "pending",
    },
    {
      id: "2",
      title: "Mantenimiento del área verde",
      description: "Se necesita realizar mantenimiento en la zona verde del conjunto.",
      status: "in-progress",
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold ">Dashboard</h1>
        <p className="mt-1">
          Resumen general del sistema {userRole === "admin" ? "de administración" : "de tu apartamento"}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium">{stat.title}</p>
                    <p className="text-3xl font-bold mt-2">{stat.value}</p>
                  </div>
                  <div className={`w-12 h-12 rounded-lg ${stat.bgColor} flex items-center justify-center`}>
                    <Icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Comunicados Recientes</CardTitle>
            <CardDescription>Últimas publicaciones y noticias del conjunto</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentAnnouncements.map((announcement) => (
              <div key={announcement.id} className="flex items-start gap-3 p-3 rounded-lg bg-muted">
                <div className="w-2 h-2 rounded-full bg-blue-600 mt-2" />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold text-sm">{announcement.title}</h4>
                    <Badge variant={announcement.priority === "high" ? "destructive" : "secondary"} className="text-xs">
                      {announcement.priority === "high" ? "Alta" : "Media"}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2">{announcement.content}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {new Date(announcement.createdAt).toLocaleDateString("es-ES")}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {userRole === "admin" && (
          <Card>
            <CardHeader>
              <CardTitle>PQRS Pendientes</CardTitle>
              <CardDescription>Solicitudes que requieren atención</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {pendingPQRS.length > 0 ? (
                pendingPQRS.map((pqrs) => (
                  <div key={pqrs.id} className="flex items-start gap-3 p-3 rounded-lg bg-muted">
                    <AlertCircle className="w-5 h-5 text-orange-600 mt-1" />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold text-sm">{pqrs.subject}</h4>
                        <Badge variant="outline" className="text-xs capitalize">
                          {pqrs.type}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {pqrs.apartment} - {pqrs.userName}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {new Date(pqrs.createdAt).toLocaleDateString("es-ES")}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground text-center py-4">No hay PQRS pendientes</p>
              )}
            </CardContent>
          </Card>
        )}

        {userRole === "resident" && (
          <Card>
            <CardHeader>
              <CardTitle>Mis Pagos</CardTitle>
              <CardDescription>Estado de tus cuotas de administración</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {mockPayments
                .filter((p) => p.apartment === "Apto 301")
                .slice(0, 3)
                .map((payment) => (
                  <div key={payment.id} className="flex items-start gap-3 p-3 rounded-lg bg-muted">
                    <CreditCard className="w-5 h-5 text-blue-600 mt-1" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-semibold text-sm">{payment.concept}</h4>
                        <Badge variant={payment.status === "paid" ? "default" : "destructive"} className="text-xs">
                          {payment.status === "paid" ? "Pagado" : "Pendiente"}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">${payment.amount.toLocaleString("es-CO")}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Vence: {new Date(payment.dueDate).toLocaleDateString("es-ES")}
                      </p>
                    </div>
                  </div>
                ))}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
