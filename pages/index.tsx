// import { ProtectContent } from '../../Components/ProtectContent';
import { Title } from '../components/shared/typography'
import { Layout } from '../components/layout'

export default function Home() {
  const { logout, user } = useContext(EotContext)
  const { auth, role, username } = user
  return (
    <Layout>
      <Flex justify='center' align='center' wrap className='text-center' style={{ height: '95vw' }}>
        <Title size='3xl' weight='bold'>Bienvenido a EatOnTime</Title>
      </Flex>
    </Layout>
  )
}

// Resources
import Login from '../../Images/login.png';
import MenuImage from '../../Images/menu.png';
import OrdersImage from '../../Images/orders.png';
import AboutUsImage from '../../Images/aboutus.png';
import DashboardImage from '../../Images/dashboard.svg';
import EmployeesImage from '../../Images/empleados.png';

// Styles
import styles from './home.module.css';
import { useContext } from 'react';
import { EotContext } from 'utils';
import { Flex } from 'components/shared/containers'

// Components

// export const Home = () => {
// Hooks
// const { logout, userName, userRole, authenticated } = useAuth();

// document.title = `EatOnTime`;

// Render section
/* 
return (
  <main className={`flex justify-content-center align-items-center flex-wrap text-center ${styles.home}`}>
    <Transition duration='750ms' />
    <h1 className={`${styles.title} ff-main pad-2`}></h1>

    <Link className={`${styles.link} gap-row-2 flex flex-column ff-alter pad-4`} to='/dashboard'>
      <img className='home__link-image' src={DashboardImage} alt="eat on time tables dashboard" />
      <p className="home__link-text">Dashboard</p>
    </Link>

    <Link className={`${styles.link} gap-row-2 flex flex-column ff-alter pad-4`} to='/menu'>
      <img className='home__link-image' src={MenuImage} alt="eat on time menu" />
      <p className="home__link-text">Menu</p>
    </Link>

    <ProtectContent requiredRole={'ADMIN'}>
      <Link className={`${styles.link} gap-row-2 flex flex-column ff-alter pad-4`} to='/employees'>
        <img src={EmployeesImage} alt="" className="home__link-image" />
        <p className="home__link-text">Empleados</p>
      </Link>
    </ProtectContent>

    <ProtectContent requiredRole={['ADMIN', 'CHEF']}>
      <Link className={`${styles.link} gap-row-2 flex flex-column ff-alter pad-4`} to='/orders'>
        <img src={OrdersImage} alt="" className="home__link-image" />
        <p className="home__link-text">Ordenes</p>
      </Link>
    </ProtectContent>

    <Link className={`${styles.link} gap-row-2 flex flex-column ff-alter pad-4`} to='/about'>
      <img className='home__link-image' src={AboutUsImage} alt="eat on time about" />
      <p className="home__link-text">Desarrolladores</p>
    </Link>

    <Link className={styles.last_link} to='/'></Link>
    {
      authenticated ?
        <p className={styles.welcome_message}
          onClick={logout}>
          {`Welcome ${userName} (${userRole}) `}
        </p>
        :
        <Link className={`${styles.flotant}`} to='/login' replace={false} >
          <img className={`${styles.flotant_img}`} src={Login} alt="eat on time login" />
          <p className="ff-alter">Login</p>
        </Link>
    }
  </main>
) */