import { useState } from 'react'
import styles from './FormPage.module.css'
import UniversalForm from '../universalForm/UniversalForm'
import { AutoFormFieldType, EstateFormFieldType, ServiceFormFieldType, UniversalFormFieldType } from '../../types'
import EstateForm from '../estateForm/EstateForm'
import AutoForm from '../autoForm/AutoForm'
import ServiceForm from '../serviceForm/ServiceForm'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { addItem, getList, updateItem } from '../../store/MainSlice'
import { useNavigate } from 'react-router-dom'

const FormPage = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate();
    const item = useAppSelector(state => state.MainSlice.itemById)
    const [step, setStep] = useState(1)
    const [firstStepData, setFirstStepData] = useState<UniversalFormFieldType>()
    const redact = localStorage.getItem('action') === 'redact'

    const submit = async (values: EstateFormFieldType | AutoFormFieldType | ServiceFormFieldType) => {
        if (redact) {
            await dispatch(updateItem({ ...firstStepData, ...values, id: item?.id }))
            await dispatch(getList())
            navigate(`/item/${item?.id}`)
        } else {
            await dispatch(addItem({ ...firstStepData, ...values }))
            await dispatch(getList())
            navigate('/')
        }
        
    }

    return (
        <>
            <div className={styles.header}>
                {
                    redact ? 
                    'Редактирование объявления':
                    'Размещение объявления'
                }
                
            </div>
            {
                step === 1 && 
                <UniversalForm 
                    nextStep={() => setStep(prevStep => prevStep + 1)}
                    setData={setFirstStepData}
                    firstStepData={firstStepData}
                    item={item}
                    redact={redact}
                />

            }
            {
                step === 2 &&
                firstStepData?.type === 'Авто' ?
                <AutoForm previousPage={() => setStep(prevStep => prevStep - 1)} submit={(values) => {submit(values)}} item={item} redact={redact}/>
                : step === 2 &&
                firstStepData?.type === 'Недвижимость' ?
                <EstateForm previousPage={() => setStep(prevStep => prevStep - 1)} submit={(values) => {submit(values)}} item={item} redact={redact}/>
                : step === 2 &&
                firstStepData?.type === 'Услуги' ?
                <ServiceForm previousPage={() => setStep(prevStep => prevStep - 1)} submit={(values) => {submit(values)}} item={item} redact={redact}/>
                : null
            }

        </>
    )
}

export default FormPage