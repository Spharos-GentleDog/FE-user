import { OauthDataType } from '../types/oauthDataType'

export const OauthLogin: OauthDataType[] = [
    {
        id: 1,
        provider: 'naver',
        name: '네이버로 시작하기',
        icon: 'naver',
        background: 'bg-green-500',
        text: 'text-neutral-700',
    },
    {
        id: 2,
        provider: 'google',
        name: '구글로 시작하기',
        icon: 'google',
        background: 'bg-primary-50 dark:bg-neutral-800',
        text: 'text-neutral-700 dark:text-neutral-300',
    },
    {
        id: 3,
        provider: 'kakao',
        name: '카카오로 시작하기',
        icon: 'kakao',
        background: 'bg-yellow-300',
        text: 'text-neutral-700',
    },
]