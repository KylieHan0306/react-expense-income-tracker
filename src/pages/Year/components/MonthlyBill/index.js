import classNames from 'classnames'
import './index.scss'
import { useMemo } from 'react'
import { useState } from 'react'
import Icon from '@/components/Icon'
import _ from 'lodash'

const MonthlyBill = ({month, billList}) => {
    const [visible, setVisible] = useState(false)

    const monthResult = useMemo(() => {
        if (!billList) return {expense: 0, income: 0, total: 0}
        const expense  = billList.filter(item=> item.type==='expense').reduce((a,c)=> a+c.money, 0)
        const income = billList.filter(item => item.type ==='income').reduce((a, c) => a+c.money, 0)

        return {
            expense, 
            income,
            total: expense + income
        }
    }, [billList])

    const useForResult = useMemo(() => {
        const useForGroup = _.groupBy(billList, (item) => item.useFor)
        const keys = Object.keys(useForGroup)
        const resultList = []
        keys.forEach((useFor) => {
            const result = {
                useFor,
                money: useForGroup[useFor].reduce((a,c)=> a+c.money, 0),
                type: useForGroup[useFor][0].type
            }
            resultList.push(result)
        })
        return resultList
    }, [billList])

    return (
        <div className={classNames('dailyBill')}>
        <div className="header">
            <div className="dateIcon">
            <span className="date">{month}</span>
            <span className={classNames('arrow', visible && 'expand')} onClick={() => setVisible(!visible)}></span>
            </div>
            <div className="oneLineOverview">
            <div className="pay">
                <span className="type">Expense</span>
                <span className="money">{monthResult.expense.toFixed(2)}</span>
            </div>
            <div className="income">
                <span className="type">Income</span>
                <span className="money">{monthResult.income.toFixed(2)}</span>
            </div>
            <div className="balance">
                <span className="money">{monthResult.total.toFixed(2)}</span>
                <span className="type">Balance</span>
            </div>
            </div>
        </div>
        {/* UseFor list */}
        <div className="billList" style={{ display: visible ? 'block' : 'none' }}>
            {useForResult.map((item, index) => {
            return (
                <div className="bill" key={index}>
                    <Icon type={item.useFor} />
                    <div className="detail">
                    <div className="billType">{item.useFor}</div>
                    </div>
                    <div className={classNames('money', item.type)}>
                        {item.money.toFixed(2)}
                    </div>
                </div>
            )
            })}
        </div>
        </div>
    )
}
export default MonthlyBill