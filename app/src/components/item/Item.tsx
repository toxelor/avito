import { Link, useParams } from "react-router-dom"
import styles from './Item.module.css'
import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../store/hooks"
import { getItemById } from "../../store/MainSlice"
import { Button, Spin } from "antd"

const Item = () => {
    const params = useParams()
    const dispatch = useAppDispatch()
    const item = useAppSelector(state => state.MainSlice.itemById)
    const loading = useAppSelector(state => state.MainSlice.loading)

    useEffect(() => {
        const request = dispatch(getItemById(Number(params.id)))

        return () => {
            request.abort()
        } 
    }, [])
    return (
        <>
            <div className={styles.header}>
                Страница объявления
            </div>
            {
                loading ?
                <Spin />
                :
                <>
                    <Link to={'/'} style={{ marginBottom: '15px', color: '#000', textDecoration: 'none'}}>
                        На главную
                    </Link>
                    <div style={{marginTop: '15px', display: 'flex', gap: '30px', border: '1px solid rgb(217, 217, 217)', borderRadius: '10px', padding: '30px 30px', boxSizing: 'border-box', maxWidth: '1000px'}}>
                        <div>
                            <img style={{width: '300px', height: '300px'}} src={ item?.image ? item?.image : '/fallback.png'}/>
                        </div>
                        <div style={{display: 'flex', flexDirection: 'column', gap: '10px', width: '100%'}}>
                            <div style={{ fontSize: '20px', 
                                        display: 'flex', 
                                        justifyContent: 'space-between', 
                                        width: '100%', 
                                        alignItems: 'end',  
                                        }}>
                                            <span style={{ flex: '1', maxWidth: '400px', fontWeight: '700', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{item?.name}</span> <span style={{fontSize: '20px'}}>{item?.type}</span>
                            </div>
                            <div style={{ fontSize: '18px' }}>{item?.location}</div>
                            <div style={{ fontSize: '18px' }}>{item?.description}</div>
                            {
                                item?.propertyType && 
                                <div>
                                    Тип недвижимости: {item?.propertyType}
                                </div>
                            }
                            {
                                item?.area && 
                                <div>
                                    Площадь: {item?.area} кв. м
                                </div>
                            }
                            {
                                item?.rooms && 
                                <div>
                                    Количество комнат: {item?.rooms}
                                </div>
                            }
                            {
                                item?.price && 
                                <div>
                                    Цена: {item?.price}
                                </div>
                            }

                            {
                                item?.brand && 
                                <div>
                                    Марка: {item?.brand}
                                </div>
                            }
                            {
                                item?.model && 
                                <div>
                                    Модель: {item?.model}
                                </div>
                            }
                            {
                                item?.year && 
                                <div>
                                    Год выпуска: {item?.year}
                                </div>
                            }
                            {
                                item?.mileage && 
                                <div>
                                    Пробег: {item?.mileage} км
                                </div>
                            }

                            {
                                item?.serviceType && 
                                <div>
                                    Тип услуги: {item?.serviceType}
                                </div>
                            }
                            {
                                item?.experience && 
                                <div>
                                    Опыт работы: {item?.experience}
                                </div>
                            }
                            {
                                item?.cost && 
                                <div>
                                    Стоимость: {item?.cost}
                                </div>
                            }
                            {
                                item?.workSchedule && 
                                <div>
                                    График работы: {item?.workSchedule}
                                </div>
                            }
                            <Link to={'/form'}>
                                <Button onClick={() => localStorage.setItem('action', 'redact')} type="primary">
                                    Редактировать
                                </Button>
                            </Link>
                        </div>
                    </div>
                </>
                
            }
        </>
    )
}

export default Item