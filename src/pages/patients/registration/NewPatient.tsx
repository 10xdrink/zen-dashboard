import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import HeaderBar from "@/components/layout/HeaderBar";
import Sidebar from "@/components/layout/Sidebar";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

// Validation schema
const schema = yup.object({
  fullName: yup.string().required("Required"),
  dob: yup.date().required("Required"),
  gender: yup.string().oneOf(["Male", "Female", "Other"]).required("Required"),
  contact: yup.string().required("Required"),
  email: yup.string().email().nullable(),
  address: yup.string().nullable(),
  history: yup.string().nullable(),
  medications: yup.string().nullable(),
  allergies: yup.string().nullable(),
  treatments: yup.string().nullable(),
  insurance: yup.string().nullable(),
  doctor: yup.string().nullable(),
  timing: yup.string().nullable(),
  communication: yup.string().nullable(),
  requirements: yup.string().nullable(),
});

type FormValues = yup.InferType<typeof schema> & {
  idProof?: FileList | null;
  reports?: FileList | null;
  insuranceDoc?: FileList | null;
  consent?: FileList | null;
};

const steps = ["Personal", "Medical", "Preferences", "Documentation", "Review"];

const NewPatient: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    trigger,
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: {} as FormValues,
  });

  const nextStep = async () => {
    if (await trigger()) setStep((s) => Math.min(s + 1, steps.length - 1));
  };

  const onSubmit = async (data: FormValues) => {
    try {
      await toast.promise(
        new Promise((res) => setTimeout(res, 1000)),
        {
          loading: "Registering...",
          success: "Patient Registered!",
          error: (e) => String(e),
        }
      );
      navigate("/patients/database");
    } catch {}
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <HeaderBar pageTitle="New Patient Entry" pageSubtitle="Register a new patient" />
        <div className="flex-1 overflow-y-auto py-4">
          <div className="max-w-4xl mx-auto px-4">
            {/* Progress */}
            <div className="mb-4 mt-20">
              <Progress value={((step + 1) / steps.length) * 100} className="h-1" />
              <div className="flex justify-between text-xs mt-1">
                {steps.map((label, idx) => (
                  <div
                    key={idx}
                    className={
                      idx === step
                        ? "text-green-600"
                        : idx < step
                        ? "text-gray-500"
                        : "text-gray-300"
                    }
                  >
                    {label}
                  </div>
                ))}
              </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Step 0: Personal Information */}
              {step === 0 && (
                <Card className="shadow-lg">
                  <CardContent className="grid gap-6 md:grid-cols-2 p-6">
                    {/* Full Name */}
                    <div>
                      <label className="block text-sm mb-1">Full Name</label>
                      <Controller
                        name="fullName"
                        control={control}
                        render={({ field }) => (
                          <Input {...field} type="text" className="bg-gray-50 rounded h-10" placeholder="Full Name" />
                        )}
                      />
                      {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName.message}</p>}
                    </div>

                    {/* Date of Birth */}
                    <div>
                      <label className="block text-sm mb-1">Date of Birth</label>
                      <Controller
                        name="dob"
                        control={control}
                        render={({ field }) => (
                          <Input {...field} type="date" className="bg-gray-50 rounded h-10" />
                        )}
                      />
                      {errors.dob && <p className="text-red-500 text-xs mt-1">{errors.dob.message}</p>}
                    </div>

                    {/* Gender (Select) */}
                    <div>
                      <label className="block text-sm mb-1">Gender</label>
                      <Controller
                        name="gender"
                        control={control}
                        render={({ field }) => (
                          <select
                            {...field}
                            className="bg-gray-50 rounded h-10 w-full"
                          >
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                          </select>
                        )}
                      />
                      {errors.gender && <p className="text-red-500 text-xs mt-1">{errors.gender.message}</p>}
                    </div>

                    {/* Contact Numbers */}
                    <div>
                      <label className="block text-sm mb-1">Contact Numbers</label>
                      <Controller
                        name="contact"
                        control={control}
                        render={({ field }) => (
                          <Input {...field} type="text" className="bg-gray-50 rounded h-10" placeholder="Contact Numbers" />
                        )}
                      />
                      {errors.contact && <p className="text-red-500 text-xs mt-1">{errors.contact.message}</p>}
                    </div>

                    {/* Email Address */}
                    <div>
                      <label className="block text-sm mb-1">Email Address</label>
                      <Controller
                        name="email"
                        control={control}
                        render={({ field }) => (
                          <Input {...field} type="email" className="bg-gray-50 rounded h-10" placeholder="Email Address" />
                        )}
                      />
                      {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                    </div>

                    {/* Address Details */}
                    <div>
                      <label className="block text-sm mb-1">Address Details</label>
                      <Controller
                        name="address"
                        control={control}
                        render={({ field }) => (
                          <Textarea {...field} className="bg-gray-50 rounded h-24" placeholder="Address Details" />
                        )}
                      />
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Step 1: Medical Information */}
              {step === 1 && (
                <Card className="shadow-lg">
                  <CardContent className="grid gap-4 p-4">
                    {[
                      { key: "history", label: "Medical History" },
                      { key: "medications", label: "Current Medications" },
                      { key: "allergies", label: "Allergies & Reactions" },
                      { key: "treatments", label: "Previous Treatments" },
                      { key: "insurance", label: "Insurance Information" }
                    ].map(({ key, label }) => (
                      <div key={key}>
                        <label className="block text-sm mb-1">{label}</label>
                        <Controller
                          name={key as any}
                          control={control}
                          render={({ field }) => (
                            <Textarea {...field} className="bg-gray-50 rounded h-24" />
                          )}
                        />
                      </div>
                    ))}
                  </CardContent>
                </Card>
              )}

              {/* Step 2: Preferences */}
              {step === 2 && (
                <Card className="shadow-lg">
                  <CardContent className="grid gap-4 p-4 md:grid-cols-2">
                    {[
                      { key: "doctor", label: "Preferred Doctor" },
                      { key: "timing", label: "Appointment Timing", type: "datetime-local" },
                      { key: "communication", label: "Communication Preferences" },
                      { key: "requirements", label: "Special Requirements" }
                    ].map(({ key, label, type }) => (
                      <div key={key}>
                        <label className="block text-sm mb-1">{label}</label>
                        <Controller
                          name={key as any}
                          control={control}
                          render={({ field }) => (
                            <Input {...field} type={type ?? "text"} className="bg-gray-50 rounded h-10" placeholder={label} />
                          )}
                        />
                      </div>
                    ))}
                  </CardContent>
                </Card>
              )}

              {/* Step 3: Documentation */}
              {step === 3 && (
                <Card className="shadow-lg">
                  <CardContent className="space-y-4 p-4">
                    {[
                      { key: "idProof", label: "ID Proof Upload" },
                      { key: "reports", label: "Medical Reports" },
                      { key: "insuranceDoc", label: "Insurance Documents" },
                      { key: "consent", label: "Consent Forms" }
                    ].map(({ key, label }) => (
                      <div key={key}>
                        <label className="block text-sm mb-1">{label}</label>
                        <Controller
                          name={key as any}
                          control={control}
                          render={({ field }) => (
                            <input
                              type="file"
                              onChange={(e) => field.onChange(e.target.files)}
                              className="text-sm"
                              multiple={false}
                            />
                          )}
                        />
                      </div>
                    ))}
                  </CardContent>
                </Card>
              )}

              {/* Step 4: Review */}
              {step === 4 && (
                <Card className="shadow-lg">
                  <CardContent className="p-6 space-y-2 text-sm">
                    <p>Please review all entered information. Click "Register Patient" to submit.</p>
                  </CardContent>
                </Card>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between items-center">
                {step > 0 ? (
                  <Button type="button" variant="secondary" size="sm" onClick={() => setStep((s) => s - 1)}>
                    Back
                  </Button>
                ) : (
                  <div />
                )}
                {step < steps.length - 1 ? (
                  <Button type="button" size="sm" onClick={nextStep}>
                    Next
                  </Button>
                ) : (
                  <Button type="submit" size="sm" disabled={isSubmitting}>
                    {isSubmitting ? "Saving..." : "Register Patient"}
                  </Button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewPatient;
