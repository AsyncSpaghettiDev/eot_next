/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
interface AuthenticateContext {
  user: User
  authenticated: boolean
  login: (username: string, password: string) => Promise<void>
  logout: (redirect?: boolean) => Promise<void>
}

interface SettingsContext {
  isLoading: boolean
  readScreen: boolean
  updateReadScreen: (value: boolean) => void
  updateIsLoading: (value: boolean) => void
  // react set state
  ShowLoader: Dispatch<SetStateAction<boolean>>
}

type Token = {
  authenticated: boolean
  role: string
  isStaff: boolean
  tableId: number | null
  expires: string
  cookie: string
}

type OnChangeFormEvent =
  ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>

interface User {
  id?: number
  username: string
  role: Role
}

interface Role {
  id?: number
  sortId: number
  name: string
  description: string
  isStaff: boolean
}

interface Plate {
  id: number
  name: string
  price: number
  description: string
  image: string
  quantity: number
  categoryId: number
  isVeg: boolean
  category: Category
}

interface ServerPlates {
  category: string
  plates: Plate[]
}

interface Category {
  id?: number
  name: string
  description: string
  sortId?: number
}

interface Table {
  id: number
  name: string
  capacity: number
  sortId: number
  activities: Activity[]
}

interface Activity {
  id: number
  people: number
  tableId: number
  statusId: number

  elapsed?: ElapsedTime
  start: Date
  updatedAt: Date
  end: Date

  orders: Order[]

  table: Table
  status: Status
}

interface Status {
  id: number
  name: string
  description: string
  sortId: number
}

interface ElapsedTime {
  hours: number
  minutes: number
  seconds: number
}

interface Order {
  id: number
  quantity: number
  subtotal: number
  activityId: number
  activity: Activity
  plateId: number
  plate: Plate
  notes: Note[]
  comments: string
  statusId: number
  status: Status
  createdAt: Date
  updatedAt: Date
}

interface ServerOrders {
  ordered: Order[],
  cooking: Order[],
  ready: Order[],
  served: Order[],
  cancel_request: Order[],
  cancel: Order[]
}

interface Note {
  id: number
  name: string
  description: string
}

interface Employee {
  id: number
  username: string
  password: string
  name: string
  lastname: string
  phone: string
  role: Role
  roleId: number
}
