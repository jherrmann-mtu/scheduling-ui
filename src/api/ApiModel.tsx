export interface Appointment {
    id: string
    host: string
    guests: string[]
    name: string
    description: string
    location: string
    start: number
    end: number
    isPublic: boolean
}

export interface AppointmentRequest {
    name?: string
    description?: string
    location?: string
    start?: number
    end?: number
    isPublic?: boolean
    guests?: string[]
}

export interface Error {
    status: number
    message: string
}

export interface AuthRequest {
    username: string
    password: string
}

export interface AuthResponse {
    token: string
}