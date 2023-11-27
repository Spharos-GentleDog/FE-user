'use client'
import Label from "@/components/Label/Label";
import React from "react";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import Input from "@/shared/Input/Input";
import { useSession } from "next-auth/react";
import Toast from "./Toast";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

function ChangePassword() {
    const session = useSession();
    const router = useRouter();
    const [userPass, setUserPass] = React.useState({
        currentPass: "",
        newPass: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setUserPass({
            ...userPass,
            [name]: value,
        });
    };

    const handleChangePasswordFetch = async () => {
        console.log(userPass);
        const res = await fetch(`${process.env.BASE_API_URL}/api/v1/user/password`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${session.data?.user.accessToken}`,
                "userEmail": `${session.data?.user.userEmail}`,
            },
            body: JSON.stringify({
                password: userPass.newPass,
            }),
        });

        const data = await res.json();
        if (data.isSuccess === true) {
            toast.custom((t) => (
                <Toast message='비밀번호가 변경되었습니다.' />
            ));
            router.push("/");
        } else {
            toast.custom((t) => (
                <Toast message={data.message} />
            ));
        }
    }
    return (
        <div className="space-y-10 sm:space-y-12">
            <h2 className="text-2xl sm:text-3xl font-semibold">
                비밀번호 변경
            </h2>
            <div className=" max-w-xl space-y-6">
                <div>
                    <Label>현재 비밀번호</Label>
                    <Input
                        type="password"
                        className="mt-1.5"
                        onChange={handleChange}
                        name="currentPass"
                    />
                </div>
                <div>
                    <Label>새로운 비밀번호</Label>
                    <Input
                        type="password"
                        className="mt-1.5"
                        onChange={handleChange}
                        name="newPass"
                    />
                </div>
                <div>
                    <Label>비밀번호 확인</Label>
                    <Input
                        type="password"
                        className="mt-1.5"
                    />
                </div>
                <div className="pt-2">
                    <ButtonPrimary onClick={handleChangePasswordFetch}>비밀번호 변경</ButtonPrimary>
                </div>
            </div>
        </div>
    )
}

export default ChangePassword