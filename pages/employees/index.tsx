import { CreateEmployeeForm, Layout, ProtectedContent, UpdateEmployeeForm } from 'components'
import { Button, Flex, Table, Title } from 'components/shared'
import { GetServerSidePropsContext } from 'next'
import { useEffect, useState } from 'react'
import { getEmployees, getEmployeesRoles } from 'services'
import { authorize, redirectHome, redirectLogin } from 'utils'

interface modals {
  createEmployee: boolean
  editEmployee: boolean
}

export default function EmployeesPage () {
  const [employees, setEmployees] = useState<Employee[]>([])
  const [editEmployee, setEditEmployee] = useState<Employee>(null!)
  const [roles, setRoles] = useState<Role[]>([])
  const [showForm, setShowForm] = useState<modals>({
    createEmployee: false,
    editEmployee: false
  })

  useEffect(() => {
    getEmployees().then(setEmployees)
    getEmployeesRoles().then(setRoles)
  }, [])

  const createEmployeeHandler = () => setShowForm({ ...showForm, createEmployee: true })

  return (
    <Layout title='Empleados' showUser>
      <Title align='center' mt={2} weight='bold' size='2xl'> Lista de empleados </Title>
      <ProtectedContent adminOnly>
        <Flex my={3} justify='center' align='center'>
          <Button variant='outline' onClick={createEmployeeHandler}>Añadir empleado</Button>
        </Flex>
      </ProtectedContent>
      <Table headers={[
        'No. Empleado',
        'Nombre',
        'Apellido',
        'Teléfono',
        'Rol'
      ]}
        style={{
          maxWidth: '800px',
          textAlign: 'center',
          width: '100%'
        }}
      >
        {
          employees?.map(employee => (
            <EmployeeDetail key={employee.id} employee={employee} onClick={
              (emp) => {
                setEditEmployee(emp)
                setShowForm({ ...showForm, editEmployee: true })
              }
            } />
          ))
        }
      </Table>
      {
        showForm.createEmployee && (
          <CreateEmployeeForm
            roles={roles}
            onClose={() => setShowForm({ ...showForm, createEmployee: false })}
            onSuccess={() => {
              getEmployees().then(setEmployees)
              setShowForm({ ...showForm, createEmployee: false })
            }}
          />
        )
      }
      {
        showForm.editEmployee && (
          <UpdateEmployeeForm
            employee={editEmployee}
            roles={roles}
            onClose={() => setShowForm({ ...showForm, editEmployee: false })}
            onSuccess={() => {
              getEmployees().then(setEmployees)
              setShowForm({ ...showForm, editEmployee: false })
            }}
          />
        )
      }
    </Layout>
  )
}

interface EmployeeDetailProps {
  employee: Employee
  onClick: (employee: Employee) => void
}

const EmployeeDetail = ({ employee, employee: { id, name, lastname, phone, role: { name: role } }, onClick }: EmployeeDetailProps) => {
  return (
    <tr onClick={() => onClick(employee)}>
      <td>{id}</td>
      <td>{name}</td>
      <td>{lastname}</td>
      <td>{
        (phone ?? 'No contact info') || 'No contact info'
      }</td>
      <td>{role}</td>
    </tr >
  )
}

export async function getServerSideProps (ctx: GetServerSidePropsContext) {
  try {
    const { isStaff, role } = authorize(ctx, '/tables')
    if (!isStaff || role !== 'admin') return redirectHome

    ctx.res?.setHeader('set-cookie', 'origin=; max-age=-1;')

    return {
      props: {}
    }
  } catch (error) {
    return redirectLogin
  }
}
