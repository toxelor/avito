import { Button, Form, FormProps, Input, Select } from 'antd';
import styles from './Form.module.css'
import { selectOptions } from '../../helpers/selectOptions';
import React from 'react';
import { ItemType, UniversalFormFieldType } from '../../types';
import { Link } from 'react-router-dom';

interface IUniversalForm {
  nextStep: () => void
  setData: (payload: UniversalFormFieldType) => void
  firstStepData: UniversalFormFieldType | undefined,
  item: ItemType | null
  redact: boolean
}

const UniversalForm:React.FC<IUniversalForm> = ({nextStep, setData, firstStepData, item, redact}) => {
    
    const onFinish: FormProps<UniversalFormFieldType>['onFinish'] = (values) => {
      setData(values)
      nextStep()
    };

    return (
      <>
        {
          redact ? 
          <Link to={`/item/${item?.id}`} style={{ marginBottom: '15px', color: '#000', textDecoration: 'none'}}>
              Вернуться
          </Link> :
          <Link to={'/'} style={{ marginBottom: '15px', color: '#000', textDecoration: 'none'}}>
              На главную
          </Link>
        }

        <div>
        <Form
          layout='vertical'
          initialValues={item ? item : firstStepData}
          onFinish={onFinish}
          autoComplete="off"
          className={styles.formDiv}
        >
          <Form.Item<UniversalFormFieldType>
            label="Название"
            name="name"
            rules={[{ required: true, message: 'Обязательное поле' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<UniversalFormFieldType>
            label="Описание"
            name="description"
            rules={[{ required: true, message: 'Обязательное поле' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<UniversalFormFieldType>
            label="Локация"
            name="location"
            rules={[{ required: true, message: 'Обязательное поле' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<UniversalFormFieldType>
            label="Фото"
            name="image"
          >
            <Input />
          </Form.Item>

          <Form.Item<UniversalFormFieldType>
            label="Категория объявления"
            name="type"
            rules={[{ required: true, message: 'Обязательное поле' }]}
          >
            <Select
              options={selectOptions}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType='submit'>Продолжить</Button>
          </Form.Item>
        </Form>
        </div>
      </>
        
    )
  }
  
export default UniversalForm
  