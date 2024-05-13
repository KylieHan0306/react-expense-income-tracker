import { Button, DatePicker, Input, NavBar, Modal } from 'antd-mobile'
import Icon from '@/components/Icon'
import './index.scss'
import classNames from 'classnames'
import { billListData } from '@/contants/billList'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { fetchAddBill } from '@/store/modules/billListStore'
import { useDispatch } from 'react-redux'
import { ExclamationCircleFill } from 'antd-mobile-icons'
import dayjs from 'dayjs'

const Create = () => {
  const navigate = useNavigate()
  // a state of control over income and expenses
  const [billType, setBillType] = useState('expense')
  // a state of the amount of money
  const [money, setMoney] = useState(0)
  const [date, setDate] = useState(new Date())
  const moneyChange = (value) => {
    setMoney(value)
  }
  // a state of the money use for 
  const [useFor, setUseFor] = useState('')
  const dispatch = useDispatch()

  const saveBill = () => {
    const data = {
      type: billType,
      money: billType === 'expense' ? -money : +money,
      date: date,
      useFor: useFor
    }
    console.log(date)
    if (billType && date && useFor) {
      dispatch(fetchAddBill(data))
      navigate(-1)
    } else {
      Modal.show({
        header: (
          <ExclamationCircleFill
            style={{
              fontSize: 64,
              color: 'var(--adm-color-warning)',
            }}
          />
        ),
        showCloseButton: true,
        title: 'Notice',
        content: 'Please enter an amount and designate its purpose.',
        closeOnMaskClick: true,
      })
    }
  }
  // Control time panel  on and off
  const [dateVisible, setDateVisible] = useState(false)
  // Confirm selection time
  const dateConfirm = (value) => {
    setDate(value)
    setDateVisible(false)
  }
  return (
    <div className="keepAccounts">
      <NavBar className="nav" onBack={() => navigate(-1)}>
        Bookkeeping
      </NavBar>

      <div className="header">
        <div className="kaType">
          <Button
            shape="rounded"
            className={classNames(billType === 'expense' ? 'selected' : '')}
            onClick={() => setBillType('expense')}
          >
            Expense
          </Button>
          <Button
            className={classNames(billType === 'income' ? 'selected' : '')}
            shape="rounded"
            onClick={() => setBillType('income')}
          >
            Income
          </Button>
        </div>

        <div className="kaFormWrapper">
          <div className="kaForm">
            <div className="date">
              <Icon type="calendar" className="icon" />
              <span className="text" onClick={() => setDateVisible(true)}>{dayjs(date).format('YYYY-MM-DD')}</span>
              <DatePicker
                className="kaDate"
                max={new Date()}
                cancelText="Close"
                confirmText="Confirm"
                visible={dateVisible}
                onConfirm={dateConfirm}
              />
            </div>
            <div className="kaInput">
              <Input
                className="input"
                placeholder="0.00"
                type="number"
                value={money}
                onChange={moneyChange}
              />
              <span className="iconYuan">¥</span>
            </div>
          </div>
        </div>
      </div>

      <div className="kaTypeList">
        {billListData[billType].map(item => {
          return (
            <div className="kaType" key={item.type}>
              <div className="title">{item.type}</div>
              <div className="list">
                {item.list.map(item => {
                  return (
                    <div
                      className={classNames(
                        'item',
                        useFor === item.type ? 'selected' : ''
                      )}
                      key={item.type}
                      onClick={() => setUseFor(item.type)}
                    >
                      <div className="icon">
                        <Icon type={item.type} />
                      </div>
                      <div className="text">{item.type}</div>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>

      <div className="btns">
        <Button className="btn save" onClick={saveBill}>
          save
        </Button>
      </div>
    </div>
  )
}

export default Create