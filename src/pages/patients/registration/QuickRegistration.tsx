import React from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import HeaderBar from "@/components/layout/HeaderBar";
import Sidebar from "@/components/layout/Sidebar";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Validation schema with data verification
const schema = yup.object({
  fullName: yup.string().required("Full name is required"),
  contact: yup
    .string()
    .required("Contact number required")
    .matches(/^[0-9]{7,15}$/, "Enter a valid contact number"),
  dob: yup.date().nullable(),
});

type QuickForm = yup.InferType<typeof schema>;

const QuickRegistration: React.FC = () => {
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<QuickForm>({
    resolver: yupResolver(schema),
    defaultValues: { fullName: "", contact: "", dob: undefined as any },
  });

  const onSubmit = async (data: QuickForm) => {
    const patients: any[] = JSON.parse(localStorage.getItem("patients") || "[]");
    // Duplicate check by name + contact
    const dup = patients.find(
      (p) => p.fullName === data.fullName && p.contact === data.contact
    );
    if (dup) {
      toast.error("Patient already registered");
      return;
    }
    // Generate patient ID
    const patientId = `P${Date.now().toString().slice(-6)}`;
    const newPatient = {
      id: patientId,
      ...data,
      regDate: new Date().toISOString(),
      completed: false,
    };
    patients.push(newPatient);
    localStorage.setItem("patients", JSON.stringify(patients));
    // Welcome communication on success
    await toast.promise(
      new Promise((res) => setTimeout(res, 500)),
      {
        loading: "Processing...",
        success: `Welcome, ${data.fullName}! Your Patient ID is ${patientId}`,
        error: "Error registering patient",
      }
    );
    navigate(`/patients/database`);
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <HeaderBar pageTitle="Quick Registration" pageSubtitle="Walk-in Fast Track" />
        <div className="flex-1 overflow-y-auto flex items-center justify-center">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full max-w-md space-y-6"
          >
            <Card className="shadow-lg">
              <CardContent className="p-6 space-y-4">
                {[
                  { k: "fullName", l: "Full Name" },
                  { k: "contact", l: "Contact Number" },
                  { k: "dob", l: "Date of Birth", type: "date" },
                ].map(({ k, l, type }) => (
                  <div key={k}>
                    <label className="block text-sm mb-1">{l}</label>
                    <Controller
                      name={k as any}
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          type={type ?? "text"}
                          className="bg-gray-50 rounded h-10"
                          placeholder={l}
                        />
                      )}
                    />
                    {errors[k as keyof typeof errors] && (
                      <p className="text-red-500 text-xs mt-1">
                        {String(
                          errors[k as keyof typeof errors]?.message
                        )}
                      </p>
                    )}
                  </div>
                ))}
                <p className="text-xs text-gray-500">
                  You can complete the full profile later from the patient database.
                </p>
              </CardContent>
            </Card>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Registering..." : "Register & Issue ID"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default QuickRegistration;
