"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  MailIcon,
  MapPinIcon,
  MessageCircle,
  PhoneIcon,
  Loader2,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import Link from "next/link";

export default function ContactSection(): React.ReactElement {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess("");
    setError("");

    if (!acceptTerms) {
      setError("You must accept the terms and conditions.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, acceptTerms }),
      });

      if (res.ok) {
        setSuccess("Your message has been sent successfully!");
        setFormData({ firstName: "", lastName: "", email: "", message: "" });
        setAcceptTerms(false);
      } else {
        setError("Failed to send message. Please try again.");
      }
    } catch {
      setError("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-6"
      id="form"
    >
      <div className="relative overflow-hidden my-10 w-full dark bg-background text-foreground max-w-screen-lg mx-auto rounded-2xl py-10 md:py-16 px-6 md:px-14  xl:p-12  dark:border ">
        <b className="text-muted-foreground">Contact Us</b>
        <h2 className="mt-3 text-3xl md:text-4xl font-bold tracking-tight">
          Reach out to us for:
        </h2>
        <p className="mt-3 text-base sm:text-lg">
          For Aircraft Parts Queries North Zone India <br />
          ( Punjab I Delhi I UP I Rajsthan I Himachal I Uttarakhand ) <br />
          I Mr. Vikas Sharma Assistant General Manager (AGM)  <br />
          <Link className="font-medium text-[#febd59]" href="tel:+919891585781">
            +91-989-158-5781
          </Link>
          <br />
          <Link
            className="font-medium text-[#febd59]"
            href="mailto:sgtbsairoparts@gmail.com"
          >
            sgtbsairoparts@gmail.com
          </Link>
        </p>
        {/* <p className="mt-3 text-base sm:text-lg">
          For Aircraft Parts Queries Center Zone India <br />
          (Guja rat I Madhya Pradesh I Chhattisgarh ) <br />
          Mr PushRaj Singh Business Development Manager 
          <br />{" "}
          <Link className="font-medium text-[#febd59]" href="tel:+917000535422">
            +91 7000-535-422
          </Link>
        </p> */}
        {/* <p className="mt-3 text-base sm:text-lg">
          3. Technical and engineering support
        </p>
        <p className="mt-3 text-base sm:text-lg">
          4. Partnership or collaboration opportunities
        </p> */}
        <div className="mt-24 grid lg:grid-cols-2 gap-16 md:gap-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-12">
            <div>
              <div className="h-12 w-12 flex items-center justify-center bg-primary/10 text-primary rounded-full">
                <MailIcon />
              </div>
              <h3 className="mt-6 font-semibold text-xl">Email</h3>
              <p className="my-2.5 text-muted-foreground">
                Our friendly team is here to help.
              </p>
              <Link
                className="font-medium text-primary"
                href="mailto:info@sgtbssourcing.com"
              >
                info@sgtbssourcing.com
              </Link>
            </div>
            <div>
              <div className="h-12 w-12 flex items-center justify-center bg-primary/10 text-primary rounded-full">
                <MessageCircle />
              </div>
              <h3 className="mt-6 font-semibold text-xl">WhatsApp chat</h3>
              <p className="my-2.5 text-muted-foreground">
                Now Chat With Us On WhatsApp
              </p>
              <Link
                className="font-medium text-primary"
                href="https://wa.me/919891585781"
              >
                +91-9891585781
              </Link>
            </div>
            <div>
              <div className="h-12 w-12 flex items-center justify-center bg-primary/10 text-primary rounded-full">
                <MapPinIcon />
              </div>
              <h3 className="mt-6 font-semibold text-xl">📍 Office Address</h3>
              <p className="my-2.5 text-muted-foreground">
                Our office is open Monday to Friday.
              </p>
              <Link
                className="font-medium text-primary"
                href="https://map.google.com"
                target="_blank"
              >
                Basement, 9/126, Malviya Nagar Road, Malviya Nagar, New Delhi,
                South Delhi, Delhi, 110017
              </Link>
            </div>
            <div>
              <div className="h-12 w-12 flex items-center justify-center bg-primary/10 text-primary rounded-full">
                <PhoneIcon />
              </div>
              <h3 className="mt-6 font-semibold text-xl">Phone</h3>
              <p className="my-2.5 text-muted-foreground">
                Mon-Fri from 8 Am to 5 Pm.
              </p>
              <Link
                className="font-medium text-primary"
                href="tel:+919891585781"
              >
                +91-989-158-5781
              </Link>
            </div>
          </div>

          {/* Form */}
          <Card className="bg-accent shadow-none">
            <CardContent className="p-6 md:p-10">
              <form onSubmit={handleSubmit}>
                <div className="grid md:grid-cols-2 gap-x-8 gap-y-5">
                  <div className="col-span-2 sm:col-span-1">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      name="firstName"
                      placeholder="First name"
                      id="firstName"
                      className="mt-1.5 bg-white h-11 text-[#000] shadow-none"
                      value={formData.firstName}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      name="lastName"
                      placeholder="Last name"
                      id="lastName"
                      className="mt-1.5 bg-white h-11 text-[#000]  shadow-none"
                      value={formData.lastName}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-span-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      type="email"
                      name="email"
                      placeholder="Email"
                      id="email"
                      className="mt-1.5 bg-white h-11 text-[#000] shadow-none"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-span-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      name="message"
                      id="message"
                      placeholder="Message"
                      className="mt-1.5 bg-white text-[#000] shadow-none"
                      rows={6}
                      value={formData.message}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-span-2 flex items-center gap-2 ">
                    <Checkbox
                      className="text-[#febd59]"
                      id="acceptTerms"
                      checked={acceptTerms}
                      onCheckedChange={(checked: boolean) =>
                        setAcceptTerms(checked)
                      }
                    />
                    <Label htmlFor="acceptTerms">
                      You agree to our &nbsp;
                      <Link href="#" className="underline">
                        terms and conditions
                      </Link>
                      .
                    </Label>
                  </div>
                </div>

                {/* Submit Button */}
                <Button
                  className="mt-6 w-full flex items-center justify-center gap-2 bg-[#febd59] hover:bg-[#8b51fe] hover:text-white ease-in-out duration-300 border-0"
                  size="lg"
                  disabled={loading || !acceptTerms}
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    "Submit"
                  )}
                </Button>

                {/* Success & Error Messages */}
                {success && (
                  <div className="mt-4 flex items-center gap-2 rounded-md bg-green-100 p-3 text-green-700">
                    <CheckCircle2 className="h-5 w-5" />
                    <span>{success}</span>
                  </div>
                )}
                {error && (
                  <div className="mt-4 flex items-center gap-2 rounded-md bg-red-100 p-3 text-red-700">
                    <XCircle className="h-5 w-5" />
                    <span>{error}</span>
                  </div>
                )}
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
