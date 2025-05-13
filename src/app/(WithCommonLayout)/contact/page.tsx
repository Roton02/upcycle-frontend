"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ContactPage() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-16">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900">Contact Us</h1>
        <p className="text-gray-600 mt-4">
          Have questions about your order or a product? We’re here to help.
        </p>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Contact Form */}
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>Send Us a Message</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <Input type="text" placeholder="Your Name" required />
              <Input type="email" placeholder="Your Email" required />
              <Textarea placeholder="Your Message" rows={5} required />
              <Button type="submit" className="w-full">
                Send Message
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Contact Info */}
        <div className="space-y-6">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-medium">Customer Support</h3>
              <p className="text-sm text-gray-600 mt-1">
                support@revaluegoods.com
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-medium">Phone</h3>
              <p className="text-sm text-gray-600 mt-1">+1 (800) 234-5678</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-medium">Office Address</h3>
              <p className="text-sm text-gray-600 mt-1">
                123 ReValue Street, GreenTown, NY 10001, USA
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Map */}
      <div className="mt-16 w-full h-64 rounded-lg overflow-hidden">
        <iframe
          src="https://maps.google.com/maps?q=chowmuhoni,%20Noakhali,%20Chittagong,%20Bangladesh&t=&z=13&ie=UTF8&iwloc=&output=embed"
          className="w-full h-full border-0"
          loading="lazy"
          allowFullScreen
        ></iframe>
      </div>
    </section>
  );
}
