import { ProtectedContent } from 'components'
import { CreatePlateForm, EditPlateForm, CreateCategoryForm } from 'components/form'
import { Layout } from 'components/layout'
import { MenuPlates } from 'components/menu_plates'
import { Button, Flex, Title } from 'components/shared'
import { useContext, useEffect, useRef, useState } from 'react'
import { getCategories, getMenu } from 'services'
import { AuthContext, GlobalSettingsContext } from 'utils'

interface modals {
  createPlate: boolean
  createCategory: boolean
  updatePlate: boolean
}

interface Props {
  menu: ServerPlates[]
  categories: Category[]
}

const Menu = ({ menu, categories }: Props) => {
  // Hooks
  const { user: { role: { name } } } = useContext(AuthContext)
  const { readScreen } = useContext(GlobalSettingsContext)
  const [showForm, setShowForm] = useState<modals>({
    createPlate: false,
    createCategory: false,
    updatePlate: false
  })
  const [category, setCategory] = useState<Category[]>(categories)
  const [editPlate, setEditPlate] = useState<Plate>(null!)
  const [editing, setEditing] = useState<boolean>(false)
  const platesRef = useRef<any>()

  useEffect(() => {
    platesRef.current.refreshPlates()
  }, [])

  // Handlers
  const createPlateHandler = () => setShowForm({ ...showForm, createPlate: true })

  const createCategoryHandler = () => setShowForm({ ...showForm, createCategory: true })

  const onUpdateHandler = async (plate: Plate) => {
    const { description, price } = plate
    // text to speech
    if (!editing && readScreen) {
      const msg = new SpeechSynthesisUtterance()
      msg.text = `${plate.name}.${description} ; por ${price} pesos mexicanos`
      window.speechSynthesis.speak(msg)
    }

    if (editing && name === 'admin') {
      setEditPlate(plate)
      setShowForm({ ...showForm, updatePlate: true })
    }
  }
  return (
    <Layout title="Menú" showUser>
      <Title my={2} align="center" weight="bold" size="3xl">EatOnTime Menú {editing && '(Editando)'}</Title>
      <ProtectedContent requiredRole='admin'>
        <Flex wrap justify="center" textAlign="center" gap={4} px={4}>
          <Button variant="outline" onClick={createPlateHandler}>Crear Platillo</Button>
          <Button variant="outline" onClick={createCategoryHandler}>Crear Categoria</Button>
          <Button variant="outline" onClick={() => setEditing(prev => !prev)}>Modo Edición</Button>
        </Flex>
      </ProtectedContent>

      <MenuPlates ref={platesRef} menu={menu} onSelectPlate={onUpdateHandler} />

      {
        showForm.createPlate &&
        <CreatePlateForm
          categories={category}
          onClose={() => setShowForm({ ...showForm, createPlate: false })}
          onSuccess={() => {
            setShowForm({ ...showForm, createPlate: false })
            platesRef.current.refreshPlates()
          }}
        />
      }
      {
        showForm.updatePlate &&
        <EditPlateForm
          plate={editPlate}
          categories={category}
          onClose={() => setShowForm({ ...showForm, updatePlate: false })}
          onSuccess={() => {
            setShowForm({ ...showForm, updatePlate: false })
            platesRef.current.refreshPlates()
          }}
        />
      }
      {
        showForm.createCategory &&
        <CreateCategoryForm
          onClose={() => setShowForm({ ...showForm, createCategory: false })}
          onSuccess={(cat: Category) => {
            setShowForm({ ...showForm, createCategory: false })
            setCategory(prev => [...prev, cat])
          }}
        />
      }
    </Layout>
  )
}

export async function getServerSideProps () {
  const menu = await getMenu()
  const categories = await getCategories()
  return {
    props: {
      menu,
      categories
    }
  }
}

export default Menu
