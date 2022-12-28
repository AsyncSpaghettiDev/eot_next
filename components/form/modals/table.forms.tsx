import { Modal } from 'components/modal'
import { Button, Flex } from 'components/shared'
import { useForm } from 'hooks'
import { useRef } from 'react'
import { createActivity, createTable, deleteTable, updateTable } from 'services'
import { Input } from '../inputs'

interface CreateTableFormProps {
  onClose: () => void
  onSuccess: (newTable: Table) => void
}

export const CreateTableForm = ({ onSuccess, onClose }: CreateTableFormProps) => {
  const modalRef = useRef<any>(null!)
  const dismissHandler = () => modalRef.current.dismiss(onClose)
  const successHandler = (newTable: Table) => modalRef.current.dismiss(() => onSuccess(newTable))

  const { getInputProps, handleSubmit } = useForm({
    initialValues: {
      name: '',
      capacity: 1,
      sortId: undefined
    },
    validate: (values: any) => {
      const errors: { [key: string]: string } = {}
      if (!values.name) errors.name = 'El nombre es requerido'
      if (!values.capacity) errors.price = 'Debes especificar la capacidad'
      return errors
    },
    onSubmit: async (tableInfo: any) => {
      const newTable = await createTable(tableInfo)
      newTable.activities = []
      successHandler(newTable)
    }
  })
  return (
    <Modal ref={modalRef} title='Crear nuevo mesa' description='Agrega una mesa al restaurant' onDismiss={onClose}>
      <form className='p-2 flex flex-col gap-y-2' onSubmit={handleSubmit}>
        <Input
          {...getInputProps('name')}
          bg='brown'
          size='md'
          color='white'
          label='Nombre de la mesa' />
        <Input
          {...getInputProps('capacity')}
          bg='brown'
          size='md'
          color='white'
          type='number'
          min={1}
          inputStyle={{ width: '10ch' }}
          label='Capacidad de la mesa' />
        <Input
          {...getInputProps('sortId')}
          bg='brown'
          size='md'
          color='white'
          type='number'
          min={1}
          inputStyle={{ width: '10ch' }}
          label='Indice para acomodar la mesa (opcional)' />

        <div id='display_errors' className='hidden' style={{ color: 'var(--clr-white)' }} />
        <Flex bg='brown' justify='center' align='center' gap={2}>
          <Button style={{ width: '10ch' }} rounded='md' variant='white' onClick={dismissHandler}>Cancelar</Button>
          <Button style={{ width: '10ch' }} rounded='md' variant='white' type='submit'>Añadir</Button>
        </Flex>
      </form>
    </Modal>
  )
}

interface UpdateTableFormProps {
  onClose: () => void
  onUpdate: (capacity: number) => void
  onDelete: () => void
  table: Table
}

export const UpdateTableForm = ({ table: { id, capacity, sortId, name }, onUpdate, onClose }: UpdateTableFormProps) => {
  const modalRef = useRef<any>(null!)
  const dismissHandler = () => modalRef.current.dismiss(onClose)
  const successHandler = (res: any) => modalRef.current.dismiss(() => onUpdate(res.capacity as number))
  const onDelete = async () => {
    if (confirm(`¿Estas seguro de eliminar la mesa ${name}?`)) await deleteTable(id)
    await modalRef.current.dismiss()
    onDelete()
  }

  const { getInputProps, handleSubmit } = useForm({
    initialValues: {
      id,
      capacity,
      sortId
    },
    validate: (values: any) => {
      const errors: { [key: string]: string } = {}
      if (!values.capacity) errors.price = 'Debes especificar la capacidad'
      if (values.sortId && values.sortId < 0) errors.sortId = 'El indice no puede ser negativo'
      return errors
    },
    onSubmit: async (tableInfo: any) => updateTable(id, tableInfo).then(successHandler)
  })
  return (
    <Modal ref={modalRef} title='Actualizar mesa' description='Actualiza los datos de la mesa' onDismiss={onClose}>
      <form className='p-2 flex flex-col gap-y-2' onSubmit={handleSubmit}>
        <Input
          {...getInputProps('id')}
          readonly
          bg='brown'
          size='md'
          color='white'
          type='number'
          inputStyle={{ width: '10ch' }}
          label='Id de la mesa' />

        <Input
          {...getInputProps('capacity')}
          bg='brown'
          size='md'
          color='white'
          type='number'
          min={1}
          inputStyle={{ width: '10ch' }}
          label='Capacidad de la mesa' />
        <Input
          {...getInputProps('sortId')}
          bg='brown'
          size='md'
          color='white'
          type='number'
          inputStyle={{ width: '10ch' }}
          label='Indice para acomodar la mesa (opcional)' />

        <div id='display_errors' className='hidden' style={{ color: 'var(--clr-white)' }} />
        <Flex bg='brown' justify='center' align='center' gap={2}>
          <Button style={{ width: '10ch' }} rounded='md' variant='white' onClick={dismissHandler}>Cancelar</Button>
          <Button style={{ width: '10ch' }} rounded='md' variant='white' onClick={onDelete}>Eliminar</Button>
          <Button style={{ width: '10ch' }} rounded='md' variant='white' type='submit'>Actualizar</Button>
        </Flex>
      </form>
    </Modal>
  )
}

interface CreateActivityFormProps {
  onClose: () => void
  onSuccess: (newActivity: Activity) => void
  table: Table
}

export const CreateActivityForm = ({ table: { id, capacity }, onSuccess, onClose }: CreateActivityFormProps) => {
  const modalRef = useRef<any>(null!)
  const dismissHandler = () => modalRef.current.dismiss(onClose)
  const successHandler = (newActivity: Activity) => onSuccess(newActivity)

  const { getInputProps, handleSubmit } = useForm({
    initialValues: {
      tableId: id,
      people: 1
    },
    validate: (values: any) => {
      const errors: { [key: string]: string } = {}
      if (!values.people) errors.people = 'Debes especificar la gente a ocupar la mesa'
      return errors
    },
    onSubmit: async (activityInfo: any) => {
      const newActivity: Activity = await createActivity(activityInfo)
      newActivity.status = {
        id: 1,
        name: 'occupied',
        description: 'La mesa esta ocupada',
        sortId: 1
      }
      successHandler(newActivity)
    }
  })
  return (
    <Modal ref={modalRef} title='Crear nueva actividad' description='Habilitar una mesa ingresando la cantidad de personas que la ocuparán' onDismiss={onClose}>
      <form className='p-2 flex flex-col gap-y-2' onSubmit={handleSubmit}>
        <Input
          {...getInputProps('tableId')}
          readonly
          bg='brown'
          size='md'
          color='white'
          label='Id de la mesa a ocupar' />
        <Input
          {...getInputProps('people')}
          bg='brown'
          size='md'
          color='white'
          type='number'
          min={1}
          max={capacity}
          inputStyle={{ width: '10ch' }}
          label='Personas a ocupar la mesa' />

        <div id='display_errors' className='hidden' style={{ color: 'var(--clr-white)' }} />
        <Flex bg='brown' justify='center' align='center' gap={2}>
          <Button style={{ width: '10ch' }} rounded='md' variant='white' onClick={dismissHandler}>Cancelar</Button>
          <Button style={{ width: '10ch' }} rounded='md' variant='white' type='submit'>Crear</Button>
        </Flex>
      </form>
    </Modal>
  )
}
