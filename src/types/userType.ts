// 기본 주소
export interface DefaultAddressType {
  addressId: number;
  userAddress: string;
  addressName: string;
  entrancePassword: string;
  addressRequestMessage: string;
  recipientName: string;
  recipientPhoneNumber: string;
}

// 주소 타입
export interface AddressType {
  map(arg0: (address: AddressType) => import("react").JSX.Element): import("react").ReactNode;
  id: number;
  userAddress: string;
  addressAlias: string;
  recipientPhoneNumber: string;
  recipientName: string;
  addressRequestMessage: string;
  entrancePassword: string;
  defaultAddress: boolean;
}

// 강아지 정보 타입
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