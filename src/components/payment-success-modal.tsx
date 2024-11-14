"use client"

import { client } from "@/lib/client"
import { useQuery } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Modal } from "./ui/modal"
import { LoadingSpinner } from "./loading-spinner"
import { Button } from "./ui/button"
import { CheckIcon } from "lucide-react"

export const PaymentSuccessModal = () => {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)

  const { data, isPending } = useQuery({
    queryKey: ["user-plan"],
    queryFn: async () => {
      const res = await client.payment.getUserPlan.$get()
      return await res.json()
    },
    refetchInterval: (query) => {
      return query.state.data?.plan === "PRO" ? false : 1000
    },
  })

  const handleClose = () => {
    setIsOpen(false)
    router.push("/dashboard")
  }

  const isPaymentSuccessful = data?.plan === "PRO"

  return (
    <Modal
      showModal={isOpen}
      setShowModal={setIsOpen}
      onClose={handleClose}
      className="px-6 pt-6"
      preventDefaultClose={!isPaymentSuccessful}
    >
      <div className="flex flex-col items-center">
        {isPending || !isPaymentSuccessful ? (
          <div className="flex h-64 flex-col items-center justify-center">
            <LoadingSpinner className="mb-4" />
            <p className="text-lg/7 font-medium text-gray-900">
              Upgrading your account...
            </p>
            <p className="mt-2 text-pretty text-center text-sm/6 text-gray-600">
              Please wait while we process your upgrade. This may take a moment
            </p>
          </div>
        ) : (
          <>
            <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-gray-200 bg-gray-50">
              <img
                src="/brand-asset-heart.png"
                alt=""
                className="h-full w-full object-cover"
              />
            </div>
            <div className="mt-6 flex flex-col items-center gap-1 text-center">
              <p className="text-pretty text-lg/7 font-medium tracking-tight">
                Upgrade successful! 🎉
              </p>
              <p className="text-pretty text-sm/6 text-gray-600">
                Thank yu for upgrading to Pro and supporting PlainPanda. your
                account has been upgraded.
              </p>
            </div>
            <div className="mt-8 w-full">
              <Button onClick={handleClose} className="h-12 w-full">
                <CheckIcon className="mr-2 size-5" />
                Go to Dashboard
              </Button>
            </div>
          </>
        )}
      </div>
    </Modal>
  )
}
