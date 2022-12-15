import { Layout } from "components/layout"
import { NextPageContext } from "next"

interface TableDashboardProps {
    user: any
}
const TableDashboard = () => {
    return (
        <Layout title="Mesas">
            <h1>Table Dashboard</h1>
        </Layout>
    )
}

export default TableDashboard
