import React from "react";
import { Button } from "../ui/button";
import { Loader } from "lucide-react";
import logo from '../../assets/logos/logo-transparent.png';
import { CardDescription, CardHeader, CardTitle } from "../ui/card";
import { AuthFormsButtonProps, AuthFormsHeadingProps } from "@/shared/interface/componentInterface";

export const FormHeading: React.FC<AuthFormsHeadingProps> = React.memo(({ title, description }) => {
    return (
        <CardHeader>
            <div className='flex items-center justify-center'>
                <img src={logo} className='size-16' />
            </div>
            <CardTitle className="text-center">{title}</CardTitle>
            <CardDescription className="text-center">
                {description}
            </CardDescription>
        </CardHeader>
    )
});

export const FormButton: React.FC<AuthFormsButtonProps> = React.memo(({ text, loading = false, disabled }) => {
    return (
        <Button
            title={text}
            variant="default"
            type="submit"
            disabled={disabled}
            className="border-0 w-full flex items-center justify-center cursor-pointer hover:bg-[var(--mainColor)] hover:text-white transition-colors border-[var(--mainColor)]"
        >
            {loading ? (
                <span className="flex items-center gap-2">
                    <Loader className="animate-spin size-4" />
                    <span>Loading</span>
                </span>
            ) : (
                text
            )}
        </Button>
    )
});
