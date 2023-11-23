export interface LoginFormDataType {
    loginEmail: string;
    password: string;
}

export interface SignupDataType {
    email: string
    password: string
    passwordConfirm: string
    name: string
    age: number
    gender: number
    phoneNumber: string
    authEmail: string
    authPhone: string
}

export interface SignupAddressDataType {
    address: string
    addressDetail: string
}

export interface SignupDogDataType {
    dogImageUrl: string
    dogName: string
    dogAge: number
    dogWeight: number
    dogFurColor: string
    dogBreed: number
    dogGender: string
    dogLegLength: number
    dogBodyLength: number
    dogNeckGirth: number
    dogBreastGirth: number
}