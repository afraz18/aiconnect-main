<<<<<<< HEAD
import React from "react";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Mail, Bell, Shield, Palette } from "lucide-react";

export default function SettingsView() {
    return (
        <div className="space-y-8">
            <header className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-semibold">Settings</h1>
                    <p className="text-sm text-muted-foreground">Manage your account and preferences</p>
                </div>
            </header>

            <section className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <User className="h-5 w-5" />
                            Profile Settings
                        </CardTitle>
                        <CardDescription>Update your personal information</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="firstName">First Name</Label>
                                <Input id="firstName" placeholder="John" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="lastName">Last Name</Label>
                                <Input id="lastName" placeholder="Doe" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" placeholder="john@example.com" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="company">Company</Label>
                            <Input id="company" placeholder="Acme Inc." />
                        </div>
                        <Button>Save Changes</Button>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Bell className="h-5 w-5" />
                            Notifications
                        </CardTitle>
                        <CardDescription>Configure how you receive notifications</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium">Email Notifications</p>
                                <p className="text-xs text-muted-foreground">Receive email about your account activity</p>
                            </div>
                            <input type="checkbox" className="h-4 w-4" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium">Interview Reminders</p>
                                <p className="text-xs text-muted-foreground">Get notified before scheduled interviews</p>
                            </div>
                            <input type="checkbox" className="h-4 w-4" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium">New Candidate Alerts</p>
                                <p className="text-xs text-muted-foreground">Notify when new candidates register</p>
                            </div>
                            <input type="checkbox" className="h-4 w-4" />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Palette className="h-5 w-5" />
                            Appearance
                        </CardTitle>
                        <CardDescription>Customize the look and feel</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label>Theme</Label>
                            <div className="flex gap-3">
                                <Button variant="outline" size="sm">Light</Button>
                                <Button variant="outline" size="sm">Dark</Button>
                                <Button variant="outline" size="sm">System</Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Shield className="h-5 w-5" />
                            Security
                        </CardTitle>
                        <CardDescription>Manage your security preferences</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Button variant="outline">Change Password</Button>
                        <Button variant="outline">Enable Two-Factor Authentication</Button>
                    </CardContent>
                </Card>
            </section>
        </div>
    );
}
=======
import React, { useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  User, 
  Bell, 
  Palette, 
  Zap,
  Settings as SettingsIcon,
  Image as ImageIcon,
  X,
  LogOut
} from "lucide-react";

const tabs = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'appearance', label: 'Appearance', icon: Palette },
  { id: 'ai', label: 'AI Features', icon: Zap },
];

import { useUser } from "@clerk/nextjs";
import { useTheme } from "next-themes";

