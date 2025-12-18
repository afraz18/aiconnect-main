"use client";

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export function ContactSupport() {
  const [isOpen, setIsOpen] = useState(false);
  const [browserInfo, setBrowserInfo] = useState({
    browser: '',
    os: '',
    userAgent: '',
    resolution: ''
  });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    includeDiagnostics: true
  });

  useEffect(() => {
    // Get browser and system info
    const userAgent = navigator.userAgent;
    let browser = 'Unknown';
    let os = 'Unknown';

    // Detect browser
    if (userAgent.indexOf('Firefox') > -1) browser = 'Firefox';
    else if (userAgent.indexOf('SamsungBrowser') > -1) browser = 'Samsung Browser';
    else if (userAgent.indexOf('Opera') > -1 || userAgent.indexOf('OPR') > -1) browser = 'Opera';
    else if (userAgent.indexOf('Trident') > -1) browser = 'Internet Explorer';
    else if (userAgent.indexOf('Edge') > -1) browser = 'Edge';
    else if (userAgent.indexOf('Chrome') > -1) browser = 'Chrome';
    else if (userAgent.indexOf('Safari') > -1) browser = 'Safari';

    // Detect OS
    if (userAgent.indexOf('Windows') > -1) os = 'Windows';
    else if (userAgent.indexOf('Mac') > -1) os = 'macOS';
    else if (userAgent.indexOf('Linux') > -1) os = 'Linux';
    else if (userAgent.indexOf('Android') > -1) os = 'Android';
    else if (userAgent.indexOf('like Mac') > -1) os = 'iOS';

    setBrowserInfo({
      browser,
      os,
      userAgent: navigator.userAgent,
      resolution: `${window.screen.width}x${window.screen.height}`
    });
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send the form data to your support system
    console.log('Form submitted:', {
      ...formData,
      diagnostics: formData.includeDiagnostics ? browserInfo : null
    });
    
    toast.success('Your support request has been submitted!');
    setIsOpen(false);
    // Reset form
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
      includeDiagnostics: true
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>Contact Support</Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Contact Support</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="Your name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="your.email@example.com"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="subject">Subject</Label>
            <Input
              id="subject"
              placeholder="Briefly describe your issue"
              value={formData.subject}
              onChange={(e) => setFormData({...formData, subject: e.target.value})}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              placeholder="Please describe your issue in detail..."
              rows={5}
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
              required
            />
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="includeDiagnostics"
              checked={formData.includeDiagnostics}
              onChange={(e) => setFormData({...formData, includeDiagnostics: e.target.checked})}
              className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
            />
            <Label htmlFor="includeDiagnostics" className="text-sm font-medium">
              Include diagnostic information (browser, OS, etc.)
            </Label>
          </div>
          {formData.includeDiagnostics && (
            <div className="rounded-md bg-muted p-3 text-sm">
              <p className="font-medium">Diagnostic Information:</p>
              <ul className="mt-1 space-y-1">
                <li>Browser: {browserInfo.browser}</li>
                <li>OS: {browserInfo.os}</li>
                <li>Resolution: {browserInfo.resolution}</li>
              </ul>
            </div>
          )}
          <div className="flex justify-end space-x-2 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Send Message</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
