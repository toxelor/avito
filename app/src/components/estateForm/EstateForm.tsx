import { Button, Form, FormProps, Input, Select } from 'antd';
import styles from './Form.module.css'
import React from 'react';
import { EstateFormFieldType, ItemType } from '../../types';
import { estateTypes } from '../../helpers/selectOptions';

interface IEstateForm {
  submit: (payload: EstateFormFieldType) => void;
  previousPage: () => void;
  item: ItemType | null
  redact: boolean
}

const EstateForm:React.FC<IEstateForm> = ({previousPage, submit, item, redact}) => {
    
    const onFinish: FormProps<EstateFormFieldType>['onFinish'] = (values) => {
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
          <Form.Item<EstateFormFieldType>
            label="Тип недвижимости"
            name="propertyType"
            rules={[{ required: true, message: 'Обязательное поле' }]}
          >
            <Select 
                options={estateTypes}
            />
          </Form.Item>

          <Form.Item<EstateFormFieldType>
            label="Площадь"
            name="area"
            rules={[{ required: true, message: 'Обязательное поле' }]}
            normalize={(value) => Number(value)}
          >
            <Input type='number' />
          </Form.Item>

          <Form.Item<EstateFormFieldType>
            label="Количество комнат"
            name="rooms"
            rules={[{ required: true, message: 'Обязательное поле' }]}
            normalize={(value) => Number(value)}
          >
            <Input type='number' />
          </Form.Item>

          <Form.Item<EstateFormFieldType>
            label="Цена"
            name="price"
            rules={[{ required: true, message: 'Обязательное поле' }]}
            normalize={(value) => Number(value)}
          >
            <Input type='number' />
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
  
export default EstateForm
  