const ProfileTab = () => {
  const { user } = useUser();
  const [firstName, setFirstName] = useState(user?.firstName || '');
  const [lastName, setLastName] = useState(user?.lastName || '');
  const [email, setEmail] = useState(user?.emailAddresses[0]?.emailAddress || '');
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    if (!user) return;
    
    try {
      setIsSaving(true);
      // Update the user's information
      await user.update({
        firstName,
        lastName,
      });
      
      // Show success message or update UI
    } catch (err) {
      console.error('Error updating profile:', err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    try {
      const formData = new FormData();
      formData.append('file', file);
      
      // Upload the image to Clerk
      const response = await user.setProfileImage({ file });
      
      // Refresh the user data
      await user.reload();
    } catch (err) {
      console.error('Error updating profile image:', err);
    }
  };

  const handleRemoveImage = async () => {
    if (!user) return;
    
    try {
      await user.setProfileImage({ file: null });
      await user.reload();
    } catch (err) {
      console.error('Error removing profile image:', err);
    }
  };

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Profile Picture</h3>
        <div className="flex items-center gap-6">
          <Avatar className="h-20 w-20">
            <AvatarImage src={user?.imageUrl} />
            <AvatarFallback>
              {user?.firstName?.[0]}{user?.lastName?.[0]}
            </AvatarFallback>
          </Avatar>
          <div className="space-x-4">
            <label className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 cursor-pointer">
              <ImageIcon className="mr-2 h-4 w-4" />
              Change Photo
              <input 
                type="file" 
                className="hidden" 
                accept="image/*" 
                onChange={handleImageChange}
              />
            </label>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-destructive hover:text-destructive"
              onClick={handleRemoveImage}
              disabled={!user?.imageUrl}
            >
              <X className="mr-2 h-4 w-4" />
              Remove
            </Button>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <h3 className="text-lg font-medium">Personal Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input 
              id="firstName" 
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="John" 
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input 
              id="lastName" 
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Doe" 
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email" 
              type="email" 
              value={email}
              disabled
              className="bg-muted/50"
            />
            <p className="text-xs text-muted-foreground">
              Contact support to change your email
            </p>
          </div>
        </div>
        <div className="flex justify-end pt-4">
          <Button onClick={handleSave} disabled={isSaving}>
            {isSaving ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </div>
    </div>
  );
};

const NotificationsTab = () => (
  <div className="space-y-6">
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Email Notifications</h3>
      <div className="space-y-4 rounded-lg border p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Product updates</p>
            <p className="text-sm text-muted-foreground">News and announcements</p>
          </div>
          <Switch />
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Security alerts</p>
            <p className="text-sm text-muted-foreground">Important security notifications</p>
          </div>
          <Switch defaultChecked />
        </div>
      </div>
    </div>
  </div>
);

const PreferencesTab = () => {
  const { theme, setTheme } = useTheme();
  const [isDarkMode, setIsDarkMode] = React.useState(theme === 'dark');

  // Update the switch state when theme changes
  React.useEffect(() => {
    setIsDarkMode(theme === 'dark');
  }, [theme]);

  const handleThemeToggle = (checked: boolean) => {
    setTheme(checked ? 'dark' : 'light');
    setIsDarkMode(checked);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">General</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="language">Language</Label>
              <p className="text-sm text-muted-foreground">
                Select your preferred language
              </p>
            </div>
            <div className="w-[180px]">
              <select
                id="language"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                defaultValue="en"
              >
                <option value="en">English</option>
                <option value="es">Español</option>
                <option value="fr">Français</option>
                <option value="de">Deutsch</option>
              </select>
            </div>
          </div>
          
          <div className="flex items-center justify-between pt-4 border-t">
            <div className="space-y-0.5">
              <Label htmlFor="dark-mode">Dark Mode</Label>
              <p className="text-sm text-muted-foreground">
                {isDarkMode ? 'Dark theme is enabled' : 'Light theme is enabled'}
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">
                {isDarkMode ? 'On' : 'Off'}
              </span>
              <Switch 
                id="dark-mode" 
                checked={isDarkMode} 
                onCheckedChange={handleThemeToggle}
                className="data-[state=checked]:bg-primary"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const AppearanceTab = () => {
  const { theme, setTheme } = useTheme();
  
  const themes = [
    { id: 'light', label: 'Light', bg: 'bg-[#f8fafc] border' },
    { id: 'dark', label: 'Dark', bg: 'bg-[#0f172a]' },
    { id: 'system', label: 'System', bg: 'bg-gradient-to-r from-[#f8fafc] to-[#0f172a]' }
  ];

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Theme</h3>
        <p className="text-sm text-muted-foreground">
          Choose how AiConnect looks to you. Select a theme to see how it looks.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          {themes.map((t) => (
            <div 
              key={t.id}
              onClick={() => setTheme(t.id)}
              className={cn(
                "flex flex-col items-center justify-between rounded-lg border p-4 cursor-pointer transition-colors",
                theme === t.id ? "border-primary bg-accent/50" : "hover:bg-accent/20"
              )}
            >
              <div className={`h-20 w-full rounded-md mb-3 ${t.bg}`}></div>
              <div className="flex items-center w-full justify-between">
                <span className="text-sm font-medium">{t.label}</span>
                {theme === t.id && (
                  <div className="h-4 w-4 rounded-full bg-primary flex items-center justify-center">
                    <svg className="h-3 w-3 text-primary-foreground" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="space-y-4 pt-4 border-t">
        <h3 className="text-lg font-medium">Preview</h3>
        <div className={cn(
          "rounded-lg border p-6 transition-colors",
          theme === 'dark' ? 'bg-card text-card-foreground' : 'bg-background'
        )}>
          <h4 className="font-medium mb-2">Example Card</h4>
          <p className="text-sm text-muted-foreground">
            This is how text will appear in the {theme} theme.
          </p>
        </div>
      </div>
    </div>
  );
};

const AiFeaturesTab = () => (
  <div className="space-y-6">
    <div className="space-y-4">
      <h3 className="text-lg font-medium">AI Assistant</h3>
      <div className="space-y-4 rounded-lg border p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Enable AI Assistant</p>
            <p className="text-sm text-muted-foreground">Get AI-powered suggestions and assistance</p>
          </div>
          <Switch defaultChecked />
        </div>
        <div className="flex items-center justify-between pt-2">
          <div>
            <p className="font-medium">AI Model</p>
            <p className="text-sm text-muted-foreground">Choose your preferred AI model</p>
          </div>
          <Button variant="outline" size="sm">
            GPT-4
          </Button>
        </div>
      </div>
    </div>
  </div>
);

const TabContent = ({ activeTab }: { activeTab: string }) => {
  switch (activeTab) {
    case 'profile':
      return <ProfileTab />;
    case 'notifications':
      return <NotificationsTab />;
    case 'appearance':
      return <AppearanceTab />;
    case 'ai':
      return <AiFeaturesTab />;
    default:
      return <ProfileTab />;
  }
};

export default function SettingsView() {
  const [activeTab, setActiveTab] = useState('profile');
  const { signOut } = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOut();
      router.push("/sign-in");
    } catch (err) {
      console.error('Error signing out:', err);
    }
  };

  return (
    <div className="space-y-8 p-6">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Manage your account and preferences</p>
      </div>

      <div className="space-y-8">
        {/* Tab Navigation */}
        <div className="border-b">
          <nav className="-mb-px flex space-x-6 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  'flex items-center gap-2 whitespace-nowrap border-b-2 px-3 py-3 text-sm font-medium transition-colors',
                  activeTab === tab.id
                    ? 'border-primary text-primary'
                    : 'border-transparent text-muted-foreground hover:border-muted-foreground/30 hover:text-foreground'
                )}
              >
                <tab.icon className="h-4 w-4" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="rounded-lg">
          <TabContent activeTab={activeTab} />
        </div>

        {/* Sign Out Button */}
        <div className="pt-8 border-t">
          <Button 
            onClick={handleSignOut}
            variant="outline" 
            className="w-full sm:w-auto flex items-center gap-2"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </Button>
        </div>
      </div>
    </div>
  );
}
>>>>>>> 9598468a7d902b7262fb8d1c84e058e32e1361cf
