import { Layout, ActivityCard } from 'components'
import { Flex, Title } from 'components/shared'
import { useEffect, useState } from 'react'
import { getActivities } from 'services'

export default function ActivitiesPage () {
  const [activities, setActivities] = useState<Activity[]>(null!)

  useEffect(() => {
    getActivities().then(setActivities)
  }, [])

  return (
    <>
      <Layout title='Actividades' showUser>
        <Title align='center' p={2} order={3} size='2xl' weight='bold' transform='uppercase'>Actividades en curso</Title>
        <Flex justify='center' align='center' p={4} g={4}>
          {
            activities?.map(activity => (
              <ActivityCard key={activity.id} activity={activity} />
            ))
          }
        </Flex>
      </Layout>
    </>
  )
}
