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
    dogColor: string
    dogBreed: string
    dogGender: string
    dogLegLength: number
    dogBodyLength: number
    dogNeckGirth: number
    dogBreastGirth: number
}