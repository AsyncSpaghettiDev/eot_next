import { ProtectedContent, TableCard, AutoUpdate, Layout, CreateTableForm, ConfirmModal, CreateActivityForm, UpdateTableForm } from "components"
import { Button, Flex, Title } from "components/shared"
import { NextPageContext } from "next"
import Image from "next/image"
import { useState } from "react"
import { deleteActivity, getTables } from "services"
import { authorize, redirectLogin } from "utils"

interface Props {
    tables: Table[]
}
const TableDashboard = ({ tables }: Props) => {
    const [tablesList, setTablesList] = useState<Table[]>(tables)
    const [editing, setEditing] = useState(false)
    const [editTable, setEditTable] = useState<Table>(null!)
    const [forms, setForms] = useState({
        create: false,
        edit: false,
        createActivity: false,
        deleteActivity: false,
    })
    const onUpdate = () => {
        getTables().then(tables => {
            setTablesList(tables)
            Promise.resolve()
        })
    }

    const toggleEditing = () => setEditing(!editing)

    const handleCreate = () => setForms({ ...forms, create: true })

    const handleClick = (selected: Table) => {
        if (editing) {
            setEditTable(selected)
            return setForms({ ...forms, edit: true })
        }
        if (selected.activities.length > 0) {
            setEditTable(selected)
            return setForms({ ...forms, deleteActivity: true })
        }
        else {
            setEditTable(selected)
            return setForms({ ...forms, createActivity: true })
        }
    }
    return (
        <Layout title="Mesas" showUser>
            <Flex justify="center" align="center" direction="col" gapY={1}>
                <Image src="/svg/hero.svg" width={125} height={125} alt='tables dsahboard' />
                <Title size="3xl" weight="bold" align="center">Mesas {editing && '(Editando)'}</Title>
                <AutoUpdate page_name="tables" onUpdate={onUpdate} />
                <ProtectedContent adminOnly>
                    <Flex py={1} justify="center" align="center" gapX={2}>
                        <Button size='md' variant='outline' onClick={handleCreate}>Crear mesa</Button>
                        <Button size='md' variant='outline' onClick={toggleEditing}>Editar mesa</Button>
                    </Flex>
                </ProtectedContent>
            </Flex>
            <Flex p={4} gap={4} justify="center" align="stretch" wrap>
                {tablesList.map(table => (
                    <TableCard key={table.id} table={table} onClick={handleClick} />
                ))}
            </Flex>

            {
                forms.create &&
                <CreateTableForm
                    onClose={() => setForms({ ...forms, create: false })}
                    onSuccess={(createdTable: Table) => {
                        setForms({ ...forms, create: false })
                        console.log('Created table', createdTable)
                        setTablesList([...tablesList, createdTable])
                    }} />
            }
            {
                forms.edit &&
                <UpdateTableForm
                    table={editTable}
                    onClose={() => setForms({ ...forms, edit: false })}
                    onUpdate={(capacity: number) => {
                        setForms({ ...forms, edit: false })
                        setTablesList(tablesList.map(table => {
                            if (table.id === editTable.id)
                                return { ...table, capacity }
                            return table
                        }))
                    }}
                    onDelete={() => setTablesList(tablesList.filter(table => table.id !== editTable.id))}
                />
            }
            {
                forms.createActivity &&
                <CreateActivityForm
                    table={editTable}
                    onClose={() => setForms({ ...forms, createActivity: false })}
                    onSuccess={(createdActivity: Activity) => {
                        setForms({ ...forms, createActivity: false })
                        console.log('Created activity', createdActivity)
                        setTablesList(tablesList.map(table => {
                            if (table.id === editTable.id)
                                return { ...table, activities: [createdActivity] }
                            return table
                        }))
                    }} />
            }
            {
                forms.deleteActivity &&
                <ConfirmModal
                    title={`¿Desea liberar la mesa #${editTable.id}?`}
                    description='¿Desea terminar la actividad en esta mesa? Esta acción no podrá ser revertida'
                    onConfirm={async () => {
                        setForms({ ...forms, deleteActivity: false })
                        await deleteActivity(editTable.activities[0].id)
                        onUpdate()
                    }}
                    onCancel={() => setForms({ ...forms, deleteActivity: false })}
                    onDismiss={() => setForms({ ...forms, deleteActivity: false })} />
            }
        </Layout>
    )
}

export const getServerSideProps = async (ctx: NextPageContext) => {
    try {
        const { isStaff, tableId, cookie } = authorize(ctx, '/tables')
        if (!isStaff) {
            if (tableId)
                return {
                    redirect: {
                        destination: `/tables/${tableId}`,
                        permanent: false
                    }
                }
            return redirectLogin
        }

        ctx.res?.setHeader('set-cookie', `origin=; max-age=-1;`)
        const tables = await getTables(cookie)

        return {
            props: {
                tables
            }
        }
    }
    catch (error) {
        return redirectLogin
    }
}

export default TableDashboard
