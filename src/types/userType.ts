export interface DefaultAddressType {
  addressId: number;
  userAddress: string;
  addressName: string;
  entrancePassword: string;
  addressRequestMessage: string;
  recipientName: string;
  recipientPhoneNumber: string;
}

export interface AddressType {
  addressId: number;
  userAddress: string;
  addressName: string;
  entrancePassword: string;
  addressRequestMessage: string;
  recipientName: string;
  recipientPhoneNumber: string;
  isDefault: boolean;
}

export interface DogReviewType {
  dogId: number;
  dogName: string;
  dogAge: number;
  dogGender: string;
  dogBreed: string;
  dogWeight: number;
  dogFurColor: string;
  dogBodyLength: number;
  dogNeckGirth: number;
  dogBreastGirth: number;
  dogLegLength: number;
  dogImageUrl: string;
}