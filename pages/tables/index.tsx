import { Layout } from "components/layout"
import { NextPageContext } from "next"
import { authorize, redirectLogin } from "utils/authorize"

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

export const getServerSideProps = async (ctx: NextPageContext) => {
    try {
        const { isStaff, expired, tableId } = authorize(ctx)
        console.log(!isStaff, expired)
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

        return {
            props: {}
        }
    }
    catch (error) {
        return redirectLogin
    }
}

export default TableDashboard
