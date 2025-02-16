import { Button, Form, FormProps, Input, Select } from 'antd';
import styles from './Form.module.css'
import React from 'react';
import { serviceTypes } from '../../helpers/selectOptions';
import { ItemType, ServiceFormFieldType } from '../../types';

interface IEstateForm {
  submit: (payload: ServiceFormFieldType) => void;
  previousPage: () => void;
  item: ItemType | null
  redact: boolean
}


const ServiceForm:React.FC<IEstateForm> = ({previousPage, submit, item, redact}) => {
    
    const onFinish: FormProps<ServiceFormFieldType>['onFinish'] = (values) => {
      submit(values)
    };

    return (
      <>
        <div onClick={previousPage} style={{ marginBottom: '15px', cursor: 'pointer'}}>
          {'< Назад'}
        </div>
        <div>
        <Form
          layout='vertical'
          initialValues={item ? item : { remember: true }}
          onFinish={onFinish}
          autoComplete="off"
          className={styles.formDiv}
        >
          <Form.Item<ServiceFormFieldType>
            label="Тип услуги"
            name="serviceType"
            rules={[{ required: true, message: 'Обязательное поле' }]}
          >
            <Select 
                options={serviceTypes}
            />
          </Form.Item>

          <Form.Item<ServiceFormFieldType>
            label="Опыт работы"
            name="experience"
            rules={[{ required: true, message: 'Обязательное поле' }]}
            normalize={(value) => Number(value)}
          >
            <Input type='number' />
          </Form.Item>

          <Form.Item<ServiceFormFieldType>
            label="Стоимость"
            name="cost"
            rules={[{ required: true, message: 'Обязательное поле' }]}
            normalize={(value) => Number(value)}
          >
            <Input type='number' />
          </Form.Item>

          <Form.Item<ServiceFormFieldType>
            label="График работы"
            name="workSchedule"
            rules={[{ required: true, message: 'Обязательное поле' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType='submit'>
              {
                redact ?
                'Редактировать' :
                'Разместить'
              }
            </Button>
          </Form.Item>
        </Form>
        </div>
      </>
        
    )
  }
  
export default ServiceForm
  