import { Button, Form, FormProps, Input, Select } from 'antd';
import styles from './Form.module.css'
import React from 'react';
import { AutoFormFieldType, ItemType } from '../../types';
import { autoTypes } from '../../helpers/selectOptions';

interface IEstateForm {
  previousPage: () => void;
  submit: (payload: AutoFormFieldType) => void
  item: ItemType | null
  redact: boolean
}

const AutoForm:React.FC<IEstateForm> = ({submit, previousPage, item, redact}) => {
    
    const onFinish: FormProps<AutoFormFieldType>['onFinish'] = (values) => {
      
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
              <Form.Item<AutoFormFieldType>
                label="Марка"
                name="brand"
                rules={[{ required: true, message: 'Обязательное поле' }]}
              >
                <Select 
                    options={autoTypes}
                />
              </Form.Item>

              <Form.Item<AutoFormFieldType>
                label="Модель"
                name="model"
                rules={[{ required: true, message: 'Обязательное поле' }]}
              >
                <Input />
              </Form.Item>

              <Form.Item<AutoFormFieldType>
                label="Год выпуска"
                name="year"
                rules={[{ required: true, message: 'Обязательное поле' }]}
                normalize={(value) => Number(value)}
              >
                <Input type='number' />
              </Form.Item>

              <Form.Item<AutoFormFieldType>
                label="Пробег"
                name="mileage"
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
  
export default AutoForm
  