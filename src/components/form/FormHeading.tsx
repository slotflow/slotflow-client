import React from 'react';
import { CardDescription, CardHeader, CardTitle } from '../ui/card';
import logo from '../../assets/logos/company/slotflowLogoTransparent.png';
import { AuthFormsHeadingProps } from '@/shared/interface/componentInterface';

export const FormHeading = React.memo(({ title, description }: AuthFormsHeadingProps) => {
  return (
    <CardHeader>
      <div className="flex items-center justify-center">
        <img src={logo} className="size-16" />
      </div>
      <CardTitle className="text-center text-xl">{title}</CardTitle>
      <CardDescription className="text-center">{description}</CardDescription>
    </CardHeader>
  );
});