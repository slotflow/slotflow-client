import React from "react";
import { Button } from "../ui/button";
import { LoaderCircle } from "lucide-react";
import { CardDescription, CardHeader, CardTitle } from "../ui/card";
import logo from '../../assets/logos/company/slotflowLogoTransparent.png';
import { AuthFormsButtonProps, AuthFormsHeadingProps } from "@/shared/interface/componentInterface";

export const FormHeading = React.memo(({ 
    title, 
    description
 }: AuthFormsHeadingProps) => {
    return (
        <CardHeader>
            <div className='flex items-center justify-center'>
                <img src={logo} className='size-16' />
            </div>
            <CardTitle className="text-center text-xl">{title}</CardTitle>
            <CardDescription className="text-center">
                {description}
            </CardDescription>
        </CardHeader>
    )
});

export const FormButton = React.memo(({ 
    text, 
    loading = false,
    disabled ,
    title
}: AuthFormsButtonProps) => {
    return (
        <Button
            title={title}
            variant="default"
            type="submit"
            disabled={disabled}
            className="border-1 w-full flex items-center justify-center cursor-pointer bg-[var(--mainColor)] hover:bg-[var(--mainColorHover)] hover:text-white transition-colors border-[var(--mainColor)] dark:text-white"
        >
            {loading ? (
                <span className="flex items-center gap-2">
                    <LoaderCircle className="animate-spin size-4" />
                    <span>{text}</span>
                </span>
            ) : (
                text
            )}
        </Button>
    )
});
