"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { CalendarIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import UserService from "@/services/userService"
import { LeaveCreate } from "@/models/LeaveCreate"

const formSchema = z
  .object({
    reason: z.string().min(5, {
      message: "La raison doit contenir au moins 5 caractères.",
    }),
    statut: z.string(),
    startDate: z.date(),
    endDate: z.date(),
    userId: z.number().optional(),
  })
  .refine((data) => data.endDate >= data.startDate, {
    message: "La date de fin doit être postérieure ou égale à la date de début.",
    path: ["endDate"],
  })

export default function LeaveRequestPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      reason: "",
      statut: "Pending",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      const user = await UserService.getUser();
      const userId = user?.ourUsers?.id;
      const leaveData: LeaveCreate = {
        name: user?.ourUsers?.name,
        ...values,
        startDate: values.startDate,
        endDate: values.endDate,
        userId,
      };
      await UserService.createLeave(leaveData)
      setSubmitSuccess(true);
      form.reset();
    } catch (error) {
      console.error("An error occurred while submitting the leave request:", error);
    } finally {
      setIsSubmitting(false);
    }
  }
  

  return (
    <div className="bg-white dark:bg-gray-950 p-6 rounded-lg shadow-md">
      {submitSuccess && (
        <div className="mb-6 p-4 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100 rounded-md">
          Votre demande de congé a été soumise avec succès!
        </div>
      )}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="reason"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Motif du congé</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Veuillez indiquer la raison de votre demande de congé"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Décrivez brièvement la raison de votre demande.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Date de début</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className={`w-full pl-3 text-left font-normal ${
                            !field.value && "text-muted-foreground"
                          }`}
                        >
                          {field.value ? format(field.value, "PPP", { locale: fr }) : <span>Sélectionner une date</span>}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date < new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="endDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Date de fin</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className={`w-full pl-3 text-left font-normal ${
                            !field.value && "text-muted-foreground"
                          }`}
                        >
                          {field.value ? format(field.value, "PPP", { locale: fr }) : <span>Sélectionner une date</span>}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          form.getValues("startDate") ? date < form.getValues("startDate") : false
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex justify-end space-x-4">
            <Button type="button" variant="outline" onClick={() => form.reset()} disabled={isSubmitting}>
              Annuler
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Soumission en cours..." : "Soumettre la demande"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
