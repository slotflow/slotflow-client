import React from 'react';
import { Label } from '../ui/label';
import { Switch } from '../ui/switch';
import { Separator } from '../ui/separator';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

const PersonalizationList: React.FC = () => {
    return (
        <React.Fragment>
            <div className='flex-none'>
                <h3 className='text-lg font-medium'>Personalization</h3>
                <p className='text-muted-foreground text-sm'>Personalization description</p>
            </div>
            <Separator className='my-4 flex-none' />
            <Card>
                <CardHeader>
                    <CardTitle>UI / Personalization</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                        <Label>Dark / Light Theme</Label>
                        <Switch />
                    </div>
                    <div>
                        <Label>Timezone</Label>
                        <select className="border rounded-md p-2 w-full mt-2">
                            <option>UTC</option>
                            <option>GMT+5:30 (IST)</option>
                            <option>GMT-5 (EST)</option>
                        </select>
                    </div>
                </CardContent>
            </Card>
        </React.Fragment>
    )
}

export default PersonalizationList;