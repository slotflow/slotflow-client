import React from 'react';
import { Label } from '../ui/label';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';
import { Card, CardContent } from '../ui/card';

const IntegrationsListing: React.FC = () => {
    return (
        <React.Fragment>
            <div className='flex-none'>
                <h3 className='text-lg font-medium'>Integrations</h3>
                <p className='text-muted-foreground text-sm'>Integrations description</p>
            </div>
            <Separator className='my-4 flex-none' />
            <Card>
                <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                        <Label>Google Calendar Connection</Label>
                        <Button variant="default" className='cursor-pointer hover:bg-[var(--mainColor)] hover:text-white transition-colors border-[var(--mainColor)]'>Connect</Button>
                    </div>
                    <div className="flex items-center justify-between">
                        <Label>Stripe Connection</Label>
                        <Button variant="default" className="cursor-pointer hover:bg-[var(--mainColor)] hover:text-white transition-colors border-[var(--mainColor)]">Connect</Button>
                    </div>
                </CardContent>
            </Card>
        </React.Fragment>
    )
}

export default IntegrationsListing;