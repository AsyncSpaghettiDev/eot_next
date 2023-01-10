import { Modal } from 'components/modal'
import { Button, Flex } from 'components/shared'
import { useForm } from 'hooks'
import { useRef } from 'react'
import { createEmployee, deleteEmployee, updateEmployee } from 'services'
import { Input, Radio } from '../inputs'

interface CreateEmployeeFormProps {
  onClose: () => void
  onSuccess: (newEmployee: Employee) => void
  roles: Role[]
}

export const CreateEmployeeForm = ({ roles, onSuccess, onClose }: CreateEmployeeFormProps) => {
  const modalRef = useRef<any>(null!)
  const dismissHandler = () => modalRef.current.dismiss(onClose)
  const sucessHandler = (newEmployee: any) => modalRef.current.dismiss().then(() => onSuccess(newEmployee))

  const { getInputProps, handleSubmit } = useForm({
    initialValues: {
      name: '',
      lastname: '',
      phone: '',
      username: '',
      password: '',
      roleId: ''
    },
    validate: (values: any) => {
      const errors: { [key: string]: string } = {}
      if (!values.name) errors.name = 'El nombre es requerido'
      if (!values.lastname) errors.lastname = 'El apellido es requerido'
      // validate phone regex
      if (values.phone && !/^\d{10}$/.test(values.phone)) errors.phone = 'El telefono debe tener 10 digitos sin espacios'
      if (!values.username) errors.username = 'El nombre de usuario es requerido'
      if (!values.password) errors.password = 'La contraseña es requerida'
      if (!values.roleId) errors.roleId = 'Debe especificar un rol'
      return errors
    },
    onSubmit: async (employeeInfo: any) => sucessHandler(await createEmployee(employeeInfo))
  })
  return (
    <Modal ref={modalRef} title='Registrar nuevo empleado' description='Agrega un nuevo empleado a la base de datos' onDismiss={onClose}>
      <form className='p-2 flex flex-col gap-y-2' onSubmit={handleSubmit}>
        <Input
          {...getInputProps('name')}
          bg='brown'
          size='md'
          color='white'
          label='Nombre del empleado' />
        <Input
          {...getInputProps('lastname')}
          bg='brown'
          size='md'
          color='white'
          min={1}
          label='Apellido del empleado' />
        <Input
          {...getInputProps('phone')}
          bg='brown'
          size='md'
          color='white'
          type='tel'
          label='Número de telefono del empleado (opcional)'
          inputStyle={{ width: '15ch' }} />
        <Input
          {...getInputProps('username')}
          bg='brown'
          size='md'
          color='white'
          min={1}
          label='Usuario para ingresar al sistema' />
        <Input
          {...getInputProps('password')}
          bg='brown'
          size='md'
          color='white'
          type='password'
          min={1}
          label='Contraseña para ingresar al sistema' />
        <Radio
          {...getInputProps('roleId')}
          bg='brown'
          size='md'
          color='white'
          min={1}
          options={
            roles.map(({ id, name }) => ({
              value: id!.toString(),
              label: name
            }))
          }
          label='Rol del empleado' />
        <div id='display_errors' className='hidden' style={{ color: 'var(--clr-white)' }} />
        <Flex bg='brown' justify='center' align='center' g={2}>
          <Button style={{ width: '10ch' }} rounded='md' variant='white' onClick={dismissHandler}>Cancelar</Button>
          <Button style={{ width: '10ch' }} rounded='md' variant='white' type='submit'>Añadir</Button>
        </Flex>
      </form>
    </Modal>
  )
}

interface UpdateEmployeeFormProps {
  onClose: () => void
  onSuccess: () => void
  employee: Employee
  roles: Role[]
}

export const UpdateEmployeeForm = ({ employee, roles, onSuccess, onClose }: UpdateEmployeeFormProps) => {
  const { id, name, lastname, phone, username, password, roleId } = employee
  const modalRef = useRef<any>(null!)
  const dismissHandler = () => modalRef.current.dismiss(onClose)
  const sucessHandler = (_: unknown) => modalRef.current.dismiss().then(() => onSuccess())

  const { getInputProps, handleSubmit } = useForm({
    initialValues: {
      id,
      name,
      lastname,
      phone,
      username,
      password,
      roleId: roleId.toString()
    },
    validate: (values: any) => {
      const errors: { [key: string]: string } = {}
      if (!values.name) errors.name = 'El nombre es requerido'
      if (!values.lastname) errors.lastname = 'El apellido es requerido'
      // validate phone regex
      if (values.phone && !/^\d{10}$/.test(values.phone)) errors.phone = 'El telefono debe tener 10 digitos sin espacios'
      if (!values.username) errors.username = 'El nombre de usuario es requerido'
      if (!values.roleId) errors.roleId = 'Debe especificar un rol'
      return errors
    },
    onSubmit: async (employeeInfo: any) => sucessHandler(await updateEmployee(employeeInfo))
  })
  const onDelete = async () => {
    if (confirm(`${name} se eliminará permanentemente. ¿Estás seguro?`)) await deleteEmployee(id)
    await modalRef.current.dismiss()
    onSuccess()
  }
  return (
    <Modal ref={modalRef} title='Registrar nuevo empleado' description='Agrega un nuevo empleado a la base de datos' onDismiss={onClose}>
      <form className='p-2 flex flex-col gap-y-2' onSubmit={handleSubmit}>
        <Input
          {...getInputProps('id')}
          bg='brown'
          size='md'
          color='white'
          readonly
          label='ID del empleado' />
        <Input
          {...getInputProps('name')}
          bg='brown'
          size='md'
          color='white'
          label='Nombre del empleado' />
        <Input
          {...getInputProps('lastname')}
          bg='brown'
          size='md'
          color='white'
          min={1}
          label='Apellido del empleado' />
        <Input
          {...getInputProps('phone')}
          bg='brown'
          size='md'
          color='white'
          type='tel'
          label='Número de telefono del empleado (opcional)'
          inputStyle={{ width: '15ch' }} />
        <Input
          {...getInputProps('username')}
          bg='brown'
          size='md'
          color='white'
          min={1}
          label='Usuario para ingresar al sistema' />
        <Input
          {...getInputProps('password')}
          bg='brown'
          size='md'
          color='white'
          type='password'
          min={1}
          label='Contraseña para ingresar al sistema' />
        <Radio
          {...getInputProps('roleId')}
          bg='brown'
          size='md'
          color='white'
          min={1}
          options={
            roles.map(({ id, name }) => ({
              value: id!.toString(),
              label: name
            }))
          }
          label='Rol del empleado' />
        <div id='display_errors' className='hidden' style={{ color: 'var(--clr-white)' }} />
        <Flex bg='brown' justify='center' align='center' g={2}>
          <Button style={{ width: '10ch' }} rounded='md' variant='white' onClick={dismissHandler}>Cancelar</Button>
          <Button style={{ width: '10ch' }} rounded='md' variant='white' onClick={onDelete}>Eliminar</Button>
          <Button style={{ width: '11ch' }} rounded='md' variant='white' type='submit'>Actualizar</Button>
        </Flex>
      </form>
    </Modal>
  )
}
