import { fetchBillList } from "@/store/modules/billListStore"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import {  Outlet, useLocation, useNavigate } from "react-router-dom"
import {
    BillOutline,
    CalculatorOutline,
    AddCircleOutline
} from 'antd-mobile-icons'
import { TabBar } from 'antd-mobile'
import './index.scss'

const tabs = [
    {
      key: '/',
      title: 'Monthly bill',
      icon: <BillOutline />,
    },
    {
      key: '/create',
      title: 'Bookkeeping',
      icon: <AddCircleOutline />,
    },
    {
      key: '/year',
      title: 'Annual bill',
      icon: <CalculatorOutline />,
    },
  ]

const Layout = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        dispatch(fetchBillList());
    }, [dispatch])

    return (
    <>
        <Outlet />
        <TabBar
            className="tabbar"
            activeKey={location.pathname}
            onChange={key => navigate(key)}
        >
            {tabs.map(item => (
                <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
            ))}
        </TabBar>
    </>)
}

export default Layout