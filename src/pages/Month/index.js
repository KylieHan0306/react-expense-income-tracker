import { NavBar, DatePicker } from 'antd-mobile'
import { useMemo, useState, useEffect } from 'react'
import './index.scss'
import classNames from 'classnames'
import dayjs from 'dayjs'
import { useSelector } from 'react-redux'
import _ from 'lodash'
import DailyBill from './components/DaliyBill'

const Month = () => {

    const [dateVisible, setDateVisible] = useState(false)
    const [currentDate, setCurrrentDate] = useState(() => {
        return dayjs(new Date()).format('YYYY-MM')
    })
    const [currMonthList, setMonthList] = useState([])
    const billList = useSelector(state=> state.billList.billList)

    const monthGroup = useMemo(() => {
        return _.groupBy(billList, (item) => dayjs(item.date).format('YYYY-MM'))
    },[billList])
    const monthResult = useMemo(() => {
        if (!currMonthList) return {expense: 0, income: 0, total: 0}
        const expense  = currMonthList.filter(item=> item.type==='expense').reduce((a,c)=> a+c.money, 0)
        const income = currMonthList.filter(item => item.type ==='income').reduce((a, c) => a+c.money, 0)
        return {
            expense, 
            income,
            total: expense + income
        }
    }, [currMonthList])
    const onConfirm = (date) => {
        const formattedDate = dayjs(date).format('YYYY-MM')
        setCurrrentDate(formattedDate)
        setDateVisible(false)
        setMonthList(monthGroup[formattedDate])
    }

    useEffect(() => {
        const now = dayjs().format('YYYY-MM')
        if (monthGroup[now]) {
            setMonthList(monthGroup[now])
        }
    }, [monthGroup])

    //Current Day group 
    const dayGroup = useMemo(() => {
        const dayGroup = _.groupBy(currMonthList, (item) => dayjs(item.date).format('YYYY-MM-DD'))
        const keys = Object.keys(dayGroup)
        return { 
            keys, 
            dayGroup
        }
    },[currMonthList])

    return (
        <div className="monthlyBill">
        <NavBar className="nav" backArrow={false}>
            Monthly bill
        </NavBar>
        <div className="content">
            <div className="header">
            {/* Time switching area */}
            <div className="date" onClick={() => setDateVisible(true)}>
                <span className="text">
                {currentDate}
                </span>
                {/* Control whether the expand class name exists according to the current open status of the pop-up box. */}
                <span className={classNames('arrow', dateVisible && 'expand')}></span>
            </div>
            {/* statistical area */}
            <div className='twoLineOverview'>
                <div className="item">
                <span className="money">{monthResult.expense.toFixed(2)}</span>
                <span className="type">Expense</span>
                </div>
                <div className="item">
                <span className="money">{monthResult.income.toFixed(2)}</span>
                <span className="type">Income</span>
                </div>
                <div className="item">
                <span className="money">{monthResult.total.toFixed(2)}</span>
                <span className="type">Balance</span>
                </div>
            </div>
            <DatePicker
                className="kaDate"
                precision="month"
                cancelText="Close"
                confirmText="Confirm"
                visible={dateVisible}
                onCancel={() => setDateVisible(false)}
                onClose={() => setDateVisible(false)}
                max={new Date()}
                onConfirm={onConfirm}
            />
            </div>
            {dayGroup.keys.map((key) => {
                return <DailyBill key = {key} date={key} billList={dayGroup.dayGroup[key]}/>
            })}
        </div>
        </div >
    )
}

export default Month