
"use client"

import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

export default function SettingsPage() {
  return (
    <AppLayout>
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="col-span-2">
            <CardHeader>
                <CardTitle>System Configuration</CardTitle>
                <CardDescription>Configure general system settings.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="threshold">Energy Threshold (kWh)</Label>
                    <Input type="number" id="threshold" placeholder="15.0" />
                </div>
                <div className="flex items-center space-x-2">
                    <Switch id="notifications" />
                    <Label htmlFor="notifications">Enable Email Notifications</Label>
                </div>
                 <Button>Save Changes</Button>
            </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
