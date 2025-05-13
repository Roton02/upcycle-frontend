"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

export default function AboutPage() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-16 space-y-16">
      {/* Hero Section */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900">Who We Are</h1>
        <p className="mt-4 text-gray-600 max-w-2xl mx-auto text-lg">
          ReValue is your trusted second-hand marketplace, helping people find
          quality pre-owned products at affordable prices while reducing
          environmental waste.
        </p>
      </div>

      {/* Mission and Vision */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Our Mission</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              To empower people to buy and sell pre-loved items easily, safely,
              and sustainably. We’re on a mission to make second-hand the first
              choice.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Our Vision</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              A world where sustainable consumption is simple, accessible, and
              impactful — reducing waste while building stronger local
              communities.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Image + Text Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-10">
        <div className="relative h-80 w-full rounded-xl overflow-hidden shadow-md">
          <Image
            src="/images/secondhand-market.jpg"
            alt="Second-hand shopping"
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Why Choose ReValue?
          </h2>
          <ul className="space-y-3 text-gray-600 list-disc list-inside">
            <li>Verified and trusted sellers only</li>
            <li>Real-time messaging and secure payments</li>
            <li>Eco-friendly and community-driven approach</li>
            <li>Wide variety of categories and easy navigation</li>
          </ul>
        </div>
      </div>

      {/* Team / Value Cards */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">What We Value</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {[
            {
              title: "Trust & Transparency",
              text: "We believe every transaction should feel safe and open.",
            },
            {
              title: "Community Impact",
              text: "We support local sellers and buyers to strengthen neighborhoods.",
            },
            {
              title: "Sustainability",
              text: "Every reused item reduces waste and helps the planet.",
            },
          ].map((value, i) => (
            <Card key={i} className="shadow-md hover:shadow-lg transition">
              <CardHeader>
                <CardTitle>{value.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{value.text}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
