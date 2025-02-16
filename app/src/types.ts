export type UniversalFormFieldType = {
    name?: string;
    description?: string;
    location?: string;
    type?: string;
    image?: string;
};

export type EstateFormFieldType = {
    propertyType?: string;
    area?: number;
    rooms?: number;
    price?: number;
};

export type AutoFormFieldType = {
    brand?: string;
    model?: string;
    year?: number;
    mileage?: number;
};

export type ServiceFormFieldType = {
    serviceType?: string;
    experience?: number;
    cost?: number;
    workSchedule?: string;
};

export type ItemType = UniversalFormFieldType & EstateFormFieldType & AutoFormFieldType & ServiceFormFieldType & {id?: number}


