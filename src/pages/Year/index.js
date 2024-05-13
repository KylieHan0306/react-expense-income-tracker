import { NavBar, DatePicker } from 'antd-mobile'
import { useMemo, useState, useEffect } from 'react'
import './index.scss'
import classNames from 'classnames'
import dayjs from 'dayjs'
import { useSelector } from 'react-redux'
import _ from 'lodash'
import MonthlyBill from './components/MonthlyBill'

const Year = () => {

    const [dateVisible, setDateVisible] = useState(false)
    const [currYear, setCurrYear] = useState(() => {
        return dayjs(new Date()).format('YYYY')
    })
    const [currYearList, setYearList] = useState([])
    const billList = useSelector(state=> state.billList.billList)

    const YearGroup = useMemo(() => {
        return _.groupBy(billList, (item) => dayjs(item.date).format('YYYY'))
    }, [billList])
    
    const monthGroup = useMemo(() => {
        const monthGroup = _.groupBy(currYearList, (item) => dayjs(item.date).format('YYYY-MM'))
        const keys = Object.keys(monthGroup)
        return { 
            keys, 
            monthGroup
        }
    },[currYearList])

    const YearResult = useMemo(() => {
        if (currYearList.length === 0) return {expense: 0, income: 0, total: 0} 
        const expense = currYearList.filter(item => item.type === 'expense').reduce((a,c)=> a+c.money, 0)
        const income = currYearList.filter(item=> item.type === 'income').reduce((a,c) => a+c.money, 0)
        return {
            expense,
            income,
            total: expense + income
        }
    }, [currYearList])

    const onConfirm = (date) => {
        const formattedDate = dayjs(date).format('YYYY')
        setCurrYear(formattedDate)
        setDateVisible(false)
        setYearList(YearGroup[formattedDate])
    }

    useEffect(() => {
        const now = dayjs().format('YYYY')
        if (YearGroup[now]) {
            setYearList(YearGroup[now])
        }
    }, [YearGroup])

    return (
        <div className="AnnuallyBill">
        <NavBar className="nav" backArrow={false}>
            Annual bill
        </NavBar>
        <div className="content">
            <div className="header">
            {/* Time switching area */}
            <div className="date" onClick={() => setDateVisible(true)}>
                <span className="text">
                {currYear}
                </span>
                {/* Control whether the expand class name exists according to the current open status of the pop-up box. */}
                <span className={classNames('arrow', dateVisible && 'expand')}></span>
            </div>
            {/* statistical area */}
            <div className='twoLineOverview'>
                <div className="item">
                <span className="money">{YearResult.expense.toFixed(2)}</span>
                <span className="type">Expense</span>
                </div>
                <div className="item">
                <span className="money">{YearResult.income.toFixed(2)}</span>
                <span className="type">Income</span>
                </div>
                <div className="item">
                <span className="money">{YearResult.total.toFixed(2)}</span>
                <span className="type">Balance</span>
                </div>
            </div>
            <DatePicker
                className="kaDate"
                precision="year"
                cancelText="Close"
                confirmText="Confirm"
                visible={dateVisible}
                onCancel={() => setDateVisible(false)}
                onClose={() => setDateVisible(false)}
                max={new Date()}
                onConfirm={onConfirm}
            />
            </div>
            {monthGroup.keys.map((key) => {
                return <MonthlyBill key = {key} month={key} billList={monthGroup.monthGroup[key]}/>
            })}
        </div>
        </div >
    )
}

export default Year